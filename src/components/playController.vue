<template>
  <div class="playController">
      <div class="left" @click="show=!show">
          <img :src="playlist[playCurrentIndex].al.picUrl" alt="">
          <div class="content">
              <div class="title">{{playlist[playCurrentIndex].name}}</div>
              <div class="tips">横滑可以切换上下首</div>
          </div>
      </div>
      <div class="right">
            <svg v-if="paused" class="icon search" aria-hidden="true" @click="play">
                <use xlink:href="#icon-bofang1"></use>
            </svg>
            <svg v-else class="icon search" aria-hidden="true" @click="play">
                <use xlink:href="#icon-zanting1"></use>
            </svg>
            <svg class="icon search" aria-hidden="true">
                <use xlink:href="#icon-liebiao1"></use>
            </svg>
      </div>
      <play-music :play="play" :paused="paused" @back="show=!show" v-show="show" :playDetail="playlist[playCurrentIndex]" ></play-music>
      <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playlist[playCurrentIndex].id}.mp3`"></audio>
  </div>
</template>

<script> 
import {mapState,mapMutations} from 'vuex'
import playMusic from '@/components/playMusic.vue'
import { computed,ref,onMounted,onUpdated} from 'vue'
import {useStore} from 'vuex'
export default {
    components:{
        playMusic
        },
    setup() {
        let show = ref(false)
        let audio = ref(null)
        const store = useStore()
        let playlist = computed(()=>{
            return store.state.playlist
        })
        let playCurrentIndex = computed(()=>{
            return store.state.playCurrentIndex
        })
        let paused = computed(()=>{
            return store.state.paused
        })
    onMounted(()=>{
        //console.log([refs.audio])
        store.dispatch('reqLyric',{id:playlist.value[playCurrentIndex.value].id})
        // console.log(playlist.value[playCurrentIndex.value])
        // console.log([playCurrentIndex])

        })
    onUpdated(()=>{
        store.dispatch('reqLyric',{id:playlist.value[playCurrentIndex.value].id})
        //console.log([store.state.lyricLis]
    })
    function play(){
        if( audio.value.paused){
            audio.value.play()
            store.commit('setPaused',false)
            //setPaused(false)
            updateTime()
        }else{
            audio.value.pause()
            //setPaused(true)
            store.commit('setPaused',true)
            clearInterval(store.state.id)
        }
        }
        function updateTime(){
            store.state.id = setInterval(()=>{
                //console.log([this.$refs.audio])
                store.commit('setCurrentTime',audio.value.currentTime)
                //console.log(audio.value.currentTime)
            },100)
        }
        return {
            show,
            audio,
            playlist,
            playCurrentIndex,
            paused,play,updateTime
        }
    }
    


    // data(){
    //     return {
    //         //paused:true,
    //         show:false
    //     }
    // },
    // computed:{
    //     ...mapState(['playlist','playCurrentIndex','paused'])
    // },
    // mounted() {
        
    //     //console.log([this.$refs.audio])
    //     this.$store.dispatch('reqLyric',{id:this.playlist[this.playCurrentIndex].id})
    // },

    // updated() {
        
    //     console.log(this.playlist[this.playCurrentIndex])
    //     this.$store.dispatch('reqLyric',{id:this.playlist[this.playCurrentIndex].id})
    //     //console.log([this.$store.state.lyricLis]
        
    // },
    // methods: {
    //     play(){
    //         console.log(this.$refs.audio.currentTime)
    //         if( this.$refs.audio.paused){
    //             this.$refs.audio.play()
    //             this.setPaused(false)
    //             this.updateTime()
    //         }else{
    //             this.$refs.audio.pause()
    //             this.setPaused(true)
    //             clearInterval(this.$store.state.id)
    //         }
    //     },
    //     updateTime(){
    //         this.$store.state.id = setInterval(()=>{
    //             //console.log([this.$refs.audio])
    //             this.$store.commit('setCurrentTime',this.$refs.audio.currentTime)
    //         },100)
    //     },
    //     ...mapMutations(['setPaused'])
    // },

}
</script>

<style lang="less">
.playController{
    background: #fff;
    width: 7.5rem;
    height: 1.2rem;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #ccc;
    .left{
        display: flex;
        padding: 0 0.2rem;
        img{
            width: 0.8rem;
            height: 0.8rem;
            border-radius: 0.4rem;
        }
        .content{
            padding:0 0.2rem;
            .tips{
                font-size: 0.2rem;
                color: #999;
            }
        }
    }
    .right{
        display: flex;
        .icon{
            width: 0.55rem;
            height: 0.55rem;
            margin: 0 0.2rem;
        }
    }
}

</style>