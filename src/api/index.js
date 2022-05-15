import axios from 'axios'

let baseUrl = 'http://localhost:3000'
//获取轮播图的api,type:资源类型,对应以下类型,默认为 0 即 PC
//1: android
//2: iphone
//3: ipad
export function getBanner(type=0){
    return axios.get(`${baseUrl}/banner?type=${type}`)
}

//获取推荐歌单
//limit: 取出数量 , 默认为 30 (不支持 offset)
export function getMusicList(limit=10){
    return axios.get(`${baseUrl}/personalized?limit=${limit}`)
}

// 获取歌单的详情
export function getPlaylistDetail(id){
    return axios.get(`${baseUrl}/playlist/detail?id=${id}`)
}

//获取歌词
export function getLyric(id){
    return axios.get(`${baseUrl}/lyric?id=${id}`)
}

//搜索歌曲
export function searchMusic(keyword){
    return axios.get(`${baseUrl}/search?keywords=${keyword}`)
}

//手机登录
export function phoneLogin(phone,password){
    return axios.get(`${baseUrl}/login/cellphone?phone=${phone}&password=${password}`) 

}

//手机登录
export function phoneLogin1(phone,captcha){
    return axios.get(`${baseUrl}/login/cellphone?phone=${phone}&captcha=${captcha}`)
}


//发送短信
export function captchaSent(phone){
    return axios.get(`${baseUrl}/captcha/sent?phone=${phone}`)
}

//接收验证码
export function captchaVerify(phone,captcha){
    return axios.get(`${baseUrl}/captcha/verify?phone=${phone}&captcha=${captcha}`)
}

//用户的详情
export function userDetail(uid){
    return axios.get(`${baseUrl}/user/detail?uid=${uid}`)
}

export default{
    getBanner,getMusicList,getPlaylistDetail,getLyric,searchMusic,phoneLogin,phoneLogin1,captchaSent,captchaVerify,userDetail
}