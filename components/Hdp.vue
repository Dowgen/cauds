<template>
<div class="dropdown">

    <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" 
     data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
     <span>{{name}}</span>
        <span class="caret"></span>
    </button>
    <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
        <li>
            <a href="${pageContext.request.contextPath}/w/creditUser/request/myAccount?navChose=0">
            <img src="${ctxStatic}/credit/img/assets/Home_normal.png">基本信息</a>
        </li>
        <li>
            
            <a href="${pageContext.request.contextPath}/w/creditUser/request/myAccount?navChose=1" >
            <img src="${ctxStatic}/credit/img/assets/User-Profile_normal.png">认证接口</a>
        </li>
        <li><a href="${pageContext.request.contextPath}/w/creditUser/login">
            <img src="${ctxStatic}/credit/img/assets/loginout.png">登出</a>
        
        </li>
        <!-- <li role="separator" class="divider"></li> -->
    </ul>
</div>
</template>
<script>
export default {
    data () {
        return {
          name:''
        }
    },
    created (){
        if (process.browser) {
            /*this.name=JSON.parse(localStorage.data).userInfo.org_name;*/
        }
    },
}
</script>
<style>
    .dropdown, .dropup {
        position: absolute;
        right: 67px;
        top: 23px;
    }

    .dropdown>button{
        color:white;
        background:#222;
        border:none;
        outline:none;
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
</style>