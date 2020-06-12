/**表格公共组件**/
Vue.component("statistics-table",{
    template:"" +
        "<div :style='ParentDivStyle'>" +
        "<span>{{TableLabel}}</span>" +
            "<table :style='TableStyle'>" +
                    "<tr>" +
                        "<th style='border: 1px solid #fff;padding:9px;'  v-if='TableTitle' v-for='tableitem in TableTitle'>" +
                        "{{tableitem}}" +
                        "</th>" +
                    "</tr>" +

                    "<tbody v-if='TableContentData.length > 0'>" +
                        "<tr v-for='contentArr in TableContentData'>" +
                            "<td style='padding:8px;' v-if='contentArr' v-for='Tdins in contentArr'>{{Tdins}}</td>" +
                        "</tr>" +
                    "</tbody>" +

                    "<tbody style='text-align: center;border: 1px solid #fff;' v-else>" +
                        "<tr>" +
                            "" +
                            "<td :colspan='TableTitle.length'>No data</td>" +
                            "" +
                        "</tr>" +
                    "</tbody>" +
            "</table>" +
        "</div>",
    created(){


    },
    data:function () {
        return {

        }
    },
    mounted(){

    },

    props:{
        TableContentData:{
            type: Array,
            default:function () {
                return [];
            }
        },
        TableLabel:{
            type:String,
            default:function () {
                return "未定义标题";
            }
        },
        TableTitle:{
            type:Array,
            default:function () {
                return ["台席","办理业务","办件量","平均办理时长","评价总量","满意数","不满意数"];
            }
        },
        height:{
            type:String,
            default:function () {
                return "851px";
            }
        },
        width:{
            type:String,
            default:function () {
                return "100%";
            }
        },
        MarginTop:{
            type:String,
            default:function () {
                return "0px";
            }
        },
        MarginLeft:{
            type:String,
            default:function () {
                return "0px";
            }
        },
        TableStyle:{
            type:String,
            default:function () {
                let width = this.width
                return "width:"+width+";background:#05264e;border:1px solid #fff;";
            }
        },
        ParentDivStyle:{
            type:String,
            default:function () {
                let height=this.height,width=this.width,MarginLeft=this.MarginLeft,MarginTop=this.MarginTop
                let StringHtml ="width:"+width+";height:"+height+";overflow:hidden;float:left;";
                console.log(MarginTop)
                if (MarginLeft=="0px"){
                        StringHtml+="margin-left:18px;";
                    }else{
                        StringHtml+="margin-left:"+MarginLeft+";";
                    }

                    if (MarginTop == "0px"){
                        StringHtml+="margin-top:10px;";
                    }else {
                        StringHtml+="margin-top:"+MarginTop+";";
                    }
                    return StringHtml;
            }
        }
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

/**图表容器**/
Vue.component("container-div2000",{
    template:"" +
        "<div :class='IsTopLabel ? \"hot-common\" : \"\"  ' :style='ContainerDivStyle'>" +
                "<span :style='ClickSpanNum == 1 ? \"background-color:#3300ff\" : \"\"' @click='ClickFilterFun(1)' class='common-span common-span1' v-if='IsTopLabel'>{{topLabel[0]}}</span>" +
                "<span :style='ClickSpanNum == 2 ? \"background-color:#3300ff\" : \"\"' @click='ClickFilterFun(2)' class='common-span common-span2' v-if='IsTopLabel'>{{topLabel[1]}}</span>" +
                "<span :style='ClickSpanNum == 3 ? \"background-color:#3300ff\" : \"\"' @click='ClickFilterFun(3)' class='common-span common-span3' v-if='IsTopLabel'>{{topLabel[2]}}</span>" +
            "" +
            "<slot></slot>" +
        "</div>",
    created(){


    },
    mounted(){

    },
    props:{
        topLabel:{
            type:Array,
            default:function () {
                return ["按天显示","按周显示","按月显示"];
            }
        },
        IsTopLabel:{
            type:Boolean,
            default:function () {
                return false;
            }
        },
        title:{
            type:String,
            default:function () {
                return "未定义标题";
            }
        },
        titleSize:{
            type:String,
            default:function () {
                return "22px";
            }
        },
        fontMarginTop:{
            type:String,
            default:function () {
                return "6px";
            }
        },
        fontMarginLeft:{
            type:String,
            default:function () {
                return "40px";
            }
        },
        width:{
            type:String,
            default:function () {
                return "2170px";
            }
        },
        height:{
            type:String,
            default:function () {
                return "955px";
            }
        },
        margin:{
            type:String,
            default:function () {
                return " left:8px";
            }
        },
        padding:{
            type:String,
            default:function () {
                return "26px";
            }
        },
        imaPathNum:{
            type:String,
            default:function () {
                return "";
            }
        },
        ContainerDivStyle:{
            type:String,
            default:function () {
                let width = this.width,heigth=this.height,margin=this.margin,imagPathNum=this.imaPathNum,padding = this.padding
                return "height:"+heigth+";width:"+width+";background-image:url(./static/images/half"+imagPathNum+".png);background-repeat: no-repeat;background-size: 100% 100%;padding:"+padding+";float:left;overflow:hidden;margin-"+margin+";";
            }
        },
        titleStyle:{
            type:String,
            default:function () {
                let tops = this.fontMarginTop,fontMarginLefts=this.fontMarginLeft

                let styleStr = "margin-left:"+fontMarginLefts+";padding-top:"+tops+";display:inline-block;";
                return styleStr;
            }
        },
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
            ClickSpanNum:1
        }
    },
    mounted(){

    },
    methods:{
        InfoSearch(){
            console.log("InfoSearch")

        },
        ClickFilterFun(StatusNum){
            let SpanNumData=this.ClickSpanNum
            if (StatusNum == SpanNumData){
                return;
            }

            this.ClickSpanNum=StatusNum

            this.$parent.FilterFun(StatusNum);

        },
    },
    destroyed(){

    }
});


/**折线图组件**/
Vue.component("poly-line",{
    template:"<div :style='PolyLineStyle'>" +
                 "<p>{{subtitle}}</p>" +
                 "<div style='height:100%;width:100%;background-color:#FFF;overflow-x:scroll;overflow-y:hidden;' :id='UniqueIds'>" +
                 "</div>" +
             "</div>",
    created(){

    },
    mounted(){
        var rightTitle=this.ChartData.rightTitle,title=this.ChartData.title,datas=this.ChartData.data,id=this.UniqueIds
        $("#"+id).highcharts({
                chart: { type: 'column' },
                title: {  text:title},
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: 0,
                    y: 0,
                    floating: true,
                    borderWidth: 1,
                    backgroundColor: '#FFFFFF'
                },
                xAxis: { categories:datas.timeArr },
                yAxis: { title: { text: '件数' }/* ,tickPositions: [0, 20, 50, 100]  */ },
                tooltip: { shared: true, valueSuffix: ' 件 ' },
                credits: { enabled: false },
                plotOptions: { column: {
                        borderWidth: 0,
                        pointWidth: "",
                        dataLabels: {
                            enabled: true,
                            style: {
                                color: '#05264e',//颜色
                                fontSize:'16px'  //字体
                            }
                        }

                    } },
                series: [{
                    animation:false,
                    name: rightTitle,
                    data: datas.timeNumber
                }]	//+msg.allnum
            });
        },
    props:{
        ChartData:{
            type:Object,
            default:function () {
                return {
                    title:"",
                    rightTitle:"",
                    data:{
                        timeArr:[],
                        timeNumber:[]
                    }
                };
            }
        },
        UniqueIds:{
            type:String,
            default:function () {
                return "windows_job_qs"
            }
        },
        width:{
            type:String,
            default:function () {
                return "686px";
            }
        },
        height:{
            type:String,
            default:function () {
                return "440px";
            }
        },
        left:{
            type:String,
            default:function () {
                return "8px";
            }
        },
        top:{
            type:String,
            default:function () {
                return "0px";
            }
        },
        subtitle:{
            type:String,
            default:function () {
                return "未定义标题";
            }
        },
        PolyLineStyle:{
            type:String,
            default:function () {
                let width = this.width,heigth=this.height,left=this.left,imagPathNum=this.imaPathNum,top=this.top


                return "height:"+heigth+";width:"+width+";float:left;overflow:hidden;margin-left:"+left+";margin-top:"+top+";";
            }
        }
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


/**饼图组件**/
Vue.component("pie-chart",{
    template:"<div :style='PieChartStyle'>" +
        "<p>{{subtitle}}</p>" +
            "<div style='height:100%;width:100%;background-color:#FFF;overflow-x:scroll;overflow-y:hidden;'>" +
                "" +
            "</div>" +
        "</div>",
    created(){

    },
    mounted(){
        var rightTitle=this.ChartData.rightTitle,title=this.ChartData.title,datas=this.ChartData.data

    },
    props:{
        ChartData:{
            type:Object,
            default:function () {
                return {
                    title:"",
                    rightTitle:"",
                    data:{
                        timeArr:[],
                        timeNumber:[]
                    }
                };
            }
        },
        width:{
            type:String,
            default:function () {
                return "686px";
            }
        },
        height:{
            type:String,
            default:function () {
                return "440px";
            }
        },
        margin:{
            type:String,
            default:function () {
                return " left:8px";
            }
        },
        subtitle:{
            type:String,
            default:function () {
                return "未定义标题";
            }
        },
        PolyLineStyle:{
            type:String,
            default:function () {
                let width = this.width,heigth=this.height,margin=this.margin,imagPathNum=this.imaPathNum
                return "height:"+heigth+";width:"+width+";float:left;overflow:hidden;margin-"+margin+";";
            }
        }
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



/**预警组件**/
Vue.component("window-alert",{
    template:"<div :style='WindowAlertStyle'>" +
        "<p>{{subtitle}}</p>" +
            "<div style='margin-top: 36px;height:405px;width:100%;background:none;font-size: 31px;line-height:36px;'>" +
                "<ul v-if='ChartData'>" +
                    "<li v-for='items in ChartData'>" +
                        "<span>{{items.times}}</span>" +
                        "{{items.content}}" +
                    "</li>" +
                "</ul>" +
            "</div>" +
        "</div>",
    created(){

    },
    mounted(){

    },
    props:{
        ChartData:{
            type:Array,
            default:function () {
                return [];
            }
        },
        width:{
            type:String,
            default:function () {
                return "686px";
            }
        },
        height:{
            type:String,
            default:function () {
                return "440px";
            }
        },
        margin:{
            type:String,
            default:function () {
                return " left:8px";
            }
        },
        subtitle:{
            type:String,
            default:function () {
                return "未定义标题";
            }
        },
        WindowAlertStyle:{
            type:String,
            default:function () {
                let width = this.width,heigth=this.height,margin=this.margin,imagPathNum=this.imaPathNum
                return "height:"+heigth+";width:"+width+";float:left;overflow:hidden;margin-"+margin+";";
            }
        }
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




