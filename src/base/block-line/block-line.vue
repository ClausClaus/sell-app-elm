<template>
  <div class="block-line block-line-container border-1px">
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data() {
    return {
    }
  }
}
</script>
<style lang="less" type="text/less" rel="stylesheet/less">
@import url("../../common/style/mixin.less");
.block-line.block-line-container {
  width: 100%;
  height: 16px;
  background-color: #f3f5f7;
  .border(rgba(7, 17, 27, .1));
  .borderBottom(rgba(7, 17, 27, .1));
}
</style>
