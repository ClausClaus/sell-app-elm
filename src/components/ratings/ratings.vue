<template>
  <div class="ratings-container" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">商家评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <div class="star-content">
              <star :size="36" :score="seller.serviceScore"></star>
            </div>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <div class="star-content">
              <star :size="36" :score="seller.foodScore"></star>
            </div>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <rating-select :select-type="selectType" :only-content="onlyContent" :ratings="ratings"></rating-select>
      <div class="ratings-wrapper">
        <template v-for="(rating,index) in ratings">
          <li class="rating-item border-1px" :key="index" v-show="needShow(rating.rateType,rating.text)">
            <div class="avatar">
              <img :src="rating.avatar" width="28" height="28">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <div class="star-content">
                  <star :size="24" :score="rating.score"></star>
                </div>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <template v-for="(item,index) in rating.recommend">
                  <span class="recommed-item" :key="index">{{item}}</span>
                </template>
              </div>
              <div class="time">
                {{rating.rateTime | formatDate}}
              </div>
            </div>
          </li>
        </template>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
import Connect from '../Connect';
import star from "../container/star/star.vue";
import split from '../container/split/split.vue';
import ratingSelect from '../container/ratingselect/ratingselect.vue';
import { formatDate } from '../../common/js/date'; // 日期格式化组件
const ALL = 2;
const ERR_OK = 0;
export default {
  data() {
    return {
      ratings: [],
      selectType: ALL,
      onlyContent: true,
    }
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  created() {
    this._initRequest();
    this._middlewareChange();
  },
  methods: {
    /** 初始化请求数据 */
    _initRequest() {
      this.$http.get('/api/ratings')
        .then(res => {
          res = res.body;
          if (res.errno === ERR_OK) {
            this.ratings = res.data;
            this.$nextTick(() => {
              this.ratingsScroll = new BScroll(this.$refs.ratings, {
                click: true
              })
            })
          }
        }, res => {
          console.log('评论列表请求失败');
        })
    },
    // 这里的两个Connect根据子组件发射的数据的来设置数据，而一旦数据发生变化。绑定在评论列表上的needShow方法会根据函数的执行结果判断显示和隐藏哪些数据
    _middlewareChange() {
      Connect.$on('change.selectType', (type) => {
        this.selectType = type;
        this.$nextTick(() => {
          this.ratingsScroll.refresh();
        })
      });
      Connect.$on('change.onlyContent', (onlyContent) => {
        this.onlyContent = onlyContent;
        this.$nextTick(() => {
          this.ratingsScroll.refresh();
        })
      });
    },
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
  },
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    star,
    split,
    ratingSelect
  }
}
</script>
<style lang="less" type="text/less" rel="stylesheet/less">
@import url("../../../src/common/less/mixin/mixin.less");
.ratings-container {
  position: absolute;
  top: 174px;
  left: 0;
  bottom: 0;
  width: 100%;
  overflow: hidden;
  .overview {
    display: flex;
    padding: 18px 0;
    .overview-left {
      flex: 0 0 137px;
      width: 137px;
      padding: 6px 0;
      border-right: 1px solid rgba(7, 17, 27, .1);
      text-align: center;
      @media only screen and(max-width: 320px) {
        flex: 0 0 120px;
        width: 120px;
      }
      .score {
        margin-bottom: 6px;
        line-height: 28px;
        font-size: 24px;
        color: rgb(255, 153, 0);
      }
      .title {
        margin-bottom: 8px;
        line-height: 12px;
        font-size: 12px;
        color: rgb(7, 17, 27);
      }
      .rank {

        font-size: 10px;
        line-height: 10px;
        color: rgb(147, 153, 159);
      }
    }
    .overview-right {
      flex: 1;
      padding: 6px 0 6px 24px;
      @media only screen and(max-width: 320px) {
        padding-left:6px;
      }
      .score-wrapper {
        margin-bottom: 8px;
        font-size: 0;
        .title,
        .star-content,
        .score {
          display: inline-block;
          vertical-align: top;
          line-height: 18px;
        }
        .title {
          font-size: 12px;
          color: rgb(7, 17, 27);
        }
        .star-content {
          margin: 0 12px;
          line-height: 0;
        }
        .score {
          font-size: 12px;
          color: rgb(255, 153, 0);
        }
      }
      .delivery-wrapper {
        font-size: 0;
        .title {
          line-height: 18px;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }
        .delivery {
          margin-left: 12px;
          font-size: 12px;
          color: rgb(147, 153, 159);
        }
      }
    }
  }
  .ratings-wrapper {
    padding: 0 18px;
    .rating-item {
      display: flex;
      padding: 18px 0;
      .border-1px(rgba(7, 17, 27, .1));
      .avatar {
        margin-right: 12px;
        flex: 0 0 28px;
        width: 28px;
        img {
          border-radius: 50%;
        }
      }
      .content {
        position: relative;
        flex: 1;
        .name {
          line-height: 12px;
          margin-bottom: 4px;
          font-size: 10px;
          color: rgb(7, 17, 27);
        }
        .star-wrapper {
          margin-bottom: 6px;
          font-size: 0;
          .star-content {
            display: inline-block;
            vertical-align: top;
            margin-right: 6px;
          }
          .delivery {
            font-size: 10px;
            line-height: 12px;
            color: rgb(153, 157, 159);
          }
        }
        .text {
          margin-bottom: 8px;
          line-height: 18px;
          color: rgb(7, 17, 27);
          font-size: 12px;
        }
        .recommend {
          line-height: 16px;
          font-size: 0;
          .recommed-item,
          .icon-thumb_up {
            display: inline-block;
            margin: 0 8px 4px 0;
            font-size: 9px;
          }
          .icon-thumb_up {
            color: rgb(0, 160, 220);
          }
          .recommed-item {
            padding: 0 6px;
            border: 1px solid rgba(7, 17, 27, .1);
            border-radius: 1px;
            color: rgb(147, 153, 159);
            background-color: #fff;
          }
        }
        .time {
          position: absolute;
          right: 0;
          top: 0;
          font-size: 10px;
          line-height: 12px;
          color: rgb(147, 153, 159);
        }
      }
    }
  }
}
</style>
