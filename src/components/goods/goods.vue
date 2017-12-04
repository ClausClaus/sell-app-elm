<template>
  <div class="goods goods-container">
    <scroll :data="goods" tag="div" class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li :key="index" v-for="(item,index) in goods" class="menu-item" v-if="item.name || item.type" :class="{'current':currentIndex ===  +index}" @click="selectMenu(index)">
          <span class="text border-1px">
            <span class="icon" v-show="item.type > 0" :class="classMap[item.type]"></span>
            {{item.name}}</span>
        </li>
      </ul>
    </scroll>
    <scroll tag="div" :data="goods" class="foods-wrapper" ref="foodsWrapper" :probeType=3 :listenScroll="true" @scroll="scroll">
      <ul class="food-list-container">
        <li v-for="(item,index) in goods" :key="index" v-if="item.name" class="foods-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul class="ul-item-container">
            <li v-for="(food,index) in item.foods" :key="index" class="food-item border-1px" @click.stop="selectFood(food,$event)">
              <div class="image-header"><img :src="food.icon" v-lazy="food.icon" width="57" height="57"></div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc" v-show="food.description">{{food.description}}</p>
                <div class="extra">
                  <span class="market">月售{{food.sellCount}}份</span>
                  <span class="rating">好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="current">
                    <span class="moneny-sign">￥</span>{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cart-control :food="food" @add="_drop"></cart-control>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </scroll>
    <shop-cart ref="shopCart" :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shop-cart>
    <food :food="selectFoodInfo" ref="food" @add="_drop"></food>
  </div>
</template>
<script type="text/ecmascript-6">
import { ERROR } from 'api/config';
import Scroll from 'base/scroll/scroll.vue';
import ShopCart from 'base/shopcart/shopcart.vue';
import CartControl from 'base/cartcontrol/cartcontrol.vue';
import Food from 'components/food/food.vue';

export default {
  data() {
    return {
      goods: [],
      listHeight: [], // 记录右侧每一个li标签的高度
      scrollY: 0, // 记录点击左侧的menu栏目中的当前索引
      selectFoodInfo: {}
    }
  },
  props: {
    seller: { type: Object, default: () => { return {} } }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    this.$axios.get('/api/goods').then(res => {
      if (res.status === ERROR) {
        this.goods = res.data;
        this.$nextTick(() => {
          this._calculateHeight();
        })
      }
    })
  },
  methods: {
    selectFood(food, event) {
      this.selectFoodInfo = food;
      this.$refs.food.show();
    },
    /* 处理cartControl与food发送过来的事件 */
    _drop(target) {
      this.$nextTick(() => {
        this.$refs.shopCart._drop(target);
      })
    },
    selectMenu(index) {
      setTimeout(() => {
        let foodList = this.$refs.foodsWrapper.$el.getElementsByClassName('food-list-container')[0].getElementsByClassName('foods-list-hook');
        let el = foodList[index];
        this.$refs.foodsWrapper.scrollToElement(el, 300);
      }, 17)
    },
    scroll(position) {
      this.scrollY = Math.abs(Math.round(position.y))
    },
    _calculateHeight() {
      setTimeout(() => {
        let foodList = this.$refs.foodsWrapper.$el.getElementsByClassName('food-list-container')[0].getElementsByClassName('foods-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (var i = 0; i < foodList.length; i++) {
          var item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      }, 17)
    }
  },
  computed: {
    currentIndex() {
      for (var i = 0; i < this.listHeight.length; i++) {
        var height1 = this.listHeight[i];
        var height2 = this.listHeight[i + 1];
        if (!height2 || this.scrollY >= height1 && this.scrollY < height2) {
          return i;
        }
      }
      return 0;
    },
    selectFoods() {
      let foods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food);
          }
        })
      })
      return foods;
    }
  },
  components: {
    Scroll,
    ShopCart,
    CartControl,
    Food
  }
}
</script>
<style type="text/less" lang="less" rel="stylesheet/less" charset="UTF-8">
@import "../../common/style/mixin";

.goods.goods-container {
  position: absolute;
  top: 177px;
  bottom: 46px;
  display: flex;
  overflow: hidden;
  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background-color: #f3f5f7;
    .menu-item {
      &.current {
        position: relative;
        z-index: 9999;
        font-weight: bold;
        background-color: #fff;
        margin-top: -1px;
        .text {
          .border-none();
        }
      }
      display: table;
      padding: 0 12px;
      width: 56px;
      height: 54px;
      line-height: 14px;
      font-size: 12px;
      .icon {
        width: 12px;
        height: 12px;
        display: inline-block;
        background-size: 12px 12px;
        background-repeat: no-repeat;
        vertical-align: top;
        margin-right: 2px;
        &.decrease {
          .bg-image("../../components/goods/img/decrease_3");
        }
        &.discount {
          .bg-image("../../components/goods/img/discount_3");
        }
        &.guarantee {
          .bg-image("../../components/goods/img/guarantee_3");
        }
        &.invoice {
          .bg-image("../../components/goods/img/invoice_3");
        }
        &.special {
          .bg-image("../../components/goods/img/special_3");
        }
      }
      .text {
        display: table-cell;
        font-size: 12px;
        width: 56px;
        vertical-align: middle;
        .border(rgba(7, 17, 27, .1));
      }
    }
  }
  .foods-wrapper {
    flex: 1;
    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background-color: #f3f5f7;
    }
    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      .border(rgba(7, 17, 27, .1));
      &:last-child {
        .border-none();
        margin-bottom: 0;
      }
      .image-header {
        flex: 0 0 57px;
        width: 57px;
        height: 57px;
        margin-right: 10px;
      }
      .content {
        flex: 1;
        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
        .desc,
        .extra {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
        .desc {
          margin-bottom: 8px;
          line-height: 14px;
        }
        .extra {
          .market {
            margin-right: 12px;
          }
        }
        .price {
          font-weight: bold;
          line-height: 24px;
          .current {
            font-size: 14px;
            color: rgb(240, 20, 20);
            font-weight: bold;
            .moneny-sign {
              font-size: 10px;
              font-weight: normal;
            }
          }
          .old {
            text-decoration: line-through;
            margin-left: 8px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }
        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 6px;
        }
      }
    }
  }
}
</style>
