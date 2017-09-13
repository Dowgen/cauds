<template>
	<div id="example-1" v-cloak>
        <div class="header-wrapper">
           <div class="header">
               <img src="img/zhuye/logo.png">
               <div class="nav">
                   <div class="item"><a href="#section2-wrapper">解决方案</a></div>
                   <div class="item"><a href="#section3-wrapper">业务流程</a></div>
                   <div class="item"><a href="#section4-wrapper">系统服务</a></div>
                   <div class="item"><a href="#section5-wrapper">技术支持</a></div>
                   <div class="item"><a href="/login">登录</a></div>
                   <!-- <div class="item" v-if="!isLogin" onclick="location.href='${pageContext.request.contextPath}/w/creditUser/request/homepage'">登录</div>
                   <div class="item" v-else>
                       headerDropDown
                   </div> -->
               </div>
           </div>
        </div>
        <div class="section1-wrapper">
            <div class="section1">
                <div class="content">
                  <div class="img-wrap">
                   <div @mouseover="sec11=2" @mouseleave="sec11=1">
                     <img src="img/zhuye/sec11.png" v-show="sec11==1">
                     <div class="img-wrap-text" v-show="sec11==2">
                       <h3>便捷</h3>
                       <i></i>
                       <p>通过CAUDS系统后台，接驳多类型多平台资产，为资金方提供多种可行性解决方案</p>
                     </div>
                   </div>
                   <div @mouseover="sec12=2" @mouseleave="sec12=1">
                     <img src="img/zhuye/sec12.png" v-show="sec12==1">
                     <div class="img-wrap-text" v-show="sec12==2">
                       <h3>高效</h3>
                       <i></i>
                       <p>接口集成与个性化并存，提高资金方平台对接资产方灵活度，缩短系统对接的开发工期</p>
                     </div>
                   </div>
                   <div @mouseover="sec13=2" @mouseleave="sec13=1">
                     <img src="img/zhuye/sec13.png" v-show="sec13==1">
                     <div class="img-wrap-text" v-show="sec13==2">
                       <h3>安全</h3>
                       <i></i>
                       <p>FinBridge处于资金与资产平台中间方，只做数据信息交换的中间渠道，不参与业务处理。利用电子存证、区块链技术为数据安全提供保障。</p>
                     </div>
                   </div>
                   <div @mouseover="sec14=2" @mouseleave="sec14=1">
                     <img src="img/zhuye/sec14.png" v-show="sec14==1">
                     <div class="img-wrap-text" v-show="sec14==2">
                       <h3>全面</h3>
                       <i></i>
                       <p>支持网贷平台、消费分期、车贷等丰富的互联网模式。</p>
                     </div>
                   </div>
                  </div>
                </div>
            </div>
        </div>
        <a id="section2-wrapper"></a>
        <div class="section2-wrapper">
            <div class="section2">
                <div class="title">解决资金困难</div>
                <div class="desc">Solution</div>
                <div class="content">
                  <img src="img/zhuye/lackMoney.png">
                  <div>
                    <p>金融监管方案</p>
                    <p>稳健中性的货币政策</p>
                    <p>货币流动性降低</p>
                    <p>央行缩表</p>
                  </div>
                  <img src="img/zhuye/lackMoney2.png">
                </div>
            </div>
        </div>
        <a id="section3-wrapper"></a>
        <div class="section3-wrapper">
            <div class="section3">
                <h1 class="title">完善 业务机制流程</h1>
                <div class="desc">Optimize</div>
                
                <div class="content">
                  <img src="img/zhuye/section3.png">
                  <p>采用<span style="color:#1abc9c">穿透模式</span>完成资产端到资金端的资产传输完全合规合法</p>
                    <!-- <div class="nav">
                        <div class="item" :class="{'current':currentIndex==1}">数据方案</div>
                        <div class="item" :class="{'current':currentIndex==2}">系统方案</div>
                        <div class="item" :class="{'current':currentIndex==3}">风控方案</div>
                    </div>
                    <div class="item-box" v-if="currentIndex==1" style="width:100%;height:400px;">
                      <img src="img/index/planData.png" style="width:100%;height:auto;">
                    </div>
                    <div class="item-box" v-if="currentIndex==2" style="width:100%;height:400px;">
                      <img src="img/index/planSys.png" style="width:85%;height:auto;">
                    </div>
                    <div class="item-box" v-if="currentIndex==3" style="width:100%;height:400px;">
                      <img src="img/index/planRisk.png" style="width:95%;height:auto;">
                    </div> -->
                </div>
            </div>
        </div>
        <a id="section4-wrapper"></a>
        <div class="section4-wrapper">
            <div class="section4">
                <h1 class="title">系统 让你一目了然</h1>
                <div class="desc">System</div>
                <div class="img-wrapper-con">
                <div class="img-wrapper">
                    <img class=" img-responsive" src="img/zhuye/sec41.png">
                    <div class="shade">
                       <img src="img/zhuye/sec411.png">
                       <h3>资产端管理</h3>
                       <i></i>
                       <p>商户信息，FinBrindge商户平台信息管理，包括FinBridge商户号、名称、标识、公司、IP白名单等</p>
                       <p>数据源信息，FinBridge商户与银行存管对接信息管理</p>
                     </div>
                 </div>
                <div class="img-wrapper">
                    <img class=" img-responsive" src="img/zhuye/sec42.png">
                    <div class="shade">
                       <img src="img/zhuye/sec422.png">
                       <h3>消息管理</h3>
                       <i></i>
                       <p>消息管理 消息模版的编辑、保存、添加等</p>
                       <p>消息推送 FinBridge向资产端推送系统</p>
                     </div>
                </div>
                <div class="img-wrapper">
                    <img class=" img-responsive" src="img/zhuye/sec43.png">
                    <div class="shade">
                       <img src="img/zhuye/sec411.png">
                       <h3>订单管理</h3>
                       <i></i>
                       <p>请求订单 FinBridge向资产端商户请求订单记录，包括FinBridge商户号、订单号、业务数据包、接口标识等</p>
                       <p>推送订单 FinBridge向资金端商户推送订单记录，包括FinBridge商户号、订单号、业务数据包、推送时间等</p>
                     </div>
                </div>
                </div>
                <div class="img-wrapper-con">
                  <div class="img-wrapper">
                    <img class=" img-responsive" src="img/zhuye/sec44.png">
                    <div class="shade">
                       <img src="img/zhuye/sec411.png">
                       <h3>系统管理</h3>
                       <i></i>
                       <p>参数配置 角色管理</p>
                       <p>管理员信息 菜单管理</p>
                     </div>
                   </div>
                  <div class="img-wrapper">
                    <img class=" img-responsive" src="img/zhuye/sec45.png">
                    <div class="shade">
                       <img src="img/zhuye/sec411.png">
                       <h3>数据安全</h3>
                       <i></i>
                       <p>数据凭证 数据校验</p>
                     </div>
                   </div>
                  <div class="img-wrapper">
                    <img class=" img-responsive" src="img/zhuye/sec46.png">
                    <div class="shade">
                       <img src="img/zhuye/sec411.png">
                       <h3>业务对账</h3>
                       <i></i>
                       <p>对账 账单明细 账单导出</p>
                     </div>
                   </div>
                </div> 
            </div>
        </div>
        <a id="section5-wrapper"></a>
        <div class="section5-wrapper">
            <div class="section5">
              <h1 class="title">丰富 服务技术支持</h1>
              <div class="desc">Support</div>
              <div class="nav">
                <div :class="{'current':currentIndex==1}" @click="currentIndex=1">
                技术支持</div>
                <div :class="{'current':currentIndex==2}" @click="currentIndex=2">服务支持</div>
              </div>
              <div class="nav-content">
                <div v-show="currentIndex==1">
                  <div>突发处理</div>
                  <div>专人维护</div>
                  <div>产品培训</div>
                  <div>运行监控</div>
                  <div>安全监护</div>
                  <div>漏洞预警</div>
                  <div>SSL认证</div>
                </div>
                <div v-show="currentIndex==2">
                  <div>安全监护</div>
                  <div>漏洞预警</div>
                  <div>SSL认证</div>
                </div>
              </div>
            </div>
        </div>
        <div class="foot-wrapper">
            <div class="foot">
                <div class="left">
                    <!-- <div class="title">联系我们</div> -->
                    <div class="text">服务热线：0571-28065755</div>
                    <div class="text">周一至周五 09:00-18:00</div>
                    <div class="text">杭州市拱墅区祥茂路16号威格科技园D幢3层</div>

                    <div class="text" style="margin-top:30px;">Copyringt &nbsp 2011-2016 &nbsp 杭州炬合网络科技有限公司 &nbsp All Rights Reserved &nbsp浙ICP备12032537号-2</div>
                </div>
                <div class="right">
                    <img src="img/index/wechat.png">
                    <div class="text">官方微信</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript">
