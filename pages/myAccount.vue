<template>
  <section class="cont">
    <hd/>
    <div id="nav-left" class="col-xs-2 col-sm-2 col-md-2 col-lg-2" style="padding-left: 0">
      <div class="container" style="margin:0;padding:0">
        <nav class="col-sm-2" id="myScrollspy">
          <ul class="nav nav-pills nav-stacked">
            <li>
              <a href="javascript:void(0);" @click="router=0" :class="router==0?'navClicked':''">基本信息</a>
            </li>
            <li>
              <a href="javascript:void(0);" @click="router=1" :class="router==1?'navClicked':''">认证接口</a>
            </li>
          </ul>
        </nav>
        <div class="clearfix">
        </div>
      </div>
    </div>

    <div id="body" class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
      <div v-show="router==0">
        <div class="title">基本信息</div>
        <div class="top">
          <div class="subtitle">个人信息</div>
          <div class="avatar">
            <div class="name">头像</div>
            <div class="img-wrapper">
              <img :src="avatar" v-cloak/>
              <input id="upfile" type="file" name="upfile" accept="image/png,image/jpg" class="accept" @change='uploadImg'>
              <div class="text">更改头像</div>
            </div>
          </div>
          <div class="item">
            <div class="name">登录账户</div>
            <div class="text">{{information.account}}</div>
          </div>
          <div class="item">
            <div class="name">登录密码</div>
            <div class="modify" @click="modifyCode">修改</div>
          </div>
          <div class="item item1">
            <div class="name">手机</div>
            <div class="previous" v-show="!modifyPhoneStatus">
              <div class="text">{{realPhone}}</div>
              <div class="modify" @click="modifyPhone">修改</div>
            </div>
            <div class="modify-box" v-show="modifyPhoneStatus">
              <input v-model="phone" autofocus="autofocus">
              <div class="save-btn" @click="savePhone">保存</div>
              <div class="cansel-btn" @click="cancelPhone">取消</div>
            </div>
          </div>
          <div class="item">
            <div class="name">注册时间</div>
            <div class="text">{{information.create_time}}</div>
          </div>
        </div>
        <div class="bottom">
          <div class="subtitle">业务信息</div>
          <div style="height:36px;" class="item">
            <div class="name">公司名称</div>
            <div class="previous" v-show="!modifyNameStatus">
              <div class="text">{{realCompanyName}}</div>
              <div class="modify" @click="modifyName">修改</div>
            </div>
            <div class="modify-box" v-show="modifyNameStatus">
              <input v-model="companyName" autofocus="autofocus">
              <div class="save-btn" @click="saveName">保存</div>
              <div class="cansel-btn" @click="cancelName">取消</div>
            </div>
          </div>
        </div>
        <div class="modifyCode" v-show="codeStatus">
          <div class="title-box">
            <img @click="back" src="/img/assets/back_icon.png">
            <div class="title">修改密码</div>
          </div>
          <hr>
          <div class="accInfo-con">
            <div class="content">
              <div class="content-item">
                <div class="name">旧密码:</div>
                <input v-model="oldCode">
              </div>
              <div class="content-item">
                <div class="name">新密码:</div>
                <input v-model="newCode">
              </div>
              <div class="content-item">
                <div class="name">确认密码:</div>
                <input v-model="newCodeRepeat">
              </div>
              <div class="save-btn" @click="saveCode">保存</div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="router==1" class="API">
        <div class="title">认证接口</div>
        <div class="API-box">
          <img src="/img/assets/product-logo.png">
          <div class="content">
            <div class="title">oauth2认证接口</div>
            <div class="item">
              <div class="name">账户</div>
              <div class="text">357258062@qq.com</div>
            </div>
            <div class="item">
              <div class="name">密码</div>
              <div class="text">{{text}}</div>
              <div class="show" @click="toggleCode">{{toggleText}}</div>
            </div>
          </div>
        </div>
        <div class="info">（提醒:该账户与其他账户不同，是数据传输过程中使用，请勿随意透露及使用）</div>
      </div>
    </div>
  </section>
