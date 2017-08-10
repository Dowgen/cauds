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
          <img src="/img/assets/back_icon.png" onclick="location.href='/apiDetail'">
          <span class="title">资产信息</span>
        </div>
        <div class="procedure">
          <div class="top">
            <div class="left">
              <img src="/img/assets/product-logo.png">
              <div class="content">
                <div class="title">聚抵信49873</div>
                <div class="time">注册时间：2017-07-19</div>
                <div class="product-id">ID:JDX489973</div>
              </div>
            </div>
            <div class="middle">
              <div class="amount">
                <div class="number">1000</div>
                <div class="text">资产总额（万元）</div>
              </div>
              <div class="pay">
                <div class="number">23.4</div>
                <div class="text">代缴金额（万元）</div>
              </div>
              <div class="time">
                <div class="number">15</div>
                <div class="text">资产周期（天）</div>
              </div>
            </div>
            <div class="right">
              <svg width="150" height="150" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent"/>
                <circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent" :stroke-dasharray="dashArray"
                        :stroke-dashoffset="dashOffset"/>
              </svg>
              <div class="percent">58%</div>
            </div>
          </div>
          <div class="trade">
            <div class="title">交易记录</div>
            <table class="table table-striped table-hover">
              <thead>
              <tr>
                <th>资产编号</th>
                <th>订单号</th>
                <th>更新时间</th>
                <th>交易状态</th>
                <th>查看详情</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Bangalore</td>
                <td>Bangalore</td>
                <td>Bangalore</td>
                <td>Bangalore</td>
                <td><span class="text" data-toggle="modal" data-target="#myModal">查看</span></td>
              </tr>
              <tr>
                <td>Sachin</td>
                <td>Mumbai</td>
                <td>Bangalore</td>
                <td>Bangalore</td>
                <td><span class="text">查看</span></td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h4 class="modal-title text-center" id="myModalLabel">交易记录详情</h4>
                </div>
                <div class="modal-body">
                  ...
                </div>
                <div class="modal-footer" style="text-align:center">
                  <button type="button" class="btn btn-default" data-dismiss="modal">返回</button>
                </div>
              </div>
            </div>
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
      title: '资产详情',
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
        dashArray: Math.PI * 100
      }
    },
    computed: {
      dashOffset() {
        return (1 - 0.58) * this.dashArray
      }
    },
    methods: {
      showMode(){
        this.basicStatus=false;
        this.modeStatus=true;
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
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
  #body .procedure .top{
    padding:90px 0 50px;
    margin: 0 46px;
    display:flex;
    border-bottom:1px dotted #999999;
    justify-content: space-between;
  }
  #body .procedure .top .left{
    display:flex;
    align-items: center;
    border-right:1px solid #E1E1E1;
    height:130px;
    padding-right:23px;
  }
  #body .procedure .top .left img{
    width:126px;
    height:126px;
    margin-right:22px;
  }
  #body .procedure .top .left .content{
  }
  #body .procedure .top .left .content .title{
    margin-bottom:17px;
    font-size:18px;
    color:#000000;
  }
  #body .procedure .top .left .content .time{
    font-size:18px;
    color:#999999;
    margin-bottom:17px;
  }
  #body .procedure .top .left .content .product-id{
    font-size:16px;
    color:#1FB5AD;
  }
  #body .procedure .top .middle{
    display:flex;
    height:130px;
    align-items:center;
    padding: 0 30px;

  }
  #body .procedure .top .middle .amount{
    width:120px;
    height:60px;
    text-align:center;
    margin-right:30px;
  }
  #body .procedure .top .middle .amount .number{
    font-size:34px;
    color:#A9D86E;
  }
  #body .procedure .top .middle .amount .text{
    font-size:14px;
    color:#A9D86E
  }
  #body .procedure .top .middle .pay{
    width:120px;
    height:60px;
    text-align:center;
    margin-right:30px;
  }
  #body .procedure .top .middle .pay .number{
    font-size:34px;
    color:#FF5C5C;
  }
  #body .procedure .top .middle .pay .text{
    font-size:14px;
    color:#FF5C5C;
  }
  #body .procedure .top .middle .time{
    width:120px;
    height:60px;
    text-align:center;
    color:#F86B4F;
    font-size:34px;
  }
  #body .procedure .top .middle .time .text{
    font-size:14px;
  }
  #body .procedure .top .right{
    position: relative;
  }
  #body .procedure .top .right circle{
    stroke-width: 8px;
    transform-origin: center;
  }
  #body .procedure .top .right .progress-background{
    transform: scale(0.9);
    stroke: #999999;
  }
  #body .procedure .top .right .progress-bar{
    transform: scale(0.9) rotate(-90deg);
    stroke: #FA7252;
  }
  #body .procedure .top .right .percent{
    font-size:34px;
    color:#FA7252;
    position:absolute;
    top:50px;
    left:50px;
  }
  #body .trade{
    padding:38px 58px;
  }
  #body .trade .title{
    margin-bottom:41px;
    font-size:21px;
    color:#333333;
  }
  #body .trade .table thead{
    background:#1fb5ad;
    color:#ffffff;
  }
  #body .trade .table thead tr{

  }
  #body .trade .table thead tr th{
    height:53px;
    line-height:53px;
    text-align:center;
  }
  #body .trade .table tbody tr{

  }
  #body .trade .table tbody tr td{
    height:53px;
    line-height:53px;
    text-align:center;
    color:#666666;
  }
  #body .trade .table tbody tr .text{
    display:inline-block;
    width:52px;
    height:27px;
    border:1px solid #F86B4F;
    color:#F86B4F;
    line-height:2em;
    cursor:pointer;

  }
</style>
