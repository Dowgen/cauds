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
                        <a href="jaevascript:void(0);" class="navClicked" onclick="location.href='/addAsset'">添加资产</a>
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
              <div class="unit"></div>
            </div>
            <div class="information-box">
              <div class="name">资金方机构名称：</div>
              <select style="width:270px" v-model="orgId" @change="getOrgName(orgId)">
                <option v-for="item in orgList" :value="item.orgId">{{item.orgName}}</option>
              </select>
              <div class="unit"></div>
            </div>
            <div class="information-box">
              <div class="name">进件开始时间：</div>
              <input id="startTime" placeholder="请输入日期" class="laydate-icon" onclick="laydate()">
              <select v-model="startBizHour">
                <option v-for="item in timeNum">{{item}}</option>
              </select>
              <select v-model="startBizMin">
                <option v-for="item in timeNum">{{item}}</option>
              </select>
              <div class="unit"></div>
            </div>
            <div class="information-box">
              <div class="name">进件结束时间：</div>
              <input id="endTime" placeholder="请输入日期" class="laydate-icon" onclick="laydate()">
              <select v-model="endBizHour">
                <option v-for="item in timeNum">{{item}}</option>
              </select>
              <select v-model="endBizMin">
                <option v-for="item in timeNum">{{item}}</option>
              </select>
              <div class="unit"></div>
            </div>
            <div class="save-btn" @click="confirmInfo">保存</div>
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
            <div class="save-btn2">
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
    /*link:[{rel: 'stylesheet',href:'js/laydate/need/ladate.css'}],*/
    script: [
      { src: 'js/jQuery.min.js' },
      { src: 'js/layer.js' },
      { src: 'js/bootstrap.min.js' },
      { src: 'js/laydate/laydate.js' }
    ]
  },
  data () {
    return {
      userType:'',
      froma:'',
      basicStatus:true,
      modeStatus:false,
      apiAdress:false,
      picked: '',
      token: '',
      name: '',  //资产包名称
      size: '',  //资产总额
      cycle: '', //资产周期
      assetCompany:'', //资产方名称
      assetCompanyId:'', //资产方id
      orgId: '', //资金方id
      orgName:'',//资金方名称
      startTime:'',//进件开始时间
      endTime:'',//进件结束时间
      orgList: [], //机构列表
      avatar: '/img/assets/add_logo.png', //初始图片,
      localStorage: '',
      product:{},  //sessionStorage里的数据
      baseUrl: '',
      timeNum:[],  //时间数字（1-60）
      startBizHour: '00',  //进件开始时间（小时）
      startBizMin: '00',   //进件开始时间（分钟）
      endBizHour: '00',  //进件结束时间（小时）
      endBizMin: '00'    //进件结束时间（分钟）
    }
  },
  created(){
    if(process.browser) {
      this.localStorage = localStorage;
      this.userType = localStorage.userType;
    }
    this.baseUrl = axios.defaults.baseURL;
    // 时间数字(1-60)生成
    for(let i=0;i<=59;i++)
      if(i<=9) this.timeNum.push('0'+i);
      else this.timeNum.push(i.toString())
  },
  mounted() {
    this.getOrg();
    if(process.browser){
      $('#myScrollspy').height( $(document).height() - 80);
      var data = JSON.parse(this.localStorage.data).data;
      this.assetCompany = data.userInfo.org_name; //不是重新添加的话，就从local里拿
      this.assetCompanyId = data.userInfo.org_id; //不是重新添加的话，就从local里拿

      this.product=JSON.parse(sessionStorage.product);
      //如果是重新添加，生成已有值
      let froma = this.GetQueryString('from');
      this.froma = froma;
      if(froma == 'reAdd'){
        //注释掉，因为reAdd的时候logo也没了，所以得让用户必须重新提交logo
        /*this.avatar = this.baseUrl + '/cauds-exchange/assetImge/'+ this.product.assetLogo*/
        this.name = this.product.assetName
        this.size = this.product.assetSize
        this.cycle = this.product.assetCycle
        this.assetCompany = this.product.assetCompany  //重新添加的话，就从session里拿
        this.assetCompanyId = this.product.assetCompanyId  //重新添加的话，就从session里拿
      }
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
    getOrg(){  //获得机构label列表
      var that = this;
      var data = JSON.parse(that.localStorage.data).data;
      axios({
        method:'get',
        url:"/cauds-account/user/org/list?orgId=" + data.orgInfo.orgId +
          '&orgType=' + data.orgInfo.type,
        headers: {
          sessionId: data.sessionId,
          authKey: data.authKey
        }
      })
      .then( rs=>  {
        that.orgList = rs.data.data;
    })
      .catch( /*err => window.location.href = '/login'*/)
    },
    getOrgName(id){
      var list = this.orgList;
      for(let i in list){
        if(list[i].orgId === id)
          this.orgName = list[i].orgName;
      }
    },
    confirmInfo(){
      var that = this;
      if(that.name =='' || that.size=='' || that.cycle=='' || that.orgId == '' || 
         $('#startTime').val() == '' || $('#endTime').val() == '' 
         || $("#upfile").get(0).files.length === 0){
        toastr.warning('图片和信息请填写完整!');
      }else{
        layer.confirm('确定添加资产包?', {icon: 1, title:'提示'}, function(index){
          layer.close(index);
          that.addProperty();
        });
      }
    },
    addProperty(){
      var that = this;
      var myUrl = '/cauds-exchange/asset/create';
      var myData = {
        assetName: that.name,
        assetSize: that.size,
        assetCycle: that.cycle,
        assetCompany: that.assetCompany,
        assetCompanyId: that.assetCompanyId,
        moneyCompany: that.orgName,
        moneyCompanyId: that.orgId,
        entranceStartTime: $('#startTime').val(),
        entranceEndTime: $('#endTime').val()
      }
      //判断是否重加
      if(that.froma == 'reAdd'){
        myUrl = '/cauds-exchange/asset/reCreate';
        myData.assetId = that.product.assetId;
      }
      axios({
        method:'post',
        url: myUrl,
        headers: {
          Accept:'application/json',
          Authorization: 'Bearer ' + that.localStorage.token
        },
        data: myData
      })
      .then( rs => {
          that.uploadImg(rs.data.assetId);
      })
      .catch( err => alert(err));
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
        layer.msg('资产创建成功!',{time:2000});
        /*setTimeout("window.location.href = './apiDetail'",700);*/
      })
      .catch( /*err => window.location.href = '/login'*/);
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
}
.basic-information{
  margin:0 auto;
  margin-top:100px;
}
.market{
  font-size:12px;
  color:#666666;
  margin-bottom:51px;
  display:flex;
  align-items:center;
  justify-content: center;
}
.market .name{
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
.market .img-wrapper{
  width:270px;
  text-align:center;
}
.market .img-wrapper img{
  margin-bottom:15px;
  width: 63px;
  height: 63px;
}
.market .img-wrapper .text{
  font-size:12px;
  color:#999999;
}
.information-box{
  font-size:12px;
  color:#666666;
  margin-bottom:16px;
  display:flex;
  align-items:center;
  height:30px;
  justify-content:center;
}
.information-box .name{
  width:100px;
  text-align:end;
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
  outline: none;
}
.information-box select option{
  text-align: center;
}
.laydate-icon{
  width:160px !important;
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
