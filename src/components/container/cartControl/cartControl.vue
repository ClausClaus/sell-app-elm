<template>
  <div class="cartControl-container">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count > 0" @click="decreaseCart($event)">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click="addCart($event)">
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data() {
    return {
    }
  },
  created() {
    // console.log(this.food);
  },
  methods: {
    addCart(event) {
      if (!event._constructed) return;
      if (!this.food.count) {
        this.$set(this.food, 'count', 1);
      } else {
        this.food.count++;
      }
    },
    decreaseCart(event) {
      if (this.food.count > 0) {
        this.food.count--;
      }
    }
  },
  props: {
    food: {
      type: Object
    }
  }
}
</script>
<style lang="less" type="text/less" rel="stylesheet/less">
.cartControl-container {
  font-size: 0;
  .cart-decrease {
    display: inline-block;
    padding: 6px;
    transition: all .4s linear;
    &.move-enter-acvive,
    &.move-leave-active {
      opacity: 1;
      transform: translate3D(0, 0, 0);
      .inner {
        transform: rotate(0);
      }
    }
    &.move-enter,
    &.move-leave-to {
      opacity: 0;
      transform: translate3D(24px, 0, 0);
      .inner {
        transform: rotate(180deg);
      }
    }
    .inner {
      display: inline-block;
      text-align: center;
      font-size: 24px;
      line-height: 24px;
      color: rgb(0, 160, 220);
      transition: all .4s linear;
    }
  }
  .cart-add {
    display: inline-block;
    padding: 6px;
    text-align: center;
    font-size: 24px;
    line-height: 24px;
    color: rgb(0, 160, 220);
  }
  .cart-count {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    padding-top: 6px;
    line-height: 24px;
    text-align: center;
    color: rgb(147, 153, 159);
    font-size: 12px;
  }
  .cart-add {}
}
</style>
