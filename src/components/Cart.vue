<template>
  <div>
    <TopHeader>购物车</TopHeader>
    <ul class="content">
      <li v-for="l in cartList">
        <img :src="l.bookCover" alt="">
        <div class="container">
        <h3>{{l.bookName}}</h3>
        <button @click="changeNum(l.bookId,-1)">-</button> {{l.bookCount}} <button @click="changeNum(l.bookId,1)">+</button>
        <p>小计： {{l.bookPrice*l.bookCount}}</p>
        <button class="del" @click="del(l.bookId)">删除</button>
        </div>
      </li>
      <li class="count">
        <span>共{{count}}本</span><span>共 {{sum}} RMB</span>
        </li>
       
    </ul>
  </div>
</template>
<script>
import TopHeader from "../base/TopHeader.vue";
import { mapState, mapGetters } from "vuex";
import { mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  created() {},
  methods: {
  },
  computed: {
    ...mapGetters(["count", "sum"]),
    ...mapState(["cartList"])
  },
  components: { TopHeader }
};
</script>
<style scoped lang="less">
.content {
  width: 100%;
  li {
    display: flex;
    border-bottom: 1px solid #c6c6c6;
    margin-bottom: 2%;
    .container {
      width: 100%;
      h3 {
        font-size: 24px;
        font-weight: bold;
        line-height: 35px;
      }
      p {
        color: #2a2a2a;
        line-height: 25px;
      }
      button {
        display: inline-block;
        width: 30px;
        height: 30px;
        font-size: 20px;
        text-align: center;
        margin: 20px 0;
      }
      .del {
        display: inline-block;
        width: 60px;
        height: 40px;
        font-size: 20px;
        background: #ff0000;
        color: #fff;
        text-align: center;
        border: none;
      }
    }
    &.count {
      margin-top: 5%;
      display: flex;
      justify-content: flex-end;
      border: none;
      span {
        width: 25%;
        height: 35px;
        line-height: 35px;
        text-align: center;
        color: #fff;
        background: #ff0000;
      }
    }
  }
}
</style>
