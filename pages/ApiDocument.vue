<template>
  <section class="cont">
    <hd/>
    <div class="row" v-cloak>
      <div id="nav-left" class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
        <div class="container" style="margin:0;padding:0">
          <nav class="col-sm-2" id="myScrollspy">
            <ul class="nav nav-pills nav-stacked">
              <li>
                <a href="javascript:void(0);">资金端</a>
              </li>
              <li>
                <a href="javascript:void(0);" class="navClicked">基本信息</a>
              </li>
              <li>
                <a href="javascript:void(0);">资产端</a>
              </li>
            </ul>
          </nav>
          <div class="clearfix">
          </div>
        </div>
      </div>

      <div id="body" class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
        <h1>短信接入指引</h1>
        <hr>
        <h2>接口概述(接口限制规则)</h2>
        <ol class="overview">
          <li>用户对接炬合接口，需要通过炬合验证。通过获取访问凭证接口获取access_token。</li>
          <li>access_token如若过期，用户需要再次通过接口重新获取。</li>
          <li>炬合接口Header设置如下：
  参数：Authorization
  数据：Bearer + “用户获取到的access token”。如：Bearer fc7ff19f-00ea-4b55-971e-4d21c4ebaa21</li>
          <li>获取访问凭证接口的帐号密码需要联系炬合获取。</li>
        </ol>
        <h2>资产信息-资产状态查询资产信息(资产方)</h2>
        <h3>请求说明</h3>
        <div class="content-s hasBack">
          <p>Get  http://192.168.1.158:8060/cauds-exchange/loanOrder/orderStatus?orderStatus=“资产状态标签”</p>
          <p>Content-Type: application/json</p>
        </div>
        <p class="content-s">请求中Headers的设置请参考接口概述</p>
        <h3>接口描述</h3>
        <p class="content-s">资产方通过资产状态标签查询资产信息。</p>
        <h3>参数说明</h3>
        <table class="content-s">
          <thead>
            <tr>
              <th>资产状态标签</th>
              <th>参数说明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0</td>
              <td>默认为0，资产金额未满，可用</td>
            </tr>
            <tr>
              <td>1</td>
              <td>资产金额满，可用</td>
            </tr>
            <tr>
              <td>2</td>
              <td>资产金额满，不可用</td>
            </tr>
          </tbody>
        </table>
        <h3>请求示例</h3>

        <h3>返回说明</h3>
        <p class="content-s">http 响应:json<br>
          发送成功则返回相关信息。</p>
        <div class="content-s hasBack">
          {
            [
             <p>"loanOrderId": "babalaba",</p>
             <p>"assetId": "7432c256bc86461fad32f9383d035251",</p>
             <p>"assetName": "juhe0001",</p>
             <p>"name": "徐*忠",</p>
             <p>"phone": "133****1159",</p>
             <p>"idCard": null,</p>
             <p>"bankCardNo": null,</p>
             <p>"bankOrderId": "sssssbankOrderId",</p>
             <p>"bankFlowId": null,</p>
             <p>"oldCustomer": null,</p>
             <p>"loanCount": null,</p>
             <p>"hitRiskRule": null,</p>
             <p>"loanBalance": 2000,</p>
             <p>"repayBalance": null,</p>
             <p>"serviceFee": null,</p>
             <p>"loanPeriod": null,</p>
             <p>"borrowDate": 1496016000000,</p>
             <p>"repayDate": null,</p>
             <p>"repayState": null,</p>
             <p>"overdue": null,</p>
             <p>"penalizeInt": 12.38,</p>
             <p>"overdueCount": null,</p>
             <p>"zhimaScore": 599,</p>
             <p>"orderStatus": 0,</p>
             <p>"updateDate": 1502454145445,</p>
             <p>"createDate": 1502454145445</p>
            ]
          }
        </div>
        <h3>请求失败示例</h3>
        <div class="content-s hasBack">
        {
          <p>"timestamp": 1502454514510,</p>
          <p>"status": 400,</p>
          <p>"error": "Bad Request",</p>
          <p>"exception": "org.springframework.web.bind.</p>MissingServletRequestParameterException",
          <p>"message": "Required Integer parameter 'orderStatus' is not </p>present",
          <p>"path": "/loanOrder/orderStatus"</p>
        }
        </div>



        <h2>资产信息-创建借款客户(资产方)</h2>
        <h3>请求说明</h3>
        <div class="content-s hasBack">
          <p>Post  http://192.168.1.158:8060/cauds-exchange/loanOrder/create</p>
          <p>Content-Type: application/json</p>
        </div>
        <p class="content-s">请求中Headers的设置请参考接口概述</p>
        <h3>接口描述</h3>
        <p class="content-s">资产方创建借款用户。</p>
        <h3>参数说明</h3>
        <table class="content-s">
          <thead>
            <tr>
              <th>参数</th>
              <th>类型</th>
              <th>必须</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
            <td>loanOrderId </td>
            <td>String  </td>
            <td>是</td>
            <td>借款订单id</td>
            </tr>
            <tr>
            <td>assetId </td>
            <td>String  </td>
            <td>是</td>
            <td>资产id(由炬合提供)</td>
            </tr>
            <tr>
            <td>assetName </td>
            <td>String  </td>
            <td>是</td>
            <td>资产name(由炬合提供)</td>
            </tr>
            <tr>
            <td>name  </td>
            <td>String  </td>
            <td>否</td>
            <td>姓名</td>
            </tr>
            <tr>
            <td>phone </td>
            <td>String  </td>
            <td>否</td>
            <td>手机号码</td>
            </tr>
            <tr>
            <td>idCard  </td>
            <td>String  </td>
            <td>否</td>
            <td>身份证号码</td>
            </tr>
            <tr>
            <td>bankCardNo  </td>
            <td>String  </td>
            <td>否</td>
            <td>银行卡号</td>
            </tr>
            <tr>
            <td>bankOrderId </td>
            <td>String  </td>
            <td>否</td>
            <td>银行订单号</td>
            </tr>
            <tr>
            <td>bankFlowId  </td>
            <td>String  </td>
            <td>否</td>
            <td>银行流水号</td>
            </tr>
            <tr>
            <td>oldCustomer </td>
            <td>String  </td>
            <td>否</td>
            <td>是否老用户</td>
            </tr>
            <tr>
            <td>loanCount </td>
            <td>String  </td>
            <td>否</td>
            <td>累计借款次数</td>
            </tr>
            <tr>
            <td>hitRiskRule </td>
            <td>String  </td>
            <td>否</td>
            <td>是否命中风险策略</td>
            </tr>
            <tr>
            <td>loanBalance </td>
            <td>Integer </td>
            <td>否</td>
            <td>借款金额</td>
            </tr>
            <tr>
            <td>repayBalance  </td>
            <td>Integer </td>
            <td>否</td>
            <td>还款金额</td>
            </tr>
            <tr>
            <td>serviceFee  </td>
            <td>Double  </td>
            <td>否</td>
            <td>借款服务费</td>
            </tr>
            <tr>
            <td>loanPeriod  </td>
            <td>Integer </td>
            <td>否</td>
            <td>借款期限</td>
            </tr>
            <tr>
            <td>borrowDate </td>
            <td> Date  </td>
            <td>否</td>
            <td>放款时间</td>
            </tr>
            <tr>
            <td>repayDate</td>
            <td> Date  </td>
            <td>否</td>
            <td>还款时间</td>
            </tr>
            <tr>
            <td>repayState  </td>
            <td>String  </td>
            <td>否</td>
            <td>当前还款状态</td>
            </tr>
            <tr>
            <td>overdue </td>
            <td>Integer </td>
            <td>否</td>
            <td>逾期天数</td>
            </tr>
            <tr>
            <td>penalizeInt </td>
            <td>Double  </td>
            <td>否</td>
            <td>逾期罚息</td>
            </tr>
            <tr>
            <td>overdueCount  </td>
            <td>Integer </td>
            <td>否</td>
            <td>累计逾期次数</td>
            </tr>
            <tr>
            <td>zhimaScore  </td>
            <td>Integer </td>
            <td>否</td>
            <td>芝麻评分</td>
            </tr>
            <tr>
            <td>orderStatus </td>
            <td>Integer </td>
            <td>否</td>
            <td>订单状态</td>
            </tr>
            <tr>
            <td>createDate </td>
            <td> Date  </td>
            <td>否</td>
            <td>创建时间</td>
            </tr>
            <tr>
            <td>updateDate </td>
            <td> Date  </td>
            <td>否</td>
            <td>更新时间</td>
            </tr>
          </tbody>
        </table>
        <h3>请求示例</h3>

        <h3>返回说明</h3>
        <p class="content-s">http 响应:json<br>
          发送成功则返回相关信息。</p>
        <div class="content-s hasBack">
          {
            <p>"loanOrderId": "借款订单id",</p>
            <p>"assetId": "49b1a89b3564471f88958e55e07d47fc",</p>
            <p>"assetName": "资产包名称",</p>
            <p>"name": "xiazhe001",</p>
            <p>"phone": "12367238493",</p>
            <p>"idCard": "330825199201223533",</p>
            <p>"bankCardNo": "323243",</p>
            <p>"bankOrderId": "203938323344332234",</p>
            <p>"bankFlowId": null,</p>
            <p>"oldCustomer": null,</p>
            <p>"loanCount": null,</p>
            <p>"hitRiskRule": null,</p>
            <p>"loanBalance": null,</p>
            <p>"repayBalance": null,</p>
            <p>"serviceFee": null,</p>
            <p>"loanPeriod": null,</p>
            <p>"borrowDate": null,</p>
            <p>"repayDate": null,</p>
            <p>"repayState": null,</p>
            <p>"overdue": null,</p>
            <p>"penalizeInt": null,</p>
            <p>"overdueCount": null,</p>
            <p>"zhimaScore": null,</p>
            <p>"orderStatus": null,</p>
            <p>"updateDate": null,</p>
            <p>"createDate": null</p>
          }
        </div>
        <h3>请求失败示例</h3>
        <div class="content-s hasBack">
        {
          <p>"timestamp": 1502452118562,</p>
          <p>"status": 500,</p>
          <p>"error": "Internal Server Error",</p>
          <p>"exception": "java.lang.IllegalArgumentException",</p>
          <p>"message": "customerOrder already exists: 借款订单id",</p>
          <p>"path": "/loanOrder/create"</p>
        }
        </div>



        <h2>资产信息-更新借款客户(资产方和资金方)</h2>
        <h3>请求说明</h3>
        <div class="content-s hasBack">
          <p>Post  http://192.168.1.158:8060/cauds-exchange/loanOrder/update</p>
          <p>Content-Type: application/json</p>
        </div>
        <p class="content-s">请求中Headers的设置请参考接口概述</p>
        <h3>接口描述</h3>
        <p class="content-s">资产方和资金方更新借款客户。</p>
        <h3>参数说明</h3>
        <table class="content-s">
          <thead>
            <tr>
              <th>参数</th>
              <th>类型</th>
              <th>必须</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
            <td>loanOrderId </td>
            <td>String  </td>
            <td>是<td>
            <td> 借款订单id</td>
            </tr>
            <tr>
            <td>assetId </td>
            <td>String  </td>
            <td>是<td>
            <td> 资产id(由炬合提供)</td>
            </tr>
            <tr>
            <td>assetName </td>
            <td>String  </td>
            <td>是<td>
            <td> 资产name(由炬合提供)</td>
            </tr>
            <tr>
            <td>name  </td>
            <td>String  </td>
            <td>否<td>
            <td> 姓名</td>
            </tr>
            <tr>
            <td>phone </td>
            <td>String  </td>
            <td>否<td>
            <td> 手机号码</td>
            </tr>
            <tr>
            <td>idCard  </td>
            <td>String  </td>
            <td>否<td>
            <td> 身份证号码</td>
            </tr>
            <tr>
            <td>bankCardNo  </td>
            <td>String  </td>
            <td>否<td>
            <td> 银行卡号</td>
            </tr>
            <tr>
            <td>bankOrderId </td>
            <td>String  </td>
            <td>否<td>
            <td> 银行订单号</td>
            </tr>
            <tr>
            <td>bankFlowId  </td>
            <td>String  </td>
            <td>否<td>
            <td> 银行流水号</td>
            </tr>
            <tr>
            <td>oldCustomer </td>
            <td>String  </td>
            <td>否<td>
            <td> 是否老用户</td>
            </tr>
            <tr>
            <td>loanCount </td>
            <td>String  </td>
            <td>否<td>
            <td> 累计借款次数</td>
            </tr>
            <tr>
            <td>hitRiskRule </td>
            <td>String  </td>
            <td>否<td>
            <td> 是否命中风险策略</td>
            </tr>
            <tr>
            <td>loanBalance </td>
            <td>Integer </td>
            <td>否<td>
            <td> 借款金额</td>
            </tr>
            <tr>
            <td>repayBalance  </td>
            <td>Integer </td>
            <td>否<td>
            <td> 还款金额</td>
            </tr>
            <tr>
            <td>serviceFee  </td>
            <td>Double  </td>
            <td>否<td>
            <td> 借款服务费</td>
            </tr>
            <tr>
            <td>loanPeriod  </td>
            <td>Integer </td>
            <td>否<td>
            <td> 借款期限</td>
            </tr>
            <tr>
            <td>borrowDate  </td>
            <td>Date  </td>
            <td>否<td>
            <td> 放款时间</td>
            </tr>
            <tr>
            <td>repayDate </td>
            <td>Date  </td>
            <td>否<td>
            <td> 还款时间</td>
            </tr>
            <tr>
            <td>repayState  </td>
            <td>String  </td>
            <td>否<td>
            <td> 当前还款状态</td>
            </tr>
            <tr>
            <td>overdue </td>
            <td>Integer </td>
            <td>否<td>
            <td> 逾期天数</td>
            </tr>
            <tr>
            <td>penalizeInt </td>
            <td>Double  </td>
            <td>否<td>
            <td> 逾期罚息</td>
            </tr>
            <tr>
            <td>overdueCount  </td>
            <td>Integer </td>
            <td>否<td>
            <td> 累计逾期次数</td>
            </tr>
            <tr>
            <td>zhimaScore  </td>
            <td>Integer </td>
            <td>否<td>
            <td> 芝麻评分</td>
            </tr>
            <tr>
            <td>orderStatus </td>
            <td>Integer </td>
            <td>否<td>
            <td> 订单状态</td>
            </tr>
            <tr>
            <td>createDate  </td>
            <td>Date  </td>
            <td>否<td>
            <td> 创建时间</td>
            </tr>
            <tr>
            <td>updateDate  </td>
            <td>Date  </td>
            <td>否<td>
            <td> 更新时间</td>
            </tr>
          </tbody>
        </table>
        <h3>请求示例</h3>

        <h3>返回说明</h3>
        <p class="content-s">http 响应:json<br>
          发送成功则返回相关信息。</p>
        <div class="content-s hasBack">
          {
            <p>"loanOrderId": "借款订单id",</p>
            <p>"assetId": "49b1a89b3564471f88958e55e07d47fc",</p>
            <p>"assetName": "资产包名称",</p>
            <p>"name": "xiazhe001",</p>
            <p>"phone": "12367238493",</p>
            <p>"idCard": "330825199201223533",</p>
            <p>"bankCardNo": "323243",</p>
            <p>"bankOrderId": "203938323344332234",</p>
            <p>"bankFlowId": null,</p>
            <p>"oldCustomer": null,</p>
            <p>"loanCount": null,</p>
            <p>"hitRiskRule": null,</p>
            <p>"loanBalance": null,</p>
            <p>"repayBalance": null,</p>
            <p>"serviceFee": null,</p>
            <p>"loanPeriod": null,</p>
            <p>"borrowDate": null,</p>
            <p>"repayDate": null,</p>
            <p>"repayState": null,</p>
            <p>"overdue": null,</p>
            <p>"penalizeInt": null,</p>
            <p>"overdueCount": null,</p>
            <p>"zhimaScore": null,</p>
            <p>"orderStatus": 0,</p>
            <p>"updateDate": null,</p>
            <p>"createDate": null</p>
          }
        </div>
        <h3>请求失败示例</h3>
        <div class="content-s hasBack">
        {
          <p>"timestamp": 1502452553919,</p>
          <p>"status": 500,</p>
          <p>"error": "Internal Server Error",</p>
          <p>"exception": "java.lang.IllegalArgumentException",</p>
          <p>"message": "can't find orderId with name 借款订单d",</p>
          <p>"path": "/loanOrder/update"</p>
        }
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
      title: '资产列表',
      script: [
        { src: 'js/jQuery.min.js' },
        { src: 'js/layer.js' },
        { src: 'js/bootstrap.min.js' }
      ]
    },
    data () {
      return {
        token:''
      }
    },
    mounted: function () {
      if(process.browser)
        $('#myScrollspy').height( $(document).height() - 80);
    },
    methods: {
      
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  #body
    font-size 16px
    line-height 26px
    padding-bottom 50px
  h1
    font-size 30px
    margin-top  20px
  h2 
    font-size 25px
    margin-top 38px
    margin-bottom 14px
    color #1fb5ad
  h3
    font-size 20px
    margin-top 20px
    margin-bottom 18px
  ol
    margin-top 20px
    color #666
  p
    margin  10px 0
    color #666
  #myScrollspy
    height 900vh
  table,th,tr,td
    border 1px solid #E1E1E1
    text-align center
    padding 10px 20px
    font-size 14px
    color #666
  .content-s
    margin-left 20px
  .hasBack
    background #f1f7f7
    border-radius 8px
    border solid 1px #e1e6e6
    padding 20px
    width 70%
</style>
