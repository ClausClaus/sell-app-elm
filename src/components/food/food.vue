<template>
  <transition name="move">
    <div v-show="showFlag" class="food-container" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div class="back" @click="back">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">
              月售{{food.sellCount}}份
            </span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old-price" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cart-control-wrapper">
            <cartControl :food="food"></cartControl>
          </div>
          <transition name="fade">
            <div class="buy" v-show="!food.count || food.count === 0" @click.stop.prevent="addFirst($event)">加入购物车</div>
          </transition>
        </div>
        <split></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split v-show="food.info"></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <rating-select :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></rating-select>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
import Connect from '../Connect';
import cartControl from '../container/cartControl/cartControl';
import split from '../container/split/split';
import ratingSelect from '../container/ratingselect/ratingselect';
const POSITIVE = 0; // 好评
const NEGATIVE = 1; // 差评
const ALL = 2; // 全部
export default {
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
  created() {
    Connect.$on('change.selectType', (type) => {
      this.selectType = type;
    });
    Connect.$on('change.onlyContent', (onlyContent) => {
      this.onlyContent = onlyContent;
    });
  },
  methods: {
    addFirst(event) {
      if (!event._constructed) return;
      this.$set(this.food, 'count', 1);
      Connect.$emit('addCart', event.target);
    },
    show() {
      this.showFlag = true;
      this.selectType = ALL;
      this.onlyContent = false;
      this.$nextTick(() => {
        if (!this.foodScroll) {
          this.foodScroll = new BScroll(this.$refs.food, {
            click: true
          })
        } else {
          this.foodScroll.refresh();
        }
      })
    },
    back() {
      this.showFlag = false;
    }
  },
  props: {
    food: {
      type: Object
    }
  },
  components: {
    cartControl,
    split,
    ratingSelect
  }
}
</script>
<style lang="less" type="text/less" rel="stylesheet/less">
.food-container {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 48px;
  z-index: 1;
  width: 100%;
  background-color: #fff;
  transition: all .2s linear;
  transform: translate3d(0, 0, 0);
  &.move-enter-active,
  &.move-leave-active {
    transform: translate3d(100%, 0, 0);
  }
  .food-content {
    .image-header {
      position: relative;
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
        .icon-arrow_lift {
          display: block;
          padding: 10px;
          font-size: 20px;
          color: #ffffff;
        }
      }
    }
    .content {
      padding: 18px;
      position: relative;
      .title {
        line-height: 14px;
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: bold;
        color: rgb(7, 17, 27);
      }
      .detail {
        height: 10px;
        margin-bottom: 18px;
        line-height: 10px;
        font-size: 0;
        .sell-count,
        .rating {
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
        .sell-count {
          margin-right: 12px;
        } // .rating {}
      }
      .price {
        line-height: 24px;
        .now {
          margin-right: 8px;
          font-size: 14px;
          font-weight: bold;
          color: #f01414;
        }
        .old-price {
          text-decoration: line-through;
          font-size: 10px;
          font-weight: bold;
          line-height: 14px;
          color: rgb(147, 153, 159);
        }
      }
      .cart-control-wrapper {
        position: absolute;
        right: 12px;
        bottom: 12px;
      }
      .buy {
        position: absolute;
        right: 18px;
        bottom: 18px;
        z-index: 10;
        line-height: 24px;
        height: 24px;
        padding: 0 12px;
        box-sizing: border-box;
        border-radius: 12px;
        font-size: 10px;
        color: #ffffff;
        background-color: rgb(0, 160, 220);
        transition: opacity .3s;
        &.fade-enter-active,
        &.fade-leave-active {
          opacity: 0;
        }
      }
    }
    .info {
      padding: 18px;
      .title {
        line-height: 14px;
        margin-bottom: 6px;
        font-size: 14px;
        color: #07111b;
      }
      .text {
        font-size: 12px;
        color: #4d555d;
        line-height: 24px;
        padding: 0 8px;
      }
    }
    .rating {
      padding-top: 18px;
      .title {
        line-height: 14px;
        margin-left: 18px;
        font-size: 14px;
        color: #07111b;
      }
    }
  }
}
</style>
