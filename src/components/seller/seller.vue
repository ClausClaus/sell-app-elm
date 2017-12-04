<template>
  <scroll class="seller seller-container" :data="seller" :scrollY="!scrollY" :scrollX="!scrollX" :freeScroll="freeScroll">
    <div class="overview-content">
      <div class="seller-header">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-1px">
          <star size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <span class="block-title">起送价</span>
            <div class="text">
              <span class="num">{{seller.minPrice}}</span>
              <span>元</span>
            </div>
          </li>
          <li class="block">
            <span class="block-title">商家配送</span>
            <div class="text">
              <span class="num">{{seller.deliveryPrice}}</span>
              <span>元</span>
            </div>
          </li>
          <li class="block">
            <span class="block-title">平均配送时间</span>
            <div class="text">
              <span class="num">
                {{seller.deliveryTime}}
              </span>
              <span>分钟</span>
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite">
          <span class="icon icon-favorite" :class="{'active':favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <block-line></block-line>
      <div class="seller-bulletin">
        <h2 class="title">公告与活动</h2>
        <p class="bulletin">
          {{seller.bulletin}}
        </p>
        <discount-list size="icon-16" :supports="seller.supports"></discount-list>
      </div>
      <block-line></block-line>
      <div class="seller-image">
        <h2 class="title">商家实景</h2>
        <scroll ref="pic-wrapper" :data="seller.pics" :scrollY="scrollY" :scrollX="scrollX" :freeScroll="!freeScroll" eventPassthrough="vertical" v-show="seller.pics">
          <ul class="pics-group" ref="pic-list">
            <li class="item" v-for="(item,index) in seller.pics" :key="index">
              <!-- <img :src="item.src" width="120" height="90" @click="$preview.open(index, seller.pics)" class="preview-img pic"> -->
              <img :src="item.src" v-lazy="item.src" width="120" height="90" class="preview-img pic">
            </li>
          </ul>
        </scroll>
      </div>
      <block-line></block-line>
      <div class="seller-info">
        <h2 class="title">商家信息</h2>
        <ul class="infos">
          <li class="info-item border-1px" v-for="(info,index) in seller.infos" :key="index">
            {{info}}
          </li>
        </ul>
      </div>
    </div>
  </scroll>
</template>
<script type="text/ecmascript-6">
import { saveToLocal, loadFromLocal } from 'common/js/store.js';
import Star from 'base/star/star.vue';
import BlockLine from 'base/block-line/block-line.vue';
import DiscountList from 'base/discount-list/discountList.vue';
import Scroll from 'base/scroll/scroll.vue';
export default {
  data() {
    return {
      freeScroll: true,
      scrollX: true,
      scrollY: false,
      favorite: (() => {
        return loadFromLocal(this.seller.id, 'favorite', false); // 读不到的话就是false
      })()
    }
  },
  computed: {
    favoriteText() {
      return this.favorite ? '已收藏' : '收藏'
    }
  },
  props: {
    seller: { type: Object, default: () => { return {} } }
  },
  methods: {
    _initPics() {
      if (this.seller.pics) {
        let picWidth = 120;
        let picMargin = 6;
        let width = (picWidth + picMargin) * this.seller.pics.length - picMargin;
        this.$refs['pic-list'].style.width = width + 'px';
        this.$refs['pic-wrapper'].refresh();
      }
    },
    toggleFavorite() {
      this.favorite = !this.favorite;
      saveToLocal(this.seller.id, 'favorite', this.favorite)
    }
  },
  ready() {
    this._initPics();
  },
  mounted() {
    this._initPics();
  },
  components: {
    Star,
    BlockLine,
    DiscountList,
    Scroll
  }
}
</script>
<style lang="less" type="text/less" rel="stylesheet/less">
@import url("../../common/style/mixin.less");
.seller.seller-container {
  position: absolute;
  top: 177px;
  bottom: 0;
  width: 100%;
  overflow: hidden;
  .overview-content {
    .seller-header {
      position: relative;
      padding: 18px 18px 0 18px;
      .title {
        font-size: 14px;
        color: rgb(7, 17, 27);
        line-height: 14px;
        margin-bottom: 8px;
      }
      .desc {
        font-size: 0;
        padding-bottom: 18px;
        .border(rgba(7, 17, 27, .1));
        .star {
          display: inline-block;
          vertical-align: top;
          margin-right: 8px;
        }
        .text {
          display: inline-block;
          vertical-align: top;
          font-size: 10px;
          color: rgb(77, 85, 93);
          line-height: 18px;
          &:last-child {
            margin-left: 12px;
          }
        }
      }
      .remark {
        padding: 18px 0;
        display: flex;
        .block {
          flex: 1;
          border-right: 1px solid rgba(7, 17, 27, .1);
          text-align: center;
          font-size: 0;
          &:last-child {
            border-right: none;
          }
          .block-title {
            display: block;
            font-size: 10px;
            line-height: 10px;
            color: rgb(147, 153, 159);
            margin-bottom: 4px;
          }
          .text {
            font-size: 0;
            .num {
              font-size: 24px;
              color: rgb(7, 17, 27);
              line-height: 24px;
            }
            span {
              display: inline-block;
              font-size: 10px;
              line-height: 10px;
            }
          }
        }
      }
      .favorite {
        position: absolute;
        width: 50px;
        top: 18px;
        right: 11px;
        text-align: center;
        .icon {
          display: block;
          margin-bottom: 4px;
          font-size: 24px;
          line-height: 24px;
          color: #d4d6d9;
          &.active {
            color: rgb(240, 20, 20);
          }
        }
        .text {
          font-size: 10px;
          line-height: 10px;
          color: rgb(77, 85, 93);
        }
      }
    }
    .seller-bulletin {
      padding: 18px 18px 0 18px;
      .title {
        font-size: 14px;
        color: rgb(7, 17, 27);
        line-height: 14px;
        margin-bottom: 8px;
      }
      .bulletin {
        padding: 0 12px;
        margin-bottom: 16px;
        font-size: 12px;
        color: rgb(240, 20, 20);
        line-height: 24px;
      }
      .discount-container.discounts {
        width: 100%;
        .discount-item {
          box-sizing: border-box;
          padding: 16px 12px;
          margin: 0;
          .borderBottom(rgba(7, 17, 27, .1));
        }
      }
    }
    .seller-image {
      padding: 18px;
      overflow: hidden;
      .title {
        font-size: 14px;
        color: rgb(7, 17, 27);
        line-height: 14px;
        margin-bottom: 12px;
      }
      .pics-group {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        font-size: 0;
        .item {
          display: inline-block;
          margin-right: 6px;
          width: 120px;
          height: 90px;
          &:last-child {
            margin: 0;
          }
        }
      }
    }
    .seller-info {
      padding: 18px 18px 0 18px;
      .title {
        font-size: 14px;
        color: rgb(7, 17, 27);
        line-height: 14px;
        margin-bottom: 12px;
      }
      .infos {
        .info-item {
          box-sizing: border-box;
          padding: 16px 12px;
          .borderBottom(rgba(7, 17, 27, .1));
          font-size: 12px;
          color: rgb(7, 17, 27);
          line-height: 16px;
        }
      }
    }
  }
}
</style>
