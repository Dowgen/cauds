<template>
  <section class="cont">
    <hd/>
    <div class="row" v-cloak>
      <div id="nav-left" class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
        <div class="container" style="margin:0;padding:0">
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
        <div class="limit">
          <div>
            <h3>业务状态:</h3>
            <div class="radio">
              <div  v-for="(item,index) in bizList">
                <input type="checkbox" :id="'checkbox'+index">
                <label :for="'checkbox'+index" @click="changeChannel('bizChoseList',index,item.id)">{{item.name}}</label>
              </div>  
            </div>
          </div>
          <div>
            <h3>机构名称:</h3>
            <div class="radio">
            <div  v-for="(item,index) in orgList">
              <input type="checkbox" :id="'checkboxB'+index">
              <label :for="'checkboxB'+index" @click="changeChannel('orgChoseList',index,item.orgId)">{{item.orgName}}</label>
            </div>
          </div>
         </div> 
         <div class="search">
          <input v-model="inputSch" placeholder="请输入关键字" size="10" @keyup.enter="findAssets">
          <img src="/img/assets/Search.png" @click="findAssets">
         </div>
        </div>
        
        <div class="productList" >
          <div class="product" v-for="(item,index) in curList" 
          @mouseover="showMask(item.assetId,item.assetStatus,index)" 
          @mouseleave="unshowMask(item.assetStatus,index)" @click.stop="jump(item,0)">
          <div  :style="item.assetStatus == 1&&userType==2 || item.assetStatus == 2 ||item.assetStatus == 7 || item.assetStatus == 8?{opacity:0.3}:''">
            <!-- 下方数组表示有label的status -->
            <div style="position:absolute;right:0;top:13px"   
                 v-show="[1,3,4,5,6].indexOf(item.assetStatus) != -1"> 
              <img v-show="userType==1||userType==2&&item.assetStatus!=1":src="'/img/apiDetail/'+item.assetStatus + '.png'">
            </div>
            <div class="product-top">
              <img :src="baseUrl + '/cauds-exchange/assetImge/'+ item.assetLogo">
              <div class="top-right">
                <div class="title">{{item.assetName}}</div>
              </div>
            </div>
            <div class="product-bottom">
              <div class="left">
                <div class="text">资产规模：
                  <span class="number">{{item.assetSize/10000}}万</span></div>
                <div class="text">放贷金额：
                  <span class="number">{{item.assetsPaid/10000}}万</span></div>
                <div class="text">资产周期：
                  <span class="number">{{item.assetCycle}}天</span></div>
                <div class="text" v-show="[1,2,3].indexOf(item.assetStatus) != -1">
                  进件开始：
                  <span class="number">
                    {{new Date(item.entranceStartTime).toLocaleDateString()}}
                    {{new Date(item.entranceStartTime).toLocaleTimeString()}}
                  </span>
                </div>
                <div class="text" v-show="item.assetStatus == 4">
                  剩余时间：
                  <span class="number">
                    {{  dateDif(item.entranceEndTime) }}
                  </span>
                </div>
                <div class="text" v-show="item.assetStatus >= 5">
                  进件已结束<span class="number"></span>
                </div>
              </div>
              <div class="right">
                <svg width="90" height="90" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent"/>
                  <circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent" 
                  :stroke-dasharray="dashArray"
                  :stroke-dashoffset="(1-item.assetsPaid/item.assetSize)*dashArray"/>
                </svg>
                <div class="percent">
                  {{parseInt(getPercent(item.assetsPaid,item.assetSize))}}%
                  <div class="text">占总比</div>
                </div>
              </div>
            </div>
            </div>
            <div class="notNormal-text waitJudge-text" v-show="item.assetStatus == 1 && userType== '2'" @click.stop="jump(item,1)">
              <p :id="'wait'+index">等待审核</p>
            </div>
            <div class="notNormal-text reject-text" v-show="item.assetStatus == 2" @click.stop="jump(item,2)">
              <p :id="'reject'+index">审核被驳回</p>
            </div>
            <div class="notNormal-text expired-text" v-show="item.assetStatus == 8" @click.stop="jump(item,3)">
              <p :id="'expired'+index">资产过期</p> 
            </div>
            <div class="notNormal-text lock-text" v-show="item.assetStatus == 7" @click.stop="">
              <img src="/img/apiDetail/belocked.png">
            </div>
            <div class="product-mask" v-show="showPdctId == item.assetId">   
            </div>
          </div>
          <div v-show="userType== '1'" class="add product" onclick="location.href='/addAsset'">
            <img src="/img/assets/add_hover.png">
          </div>
        </div>
        <vue-nav :cur="cur" :all="all" :callback="callback"></vue-nav>
      </div>
    </div>
  </section>
