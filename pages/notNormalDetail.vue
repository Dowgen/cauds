<template>
  <section class="cont">
    <hd/>
    <div class="row" v-cloak>
    <div id="nav-left" class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
        <div class="container" style="margin:0;padding:0">
            <nav class="col-sm-2" id="myScrollspy">
                <ul class="nav nav-pills nav-stacked">
                    <li>
                        <a href="javascript:void(0);" onclick="location.href='/apiDetail'">资产面板</a>
                    </li>
                    <li v-show="userType==1">
                        <a href="javascript:void(0);" class="navClicked" onclick="location.href='/addAsset'">添加资产</a>
                    </li>
                    <li>
                        <a href="javascript:void(0);">其他</a>
                    </li>
                </ul>
            </nav>
            <div class="clearfix">
            </div>
        </div>
    </div>

    <div id="body" class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
      <div class="title-box">
        <img src="/img/assets/back_icon.png" onclick="location.href='/apiDetail'">
        <span class="title">资产信息</span>
      </div>
      <div class="procedure">
        <div class="basic-wrapper">
          <div class="basic-information" v-show="basicStatus">
            <div class="information-box information-title">
              <div class="name">
                <img :src="baseUrl + '/cauds-exchange/assetImge/'+ product.assetLogo">
              </div>
              <p class="title">{{product.assetName}}</p>
              <div class="unit"></div>
            </div>
            <div class="information-box">
              <div class="name">资产机构名称：</div>
              <p>{{product.assetCompany}}</p>
              <div class="unit"></div>
            </div>
            <div class="information-box">
              <div class="name">公司简称：</div>
              <p>无</p>
              <div class="unit"></div>
            </div>
            <div class="information-box">
              <div class="name">资产总额：</div>
              <p>{{product.assetSize}}元</p>
              <div class="unit"></div>
            </div>
            <div class="information-box">
              <div class="name">代缴金额：</div>
              <p>{{product.assetsPaid}}元</p>
              <div class="unit"></div>
            </div>
            <div class="information-box">
              <div class="name">资产周期：</div>
              <p>{{product.assetCycle}}</p>
              <div class="unit"></div>
            </div>
            <div class="information-box">
              <div class="name">进件开始时间：</div>
              <p>{{new Date(product.entranceStartTime).toLocaleString()}}</p>
              <div class="unit"></div>
            </div>
            <div class="information-box">
              <div class="name">进件结束时间：</div>
              <p>{{new Date(product.entranceEndTime).toLocaleString()}}</p>
              <div class="unit"></div>
            </div>
          </div>
          <div class="reAdd" @click="reAdd" v-show="userType==1"
            @mouseover="reAddPic='img/notNormalDetail/reAddHover.png'"
            @mouseleave="reAddPic='img/notNormalDetail/reAdd.png'">
            <img :src="reAddPic">
          </div>
        </div>
        <div class="deleteAsset">
          <button v-show="userType==1" type="button" class="btn btn-danger" @click="deleteAsset">删除资产包</button>
          <button v-show="userType==2" type="button" class="btn btn-success" @click="lockAsset" style="background-color:#1fb5ad">锁定资产包</button>
        </div>
      </div>
    </div>
</div>
  </section>
</template>

<script>
import axios from '~/plugins/axios'
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
    title: '添加资产',
    /*link:[{rel: 'stylesheet',href:'js/laydate/need/ladate.css'}],*/
    script: [
      { src: 'js/jQuery.min.js' },
      { src: 'js/layer.js' },
      { src: 'js/bootstrap.min.js' }
    ]
  },
  data () {
    return {
      userType: '',
      reAddPic:'img/notNormalDetail/reAdd.png',
      basicStatus:true,
      modeStatus:false,
      apiAdress:false,
      baseUrl: '',
      product:{} ,
      localStorage:''
    }
  },
  created(){
    this.baseUrl = axios.defaults.baseURL;
    if(process.browser){
      this.userType = localStorage.userType;
      this.localStorage = localStorage;
      //获取url参数
      let type = this.GetQueryString('type');
      if(type == 'reject'){
        $('.basic-wrapper').css('background-image','url(/img/notNormalDetail/beback.png)')
      }else if(type == 'expired'){
        $('.basic-wrapper').css('background-image','url(/img/notNormalDetail/timeup.png)')
      }
    }
  },
  mounted() {
    if(process.browser){
      $('#myScrollspy').height( $(document).height() - 80);
      //获取上个页面塞入storage的产品信息
      this.product=JSON.parse(sessionStorage.product);
    }
  },
  methods: {
    /* 得到url参数 */
    GetQueryString (name){
      /* 判断一下是否在浏览器内，否则window是undefined的 */
      if (process.browser) {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
      }
    },
    reAdd(){
      location.href = '/addAsset?from=reAdd'
    },
    deleteAsset(){
      var that = this;
      layer.confirm('是否确认删除此资产包?', {icon: 1, title:'提示'}, function(index){
        axios({
          method:'post',
          url:"/cauds-exchange/asset/deleteAsset",
          headers: {
            Authorization: 'Bearer ' + that.localStorage.token,
            Accept:'application/json'
          },
          data:{
            assetId:that.product.assetId
          }
        })
        .then( res=> {
            layer.msg('删除成功!',{time:2000});
            window.location.href = '/apiDetail';
        })
        .catch( err=> {
          /*window.location.href = '/login'*/
        });
        layer.close(index);
      });
    },
    lockAsset(){ //锁定产品
      var that = this;
      var data = JSON.parse(that.localStorage.data).data;
      var lockReason = '';
      layer.confirm('是否锁定该资产包?', {icon: 1, title:'提示'}, function(index){
        layer.close(index);
        layer.prompt({title: '请输入锁定原因', formType: 2}, function(text, index){
        axios({
          method:'get',
          url:"/cauds-exchange/asset/lock?assetId=" + that.product.assetId + '&reason='+ text
          +'&account='+ data.userInfo.account,
          headers: {
            Authorization: 'Bearer ' + that.localStorage.token,
            Accept:'application/json'
          }
        })
        .then( rs=>  {
          layer.msg('锁定成功',{time:2000});
          location.href = '/apiDetail'
        })
        .catch( /*err => window.location.href = '/login'*/)
      });
        layer.close(index);
      });     
    }
  }
}
</script>

