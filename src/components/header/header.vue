<template>
  <div class="header-container">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="support-count" v-if="seller.supports" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <transition name="detail-active">
      <div class="detail" v-show="detailShow">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <template v-for="(item,index) in seller.supports">
                <li class="support-item" :key="index">
                  <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                  <span class="text">{{seller.supports[index].description}}</span>
                </li>
              </template>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletion">
              <p class="content">
                {{seller.bulletin}}
              </p>
            </div>
          </div>
        </div>
        <div class="detail-close">
          <i class="icon-close" @click="closeDetail"></i>
        </div>
      </div>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
import star from '../container/star/star.vue';
export default {
  data() {
    return {
      classMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
      detailShow: false
    }
  },
  methods: {
    showDetail() {
      this.detailShow = true
    },
    closeDetail() {
      this.detailShow = false;
    }
  },
  components: {
    star,
  },
  props: {
    seller: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="less" type="text/less" rel="stylesheet/less">
@import url("../../../src/common/less/mixin/mixin");
.header-container {
  color: #fff;
  position: relative;
  overflow: hidden;
  .content-wrapper {
    padding: 24px 12px 18px 24px;
    font-size: 0;
    position: relative;
    .avatar {
      display: inline-block;
      vertical-align: top;
      img {
        border-radius: 2px;
      }
    }
    .content {
      display: inline-block;
      margin-left: 16px;
      .title {
        margin: 2px 0 8px 0;
        .brand {
          display: inline-block;
          width: 30px;
          height: 18px;
          .bg-image("../../../components/header/img/brand");
          background-size: 30px 18px;
          background-repeat: no-repeat;
          vertical-align: top;
        }
        .name {
          font-size: 16px;
          margin-left: 6px;
          line-height: 18px;
          font-weight: bold;
        }
      }
      .description {
        font-size: 12px;
        margin-bottom: 10px;
        line-height: 12px;
      }
      .support {
        font-size: 10px;
        .icon {
          display: inline-block;
          vertical-align: top;
          width: 12px;
          height: 12px;
          margin-right: 4px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          &.decrease {
            .bg-image("../../../components/header/img/decrease_1"); // 减
          }
          &.discount {
            .bg-image("../../../components/header/img/discount_1"); // 折
          }
          &.guarantee {
            .bg-image("../../../components/header/img/guarantee_1"); // 保
          }
          &.invoice {
            .bg-image("../../../components/header/img/invoice_1"); // 票
          }
          &.special {
            .bg-image("../../../components/header/img/special_1"); // 特
          }
        }
        .text {
          line-height: 12px;
          font-size: 10px;
        }
      }
    }
    .support-count {
      position: absolute;
      right: 12px;
      bottom: 14px;
      padding: 0 8px;
      height: 24px;
      line-height: 24px;
      border-radius: 14px;
      background-color: rgba(0, 0, 0, 0.2);
      text-align: center;
      .count {
        font-size: 10px;
        vertical-align: top;
      }
      .icon-keyboard_arrow_right {
        line-height: 24px;
        font-size: 10px;
        margin-left: 2px;
      }
    }
  }
  .bulletin-wrapper {
    position: relative;
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background-color: rgba(7, 17, 27, .2);
    .bulletin-title {
      display: inline-block;
      width: 22px;
      height: 12px;
      .bg-image("../../../components/header/img/bulletin");
      background-repeat: no-repeat;
      background-size: 22px 12px;
      vertical-align: top;
      margin-top: 8px;
    }
    .bulletin-text {
      font-size: 10px;
      line-height: 28px;
      margin: 0 4px;
      vertical-align: top;
    }
    .icon-keyboard_arrow_right {
      position: absolute;
      font-size: 10px;
      right: 8px;
      top: 10px;
    }
  }
  .background {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px);
    background-color: rgba(7, 17, 27, .5);
  }
  .detail {
    width: 100%;
    height: 100%;
    overflow: auto;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    background-color: rgba(7, 17, 27, .8);
    backdrop-filter: blur(10px); // ios才支持
    -webkit-backdrop-filter: blur(10px);
    .detail-wrapper {
      width: 100%;
      min-height: 100%;
      .detail-main {
        margin-top: 64px;
        padding-bottom: 64px;
        .name {
          font-size: 16px;
          line-height: 16px;
          font-weight: bold;
          text-align: center;
        }
        .star-wrapper {
          margin-top: 16px;
          padding: 2px 0;
          text-align: center;
        }
        .title {
          display: flex;
          width: 80%;
          margin: 28px auto 24px auto;
          .line {
            flex: 1;
            position: relative;
            top: -6px;
            border-bottom: 1px solid rgba(255, 255, 255, .2);
          }
          .text {
            padding: 0 12px;
            font-size: 14px;
            font-weight: bold;
          }
        }
        .supports {
          width: 80%;
          margin: 0 auto;
          .support-item {
            padding: 0 12px;
            margin-bottom: 12px;
            font-size: 0;
            &:last-child {
              margin-bottom: 0;
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
                .bg-image("../../../components/header/img/decrease_2"); // 减
              }
              &.discount {
                .bg-image("../../../components/header/img/discount_2"); // 折
              }
              &.guarantee {
                .bg-image("../../../components/header/img/guarantee_2"); // 保
              }
              &.invoice {
                .bg-image("../../../components/header/img/invoice_2"); // 票
              }
              &.special {
                .bg-image("../../../components/header/img/special_2"); // 特
              }
            }
            .text {
              line-height: 16px;
              font-size: 12px;
            }
          }
        }
        .bulletion {
          width: 80%;
          margin: 0 auto;
          .content {
            padding: 0 12px 20px 12px;
            font-size: 12px;
            line-height: 24px;
          }
        }
      }
    }
    .detail-close {
      position: relative;
      width: 32px;
      height: 32px;
      margin: -64px auto 0;
      clear: both;
      .icon-close {
        font-size: 32px;
      }
    }
  } // 弹层过渡效果
  .detail-active-enter-active,
  .detail-active-leave-active {
    transition: opacity .5s;
  }
  .detail-active-enter,
  .detail-active-leave-to {
    opacity: 0;
  }
}
</style>
