<template>
  <div class="shopcart shopcart-cotainer">
    <div class="content" @click="toggleList">
      <div class="content-left" :class="{'highlight':totalCount > 0}">
        <div class="logo-wrapper">
          <div class="logo">
            <i class="icon icon-shopping_cart"></i>
          </div>
          <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
        </div>
        <div class="price">￥{{totalPrice}}</div>
        <div class="desc">￥另需配送费{{minPrice}}元</div>
      </div>
      <div class="content-right" @click.stop="pay">
        <div class="pay" :class="{'highlight':totalPrice >= minPrice}">
          {{payDesc}}
        </div>
      </div>
    </div>
    <div class="ball-container">
      <div v-for="(ball,index) in balls" :key="index">
        <transition name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
          <div class="ball" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
    <transition name="fold">
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click.stop="empty">清空</span>
        </div>
        <scroll :data="selectFoods" class="list-content" ref="scroll">
          <ul>
            <li class="food" v-for="(food,index) in selectFoods">
              <span class="name">{{food.name}}</span>
              <span class="price"><span>￥</span>{{food.price * food.count}}</span>
              <div class="cartcontrol-wrapper">
                <cart-control :food="food"></cart-control>
              </div>
            </li>
          </ul>
        </scroll>
      </div>
    </transition>
    <transition name="fade">
      <div class="list-mask" @click="toggleList" v-show="listShow"></div>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
  import CartControl from 'base/cartcontrol/cartcontrol.vue';
  import {prefixStyle} from 'common/js/dom.js';
  import Scroll from 'base/scroll/scroll.vue';

  const transform = prefixStyle('transform');
  export default {
    data() {
      return {
        balls: [{show: false}, {show: false}, {show: false}, {show: false}, {show: false}, {show: false}, {show: false}, {show: false}],
        dropBalls: [], // 维护一个已经被点击的小球数组
        fold: true // 购物车列表默认是被折叠起来的
      }
    },
    props: {
      selectFoods: {
        type: Array, default() {
          return [
//            {price: 20, count: 1}
          ]
        }
      },
      deliveryPrice: {type: [String, Number], default: 0},
      minPrice: {type: [String, Number], default: 0}
    },
    methods: {
      pay() {
        if (this.totalPrice >= this.minPrice) {
          return alert(this.totalPrice)
        }
      },
      empty() {
        this.selectFoods.forEach((food) => {
          food.count = 0;
        })
      },
      toggleList() {
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      },
      /* 这个方法是让调用方调用的
       *  1.0 cartcontrol发送一个事件，goods组件监听这个事件
       *  2.0 通过在goods组件中调用本（shopcart）组件的_drop方法将参数传递进来
       *  3.0 得到触发动画的当前元素  */
      _drop(el) {
        for (var i = 0; i < this.balls.length; i++) {
          var ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
//  使用forEach有坑，在此处慎用,会使小球动画非常卡顿且小球数组的状态更新会不准确
//        this.balls.forEach((ball) => {
//          if (!ball.show) {
//            ball.show = true;
//            ball.el = el;
//            this.dropBalls.push(ball);
//            return;
//          }
//        })

      },
      beforeEnter(el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            el.style.display = 'block';
            el.style[transform] = `translate3d(0,${y}px,0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style[transform] = `translate3d(${x}px,0,0)`;
          }
        }
      },
      enter(el, done) {
        let refresh = el.offsetHeight;
        this.$nextTick(() => {
          el.style[transform] = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style[transform] = 'translate3d(0,0,0)';
          el.addEventListener('transitionend', done);
          el.addEventListener('webkitTransitionEnd', done);
        })
      },
      afterEnter(el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      }
    },
    computed: {
      totalPrice() {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        })
        return total;
      },
      totalCount() {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count
        })
        return count;
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice
          return `还差￥${diff}元起送`
        } else {
          return '去结算'
        }
      },
      listShow() {
        if (!this.totalCount) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        this.$nextTick(() => {
          this.$refs.scroll.refresh();
        })
        return show;
      }
    },
    components: {
      CartControl,
      Scroll
    }
  }
</script>
<style lang="less" type="text/less" rel="stylesheet/less">
  @import "../../common/style/mixin";

  .shopcart-cotainer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
    width: 100%;
    height: 48px;
    .content {
      height: 100%;
      display: flex;
      background-color: #141d27;
      font-size: 0;
      .content-left {
        flex: 1;
        &.highlight {
          .logo-wrapper {
            .logo {
              background-color: rgb(0, 160, 220);
              .icon {
                color: #fff;
              }
            }
          }
          .price {
            color: #fff;
          }
        }
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
            .icon {
              font-size: 24px;
              line-height: 44px;
              color: #80858a;
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
            color: #ffffff;
            font-size: 10px;
            background-color: rgb(240, 20, 20);
            box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, .4);
          }
        }
        .price {
          display: inline-block;
          vertical-align: top;
          margin-top: 12px;
          padding-right: 12px;
          border-right: 1px solid rgba(255, 255, 255, .1);
          box-sizing: border-box;
          line-height: 24px;
          font-size: 16px;
          font-weight: bold;
          color: rgba(255, 255, 255, .4);
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
          text-align: center;
          font-size: 12px;
          font-weight: bold;
          font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
          color: rgba(255, 255, 255, .4);
          background-color: #2b333b;
          &.highlight {
            color: #fff;
            background-color: #00b43c;
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
        -webkit-transition: all .4s cubic-bezier(.27, -0.8, .87, .53);
        -moz-transition: all .4s cubic-bezier(.27, -0.8, .87, .53);
        -ms-transition: all .4s cubic-bezier(.27, -0.8, .87, .53);
        -o-transition: all .4s cubic-bezier(.27, -0.8, .87, .53);
        transition: all .4s cubic-bezier(.27, -0.8, .87, .53);
        .inner {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: rgb(0, 160, 220);
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
      -webkit-transition: all .4s linear;
      -moz-transition: all .4s linear;
      -ms-transition: all .4s linear;
      -o-transition: all .4s linear;
      transition: all .4s linear;
      -webkit-transform: translate3d(0, -100%, 0);
      -moz-transform: translate3d(0, -100%, 0);
      -ms-transform: translate3d(0, -100%, 0);
      -o-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
      &.fold-enter-active, &.fold-leave-active {
        -webkit-transform: translate3d(0, 0, 0);
        -moz-transform: translate3d(0, 0, 0);
        -ms-transform: translate3d(0, 0, 0);
        -o-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
      }
      .list-header {
        display: flex;
        justify-content: space-between;
        height: 40px;
        line-height: 40px;
        padding: 0 18px;
        background-color: #f3f5f7;
        .border(rgba(7, 17, 27, .1));
        .title {
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
        .empty {
          font-size: 12px;
          color: rgb(0, 160, 220);
        }
      }
      .list-content {
        max-height: 220px;
        padding: 0 18px;
        overflow: hidden;
        background-color: #fff;
        .food {
          position: relative;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          padding: 12px 0px;
          .border(rgba(7, 17, 27, .1));
          .name {
            line-height: 24px;
            font-size: 14px;
            color: rgb(7, 17, 27);
          }
          .price {
            position: absolute;
            right: 96px;
            top: 16px;
            font-size: 12px;
            line-height: 14px;
            color: rgb(240, 20, 20);
            font-weight: bold;
            span {
              font-size: 10px;
              font-weight: normal;
            }
          }
        }
        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          top: 6px;
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
      filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      transition: all .4s;
      transition-delay: .6s;
      opacity: 1;
      background-color: rgba(7, 17, 27, .6);
      /*&.fade-enter-active, &.fade-leave-active {*/

      /*}*/
      &.fade-leave-to, &.fade-enter {
        opacity: 0;
        background-color: rgba(7, 17, 27, 0);
        transition-delay: .2s;
      }
    }
  }
</style>
