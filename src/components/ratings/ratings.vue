<template>
  <scroll :data="ratings" class="ratings ratings-container" ref="scroll">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star size='36' :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star size='36' :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">
              送达时间
            </span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <block-line></block-line>
      <rating-select @ratingtypeSelect="ratingtypeSelect" @toggleContent="toggleContent" :onlyContent="onlyContent" :ratings="this.ratings" :selectType="selectType"></rating-select>
      <div class="rating-wrapper">
        <ul>
          <li class="rating-item" v-for="(rating,index) in ratings" :key="index" v-show="needShow(rating.rateType,rating.text)">
            <div class="avatar">
              <img :src="rating.avatar" width="28" height="28">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span v-for="(item,index) in rating.recommend" :key="index" class="item" v-show="index < 3">
                  {{item}}
                </span>
              </div>
              <div class="time">
                {{rating.rateTime | formatData}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </scroll>
</template>
<script type="text/ecmascript-6">
import Star from 'base/star/star.vue';
import BlockLine from 'base/block-line/block-line.vue';
import RatingSelect from 'base/rating-select/rating-select.vue';
import Scroll from 'base/scroll/scroll.vue';
import { ERROR } from 'api/config.js';
import formatDate from 'common/js/formatDate.js';
import { ratingsMixin } from 'common/js/mixin.js';
const ALL = 2;
export default {
  mixins: [ratingsMixin],
  data() {
    return {
      selectType: ALL,
      onlyContent: true,
      ratings: []
    }
  },
  props: {
    seller: { type: Object, default: () => { return {} } }
  },
  created() {
    this.$axios.get('/api/ratings').then(res => {
      if (res.status === ERROR) {
        this.ratings = res.data;
      }
    })
  },

  methods: {

  },
  components: {
    Star,
    BlockLine,
    RatingSelect,
    Scroll
  }
}
</script>
<style type="text/less" lang="less" rel="stylesheet/less" charset="UTF-8">
@import url("../../common/style/mixin.less");
.ratings.ratings-container {
  position: absolute;
  top: 177px;
  bottom: 0;
  width: 100%;
  overflow: hidden;
  .overview {
    display: flex;
    padding: 8px 0;
    .overview-left {
      padding: 6px 0;
      flex: 0 0 137px;
      width: 137px;
      border-right: 1px solid rgba(7, 17, 27, .1);
      text-align: center;
      @media only screen and(max-width: 320px) {
        flex: 0 0 110px;
        width: 110px;
      }
      .score {
        margin-bottom: 6px;
        line-height: 28px;
        font-size: 24px;
        color: rgb(255, 153, 0);
        @media only screen and(max-width: 320px) {
          font-size: 18px;
          line-height: 22px;
        }
      }
      .title {
        margin-bottom: 8px;
        line-height: 12px;
        font-size: 12px;
        color: rgb(7, 17, 27);
      }
      .rank {
        line-height: 10px;
        font-size: 10px;
        color: rgb(147, 153, 159);
      }
    }
    .overview-right {
      flex: 1;
      padding: 6px 0 6px 24px;
      font-size: 0;
      .score-wrapper {
        margin-bottom: 8px;
        margin-left: 12px;
        .score {
          display: inline-block;
          vertical-align: top;
          font-size: 12px;
          color: rgb(255, 153, 0);
          line-height: 18px;
        }
        .star {
          display: inline-block;
          vertical-align: top;
          margin: 0 12px;
        }
      }
      .delivery-wrapper {
        margin-left: 12px;
        .delivery {
          color: rgb(147, 153, 159);
          font-size: 12px;
          line-height: 18px;
          margin-left: 12px;
        }
      }
      .title {
        display: inline-block;
        font-size: 12px;
        color: rgb(7, 17, 27);
        line-height: 18px;
        vertical-align: top;
      }
      @media only screen and(max-width: 320px) {
        padding-left: 6px;
        .delivery-wrapper,
        .score-wrapper {
          margin-left: 5px;
        }
      }
    }
  }
  .rating-wrapper {
    padding: 0 18px;
    .rating-item {
      display: flex;
      padding: 18px 0;
      .border(rgba(7, 17, 27, .1));
      .avatar {
        flex: 0 0 28px;
        margin-right: 12px;
        width: 28px;
        img {
          border-radius: 50%;
        }
      }
      .content {
        position: relative;
        flex: 1;
        .name {
          margin-bottom: 4px;
          line-height: 12px;
          font-size: 10px;
          color: rgb(7, 17, 27);
        }
        .star-wrapper {
          margin-bottom: 6px;
          font-size: 0;
          .star {
            display: inline-block;
            margin-right: 6px;
            vertical-align: top
          }
          .delivery {
            display: inline-block;
            vertical-align: top;
            font-size: 10px;
            color: rgb(147, 153, 159);
            line-height: 12px;
          }
        }
        .text {
          font-size: 12px;
          color: rgb(7, 17, 27);
          line-height: 18px;
        }
        .recommend {
          font-size: 0;
          line-height: 16px;
          margin-top: 8px;
          .icon-thumb_up {
            vertical-align: middle;
            color: rgb(0, 160, 220);
            font-size: 12px;
            line-height: 16px;
            margin-right: 8px;
            margin-top: 8px;
          }
          .item {
            display: inline-block;
            box-sizing: border-box;
            width: 62px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-right: 8px;
            padding: 0 6px;
            vertical-align: middle;
            border: 1px solid rgba(7, 17, 27, .1);
            border-radius: 2px;
            background-color: #fff;
            font-size: 9px;
            color: rgb(147, 153, 159);
            line-height: 16px;
            text-align: center;
            &:last-child {
              margin-right: 0px;
            }
          }
        }
        .time {
          position: absolute;
          top: 0;
          right: 0;
          color: rgb(147, 153, 159);
          font-size: 10px;
          line-height: 12px;
        }
      }
    }
  }
}
</style>
