<template>
  <div>
    <router-view/>
    <play-controller></play-controller>
  </div>
</template>

<script>
import playController from '@/components/playController.vue'
import { userDetail } from './api'
import {onMounted} from 'vue'
import {useStore} from 'vuex'
export default {
  components:{
    playController
  },
  setup(){
    const store = useStore()
    onMounted(()=>{
      if(localStorage.userData=!{}){
      let userData = JSON.parse(localStorage.userData)
      store.commit('setUser',userData)
    }
    })
  }
}
</script>

<style lang="less">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: '微软雅黑';
}
.icon{
  width: 0.30rem;
  height: 00.30rem;
}
a{
  color: #333;
  text-decoration: none;
}
</style>
