<template>
  <div class="seller-container" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc">
          <div class="star-content">
            <star :size="36" :score="seller.score"></star>
          </div>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remask">
          <li class="block">
            <h2 class="title">起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2 class="title">商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2 class="title">平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper">
          <p class="content">
            {{seller.bulletin}}
          </p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <template v-for="(item,index) in seller.supports">
            <li class="support-item border-1px" :key="index">
              <span class="icon" :class="classMap[seller.supports[index].type]"></span>
              <span class="text">{{seller.supports[index].description}}</span>
            </li>
          </template>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper">
          <ul class="pic-list">
            <template v-for="(pic,index) in seller.pics">
              <li class="pic-item" :key="index">
                <img :src="pic" width="120" height="90">
              </li>
            </template>
          </ul>
          </div>
        </div>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
import star from '../container/star/star.vue';
import split from '../container/split/split.vue';
export default {
  data() {
    return {
      classMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
    }
  },
  created() {

  },
  methods: {
    _initScroll() {
      this.$nextTick(() => {
        if (!this.sellerScroll) {
          this.sellerScroll = new BScroll(this.$refs.seller, {
            click: true
          })
        } else {
          this.sellerScroll.refresh();
        }
      })
    }
  },
  mounted() {
    this._initScroll();
  },
  watch: {
    seller: function() {
      this._initScroll();
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    star,
    split
  },
}
</script>
<style lang="less" type="text/less" rel="stylesheet/less">
@import url("../../../src/common/less/mixin/mixin.less");
.seller-container {
  position: absolute;
  top: 174px;
  left: 0;
  bottom: 0;
  width: 100%;
  overflow: hidden;
  .overview {
    padding: 18px;
    .title {
      margin-bottom: 8px;
      line-height: 14px;
      color: rgb(7, 17, 27);
      font-size: 14px;
    }
    .desc {
      padding-bottom: 18px;
      .border-1px(rgba(7, 17, 27, .1));
      font-size: 0;
      .star-content {
        display: inline-block;
        vertical-align: top;
        margin-right: 8px;
      }
      .text {
        display: inline-block;
        margin-right: 12px;
        vertical-align: top;
        line-height: 18px;
        font-size: 10px;
        color: rgb(77, 85, 93);
      }
    }
    .remask {
      display: flex;
      padding-top: 18px;
      .block {
        flex: 1;
        text-align: center;
        border-right: 1px solid rgba(7, 17, 27, .1);
        &:last-child {
          border: none;
        }
        .title {
          margin-bottom: 4px;
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
        .content {
          line-height: 24px;
          font-size: 10px;
          color: rgb(7, 17, 27);
          .stress {
            font-size: 24px;
          }
        }
      }
    }
  }
  .bulletin {
    padding: 18px 18px 0 18px;
    .title {
      margin-bottom: 8px;
      line-height: 14px;
      color: rgb(7, 17, 27);
      font-size: 14px;
    }
    .content-wrapper {
      padding: 0 12px 16px 12px;
      .border-1px(rgba(7, 17, 27, .1));
      .content {
        line-height: 24px;
        font-size: 12px;
        color: rgb(240, 20, 20);
      }
    }
    .supports {
      .support-item {
        padding: 16px 12px;
        font-size: 0;
        .border-1px(rgba(7, 17, 27, .1));
        &:last-child {
          .border-none();
        }
        .icon {
          display: inline-block;
          width: 16px;
          height: 16px;
          vertical-align: top;
          margin-right: 6px;
          background-size: 16px 16px;
          background-repeat: no-repeat;
          &.decrease {
            .bg-image("../../../components/seller/img/decrease_4"); // 减
          }
          &.discount {
            .bg-image("../../../components/seller/img/discount_4"); // 折
          }
          &.guarantee {
            .bg-image("../../../components/seller/img/guarantee_4"); // 保
          }
          &.invoice {
            .bg-image("../../../components/seller/img/invoice_4"); // 票
          }
          &.special {
            .bg-image("../../../components/seller/img/special_4"); // 特
          }
        }
        .text {
          line-height: 16px;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }
      }
    }
  }
}
</style>
