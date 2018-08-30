<template>
 <div>
   <TopHeader>列表详情</TopHeader>
   <div class="content" ref="scroll" @scroll="loadMore">
     <div v-show="loadImg" class="loadImg"><img src="https://tse3-mm.cn.bing.net/th?id=OGC.a2a60676b32f9e639892a9d65b7eff8e&pid=1.7&rurl=http%3a%2f%2fsmartmo.unl.edu%2fportal_includes%2fimages%2floading_circle.gif&ehk=e%2f%2beNRsZcPdWhHEQEDIPQw" ></div>
     <ul>
      <router-link
       tag="li"
        :to="{name:'detail',params:{bid:book.bookId}}"
         v-for="(book,index) in books"
         :key="index"
       >
        <img v-lazy="book.bookCover" >
        <div class="container">
          <h4>{{book.bookName}}</h4>
          <p>{{book.bookInfo}}</p>
          <b>{{book.bookPrice}} RMB</b>
          <div class="btn-list">
          <button @click.stop="remove(book.bookId)" class="btn-del">删除</button>
          <button @click.stop="addCart(book)" id="btn-add">加入购物车</button>
          </div>         
        </div>
      </router-link>
     </ul>
     <div @click="more" class="more" v-if="hasMore">加载更多</div>
     <div v-else class="noMore">已经到底啦！！！</div>
   </div>

 </div>
</template>

<script>
import TopHeader from "../base/TopHeader";
import axios from "axios";
import { pagination, removeBook } from "../api";
import * as Types from "../store/mutations-type";
export default {
  data() {
    return {
      books: [],
      offset: 0,
      hasMore: true,
      isLoading: false,
      loadImg: false
    };
  },
  mounted() {
    let scroll = this.$refs.scroll; //获取到要拖拽的元素
    let top = scroll.offsetTop;
    let distance = 0;
    let isMove = false;
    scroll.addEventListener(
      "touchstart",
      e => {
        // 滚动条在最顶端时 并且当前盒子在顶端时候 才继续走
        if (scroll.scrollTop != 0 || scroll.offsetTop != top) return;
        let start = e.touches[0].pageY; //手指点击的开始
        let move = e => {
          isMove = true;
          this.loadImg = true;
          let current = e.touches[0].pageY;
          distance = current - start; //求的拉动的距离 负的就不要了
          if (distance > 0) {
            // 如果大于50了 认为就是50像素
            if (distance <= 150) {
              scroll.style.top = distance + top + "px";
            } else {
              distance = 150;
              scroll.style.top = top + distance + "px";
            }
          } else {
            // 如果没有移动 移除掉move和end事件
            scroll.removeEventListener("touchmove", move);
            scroll.removeEventListener("touchend", end);
          }
        };
        let end = e => {
          if (!isMove) return;
          isMove = false;
          clearInterval(this.timer1);
          this.timer1 = setInterval(() => {
            // 一共distance 每次-5
            if (distance <= 0) {
              clearInterval(this.timer1);
              distance = 0;
              scroll.style.top = top + "px";
              scroll.removeEventListener("touchmove", move);
              scroll.removeEventListener("touchend", end);
              this.books = []; // 先清空数据
              this.offset = 0;
              this.hasMore = true;
              this.getData();
              this.loadImg = false;
              return;
            }
            distance -= 5;
            scroll.style.top = top + distance + "px";
          }, 1);
        };
        scroll.addEventListener("touchmove", move);
        scroll.addEventListener("touchend", end);
      },
      false
    );
  },
  created() {
    this.getData();
  },
  components: {
    TopHeader
  },
  methods: {
    addCart(book) {
      this.$store.commit(Types.ADD_CART, book);
      this.$router.push("/cart");
    },
    loadMore() {
      //先开启一个定时器，用完再清除
      window.clearTimeout(timer);
      let timer = window.setTimeout(() => {
        let { scrollTop, clientHeight, scrollHeight } = this.$refs.scroll;
        if (scrollTop + clientHeight + 20 > scrollHeight) {
          this.getData(); //滚动超过一屏幕获取数据
        }
      });
    },
    more() {
      this.getData();
    },
    //删除书本
    async remove(id) {
      await removeBook(id);
      this.books = this.books.filter(item => item.bookId !== id);
    },
    //获取数据
    async getData() {
      if (this.hasMore && !this.isLoading) {
        //还有数据更新
        this.isLoading = true;
        let { hasMore, books } = await pagination(this.offset);
        this.books = [...this.books, ...books]; //把获取到的书本数据赋给books
        this.hasMore = hasMore;
        this.isLoading = false; //加载完毕
        this.offset = this.books.length;
      }
    }
  },
  computed: {}
};
</script>

<style scoped >
.content ul {
  padding: 10px;
}
.content ul li {
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid #f1f1f1;
}
.content ul li img {
  width: 130px;
  height: 150px;
}
.content h4 {
  font-size: 20px;
  line-height: 35px;
}
.content p {
  color: #2a2a2a;
  line-height: 25px;
}
.content b {
  color: red;
}
.content .container {
  width: 100%;
}
.content button {
  display: block;
  margin-top: 50px;
  width: 60px;
  height: 25px;
  background: orangered;
  color: #fff;
  border: none;
  border-radius: 15px;
  outline: none;
}
.btn-list {
  display: flex;
  justify-content: space-around;
}
#btn-add {
  width: 105px;
}
.more {
  margin: 10px;
  background: #c0c0c0;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 20px;
}
.noMore {
  text-align: center;
  font-size: 18px;
  color: #ccc;
}
.loadImg {
  display: flex;
  justify-content: center;
  align-items: center;
}
.loadImg img {
  width: 60px;
  height: 60px;
}
</style>
