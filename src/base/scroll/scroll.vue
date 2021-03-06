<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>
<script type="text/ecmascript-6">
import BScroll from 'better-scroll';

export default {
  data() {
    return {}
  },
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: [Array, Object],
      default: null
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    pullup: {
      type: Boolean,
      default: false
    },
    beforeScroll: {
      type: Boolean,
      default: false
    },
    refreshDelay: {
      type: Number,
      default: 20
    },
    scrollX: {
      type: Boolean,
      default: false,
    },
    scrollY: {
      type: Boolean,
      default: true
    },
    freeScroll: {
      type: Boolean,
      default: false
    },
    eventPassthrough: {
      type: String,
      default: ''
    }
  },
  methods: {

    _initScroll() {
      if (!this.$refs.wrapper) {
        return;
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        scrollX: this.scrollX,
        scrollY: this.scrollY,
        freeScroll: this.freeScroll,
        eventPassthrough: this.eventPassthrough
      })
      // 向父组件发射一个scroll事件，将当前的滚动位置对象发射出去。
      if (this.listenScroll) {
        let me = this;
        this.scroll.on('scroll', (pos) => {
          me.$emit('scroll', pos);
        })
      }
      // 向父组件发射一个监听scroll.y轴的事件，在y轴的滚动结束后发射出去
      if (this.pullup) {
        this.scroll.on('scrollEnd', () => {
          if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
            this.$emit('scrollToEnd');
          }
        })
      }
      // 向父组件发送一个监听开始滚动的事件，在滚动开始的时候发射出去
      if (this.beforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScroll');
        })
      }
    },
    /** 代理better-scroll实例的方法 */
    // 开启better-scroll
    enable() {
      this.scroll && this.scroll.enable();
    },
    // 禁用better-scroll
    disable() {
      this.scroll && this.scroll.disable();
    },
    // 重新初始化better-scroll
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    /* scrollTo(x, y, time, easing)
      参数：
      {Number} x 横轴坐标（单位 px）
      {Number} y 纵轴坐标（单位 px）
      {Number} time 滚动动画执行的时长（单位 ms）
      {Object} easing 缓动函数，一般不建议修改，如果想修改，参考源码中的 ease.js 里的写法
      返回值：无
      作用：滚动到指定的位置 */
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
    },
    /* scrollToElement(el, time, offsetX, offsetY, easing)
      参数：
      {DOM | String} el 滚动到的目标元素, 如果是字符串，则内部会尝试调用 querySelector 转换成 DOM 对象。
      {Number} time 滚动动画执行的时长（单位 ms）
      {Number | Boolean} offsetX 相对于目标元素的横轴偏移量，如果设置为 true，则滚到目标元素的中心位置
      {Number | Boolean} offsetY 相对于目标元素的纵轴偏移量，如果设置为 true，则滚到目标元素的中心位置
      {Object} easing 缓动函数，一般不建议修改，如果想修改，参考源码中的 ease.js 里的写法
      返回值：无
      作用：滚动到指定的目标元素。 */
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.scroll.refresh();
      }, this.refreshDelay)
    }
  },
  mounted() {
    setTimeout(() => {
      this._initScroll();
    })
  }
}
</script>
