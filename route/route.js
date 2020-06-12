const routes = [
    {
        path:'/',
        component:ComponentDefault
    },
    {
        path:'/position',
        component:ComponentPosition
    },
    {
        path:'/business',
        component:ComponentBusiness
    },
    {
        path:'/employee',
        component:ComponentEmployee
    },
    {
        path:'/hotitem',
        component:ComponentHotitem
    },
    {
        path:'/avghandle',
        component:ComponentAvghandle
    },
    {
        path:'/opinion',
        component:ComponentOpinion
    },
    {
        path:'/departover',
        component:ComponentDepartover
    }
]


 const router = new VueRouter({
	base:"/datachart",
	mode:"history",
    routes
 })

function HttpPost(msg){
    var result = {};
    $.ajax({
        url : 'http://localhost/Service/TestHttp.php',
        type : "post",
        data : msg,
        dataType: "json",
        async : false,
        success : function(data) {
            result = data;
        }
    });

    return result;
}

