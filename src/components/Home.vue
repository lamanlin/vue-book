<template>
 <div>
<TopHeader>书城</TopHeader>
  <div class="content">
    <Loading v-if="loading"></Loading>
  <template v-else>
      <!-- 轮播图 -->
  <Swiper :swiperSlides="sliders1" class="banner"></Swiper>
  <!-- 热门图书 -->
   <div class="container">
        <h3>热门图书</h3>
        <ul>
          <li v-for="hot in hotBooks">
            <img :src="hot.bookCover">
            <b>{{hot.bookName}}</b>
          </li>
        </ul>
      </div>
  </template>
  </div>
 </div>
</template>

<script>
import TopHeader from "../base/TopHeader";
import Loading from "../base/Loading";
import Swiper from "../base/Swiper";
import { getAll } from "../api";
export default {
  created() {
    this.getData();
  },
  name: "carrousel",
  data() {
    return {
      swiperOption: {
        loop: true,
        autoplay: true,
        pagination: {
          el: ".swiper-pagination"
        }
      },
      sliders1: [],
      hotBooks: [],
      loading: true
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  components: {
    TopHeader,
    Swiper,
    Loading
  },
  methods: {
    async getData() {
      let [sliders1, hotBooks] = await getAll();
      this.sliders1 = sliders1;
      this.hotBooks = hotBooks;
      this.loading = false; //表示加载完成
    }
  }
};
</script>

<style scoped lang="less">
.content {
  width: 100%;
  .banner {
    width: 100%;
    img {
      width: 100%;
      height: 156px;
    }
  }
  .container {
    width: 90%;
    margin: 0 auto;
    h3 {
      color: #999;
      padding: 5px 0;
    }
    ul {
      display: flex;
      flex-wrap: wrap; /*默认不换行*/
      padding-bottom: 10px;
      li {
        width: 50%;
        text-align: center;
        margin: 5% 0;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>



