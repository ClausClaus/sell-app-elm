<template>
  <div class="split-container">
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
.split-container {
  position: relative;
  width: 100%;
  height: 16px;
  background-color: #f3f5f7;
  &::after {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    transform: scaleY(.5);
    content: '';
    height: 1px;
    background-color: rgba(7, 17, 27, .1);
  }
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    transform: scaleY(.5);
    content: '';
    height: 1px;
    background-color: rgba(7, 17, 27, .1);
  }
}
</style>
