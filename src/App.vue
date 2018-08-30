<template>
  <div id="app">
    <transition name="fadeIn">
    <keep-alive>
      <!-- 需要缓存 -->
    <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    </transition>
<!-- 其他不需要缓存的走这里 -->
    <transition name="fadeIn">  
    <router-view v-if="!$route.meta.keepAlive"/>
    </transition>  
    <tab></tab>
  </div>
</template>

<script>
import Tab from "./base/Tab";
export default {
  name: "App",
  components: {
    Tab
  }
};
</script>
<style>
@import "./assets/reset.css";
.fadeIn-enter{
  opacity: 0;
}
.fadeIn-enter-active{
  transition: all .3s ease;
}
.fadeIn-leave-active{
  transition: all .3s ease;
  opacity: 0;
}
</style>



