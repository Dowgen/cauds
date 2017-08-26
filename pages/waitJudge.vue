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
          <div class="title-wrap">
            <div class="name">
              <img :src="baseUrl + '/cauds-exchange/assetImge/'+ product.assetLogo">
            </div>
            <div class="title-text">
              <h3>{{product.assetName}}</h3>
              <p>资产包ID:{{product.assetId}}</p>
            </div>
            <div class="unit"></div>
          </div>
        </div>
        <div class="basic-wrapper">
          <h3>审核信息</h3>
          <div class="basic-information" v-show="basicStatus">
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
              <div class="name">代缴金额：</div>
              <p>{{product.assetCycle}}天</p>
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
          <div class="judge-btn">
            <div @click="judge(0)">确定</div>
            <div @click="judge(1)">驳回</div>
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
      userType:'',
      baseUrl: '',
      basicStatus:true,
      modeStatus:false,
      apiAdress:false,
      picked: '',
      token: '',
      name: '',
      size: '',
      cycle: '',
      creditor: '',
      avatar: '/img/assets/add_logo.png', //初始图片,
      localStorage: '',
      product:{} 
    }
  },
  created(){
    this.baseUrl = axios.defaults.baseURL;
    if(process.browser){
      this.localStorage = localStorage;
      this.userType = localStorage.userType;
    }
  },
  mounted() {
    if(process.browser){
      $('#myScrollspy').height( $(document).height() - 80);
      this.product=JSON.parse(sessionStorage.product);
    }
  },
  methods: {
    judge(num){
      var that=this;
      var bol = true;
      var tip = '通过';
      if(num === 0) {
        bol = true;
        tip = '通过'
      }else { 
        bol = false; 
        tip = '驳回';
      }
      layer.confirm('确定'+tip+'该资产包?', {icon: 1, title:'提示'}, function(index){
        axios({
          method:'get',
          url:"/cauds-exchange/asset/audit?decision=" + bol 
              + '&assetId=' + that.product.assetId,
          headers: {
            Authorization: 'Bearer ' + that.localStorage.token,
            Accept:'application/json'
          }
        })
        .then( res=> {
            window.location.href = '/apiDetail'
        })
        .catch( err=> {
         alert(err);
        });
        layer.close(index);
      });
     
    }
  }
}
</script>

<style scoped>
#myScrollspy{

}
.row{
  background:#f2f2f2;
}
#body .title-box{
  height:50px;
  display:flex;
  align-items:center;
}
#body .title-box .title{
  font-size:20px;
  margin-left:10px;
}
.procedure{
  width:98%;
  background:#ffffff;
  border-radius:10px;
  overflow: hidden;
  padding-bottom: 50px;
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
.title-wrap{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin:10px 0 30px 0;
}
.title-text>h3{
  font-size: 18px;
}
.title-text>p{
  font-size: 16px;
  color: #808080;
}
.title-wrap img{
  margin:0 20px 0 0;
  width: 90px;
  height: 90px;
}
.basic-wrapper{
  width:100%;
  overflow: hidden;
  position: relative;
  padding: 20px 50px;
  margin: 0 34px;
  margin-top: 40px;
  border: solid 1px #1fb5ab;
  border-radius: 10px;
  width: auto;
}
.basic-wrapper h3{
  font-size: 18px;
  font-weight: 600;
}
.basic-wrapper .reAdd{
  display: inline-block;
  position: absolute;
  top: 40%;
  right: 13%;
}
.basic-wrapper .judge-btn{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 70px;
}
.judge-btn>div{
  width: 120px;
  height: 36px;
  line-height: 33px;
  font-size: 18px;
  color: #555;
  border:solid 1px #b3b3b3;
  border-radius: 6px;
  outline: none;
  text-align: center;
  cursor: pointer;
}
.judge-btn div:nth-child(1){
  margin-right: 24px;
  color: white;
  background: #1FB5AD;
  border-color:#1FB5AD;
}
.basic-information{
  margin:0 auto;
  margin-top:40px;
  margin-left: 10px;
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
</style>
