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
        <img src="/img/assets/back_icon.png" onclick="location.href='/square'">
        <span class="title">资产信息</span>
      </div>
      <div class="procedure">
        <div class="step">
          <ul v-cloak>
            <li class="step-name" :class="{'current':navStatus===1}" @click="navChos(1)">基本信息</li>
            <li class="step-name" :class="{'current':navStatus===2}" @click="navChos(2)">模式选择</li>
          </ul>
        </div>
        <div class="line"></div>
        <div class="basic-wrapper" v-show="navStatus===1">
          <div class="basic-information">
            <div class="information-box information-title">
              <div class="name">企业LOGO：</div>
              <div class="name">
                <img :src="baseUrl + '/cauds-exchange/assetImge/'+ co.assetLogo">
              </div>
              <div class="unit"></div>
            </div>
            <div class="information-box">
              <div class="name">企业全称：</div>
              <p>{{co.totalName}}</p>
              <div class="unit"></div>
            </div>
            <div class="information-box">
              <div class="name">公司简称：</div>
              <p>{{co.shortName}}</p>
              <div class="unit"></div>
            </div>
            <div class="information-box">
              <div class="name">组织机构：</div>
              <p>{{co.orgNo}}</p>
              <div class="unit"></div>
            </div>
            <div class="information-box" v-show="userType==1">
              <div class="name">利率范围：</div>
              <p>{{co.rateRangeFrom}}%~{{co.rateRangeTo}}%</p>
              <div class="unit"></div>
            </div>
            <div class="information-box">
              <div class="name">法人代表：</div>
              <p>{{co.legalMan}}</p>
              <div class="unit"></div>
            </div>
            <div class="information-box">
              <div class="name">公司规模：</div>
              <p>{{co.firmSize}}</p>
              <div class="unit"></div>
            </div>
            <div class="information-box">
              <div class="name">公司所在地：</div>
              <p>{{co.firmProvince}}省{{co.firmCity}}市</p>
              <div class="unit"></div>
            </div>
          </div>
        </div>
        <div class="table-wrapper" v-show="navStatus===2&&userType==1">
          <table class="table table-striped zj-table">
            <thead>
              <tr>
                <th>名称</th>
                <th>内容标签</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>在贷金额</td>
                <td>{{co.loanAomunt}}</td>
              </tr>
              <tr>
                <td>复贷情况</td>
                <td>{{co.repeatLoan}}</td>
              </tr>
              <tr>
                <td>保证金</td>
                <td>{{co.earnestMoney}}</td>
              </tr>
              <tr>
                <td>日均规模</td>
                <td>{{co.dailyMoney}}</td>
              </tr>
              <tr>
                <td>是否接受兜底</td>
                <td>{{co.isReveal}}</td>
              </tr>
              <tr>
                <td>合作模式</td>
                <td>{{co.cooMode}}</td>
              </tr>
              <tr>
                <td>坏账率</td>
                <td>{{co.chargeOffRate}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="table-wrapper" v-show="navStatus===2&&userType==2">
          <div class="folder">
            <h3>公司情况</h3>
            <p>{{co.firmDescribe}}</p>
            <div class="fold-trigger" @click="toggleFold(folder)">展开</div>
          </div>
          <div class="table-responsive">
          <table class="table table-striped zc-table">
            <thead>
              <tr>
                <th>名称</th>
                <th>内容标准</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>产品类型</td>
                <td>{{co.productType}}</td>
              </tr>
              <tr>
                <td>当期日放款规模</td>
                <td>{{co.currentDailyMoney}}</td>
              </tr>
              <tr>
                <td>总放款规模</td>
                <td>{{co.totalMoney}}</td>
              </tr>
              <tr>
                <td>在贷余额</td>
                <td>{{co.loanAomunt}}</td>
              </tr>
              <tr>
                <td>件均</td>
                <td>{{co.perAmount}}</td>
              </tr>
              <tr>
                <td>放款周期</td>
                <td>{{co.loanPeriods}}</td>
              </tr>
              <tr>
                <td>额度档次</td>
                <td>{{co.lineLevel}}</td>
              </tr>
              <tr>
                <td>逾期率</td>
                <td>{{co.overdueRate}}</td>
              </tr>
              <tr>
                <td>公司名称</td>
                <td>{{co.totalName}}</td>
              </tr>
              <tr>
                <td>产品名称</td>
                <td>{{co.productName}}</td>
              </tr>
              <tr>
                <td>产品手续费</td>
                <td>{{co.productFee}}</td>
              </tr>
              <tr>
                <td>逾期罚息</td>
                <td>{{co.overdueCharge}}</td>
              </tr>
              <tr>
                <td>日放款规模</td>
                <td>{{co.dailyMoney}}</td>
              </tr>
              <tr>
                <td>资金需求量</td>
                <td>{{co.moneyRequirement}}</td>
              </tr>
              <tr>
                <td>有无合作资金方</td>
                <td>{{co.hasCoop}}</td>
              </tr>
              <tr>
                <td>合作风控方案</td>
                <td></td>
              </tr>
              <tr>
                <td>对接模式</td>
                <td></td>
              </tr>
              <tr>
                <td>资金需求规模</td>
                <td></td>
              </tr>
            </tbody>
          </table>
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
      folder: true,  //true折叠 false展开
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
    },
    navChos(num){
      this.navStatus = num;
    },
    toggleFold(i){
      i=!i;
      console.log(i);
      console.log($('.folder>p').css('max-height'));
      if(!i){
        $('.folder').css('max-height','3000px');
        $('.folder>p').css('max-height','3000px');
        $('.zc-table').css('display','none');
        $('.fold-trigger').html('收起');
      }else{
        $('.folder').css('max-height','200px');
        $('.folder>p').css('max-height','100px');
        setTimeout("$('.zc-table').css('display','table')",400);
        $('.fold-trigger').html('展开');
      }
      this.folder = i;
    },
    showTable(){
    }
  }
}
</script>

