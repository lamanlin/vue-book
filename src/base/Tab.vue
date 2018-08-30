<template>
 <div class="footer">
  <router-link to="/home">
<i class="iconfont icon-shouye"></i>
<span>首页</span>
</router-link>
<router-link  to="/list">
<i class="iconfont icon-list"></i>
<span>列表</span>
</router-link>
<router-link  to="/cart">
<i class="iconfont icon-qicheqianlian--copy"></i>
<span>购物车</span>
</router-link>
<router-link  to="/add">
<i class="iconfont icon-icon02"></i>
<span>添加</span>
</router-link>
</div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  methods: {},
  computed: {}
};
</script>

<style scoped lang="less">
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50px;
  display: flex;
  border-top: 1px solid #ccc;
  a {
    display: flex;
    color: #ca0c16;
    flex-direction: column;
    flex: 1;
    align-items: center;
    justify-content: center;
    i{
      font-size: 20px;
    }
    span{
      font-size: 14px;
    }
  }
  a.router-link-active{
     color: #00ff40;
  }
}
</style>
