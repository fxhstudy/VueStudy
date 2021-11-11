<template>
  <swiper>
    <swiper-item v-for="(item,index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import SwiperItem from "@/components/common/swiper/SwiperItem";
import Swiper from "@/components/common/swiper/Swiper";

export default {
  name: "HomeSwiper",
  data() {
    return{
      isLoad: false
    }
  },
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
  },
  methods: {
    imageLoad(){
      if (!this.isLoad){
        this.$emit('swiperImageLoad');
        this.isLoad = true
      }

    }
  }
}
</script>

<style scoped>

</style>
