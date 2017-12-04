<template>
  <transition name="side">
    <scroll :data="food" class="food food-container" v-show="showFlag" ref="scroll">
      <div class="food-content">
        <div class="image-header">
          <img width="100%" height="100%" :src="food.image" v-lazy="food.image">
          <div class="back" @click="hide">
            <i class="icon icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">
              <span>￥</span>{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">
              <span>￥</span>{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-container">
            <cart-control @add="addFood" :food="food"></cart-control>
          </div>
          <transition name="fade">
            <div class="buy" v-show="!food.count || food.count === 0" @click.stop="addFirst">
              加入购物车
            </div>
          </transition>
        </div>
        <block-line></block-line>
        <div class="food-introduce" v-show="food.info">
          <div class="sell-introduce">商品介绍</div>
          <p class="sell-description">{{food.info}}</p>
        </div>
        <block-line v-show="food.info"></block-line>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <rating-select @ratingtypeSelect="ratingtypeSelect" @toggleContent="toggleContent" :desc="desc" :selectType="selectType" :onlyContent="onlyContent" :ratings="food.ratings"></rating-select>
          <div class="rating-wrapper">
            <ul v-if="food.ratings && food.ratings.length">
              <li class="rating-item border-1px" :key="index" v-for="(rating,index) in food.ratings" v-show="needShow(rating.rateType,rating.text)">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar" width="12" height="12" :src="rating.avatar">
                </div>
                <div class="time">{{rating.rateTime | formatData}}</div>
                <p class="text">
                  <span :class="{'icon-thumb_up':rating.rateType === 0,'icon-thumb_down':rating.rateType===1}"></span>
                  {{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-else-if="!food.ratings || !food.ratings.length">
              暂无评价
            </div>
          </div>
        </div>
      </div>
    </scroll>
  </transition>
</template>
<script type="text/ecmascript-6">
import BlockLine from 'base/block-line/block-line.vue';
import Scroll from 'base/scroll/scroll.vue';
import CartControl from 'base/cartcontrol/cartcontrol.vue';
import RatingSelect from 'base/rating-select/rating-select.vue';
import formatDate from 'common/js/formatDate.js';
import { ratingsMixin } from 'common/js/mixin.js';
// const POSITIVE = 0; // 显示好评
// const NEGATIVE = 1; // 显示差评
const ALL = 2; // 显示全部评价
export default {
  mixins: [ratingsMixin],
  data() {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  // 从父组件处接收被点击的商品
  props: {
    food: {
      type: Object, default: () => {
        return {}
      }
    }
  },
  methods: {
    // 第一次添加商品到购物车，添加后【加入购物车】样式隐藏
    addFirst(event) {
      this.$set(this.food, 'count', 1);
      this.$emit('add', event.target);
    },
    // 点击加号将当前点击的商品发射出去，计算位置，实现动画
    addFood(target) {
      this.$emit('add', target);
    },
    hide() {
      this.showFlag = false;
    },
    show() {
      this.showFlag = true;
    }
  },
  // 监听showFlag状态，实现better-scroll重绘
  watch: {
    showFlag(newFlag) {
      if (newFlag) {
        this.$nextTick(() => {
          this.$refs.scroll.refresh();
        })
      }
    }
  },
  components: {
    BlockLine,
    Scroll,
    CartControl,
    RatingSelect
  }
}
</script>
<style lang="less" type="text/less" rel="stylesheet/less">
@import url("../../common/style/mixin.less");
.food.food-container {
  position: fixed;
  bottom: 48px;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  transition: all .4s;
  &.side-enter-active,
  &.side-leave-active {
    transform: translateX(0);
  }
  &.side-enter,
  &.side-leave-to {
    transform: translateX(100%);
  }
  .food-content {
    .image-header {
      position: relative;
      top: 0;
      left: 0;
      width: 100%;
      height: 0;
      padding-top: 100%;
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .back {
        position: absolute;
        top: 10px;
        left: 0;
        .icon {
          display: block;
          padding: 10px;
          font-size: 20px;
          color: #fff;
        }
      }
    }
    .content {
      position: relative;
      padding: 18px;
      .title {
        font-size: 14px;
        line-height: 14px;
        font-weight: bold;
        color: rgb(7, 17, 27);
      }
      .detail {
        margin: 8px 0 18px 0;
        color: rgb(147, 153, 159);
        font-size: 0;
        .sell-count,
        .rating {
          display: inline-block;
          font-size: 10px;
          line-height: 10px;
        }
        .rating {
          margin-left: 12px
        }
      }
      .price {
        font-size: 0;
        .now,
        .old {
          display: inline-block;
          font-size: 10px;
          line-height: 24px;
          font-weight: bold;
        }
        .now {
          font-size: 12px;
          color: rgb(240, 20, 20);
          span {
            font-size: 10px;
            font-weight: normal;
          }
        }
        .old {
          margin-left: 12px;
          color: rgb(147, 159, 153);
          text-decoration: line-through;
          span {
            font-weight: normal;
          }
        }
      }
    }
    .cartcontrol-container {
      display: flex;
      flex-direction: row;
      position: absolute;
      right: 12px;
      bottom: 6px;
    }
    .buy {
      position: absolute;
      right: 18px;
      bottom: 18px;
      z-index: 10;
      height: 24px;
      line-height: 24px;
      padding: 0 12px;
      box-sizing: border-box;
      font-size: 10px;
      border-radius: 12px;
      color: #fff;
      background-color: rgb(0, 160, 220);
      &.fade-enter-active,
      &.fade-leave-active {
        transition: all .2s;
        opacity: 1;
      }
      &.fade-leave-to,
      &.fade-enter {
        opacity: 0;
      }
    }
  }
  .food-introduce {
    padding: 18px;
    .sell-introduce {
      font-size: 14px;
      line-height: 14px;
      font-weight: bold;
      color: rgb(7, 17, 27);
    }
    .sell-description {
      padding: 6px 8px;
      color: rgb(77, 85, 93);
      font-size: 12px;
      line-height: 24px;
    }
  }
  .rating {
    padding-top: 18px;
    .title {
      margin-left: 18px;
      font-size: 14px;
      line-height: 14px;
      font-weight: bold;
      color: rgb(7, 17, 27);
    }
    .rating-wrapper {
      padding: 0 18px;
      .rating-item {
        position: relative;
        padding: 16px 0;
        .border(rgba(7, 17, 27, .1));
        .user {
          position: absolute;
          right: 0;
          top: 16px;
          line-height: 12px;
          font-size: 0;
          .name {
            display: inline-block;
            margin-right: 6px;
            vertical-align: top;
            color: rgb(147, 153, 159);
            font-size: 10px;
          }
          .avatar {
            border-radius: 50%;
          }
        }
        .time {
          margin-bottom: 6px;
          line-height: 12px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
        .text {
          line-height: 16px;
          font-size: 12px;
          color: rgb(7, 17, 27);
          .icon-thumb_up,
          .icon-thumb_down {
            margin-left: 4px;
            line-height: 16px;
            font-size: 12px;
          }
          .icon-thumb_up {
            color: #00a0dc;
          }
          .icon-thumb_down {
            color: #b7bbbf;
          }
        }
      }
      .no-rating {
        padding: 16px 0;
        font-size: 12px;
        color: rgb(147, 153, 159);
      }
    }
  }
}
</style>
