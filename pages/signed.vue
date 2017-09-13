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
        <div class="limit" v-show="userType==1">
          <span>日均规模</span>
          <select>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          <span style="margin:0 5px">至</span>
          <select>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          <span>合作模式</span>
          <select v-model="cooModeChose">
            <option v-for="(item,index) in cooModeList" :value="index">{{item}}</option>
          </select>
          <span>资金利率</span>
          <select>
            <option>1</option>
            <option>1</option>
            <option>1</option>
          </select>
          <span style="margin:0 5px">至</span>
          <select>
            <option>1</option>
            <option>1</option>
            <option>1</option>
          </select>
          <button>查询</button>
        </div>
        <div class="limit" v-show="userType==2">
          <span>日均规模</span>
          <select>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          <span style="margin:0 5px">至</span>
          <select>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          <span>额度档次</span>
          <select>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          <span style="margin:0 5px">至</span>
          <select>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          <button>查询</button>
        </div>
        <div class="productList" >
          <div class="product" v-for="(item,index) in curList" @click="jump(item)">
            <div class="product-top">
              <img :src="baseUrl + '/cauds-exchange/assetImge/'+ item.assetLogo">
              <div class="top-right">
                <div class="title">{{item.shortName}}</div>
              </div>
            </div>
            <div class="product-bottom">
              <div class="left">
                <div class="text">
                  在贷余额：
                  <span class="number">{{item.loanAomunt/10000}}万</span></div>
                <div class="text" v-show="userType==1">
                  日均规模：
                  <span class="number">{{item.dailyMoney/10000}}万</span></div>
                <div class="text" v-show="userType==1">
                  合作模式：
                  <span class="number">{{item.cooMode}}</span></div>
                <div class="text" v-show="userType==1"> 
                  资金利率：
                  <span class="number">{{item.rateRangeFrom}}%~{{item.rateRangeTo}}%</span></div>
                <div class="text" v-show="userType==2">
                  额度档次：
                  <span class="number">{{item.lineLevel}}</span></div>
                <div class="text" v-show="userType==2">
                  产品利率：
                  <span class="number">{{item.productRate}}</span></div>
                <div class="text" v-show="userType==2">
                  日放款规模：
                  <span class="number">{{item.dailyMoney/10000}}万</span></div>
                </div>
              </div>
            </div>
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
        cooModeChose:'',  //用户选择的合作模式
        cooModeList:['债转','直投','均可'], //合作模式列表
        inputSch: '',
        showPdctId: '', //鼠标经过的productId
        dashArray: Math.PI * 100,
        token:'',
        assetList:[],
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
      } 
      this.baseUrl = axios.defaults.baseURL;
    },
    beforeMount(){
      //获取广场数据
      this.getSignedList(this.userType);
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
      callback(data) {  //分页回调
        var start = (data-1) * this.perPage;
        var end = start + this.perPage;
        this.cur = data;
        this.curList = this.assetList.slice(start, end);
        console.warn(this.curList);
      },
      jump(item){  //跳转至产品页
        sessionStorage.co = JSON.stringify(item);
        location.href='/signedDetail'
      },
      getPercent(x,y){ //百分比计算
        return (x/y*100).toFixed(1)
      },
      getSignedList(type){ //筛选+搜索产品
        var that = this;
        var data = JSON.parse(that.localStorage.data).data;
        console.info(data);
        axios({
          method:'get',
          url:"cauds-account/user/org/contractingAgency?orgType="+type
            +"&orgId="+data.orgInfo.orgId,
          headers: {
            sessionId: data.sessionId,
            authKey: data.authKey,
            token: that.localStorage.token
          }
        })
        .then( res => {
          that.assetList=res.data.data;

          that.all = Math.ceil(that.assetList.length / that.perPage);
          that.callback(1);
        })
        .catch( err =>{
         /* window.location.href = '/login'*/
        });
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

  #myScrollspy{
    height:100vh;
  }
  #myScrollspy a{
    color:#95a0aa;
  }
  .limit{
    margin-top:68px;
    font-size: 16px;
    letter-spacing: -0.4px;
    line-height: 20px;
  }
  .limit>span{
    margin-right:8px;
    line-height:34px;
    color:#333;
  }
  .limit>span:not(:first-child){
    margin-left:16px;
  }
  .limit>select{
    width: 123px;
    height: 35px;
    border: solid 1px #ccc;
    appearance:none;
    background: url("/img/assets/arrow_down.png") no-repeat 100px center transparent;
    background-size:13px 7px;
    padding-right: 30px;
    padding-left: 10px;
    border-radius: 6px;
    margin-right: 4px;
    outline: none;
  }
  .limit>select>option{
    text-align: center;
  }
  .limit>button{
    margin-left: 20px;
    background: #FAFAFA;
    border: 1px solid #1FB5AD;
    border-radius: 5px;
    color: #1FB5AD;
    width: 73px;
    height: 35px;
    outline:none;
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
    box-shadow:1px 1px 15px 2px #eee;
    display:flex;
  }
  #body .productList .product:hover{
    border:1px solid #1fb5ad;
    cursor: pointer;
  }
  .product-top{
    flex:3;
    display:flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    margin:20px 0;
    padding-bottom:11px;
    padding:11px 0;
    border-right: 1px dashed #e1e1e1;
    align-items:center;
  }
  .product-top img{
    width:78px;
    height:78px;
  }
  .product-top .title{
    font-size:1.5vw;
    color:#333333;
    margin-top:14px;
  }
  .product-top .product-id{
    font-size:12px;
    color:#1fb5ad;
  }
  .product-bottom{
    flex:5;
    padding:22px 0;
    font-size:14px;
    color:#95A0AA;
    display: flex;
    align-items:center;
    justify-content:flex-start;
    margin-left:30px
  }
  .product-bottom .left .text{
    margin-bottom:10px;
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
