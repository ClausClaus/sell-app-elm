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
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <template v-for="(rating,index) in food.ratings">
                <li :key="index" class="rating-item border-1px" v-show="needShow(rating.rateType,rating.text)">
                  <div class="user">
                    <span class="username">{{rating.username}}</span>
                    <img class="avatar" :src="rating.avatar" width="12" height="12">
                  </div>
                  <div class="time">{{rating.rateTime | formatTime}}</div>
                  <p class="text">
                    <span :class="{'icon-thumb_up':rating.rateType === 0,'icon-thumb_down':rating.rateType === 1}"></span>
                    {{rating.text}}
                  </p>
                </li>
              </template>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
          </div>
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
import {formatDate} from '../../common/js/date'; // 日期格式化组件
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
    // 这里的两个Connect根据子组件发射的数据的来设置数据，而一旦数据发生变化。绑定在评论列表上的needShow方法会根据函数的执行结果判断显示和隐藏哪些数据
    Connect.$on('change.selectType', (type) => {
      this.selectType = type;
      this.$nextTick(() => {
        this.foodScroll.refresh();
      })
    });
    Connect.$on('change.onlyContent', (onlyContent) => {
      this.onlyContent = onlyContent;
      this.$nextTick(() => {
        this.foodScroll.refresh();
      })
    });
  },
  filters:{
    formatTime(time){
        let date = new Date(time);
        // console.log(date)
        // console.log(formatDate(date,'yyyy-MM-dd hh:mm'));
        return formatDate(date,'yyyy-MM-dd hh:mm')
    }
  },
  methods: {
    /**
      评论列表的显示过滤
      1，显示全部并且没有评论时返回false;
      2. 评论的查看方式是全部时直接返回true;
      3. 判断当前的选择类型是否与点击的选择类型一致。根据用户点击返回执行结果
     */
    needShow(type, text) {
      if (this.onlyContent && !text) {
        return false;
      }
      if (this.selectType === ALL) {
        return true;
      }
      else {
        return type === this.selectType;
      }
    },
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
@import url("../../../src/common/less/mixin/mixin.less");
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
      .rating-wrapper {
        padding: 0 18px;
        .rating-item {
          position: relative;
          padding: 16px 0;
          .border-1px(rgba(7, 17, 27, .1));
          .user {
            position: absolute;
            right: 0;
            top: 16px;
            line-height: 12px;
            font-size: 0;
            .username {
              display: inline-block;
              vertical-align: top;
              margin-right: 6px;
              font-size: 10px;
              color: rgb(147, 153, 159);
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
              line-height: 16px;
              margin-right: 4px;
              font-size: 12px;
            }
            .icon-thumb_up {
              color: rgb(0, 160, 220);
            }
            .icon-thumb_down {
              color: rgb(147, 153, 159);
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
}
</style>
