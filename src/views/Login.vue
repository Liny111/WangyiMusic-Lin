<template>
<div class="login-bg">
    <div class="login-contain">
        <svg class="icon" aria-hidden="true" @click="router.push('/')">
            <use xlink:href="#icon-zuojiantou1"></use>
        </svg>
        <div class="login-header">
            <p>欢迎登录</p>
        </div>
        <div class="form-group">
            <div class="form-item">
                <label for="username">
                    <img src="../assets/img/user.png">
                </label>
                <input v-model="phone" id="username" type="text" placeholder="请输入手机号码">
            </div>
            <div class="form-item">
                <label for="password">
                    <img src="../assets/img/password.png" alt="">
                </label>
                <input v-model="password" id="password" type="password" placeholder="请输入密码" v-if="login == true" autocomplete="off">
                <input v-model="captcha"  type="number" placeholder="请输入验证码" style="position: relative" v-else autocomplete="off">
                <button v-show="login == false" @click="Sent" style="width:1.2rem;font-size:0.2rem;margin: 0.05rem 0.75rem;position: absolute;background-color:#fff;color:#74C3CA;" autocomplete="off">发送短信</button>
            </div>
            
        </div>
        <div class="button-group">
            <button @click="loginEvent"  class="login-btn" id="doLogin" v-if="login == true">登录</button>
            <button @click="loginEvent1" class="login-btn" id="doLogin" v-else>登录</button>
        </div>

        <div class="order-login">
            <p class="order-login-line">其他登录方式</p>
            <div class="order-login-box">
                <div>
                    <a href="#">
                        <img src="../assets/img/wechat-login.png" alt="" style="width: 45px;height: 45px;">
                        <p>微信登录</p>
                    </a>
                </div>
                <div @click="login = !login" v-if="login == true">
                    <a href="#">
                        <svg class="icon search" aria-hidden="true" style="width: 45px;height: 45px;margin-top:0;" >
                            <use xlink:href="#icon-shoujidenglu"></use>
                        </svg>
                        <p>短信登录</p>
                    </a>
                </div>
                <div @click="login = !login" v-else>
                    <a href="#">
                        <svg class="icon search" aria-hidden="true" style="width: 45px;height: 45px;margin-top:0;">
                            <use xlink:href="#icon-denglu-copy"></use>
                        </svg>
                        <p>密码登录</p>
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {ref} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
export default {
    setup() {
        const store = useStore()
        const router = useRouter()
        let phone = ref('');
        let password = ref('');
        let captcha = ref('');
        let login = ref(true);

        async function loginEvent(){
            let result = await store.dispatch('phoneLogin',{phone:phone,password:password})
            if(result.data.code==200){
            $router.push('/me')                 
            }
        }
        async function Sent(){
            let result = await store.dispatch('captchaSent',{phone:phone})
            console.log(result)
        }
        async function loginEvent1(){
            let result = await store.dispatch('captchaVerify',{phone:phone,captcha:captcha})
            if(result.data.code==200){
                let result = await store.dispatch('phoneLogin1',{phone:phone,captcha:captcha})
                this.$router.push('/me')
            }
        }
        return {
            store,
            router,
            phone,
            password,
            captcha,
            login,
            loginEvent,
            loginEvent1,
            Sent

        }


    }
    
}
//     data(){
//         return {
//             phone:'',
//             password:'',
//             captcha:'',
//             login:true
//         }
//     },
//     methods: {
//         async loginEvent(){
//             let result = await this.$store.dispatch('phoneLogin',{phone:this.phone,password:this.password})
//             if(result.data.code==200){
//                 this.$router.push('/me')
                
//             }
//         },
//         async Sent(){
//             let result = await this.$store.dispatch('captchaSent',{phone:this.phone})
//             console.log(result)
//         },
//         async loginEvent1(){
//             let result = await this.$store.dispatch('captchaVerify',{phone:this.phone,captcha:this.captcha})
//             if(result.data.code==200){
//                 let result = await this.$store.dispatch('phoneLogin1',{phone:this.phone,captcha:this.captcha})
//                 this.$router.push('/me')
//             }
//         }
        
        
        
