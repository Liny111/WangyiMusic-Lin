<template>
<div class="playlist">
    <div class="playlist-top">
        <div class="left">
            <svg class="icon search" aria-hidden="true">
                <use xlink:href="#icon-bofang1"></use>
            </svg>
            <div class="text">
                <div class="title">播放全部</div>
                <div class="num">(共{{playlist.tracks.length}}首)</div>
            </div>
        </div>
        <div class="btn">
            + 收藏 ({{changeValue(playlist.subscribedCount)}})
        </div>
    </div>
    <div class="list">
        <div class="playItem" v-for="(item,i) in playlist.tracks" :key="i" @click="setIndex(i)" >
            <div class="left">
                <div class="index">{{i+1}}</div>
                <div class="content">
                    <div class="title">{{item.name}}</div>
                    <div class="author">
                        <span class="tag" v-for="(tag,index) in playlist.tags" :key="index">{{tag}}</span>
                        <span>{{item.al.name}}</span>
                    </div>
                </div>
            </div>
            <div class="right">
                <svg class="icon search" aria-hidden="true">
                    <use xlink:href="#icon-bofang1"></use>
                </svg>
                <svg class="icon search" aria-hidden="true">
                    <use xlink:href="#icon-liebiao2"></use>
                </svg>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {mapMutations,mapState} from 'vuex'
import {useStore} from 'vuex'
import {onMounted,ref,computed} from 'vue'
export default {
    props:['playlist'],
    setup() {
        let indexLength = ref(0)
        let store = useStore()
        let paused = computed(()=>{
            return store.state.paused
        })
        onMounted(()=>{
            indexLength.value = store.state.playlist.length
        })
        function changeValue(num){
            let res = 0
            if(num>=100000000){
                res = num/100000000
                res = res.toFixed(2) + '亿'
            }else if(num>=10000){
                res = num/10000
                res = res.toFixed(2) + '万'
            }else res = num
            return res
        }
        function setIndex(i){
            store.commit('setPlayIndex',i+indexLength.value)
            if(store.state.paused == false){
                store.commit('setPaused',true)
            }
        }
        return {
            store,indexLength,changeValue,setIndex
        }
    }
    // data(){
    //     return {
    //         indexLength:0
    //     }
    // },
    // props:['playlist'],
    // computed:{
    //     ...mapState(['paused'])
    // },
    // mounted() {
    //     this.indexLength = this.$store.state.playlist.length
    // },
    //  methods: {
    //     changeValue:function(num){
    //         let res = 0
    //         if(num>=100000000){
    //             res = num/100000000
    //             res = res.toFixed(2) + '亿'
    //         }else if(num>=10000){
    //             res = num/10000
    //             res = res.toFixed(2) + '万'
    //         }else res = num
    //         return res
    //     },
    //     ...mapMutations(['setPlayIndex','setPaused']),
    //     setIndex(i){
    //         this.setPlayIndex(i+this.indexLength)
    //         if(this.paused == false){
    //             this.setPaused(true)
    //             console.log(this.playlist.tracks)
                
    //         }
            
    //     }
    // },
}
</script>

<style lang="less" scoped>
.playlist{
    width: 7.5rem;
    padding: 0 0.4rem;
    background-color: #fff;
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
    margin-top: 0.4rem;
    .playlist-top{
    display: flex;
    justify-content: space-between;
    height: 1rem;
    align-items: center;
    .left{
        display: flex;
        align-items: center;
        .icon{
            width: 0.55rem;
            height: 0.55rem;
        }
        .title{
            font-size: 0.34rem;
            font-weight: 900;
        }
        .num{
            font-size: 0.24rem;
            color: #666;

        }
        .text{
            display: flex;
            align-items: center;
            margin-left: 0.2rem;
        }

    }
    .btn{
        font-size: 0.24rem;
        color: #fff;
        background-color: orangered;
        line-height: 0.6rem;
        padding:0.1rem;
        border-radius: 0.4rem;
        

    }
    
    }
    .list{
        .playItem{
            margin: 0.4rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            //height: 1rem;
            .left{
                display: flex;
                align-items: center;
                color: #666;
                .index{
                    width: 0.4rem;
                }
                .content{
                    margin-left: 0.4rem;
                }
                .title{
                    font-size: 0.3rem;
                    font-weight: 900;
                    color: #000;
                    margin-bottom: 0.1rem;
                }
                .tag{
                    font-size: 0.01rem;
                    color: orangered;
                    border: 1px solid orangered;
                    border-radius: 0.05rem;
                }
                .author{
                    color: #666;
                    font-size: 0.1rem;
                }
            }
            .right{
                display: flex;
                .icon{
                    margin: 0 0.2rem;
                    width: 0.45rem;
                    height: 0.45rem;
                }
            }
        }
    }
}



</style>