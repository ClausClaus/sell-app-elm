<template>
  <div class="rating-select-container">
    <div class="rating-type border-1px">
      <span class="block positive" @click.stop.prevent="select(2,$event)" :class="{'active':selectType === 2}">{{desc.all}}
        <span class="count">{{ratings.length}}</span>
      </span>
      <span class="block positive" @click.stop.prevent="select(0,$event)" :class="{'active':selectType === 0}">{{desc.positive}}
        <span class="count">{{positives.length}}</span>
      </span>
      <span class="block negative" @click.stop.prevent="select(1,$event)" :class="{'active':selectType === 1}">{{desc.negative}}
        <span class="count">{{negatives.length}}</span>
      </span>
    </div>
    <div class="switch" :class="{'on':onlyContent}" @click.stop.prevent="toggleContent($event)">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import Connect from '../../Connect';
const POSITIVE = 0; // 好评
const NEGATIVE = 1; // 差评
const ALL = 2; // 全部
export default {
  data() {
    return {
    }
  },
  methods: {
    select(type, event) {
      if (!event._constructed) return;
      Connect.$emit('change.selectType', type);
    },
    toggleContent(event) {
      if (!event._constructed) return;
      let onlyContent = !this.onlyContent;
      Connect.$emit('change.onlyContent', onlyContent);
    }
  },
  created() {
    // console.log(this.ratings)
  },
  computed: {
    positives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE;
      })
    },
    negatives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE;
      })
    }
  },
  props: {
    rating: {
      type: Array,
      default() {
        return [];
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default() {
        return false;
      }
    },
    desc: {
      type: Object,
      default() {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        };
      }
    },
    ratings: {
      type: Array,
      default() {
        return [];
      }
    }
  }
}
</script>
<style lang="less" type="text/less" rel="stylesheet/less">
@import url("../../../../src/common/less/mixin/mixin.less");
.rating-select-container {
  .rating-type {
    padding: 18px 0;
    margin: 0 18px;
    .border-1px(rgba(7, 17, 27, .2));
    font-size: 0;
    .block {
      display: inline-block;
      padding: 8px 12px;
      margin-right: 8px;
      border-radius: 1px;
      line-height: 16px;
      color: rgb(77, 85, 93);
      font-size: 12px;
      &.active {
        color: #ffffff;
      }
      .count {
        margin-left: 2px;
        font-size: 8px;
      }
      &.positive {
        background-color: rgba(0, 160, 220, .2);
        &.active {
          background-color: rgb(0, 160, 220);
        }
      }
      &.negative {
        background-color: rgba(77, 85, 93, .2);
        &.active {
          background-color: rgb(77, 85, 93);
        }
      }
    }
  }
  .switch {
    padding: 12px 0;
    .border-1px(rgba(7, 17, 27, .1));
    &.on {
      .icon-check_circle {
        color: #00c850;
      }
    }
    .icon-check_circle {
      display: inline-block;
      vertical-align: top;
      margin-left: 18px;
      margin-right: 4px;
      font-size: 24px;
      color: rgb(147, 153, 159);
      line-height: 24px;
    }
    .text {
      display: inline-block;
      vertical-align: top;
      font-size: 12px;
      color: rgb(147, 153, 159);
      line-height: 24px;
    }
  }
}
</style>