import axios from '~/plugins/axios'
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
  head: {
    title: '登录',
    script: [
      {src: 'js/jQuery.min.js'},
      {src: 'js/layer.js'},
      {src: 'js/bootstrap.min.js'}
    ]
  },
  created () {
    
  },
  data () {
    return {
      sec11:1,
      sec12:1,
      sec13:1,
      sec14:1,
      currentIndex:1
    }
  },
  methods: {
  }
}
</script>
<style scoped>
.dropdown, .dropup {
    top: 9px;
}
.dropdown>button{
  color:white;
  background:#28282e;
  border:none;
  outline:none;
  font-size: 16px;
}
.dropdown-menu{
  background:#222;
}
.dropdown-menu>li>a{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    -webkit-box-pack: start;
        -ms-flex-pack: start;
            justify-content: flex-start;
    height: 45px;
    margin: 0;
    font-size:15px;
    color:#95A0AA;
}
.dropdown-menu>li>a:hover{
  background:
}
.dropdown-menu>li>a>img{
  margin-right:20px;
}
    
.header-wrapper{
    width: 100%;
    min-width: 1226px;
    height: 50px;
    background: #28282e;
    color: #ffffff;
    position: fixed;
    z-index: 9999;
}
.header-wrapper .header{
    width: 1226px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.header-wrapper .header .nav{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: end;
        -ms-flex-pack: end;
            justify-content: flex-end;
    line-height: 50px;
}
.header-wrapper .header .nav .item{
    margin-right: 80px;
}
.header-wrapper .header .nav .item:hover{
    cursor: pointer;
    color: #219a94;
}
.header .nav a{
  color: white;
  text-decoration:none;
}
.section1-wrapper{
    width: 100%;
    height: 800px;
    background: #0f1315;
    min-width: 1226px;
}
.section1-wrapper .section1{
    position: relative;
    height: 100%;
    background: url("/img/zhuye/back_head.png") no-repeat;
    background-size: 100% 100%;
    margin: 0 auto;
}
.section1 .content{
  width: 100%;
  position: absolute;
  bottom: -50px;
}
.section1 .content .img-wrap{
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    text-align: center;
    cursor: pointer;
}
.section1 .img-wrap-text{
  width: 238px;
  height: 238px;
  background: #F0F0F0;
  overflow: hidden;
  padding: 0 20px;
}
.img-wrap-text h3{
  font-size: 18px;
  color: #1abc9c;
  margin-top: 55px;
}
.img-wrap-text i::after{
  content:"";
  display: block;
  color: #1abc9c;
  width: 24px;
  height: 4px;
  margin: 0 auto;
  margin-bottom: 23px;
  background: #1abc9c;
}
.img-wrap-text p{
  color: #646464;
  font-size: 12px;
}
.section1 .content .title{
  font-family: 'myFont';
    font-size: 48px;
    margin-bottom: 20px;
}
.section1 .content .desc{
    font-size: 24px;
    color: #1FB5AD;
    margin-bottom: 50px;
}
.section1 .content .query{
    width: 126px;
    height: 36px;
    margin: 0 auto;
    line-height: 36px;
    font-size: 15px;
    color: #FEFEFE;
    border: #1FB5AD 1px solid;
    border-radius: 10px;
}
.section1 .content .query:hover{
    width: 136px;
    height: 46px;
    line-height: 46px;
    font-size: 18px;
    cursor: pointer;
}
.section2-wrapper{
    width: 100%;
    height: 550px;
}
.section2{
    margin: 0 auto;
    height: 100%;
    text-align: center;
}
.section2 .title,.section3 .title,.section4 .title,.section5 .title{
  font-family: 'myFont';
    padding-top: 55px;
    font-size: 24px;
    color: #646464;
    margin-bottom: 22px;
}
.section2 .title{
  margin-top: 50px;
}
.section2 .desc, .section3 .desc, .section4 .desc,.section5 .desc{
    font-size: 28px;
    color: #c8c8c8;
    margin-bottom: 70px;
    position: relative;
}
.section2 .desc::after{
  position: absolute;
  display: block;
  bottom: -12px;
  left:49.1%;
  content:"1";
  width: 24px;
  height: 4px;
  background-color:#1abc9c;
  color: white;
}
.section2 .content{
    display:  -webkit-box;
    display:  -ms-flexbox;
    display:  flex;
    background: url("/img/zhuye/back_green.png") no-repeat;
    background-size: 100% 100%;
    height: 350px;
    justify-content: center;
    align-items: center;
}
.section2 .content>div{
  margin:0 50px;
  color: white;
  font-size: 18px;
}
.section2 .content>div>p{
  margin:25px 0;
}
.section2 .content .item{
    -webkit-box-flex: 1;
        -ms-flex: 1;
            flex: 1;
}
.section2 .content .item .img-wrapper{
    margin-bottom: 30px;
}
.section2 .content .item .desc{
    margin-bottom: 10px;
    font-size: 14px;
    color: #5A5A5A;
}
.section2 .content .item .text{
    font-size: 14px;
    color: #5A5A5A;
}
.section3-wrapper{
    width: 100%;
    height: 1100px;
}
.section3{
    margin: 0 auto;
    text-align: center;
    overflow: hidden;
}
.section3 .title{
  font-family: 'myFont';
    margin-top: 67px;
    margin-bottom: 30px;
}
.section3 .desc{
    font-size: 18px;
    color: #5A5A5A;
    margin-bottom: 60px;
}
.section3 .desc::after{
  position: absolute;
  display: block;
  bottom: -12px;
  left:49.6%;
  content:"1";
  width: 24px;
  height: 4px;
  background-color:#1abc9c;
  color: white;
}
.section3 .content{
    margin: 0 auto;
}
.section3 .content img{
  margin-left: -75px;
}
.section3 .content p{
  margin-top: 50px;
  font-size: 18px;
  color: #646464;
}
.section4-wrapper{
    width: 100%;
    height: 855px;
    border-top: solid 1px #ddd;
}
.section4{
    margin: 0 auto;
    text-align: center;
    padding-top: 25px;
}
.section4 .title{
  font-family: 'myFont';
    font-size: 36px;
}
.section4 .desc{
  margin-bottom: 57px;
}
.section4 .desc::after{
  position: absolute;
  display: block;
  bottom: -12px;
  left:49.6%;
  content:"1";
  width: 24px;
  height: 4px;
  background-color:#1abc9c;
  color: white;
}
.section4 .img-wrapper-con{
    background: #2f333b;
    padding: 0 15%;
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
.section4 .img-wrapper{ 
    cursor: pointer;
    position: relative;
}
.section4 .img-wrapper>img{
  height: 290px;
}
.section4 .img-wrapper:hover>.shade{
  visibility: visible;
}
.section4 .shade{
  visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding:0 20px;
  background: rgba(26,188,156,1);
  font-size: 12px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.section5-wrapper{
    width: 100%;
    background: #ffffff;
    height: 421px;
}
.section5{
    width: 1000px;
    margin: 0 auto;
    text-align: center;
    height: 387px;
}
.section5 .title{
  font-family: 'myFont';
    font-size: 36px; 
    margin-top: 0;
}
.section5 .subtitle{
  font-size: 24px;
  color:#64CAC4;
  margin-bottom:36px;
}
.section5 .text{
  font-size:16px;
  line-height:30px;
  text-align:start;
  text-indent:2em;
  color:#8D8D8D;
}
.section5 .input-wrapper{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
.section5 .input-wrapper input{
    width: 243px;
    height: 42px;
    font-size: 14px;
    color: black;
    margin: 0px 40px 50px;
    border-radius: 10px;
    outline: none;
    border: none;
    -webkit-box-shadow: 0 5px 25px #b0b0b0;
            box-shadow: 0 5px 25px #b0b0b0;
    text-indent: 10px;
}
.section5 .contact{
    width: 242px;
    height: 42px;
    line-height: 42px;
    color: #ffffff;
    text-align: center;
    background: #1FB5AD;
    margin: 0 auto;
    border-radius: 10px;
    cursor: pointer;
}
.section5 .desc{
  margin-bottom: 0;
}
.section5 .nav{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 42px;
}
.section5 .nav>div{
  font-size: 18px;
  width: 110px;
  height: 33px;
  line-height: 33px;
  border:solid 1px #ddd;
  border-radius: 8px;
  box-shadow: 0 1px rgba(0,0,0,0.2);
  cursor: pointer;
}
.section5 .nav-content{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}
.section5 .nav-content>div{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 60%;
}
.section5 .nav-content>div>div{
  width: 129px;
  height: 33px;
  line-height: 33px;
  font-size: 14px;
  color: #969696;
  margin-right: 5px;
  border:solid 1px #ddd;
  margin-bottom: 10px;
}
.current{
  color: white;
  background: #1abc9c;
  border:solid 1px #1abc9c;
  box-shadow: 0;
}
.section5 .nav>div:nth-child(1){
  margin-right: 76px;
}
.foot-wrapper{
    width: 100%;
    background:#32323A ;
    height: 204px;
}
.foot-wrapper .foot{
    width: 850px;
    margin: 0 auto;
    font-size: 14px;
    color:#6B6469 ;
    padding-top: 38px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
        -ms-flex-pack: justify;
            justify-content: space-between;

}
.foot-wrapper .foot .left .title{
    font-size: 16px;
    margin-bottom: 30px;
}
.foot-wrapper .foot .left .text{
    margin-bottom: 10px;
}
.foot-wrapper .foot .right img{
    width: 81px;
    height: 81px;
}
.foot-wrapper .foot .right .text{
    margin-top: 10px;
    text-align: center;
}
</style>