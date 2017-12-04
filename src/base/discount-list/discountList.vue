<template>
  <ul class="discount-container discounts">
    <li :key="index" class="discount-item border-1px" v-for="(item,index) in supports">
      <span :class="[classMap[item.type],size]" class="icon"></span>
      <span class="description">{{item.description}}</span>
    </li>
  </ul>
</template>
<script type="text/ecmascript-6">
export default {
  data() {
    return {}
  },
  props: {
    supports: { type: [Array, Object] },
    size: { type: String }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  }
}
</script>
<style type="text/less" lang="less" rel="stylesheet/less" charset="UTF-8">
@import "../../common/style/mixin";

.discounts.discount-container {
  width: 80%;
  margin: 0 auto;
  font-size: 0;
  .discount-item {
    padding: 0 12px;
    margin-bottom: 12px;
    &:last-child {
      margin-bottom: 0;
    }
    .description {
      font-size: 12px;
      font-weight: 200;
      line-height: 12px;
      margin-left: 6px;
      vertical-align: middle;
    }
    .icon {
      display: inline-block;
      background-repeat: no-repeat;
      vertical-align: middle;
    }
    .icon-16 {
      &.icon {
        width: 16px;
        height: 16px;
        background-size: 16px 16px;
        &.decrease {
          .bg-image("../../components/header/img/decrease_2");
        }
        &.discount {
          .bg-image("../../components/header/img/discount_2");
        }
        &.guarantee {
          .bg-image("../../components/header/img/guarantee_2");
        }
        &.invoice {
          .bg-image("../../components/header/img/invoice_2");
        }
        &.special {
          .bg-image("../../components/header/img/special_2");
        }
      }
    }
    .icon-12 {
      &.icon {
        width: 12px;
        height: 12px;
        background-size: 12px 12px;
        &.decrease {
          .bg-image("../../components/header/img/decrease_1");
        }
        &.discount {
          .bg-image("../../components/header/img/discount_1");
        }
        &.guarantee {
          .bg-image("../../components/header/img/guarantee_1");
        }
        &.invoice {
          .bg-image("../../components/header/img/invoice_1");
        }
        &.special {
          .bg-image("../../components/header/img/special_1");
        }
      }
    }
  }
}
</style>
