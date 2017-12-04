<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">{{seller.description}}/{{seller.deliveTime}}分钟送达</div>
        <div class="discount" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span><span
          class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="support-count" v-if="seller.supports" @click="ShowDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <span class="icon icon-keyboard_arrow_right"></span>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="ShowDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <transition name="fade">
      <div class="detail" v-show="detailShow">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-content">
              <star size="48" :score="seller.score"></star>
            </div>
            <line-title text="优惠信息"></line-title>
            <discount-list v-if="seller.supports" :supports="seller.supports" size="icon-16"></discount-list>
            <line-title text="商家公告"></line-title>
            <div class="seller-notice">{{seller.bulletin}}</div>
          </div>
        </div>
        <div class="detail-close">
          <i class="icon-close icon" @click="detailHide"></i>
        </div>
      </div>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
  import Star from '../../base/star/star.vue';
  import LineTitle from '../../base/line-title/lineTitle.vue';
  import DiscountList from '../../base/discount-list/discountList.vue';

  export default {
    data() {
      return {
        detailShow: false
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];

    },
    methods: {
      ShowDetail() {
        this.detailShow = true;
      },
      detailHide() {
        this.detailShow = false;
      }
    },
    components: {
      Star,
      LineTitle,
      DiscountList
    },
    props: {
      seller: {type: Object}
    }
  }
</script>
<style type="text/less" lang="less" rel="stylesheet/less" charset="UTF-8">
  @import url("../../common/style/mixin.less");

  .header {
    position: relative;
    color: #fff;
    background-color: rgba(7, 17, 27, .5);
    overflow: hidden;
    .content-wrapper {
      position: relative;
      padding: 24px 12px 18px 24px;
      display: flex;
      flex-direction: row;
      .avatar {
        margin-right: 16px;
        img {
          border-radius: 4px;
        }
      }
      .content {
        .title {
          margin: 2px 0 8px 0;
          .brand {
            display: inline-block;
            width: 30px;
            height: 18px;
            .bg-image("../../components/header/img/brand");
            background-size: 30px 18px;
            background-repeat: no-repeat;
            vertical-align: top;
          }
          .name {
            font-size: 16px;
            font-weight: bold;
            line-height: 18px;
            vertical-align: middle;
          }
        }
        .description {
          font-size: 12px;
          font-weight: 200;
          line-height: 12px;
          margin-bottom: 10px;
        }
        .discount {
          font-size: 0;
          .icon {
            width: 12px;
            height: 12px;
            display: inline-block;
            background-size: 12px 12px;
            background-repeat: no-repeat;
            vertical-align: bottom;
            margin-right: 4px;
            &.decrease {
              .bg-image("../../components/header/img/decrease_1");
            }
            &.discount {
              .bg-image("../../components/header/img/discount_1");
            }
            &.guarantee {
              .bg-image("../../components/header/img/guarantee_1");
            }
            &.invoice {
              .bg-image("../../components/header/img/invoice_1");
            }
            &.special {
              .bg-image("../../components/header/img/special_1");
            }
          }
          .text {
            display: inline-block;
            font-size: 10px;
            vertical-align: middle;
          }
        }
      }
      .support-count {
        position: absolute;
        right: 12px;
        bottom: 14px;
        display: inline-block;
        padding: 0 8px;
        height: 24px;
        line-height: 24px;
        background-color: rgba(0, 0, 0, .2);
        border-radius: 14px;
        text-align: center;
        .count {
          vertical-align: top;
          font-size: 10px;
        }
        .icon {
          margin-left: 2px;
          line-height: 24px;
          font-size: 10px;
        }
      }
    }
    .bulletin-wrapper {
      position: relative;
      height: 28px;
      line-height: 28px;
      background-color: rgba(7, 17, 27, .2);
      padding: 0 22px 0 12px;
      white-space: nowrap;
      overflow: hidden;
      -webkit-text-overflow: ellipsis;
      text-overflow: ellipsis;
      .bulletin-title {
        display: inline-block;
        width: 22px;
        height: 12px;
        .bg-image("../../components/header/img/bulletin");
        background-repeat: no-repeat;
        background-size: 22px 12px;
        vertical-align: middle;
      }
      .bulletin-text {
        font-size: 10px;
        vertical-align: middle;
        margin: 0 4px;
      }
      .icon {
        position: absolute;
        top: 9px;
        right: 12px;
        width: 12px;
        height: 12px;
        line-height: 12px;
      }
    }
    .background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      filter: blur(10px);
      z-index: -1;
    }
    .detail {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgba(7, 17, 27, .8);
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(10px);
      z-index: 100;
      opacity: 1;
      &.fade-enter-active, &.fade-leave-active {
        transition: all .3s;
      }
      &.fade-enter, &.fade-leave-to {
        opacity: 0;
      }
      .detail-wrapper {
        width: 100%;
        min-height: 100%;
        .detail-main {
          margin-top: 64px;
          padding-bottom: 64px;
          .name {
            line-height: 16px;
            text-align: center;
            font-size: 16px;
            font-weight: bold;
          }
          .star-content {
            margin-top: 16px;
            text-align: center;
          }
        }
      }
      .seller-notice {
        width: 80%;
        box-sizing: border-box;
        margin: 0 auto;
        padding: 0 12px;
        font-size: 12px;
        color: #fff;
        line-height: 24px;
        text-align: left;
        text-indent: 2em;
        letter-spacing: 1px;
      }
      .detail-close {
        position: relative;
        width: 32px;
        height: 32px;
        margin: -64px auto 0 auto;
        clear: both;
        font-size: 32px;
      }
    }
  }
</style>
