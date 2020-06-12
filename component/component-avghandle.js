/**热点数据表格**/
Vue.component("avghandle-windowList",{
    template:"<container-div2000 title='平均办理时长统计(件数)' width='3050px' height='940px'>" +
        "<hot-spot v-bind:WhetherDefaultComponent='false'></hot-spot>" +
        "<statistics-table TableLabel='所有数据-2019-11-13' width='2430px' MarginTop='5px' MarginLeft='34px'></statistics-table>" +
        "</container-div2000>",
    data(){
        return {
            TableNumData:{
                TableWindowData:[],
                TableWindowListData:[],
                TotalQuantity:{
                    AvgHandleQuantity:0,
                    EvaluationQuantity:0,
                    HandleQuantity:0,
                    NotSatisfiedQuantity:0,
                    QueueQuantity:0,
                    SatisfactionQuantity:0
                }
            }
        }
    },
    props:{
        TableNumData:{
            type: Object,
            default:function () {
                console.log("default");
                return {}
            }
        },
        watch: {
            TableNumData(){
                let tabel_date=this.TableNumData
                console.log(tabel_date)
            }
        }
    },
    watch:{
        TableNumData(){
            console.log(this.TableNumData.TableWindowListData)
        }
    },
    created(){
        layui.use('laydate', function(){
            let laydate = layui.laydate;
            console.log(laydate)
            laydate.render({ elem: '#info_date_s' });
            laydate.render({ elem: '#info_date_e' });
        });

    },
    mounted(){

    },
    props:{
        TableNumData:{
            type: Object
        }
    },
    width:{
        TableNumData(){
            console.log(this.TableNumData);
            this.$nextTick(function(){

            })
        }
    },
    data:function () {
        return {

        }
    },
    mounted(){

    },
    methods:{
        InfoSearch(){
            console.log("InfoSearch")

        }
    },
    destroyed(){

    }
});

/**柜员图表**/
Vue.component("avghandle-char-container",{
    template:"" +
        "<container-div2000 v-bind:IsTopLabel='true' padding='26px' margin='left:30px' imaPathNum='4' width='1290px' height='940px'>" +
            "" +
            "<div id='hot_day_pic' style='clear:both;height:840px;'></div>" +
            "" +
        "</container-div2000>",
    data(){
        return {
            SendCharData:{
                title:"测试标题",
                rightTitle:"办件量",
                data:{
                    timeArr:["1号窗口","1号窗口","1号窗口","1号窗口","1号窗口"],
                    timeNumber:["2019-12-5","2019-12-6","2019-12-7","2019-12-8","2019-12-9"]
                }
            },
            UniqueIdObj:{
                ChartId:"trend_char",
                ChartId1:"eval_char",
                ChartId2:"amount_char"
            },
            SendTrendCharData:{
                title:"",
                rightTitle:"办件量",
                data:{
                    timeArr:["1号窗口","1号窗口","1号窗口","1号窗口","1号窗口"],
                    timeNumber:["2019-12-5","2019-12-6","2019-12-7","2019-12-8","2019-12-9"]
                }
            },
            WindowAlertData:[
                {times:"15:39:21",content:"   “新区税务局” 240 号窗口产生差评"},
                {times:"15:39:21",content:"   “新区税务局” 240 号窗口产生差评"},
                {times:"15:39:21",content:"   “新区税务局” 240 号窗口产生差评"},
                {times:"15:39:21",content:"   “新区税务局” 240 号窗口产生差评"},
                {times:"15:39:21",content:"   “新区税务局” 240 号窗口产生差评"},
                {times:"15:39:21",content:"   “新区税务局” 240 号窗口产生差评"},
                {times:"15:39:21",content:"   “新区税务局” 240 号窗口产生差评"}
            ]
        }
    },
    props:{
        TableNumData:{
            type: Object,
            default:function () {
                console.log("default");
                return {}
            }
        }
    },
    mounted(){
        console.log(123)
        var chart = Highcharts.chart('hot_day_pic', {
            title: {
                text: '2010 ~ 2016 年太阳能行业就业人员发展情况'
            },
            subtitle: {
                text: '数据来源：thesolarfoundation.com'
            },
            yAxis: {
                title: {
                    text: '就业人数'
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: 2010
                }
            },
            series: [{
                name: '安装，实施人员',
                data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
            }, {
                name: '工人',
                data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
            }, {
                name: '销售',
                data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
            }, {
                name: '项目开发',
                data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
            }, {
                name: '其他',
                data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
            }],
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
        });
    },
    created(){

    },
    width:{
        TableNumData(){
            console.log(this.TableNumData);
            this.$nextTick(function(){

            })
        }
    },
    methods:{
        InfoSearch(){
            console.log("InfoSearch")

        },
        FilterFun(i){
            console.log("child"+i)

        }
    },
    destroyed(){

    }
});



