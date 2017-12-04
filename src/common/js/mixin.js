import formatDate from './formatDate.js';
const ALL = 2;
export const ratingsMixin = {
  methods: {
    /**
       在v-show中使用函数来判断评价列表的显示内容
        1.0 勾选了只看有内容的评价但是没有评价内容，返回false
        2.0 选择了查看所有评价按钮，直接返回true，不论评价有没有内容
        3.0 判断当前的评论查看类型是否就等于用户点击的查看类型
    */
    needShow(type, text) {
      if (this.onlyContent && !text) {
        return false;
      }
      if (this.selectType === ALL) {
        return true;
      } else {
        return type === this.selectType;
      }
    },
    // 改变子组件的评价查看状态
    toggleContent() {
      this.onlyContent = !this.onlyContent;
      this.$nextTick(() => {
        this.$refs.scroll.refresh();
      })
    },
    // 改变子组件的评价查看状态
    ratingtypeSelect(type) {
      this.selectType = type;
      this.$nextTick(() => {
        this.$refs.scroll.refresh();
      })
    }
  },
  // 日期过滤函数
  filters: {
    formatData(time) {
      let date = new Date(time);
      return formatDate(date, 'YYYY-MM-DD', 'hh:mm');
    }
  },
}
