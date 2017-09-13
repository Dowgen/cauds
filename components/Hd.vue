<template>
<div class="myheader">
    <div class="container" style="margin:0;">
        <nav class="navbar navbar-inverse" role="navigation" style="margin:0;border: none">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#main-menu">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>

            <a class="navbar-brand hidden-sm hidden-md hidden-lg hidden-xs" href="#"><span class="glyphicon glyphicon-home"></span></a>
            <a class="logo" href="#" title="聚合企信"><img src="/img/assets/cauds.png" class="img-responsive" style="margin: 0px 100px 0 30px;"/></a>

        </div>
        <div class="collapse navbar-collapse" id="main-menu">
            <div class="menu-mainmenu-container">
                <ul id="menu-mainmenu" class="nav navbar-nav nav-pills">
                   <!-- <li><a href="#">总览</a></li>  
                   <li><a href="#">资产管理</a></li>   -->
                   <!-- <li><a href="/homepage">资产管理</a></li>   -->
                   <li><a href="/square">{{whichSquare}}</a></li>
                   <li><a href="/signed">签约机构</a></li>
                   <li><a href="/apiDetail">资产管理</a></li>
                   <!-- <li><a href="/orderHistory">系统设置</a></li>      -->
                   <!-- <li><a href="#">系统设置</a></li>      -->
                   <li><a href="/ApiDocument">接口文档</a></li>
                </ul>
            </div>
        </div>
         
        <div class="clearfix">
        </div>
        </nav>
    </div>
    
    <hdp/>
</div>
</template>

<script>
    import Hdp from '~components/Hdp.vue'

    export default {
      components: {
        Hdp
      },
      data () {
        return {
          userType:'', //判断是资金方登陆还是资产方
          whichSquare:''
        }
      },
      created () {
        if(process.browser){
          var userType = localStorage.userType;
          if(userType == 1) this.whichSquare = '资金方广场'
          else if(userType == 2) this.whichSquare = '资产方广场'
        } 
      }
    }
</script>
<style>
    .myheader{
        background:#222;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        height: 80px; -webkit-box-align: center; -ms-flex-align: center; align-items: center;
    }
    .container{
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
            -ms-flex-pack: center;
                justify-content: center;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
            -ms-flex-direction: column;
                flex-direction: column;
    }
    .myheader .container #main-menu a{
        font-size:14px;
        color:#ffffff;
    }
    .myheader .container #main-menu a:hover{
        color:#1fb5ad;
    }
</style>