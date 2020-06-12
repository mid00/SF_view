let menuHtml = 
'<div>'+
    '<nav class="sidenav" data-sidenav data-sidenav-toggle="#sidenav-toggle">'+
        '<div class="sidenav-brand">按条件查询</div>'+
        '<ul class="sidenav-menu">'+
            '<li><router-link to="/position">按台席查询</router-link></li>'+
            '<li><router-link to="/business">按业务查询</router-link></li>'+
            '<li><router-link to="/employee">按柜员查询</router-link></li>'+
            '<li><router-link to="/hotitem">热点事项统计</router-link></li>'+
            '<li><router-link to="/avghandle">平均办理时长统计</router-link></li>'+
            '<li><router-link to="/opinion">评价满意率统计</router-link></li>'+
            '<li><router-link to="/avghandle">部门业务办结统计</router-link></li>'+
        '</ul>'+
    '</nav>'+
    '<a href="javascript:void(0);" class="toggle" id="sidenav-toggle">'+
        '<i class="material-icons">menu</i>'+
    '</a>'+
'</div>';

Vue.component("right-menu",{
    template:menuHtml,
    data:function(){
        return{
            
            
        }
    }
})

