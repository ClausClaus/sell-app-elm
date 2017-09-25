<template>
  <div class="shopcart-container">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight':totalCount > 0}">
            <span class="icon-shopping_cart" :class="{'highlight':totalCount > 0}"></span>
          </div>
          <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight':totalPrice > 0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right" @click.stop.prevent="pay">
        <div class="pay" :class="payClass">{{payDesc}}</div>
      </div>
    </div>
    <div class="ball-container">
      <transition-group name="drop" @before-enter="ballBeforeEnter" @enter="ballEnter" @after-enter="ballAfterEnter" :css="false">
        <template v-for="(ball,index) in balls">
          <div class="ball" v-show="ball.show" :key="index">
            <div class="inner inner-hook"></div>
          </div>
        </template>
      </transition-group>
    </div>
    <transition name="fold">
      <div class="shopcart-list" v-show="listshow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <template v-for="(food,index) in selectFoods">
              <li class="food-item" :key="index">
                <span class="name">{{food.name}}</span>
                <div class="cart-control-wrapper">
                  <cartControl :food="food"></cartControl>
                </div>
                <div class="price">
                  <span class="price-result">￥{{food.price * food.count}}</span>
                </div>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="list-mask" @click="hideList" v-show="listshow"></div>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
import Connect from '../../Connect'; // 兄弟组件之间的通信，中间件Vue实例
import cartControl from '../../container/cartControl/cartControl.vue';
export default {
  data() {
    return {
      balls: [{ show: false }, { show: false }, { show: false }, { show: false }, { show: false }, { show: false }, { show: false }],
      dropBalls: [], // 已经下落的小球
      fold: true,
    }
  },
  created() {
    Connect.$on('addCart', (target) => {
      this.drop(target);
    })
  },
  methods: {
    toggleList() {
      if (!this.totalCount) return;
      this.fold = !this.fold;
    },
    drop(el) {
      // 体验优化，异步加载
      this.$nextTick(() => {
        for (var i = 0; i < this.balls.length; i++) {
          var ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      })
    },
    // 动画函数三个钩子
    ballBeforeEnter(el) {
      let count = this.balls.length;
      while (count--) {
        let ball = this.balls[count];
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect();
          let x = rect.left - 32;
          let y = -(window.innerHeight - rect.top - 22);
          el.style.display = ""; // 让元素先显示出来
          el.style.webkitTransform = `translate3d(0,${y}px,0)`;
          el.style.transform = `translate3d(0,${y}px,0)`;
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
          inner.style.transform = `translate3d(${x}px,0,0)`;
        }
      }
    },
    ballEnter(el, done) {
      // 触发浏览器重绘
      let elHeight = el.offsetHeight;
      // 浏览器重绘之后
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0,0,0)';
        el.style.transform = 'translate3d(0,0,0)';
        let inner = el.getElementsByClassName('inner-hook')[0];
        inner.style.webkitTransform = 'translate3d(0,0,0)';
        inner.style.transform = 'translate3d(0,0,0)';
      });
      done();
    },
    ballAfterEnter(el) {
      let ball = this.dropBalls.shift();
      if (ball) {
        setTimeout(function() {
          ball.show = false;
          el.style.display = 'none';
        }, 400)
      }
    },
    empty() {
      this.selectFoods.forEach(function(food) {
        food.count = 0;
      });
    },
    hideList() {
      this.fold = true;
    },
    pay() {
      if (this.totalPrice < this.minPrice) return;
      window.alert(`需要支付${this.totalPrice}元`);
    }
  },
  computed: {
    totalPrice() {
      let total = 0;
      this.selectFoods.forEach(function(food) {
        total += food.price * food.count;
      });
      return total;
    },
    totalCount() {
      let count = 0;
      this.selectFoods.forEach(function(food) {
        count += food.count;
      })
      return count;
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`;
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice;
        return `还差${diff}元起送`;
      } else {
        return '去结算';
      }
    },
    payClass() {
      if (this.totalPrice < this.minPrice) {
        return 'not-enough';
      } else {
        return 'enough';
      }
    },
    listshow() {
      if (!this.totalCount) {
        this.fold = true;
        return false;
      }
      let show = !this.fold;
      if (show) {
        this.$nextTick(() => {
          if (!this.listContent) {
            this.listContent = new BScroll(this.$refs.listContent, {
              click: true,
              bounce: true
            });
          } else {
            this.listContent.refresh();
          }
        })
      }
      return show;
    }
  },
  props: {
    selectFoods: {
      type: Array,
      default() {
        return [
          //     数据格式
          // {
          //   price: 20,
          //   count: 1
          // }
        ]
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  components: {
    cartControl
  }
}
</script>
<style lang="less" type="text/less" rel="stylesheet/less">
@import url("../../../../src/common/less/mixin/mixin.less");
.shopcart-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 50;
  width: 100%;
  height: 48px;
  .content {
    display: flex;
    background-color: #141d27;
    font-size: 0;
    .content-left {
      flex: 1;
      .logo-wrapper {
        display: inline-block;
        position: relative;
        top: -10px;
        margin: 0 12px;
        padding: 6px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        vertical-align: top;
        border-radius: 50%;
        background-color: #141d27;
        .logo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: #2b343c;
          text-align: center;
          &.highlight {
            background-color: rgb(0, 160, 220);
          }
          .icon-shopping_cart {
            font-size: 24px;
            line-height: 2em;
            color: #80858a;
            &.highlight {
              color: #ffffff;
            }
          }
        }
        .num {
          position: absolute;
          top: 0;
          right: 0;
          width: 24px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          border-radius: 16px;
          font-size: 9px;
          font-weight: bold;
          color: #ffffff;
          background-color: rgb(240, 20, 20);
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .4);
        }
      }
      .price {
        display: inline-block;
        vertical-align: top;
        margin-top: 12px;
        line-height: 24px;
        box-sizing: border-box;
        padding-right: 12px;
        border-right: 1px solid rgba(255, 255, 255, .1);
        font-size: 16px;
        color: rgba(255, 255, 255, .4);
        font-weight: bold;
        &.highlight {
          color: #ffffff;
        }
      }
      .desc {
        display: inline-block;
        vertical-align: top;
        line-height: 24px;
        margin: 12px 0 0 12px;
        font-size: 10px;
        color: rgba(255, 255, 255, .4);
      }
    }
    .content-right {
      flex: 0 0 105px;
      width: 105px;
      .pay {
        height: 48px;
        line-height: 48px;
        color: #979a9c;
        vertical-align: middle;
        text-align: center;
        font-size: 12px;
        font-weight: bold;
        &.not-enough {
          background-color: #2b333b;
        }
        &.enough {
          background-color: #00b43c;
          color: #ffffff;
        }
      }
    }
  }
  .ball-container {
    .ball {
      position: fixed;
      left: 32px;
      bottom: 22px;
      z-index: 200;
      transition: all .4s cubic-bezier(.58, -0.41, .85, .24);
      .inner {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background-color: rgb(0, 160, 220);
        transition: all .4s linear;
      }
    }
  }
  .shopcart-list {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    transition: all .4s linear;
    transform: translate3d(0, -100%, 0);
    &.fold-enter-active,
    &.fold-leave-active {
      transform: translate3d(0, 0, 0);
    }
    .list-header {
      height: 40px;
      line-height: 40px;
      padding: 0 18px;
      background-color: #f3f5f7;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      .title {
        float: left;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }
      .empty {
        float: right;
        font-size: 12px;
        color: rgb(0, 160, 220)
      }
    }
    .list-content {
      padding: 0 18px;
      max-height: 217px;
      overflow: hidden;
      background-color: #fff;
      .food-item {
        position: relative;
        padding: 12px 0;
        box-sizing: border-box;
        .border-1px(rgba(7, 17, 27, .1));
        .name {
          line-height: 24px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
        .price {
          position: absolute;
          right: 90px;
          bottom: 12px;
          line-height: 24px;
          font-size: 14px;
          color: rgb(240, 20, 20);
          .price-result {
            font-weight: bold;
          }
        }
        .cart-control-wrapper {
          position: absolute;
          right: 0;
          bottom: 6px;
        }
      }
    }
  }
  .list-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    background-color: rgba(7, 17, 27, .6);
    &.fade-enter-active,
    &.fade-leave-active {
      transition: opacity .4s linear .7s;
    }
    &.fade-enter,
    &.fade-leave-to {
      transition: opacity .4s linear;
      opacity: 0;
    }
  }
}
</style>