//     },
// }
</script>

<style lang="less" scoped>

a, li {
    list-style: none;
}
a {
    text-decoration: none;
    color: black;
}
.login-bg {
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    z-index: 1000;
    background: orangered;
    color: #ffffff;
    background-size: 100% 100%;
}
.login-contain {
    width: 85%;
    margin: 0 auto;
}
.login-header {
    //display: flex;
    padding: 10%;
}
.icon{
    margin-top: 0.5rem;
    width: 1rem;
    height: 1rem;
    fill: #fff;
}
.login-header p {
    font-size: 32px;
    color: #ffffff;
    font-weight: bold;
    text-align: center;
    letter-spacing: 2px;
    text-shadow: 0.1em 0.15em 0.1em #74C3CA
}
.login-logo {
    padding: 5%;
}
.login-logo img {
    width: 55px;
    height: 55px;
    border-radius: 50%;
}
.login-logo p {
    color: #ffffff;
    font-size: 14px;
    text-align: center;
    letter-spacing: 2px;
    margin-top: 2%;
}
.form-group {
    padding: 5%;
}
.form-group .form-item {
    margin-top: 5%;
    padding:0 10px;
    border-radius: 20px;
    background-color: rgba(0,0,0,.1);
}
.form-group .form-item input {
    outline: none;
    border: 0;
    background-color: transparent !important;
    color: #ffffff;
    height: 40px;
    font-size: 18px;
    width: 55%;
    margin-left: 12%;
    box-shadow: 0 0 0px 1000px #E53E00 inset !important;
    -webkit-text-fill-color: white;
    border: none !important;
}

.form-group .form-item button {
    // background-color: #fff;
    // margin: 0.1rem 0rem;
    border-radius: 20px;
    outline: none;
    width: 90%;
    height: 35px;
    margin-top: 4%;
    border-radius: 20px;
    margin-left: 4%;
    color: #ffffff;
    font-size: 18px;
    border: none;
}
.form-group .form-item .btn {
    background-color: #ffffff;
    color: #74C3CA;
}
.form-group .form-item input::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #ffffff;
    font-size: 16px;
}
.form-group .form-item input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #ffffff;
    font-size: 16px;
}
.form-group .form-item input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #ffffff;
    font-size: 16px;
}
.form-group .form-item input:-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: #ffffff;
    font-size: 16px;
}
.form-group .form-item label img {
    width: 25px;
    position: absolute;
    margin-top: 5px;
}
.form-group .form-item button {
    outline: none;
    background: transparent;
    color: #ffffff;
    height: 35px;
    width: 90%;
    float: left;
    border-radius: 1rem;

    padding: 1%;
}
.button-group {
    padding: 5%;
}
.button-group button {
    outline: none;
    border: 0;
    width: 90%;
    height: 35px;
    margin-top: 4%;
    border-radius: 20px;
    margin-left: 4%;
    color: #ffffff;
    font-size: 18px;
}
.button-group .login-btn {
    background-color: #ffffff;
    color: #74C3CA;
}

.order-login {
    padding: 5%;
}
.order-login-line {
    display: block;
    position: relative;
    text-align: center;
    font-size: 14px;
    color: #ffffff;
}
.order-login-line:before,
.order-login-line:after {
    content: '';
    position: absolute;
    top: 50%;
    background: #ffffff;
    width: 20%;
    height: 1px;
}
.order-login-line:before {
    left: 10%;
}
.order-login-line:after {
    right: 10%;
}
.order-login-box {
    display: flex;
    width: 100%;
    justify-content:center;
    margin-top: 20px;
}
.order-login-box div{
    flex: 1;
    text-align: center;
}
.order-login-box div p{
    text-align: center;
    font-size: 14px;
    color: #ffffff;
}
</style>