<template>
  <div class="line-container">
    <div class="title">
      <div class="line"></div>
      <div class="text">{{text}}</div>
      <div class="line"></div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data() {
    return {

    }
  },
  props:{
    text:{
      type:String
    }
  }
}
</script>
<style lang="less" type="text/less" rel="stylesheet/less">
.line-container {
  .title {
    display: flex;
    width: 80%;
    margin: 28px auto 24px auto;
    .line {
      flex: 1;
      position: relative;
      margin: auto;
      border-bottom: 1px solid rgba(255, 255, 255, .2);
    }
    .text {
      padding: 0 12px;
      font-size: 14px;
      font-weight: bold;
    }
  }
}
</style>
