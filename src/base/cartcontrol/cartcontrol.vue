<template>
  <div class="cartcontrol cartcontrol-container">
    <transition name="move">
      <div class="cart-decrease " v-show="food.count > 0" @click.stop="decreaseCart">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop="addCart($event)"></div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    food: { type: Object }
  },
  data() {
    return {}
  },
  created() {
    //      console.log(this.food);
  },
  methods: {
    addCart(event) {
      if (!this.food.count) {
        this.$set(this.food, 'count', 1);
      } else {
        this.food.count++;
      }
      this.$emit('add', event.target)
    },
    decreaseCart() {
      if (this.food.count > 0) {
        this.food.count--;
      }
    }
  }
}
</script>
<style type="text/less" lang="less" rel="stylesheet/less" charset="UTF-8">
.cartcontrol.cartcontrol-container {
  font-size: 0;
  .cart-decrease {
    display: inline-block;
    padding: 6px;
    transition: all .4s linear;
    .inner {
      display: inline-block;
      font-size: 24px;
      line-height: 24px;
      color: rgb(0, 160, 220);
      transition: all .4s linear;
    }
    &.move-enter-active,
    &.move-leave-active {
      opacity: 1;
      transform: translate3d(0, 0, 0);
      .inner {
        transform: rotate(0);
      }
    }
    &.move-enter,
    &.move-leave-to {
      opacity: 0;
      transform: translate3d(24px, 0, 0);
      .inner {
        transform: rotate(180deg);
      }
    }
  }
  .cart-count {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    padding-top: 6px;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    color: #93999f;
  }
  .cart-add {
    display: inline-block;
    padding: 6px;
    font-size: 24px;
    line-height: 24px;
    color: rgb(0, 160, 220);
  }
}
</style>
