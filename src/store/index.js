import { createStore } from 'vuex'
import api from '@/api/index.js'

export default createStore({
  state: {
    playlist:[{
      name:"Wake",
      id:1873321491,
      al:{
        id: 132402226,
        name: "Wake",
        pic: 109951166328143740,
        picUrl: "http://p4.music.126.net/Uo7OXdK3g4LQdc2hzJ14qQ==/109951166328143737.jpg",
        pic_str: "109951166328143737"
      }}],
    playCurrentIndex:0,
    paused:true,
    lyric:'',
    currentTime:0,
    intervalId:0,
    user:{
      isLogin:false,
      account:{},
      userDetail:{}


    }
  },
  getters: {
    lyricList(state){
      let arr = state.lyric.split(/\n/igs).map((item,i,arr)=>{
          let min = parseInt(item.slice(1,3));
          let sec = parseInt(item.slice(4,6));
          let mill = parseInt(item.slice(7,10));
          let lyric = item.split(/\]/g)[1]
          

         
          
          return {
            min,sec,mill,lyric,item,
            //lyric:item.slice(11,item.length),
            //content:item,
            time:mill+sec*1000+min*60*1000,
            }
          })
          arr.forEach((item,i)=>{
            if(i == arr.length-1){
              item.pre = item.pre
            }else{
              item.pre = arr[i+1].time
            }
          })

          return arr
      
  }
  },
  mutations: {
    setPlaylist(state,value){
      state.playlist = value
      //console.log('111',state.playlist)
    },
    pushPlaylist(state,value){
      state.playlist.push(value)
      //console.log('111',state.playlist)
    },
    setPlayIndex(state,value){
      state.playCurrentIndex = value
      //console.log('111',state.playCurrentIndex)
    },
    setPaused(state,value){
      state.paused = value
    },
    setLyric(state,value){
      state.lyric = value
      
    },
    setCurrentTime(state,value){
      state.currentTime = value
    },
    setUser(state,value){
      state.user = value
    }
  },
  actions: {
    async reqLyric(content,payload){
      //console.log(payload)
      let result =await api.getLyric(payload.id)
      content.commit('setLyric',result.data.lrc.lyric)
      //console.log(result.data.lrc.lyric)
    },
    async captchaSent(content,payload){
      //console.log(payload)
      let result = await api.captchaSent(payload.phone)
      return result
      
    },
    async captchaVerify(content,payload){
      let result = await api.captchaVerify(payload.phone,payload.captcha)
      return result
    },
    async phoneLogin1(content,payload){
      let result =await api.phoneLogin1(payload.phone,payload.captcha)
      if(result.data.code==200){
        content.state.user.isLogin = true
        content.state.user.account = result.data.account
        console.log(result)
        let userDetail = await api.userDetail(result.data.account.id)
        content.state.user.userDetail = userDetail.data
        localStorage.userData = JSON.stringify(content.state.user)
        content.commit('setUser',content.state.user)
      }
      return result
    },

    async phoneLogin(content,payload){
      console.log(payload)
      let result =await api.phoneLogin(payload.phone,payload.password)
      
      if(result.data.code==200){
        content.state.user.isLogin = true
        content.state.user.account = result.data.account
        console.log(result)
        let userDetail = await api.userDetail(result.data.account.id)
        content.state.user.userDetail = userDetail.data
        localStorage.userData = JSON.stringify(content.state.user)
        content.commit('setUser',content.state.user)
      }
      console.log(result)
      return result
    }
  },

  modules: {
  }
})
