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
        <div class="favorite" @click.stop.prevent="toggleFavorite($event)">
          <span class="icon-favorite" :class="{'active':favorite}"></span>
          <span class="text" v-text="favoriteText"></span>
        </div>
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
        <div class="pic-wrapper" ref="pic-wrapper">
          <ul class="pic-list" ref="pic-list">
            <template v-for="(pic,index) in seller.pics">
              <li class="pic-item" :key="index">
                <img :src="pic.src" width="120" height="90" @click="$preview.open(index, seller.pics)" class="preview-img">
              </li>
            </template>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title border-1px">商家信息</h1>
        <ul class="info-list">
          <template v-for="(info,index) in seller.infos">
            <li class="info-item" :key="index" v-text="info"></li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
import { saveToLocal, loadFromLocal } from '../../common/js/store.js'
import star from '../container/star/star.vue';
import split from '../container/split/split.vue';
export default {
  data() {
    return {
      classMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
      favorite: (() => {
        return loadFromLocal(this.seller.id, 'favorite', false); // 从localStorage获取数据
      })()
    }
  },
  computed: {
    favoriteText() {
      return this.favorite ? '已收藏' : '收藏'
      
    }
  },
  created() {
  },
  methods: {
    toggleFavorite(event) {
      if (!event._constructed) return;
      this.favorite = !this.favorite;
      saveToLocal(this.seller.id, 'favorite', this.favorite); // 将数据保存到localStorage
    },
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
    },
    _initPics() {
      if (this.seller.pics) {
        let picWidth = 120;
        let picMargin = 6;
        let width = (picWidth + picMargin) * this.seller.pics.length - picMargin;
        this.$refs['pic-list'].style.width = width + 'px';
        this.$nextTick(() => {
          if (!this.picScroll) {
            this.picScroll = new BScroll(this.$refs['pic-wrapper'], {
              scrollX: true,
              eventPassthrough: 'vertical'
            })
          } else {
            this.picScroll.refresh();
          }
        })
      }
    }
  },
  mounted() {
    this._initScroll();
    this._initPics();
  },
  watch: {
    seller: function() {
      this._initScroll();
      this._initPics();
    },
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
    position: relative;
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
    .favorite {
      position: absolute;
      width: 50px;
      right: 11px;
      top: 18px;
      text-align: center;
      .icon-favorite {
        display: block;
        margin-bottom: 4px;
        color: #d4d6d9;
        line-height: 24px;
        font-size: 24px;
        &.active {
          color: #f01414;
        }
      }
      .text {
        line-height: 10px;
        font-size: 10px;
        color: rgb(77, 85, 93);
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
  .pics {
    padding: 18px;
    .title {
      margin-bottom: 12px;
      line-height: 14px;
      color: rgb(7, 17, 27);
      font-size: 14px;
    }
    .pic-wrapper {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      .pic-list {
        font-size: 0;
        .pic-item {
          display: inline-block;
          margin-right: 6px;
          width: 120px;
          height: 90px;
          &:last-child {
            margin: 0;
          }
          // .preview-img{
          //   display: block;
          //   width: 100%;
          //   height: 100%;
          // }
        }
      }
    }
  }
  .info {
    padding: 18px 18px 0 18px;
    color: rgb(7, 17, 27);
    .title {
      padding-bottom: 12px;
      line-height: 14px;
      font-size: 14px;
      .border-1px(rgba(7, 17, 27, .1));
    }
    .info-item {
      padding: 16px 12px;
      line-height: 16px;
      .border-1px(rgba(7, 17, 27, .1));
      font-size: 12px;
      &:last-child {
        .border-none();
      }
    }
  }
}
</style>
