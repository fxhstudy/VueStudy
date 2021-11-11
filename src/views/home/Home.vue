<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>
        <div slot="center">购物街</div>
      </template>
    </nav-bar>
    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"
                   ref="tabControl" :class="{fixed: isTabFixed}"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    //.native 监听组件点击
    <back-top @click.native="backClick" v-show="isShowBackTop"/>


  </div>
</template>

<script>
import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import RecommendView from "@/views/home/childComps/RecommendView";
import FeatureView from "@/views/home/childComps/FeatureView";

import NavBar from 'components/common/navBar/NavBar'
import Scroll from "@/components/common/scroll/Scroll";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import BackTop from "@/components/content/backTop/BackTop";

import {getHomeMultidata, getHomeGoods} from "@/network/home";
import {debounce} from "@/common/utils";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false
    }
  },
  computed: {
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  created() {
    //1.请求多个数据
    this.getHomeMultidata();

    //2.请求数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');


  },
  mounted() {
    /*// 监听item中图片加载完成
    this.$bus.on('itemImageLoad', () => {
      this.$refs.scroll.refresh();
    })*/
    // 1.图片加载完成后的事件监听
    const refresh = debounce(this.$refs.scroll.refresh, 1);
    this.$bus.on('itemImageLoad', () => {
      refresh()
    })

    // 2.获取tabControl的offsetTop
    // 所以组件都有一个属性$el - 用于获取组件中的元素的
  },
  methods:{
    /**
     * 事件监听相关的方法
     */
    tabClick(index){
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      // console.log(this.currentType);
    },
    backClick(){
      this.$refs.scroll.scrollTo(0, 0)
    },
    contentScroll(position){
      // console.log(position);
      //1.判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000

      //2.决定tabControl是否吸顶(position: fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore(){
      // console.log('加载更多的方法');
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad(){
      console.log(this.$refs.tabControl.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
    },

    /**
     * 网卡请求相关的方法
     */
    getHomeMultidata(){
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        // console.log(this.banners);
        this.recommends = res.data.recommend.list;
        // console.log(this.recommends);
      })
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        // console.log(this.goods);

        //完成上拉加载更多
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: white;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

.content{
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.fixed{
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
}
</style>
