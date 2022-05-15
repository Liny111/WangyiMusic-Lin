<template>
  <swiper
    :modules="modules"
    :slides-per-view="1"
    :space-between="50"
    :pagination="{ clickable: true }"
    :scrollbar="{ draggable: true }"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
    style="z-index:0"
  >

    <swiper-slide class="swiper-slide" v-for="(item,i) in imgs.imgs" :key="i"><img :src="item.pic" ></swiper-slide>

  </swiper>
</template>
<script>
  // import Swiper core and required modules
  import {Navigation, Pagination, Scrollbar, A11y } from 'swiper';

  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import axios from 'axios'
  // Import Swiper styles
  import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';
  import 'swiper/css/scrollbar';
  import {getBanner} from '@/api/index.js'
  import {reactive,onMounted} from 'vue'

  // Import Swiper styles
  export default {
    // data:function() {
    //   return{
    //     imgs:[
    //     {pic:require('../assets/img/swiper1.gif')},
    //     {pic:require('../assets/img/swiper2.gif')},
    //     {pic:require('../assets/img/swiper3.gif')}
      
    //   ]
    //   }
    //   },

  
      // async mounted(){
      //   let res = await getBanner(1)
      //   this.imgs = res.data.banners
       
      // },
    
      
      // async function init(){
      //   let res = getBanner(1)
      //   this.imgs = res.data.banners
      //  }
      //  init()
      
      

    components: {
      Swiper,
      SwiperSlide,
    },
    setup() {

      let imgs = reactive({imgs:[
        {pic:require('../assets/img/swiper1.gif')},
        {pic:require('../assets/img/swiper2.gif')},
        {pic:require('../assets/img/swiper3.gif')}
      
      ]})

      const onSwiper = (swiper) => {
        //console.log(swiper);
      };
      const onSlideChange = () => {
        console.log('slide change');
      };
      //vue3中不行
      onMounted(async ()=>{
        let res = await getBanner(1)
        imgs.imgs = res.data.banners
      })
            // async mounted(){
      //   let res = await getBanner(1)
      //   this.imgs = res.data.banners
       
      // },
      
      
      
      
      return {
        imgs,
        onSwiper,
        onSlideChange,
        modules: [Navigation, Pagination, Scrollbar, A11y],
      };
    },
    
  };
</script>

<style scoped>

.swiper-slide {
    width: 7.1rem;
    height: 3rem;
    border-radius: 0.1rem;
  }
  .swiper-slide img{
    width: 100%;
  }

</style>