</template>
<script type="text/ecmascript">
  import axios from '~/plugins/axios'
  import Hd from '~components/Hd.vue'
  import Vnav from '~components/vue-nav.vue'

  export default {
    components: {
      Hd,
      'vue-nav':Vnav
    },
    head: {
      title: '资产列表',
      script: [
        { src: 'js/jQuery.min.js' },
        { src: 'js/layer.js' },
        { src: 'js/bootstrap.min.js' }
      ]
    },
    data () {
      return {
        userType:'', //判断是资金方登陆还是资产方
        bizList:[],
        bizChoseList: [],
        orgList:[],
        orgChoseList:[],
        inputSch: '',
        showPdctId: '', //鼠标经过的productId
        dashArray: Math.PI * 100,
        token:'',
        assetList:[],
        nowTime:'', //当前时间毫秒数
        baseUrl: '',
        localStorage: '',
        /* 分页data */
        cur: 1, //当前页数
        all: 0, //总页数
        perPage:8, //每页显示的产品数
        curList: [] //当前页产品列表
      }
    },
    created () {
      if(process.browser){
        this.localStorage = localStorage
        this.userType = localStorage.userType;
        this.nowTime = new Date().getTime();
      } 
      this.baseUrl = axios.defaults.baseURL;
    },
    beforeMount(){
      this.getAssetStatus();
      //动态获取当前时间毫秒数
      var self = this;
      setInterval(getTime,1000)
      function getTime(){
        self.nowTime = new Date().getTime();
      }
    },
    mounted() {
      if(process.browser)
        $('#myScrollspy').height( $(document).height() - 80);
    },
    updated(){
      if(process.browser)
        $('#myScrollspy').height( $(document).height() - 80);
    },
    methods: {
      showMask(id,status,index){
        this.showPdctId = id;
        if(status == 2) {
          $('#reject'+index).css('background','#ff5500');
          $('#reject'+index).css('color','white');
        }else if(status == 8) {
          $('#expired'+index).css('background','#adadad');
          $('#expired'+index).css('color','white');
        }
      },
      unshowMask(status,index){
        this.showPdctId = '';
        if(status == 2) {
          $('#reject'+index).css('background','rgba(255,85,0,0.56)');
          /*$('#reject'+index).css('color','rgba(255,85,0,1)');*/
        }else if(status == 8) {
          $('#expired'+index).css('background','rgba(173,173,173,0.56)');
          /*$('#expired'+index).css('color','rgba(173,173,173,1)');*/
        }
      },
      callback(data) {  //分页回调
        var start = (data-1) * this.perPage;
        var end = start + this.perPage;
        this.cur = data;
        this.curList = this.assetList.slice(start, end);
      },
      jump(item,num){  //跳转至产品页
        sessionStorage.product = JSON.stringify(item);
        if(num===0){ //正常
          location.href='/productDetail'
        }else if(num===1){ //待确认
          location.href='/waitJudge'
        }else if(num===2){ //被驳回
          location.href='/notNormalDetail?type=reject'
        }else if(num===3){ //过期
          location.href='/notNormalDetail?type=expired'
        }
      },
      getPercent(x,y){ //百分比计算
        return (x/y*100).toFixed(1)
      },
      dateDif(enddate){  //倒计时计算
        var date = enddate - this.nowTime;  
        console.log('wy');  
        if(date <= 0){  
          console.log('时间到');
          return;  
        }else{
          var days    = date / 1000 / 60 / 60 / 24;  
          var daysRound   = Math.floor(days);  
          var hours    = date/ 1000 / 60 / 60 - (24 * daysRound);  
          var hoursRound   = Math.floor(hours);  
          var minutes   = date / 1000 /60 - (24 * 60 * daysRound) - (60 * hoursRound);  
          var minutesRound  = Math.floor(minutes);  
          var seconds   = date/ 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound);  
          var secondsRound  = Math.floor(seconds);  
          var time = daysRound+" 天 "+hoursRound +" 小时 "+
                     minutesRound+" 分 "+secondsRound+" 秒";  
          return time;
        }
      },   
      //勾选/取消 渠道复选框，更改数组数据,并调用产品列表方法
      changeChannel (list, index, id){
        var channel = this[list];
        console.log('channel:'+channel)
        //判断是点击的哪个元素
        if( list === 'bizChoseList'){
          var jqueryId = '#checkbox' + index
        }else{
          var jqueryId = '#checkboxB' + index
        }
        //判断本次点击是选中还是取消(****PS:不知道为什么选中时值为false，先这样写着吧)
        if($(jqueryId).is(":checked") == false){  //选中，添加id
          channel.push(id);
        }else{  //取消选中，删除id
          for(var i=0; i<channel.length; ++i) {
            if(channel[i] == id) {
              channel.splice(i, 1);
                break;
            }
          }
        }
        this[list] = channel;
        console.log(this[list])
        this.findAssets();
      },
      getAssetStatus(){  //获得业务状态label列表
        var that = this;
        var data = JSON.parse(that.localStorage.data).data;
        axios({
          method:'get',
          url:"/cauds-exchange/asset/assetStatusList",
          headers: {
            Authorization: 'Bearer ' + that.localStorage.token,
            Accept:'application/json'
          },
          data: {
          }
        })
        .then( rs=>  {
          that.bizList = rs.data.data;
          that.getOrg();
      })
        .catch( /*err => window.location.href = '/login'*/)
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
          that.findAssets();
      })
        .catch( /*err => window.location.href = '/login'*/)
      },
      findAssets(){ //筛选+搜索产品
        var that = this;
        var data = JSON.parse(that.localStorage.data).data;
        axios({
          method:'get',
          url:"/cauds-exchange/asset/findAssets?orgId=" + data.orgInfo.orgId
            + '&orgType='+ data.orgInfo.type 
            + '&queOrgId=' + that.orgChoseList.join(',').toString()
            + '&assetStatus=' + that.bizChoseList.join(',').toString()
            + '&keyword=' + that.inputSch,
          headers: {
            Authorization: 'Bearer ' + that.localStorage.token,
            Accept:'application/json'
          }
        })
        .then( res => {
          that.assetList=res.data;
          that.all = Math.ceil(that.assetList.length / that.perPage);
          that.callback(1);
        })
        .catch( err =>{
          window.location.href = '/login'
        });
      }
    },
    computed: {
      dashOffset() {
        return (1 - 0.8) * this.dashArray
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  #body>div>a{
    position: absolute;
    left: 0;
  }
  #body>div>p{
    margin-top: 11px;
    margin-bottom: 25px;
    color: #939393;
  }
  #body>div>hr{
    width: 100%;
  }
  .body-title{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    position:relative;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;

  }
  .body-title>p{
    font-size: 19px;
    font-weight: bold;
  }
  .body-title>span{
    color: #888;
    background: #E7F5F5;
    padding: 3px 9px;
    margin-left: 11px;
  }
  .body-label>span:nth-child(1){
    border: solid 1px #f86b4f;
    color: #f86b4f;
    padding: 3px 6px;
  }
  .body-label>span:nth-child(2){
    border: solid 1px #fcb322;
    color: #fcb322;
    padding: 3px 6px;
  }
  .body-title .favorite{
    cursor:pointer;
    position:absolute;
    width:60px;
    height:40px;
    text-align:center;
    right:0;
    top:10px;
  }
  .body-title .favorite .active{
    color:red
  }
  #form{
    height: 32px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
  }
  #form input{
    margin: 0 10px !important;
    height: 15px;
  }
  .inputer{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin-top: 35px;
  }
  .inputer>table{
    margin-left: -150px;
    width: 325px;
  }
  .inputer td{
    padding-right: 10px;
    text-align: right;
    font-size: 15px;
    color: #333;
  }
  .inputer input{
    height: 32px;
    border: solid 1px #bbb;
    border-radius: 6px;
    outline: none;
    padding-left: 10px;
  }
  .inputer select{
    width:99%;
    border-radius:6px;
    height:32px;
    outline: none;
  }
  .red-star{
    color:#ff5500;
    margin-right:3px;
  }
  .regist {
    width: 100px;
    height: 32px;
    line-height: 32px;
    background: #1abc9c;
    border-radius: 7px;
    color: white;
    margin: auto;
    margin-top: 10px;
    text-align: center;
    cursor: pointer;
  }
  #myScrollspy{
    height:100vh;
  }
  #myScrollspy a{
    color:#95a0aa;
  }
  .limit{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: flex-start;
    width: 90%;
    margin-top: 20px;
  }
  .limit>div>h3{
    font-size:16px;
    font-family: "SimHei";
  }
  .radio{
    display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
              justify-content: space-between;
      -webkit-box-align: center;
      -ms-flex-align: center;
              align-items: center;
      position: relative;
      margin: 0 auto;
      top: 30%;
      height: 40%;
      background-color: white;
  }
  .radio>span{
    margin-right: 5px;
  }
  .radio>div{
    margin-right:15px;
  }
  input[type="checkbox"]{
      display: none;
  }
  input[type="checkbox"]+label {
      display: inline-block;
      margin:0;
      padding:0;
      -webkit-box-sizing: border-box;
  }
  label::before {
      content: "";
      display: inline-block;
      width: 20px;
      height: 20px;
      background: #EEE;
      vertical-align: middle;
      -webkit-border-radius: 50%;
      margin-right: 5px;
      -webkit-box-sizing:border-box;
      -webkit-transition:background ease-in .5s
  }

  input[type="checkbox"]:checked+label::before{
      background-color: #1FB5AD;
      border: 5px #EEEEEE solid;
  }
  .limit button{
    margin:10px 0;
    background: #1fb5ad;
      text-align: center;
      line-height: 32px;
      height: 32px;
      color: #fff;
      font-size: 12px;
      border: none;
      width: 55px;
      border-radius: 6px;
      outline:none;
  }
  .search{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    /* justify-content: center; */
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    border:solid 1px #D3D7DA;
    border-radius: 16px;
    width: 160px;
    height: 32px;
    position:absolute;
    right:6%;
  }
  .search input{
    border:none;
    margin-left: 25px;
    margin-right:10px;
    outline:none;
    width: 85px;
  }
  .search img{
    cursor:pointer;
  }
  #body .productList{
    display:flex;
    flex-wrap:wrap;
    margin-top:48px;
  }
  #body .productList .product{
    position:relative;
    width:30%;
    margin-right:33px;
    margin-bottom:47px;
    border:1px solid #d3d7da;
    border-radius:6px;
    box-sizing:border-box;
    padding:22px 16px 16px 18px;
    box-shadow:1px 1px 15px 2px #eee;
  }
  #body .productList .product:hover{
    border:1px solid #1fb5ad;
    cursor: pointer;
  }
  .notNormal-text{
    position:absolute;
    top:0;left:0;right:0;bottom:0;
    display:flex;
    justify-content:center;
    align-items:center;
    width:100%;
    height:100%;
    z-index:999;
    font-size:21px;
    text-align:center;
  }
  .notNormal-text>p{
    position:relative;
    border-radius: 26px;
    height:52px;
    line-height:52px;
    width:60%;
  }
  .waitJudge-text>p{
    background:#56bfb3;
    color: white;
  }
  .reject-text>p{
    background: rgba(255,85,0,0.56);
    color:white;
  }
  .expired-text>p{
    background: rgba(173,173,173,0.56);
    color:white;
  }
  .product-mask{
    position:absolute;
    color:white;
    top:0;left:0;right:0;bottom:0;
    background: rgba(0, 0, 0, 0.5);
    animation: fade 0.5s linear;
    z-index:888;
  } 
  .product-mask>img, .notNormal-text>.lock-icon{
    position: absolute;
    right: 10px;
    top: 10px;
    z-index:9999;
  }
  .product-top{
    display:flex;
    padding-bottom:11px;
    border-bottom: 1px dashed #e1e1e1;
    align-items:center;
    margin-bottom:27px;
  }
  .product-top img{
    width:50px;
    height:50px;
    margin-right:22px;
  }
  .product-top .title{
    font-size:1.5vw;
    color:#333333;
    margin-bottom:0px;
  }
  .product-top .product-id{
    font-size:12px;
    color:#1fb5ad;
  }
  .product-bottom{
    font-size:14px;
    color:#95A0AA;
    display: flex;
    align-items:flex-start;
    justify-content:flex-start;
    margin-left:30px
  }
  .product-bottom .left .text{
    margin-bottom:15px;
  }
  .product-bottom .number{
    color:#333333;
  }
  .product-bottom .right{
    position: absolute;
    right:3vw;
  }
  .product-bottom .right circle{
    stroke-width: 6px;
    transform-origin: center;
  }
  .product-bottom .right .progress-background{
    transform: scale(0.9);
    stroke: #ddd;
  }
  .product-bottom .right .progress-bar{
    transform: scale(0.9) rotate(-90deg);
    stroke: #FA7252;
  }
  .product-bottom .right .percent{
    text-align center
    width 60px
    height 49px
    font-size:21px;
    color:#FA7252;
    position:absolute;
    top:20px;
    left:43%;
    margin-left -24px
  }
  .product-bottom .right .percent .text{
    font-size:12px;
    color:#999999;
  }
  #body .productList .add{
    border:dotted 1px #1d3d7da;
    display:flex;
    align-items:center;
    justify-content:center;

  }
  .page-bar{
    margin-bottom:60px;
  }
</style>
