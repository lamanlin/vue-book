<template>
 <div class="header">
<slot></slot>
<i class="iconfont icon-fanhui"  v-if="back" @click="goback"></i>
 </div>
</template>

<script>
export default {
  props: {
    back: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    goback() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped lang="less">
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 45px;
  background: #ca0c16;
  color: #ffffff;
  text-align: center;
  line-height: 45px;
  .icon-fanhui {
    position: absolute;
    left: 10px;
    display: inline-block;
    color: #ffffff;
    font-size: 30px;
  }
}
</style>
