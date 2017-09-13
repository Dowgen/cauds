<template>
  <section class="cont">
    <hd/>
    <div class="row" v-cloak>
    <div id="nav-left" class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
      <div style="margin:0;padding:0">
        <nav class="col-sm-2" id="myScrollspy">
          <ul class="nav nav-pills nav-stacked">
            <li>
              <a href="javascript:void(0);" class="navClicked" onclick="location.href='/apiDetail'">资产面板</a>
            </li>
            <li v-show="userType==1">
              <a href="javascript:void(0);" onclick="location.href='/addAsset'">添加资产</a>
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
        <img src="/img/assets/back_icon.png"/>
        <span class="title">资产信息</span>
      </div>
      <div class="procedure">
        <div style="margin-top:56px;">
          <div class="folder">
            <div class="logo">
              <img src="img/assets/02.png"> 
            </div>
            <div class="content left-content">
              <p><span>现金白卡</span>：公司简称</p>
              <p><span>30051242-X</span>：组织机构</p>
              <p><span>杭州玛瑙湾投资金融服务有限公司</span>：企业全称</p>
            </div>
            <div style="width:115px"></div>
            <div class="content right-content">
              <p>公司规模：<span>职工人数200+</span></p>
              <p>法人代表：<span>李广融</span></p>
              <p>公司所在地：<span>浙江省杭州市</span></p>
            </div>
          </div>
          <div class="table-wrapper"> 
            <div class="thead">
              <span>序号</span>
              <span>资产包</span>
              <span>资产规模</span>
              <span>资产周期</span>
              <span>资产状态</span>
            </div>
            <div class="table-responsive">
              <div v-for="(item,index) in 10" class="tbody">
                <span>{{index}}</span>
                <span>聚抵信572691</span>
                <span>
                  2017-04-08 17:27:45
                </span>
                <span>交易状态</span>
                <span>激 活</span>
              </div>
            </div>
          </div>
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
      navStatus: 2,
      baseUrl: '',
      co:{} ,
      localStorage:''
    }
  },
  created(){
    this.baseUrl = axios.defaults.baseURL;
    if(process.browser){
      this.userType = localStorage.userType;
      this.localStorage = localStorage;
    }
  },
  mounted() {
    if(process.browser){
      $('#myScrollspy').height( $(document).height() - 80);
      //获取上个页面塞入storage的产品信息
      this.co=JSON.parse(sessionStorage.co);
    }
  },
  updated(){
    if(process.browser){
      $('#myScrollspy').height( $(document).height() - 80);
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
    }
  }
}
</script>

<style scoped>
.table-wrapper{
  width: 898px;
  margin: 0 auto;
  border-left: solid 1px #E1E1E1;
  border-radius: 10px 10px 0 0;
}
.thead{
  border-radius: 10px 10px 0 0;
  background: #E1E1E1;
  padding-right: 16px;
}
.thead,.tbody{
  display: flex;
  /* justify-content: flex-start; */
  font-size: 14px;
  color: #28282E;
  letter-spacing: -0.35px;
  line-height: 70px;
  opacity: 0.67;
  height: 70px;
  vertical-align: middle;
  text-align: center;
}
.thead>span,.tbody>span{
  flex:1;
}
.tbody{
  border-bottom: solid 1px #E1E1E1;
}
.zj-table>thead>tr{
  background: #1fb5ad;
  color: white;
}
.zj-table>thead th{
  border:solid 1px #1FB5AD;
}
.zj-table>thead th:nth-child(1){
  border-radius: 10px 0 0 0;
}
.zj-table>thead th:nth-child(2){
  border-radius: 0 10px 0 0;
}
.table tr{
  height: 60px;
  font-size: 16px;
  color: #808080;
  letter-spacing: -0.4px;
  line-height: 19.99px;
}
.table th,.table td{
  vertical-align: middle;
  text-align: center;
}
#myScrollspy{
  height:100vh;
}
.row{
  background:#f2f2f2;
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
  width:96%;
  height:90vh;
  background:#ffffff;
  border-radius:10px;
  overflow: hidden;
}
.folder{
  position: relative;
  border:solid 1px #ddd;
  height: 222px;
  width: 894px;
  margin: 0 auto;
  margin-bottom: 20px;
  padding:50px 20px 40px;
  display: flex;
  justify-content: space-around;
}
.folder>.content{
  font-size: 16px;
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 16px;
  color: #808080;
}
.folder>.left-content{
  flex:1;
  text-align: right;
}
.folder>.right-content{
  flex:1;
}
.content>p{
  margin: 12px 0;
  font-family: "PingFang-SC-Regular";
}
.content>p>span{
  font-size: 16px;
  color: #222;
  font-family: "AdobeHeitiStd-Regular";
}
.left-content>p>span{
  margin-right: 30px;
}
.right-content>p>span{
  margin-left: 30px;
}
.folder>.logo{
  position: absolute;
  top: -35px;
  left: 375px;
  width: 152px;
  height: 92px;
  background: white;
}
.logo>img{
  width: 92px;
  height: 92px;
  display: block;
  margin:0 auto;
  border-radius: 50%;
}
.table-responsive {
  max-height: 350px;
  overflow-y: scroll;
}
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/  
::-webkit-scrollbar  
{  
    width: 16px;  
    height: 160px;  
    background-color: white;  
    position: absolute;
    left: 0;
}  
  
/*定义滚动条轨道 内阴影+圆角*/  
::-webkit-scrollbar-track  
{  
    border-radius: 10px;  
    background-color: white;  
    border:solid 1px #ddd;
}  
  
/*定义滑块 内阴影+圆角*/  
::-webkit-scrollbar-thumb  
{  
    border-radius: 10px;  
    background-color: #aaa;  
}
</style>
