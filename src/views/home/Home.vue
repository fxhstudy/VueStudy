<template>
  <div id="home" class="home-nav">
    <nav-bar>
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <home-swiper :banners="banners"/>
  </div>
</template>

<script>
import NavBar from 'components/common/navBar/NavBar'
import HomeSwiper from "@/views/home/childComps/HomeSwiper";

import {getHomeMultidata} from "@/network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper
  },
  data() {
    return {
      banners: [],
      recommends: []
    }
  },
  created() {
    //1.请求多个数据
    getHomeMultidata().then(res => {
      this.banners = res.data.banner.list;
      console.log(this.banners);
      this.recommends = res.data.recommend.list;
      console.log(this.recommends);
    })
  }
}
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: white;
}
</style>