<style scoped>
#myScrollspy{
  height:100vh;
}
.row{
  background:#f2f2f2;
  height:100vh;
}
#body .title-box{
  height:50px;
  display:flex;
  align-items:center;
}
#body .title-box img{
  cursor: pointer;
}
#body .title-box .title{
  font-size:20px;
  margin-left:10px;
}
.procedure{
  width:98%;
  height:87vh;
  background:#ffffff;
  border-radius:10px;
}
.step ul{
  display:flex;
  padding:31px 0 0 23px;
  margin:0;
  
}
.step ul .step-name{
  list-style:none;
  width:100px;
  text-align:center;
  font-size:14px;
  height:30px;
  
}
.step ul .current{
  color:#1FB5AD;
  border-bottom:1px solid #1FB5AD;
}
.line{
  width:90%;
  height:1px;
  background:#E1E1E1;
  margin-left:23px;
}
.basic-wrapper{
  width:100%;
  overflow: hidden;
  position: relative;
  background-image :url('/img/notNormalDetail/beback.png');
  background-repeat: no-repeat;
  background-position: 30% 100%
}
.basic-wrapper .reAdd{
  display: inline-block;
  position: absolute;
  top: 40%;
  right: 13%;
  cursor: pointer;
}
.basic-information{
  margin:0 auto;
  margin-top:50px;
  margin-left: 60px;
}
#upfile{
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  cursor: pointer;
}
.information-box{
  font-size:12px;
  color:#666666;
  margin-bottom:16px;
  display:flex;
  align-items:center;
  height:30px;
  justify-content:flex-start;
}
.information-title{
  height: 80px;
  line-height: 80px;
}
.information-box .title{
  color: #333;
  font-size: 21px;
}
.information-box>p{
  font-size: 16px;
  color: #222;
}
.information-box img{
  margin:0 20px 0 0;
  width: 75px;
  height: 75px;
}
.information-box .name{
  text-align:end;
  font-size: 16px;
  color: #808080;
}
.information-box input{
  border:1px solid #e1e1e1;
  width:270px;
  border-radius:6px;
  height:30px;
  outline:none;
  padding-left: 10px;
  margin-right: 5px;
}
.information-box input:focus{
  border:1px solid #1FB5AD;
  border-radius:6px;
  height:30px;
}
.information-box .unit{
  width:30px;
}
.information-box select{
  width: 50px;
  height: 30px;
  border: solid 1px #ccc;
  appearance:none;
  background: url("/img/assets/time_choose.png") no-repeat scroll right center transparent;
  padding-right: 14px;
  padding-left: 10px;
  border-radius: 6px;
  margin-right: 4px;
}
.information-box select option{
  text-align: center;
}
.save-btn{
  width:100px;
  height:32px;
  line-height:32px;
  text-align:center;
  margin:0 auto;
  margin-top:39px;
  color:#ffffff;
  background:#1FB5AD;
  border-radius:3px;
  cursor:pointer;
}
.mode .tradeStructure{
  display:flex;
  margin:30px 0 80px 40px;
  width:170px;
  height:30px;
  align-items:center;
}
.tradeStructure .text{
  font-size:16px;
  color:#fa8564;
  margin-left:8px;
}
.mode-wrapper{
  display:flex;
  padding:0 40px;
}
.mode-box{
  position:relative;
  flex:1;
  width:313px;
  margin-right:50px;
  height:163px;
  border:1px solid #1FB5AD;
  border-radius:6px;
  display:flex;
  align-items:center;
}
.mode-box:last-child{
  margin-right:0;
}
.mode-box .left{
  width:45px;
  height:100%;
  background:#1FB5AD;
  padding-top:20px;
}
.mode-box .left .number{
  width:20px;
  height:20px;
  margin:0 auto;
  border:1px #FFFFFF solid;
  border-radius:50%;
  margin-bottom:5px;
  font-size:12px;
  color:#FFFFFF;
  line-height:20px;
  text-align:center;
}
.mode-box .left  .moder-name{
  width:20px;
  color:#FFFFFF;
  font-size:16px;
  margin:0 auto;
}
.mode-box .middle{
  font-size:14px;
  color:#666666;
}
.mode-box .middle .mode-text{
  margin-bottom:16px;
}
.mode-box .payBtn{
  position:absolute;
  right:22px;
  top:65px;
  width:30px;
  height:30px;
  border:1px solid #1fb5ad;
  border-radius:50%;
  
}
.mode-box .payBtn input{
  width:100%;
  height:100%;
  margin:0;
  opacity:0;
}
.mode-box .payBtn img{
  position:absolute;
  top:0;
  left:0;
  width:30px;
  height:30px;
}
.save-btn2{
  width:227px;
  height:41px;
  text-align:center;
  margin:0 auto;
  border:1px solid #1FB5AD;
  border-radius:6px;
  line-height:41px;
  font-size:16px;
  color:#1FB5AD;
  margin-top:124px;
  cursor:pointer;
}
.deleteAsset{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}
.deleteAsset .btn{
  font-size: 16px;
}
</style>
