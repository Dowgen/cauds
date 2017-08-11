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
              <li>
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
        <div class="search">
          <input placeholder="请输入关键字" size="10" >
          <img src="/img/assets/Search.png">
        </div>
        <div class="productList" >
          <div class="product" v-for="item in assetList" @click="jump(item)">
            <div class="product-top">
              <img src="/img/assets/product-logo.png">
              <div class="top-right">
                <div class="title">{{item.assetName}}</div>
                <div class="product-id">ID:{{item.assetId}}</div>
              </div>
            </div>
            <div class="product-bottom">
              <div class="left">
                <div class="text">资产规模：<span class="number">{{item.assetSize}}万</span></div>
                <div class="text">代缴资产：<span class="number">{{item.assetsPaid}}万</span></div>
                <div class="text">资产周期：<span class="number">{{item.assetCycle}}天</span></div>
              </div>
              <div class="right">
                <svg width="80" height="80" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent"/>
                  <circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent" :stroke-dasharray="dashArray"
                          :stroke-dashoffset="(1-item.assetsPaid/item.assetSize)*dashArray"/>
                </svg>
                <div class="percent">{{getPercent(item.assetsPaid,item.assetSize)}}%
                  <div class="text">占总比</div>
                </div>
              </div>
            </div>
          </div>
          <div class="add product" onclick="location.href='/addAsset'">
            <img src="/img/assets/add_hover.png">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script type="text/ecmascript">
  import axios from 'axios'
  import Hd from '~components/Hd.vue'

  export default {
    components: {
      Hd
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
        dashArray: Math.PI * 100,
        token:'',
        assetList:[]
      }
    },
    created: function () {
      this.getToken();
    },
    methods: {
      jump(item){
        sessionStorage.product = JSON.stringify(item);
        location.href='/productDetail'
      },
      getPercent(x,y){
        return (x/y*100).toFixed(1)
      },
      getToken(){
        var that = this;
        axios({
          method:'post',
          url:'http://192.168.1.158:8060/uaa/oauth/token',
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
          .then(function(response) {
            that.token = response.data.access_token;
            console.log(that.token);
            that.getAllAsset();
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      getAllAsset(){
        var that = this;
        axios({
          method:'get',
          url:"http://192.168.1.158:8060/cauds-exchange/asset/all",
          headers: {
            Authorization: 'Bearer ' + that.token,
            Accept:'application/json'
          },
          data: {
          },
        })
          .then(function(response) {
            that.assetList=response.data
            console.log(that.assetList)
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    computed: {
      dashOffset() {
        return (1 - 0.8) * this.dashArray
      }
    },
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
    top:28px;
    right:6%;
  }
  .search input{
    border:none;
    margin-left: 25px;
    margin-right:10px;
    outline:none;
    width: 85px;
  }
  #body .productList{
    display:flex;
    flex-wrap:wrap;
    margin-top:98px;
  }
  #body .productList .product{
    width:30%;
    height:220px;
    margin-right:33px;
    margin-bottom:47px;
    border:1px solid #d3d7da;
    border-radius:6px;
    box-sizing:border-box;
    padding:22px 16px 16px 18px;
  }
  #body .productList .product:hover{
    border:1px solid #1fb5ad;
    cursor: pointer;
  }
  #body .productList .product .product-top{
    display:flex;
    padding-bottom:11px;
    border-bottom: 1px dotted #e1e1e1;
    align-items:center;
    margin-bottom:27px;
  }
  #body .productList .product .product-top img{
    width:50px;
    height:50px;
    margin-right:22px;
  }
  #body .productList .product .product-top .title{
    font-size:24px;
    color:#333333;
    margin-bottom:0px;
  }
  #body .productList .product .product-top .product-id{
    font-size:12px;
    color:#1fb5ad;
  }
  #body .productList .product .product-bottom{
    font-size:14px;
    color:#95A0AA;
    display: flex;
    align-items:flex-start;
    justify-content:space-around;
  }
  #body .productList .product .product-bottom .left .text{
    margin-bottom:15px;
  }
  #body .productList .product .product-bottom .number{
    color:#333333;
  }
  #body .productList .product .product-bottom .right{
    position: relative;
  }
  #body .productList .product .product-bottom .right circle{
    stroke-width: 8px;
    transform-origin: center;
  }
  #body .productList .product .product-bottom .right .progress-background{
    transform: scale(0.9);
    stroke: #999999;
  }
  #body .productList .product .product-bottom .right .progress-bar{
    transform: scale(0.9) rotate(-90deg);
    stroke: #FA7252;
  }
  #body .productList .product .product-bottom .right .percent{
    text-align center
    width 48px
    height 49px
    font-size:21px;
    color:#FA7252;
    position:absolute;
    top:15px;
    left:50%;
    margin-left -24px
  }
  #body .productList .product .product-bottom .right .percent .text{
    font-size:12px;
    color:#999999;
  }
  #body .productList .add{
    border:dotted 1px #1d3d7da;
    display:flex;
    align-items:center;
    justify-content:center;

  }
</style>
