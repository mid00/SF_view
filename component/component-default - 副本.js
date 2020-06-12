//窗口业务统计列表组件
Vue.component("window-list",{
    props:{
        TableData:{
            type:Array
        }
    },
    watch:{
        TableData(newValue,oldValue){
            for(var each in pageTimer){
                clearInterval(pageTimer[each]);
            }
            this.$nextTick(function(){
                this.WindowNum = this.TableData.length

                $('#window-data').rollSlide({
                    orientation: 'top',
                    num: 23,
                    v: 1500,
                    space: 10000,
                    isRoll: true
                });

            })
        }
    },
    template:"<div class='window-list' id='window-data' >"+
        "<p class='windows-title'>窗口业务统计</p>"+
        "<p class='windows-subtitle'>在线办理业务窗口数量:{{WindowNum}}个</p>"+
        "<table border='1'>"+
            "<tr>"+
                "<th width='80'>窗口号</th>"+
                "<th width='95'>柜员姓名</th>"+
                "<th width='120'>所属部门</th>"+
                "<th width='80'>办件数</th>"+
                "<th width='120'>事项</th>"+
                "<th width='100'>取票时间</th>"+
                "<th width='100'>叫号时间</th>"+
                "<th width='100'>完结时间</th>"+
                "<th width='90'>评价状态</th>"+
                "<th width='100'>等待时长</th>"+
                "<th width='100'>办理时长</th>"+
            "</tr>"+
        "</table>"+
            "<div id='window-data' style='width:100%;overflow:hidden;height:804px;'>"+
                "<ul style='position:relative;left:0;top:0;' class='roll__list'>"+
                    "<li v-if='TableData' v-for='item in TableData'>"+
                        "<div style='width:92px'>{{item.window}}</div>"+
                        "<div style='width:109px'>{{item.name}}</div>"+
                        "<div style='width:139px'>{{item.department}}</div>"+
                        "<div style='width:93px'>{{item.job_num}}</div>"+
                        "<div style='width:139px'>{{item.job}}</div>"+
                        "<div style='width:115px'>{{item.queue_time}}</div>"+
                        "<div style='width:115px'>{{item.call_time}}</div>"+
                        "<div style='width:117px'>{{item.over_time}}</div>"+
                        "<div style='width:104px'>{{item.opin_status}}</div>"+
                        "<div style='width:117px'>{{item.wait_time}}</div>"+
                        "<div style='border-right:1px solid #fff;width:118px'>{{item.work_time}}</div>"+
                    "</li>"+
                "</ul>"+
            "</div>" +
        "</div>",
    data:function () {
        return {
            WindowNum:0
        }
    },
    created(){
    },
    mounted(){

    },
    methods:{
    },
    destroyed(){

    }
});

//热点事件排行
Vue.component("hot-spot",{
    props:{
        SpotData:{
            type: Array,

        },
        WhetherDefaultComponent:{
            type:Boolean,
            default:function () {
                return true;
            }
        },
        title:{
            type:String,
            default:function () {
                return "";
            }
        },
        width:{
            type:String,
            default:function () {
                return "515px";
            }
        },
        height:{
            type:String,
            default:function () {
                return "469px";
            }
        },
        DefaultStyle:{
            type:String,
            default:function () {
                let widths = this.width,height=this.height
                return "width:"+widths+";height:"+height+";float:left;";
            }
        }
    },
    watch:{
        SpotData(){
            this.$nextTick(function(){

            })
            //this.sort('hot_num')
             this.SpotData.sort(this.compare('hot_num'))

            console.log("ddd9999999999")
            console.log(this.SpotData)
        }
    },
    template:"<div :style='WhetherDefaultComponent ? \"\" : DefaultStyle' :class='WhetherDefaultComponent ? \"hot-spot\" :\"hot-common\" '>" +
            "<p class='hot-subtitle'>热点事项统计(件数)</p>" +
            "<div class='progress-bar-content'>"+
                "<div v-if='SpotData' v-for='item in SpotData' class='progress-bar-content-item'>"+
                    "<div class='layui-progress layui-progress-big progress-items' style='width:300px;float: left;' lay-showPercent=\"true\">\n" +
                        "<div class='layui-progress-bar layui-bg-red' lay-percent='10%' :style='{width:item.runnum+\"%\"}'>" +
                        "<span style='margin-right: -26px'>{{item.hot_num}}</span>" +
                        "</div>\n" +
                    "</div>" +
                    "<span class='progress-items' style='float: left;margin-left: 4%;margin-top: 14px'>{{item.job_name}}</span>"+
                "</div>"+
            "</div>"+
        "</div>",
    data:function () {
        return {

        }
    },

    created(){
        var element = layui.element;

    },
    mounted(){

    },
    compare:function(attr) {
        return function(a,b){
            var val1 = a[attr];
            var val2 = b[attr];
            return val2 - val1;
        }
    },
    methods:{

        sort(Msg) {
            this.SpotData.sort(this.compare(Msg));
        },

        compare(attr) {
            return function(a,b){
                var val1 = a[attr];
                var val2 = b[attr];
                return val2 - val1;
            }
        }

//        this.SpotData.sort(this.compare('hot_num'))


    },
    destroyed(){

    }
});

