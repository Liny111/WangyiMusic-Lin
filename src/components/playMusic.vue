<template>
  <div class="playMusic" >
      <div class="bg"  :style="{backgroundImage:`url(${playDetail.al.picUrl})`}"></div>
      <div class="playTop">
          <div class="back" @click="$emit('back')">
                <svg class="icon search" aria-hidden="true" @click="play">
                    <use xlink:href="#icon-zuojiantou"></use>
                </svg>
          </div>
          <div class="center">
                <div class="title">
                    <marquee behavior="scroll" direction="left">{{playDetail.name}}</marquee>
                    <!-- {{playDetail.name}} -->
                </div>
          </div>
          <div class="share">
                <svg class="icon search" aria-hidden="true" @click="play">
                    <use xlink:href="#icon-fenxiang"></use>
                </svg>
          </div>
      </div>
    <div @click="isLyric=!isLyric">
        <div class="playContent" v-if="!isLyric" >
            <img class="needle" :class="{active:!paused}" src="@/assets/img/needle-ab.png" alt="">
            <img class="disc" src="@/assets/img/disc_default1.png" alt="">
            <img class="playImg" :class="{active:!paused}" :src="playDetail.al.picUrl" alt="">
        </div>
        <div class="playLyric"  v-show="isLyric" ref="playLyric">
            <p  :class="{active:(currentTime*1000 >= item.time&&currentTime*1000<item.pre)}" v-for="(item,i) in lyricList" :key="i">{{item.lyric}}</p>
        </div>
        <div class="progress"></div>
    </div>
      <div class="playFooter">
          <svg class="icon" aria-hidden="true" >
                <use xlink:href="#icon-xunhuan"></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
                <use xlink:href="#icon-shangyishoushangyige"></use>
            </svg>
            <svg v-if="paused" class="icon play" aria-hidden="true" @click="play">
                <use xlink:href="#icon-bofang1"></use>
            </svg>
            <svg v-else class="icon play" aria-hidden="true" @click="play">
                <use xlink:href="#icon-zanting1"></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="goPlay(1)">
                <use xlink:href="#icon-xiayigexiayishou"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-liebiao"></use>
            </svg>
      </div>
  </div>
</template>

<script>
import {ref,watch,onUpdated, computed} from 'vue'
import {useStore} from 'vuex'
import {mapState} from 'vuex'
export default {
    props:['playDetail','paused',"play"],
    setup() {
        let isLyric = ref(true)
        const store = useStore()
        let p = null
        let playLyric=ref([])
        let lyric = ref(store.state.lyric) 
        let currentTime =computed(()=>{
            return store.state.currentTime
        })
        let playlist =computed(()=>{
            return store.state.playlist
        })
        let playCurrentIndex =computed(()=>{
            return store.state.playCurrentIndex
        })
        let lyricList = computed(()=>{
            return store.getters.lyricList
        })
        
        onUpdated(()=>{
            
            //console.log(offsetTop)
            //console.log(p)
            
            
        })
        watch(currentTime,(newValue)=>{
            p = document.querySelector(`p.active`)
            let offsetTop = p.offsetTop
            playLyric.value.scrollTop = p.offsetTop - 180
            //console.log([p])

            })
        

        // watchEffect(()=>{
            
        //     p._rawValue.forEach((item) => {
        //         if(item.getAttribute('class') == 'active'){
        //             let offsetTop = item.offsetTop
        //             playLyric.scrollTop = offsetTop - 180
        //         }
        //     })
        // })

        function goPlay(num){
            let index =  store.state.playCurrentIndex+num
            if(index<0){
                index = store.state.playlist.length -1
            }else if(index==store.state.playlist.length){
                index = 0
            }
            store.commit('setPlayIndex',index)
        }
        return{
            isLyric,store,
            lyric,currentTime,
            playlist,playCurrentIndex,
            goPlay,p,playLyric,lyricList
        }

    }
//     data(){
//         return {
//             isLyric:false
//         }
//     },
//     computed:{
//         ...mapState(['lyric','currentTime','playlist','playCurrentIndex']),
//     },
//     watch:{
//         currentTime(newValue){
//             console.log(newValue)
//             console.log([this.$refs.playLyric])
//             let p = document.querySelector(`p.active`)
//             let  offsetTop = p.offsetTop
//             this.$refs.playLyric.scrollTop = p.offsetTop -180
//             console.log([p])
//         }
//     },
//     methods: {
//         goPlay(num){
//             //console.log(num)
//             //console.log(this.playlist)
//             //console.log(this.playCurrentIndex)
//             let index = this.playCurrentIndex+num
//             if(index<0){
//                 index = this.playlist.length -1
//             }else if(index==this.playlist.length){
//                 index = 0
//             }
//             this.$store.commit('setPlayIndex',index)
//         }
//     },
}
</script>

<style lang="less" scoped>
.playMusic{
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    .bg{
        position: absolute;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        background-size: auto 100%;
        background-position: center;
        filter: blur(60px);
        
    }
    .playTop{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 7.5rem;
        height: 1.2rem;
        position: absolute;
        left: 0;
        top: 0;
        color: #fff;
        padding: 0 0.4rem;
        .icon{
            fill: #fff;
            width: 0.4rem;
            height: 0.4rem;
        }
        marquee{
            width: 5rem;
            flex: 1;
        }

    }
    .playContent{
        position: absolute;
        width: 7.5rem;
        height: 7.5rem;
        left: 0;
        top: 1.5rem;
        .needle{
            width: 2rem;
            height: auto;
            position: absolute;
            left: 3.5rem;
            transform-origin: 0.3rem 0;
            transform: rotate(-10deg);
            transition: all 1s;
            z-index: 10;
        }
        .needle.active{
            transform: rotate(13deg);
            transition: all 1s;
            z-index: 10;
        }
        .disc{
            width: 5.5rem;
            height: auto;
            position: absolute;
            left: calc(50% - 2.75rem) ;
            top: 2.5rem;

        }
        .playImg{
            width: 3.4rem;
            height: 3.4rem;
            border-radius: 1.7rem;
            position: absolute;
            left: calc(50% - 1.7rem) ;
            top: 3.55rem;
            display: block;
            animation: rotate 6s linear infinite;
            animation-play-state: paused;
        }
        @keyframes rotate {
                0% {
                    transform: rotate(0deg);
                }
                100%{
                    transform: rotate(360deg);
                }
        }
         .playImg.active{
            width: 3.4rem;
            height: 3.4rem;
            border-radius: 1.7rem;
            position: absolute;
            left: calc(50% - 1.7rem) ;
            top: 3.55rem;
            display: block;
            animation: rotate 6s linear infinite;
            animation-play-state: running;
        }
    }
    .playFooter{
        width: 7.5rem;
        height: 1.5rem;
        position: absolute;
        left: 0;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.4rem;
        .icon{
            fill:#fff;
            width: 0.5rem;
            height: 0.5rem;
        }
        .play.icon{
            width: 0.8rem;
            height: 0.8rem;
        }
    }
    .playLyric{
        margin-top: 2rem;
        padding: 1.5rem;
        position: absolute;
        width: 7.5rem;
        height: 8rem;
        left: 0;
        top: calc(50%-4rem);
        overflow: scroll;
        text-align: center;
        color: #fff;
        p{
            margin-top: 0.3rem;
        }
        .active{
            color: orangered;
            line-height: 1rem;
            font-size: 0.35rem;
        }
    }
}

</style>