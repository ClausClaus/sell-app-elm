<template>
  <div class="title title-container">
    <div class="line"></div>
    <div class="text">{{text}}</div>
    <div class="line"></div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {}
    },
    props: {
      text: {type: String}
    }
  }
</script>
<style type="text/less" lang="less" rel="stylesheet/less" charset="UTF-8">
  .title.title-container {
    margin: 30px auto 24px auto;
    width: 80%;
    display: flex;
    flex-direction: row;
    .line {
      height: 1px;
      flex: 1;
      padding: 0 30px;
      margin: auto;
      background-color: rgba(255, 255, 255, .2);
    }
    .text {
      text-align: center;
      padding: 0 12px;
      font-size: 16px;
      color: #fff;
    }
  }
</style>
