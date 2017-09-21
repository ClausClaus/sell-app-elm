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
          <span class="icon"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
    </div>
    <div class="bulletin-wrapper">

    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data() {
    return {
    }
  },
  props: ['seller']
}
</script>
<style lang="less" type="text/less" rel="stylesheet/less">
@import url("../../../src/common/less/mixin/mixin");
.header-container {
  color: #fff;
  background-color: #000;
  .content-wrapper {
    padding: 24px 12px 18px 24px;
    font-size: 0;
    .avatar {
      display: inline-block;
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
          .bg-image("../../../components/header/brand");
          background-size: 30px 18px;
          background-repeat: no-repeat;
          vertical-align: top;
        }
        .name{
          font-size: 16px;
          margin-left: 6px;
          line-height: 18px;
          font-weight: bold;
        }
      }
      .description {
        font-size: 12px;
      }
      .support {
        font-size: 10px;
      }
    }
  }
}
</style>
