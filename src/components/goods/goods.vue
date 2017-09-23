<template>
	<div class="goods-container">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<template v-for="(item,index) in goods">
					<li :key="index" class="menu-item" :class="{'current':currentIndex === index}" @click="selectMenu($event,index)">
						<span class="text border-1px">
							<span class="icon" v-show="item.type > 0" :class="classMap[item.type]"></span>{{item.name}}</span>
					</li>
				</template>
			</ul>
		</div>
		<div class="foods-wrapper" ref="foodWrapper">
			<ul>
				<template v-for="(item,index) in goods">
					<li :key="index" class="food-list food-list-hook">
						<h1 class="title">{{item.name}}</h1>
						<ul>
							<template v-for="(food,index) in item.foods">
								<li class="food-item" :key="index">
									<div class="icon">
										<img :src="food.icon" width="57" height="57">
									</div>
									<div class="content">
										<h2 class="name">{{food.name}}</h2>
										<p class="desc" v-show="food.description">{{food.description}}</p>
										<div class="extra">
											<span class="sales">月售{{food.sellCount}}</span>
											<span class="rating">好评率{{food.rating}}%</span>
										</div>
										<div class="price">
											<span class="now">￥{{food.price}}</span>
											<span v-show="food.oldPrice" class="old-price">￥{{food.oldPrice}}</span>
										</div>
										<div class="cartcontrol-wrapper">
											<cartControl :food="food"></cartControl>
										</div>
									</div>

								</li>
							</template>
						</ul>
					</li>
				</template>
			</ul>
		</div>
		<shopCart :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopCart>
	</div>
</template>
<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
import shopCart from '../container/shopCart/shopCart';
import cartControl from '../container/cartControl/cartControl';
const ERR_OK = 0;
export default {
	data() {
		return {
			goods: [],
			classMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
			listHeight: [],
			scrollY: 0
		}
	},
	created() {
		this.$http.get('/api/goods')
			.then(res => {
				res = res.body;
				if (res.errno === ERR_OK) {
					this.goods = res.data;
					this.$set(this.goods);
					this.$nextTick(() => {
						this._initScroll();
						this._calclateHeight();
					})
				}
			}, res => {
				console.log('商品数据请求失败');
			})
	},
	methods: {
		selectMenu(event, index) {
			if (!event._constructed) return;
			let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
			let el = foodList[index];
			this.foodScroll.scrollToElement(el, 300);
		},
		_initScroll() {
			this.menuScroll = new BScroll(this.$refs.menuWrapper, {
				click: true,
				tap:true
			});
			this.foodScroll = new BScroll(this.$refs.foodWrapper, {
				probeType: 3,
				click: true,
				tap:true
			});
			this.foodScroll.on('scroll', (pos) => {
				this.scrollY = Math.abs(Math.round(pos.y));
			})
		},
		_calclateHeight() {
			let foodList = this.$refs.foodWrapper.getElementsByClassName("food-list-hook");
			let height = 0;
			this.listHeight.push(height);
			for (var i = 0; i < foodList.length; i++) {
				var item = foodList[i];
				height += item.clientHeight;
				this.listHeight.push(height);
			}
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
			let foods = [];
			this.goods.forEach(function(good) {
				good.foods.forEach(function(food) {
					if (!!food.count) {
						foods.push(food);
					}
				});
			});
			return foods;
		}
	},
	components: {
		shopCart,
		cartControl
	},
	props: {
		seller: {
			type: Object,
			required: true
		}
	}
}
</script>
<style lang="less" type="text/less" rel="stylesheet/less">
@import url("../../../src/common/less/mixin/mixin.less");
.goods-container {
	display: flex;
	position: absolute;
	top: 174px;
	bottom: 46px;
	width: 100%;
	overflow: hidden;
	.menu-wrapper {
		flex: 0 0 80px;
		width: 80px;
		background-color: #f3f5f7;
		.menu-item {
			display: table;
			height: 54px;
			width: 56px;
			line-height: 14px;
			padding: 0 12px;
			&.current {
				position: relative;
				z-index: 10;
				margin-top: -1px;
				background-color: #fff;
				font-weight: bold;
				.text {
					.border-none();
				}
			}
			.text {
				display: table-cell;
				vertical-align: middle;
				.border-1px(rgba(7, 17, 27, .1));
				width: 54px;
				line-height: 14px;
				font-size: 12px;
				text-align: center;
				.icon {
					display: inline-block;
					width: 16px;
					height: 16px;
					vertical-align: top;
					margin-right: 2px;
					background-size: 16px 16px;
					background-repeat: no-repeat;
					&.decrease {
						.bg-image("../../../components/goods/img/decrease_3"); // 减
					}
					&.discount {
						.bg-image("../../../components/goods/img/discount_3"); // 折
					}
					&.guarantee {
						.bg-image("../../../components/goods/img/guarantee_3"); // 保
					}
					&.invoice {
						.bg-image("../../../components/goods/img/invoice_3"); // 票
					}
					&.special {
						.bg-image("../../../components/goods/img/special_3"); // 特
					}
				}
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
			background-color: #f3f5f7;
			color: rgb(147, 153, 159);
			font-size: 12px;
		}
		.food-item {
			display: flex;
			margin: 18px;
			padding-bottom: 18px;
			.border-1px(rgba(7, 17, 27, .1));
			&:last-child {
				.border-none();
				margin-bottom: 0;
			}
			.icon {
				flex: 0 0 57px;
				margin-right: 10px;
				font-size: 10px;
				line-height: 10px;
			}
			.content {
				flex: 1;
				.name {
					margin: 2px 0 8px 0;
					font-size: 14px;
					color: rgb(77, 85, 93);
					line-height: 14px;
				}
				.desc,
				.extra {
					font-size: 10px;
					line-height: 10px;
					color: rgb(147, 153, 159);
				}
				.desc {
					margin-bottom: 8px;
					line-height: 12px;
				}
				.extra {
					.sales {
						margin-right: 12px;
					}
				}
				.price {
					line-height: 24px;
					.now {
						margin-right: 8px;
						font-size: 14px;
						font-weight: bold;
						color: #f01414;
					}
					.old-price {
						text-decoration: line-through;
						font-size: 10px;
						font-weight: bold;
						line-height: 14px;
						color: rgb(147, 153, 159);
					}
				}
				.cartcontrol-wrapper {
					position: absolute;
					right: 0;
					bottom: 8px;
				}
			}
		}
	}
}
</style>
