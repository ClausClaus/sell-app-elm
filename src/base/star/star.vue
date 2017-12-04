<template>
  <div class="star" :class="starType">
    <span v-for="(itemClass,index) in starItems" class="star-item" :class="itemClass" :key="index"></span>
  </div>
</template>
<script type="text/ecmascript-6">
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';
  export default {
    props: {
      size: {type: String},
      score: {type: Number}
    },
    data() {
      return {}
    },
    computed: {
      starType() {
        return 'star-' + this.size;
      },
      starItems() {
        let result = [];
        /*获取准确的分数，向下取0.5
        * score = 4.3,(4.3 * 2) / 2 再向下取整等于4
        * score = 4.5,(4.5 * 2) / 2 再向下取整等于4.5*/
        let score = Math.floor(this.score * 2) / 2;
        // 判断是否有小数，有的话证明有一个半星
        let hasDecimal = score % 1 !== 0;
        let integer = Math.floor(score);
        for (var i = 0; i < integer; i++) {
          result.push(CLS_ON);
        }
        if (hasDecimal) {
          result.push(CLS_HALF);
        }
        while (result.length < LENGTH) {
          result.push(CLS_OFF);
        }
        return result;
      }
    }
  }
</script>
<style type="text/less" lang="less" rel="stylesheet/less" charset="UTF-8">
  @import "../../common/style/mixin";

  .star {
    font-size: 0;
    .star-item {
      display: inline-block;
      background-repeat: no-repeat;
    }
    &.star-48 {
      .star-item {
        width: 20px;
        height: 20px;
        margin-right: 22px;
        background-size: 20px 20px;
        &.on {
          .bg-image("../../base/star/img/star48_on");
        }
        &.off {
          .bg-image("../../base/star/img/star48_off");
        }
        &.half {
          .bg-image("../../base/star/img/star48_half");
        }
      }
    }
    &.star-36 {
      .star-item {
        width: 15px;
        height: 15px;
        margin-right: 6px;
        background-size: 15px 15px;
        &:last-child {
          margin-right: 0;
        }
        &.on {
          .bg-image("../../base/star/img/star36_on");
        }
        &.off {
          .bg-image("../../base/star/img/star36_off");
        }
        &.half {
          .bg-image("../../base/star/img/star36_half");
        }
      }
    }
    &.star-24 {
      .star-item {
        width: 10px;
        height: 10px;
        margin-right: 3px;
        background-size: 10px 10px;
        &:last-child {
          margin-right: 0;
        }
        &.on {
          .bg-image("../../base/star/img/star24_on");
        }
        &.off {
          .bg-image("../../base/star/img/star24_off");
        }
        &.half {
          .bg-image("../../base/star/img/star24_half");
        }
      }
    }
  }

</style>