</template>
<script type="text/ecmascript">
  import axios from 'axios'
  import Hd from '~components/Hd.vue'
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
    components: {
      Hd
    },
    head: {
      title: '账户信息',
      script: [
        {src: 'js/jQuery.min.js'},
        {src: 'js/layer.js'},
        {src: 'js/bootstrap.min.js'}
      ]
    },
    created: function () {
      this.getToken();
    },
    data () {
      return {
        router: '',
        codeStatus: false,
        toggleText: "查看",
        text: '********',
        modifyNameStatus: false,
        companyName: '',
        realCompanyName: '',
        phone:'',
        realPhone:'',
        token: '',
        information: {},
        oldCode: '',
        newCode: '',
        newCodeRepeat: '',
        modifyPhoneStatus:false,
        avatar: ''
      }
    },
    created(){
      this.getToken();
    },
    mount: function () {
      this.router = location.href.substring(location.href.length - 1);
    },
    methods: {
      uploadImg() {
        var that = this;
        var data = JSON.parse(localStorage.data).data;
        var fd = new FormData();
        fd.append("upload", 1);
        fd.append('upfile', $("#upfile").get(0).files[0]);
        $.ajax({
          url: "http://192.168.1.158:8060/cauds-account/user/account/iconImage/" + data.userInfo.account,
          type: "POST",
          headers: {
            sessionId: data.sessionId,
            authKey: data.authKey,
            token: that.token
          },
          processData: false,
          contentType: false,
          data: fd,
          success: function(rs) {
            that.avatar = 'http://192.168.1.158:8060/cauds-account/user/account/getIconImage/wb';
          }
        });
      },
      modifyCode(){
        this.codeStatus = true;
      },
      saveCode(){
        if (this.newCode===''&&this.newCodeRepeat===''&&this.oldCode===''){
          toastr.warning('请输入旧密码和新密码');
        }
        if (this.newCode!==this.newCodeRepeat){
          toastr.warning('两次输入的密码不一致，请重新输入!');
        }else {
          var that = this;
          axios({
            method:'post',
            url:'http://192.168.1.158:8060/cauds-account/user/account/passwordUpdate/'
            +JSON.parse(localStorage.data).data.userInfo.account+'/'+that.oldCode+'/'+that.newCode,
            headers: {
              sessionId: JSON.parse(localStorage.data).data.sessionId,
              authKey: JSON.parse(localStorage.data).data.authKey
            },
            data: {
              "account":that.information.account,
              "org_name":that.realCompanyName
            },
          })
            .then(function(response) {
              console.log(response);
              toastr.warning('修改密码成功');
              window.setTimeout("location.href='/login'",2000)

            })
            .catch(function (error) {
              console.log(error);
            });
        }
      },
      back() {
        this.codeStatus = false;
      },
      toggleCode() {
        if (this.text == '********') {
          this.text = "jiangyangchang";
          this.toggleText = "收起"
        } else {
          this.text = "********";
          this.toggleText = "查看"
        }
      },
      modifyName() {
        this.companyName = this.realCompanyName;
        this.modifyNameStatus = true;
      },
      savePhone() {
        if (!this.Phone || !this.Phone.match(
            /^(0|86|17951)?(13[0-9]|15[012356789]|17[6780]|18[0-9]|14[57])[0-9]{8}$/)) {
        toastr.warning('请输入合法的手机号');
        return false;
      }
        this.realPhone=this.phone;
        this.modifyPhoneStatus = false;
        var that = this;
        axios({
          method:'post',
          url:'http://192.168.1.158:8060/cauds-account/user/account/updateInfo',
          headers: {
            sessionId: JSON.parse(localStorage.data).data.sessionId,
            authKey: JSON.parse(localStorage.data).data.authKey
          },
          data: {
            "account":that.information.account,
            "contact_phone":that.realPhone
          },
        })
          .then(function(response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      cancelPhone() {
        this.modifyPhoneStatus = false;
      },
      modifyPhone(){
        this.phone = this.realPhone;
        this.modifyPhoneStatus = true;
      },
      saveName() {
        this.realCompanyName = this.companyName;
        this.modifyNameStatus = false;
        var that = this;
        axios({
          method:'post',
          url:'http://192.168.1.158:8060/cauds-account/user/account/updateInfo',
          headers: {
            sessionId: JSON.parse(localStorage.data).data.sessionId,
            authKey: JSON.parse(localStorage.data).data.authKey
          },
          data: {
            "account":that.information.account,
            "org_name":that.realCompanyName
          },
        })
          .then(function(response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      getToken(){
        var that = this;
        axios({
          method: 'post',
          url: 'http://192.168.1.158:8060/uaa/oauth/token',
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
        .then(function (response) {
          that.token = response.data.access_token;
          that.getInformation();
        })
        .catch(function (error) {
          console.log(error);
        });
      },
      cancelName() {
        this.modifyNameStatus = false;
      },
      getInformation() {
        var that=this;
        axios({
          method: 'get',
          url: "http://192.168.1.158:8060/cauds-account/user/account/accountInfo/" + JSON.parse(localStorage.data).data.userInfo.account,
          headers: {
            sessionId: JSON.parse(localStorage.data).data.sessionId,
            authKey: JSON.parse(localStorage.data).data.authKey,
            token: that.token
          }
        })
        .then(function(response) {
          that.information=response.data.data;
          that.realCompanyName=that.information.org_name;
          that.realPhone=that.information.contact_phone;
          if(that.information.photo == ''){
            //photo为空，使用默认头像
            that.avatar = '/img/assets/product-logo.png';
          }else{
            that.avatar = 'http://192.168.1.158:8060/cauds-account/user/account/getIconImage/'+ that.information.account;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    }
  }

</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  #myScrollspy{
    height:100vh;
  }
  .row{

    height:100vh;
  }
  #body{
    position:relative
  }
  #body .title{
    font-size:14px;
    color:#555555;
    margin:28px 0 24px;
  }
  #body .top .subtitle{
    font-size:16px;
    color:#333333;
    margin-bottom:14px;
  }
  #body .top .avatar{
    display:flex;
    align-items:center;
    margin-bottom:40px;
  }
  #upfile{
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
  }
  #body .top .avatar .img-wrapper{
    position:relative;
    text-align:center;
    font-size:14px;
    color:#1fb5ad;
  }
  #body .top .avatar .img-wrapper img{
    width: 74px;
    height: 74px;
  }
  #body .top .avatar .img-wrapper .text{
    margin-top:12px;
  }
  #body .top .item{
    display:flex;
    align-items:center;
    margin-bottom:40px;
  }
  #body .top .item1{
    height 36px
  }
  #body .top .item .previous{
    display:flex;
    align-items:center;
  }
  #body .top .item .previous .modify{
    margin-left 34px
  }
  #body .top .item .modify-box{
    display:flex;
    align-items:center;
  }
  #body .top .item .modify-box .save-btn{
    margin-left:27px;
    width:60px;
    height:36px;
    font-size:16px;
    color:#ffffff;
    background:#1FB5AD;
    border-radius:6px;
    margin-right:14px;
    text-align:center;
    line-height:36px;
    cursor:pointer;
  }
  #body .top .item .modify-box input{
    width:290px;
    height:36px;
    border-radius:6px;
    border:1px solid #c5dddb;
    outline:none;
  }
  #body .top .item .modify-box input:focus{
    border-radius:6px;
    border:1px solid #1fb5ad;
  }
  #body .top .item .modify-box .cansel-btn{
    width:60px;
    height:36px;
    font-size:16px;
    color:#555555;
    border-radius:6px;
    border:1px solid #b3b3b3;
    text-align:center;
    line-height:36px;
    cursor:pointer;
  }
  #body .top .avatar .name,#body .top .item .name{
    width:60px;
    text-align:right;
    font-size:14px;
    color:#808080;
    margin-right:20px;

  }
  #body .top .avatar .name{
    margin-right:37px;
  }
  #body .top .item .modify{
    font-size:14px;
    color:#1fb5ad;
    cursor:pointer;
  }
  #body .bottom{
    margin-top:18px;
  }
  #body .bottom .subtitle{
    font-size:16px;
    color:#333333;
    margin-bottom:24px;
  }
  #body .bottom .item{
    display:flex;
    align-items:center;
  }
  #body .bottom .item .previous{
    display:flex;
    align-items:center;
  }
  #body .bottom .item .modify-box{
    display:flex;
    align-items:center;
  }
  #body .bottom .item .modify-box .save-btn{
    margin-left:27px;
    width:60px;
    height:36px;
    font-size:16px;
    color:#ffffff;
    background:#1FB5AD;
    border-radius:6px;
    margin-right:14px;
    text-align:center;
    line-height:36px;
    cursor:pointer;
  }
  #body .bottom .item .modify-box input{
    width:290px;
    height:36px;
    border-radius:6px;
    border:1px solid #c5dddb;
    outline:none;
  }
  #body .bottom .item .modify-box input:focus{
    border-radius:6px;
    border:1px solid #1fb5ad;
  }
  #body .bottom .item .modify-box .cansel-btn{
    width:60px;
    height:36px;
    font-size:16px;
    color:#555555;
    border-radius:6px;
    border:1px solid #b3b3b3;
    text-align:center;
    line-height:36px;
    cursor:pointer;
  }
  #body .bottom .item .modify{
    font-size:14px;
    color:#1fb5ad;
    margin-left:34px;
    cursor:pointer;
  }
  #body .bottom .item .name{
    width:60px;
    text-align:right;
    font-size:14px;
    color:#808080;
    margin-right:20px;
  }
  #body .modifyCode{
    position:absolute;
    width:100%;
    height:100%;
    top:0;
    left:0;
    background:#ffffff;
  }
  .accInfo-con{
    height:65%;
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
  }
  .accInfo-con .content{
    width:400px;
    height:230px;
  }
  .accInfo-con .content .content-item{
    display:flex;
    align-items:center;
    height:30px;
    margin-bottom:16px;
    font-size:14px;
  }
  .accInfo-con .content .content-item .name{
    color:#808080;
    width:60px;
    margin-right:23px;
  }
  .accInfo-con .content .content-item input{
    width:290px;
    height:30px;
    color:#222222;
    outline:none;
    border:solid #E1E1E1 1px;
    border-radius:6px;
  }
  .accInfo-con .content .content-item input:focus{
    border:solid #1FB5AD 1px;
  }
  .accInfo-con .content .save-btn{
    width:100px;
    height:32px;
    text-align:center;
    line-height:32px;
    color:#ffffff;
    background:#1FB5AD;
    border-radius:6px;
    margin:0 auto;
    margin-top:38px;
    cursor:pointer;
  }
  .accInfo-con>form tr{
    height:42px;
  }
  .accInfo-con>form tr td{
    font-size:16px;
    color:#666;
    padding-right:20px
  }
  .accInfo-con input{
    border:solid 1px #ccc;
    border-radius: 6px;
    outline: none;
    padding-left: 10px;
    height:30px;
  }
  .accInfo-con>form button{
    margin-left:40%;
    margin-top: 23px;
    background: #1fb5ad;
    text-align: center;
    line-height: 32px;
    height: 32px;
    color: #fff;
    font-size: 12px;
    border: none;
    width: 100px;
    border-radius: 6px;
    outline:none;
  }
  .modifyCode .title-box{
    display:flex;
    margin:50px 0 22px;
    align-items:center;
  }
  #body .modifyCode .title-box .title{
    font-size:18px;
    margin:0;
  }
  .modifyCode .title-box img{
    width:30px;
    height:30px;
    margin-right:16px;
  }
  #body .API>.title{
    font-size:18px;
    color:#333333;
    line-height:56px;
    height:56px;
    margin:0;
  }
  #body .API .API-box{
    width:90%;
    height:200px;
    border:1px solid #e1e1e1;
    border-radius:10px;
    display:flex;
    padding:53px 0 20px 62px;
    box-sizing:border-box

  }
  #body .API .API-box img{
    width:118px;
    height:118px;
    margin-right:50px;
  }
  #body .API .API-box .content .title{
    font-size:21px;
    color:#333333;
    margin:0;
    margin-bottom:24px;
  }
  #body .API .API-box .content .item{
    display:flex;
    margin-bottom:14px;
  }
  #body .API .API-box .content .item .name{
    font-size:14px;
    color:#808080;
    margin-right:16px;
  }
  #body .API .API-box .content .item .text{
    font-size:16px;
    color:#222222;
  }
  #body .API .API-box .content .item .show{
    font-size:14px;
    color:#1FB5AD;
    margin-left:30px;
    cursor:pointer;
  }
  #body .API .info{
    width:90%;
    text-align:center;
    font-size:14px;
    color:#CCCCCC;
    margin-top:34px;
  }
</style>
