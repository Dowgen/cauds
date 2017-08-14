<template>
<div class="dropdown">

    <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1"
     data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
     <span>{{org_name}}</span>
        <span class="caret"></span>
    </button>
    <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
        <li>
            <a href="/myAccount?navChose=0">
            <img src="/img/assets/Home_normal.png">基本信息</a>
        </li>
        <li>
            <a href="/myAccount?navChose=1" >
            <img src="img/assets/User-Profile_normal.png">认证接口</a>
        </li>
        <li><a href="javascript:void(0);" @click="logOut">
            <img src="/img/assets/loginout.png">登出</a>

        </li>
        <!-- <li role="separator" class="divider"></li> -->
    </ul>
</div>
</template>
<script>
import axios from '~/plugins/axios'
export default {
  data () {
    return {
      name:'',
      token:'',
      org_name:'',
      localStorage:''
    }
  },
  created (){
    //只为获取公司名称
    /*if(process.browser){
      var org_name = sessionStorage.org_name;
      if(org_name == undefined 
          || org_name == 'undefined'){
          this.org_name = org_name;
      }else{*/
          /*this.getToken();*/
      /*}
    }*/
    if(process.browser) this.localStorage = localStorage;
  },
  mounted(){
    this.getInformation();
  },
  methods:{
    logOut (){
      if(process.browser){
        localStorage.removeItem('data');
        localStorage.removeItem('token');
        window.location.href = '/login'
      }
    },
    getInformation() {
      var that = this;
      var data = JSON.parse(that.localStorage.data).data;
      axios({
        method: 'get',
        url: "/cauds-account/user/account/accountInfo/" + data.userInfo.account,
        headers: {
          sessionId: data.sessionId,
          authKey: data.authKey,
          token: that.localStorage.token
        },
        data:{
        }
      })
      .then(function(response) {
        that.org_name=response.data.data.org_name;
        /*sessionStorage.org_name = that.information.org_name;*/
      })
      .catch(function (error) {
        window.location.href = '/login'
      });
    }
  }
}
</script>
<style>
    .dropdown, .dropup {
        position: absolute;
        right: 67px;
        top: 23px;
    }

    .dropdown>button{
        color:white;
        background:#222;
        border:none;
        outline:none;
    }
    #dropdownMenu1>span:nth-child(1){
        margin-right: 10px;
    }
    .dropdown-menu{
        background:#222;
    }
    .dropdown-menu>li>a{
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
            -ms-flex-align: center;
                align-items: center;
        -webkit-box-pack: start;
            -ms-flex-pack: start;
                justify-content: flex-start;
        height: 45px;
        margin: 0;
        font-size:15px;
        color:#95A0AA;
    }
    .dropdown-menu>li>a:hover{
        background:
    }
    .dropdown-menu>li>a>img{
        margin-right:20px;
    }
</style>
