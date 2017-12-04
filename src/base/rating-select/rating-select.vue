<template>
  <div class="rating-select rating-container">
    <div class="rating-type border-1px">
      <span class="block positive" @click="select(2)" :class="{'active':selectType === 2}">{{desc.all}}
        <span class="count">{{ratings.length}}</span>
      </span>
      <span class="block positive" @click="select(0)" :class="{'active':selectType === 0}">{{desc.positive}}
        <span class="count">{{positives.length}}</span>
      </span>
      <span class="block negative" @click="select(1)" :class="{'active':selectType === 1}">{{desc.negative}}
        <span class="count">{{negative.length}}</span>
      </span>
    </div>
    <div class="switch border-1px" :class="{'on':onlyContent}">
      <span class="icon icon-check_circle" @click="toggleContent"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
const POSITIVE = 0; // 显示好评
const NEGATIVE = 1; // 显示差评
const ALL = 2; // 显示全部评价
export default {
  data() {
    return {
    }
  },
  props: {
    ratings: { type: Array, default: () => { return [] } },
    selectType: { type: Number, default: ALL },
    onlyContent: { type: Boolean, default: false },
    desc: {
      type: Object, default: () => {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    }
  },
  methods: {
    // 点选评论状态时将状态发射给父组件
    select(type) {
      if (this.selectType === type) {
        return;
      }
      this.$emit('ratingtypeSelect', type);
    },
    // 是否查看有内容的评价，将状态发射给父组件
    toggleContent() {
      this.$emit('toggleContent');
    }
  },
  computed: {
    // 过滤出好评的数组长度
    positives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE;
      })
    },
    // 过滤出差评的数组长度
    negative() {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE;
      })
    }
  }
}
</script>
<style lang="less" type="text/less" rel="stylesheet/less">
@import url("../../common/style/mixin.less");
.rating-select.rating-container {

  .rating-type {
    padding: 18px 0;
    margin: 0 18px;
    .border(rgba(7, 17, 27, .2));
    font-size: 0;
    .block {
      display: inline-block;
      padding: 8px 12px;
      margin-right: 8px;
      border-radius: 2px;
      font-size: 12px;
      line-height: 16px;
      color: rgb(77, 85, 93);
      .count {
        font-size: 8px;
        margin-left: 2px;
      }
      &.active {
        color: #ffffff;
      }
    }
    .positive {
      background-color: rgba(0, 160, 220, .2);
      &.active {
        background-color: rgb(0, 160, 220);
      }
    }
    .negative {
      background-color: rgba(77, 85, 93, .2);
      &.active {
        background-color: rgb(77, 85, 93);
      }
    }
  }
  .switch {
    padding: 12px 18px;
    line-height: 24px;
    font-size: 12px;
    color: rgb(153, 157, 159);
    .border(rgba(7, 17, 27, .1));
    font-size: 0;
    &.on {
      .icon {
        color: #00c850;
      }
    }
    .icon {
      margin-right: 4px;
      font-size: 24px;
      vertical-align: middle;
    }
    .text {
      font-size: 12px;
      vertical-align: middle;
    }
  }
}
</style>
