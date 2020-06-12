/**业务数据表格**/
Vue.component("PositionBussTypeList",{
    template:"<container-div2000 width='2170px' height='955px'>" +
        "<span class='desk-title'>业务数据33</span>" +
        "<div class='search-div'>" +
        "选择台席:<select v-if='TableNumData' id='select_table_info_window'  class='search-select'>" +
        "<option value=''>--请选择--</option>" +
        "<option  v-for='items in TableNumData.TableWindowData'" +
        " :value='items.ids'>" +
        "" +
        "{{items.TableWindowName}}" +
        "" +
        "</option>" +
        "</select>" +
        "<select class='search-select' v-else>" +
        "<option value=''>--请选择--</option>" +
        "</select>" +
        "<span class='search-leabel'>开始日期:</span><input type='text' class='layui-input search-select' placeholder='--请选择--' id='info_date_s'>&nbsp;" +
        "<span class='search-leabel'>结束日期:</span><input type='text' class='layui-input search-select' placeholder='--请选择--' id='info_date_e'>&nbsp;" +
        "<input type='button' id='info_search' @click='InfoSearch()' class='winbtn1 search-leabel' value='查 看' >"+
        "</div>" +
        "" +
        "<div class='desk-table' id='desk-table'>" +
        "<div v-if='TableNumData' class='desk-table-subtitle'>" +
            "<span>排号数量:{{TableNumData.TotalQuantity.QueueQuantity}}</span>" +
            "<span>办结数量:{{TableNumData.TotalQuantity.HandleQuantity}}</span>" +
            "<span>平均办理时长:{{TableNumData.TotalQuantity.AvgHandleQuantity}}</span>" +
            "<span>评价数量:{{TableNumData.TotalQuantity.EvaluationQuantity}}</span>" +
            "<span>满意数:{{TableNumData.TotalQuantity.SatisfactionQuantity}}</span>" +
            "<span>不满意数量:{{TableNumData.TotalQuantity.NotSatisfiedQuantity}}</span>" +
        "</div>" +
        "<div class='desk-table-subtitle' v-else>" +
            "<span>排号数量:0</span>" +
            "<span>办结数量:0</span>" +
            "<span>平均办理时长:0</span>" +
            "<span>评价数量:0</span>" +
            "<span>满意数:0</span>" +
            "<span>不满意数量:0</span>" +
        "</div>" +
        "" +
        "<statistics-table " +
        "v-if='TableNumData'" +
        "width='100%'" +
        "height='851px'" +
        "v-bind:TableContentData='TableNumData.TableWindowListData'" +
        ">" +
        "</statistics-table>" +
        "</div>" +
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

/**图表**/
Vue.component("char-container",{
    template:"" +
        "<container-div2000 padding='26px' margin='left:30px' imaPathNum='4' width='2170px' height='955px'>" +
            "<poly-line subtitle='业务办件总汇' v-bind:ChartData='SendCharData'>" +
            "</poly-line>" +
        "" +
            "<avg-evaluation " +
                "TitleString='业务满意率' " +
                "v-bind:WhetherDefaultComponent='false'" +
                " margin='left:30px'" +
                " height='440px'" +
                " width='686px'>" +
            "</avg-evaluation>" +
        "" +
            "<window-alert " +
            "subtitle='业务预警'" +
            "v-bind:ChartData='WindowAlertData'" +
            "></window-alert>" +
        "" +
        "<poly-line " +
        "subtitle='业务办件量趋势' " +
        "v-bind:ChartData='SendTrendCharData'" +
        "v-bind:UniqueIds='UniqueIdObj.ChartId'" +
        "top='30px'>" +
        "</poly-line>" +
        "" +
        "<poly-line " +
        "subtitle='业务评价量趋势' " +
        "v-bind:ChartData='SendTrendCharData'" +
        "v-bind:UniqueIds='UniqueIdObj.ChartId1'" +
        "top='30px'" +
        "left='30px'" +
        ">" +
        "</poly-line>" +

        "<poly-line " +
        "subtitle='业务办件量趋势' " +
        "v-bind:ChartData='SendTrendCharData'" +
        "v-bind:UniqueIds='UniqueIdObj.ChartId2'" +
        "top='30px'" +
        "left='30px'" +
        ">" +
        "</poly-line>" +

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

        }
    },
    destroyed(){

    }
});



