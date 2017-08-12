<template>
  <div class="row" v-cloak>
    <div class="register-box">
      <div class="left">
        <div class="inner">
          <img src="/img/assets/logo1.png">
          <div class="text">hello,欢迎您再次回来</div>
        </div>
      </div>
      <div class="right">
        <input v-model="account" placeholder="请输入账号">
        <input v-model="code" placeholder="请输入密码">
        <div class="regist" @click="submit">登录</div>
        <div class="forget">忘记密码?</div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript">
  import axios from '~/plugins/axios'
  import toastr from 'toastr'

  toastr.options = {
    closeButton: false,
    debug: false,
    progressBar: false,
    positionClass: "toast-top-full-width",
    onclick: null,
    showDuration: "200",
    hideDuration: "800",
    timeOut: "1500",
    extendedTimeOut: "800",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut"
  };
  export default {
    head: {
      title: '登录',
      script: [
        {src: 'js/jQuery.min.js'},
        {src: 'js/layer.js'},
        {src: 'js/bootstrap.min.js'}
      ]
    },
    created () {
        /*this.getToken();*/
    },

    data () {
      return {
        account:'',
        code:'',
        token:''
      }
    },
    methods: {
      /*getToken(){
        var that = this;
        axios({
          method:'post',
          url:'/uaa/oauth/token',
          auth: {
            username: 'client',
            password: 'secret'
          },
          headers: {
            'Accept': "application/json",
            'Authorization': "Basic Y2xpZW50OnNlY3JldA=="
          },
          data: {
            password: 'password',
            username: 'anil',
            grant_type: 'password',
            scope: 'read write'
          },
          transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
          }],
        })
        .then(function(response) {
          that.token = response.data.access_token;
          console.log(that.token);
        })
        .catch(function (error) {
          console.log(error);
        });
      },*/
      showMode(){
        this.basicStatus = false;
        this.modeStatus = true;
      },
      submit: function () {
        var that = this;
        if (that.account == '' || that.code == '') {
          alert('请输入账号密码');
        } else {
          axios({
            method:'get',
            url:"/cauds-account/user/account/login/" + that.account + '/' + that.code,
            headers: {
              
            },
            data: {
            },
            transformRequest: [function (data) {
              let ret = ''
              for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
              }
              return ret
            }],
          })
          .then(function(response) {
              console.log(response)
            if (response.data.code == 200) {
              /* console.log(response.data.userInfo); */
              localStorage.data = JSON.stringify(response.data);
              localStorage.token = response.data.data.access_token;
              localStorage.token_time = response.data.data.token_time;
              localStorage.token_expires_in = response.data.data.token_expires_in;
              console.log(JSON.parse(localStorage.data));
              location.href = '/apiDetail'
            }else {
              toastr.warning('账号不存在或密码有误');
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        }
      }
    }
  }
</script>
<style scoped>
  .row{
    height: 100vh;
    display:flex;
    justify-content:center;
    align-items:center;
    background:url('/img/assets/bg_img.png') no-repeat;
    background-size: 100% 100%;
  }
  .row .register-box{
    width:730px;
    height:504px;
    border-radius:10px;
    display:flex;
    background:#ffffff;
  }
  .row .register-box .left{
    flex:0 0 300px;
    height:100%;
    background:url('/img/assets/left_img.png') no-repeat;
    background-size: 100% 100%;
  }
  .row .register-box .left .inner{
    height:150px;
    margin:168px auto 0;
    text-align:center;
  }
  .row .register-box .left .inner img{
    width:70px;
    height:35px;
    margin-bottom:14px;
  }
  .row .register-box .left .inner .text{
    font-size:14px;
    color:#FFFFFF;
  }
  .row .register-box .right{
    width:100%;
    height:100%;
    padding:128px 40px 0;
    box-sizing:border-box;
  }
  .row .register-box .right input{
    width:354px;
    height:42px;
    font-size:18px;
    color:#263238;
    border:1px #F5F5F5 solid;
    border-radius:21px;
    outline:none;
    margin-bottom:44px;
    text-indent:2em;
  }
  .row .register-box .right .regist{
    width:354px;
    height:42px;
    line-height:42px;
    background: -webkit-linear-gradient(#39c1d3, #6afcc8); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(#39c1d3, #6afcc8); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(#39c1d3, #6afcc8); /* Firefox 3.6 - 15 */
    background: linear-gradient(#39c1d3, #6afcc8); /* 标准的语法 */
    text-align:center;
    border-radius:21px;
    font-size:18px;
    color:#ffffff;
    margin-bottom:18px;
    cursor:pointer;
  }
  .row .register-box .right .forget{
    width:354px;
    text-align:end;
    font-size:14px;
    color:#B8BEC1;
    cursor:pointer;
  }
</style>
