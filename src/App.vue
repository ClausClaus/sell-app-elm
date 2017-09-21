<template>
  <div id="app">
    <!-- <router-view></router-view> -->
    <header-vue :seller="seller"></header-vue>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link :to="{name:'goods'}">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{name:'ratings'}">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{name:'seller'}">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import HeaderVue from './components/header/header.vue';
const ERR_OK = 0;
export default {
  data() {
    return {
        seller:{},
    }
  },
  created() {
    this.$http.get('/api/seller')
      .then(res => {
        res = res.body;
        if (res.errno === ERR_OK) {
          this.seller = res.data;
        }
      }, errno => {
        console.log('商家数据请求失败');
      });
  },
  components: {
    HeaderVue
  }
}
</script>

<style lang="less" type="text/less" rel="stylesheet/less">
@import url("./common/less/mixin/mixin.less");
#app {
  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    .border-1px(rgba(7, 17, 27, .1));
    .tab-item {
      flex: 1;
      text-align: center;
      &>a {
        display: block;
        font-size: 14px;
        color: rgb(77, 85, 93);
        &.link-active {
          color: rgb(240, 20, 20);
        }
      }
    }
  }
}
</style>
