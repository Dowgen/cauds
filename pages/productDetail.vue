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
              <img :src="baseUrl + '/cauds-exchange/assetImge/'+ product.assetLogo">
              <div class="content">
                <div class="title">{{product.assetName}}</div>
                <div class="time">资产周期：{{product.assetCycle}}</div>
                <div class="product-id">资产ID:
                  <span style="color:#222;margin:0 30px 0 10px;top:2px">***********</span>
                  <span class="check-id" @click="toggleIdShow">查看</span>
                </div>
              </div>
              <div class="show-id" v-show="idShow">资产ID: {{product.assetId}}</div>
            </div>
            <div class="middle">
              <div class="amount">
                <div class="number">{{product.assetSize/10000}}</div>
                <div class="text">资产总额（万元）</div>
              </div>
              <div class="pay">
                <div class="number">{{product.assetsPaid/10000}}</div>
                <div class="text">放贷金额（万元）</div>
              </div>
              <div class="time">
                <div class="number">{{product.assetRepayed/10000}}</div>
                <div class="text">还款金额（万元）</div>
              </div>
            </div>
            <div class="right">
              <svg width="150" height="150" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent"/>
                <circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent" :stroke-dasharray="dashArray"
                        :stroke-dashoffset="(1-product.assetsPaid/product.assetSize)*dashArray"/>
              </svg>
              <div class="percent">{{parseInt(product.assetsPaid/product.assetSize*100)}}%</div>
            </div>
          </div>
          <div class="trade">
            <div class="title">交易记录</div>
            <table class="table table-striped table-hover">
              <thead>
              <tr>
                <th>订单号</th>
                <th>放款金额</th>
                <th>更新时间</th>
                <th>交易状态</th>
                <th>查看详情</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in productDetail">
                <td>{{item.bankOrderId}}</td>
                <td>{{item.loanBalance}}</td>
                <td>
                  {{new Date(item.updateDate).toLocaleDateString()}}
                  {{new Date(item.updateDate).toLocaleTimeString()}}
                </td>
                <td>{{item.orderStatus}}</td>
                <td @click="save(index)"><span class="text" data-toggle="modal" data-target="#myModal">查看</span></td>
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
                  <div class="head">
                    <div class="name">字段名</div>
                    <div class="text">字段内容</div>
                  </div>
                  <div class="content">
                    <div class="detailBody">
                      <div class="name">资产名</div>
                      <div class="text">{{detail.assetName}}</div>
                    </div>
                    <div class="detailBody">
                      <div class="name">更新时间</div>
                      <div class="text">
                      {{new Date(detail.updateDate).toLocaleDateString()}}
                      {{new Date(detail.updateDate).toLocaleTimeString()}}
                      </div>
                    </div>
                    <div class="detailBody">
                      <div class="name">交易状态</div>
                      <div class="text">{{detail.orderStatus}}</div>
                    </div>
                    <div class="detailBody">
                      <div class="name">银行订单号</div>
                      <div class="text">{{detail.bankOrderId}}</div>
                    </div>
                    <div class="detailBody">
                      <div class="name">姓名</div>
                      <div class="text">{{detail.name}}</div>
                    </div><div class="detailBody">
                      <div class="name">手机号码</div>
                      <div class="text">{{detail.phone}}</div>
                    </div>
                    <div class="detailBody">
                      <div class="name">银行卡号</div>
                      <div class="text">{{detail.bankCardNo}}</div>
                    </div>
                    <div class="detailBody">
                      <div class="name">身份证号码</div>
                      <div class="text">{{detail.idCard}}</div>
                    </div>
                    <div class="detailBody">
                      <div class="name">银行流水号</div>
                      <div class="text">{{detail.bankFlowId}}</div>
                    </div>
                    <div class="detailBody">
                      <div class="name">是否老用户</div>
                      <div class="text">{{detail.oldCustomer}}</div>
                    </div>
                    <div class="detailBody">
                      <div class="name">累计借款次数</div>
                      <div class="text">{{detail.bankOrderId}}</div>
                    </div>
                    <div class="detailBody">
                      <div class="name">是否命中风险策略</div>
                      <div class="text">{{detail.hitRiskRule}}</div>
                    </div>
                    <div class="detailBody">
                      <div class="name">借款金额</div>
                      <div class="text">{{detail.loanBalance}}</div>
                    </div>
                    <div class="detailBody">
                      <div class="name">还款金额</div>
                      <div class="text">{{detail.repayBalance}}</div>
                    </div><div class="detailBody">
                    <div class="name">借款服务费</div>
                    <div class="text">{{detail.serviceFee}}</div>
                  </div>
                    <div class="detailBody">
                      <div class="name">借款期限</div>
                      <div class="text">{{detail.loanPeriod}}</div>
                    </div>
                    <div class="detailBody">
                      <div class="name">放款时间</div>
                      <div class="text">{{detail.borrowDate}}</div>
                    </div>
                    <div class="detailBody">
                      <div class="name">还款时间</div>
                      <div class="text">{{detail.repayDate}}</div>
                    </div>
                    <div class="detailBody">
                      <div class="name">当前还款状态</div>
                      <div class="text">{{detail.repayState}}</div>
                    </div>
                    <div class="detailBody">
                      <div class="name">逾期天数</div>
                      <div class="text">{{detail.overdue}}</div>
                    </div>
                    <div class="detailBody">
                      <div class="name">逾期罚息</div>
                      <div class="text">{{detail.penalizeInt}}</div>
                    </div>
                    <div class="detailBody">
                      <div class="name">累计逾期次数</div>
                      <div class="text">{{detail.overdueCount}}</div>
                    </div>
                    <div class="detailBody">
                      <div class="name">芝麻评分</div>
                      <div class="text">{{detail.zhimaScore}}</div>
                    </div>
                  </div>
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
  import axios from '~/plugins/axios'
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
        userType:'',
        idShow:false,
        basicStatus:true,
        modeStatus:false,
        apiAdress:false,
        picked: '',
        dashArray: Math.PI * 100,
        product:{},
        token:'',
        productDetail:[],
        detail:{},
        baseUrl: '',
        localStorage: ''
      }
    },
    created(){
      if(process.browser) {
        this.localStorage = localStorage;
        this.userType = localStorage.userType;
      }
      this.baseUrl = axios.defaults.baseURL;
    },
    computed: {
      dashOffset() {
        return (1 - 0.58) * this.dashArray
      }
    },
    mounted(){
      if(process.browser){
        $('#myScrollspy').height( $(document).height() - 80);
        this.product=JSON.parse(sessionStorage.product);
        console.log(this.product);
        this.getAssetDetail();
        /*this.getToken();*/
      }
    },
    methods: {
      toggleIdShow(){
        if(this.idShow) {
          this.idShow = false;
          $('.check-id').html('查看')
        }else {
          this.idShow = true;
          $('.check-id').html('收起')
        }
      },
      showMode(){
        this.basicStatus=false;
        this.modeStatus=true;
      },
      save(index){
        this.detail=this.productDetail[index];
        console.log(this.detail)
      },
      getAssetDetail(){
        var that=this;
        axios({
          method:'get',
          url:"/cauds-exchange/loanOrder/assetId?assetId="+that.product.assetId,
          headers: {
            Authorization: 'Bearer ' + that.localStorage.token,
            Accept:'application/json'
          },
          data: {
          },
        })
        .then( res=> {
            that.productDetail=res.data;
        })
        .catch( err=> {
          window.location.href = '/login'
        });
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  #myScrollspy{
    height:150vh;
  }
  .row{
    background:#f2f2f2;
    height:150vh;
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
  .title-box>img{
    cursor:pointer
  }
  #body .procedure{
    width:98%;
    height:130vh;
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
  .left{
    position:relative;
    display:flex;
    align-items: center;
    border-right:1px solid #E1E1E1;
    height:130px;
    padding-right:23px;
  }
  .left img{
    width:126px;
    height:126px;
    border-radius 30px
  }
  .left .content{
    margin-left 26px
    width 180px
    color #999
  }
  .left .content .title{
    margin-bottom:17px;
    font-size:18px;
    color:#000000;
  }
  .left .content .time{
    font-size:18px;
    color:#999999;
    margin-bottom:17px;
  }
  .check-id{
    color:#1fb5ad;
    font-size:14px;
    cursor:pointer;
  }
  .show-id{
    position: absolute;
    bottom: -75px;
    width: 100%;
    text-align: center;
    border: solid 1px #1fb5ad;
    border-radius: 14px 14px 0 0;
    border-bottom: none;
    font-size: 15px;
    color: #1fb5ad;
    height: 25px;
    line-height: 25px;
  }
  .middle{
    display:flex;
    height:130px;
    align-items:center;
    padding: 0 30px;
  }
  .middle .amount{
    width:120px;
    height:80px;
    text-align:center;
    margin-right:30px;
  }
  .middle .amount .number{
    font-size:34px;
    color:#A9D86E;
  }
  .middle .amount .text{
    font-size:14px;
    color:#A9D86E
  }
  .middle .pay{
    width:120px;
    height:80px;
    text-align:center;
    margin-right:30px;
  }
  .middle .pay .number{
    font-size:34px;
    color:#fcb01f;
  }
  .middle .pay .text{
    font-size:14px;
    color:#fcb01f;
  }
  .middle .time{
    width:120px;
    height:80px;
    text-align:center;
    color:#F86B4F;
    font-size:34px;
  }
  .middle .time .text{
    font-size:14px;
  }
  .right{
    position: relative;
  }
  .right circle{
    stroke-width: 8px;
    transform-origin: center;
  }
  .right .progress-background{
    transform: scale(0.9);
    stroke: #999999;
  }
  .right .progress-bar{
    transform: scale(0.9) rotate(-90deg);
    stroke: #FA7252;
  }
  .right .percent{
    font-size:34px;
    color:#FA7252;
    position:absolute;
    top:50px;
    left:0;
    right:0;
    text-align:center;
  }
  #body .trade{
    padding:38px 58px;
  }
  .trade .title{
    margin-bottom:41px;
    font-size:21px;
    color:#333333;
  }
  .table thead{
    background:#1fb5ad;
    color:#ffffff;
  }
  .table thead tr{

  }
  .table thead tr th{
    height:53px;
    line-height:53px;
    text-align:center;
  }
  .table tbody tr{

  }
  .table tbody tr td{
    height:53px;
    line-height:53px;
    text-align:center;
    color:#666666;
  }
  .table tbody tr .text{
    display:inline-block;
    width:52px;
    height:27px;
    border:1px solid #F86B4F;
    color:#F86B4F;
    line-height:2em;
    cursor:pointer;
  }
  .modal-body .head{
    display flex
    height 65px
    background #1fb5ad
    border-radius 4px
    align-items center
    font-size 16px
    color #ffffff
    text-align center
  }
  .modal-body .head .name{
    flex 1
  }
  .modal-body .head .text{
    flex 3
  }
  .modal-body .content{
    height 400px
    overflow-y auto
    overflow-x hidden
  }
  .modal-body .detailBody{
    display flex
    height 65px
    border-radius 4px
    align-items center
    font-size 12px
    text-align center
  }
  .modal-body .detailBody .name{
    color #666666;
    flex 1
    border 1px solid #E1E1E1;
    border-top none
    height 65px
    box-sizing border-box
    line-height 65px
  }
  .modal-body .detailBody .text{
    color #333333
    flex 3
    border-bottom 1px solid #E1E1E1
    border-right 1px solid #E1E1E1
    height 65px
    box-sizing border-box
    line-height 65px
  }
</style>
