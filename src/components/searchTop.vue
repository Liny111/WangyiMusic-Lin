<template>
    <div class="searchTop">
        <div class="searchTopNav">
            <div class="back" @click="$router.go(-1)">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-zuojiantou"></use>
                </svg>
            </div>
            <div class="right">
                <input type="text" v-model="searchKeyword" :placeholder="placeholder" @keydown.enter="saveKeyWord" >
                <svg class="icon" aria-hidden="true" @click="clear" v-show="searchKeyword != ''">
                    <use xlink:href="#icon-quxiao"></use>
                </svg>
            </div>
        </div>
        <div class="history" v-if="searchSongs.length == 0">
            <div class="historyLeft">
                历史
            </div>
            <div class="historyRight">
                <div @click="historySearch(item)" class="keywordItem" v-for="(item,i) in keywordList" :key="i">{{item}}</div>
            </div>
            <svg class="icon" aria-hidden="true" @click="clearHistory" v-show="keywordList != ''">
                <use xlink:href="#icon-quxiao"></use>
            </svg>
        </div>
        <div class="searchSongs" v-if="searchSongs.length !== 0">
            <div class="searchSongs-top">
                <div class="left">
                    <svg class="icon search" aria-hidden="true" >
                        <use xlink:href="#icon-bofang1"></use>
                    </svg>
                    <div class="text">
                        <div class="title">播放全部</div>
                        <div class="num">(共{{searchSongs.length}}首)</div>
                    </div>
                </div>
            </div>
            <div class="list">
                <div class="playItem" v-for="(item,i) in searchSongs" :key="i" @click="setPlay(item,i)" >
                    <div class="left">
                        <div class="index">{{i+1}}</div>
                        <div class="content">
                            <div class="title">{{item.name}}</div>
                            <div class="author">
                                <span class="tag" v-for="(tag,index) in searchSongs.tags" :key="index">{{tag}}</span>
                                <span>{{item.album.name}}</span>
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
    </div>
</template>

<script>
import {searchMusic} from '@/api/index.js'
import {ref,onBeforeMount,onUpdated} from 'vue'
import {useStore} from 'vuex'
export default {
    setup() {
        let store = useStore()
        let placeholder = ref('陈奕迅')   
        let keywordList = ref([])
        let searchKeyword = ref('')
        console.log(searchKeyword)
        let searchSongs = ref([])
        onBeforeMount(()=>{
        keywordList.value = localStorage.keywordList? JSON.parse(localStorage.keywordList):[]
        })
        onUpdated(()=>{
            console.log(ref)
            console.log(searchSongs)
            console.log(searchKeyword)
        })
        async function saveKeyWord(){
            if(searchKeyword.value!=''&&searchKeyword.value.trim()){
                keywordList.value.push(searchKeyword.value)
                keywordList.value = Array.from(new Set(keywordList.value))
                if(keywordList.value.length>10){
                    keywordList.value = keywordList.slice(keywordList.value.length-10,keywordList.value.length)
                }
                localStorage.keywordList = JSON.stringify(keywordList.value)
                let result = await searchMusic(searchKeyword.value)
                searchSongs.value = result.data.result.songs
                console.log(searchSongs.value)
            } 
        }
        function clear(){
            searchKeyword.value = ''
            searchSongs.value.length = [] 
        }
        function clearHistory(){
            keywordList.value = []
        }
        function historySearch(keyword){
            searchKeyword.value = keyword
            saveKeyWord()

        }
        function setPlay(item,i){
            console.log(item.album)
            item.al = item.album
            item.al.picUrl = item.album.artist.img1v1Url
            console.log(item)
            store.commit('pushPlaylist',item)
            store.commit('setPlayIndex',store.state.playlist.length-1)

        }
        return {
            store,placeholder,keywordList,searchKeyword,
            searchSongs,saveKeyWord,clear,clearHistory,
            historySearch,setPlay
        }
    }
}
    
    // data(){
    //     return {
    //         placeholder:"陈奕迅",
    //         keywordList:[],
    //         searchKeyword:'',
    //         searchSongs:[]
    //     }
    // },
    // beforeMount() {
    //     this.keywordList = localStorage.keywordList? JSON.parse(localStorage.keywordList):[]
    // },
    // updated() {
    //     console.log(this.searchSongs)
    // },
        
    // methods: {
    //     async saveKeyWord(){
    //         if(this.searchKeyword!=''&&this.searchKeyword.trim()){
    //             this.keywordList.push(this.searchKeyword)
    //             this.keywordList = Array.from(new Set(this.keywordList))
    //             if(this.keywordList.length>10){
    //                 this.keywordList = this.keywordList.slice(this.keywordList.length-10,this.keywordList.length)
    //             }
    //             localStorage.keywordList = JSON.stringify(this.keywordList)
    //             let result = await searchMusic(this.searchKeyword)
    //             this.searchSongs = result.data.result.songs
    //             console.log(this.searchSongs)
    //         } 
    //     },
    //     clear(){
    //         this.searchKeyword = ''
    //         this.searchSongs.length = []
            
    //     },
    //     clearHistory(){
    //         this.keywordList = []

    //     },
    //     historySearch(keyword){
    //         this.searchKeyword = keyword
    //         this.saveKeyWord()

    //     },
    //     setPlay(item,i){
    //         console.log(item.album)
    //         item.al = item.album
    //         item.al.picUrl = item.album.artist.img1v1Url
    //         console.log(item)
    //         this.$store.commit('pushPlaylist',item)
    //         this.$store.commit('setPlayIndex',this.$store.state.playlist.length-1)

    //     }
        

    // },
//}
</script>

<style lang="less" scoped>
.searchTop{
    width: 7.5rem;
    height: calc(100vh - 1.2rem);
    overflow: scroll;
    padding: 0 0.4rem;
    .searchTopNav{
        display: flex;
        width: 100%;
        height: 1.2rem;
        padding: 0 0.4rem;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        .icon{
            width: 0.6rem;
            height: 0.6rem;
            fill: #666;
        }
        .right{
            padding: 0 0 0 0.4rem  ;
            flex: 1;
            position: relative;
            input{
                border: none;
                outline: none;
                border-bottom: 1px solid #666;
                width: 100%;
                height: 0.5rem;
            }
            .icon{
                top: 0;
                position: absolute;
                right: 0rem;
                width: 0.5rem;
                height: 0.5rem;
            }
        }
    }
    .history{
        position: relative;
        display: flex;
        margin-top: 1.2rem;
        .historyLeft{
            width: 1.2rem;
            height: 0.6rem;
            font-weight: 900;
            margin: 0.2rem 0;
            line-height: 0.6rem;
        }
        .historyRight{
            color: #666;
            display: flex;
            flex-wrap: wrap;
            flex: 1;
            .keywordItem{
                background-color: #eee;
                height: 0.6rem;
                padding: 0 0.2rem;
                border-radius: 0.4rem;
                line-height: 0.6rem;
                margin: 0.2rem 0.1rem;
            }
        }
        .icon{
            position: absolute;
            right: 0rem;
            top: 0.4rem;
            width: 0.45rem;
            height: 0.45rem;
        }
    }
    .searchSongs{
    width: 7.5rem;
    padding: 0 0.4rem;
    background-color: #fff;
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
    position: fixed;
    top: 1.2rem;
    bottom: 1.2rem;
    overflow: scroll;
    .searchSongs-top{
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
}
</style>