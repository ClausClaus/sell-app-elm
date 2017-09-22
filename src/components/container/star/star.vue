<template>
  <div class="star-container" :class="starType">
    <template v-for="(itemClass,index) in itemClasses">
      <span :class="itemClass" class="star-item" :key="index"></span>
    </template>
  </div>
</template>
<script type="text/ecmascript-6">
const LENGTH = 5;
const CLASS_ON = 'on';
const CLASS_HALF = 'half';
const CLASS_OFF = 'off';
export default {
  data() {
    return {

    }
  },
  computed: {
    starType() {
      return 'star-' + this.size;
    },
    itemClasses() {
      let result = [];
      let score = Math.floor(this.score * 2) / 2; // 向下取0.5倍数的算法
      let hasDecimal = score % 1 !== 0; // 得到半星
      let integer = Math.floor(score); // 得到有多少个全星
      for (var i = 0; i < integer; i++) {
        result.push(CLASS_ON);
      }
      if (hasDecimal) {
        result.push(CLASS_HALF);
      }
      while (result.length < LENGTH) {
        result.push(CLASS_OFF);
      }
      return result;
    }
  },
  props: ['size', 'score']
}
</script>
<style lang="less" type="text/less" rel="stylesheet/less">
@import url("../../../../src/common/less/mixin/mixin");
.star-container {
  .star-item {
    display: inline-block;
    background-repeat: no-repeat;
    font-size: 0;
  }
}

.star-48 {
  & .star-item {
    width: 20px;
    height: 20px;
    margin-right: 22px;
    background-size: 20px 20px;
    &:last-child {
      margin-right: 0;
    }
    &.on {
      .bg-image("../../../components/container/star/img/star48_on");
    }
    &.half {
      .bg-image("../../../components/container/star/img/star48_half");
    }
    &.off {
      .bg-image("../../../components/container/star/img/star48_off");
    }
  }
}

.star-36 {
  & .star-item {
    width: 15px;
    height: 15px;
    margin-right: 6px;
    background-size: 15px 15px;
    &:last-child {
      margin-right: 0;
    }
    &.on {
      .bg-image("../../../components/container/star/img/star36_on");
    }
    &.half {
      .bg-image("../../../components/container/star/img/star36_half");
    }
    &.off {
      .bg-image("../../../components/container/star/img/star36_off");
    }
  }
}

.star-24 {
  & .star-item {
    width: 10px;
    height: 10px;
    margin-right: 3px;
    background-size: 10px 10px;
    &:last-child {
      margin-right: 0;
    }
    &.on {
      .bg-image("../../../components/container/star/img/star24_on");
    }
    &.half {
      .bg-image("../../../components/container/star/img/star24_half");
    }
    &.off {
      .bg-image("../../../components/container/star/img/star24_off");
    }
  }
}
</style>
