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
                    <li>
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
        <div class="step">
          <ul>
            <li class="step-name" :class="{'current':basicStatus}">基本信息</li>
            <li class="step-name" :class="{'current':modeStatus}">模式选择</li>
          </ul>
        </div>
        <div class="line">
        </div>
        <div class="basic-wrapper">
          <div class="basic-information" v-show="basicStatus">
            <div class="market">
              <span class="name">标志：</span>
              <div class="img-wrapper">
                <div class="up-con">
                <img :src="avatar"/>
                <input id="upfile" type="file" name="upfile" accept="image/png,image/jpg" class="accept" @change='preivewImg'>
                </div>
              <div class="text">(图片大小63*63)</div>
            </div>
            </div>
            <div class="information-box">
              <div class="name">资产名称：</div>
              <input v-model="name" type="text"/>
              <div class="unit"></div>
            </div>
            <div class="information-box">
              <div class="name">资产总额：</div>
              <input v-model="size" type="number"/>
              <div class="unit">元</div>
            </div>
            <div class="information-box">
              <div class="name">资产周期：</div>
              <input v-model="cycle" type="number"/>
              <div class="unit">天</div>
            </div>
            <div class="save-btn" @click="addProperty">保存</div>
          </div>
          <div class="mode" v-show="modeStatus">
            <div class="tradeStructure">
              <img src="/img/assets/question.png">
              <div class="text">查看交易结构详情</div>
            </div>
            <div class="mode-wrapper">
              <div class="mode-box">
                <div class="left">
                  <div class="number">1</div>
                  <div class="moder-name">交易结构</div>
                </div>
              <div class="middle">
                <ul>
                  <li class="mode-text">资金方付款和代扣</li>
                  <li class="mode-text">资金闭环</li>
                  <li class="mode-text">息费后收</li>
                </ul>
              </div>
              <div class="payBtn">
                <input type="radio" id="one" value="One" v-model="picked">
                <img v-if="picked=='One'" src="/img/assets/choose.png">
              </div>
              </div>
              <div class="mode-box">
                <div class="left">
                  <div class="number">2</div>
                  <div class="moder-name">交易结构</div>
                </div>
              <div class="middle">
                <ul>
                  <li class="mode-text">资金方付款和代扣</li>
                  <li class="mode-text">资金闭环</li>
                  <li class="mode-text">息费趸交</li>
                </ul>
              </div>
              <div class="payBtn">
                <input type="radio" id="two" value="Two" v-model="picked">
                <img v-if="picked=='Two'" src="/img/assets/choose.png">
              </div>
              </div>
              <div class="mode-box">
                <div class="left">
                  <div class="number">3</div>
                  <div class="moder-name">交易结构</div>
                </div>
              <div class="middle">
                <ul>
                  <li class="mode-text">资金方放款</li>
                  <li class="mode-text">资金方1+1日回款</li>
                  <li class="mode-text">息费趸交</li>
                </ul>
              </div>
              <div class="payBtn">
                <input type="radio" id="three" value="Three" v-model="picked">
                <img v-if="picked=='Three'" src="/img/assets/choose.png">
              </div>
              </div>
            </div>
            <div class="save-btn">
              保存并添加资产
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
    script: [
      { src: 'js/jQuery.min.js' },
      { src: 'js/layer.js' },
      { src: 'js/bootstrap.min.js' }
    ]
  },
  data () {
    return {
      basicStatus:true,
      modeStatus:false,
      apiAdress:false,
      picked: '',
      token: '',
      name: '',
      size: '',
      cycle: '',
      avatar: '/img/assets/add_logo.png', //初始图片,
      localStorage: '',
    }
  },
  created(){
    /*this.getToken();*/
    if(process.browser){
      this.localStorage = localStorage;
      console.log(this.localStorage)
    }
  },
  mounted() {
    if(process.browser)
      $('#myScrollspy').height( $(document).height() - 80);
  },
  methods: {
    addProperty(){
      var that = this;
      if(that.name =='' || that.size=='' || that.cycle=='' 
        || $("#upfile").get(0).files.length === 0){
        toastr.warning('图片和信息请填写完整!');
      }else{
        axios({
          method:'post',
          url:'/cauds-exchange/asset/create',
          headers: {
            Accept:'application/json',
            Authorization: 'Bearer ' + that.localStorage.token
          },
          data: {
            assetName: that.name,
            assetSize: that.size,
            assetCycle: that.cycle,
          }
        })
        .then( rs => {
          that.uploadImg(rs.data.assetId);
        })
        .catch( err => alert(err));
      }
    },
    preivewImg() {
      /* 用fileReader实现图片预览 */
      var that = this;
      var file = $("#upfile").get(0).files[0];
      var name = file.name;
      var reader = new FileReader();
      reader.onload = function(e) {
        that.avatar = e.target.result;
      }
      reader.readAsDataURL(file, "UTF-8");
    },
    uploadImg(id){
      var that = this;
      var data = JSON.parse(that.localStorage.data).data;
      var fd = new FormData();
      fd.append("upload", 1);
      fd.append('file', $("#upfile").get(0).files[0]);
      fd.append('assetName', that.name);
      fd.append('assetId', id);
      axios({
        method:'post',
        url: "/cauds-exchange/assetImge/upload",
        headers: {
          Authorization: 'Bearer ' + that.localStorage.token,
          Accept:'application/json'
        },
        data: fd
      })
      .then( rs => {
        toastr.success('资产创建成功!');
        setTimeout("window.location.href = './apiDetail'",700);
      })
      .catch( err => window.location.href = '/login');
    },
    showMode(){
      this.basicStatus = false;
      this.modeStatus = true;
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
#body .title-box .title{
  font-size:20px;
  margin-left:10px;
}
#body .procedure{
  width:98%;
  height:87vh;
  background:#ffffff;
  border-radius:10px;
}
#body .procedure .step ul{
  display:flex;
  padding:31px 0 0 23px;
  margin:0;
  
}
#body .procedure .step ul .step-name{
  list-style:none;
  width:100px;
  text-align:center;
  font-size:14px;
  height:30px;
  
}
#body .procedure .step ul .current{
  color:#1FB5AD;
  border-bottom:1px solid #1FB5AD;
}
#body .procedure .line{
  width:90%;
  height:1px;
  background:#E1E1E1;
  margin-left:23px;
}
#body .procedure .basic-wrapper{
  width:100%;
}
#body .procedure .basic-wrapper .basic-information{
  width:400px;
  height:400px;
  margin:0 auto;
  margin-top:100px;
}
#body .procedure .basic-wrapper .basic-information .market{
  font-size:12px;
  color:#666666;
  margin-bottom:51px;
  display:flex;
  align-items:center;
}
#body .procedure .basic-wrapper .basic-information .market .name{
  width:80px;
  text-align:end;
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
.up-con{
  display: inline-block;
  position: relative;
}
#body .procedure .basic-wrapper .basic-information .market .img-wrapper{
  width:270px;
  text-align:center;
}
#body .procedure .basic-wrapper .basic-information .market .img-wrapper img{
  margin-bottom:15px;
  width: 63px;
  height: 63px;
}
#body .procedure .basic-wrapper .basic-information .market .img-wrapper .text{
  font-size:12px;
  color:#999999;
}
#body .procedure .basic-wrapper .basic-information .information-box{
  font-size:12px;
  color:#666666;
  margin-bottom:16px;
  display:flex;
  align-items:center;
  height:30px;
  justify-content:space-around;
}
#body .procedure .basic-wrapper .basic-information .information-box .name{
  width:80px;
  text-align:end;
}
#body .procedure .basic-wrapper .basic-information .information-box input{
  border:1px solid #e1e1e1;
  width:270px;
  border-radius:6px;
  height:30px;
  outline:none;
  
}
#body .procedure .basic-wrapper .basic-information .information-box input:focus{
  border:1px solid #1FB5AD;
  border-radius:6px;
  height:30px;
}
#body .procedure .basic-wrapper .basic-information .information-box .unit{
  width:30px;
}
#body .procedure .basic-wrapper .basic-information .save-btn{
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
#body .procedure .basic-wrapper .mode{

}
#body .procedure .basic-wrapper .mode .tradeStructure{
  display:flex;
  margin:30px 0 80px 40px;
  width:170px;
  height:30px;
  align-items:center;
}
#body .procedure .basic-wrapper .mode .tradeStructure .text{
  font-size:16px;
  color:#fa8564;
  margin-left:8px;
}
#body .procedure .basic-wrapper .mode .mode-wrapper{
  display:flex;
  padding:0 40px;
}
#body .procedure .basic-wrapper .mode .mode-wrapper .mode-box{
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
#body .procedure .basic-wrapper .mode .mode-wrapper .mode-box:last-child{
  margin-right:0;
}
#body .procedure .basic-wrapper .mode .mode-wrapper .mode-box .left{
  width:45px;
  height:100%;
  background:#1FB5AD;
  padding-top:20px;
}
#body .procedure .basic-wrapper .mode .mode-wrapper .mode-box .left .number{
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
#body .procedure .basic-wrapper .mode .mode-wrapper .mode-box .left  .moder-name{
  width:20px;
  color:#FFFFFF;
  font-size:16px;
  margin:0 auto;
}
#body .procedure .basic-wrapper .mode .mode-wrapper .mode-box .middle{
  font-size:14px;
  color:#666666;
}
#body .procedure .basic-wrapper .mode .mode-wrapper .mode-box .middle .mode-text{
  margin-bottom:16px;
}
#body .procedure .basic-wrapper .mode .mode-wrapper .mode-box .payBtn{
  position:absolute;
  right:22px;
  top:65px;
  width:30px;
  height:30px;
  border:1px solid #1fb5ad;
  border-radius:50%;
  
}
#body .procedure .basic-wrapper .mode .mode-wrapper .mode-box .payBtn input{
  width:100%;
  height:100%;
  margin:0;
  opacity:0;
}
#body .procedure .basic-wrapper .mode .mode-wrapper .mode-box .payBtn img{
  position:absolute;
  top:0;
  left:0;
  width:30px;
  height:30px;
}
#body .procedure .basic-wrapper .mode .save-btn{
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
