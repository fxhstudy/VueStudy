<template>
  <swiper>
    <swiper-item v-for="(item,index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import SwiperItem from "@/components/common/swiper/SwiperItem";
import Swiper from "@/components/common/swiper/Swiper";

export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default(){
        return []
      }
    }
  },
  components: {
    SwiperItem,
    Swiper
  }
}
</script>

<style scoped>

</style>