//平均办理时长排行
Vue.component("avg-handle-time",{
    props:{
        AvgData:{
            type: Array
        }
    },
    watch:{
        AvgData(){
            this.$nextTick(function(){
            })
        }
    },
    template:"<div class='handle-time-spot'>" +
        "<p class='handle-time-subtitle'>平均办理时长(分钟)</p>" +
        "<div class='progress-bar-content'>"+
            "<div v-if='AvgData' v-for='item in AvgData' class='progress-bar-content-item'>"+
                "<div class='layui-progress layui-progress-big progress-items' style='width:300px;float: left;' lay-showPercent=\"true\">\n" +
                     "<div class='layui-progress-bar layui-bg-red' lay-percent='10%' :style='{width:item.avgnum+\"%\"}'>" +
                     "<span style='margin-right: -26px'>{{item.pingjun}}</span>" +
                     "</div>\n" +
                "</div>" +
                "<span class='progress-items' style='float: left;margin-left: 4%;margin-top: 14px'>{{item.job_name}}</span>"+
            "</div>"+
        "</div>"+
     "</div>",
    data:function () {
        return {

        }
    },
    created(){
        var element = layui.element;
    },
    mounted(){

    },
    methods:{
    },
    destroyed(){

    }
});

//评价满意率统计
Vue.component("avg-evaluation",{
    props:{
        EvaluationData:{
            type: Object,
        },
        TitleString:{
            type:String,
            default:function () {
                return "评价满意率统计";
            }
        },
        WhetherDefaultComponent:{
            type:Boolean,
            default:function () {
                return true;
            }
        },
        width:{
            type:String,
            default:function () {
                return "558px";
            }
        },
        height:{
            type:String,
            default:function () {
                return "469px";
            }
        },
        margin:{
            type:String,
            default:function () {
                return "left:8px";
            }
        },
        padding:{
            type:String,
            default:function () {
                return "left:10px";
            }
        },

    },
    watch:{
        EvaluationData(){
            this.$nextTick(function(){
                this.EvaluationDataMsg(this.EvaluationData);
            })
        }
    },

    template:"<div :class=\"WhetherDefaultComponent ? \'evaluation-spot\' :\'hot-common\'\"  >" +
        "<p class='handle-time-subtitle'>{{TitleString}}</p>" +
        "<div class=\"spec1\"></div>\n" +
            "<div id=\"opinion1\" :style=\"!WhetherDefaultComponent ? 'width: 310px;height: 300px;float: left;' :'' \" :class=\"WhetherDefaultComponent ? 'opinion1' : '' \"></div>\n" +
            "<div id=\"opinion2\" :style=\"!WhetherDefaultComponent ? 'width: 310px;height: 300px;float: left;' : '' \" :class=\"WhetherDefaultComponent ? 'opinion2' : '' \"></div>" +
            "<span :style=\"!WhetherDefaultComponent ? 'float: left;margin: 0 0 0 20px;width:280px;height:30px;text-align:center;vertical-align:middle;' : '' \"  :class=\"WhetherDefaultComponent ? 'opinion1txt' : '' \">满意</span>\n" +
            "<span :style=\"!WhetherDefaultComponent ? 'float: left;margin: 0 0 0 20px;width:280px;height:30px;text-align:center;vertical-align:middle;' : '' \"  :class=\" WhetherDefaultComponent ? 'opinion2txt' : '33'  \">不满意</span>" +
            "" +
            "<div class=\"evadiv1\" hidden>\n" +
                "\t\t\t\t<span class=\"span1\"></span>\n" +
                "\t\t\t\t<span class=\"span_\">业务不熟练</span>\n" +
                "\t\t\t\t<span class=\"span2\"></span>\n" +
                "\t\t\t\t<span class=\"span_\">工作效率低</span>\n" +
                "\t\t\t\t<span class=\"span3\"></span>\n" +
                "\t\t\t\t<span class=\"span_\"  style=\"padding-right:0;\">服务态度差</span>\n" +
            "</div>" +
            "" +
        "</div>" ,


    data:function () {
        return {

        }
    },
    created(){

    },
    mounted(){

    },
    methods:{
        EvaluationDataMsg(Msg){
            let EvaluationData=Msg,color=["","8fc31f","fff100","04a4df","fff100","f39700"];
            let num = parseFloat(EvaluationData.goodNum/EvaluationData.totalNum*100);
            num = num.toFixed(2)
            if (EvaluationData.goodNum==0){
                num=0
            }
            Highcharts.chart('opinion1', {
                chart: { spacing : [5, 0 , 5, 0], backgroundColor: 'rgba(0,0,0,0)' },
                title: {
                    floating:true,
                    text: '',
                    style:{ 'color': '#'+color[1], 'fontSize': '25px' }
                },
                tooltip: { enabled: false, animation:false },
                colors:['#'+color[1],'#'+color[2]],
                plotOptions: {
                    pie: {
                        allowPointSelect: false,
                        animation:false,
                        enableMouseTracking:false,
                        cursor: 'pointer',
                        borderWidth : 0,
                        dataLabels: {
                            enabled: false,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            style: { color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black' }
                        }
                    }
                },
                series: [{
                    type: 'pie',
                    innerSize: '80%',
                    name: '',
                    data: [
                        ["好评",30.0]
                    ]
                }]
            }, function(c) {
                var centerY = c.series[0].center[1],
                    titleHeight = parseInt(c.title.styles.fontSize);
                c.setTitle( { y:centerY -10, text:EvaluationData.goodNum+"件<br/>"+num+'%'});
            });
            $(".evadiv1").show();


            if (EvaluationData.buSLNum==0 && EvaluationData.xiaoLDNum==0
                && EvaluationData.taiDCNum==0)
            {
                EvaluationData.buSLNum=33
                EvaluationData.xiaoLDNum=33
                EvaluationData.taiDCNum=34
                var badNumAll=0;

            }else{
                let badall = EvaluationData.badNum;
                var badNumAll = Number(100-num);
                badNumAll = badNumAll.toFixed(2)
                EvaluationData.buSLNum = parseFloat( EvaluationData.buSLNum / badall );
                EvaluationData.buSLNum = EvaluationData.buSLNum.toFixed(2);
                EvaluationData.buSLNum = Math.floor(EvaluationData.buSLNum * 100);

                EvaluationData.xiaoLDNum = parseFloat( EvaluationData.xiaoLDNum / badall );
                EvaluationData.xiaoLDNum = EvaluationData.xiaoLDNum.toFixed(2);
                EvaluationData.xiaoLDNum = Math.floor(EvaluationData.xiaoLDNum * 100);

                EvaluationData.taiDCNum = parseFloat( EvaluationData.taiDCNum / badall );
                EvaluationData.taiDCNum = EvaluationData.taiDCNum.toFixed(2);
                EvaluationData.taiDCNum = Math.floor(EvaluationData.taiDCNum * 100);
            }
            Highcharts.chart('opinion2', {
                chart: { spacing : [5, 0 , 5, 0],backgroundColor: 'rgba(0,0,0,0)' },
                title: {
                    floating:true,
                    text: EvaluationData.badNum+"件<br />"+badNumAll+'%',
                    style:{
                        'color': '#f39700',
                        'fontSize': '25px'
                    }
                },
                tooltip: {
                    enabled: false,
                    animation:false
                },
                colors: [
                    '#f47920',
                    '#ffc20e',
                    '#ed1941'
                ],
                plotOptions: {
                    pie: {
                        allowPointSelect: false,
                        animation:false,
                        enableMouseTracking:false,
                        cursor: 'pointer',
                        borderWidth : 0,
                        dataLabels: {
                            enabled: false,
                            format: '<b>{point.name}</b>',
                            style: { color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black' }
                        }
                    }
                },
                series: [{
                    type: 'pie', innerSize: '80%',
                    data: [
                        {name:EvaluationData.buSLNum, y:EvaluationData.buSLNum},
                        {name:EvaluationData.xiaoLDNum, y:EvaluationData.xiaoLDNum},
                        {name:EvaluationData.taiDCNum, y:EvaluationData.taiDCNum}
                    ]
                }]
            }, function(c) {
                var centerY = c.series[0].center[1],
                    titleHeight = parseInt(c.title.styles.fontSize);
                // c.setTitle({ y:centerY + titleHeight/2 });
                c.setTitle({ y:centerY -10 });
            });
        }
    },
    destroyed(){

    }
});

//部门业务办结统计
Vue.component("department-job",{
    props:{
        DepartmentJobData:{
            type: Array
        }
    },
    watch:{
        DepartmentJobData(){
            this.$nextTick(function(){

            })

        }
    },
    template: "<div class='department-spot'>" +
        "<p class='department-subtitle'>部门业务办结统计</p>" +
        "<div class='progress-bar-content'>"+
            "<div v-if='DepartmentJobData' v-for='item in DepartmentJobData' class='progress-bar-content-item'>"+
                "<div class='layui-progress layui-progress-big progress-items' style='width:300px;float: left;' lay-showPercent=\"true\">\n" +
                    "<div class='layui-progress-bar layui-bg-red' lay-percent='10%' :style='{width:item.dptnum+\"%\"}'>" +
                    "<span style='margin-right: -26px'>{{item.dpt_num}}</span>" +
                    "</div>\n" +
                "</div>" +
                "<span class='progress-items' style='float: left;margin-left: 4%;margin-top: 14px'>{{item.dpt_name}}</span>"+
            "</div>"+
        "</div>"+
     "</div>",
    data:function () {
        return {

        }
    },
    created(){
        var element = layui.element;
    },
    mounted(){

    },
    methods:{

    },
    destroyed(){

    }
});


//业务办理折线图
Vue.component("business-management",{
    props:{
        BusinessData:{
            type: Object

        }
    },
    watch:{
        BusinessData(){
            this.$nextTick(function () {
                let BusinessDataObj = this.BusinessData
                let numArr = [];
                let timeArr = [];
                BusinessDataObj.forEach(item=>{
                    numArr.push(item.num)
                    timeArr.push(item.period)

                });
                var title = {text: ' ' };
                var subtitle = {text: ''};
                var xAxis = {categories: timeArr};
                var yAxis = {title: {text: ' '}};
                var plotOptions = {line: {dataLabels: {enabled: true},enableMouseTracking: false}};

                var series= [{
                    name: '办理数量',
                    data: numArr
                }];

                let json = {
                    title:title,
                    subtitle:subtitle,
                    xAxis:xAxis,
                    yAxis:yAxis,
                    series:series,
                    plotOptions:plotOptions
                };

                $('#TimeConts').highcharts(json);
            })
        }
    },
    template:"<div class='business-manage'>" +
        "<p class='business-subtitle'>业务办理量趋势</p>" +
        "<div class='business-manage-content' id='TimeConts'>" +
        "" +
        "</div>" +
        "</div>",
    data:function () {
        return {

        }
    },
    created(){


    },
    mounted(){

    },
    methods:{
    },
    destroyed(){

    }
})


//排队叫号统计
Vue.component("queuing-statistics",{
    props:{
        QueuingStatistics:{
            type: Object
        }
    },
    watch:{
        QueuingStatistics(){
            this.$nextTick(function(){

            })

        }
    },
    template: "<div class='queuing-statistics-spot'>" +
        "<p class='queuing-statistics-subtitle'>排队叫号统计</p>" +
        "<div class='queuing-content' v-if='QueuingStatistics'>" +
            "<div class='queuing-label'>" +
                "<span class='queuing-labels'>取号人数:</span>" +
                "<span class='queuing-num'>{{QueuingStatistics.queuing_num ? QueuingStatistics.queuing_num : 0}}</span>" +
                "<span class='queuing-num-unit'>人</span>" +
            "</div>" +
            "<div class='queuing-label2 queuing-label-bakimg'>" +
                "<span class='queuing-labels2'>现&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp场:</span>" +
                "<span class='queuing-num2'>{{QueuingStatistics.on_site_num ? QueuingStatistics.on_site_num : 0}}</span>" +
                "<span class='queuing-num-unit'>人</span>" +
            "</div>" +
            "<div class='queuing-label2 queuing-label1-bakimg'>" +
            "<span class='queuing-labels2'>微&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp信:</span>" +
            "<span class='queuing-num2'>{{QueuingStatistics.wechat_num ? QueuingStatistics.wechat_num : 0}}</span>" +
            "<span class='queuing-num-unit'>人</span>" +
            "</div>" +
            "<div class='queuing-label2 queuing-label2-bakimg'>" +
                "<span class='queuing-labels2'>网&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp站:</span>" +
                "<span class='queuing-num2'>{{QueuingStatistics.net_num ? QueuingStatistics.net_num : 0}}</span>" +
                "<span class='queuing-num-unit'>人</span>" +
            "</div>" +
            "<div class='queuing-label'>" +
                "<span class='queuing-labels'>等待人数:</span>" +
                "<span class='queuing-num'>{{QueuingStatistics.wait_num ? QueuingStatistics.wait_num : 0}}</span>" +
                "<span class='queuing-num-unit'>人</span>" +
            "</div>" +
            "" +
        "</div>" +
        "</div>",
    data:function () {
        return {

        }
    },
    created(){
        var element = layui.element;
    },
    mounted(){

    },
    methods:{

    },
    destroyed(){

    }
});



//实时预警信息
Vue.component("warning",{
    props:{
        WarningData:{
            type: Array,
        }
    },
    watch:{
        WarningData(){
            this.$nextTick(function(){
                $('#WarningQuality').rollSlide({orientation:'top',num:9,v:368,space:10000,isRoll: true});
            })
        }
    },
    template: "<div class='warning-spot'>" +
        "<p class='warning-subtitle'>实时预警信息</p>" +
            "<div id='WarningQuality' class='warning-list'>" +
            "<ul class=\"roll__list\" style='width:100%;height:368px;position:relative;left:0;top:0;'>" +
                    "<li v-if='WarningData' v-for='item in WarningData'>" +
                    "<b style='color: #efffff'>{{item.warnTime}}</b>"+"&nbsp&nbsp"+
                       "{{item.winName}}" +"&nbsp"+
                        '"'+"{{item.bussType}}"+'"' +','+
                        '"'+"{{item.bussItem}}"+'"' +"&nbsp"+
                        "{{item.warnReason}}" +

                    "</li>" +
            "</ul>" +
            "</div>"+

        "</div>",
    data:function () {
        return {

        }
    },
    created(){
        var element = layui.element;
    },
    mounted(){

    },
    methods:{

    },
    destroyed(){

    }
});



//信用数据监察
Vue.component("credit",{
    props:{
        CreditData:{
            type: Array
        }
    },
    watch:{
        QueuingStatistics(){
            this.$nextTick(function(){

            })
        }
    },
    template: "<div class='credit-spot'>" +
        "<p class='credit-subtitle'>信用数据监察</p>" +
        "<div class='hidden-line'>" +
            "<table class='credit-table'>" +
                "<tbody>" +
                    "<tr>" +
                        "<th>审批编号</th>" +
                        "<th>企业名称(申报人)</th>" +
                        "<th>失信日期</th>" +
                        "<th>失信原因</th>" +
                    "</tr>" +
                    "<tr v-if='CreditData' v-for='item in CreditData' style='text-align:center'>" +
                        "<td>{{item.credit_num}}</td>" +
                        "<td>{{item.credit_name}}</td>" +
                        "<td>{{item.lost_credit_date}}</td>" +
                        "<td>{{item.reason}}</td>" +
                    "</tr>" +
            "</tbody>" +
            "</table>" +
        "</div>"+
        "</div>",
    data:function () {
        return {

        }
    },
    created(){

        var element = layui.element;

    },
    mounted(){

    },
    methods:{

    },
    destroyed(){

    }
});




//数据质量监察
Vue.component("data-quality",{
    props:{
        QualityData:{
            type: Array
        }
    },
    watch:{
        QualityData(){
            this.$nextTick(function(){
                $('#DataQuality').rollSlide({orientation:'top',num:2,v:368,space:10000,isRoll: true});
            })
        }
    },
    template: "<div class='quality-spot'>" +
        "<p class='quality-subtitle'>数据质量监察</p>" +
            "<div id='DataQuality' class='quality-list'>" +
            "<ul class=\"roll__list\" style='width:100%;height:368px;position:relative;left:0;top:0;'>" +
                "<li v-if='QualityData' v-for='item in QualityData'>" +
                    "&nbsp;<b>注册号/统一社会信用代码:</b>" +
                    "{{item.regcode}}<br />" +
                    "&nbsp;<b>单位名称:</b>" +
                    "{{item.unitname}}<br />&nbsp;<b>单位住所:</b>" +
                    "{{item.unitaddress}}<br />&nbsp;" +
                    "<b>问题数据:</b>" +
                    " {{item.errorreason}}</li>" +
            "</ul>" +
            "</div>"+
        "</div>",
    data:function () {
        return {

        }
    },
    created(){

        var element = layui.element;

    },
    mounted(){

    },
    methods:{

    },
    destroyed(){

    }
});


//最多跑一次数据预警
Vue.component("most-once",{
    props:{
        MostOnce:{
            type: Array
        }
    },
    watch:{
        MostOnce(){

            this.$nextTick(function(){

            })
        }
    },
    template: "<div class='most-once-spot'>" +
        "<p class='most-once-subtitle'>最多跑一次数据预警</p>" +
        "<div class='hidden-line'>" +
            "<table class='most-once-table'>" +
                "<tbody>" +
                    "<tr>" +
                        "<th>申办事项</th>" +
                        "<th>申报人</th>" +
                        "<th>联系人</th>" +
                        "<th>首次承办人</th>" +
                        "<th>联系人手机</th>" +
                        "<th>办事次数</th>" +
                    "</tr>" +
                    "<tr v-if='MostOnce' v-for='item in MostOnce'>" +
                        "<td>{{item.itemname}}</td>" +
                        "<td>{{item.unitname}}</td>" +
                        "<td>{{item.linkman}}</td>" +
                        "<td>{{item.secinputname}}</td>" +
                        "<td>{{item.linkmobile}}</td>" +
                        "<td>{{item.runnumb}}</td>" +
                    "</tr>" +
                "</tbody>" +
            "</table>" +
        "</div>"+
        "</div>",
    data:function () {
        return {

        }
    },
    created(){

        var element = layui.element;

    },
    mounted(){

    },
    methods:{

    },
    destroyed(){

    }
});





