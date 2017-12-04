<template>
  <div id="app" class="app-container">
    <div class="header-contaoner">
      <vue-header :seller="seller"></vue-header>
    </div>
    <div class="tab border-1px">
      <router-link tag="div" :to="{name:'goods'}" class="tab-item">商品</router-link>
      <router-link tag="div" :to="{name:'ratings'}" class="tab-item">评价</router-link>
      <router-link tag="div" :to="{name:'seller'}" class="tab-item">商家</router-link>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>
<script type="text/ecmascript-6">
import VueHeader from '@/components/header/header';
import { ERROR } from 'api/config';
import { urlParse } from 'common/js/util.js';

export default {
  data() {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse();
          return queryParam.id
        })()
      }
    }
  },
  created() {
    this.$axios.get('/api/seller').then(res => {
      if (res.status === ERROR) {
        this.seller = Object.assign({},this.seller,res.data);
        // console.log(this.seller.id);
      }
    })
  },
  methods: {},
  components: {
    VueHeader
  }
}
</script>
<style type="text/less" lang="less" rel="stylesheet/less" charset="UTF-8">
@import "../static/css/reset.css";
@import "./common/style/mixin";

.app-container {
  .tab {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 40px;
    line-height: 40px;
    .border(rgba(7, 17, 27, .1));
    .tab-item {
      flex: 1;
      text-align: center;
      color: rgb(77, 85, 93);
      transition: all .2s;
      &.router-link-active {
        color: rgb(240, 20, 20);
      }
    }
  }
}
</style>