<style scoped>
.table-wrapper{
  margin-top: 56px;
}
.table{
  width: 712px;
  margin:0 auto;
  vertical-align: middle;
  text-align: center;
  border-collapse: separate;
  border-left:solid 1px #ddd;
  border-right:solid 1px #ddd;
  border-bottom:solid 1px #ddd;
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
tbody>tr>td:nth-child(1){
  border-right: solid 1px #ddd;
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
  cursor: pointer;
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
  display: flex;
  align-items: center;
  justify-content: center;
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
  margin-top:100px;
  display: inline-block;
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
  margin-bottom:22px;
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
  margin:0 20px;
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
.folder{
  position: relative;
  border:solid 1px #ddd;
  padding:45px 50px;
  max-height: 200px;
  width: 712px;
  margin: 0 auto;
  margin-bottom: 20px;
  transition:max-height .3s;
  overflow: visible;
}
.folder>h3{
  position: absolute;
  top: -34px;
  left: 40%;
  width: 150px;
  height: 21px;
  display: block;
  background: white;
  text-align: center;
}
.folder>p{
  overflow: hidden;
  font-size: 16px;
  letter-spacing: -0.4px;
  line-height: 26px;
  color: #666;
  max-height: 100px;
  transition:max-height .3s;
}/* 
.folder:hover{
  max-height: 3000px;
}
.folder:hover>p{
  max-height: 3000px;
} */
.fold-trigger{
  width: 61px;
  height: 20px;
  font-size: 16px;
  color: #1FB5AD;
  line-height: 20px;
  position: absolute;
  right: 136px;
  bottom: 20px;
  cursor: pointer;
}
.table-responsive {
  max-height: 350px;
  overflow-y: scroll;
  width: 728px;
  margin: 0 auto;
}
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/  
::-webkit-scrollbar  
{  
    width: 16px;  
    height: 160px;  
    background-color: #F5F5F5;  
    position: absolute;
    left: 0;
}  
  
/*定义滚动条轨道 内阴影+圆角*/  
::-webkit-scrollbar-track  
{  
    border-radius: 10px;  
    background-color: #F5F5F5;  
    border:solid 1px #ddd;
}  
  
/*定义滑块 内阴影+圆角*/  
::-webkit-scrollbar-thumb  
{  
    border-radius: 10px;  
    background-color: #aaa;  
}  
.zc-table>thead th:nth-child(1){
  border-right: solid 1px #ddd;
}
.zc-table>thead th{
  border-top: solid 1px #ddd !important;
  border-bottom: none !important;
}
</style>
