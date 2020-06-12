

// -------------------------------------------------------------------------------- 窗口业务统计列表组件  1
Vue.component("window-list",{
    props:{
        TableData:{
            type:Array
        },
		WinNum:{
			type:Number
		}
    },
    watch:{
        TableData(newValue,oldValue){
            for(var each in pageTimer){
                clearInterval(pageTimer[each]);
            }
            this.$nextTick(function(){
                //$('#window-data').rollSlide({
                   // orientation: 'top',
                  //  num: 23,
                  //  v: 1500,
                   // space: 10000,
                   // isRoll: false,
                    //isRoll: true,
               // });
            })
        },
		WinNum(newValue,oldValue){
		}
    },
    template:"<div class='window-list' id='window-data' >"+
        "<p class='windows-title'>窗口业务统计</p>"+
        "<p class='windows-subtitle'>在线办理业务窗口数量:<span> {{WinNum}}</span>个</p>"+
        "<table>"+
            "<col center />" +
            "<col center />" +
            "<col center />" +
            "<col center />" +
            "<col center />" +
            "<col center />" +
            "<col center />" +
            "<col center />" +
            "<col center />" +
            "<col center />" +
            "<col center />" +
            "<thead ref='tab'>" +
                "<tr>"+
                    "<th width='7%'>窗口号</th>"+
                    "<th width='7%'>姓名</th>"+
                    "<th width='10%'>所属部门</th>"+
                    "<th width='7%'>办件数</th>"+
                    "<th width='15%'>办理事项</th>"+
                    "<th width='9%'>取票时间</th>"+
                    "<th width='9%'>叫号时间</th>"+
                    "<th width='9%'>办结时间</th>"+
                    "<th width='9%'>评价结果</th>"+
                    "<th width='9%'>等待时长</th>"+
                    "<th width='9%'>办理时长</th>"+
                "</tr>"+
            "</thead>" +
            "<tr v-if='TableData' v-for='item in TableData'>" +
                "<td width='7%'>{{item.window}}</td>" +
                "<td width='7%'>{{item.name}}</td>" +
                "<td width='10%'>{{item.department}}</td>" +
                "<td width='7%'>{{item.job_num}}</td>" +
                "<td width='15%'>{{item.job}}</td>" +
                "<td width='9%'>{{item.queue_time}}</td>" +
                "<td width='9%'>{{item.call_time}}</td>" +
                "<td width='9%'>{{item.over_time}}</td>" +
                "<td width='9%'>{{item.opin_status}}</td>" +
                "<td width='9%'>{{item.wait_time}}</td>" +
                "<td width='9%'>{{item.work_time}}</td>" +
            "</tr>" +
        "</table>"+
    "</div>",

            


    data:function () {
        return {
            WindowNum:0
        }
    },
    created(){
        this.selT(event);
    },
    mounted(){
    },
    methods:{
        selT(event){     

            document.addEventListener( "click", (event)=>{
              var cols = document.getElementsByTagName('col');
              var len = cols.length;
            
            if( this.$refs.tab.contains( event.target)){
      
              console.log("点了表格")
              if(event.target.tagName.toLowerCase() == 'th'){
                var index = event.target.cellIndex;
                for(var i = 0; i < len; i++){
                    index == i?cols[i].className = 'windowtab' : cols[i].className = '';
                }
              }
            }else{
      
              console.log("没点表格")
              for(var i = 0; i < len; i++){
                  cols[i].className = '';
              }
            }
            }, true)
        },
    },
    destroyed(){

    }
});

// -------------------------------------------------------------------------------- 热点事件排行  2
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

        }
    },
    template:"<div :style='WhetherDefaultComponent ? \"\" : DefaultStyle' :class='WhetherDefaultComponent ? \"hot-spot\" :\"hot-common\" '>" +
            "<p class='hot-subtitle'>高频事项统计<span>(件数)</span></p>" +

            "<div class='progress-bar-content'>"+

                '<div class="hotCount" v-if="SpotData" v-for="item in SpotData">' +
                    '<div class="left">' +
                    '<span>{{item.job_name}}</span>' +
                    '</div>' +
                    '<div class="middle"></div>' +
                    '<div class="right">' +
                    `<div><div :style="{ width: item.runnum + '%'}"></div><span>{{item.hot_num}}</span></div>` +
                    '</div>' +
                '</div>' +
                
            "</div>"+

        "</div>",


    data:function () {
        return {
            // SpotData: [
            //     {job_name: "市场准入税务综合服务印章备案制作", runnum: "5", hot_num: "5"},
            //     {job_name: "税务综合服务", runnum: "5", hot_num: "5"},
            //     {job_name: "印章备案制作", runnum: "5", hot_num: "5"},
            // ]
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

    },
    destroyed(){

    }
});

// -------------------------------------------------------------------------------- 平均办理时长排行  3
Vue.component("avg-handle-time",{
    props:{
        AvgData:{
            type: Array
        }
    },
    watch:{
        AvgData(){
            this.$nextTick(function(){
                console.log("平均办理时长  @ @ @ @ @ @ @ @ @ @ @ @");
            })
        }
    },
    template:"<div class='handle-time-spot'>" +
        "<p class='handle-time-subtitle'>平均办理时长<span>(分钟)</span></p>" +

        "<div class='progress-bar-content'>"+

            '<div class="hotCount" v-if="AvgData" v-for="item in AvgData">' +
                '<div class="left">' +
                '<span>{{item.job_name}}</span>' +
                '</div>' +
                '<div class="middle"></div>' +
                '<div class="right">' +
                `<div><div :style="{ width: item.avgnum + '%'}"></div><span>{{item.pingjun}}</span></div>` +
                '</div>' +
            '</div>' +

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

// -------------------------------------------------------------------------------- 评价满意率统计  4
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

        '<div class="evaContainer"  v-show="!isEvaDetail">' +
            '<div class="eva" id="eva"></div>' +
            '<div class="evaBox">' +
                '<div class="evaItem">' +
                    '<div><div></div><span>非常满意</span></div>' +
                    '<div><div></div><span>满意</span></div>' +
                    '<div><div></div><span>基本满意</span></div>' +
                '</div>' +
                '<div class="evaItem">' +
                    '<div><div></div><span>不满意</span></div>' +
                    '<div><div></div><span>非常不满意</span></div>' +
                '</div>' +
            '</div>' +
        '</div>' +

        '<div class="evaDetail" v-show="isEvaDetail">' +
            '<div class="evaDetailItem evaDetailTitle"> <span>窗口</span> <span>姓名</span> <span>办理事项</span> <span>评价结果详情</span> <span class="evaCloseDetail" @click="evaCloseDetail">×</span></div>' +
            '<div class="evaBorder"></div>' +
            '<div class="evaItems">' +
                '<div class="evaDetailItem" v-for="(item,index) of evaData" :key="index"> <span>{{item.winNo}}</span> <span>{{item.wName}}</span> <span>{{item.bussName}}</span> <span>{{item.levelName}}</span> </div>' +
            '</div>' +
        '</div>' +

        "</div>" ,

    data:function () {
        return {
            satisfaction: {
                totalNum: "0%",
                veryBadNum: "0%",
                badNum: "0%",
                normGoodNum: "0%",
                goodNum: "0%",
                veryGoodNum: "0%",
                goodTotal: "0%",
                badTotal: "0%"
            },
            isEvaDetail: false,
            evaData: [],
            // evaData: [
            //     { winNo: "201", wName: "月半弯", bussName: "纳税", levelName: "满意（可以先受理后补材料月半弯月半弯）"},
            //     { winNo: "201", wName: "月半弯", bussName: "纳税", levelName: "满意（可以先受理后补材料月半弯月半弯）"},
            //     { winNo: "201", wName: "月半弯", bussName: "纳税", levelName: "满意"},
            //     { winNo: "201", wName: "月半弯", bussName: "纳税", levelName: "满意"},
            // ],
        }
    },
    created(){

    },
    mounted(){

    },
    methods:{

        // 评价 4 版 详情
        evaCloseDetail(){ this.isEvaDetail = !this.isEvaDetail},


        EvaluationDataMsg(Msg){
            console.log("毛光军  ---  评价满意度统计");
            console.log( Msg);
            let EvaluationData=Msg;
            let color=["","8fc31f","fff100","04a4df","fff100","f39700"];

// 非常不满意
            let veryBadNum = parseFloat(EvaluationData.veryBadNum/EvaluationData.totalNum*100);
            // this.satisfaction.veryBadNum = veryBadNum.toFixed(2) + "%";
            let veryBadNum_str = veryBadNum.toFixed(2) + "";                                        // 变成 字符串
            let veryBadNum_lastChar = veryBadNum_str.charAt(veryBadNum_str.length - 1);             // 倒数第一个 字符

            if(veryBadNum_lastChar == 0){
                let veryBadNum_single = veryBadNum.toFixed(1) + "";
                let veryBadNum_firstChar = veryBadNum_single.charAt(veryBadNum_single.length - 1);  // 倒数第二个字符
                (veryBadNum_firstChar == 0) ? (this.satisfaction.veryBadNum = parseInt(veryBadNum) + "%"):(this.satisfaction.veryBadNum = veryBadNum.toFixed(1) + "%")
            }else{this.satisfaction.veryBadNum = veryBadNum.toFixed(2) + "%"}
            if (EvaluationData.veryBadNum==0){this.satisfaction.veryBadNum = 0 + "%";}

// 不满意
            let badNum = parseFloat(EvaluationData.badNum/EvaluationData.totalNum*100);
            // this.satisfaction.badNum = badNum.toFixed(2) + "%";
            let badNum_str = veryBadNum.toFixed(2) + "";// 变成 字符串
            let badNum_lastChar = badNum_str.charAt(badNum_str.length - 1);// 倒数第一个 字符
            
            if(badNum_lastChar == 0){
                let badNum_single = badNum.toFixed(1) + "";
                let badNum_firstChar = badNum_single.charAt(badNum_single.length - 1);// 倒数第二个字符
                (badNum_firstChar == 0) ? (this.satisfaction.badNum = parseInt(badNum) + "%"):(this.satisfaction.badNum = badNum.toFixed(1) + "%")
            }else{ this.satisfaction.badNum = badNum.toFixed(2) + "%"}
            if (EvaluationData.badNum==0){ this.satisfaction.badNum = 0 + "%";}

// 基本满意
            let normGoodNum = parseFloat(EvaluationData.normGoodNum/EvaluationData.totalNum*100);
            // this.satisfaction.normGoodNum = normGoodNum.toFixed(2) + "%";
            let normGoodNum_str = normGoodNum.toFixed(2) + "";// 变成 字符串
            let normGoodNum_lastChar = normGoodNum_str.charAt(normGoodNum_str.length - 1);// 倒数第一个 字符

            if(normGoodNum_lastChar == 0){
                let normGoodNum_single = normGoodNum.toFixed(1) + "";
                let normGoodNum_firstChar = normGoodNum_single.charAt(normGoodNum_single.length - 1);// 倒数第二个字符
                (normGoodNum_firstChar == 0) ? (this.satisfaction.normGoodNum = parseInt(normGoodNum) + "%"):(this.satisfaction.normGoodNum = normGoodNum.toFixed(1) + "%")
            }else{ this.satisfaction.normGoodNum = normGoodNum.toFixed(2) + "%"}
            if (EvaluationData.normGoodNum==0){this.satisfaction.normGoodNum = 0 + "%";}

// 满意
            let goodNum = parseFloat(EvaluationData.goodNum/EvaluationData.totalNum*100);
            // this.satisfaction.goodNum = goodNum.toFixed(2) + "%";
            let goodNum_str = goodNum.toFixed(2) + "";// 变成 字符串
            let goodNum_lastChar = goodNum_str.charAt(goodNum_str.length - 1);// 倒数第一个 字符

            if(goodNum_lastChar == 0){
                let goodNum_single = goodNum.toFixed(1) + "";
                let goodNum_firstChar = goodNum_single.charAt(goodNum_single.length - 1);// 倒数第二个字符
                (goodNum_firstChar == 0) ? (this.satisfaction.goodNum = parseInt(goodNum) + "%"):(this.satisfaction.goodNum = goodNum.toFixed(1) + "%")
            }else{this.satisfaction.goodNum = goodNum.toFixed(2) + "%"}
            if (EvaluationData.goodNum==0){ this.satisfaction.goodNum = 0 + "%";}

// 非常满意
            let veryGoodNum = parseFloat(EvaluationData.veryGoodNum/EvaluationData.totalNum*100);
            // this.satisfaction.veryGoodNum = veryGoodNum.toFixed(2) + "%";
            let veryGoodNum_str = veryGoodNum.toFixed(2) + "";// 变成 字符串
            let veryGoodNum_lastChar = veryGoodNum_str.charAt(veryGoodNum_str.length - 1);// 倒数第一个 字符
            
            if(veryGoodNum_lastChar == 0){
                let veryGoodNum_single = veryGoodNum.toFixed(1) + "";
                let veryGoodNum_firstChar = veryGoodNum_single.charAt(veryGoodNum_single.length - 1);// 倒数第二个字符
                (veryGoodNum_firstChar == 0) ? (this.satisfaction.veryGoodNum = parseInt(veryGoodNum) + "%"):(this.satisfaction.veryGoodNum = veryGoodNum.toFixed(1) + "%")
            }else{this.satisfaction.veryGoodNum = veryGoodNum.toFixed(2) + "%"}
            if (EvaluationData.veryGoodNum==0){ this.satisfaction.veryGoodNum = 0 + "%";}

// 满意合计
            let goodTotal = parseFloat( (EvaluationData.veryGoodNum + EvaluationData.goodNum + EvaluationData.normGoodNum)/EvaluationData.totalNum*100 );
            // this.satisfaction.veryGoodNum = veryGoodNum.toFixed(2) + "%";
            let goodTotal_str = goodTotal.toFixed(2) + "";// 变成 字符串
            let goodTotal_lastChar = goodTotal_str.charAt(goodTotal_str.length - 1);// 倒数第一个 字符

            if(goodTotal_lastChar == 0){
                let goodTotal_single = goodTotal.toFixed(1) + "";
                let goodTotal_firstChar = goodTotal_single.charAt(goodTotal_single.length - 1);// 倒数第二个字符
                (goodTotal_firstChar == 0) ? (this.satisfaction.goodTotal = parseInt(goodTotal) + "%"):(this.satisfaction.goodTotal = goodTotal.toFixed(1) + "%")
            }else{this.satisfaction.goodTotal = goodTotal.toFixed(2) + "%"}
            if ( (EvaluationData.veryGoodNum + EvaluationData.goodNum + EvaluationData.normGoodNum) == 0 ){ this.satisfaction.goodTotal = 0 + "%";}

// 不满意合计
            let badTotal = parseFloat( (EvaluationData.badNum + EvaluationData.veryBadNum)/EvaluationData.totalNum*100 );
            // this.satisfaction.badNum = badNum.toFixed(2) + "%";
            let badTotal_str = badTotal.toFixed(2) + "";// 变成 字符串
            let badTotal_lastChar = badTotal_str.charAt(badTotal_str.length - 1);// 倒数第一个 字符
            
            if(badTotal_lastChar == 0){
                let badTotal_single = badTotal.toFixed(1) + "";
                let badTotal_firstChar = badTotal_single.charAt(badTotal_single.length - 1);// 倒数第二个字符
                (badTotal_firstChar == 0) ? (this.satisfaction.badTotal = parseInt(badTotal) + "%"):(this.satisfaction.badTotal = badTotal.toFixed(1) + "%")
            }else{ this.satisfaction.badTotal = badTotal.toFixed(2) + "%"}
            if ( (EvaluationData.badNum + EvaluationData.veryBadNum) == 0 ){ this.satisfaction.badTotal = 0 + "%";}
            // this.satisfaction = EvaluationData;


            // echarts 图
            var myEva = echarts.init( document.getElementById('eva'));

            myEva.on('click', (params) =>{ // 饼状图点击事件
                
                console.log("echarts 饼图点击事件 --------------------");
                console.log( params);
                if( params.color == "#3EC10F"){
                    console.log("非常满意")
                    for(var i=0; i<Msg.data.length; i++){
                        if(Msg.data[i].name == "veryGood"){
                            this.evaData = Msg.data[i].data
                        }
                    }
                    this.isEvaDetail = !this.isEvaDetail;
                }else if( params.color == "#33E5FF"){
                    console.log("满意")
                    for(var i=0; i<Msg.data.length; i++){
                        if(Msg.data[i].name == "good"){
                            this.evaData = Msg.data[i].data
                        }
                    }
                    this.isEvaDetail = !this.isEvaDetail;
                }else if( params.color == "#FCFF00"){
                    console.log("基本满意")
                    for(var i=0; i<Msg.data.length; i++){
                        if(Msg.data[i].name == "normGood"){
                            this.evaData = Msg.data[i].data
                        }
                    }
                    this.isEvaDetail = !this.isEvaDetail;
                }else if( params.color == "#B92C01"){
                    console.log("非常不满意")
                    for(var i=0; i<Msg.data.length; i++){
                        if(Msg.data[i].name == "veryBad"){
                            this.evaData = Msg.data[i].data
                        }
                    }
                    this.isEvaDetail = !this.isEvaDetail;
                }else if( params.color == "#FF8226"){
                    console.log("不满意")
                    for(var i=0; i<Msg.data.length; i++){
                        if(Msg.data[i].name == "bad"){
                            this.evaData = Msg.data[i].data
                        }
                    }
                    this.isEvaDetail = !this.isEvaDetail;
                }
            });

            myEva.setOption({
                // tooltip: {
                //   trigger: 'item',
                //   formatter: '{a} <br/>{b} : {c} ({d}%)'
                // },
                series: [
                    {
                        z: '0',
                        name:'好评总数',
                        type:'pie',
                        selectedMode: 'single',
                        radius: [0, '55%'],
                        center: ['25%', '50%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: true,
                            position : 'center',
                            color: '#FFF',
                            fontSize: 25,
                            lineHeight: 40,
                            fontWeight: 'bold',
                            textAlign:"center",
                        },
                        data:[
                            {
                              value: this.EvaluationData.veryGoodNum + this.EvaluationData.goodNum + this.EvaluationData.normGoodNum,
                              name: this.EvaluationData.veryGoodNum + this.EvaluationData.goodNum + this.EvaluationData.normGoodNum + ' 件' +'\n'+ this.satisfaction.goodTotal,
                              itemStyle: { color: '#052564' }
                            }
                        ]
                    },
                    {
                        z: '1',
                        name: '评价详情',
                        type: 'pie',
                        radius: ['55%', '65%'],
                        center: ['25%', '50%'],
                        avoidLabelOverlap: false,
                        label: {
                          show: false,
                        //   position: 'center',
                          position: 'inner',
                          color: 'red',
                          // fontSize: 18,
                        },
                        emphasis: {
                          label: {
                              show: false,
                              fontSize: '20',
                              fontWeight: 'bold'
                          }
                        },
                        labelLine: {
                          show: false
                        },
                        data: [
                            {value: this.EvaluationData.veryGoodNum,name: '非常满意'    +'\n\n'+ this.EvaluationData.veryGoodNum +'件 '+   this.satisfaction.veryGoodNum,  itemStyle: { color: '#3EC10F' }},// '非常满意' +  this.satisfaction.veryGoodNum
                            {value: this.EvaluationData.goodNum,    name: '满意'        +'\n\n'+ this.EvaluationData.goodNum     +'件 '+   this.satisfaction.goodNum,      itemStyle: { color: '#33E5FF' }},// '满意' +  this.satisfaction.goodNum
                            {value: this.EvaluationData.normGoodNum,name: '基本满意'    +'\n\n'+ this.EvaluationData.normGoodNum +'件 '+   this.satisfaction.normGoodNum,  itemStyle: { color: '#FCFF00' }},// '基本满意' +  this.satisfaction.normGoodNum
                        ]
                    },
                    {
                        z: '0',
                        name:'坏评总数',
                        type:'pie',
                        selectedMode: 'single',
                        radius: [0, '55%'],
                        center: ['75%', '50%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: true,
                            position : 'center',
                            color: '#FFF',
                            fontSize: 25,
                            lineHeight: 40,
                            fontWeight: 'bold',
                            textAlign:"center",
                        },
                        data:[
                            {
                              value: this.EvaluationData.veryBadNum + this.EvaluationData.badNum,
                              name: this.EvaluationData.veryBadNum + this.EvaluationData.badNum + ' 件' +'\n'+ this.satisfaction.badTotal,
                              itemStyle: { color: '#052564' }
                            }
                        ]
                    },
                    {
                        z: '1',
                        name: '评价详情',
                        type: 'pie',
                        radius: ['55%', '65%'],
                        center: ['75%', '50%'],
                        avoidLabelOverlap: false,
                        label: {
                          show: false,
                          position: 'center',
                        },
                        emphasis: {
                          label: {
                              show: false,
                              fontSize: '25',
                              fontWeight: 'bold'
                          }
                        },
                        labelLine: {
                          show: false
                        },
                        data: [
                            {value: this.EvaluationData.veryBadNum, name: '非常不满意'  +'\n\n'+ this.EvaluationData.veryBadNum  +'件 '+   this.satisfaction.veryBadNum,   itemStyle: { color: '#B92C01' }},// '非常不满意' +  this.satisfaction.veryBadNum
                            {value: this.EvaluationData.badNum,     name: '不满意'      +'\n\n'+ this.EvaluationData.badNum      +'件 '+   this.satisfaction.badNum,       itemStyle: { color: '#FF8226' }},// '不满意' +  this.satisfaction.badNum
                        ]
                    },
                ]
            });
        }
    },
    destroyed(){
    }
});

// -------------------------------------------------------------------------------- 部门业务办结统计  5
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
        "<p class='department-subtitle'>部门业务办理量统计</p>" +
        "<div class='progress-bar-content'>"+

            '<div class="hotCount" v-if="DepartmentJobData" v-for="item in DepartmentJobData">' +
                '<div class="left">' +
                    '<span>{{item.dpt_name}}</span>' +
                '</div>' +
                '<div class="middle"></div>' +
                '<div class="right">' +
                    `<div><div :style="{ width: item.dptnum + '%'}"></div><span>{{item.dpt_num}}</span></div>` +
                '</div>' +
            '</div>' +

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


// -------------------------------------------------------------------------------- 业务办理折线图  6
Vue.component("business-management",{
    props:{
        BusinessData:{
            // type: Object
            type: Array

        }
    },
    watch:{
        BusinessData(){
            this.$nextTick(function () {

                console.log( "取票数量、办结数量 ----------------------------------------------");
                console.log( this.BusinessData);
                // (7) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, __ob__: Observer]
                // fetchNum: 0
                // finishNum: 0
                // period: "08:00-09:00"
                var dateArr = [];
                for(var i=0; i<this.BusinessData.length; i++){
                    var splitArr = this.BusinessData[i].period.split("-");
                    dateArr.push( splitArr[0]+"\n"+"-"+"\n"+splitArr[1]);
                }
                console.log(dateArr);


                let BusinessDataObj = this.BusinessData
                let fetchNumArr = [];
                let finishNumArr = [];
                BusinessDataObj.forEach(item=>{
                    fetchNumArr.push(item.fetchNum);
                    finishNumArr.push(item.finishNum);
                });
                // console.log("毛光军  ---------------------------------------------------------------  业务办理趋势");

                var myTrend = echarts.init( document.getElementById('trend'));
                myTrend.setOption({

                    xAxis: {
                        type: 'category',
                        // boundaryGap: false,
                        // data: ['08:30-09:30', '09:30-10:30', '10:30-11:30', '11:30-12:30', '12:30-13:30', '13:30-14:30', '14:30-15:30', '15:30-16:30', '16:30-17:30'],
                        // data: [
                        //     '08:30'+'\n'+'-' +'\n'+'09:30', '09:30'+'\n'+'-' +'\n'+'10:30', '10:30'+'\n'+'-' +'\n'+'11:30', 
                        //     '11:30'+'\n'+'-' +'\n'+'12:30', '12:30'+'\n'+'-' +'\n'+'13:30', '13:30'+'\n'+'-' +'\n'+'14:30', 
                        //     '14:30'+'\n'+'-' +'\n'+'15:30', '15:30'+'\n'+'-' +'\n'+'16:30', '16:30'+'\n'+'-' +'\n'+'17:30'
                        // ],
                        // data: [
                        //     '08:00'+'\n'+'-' +'\n'+'09:00', '09:00'+'\n'+'-' +'\n'+'10:00', '10:00'+'\n'+'-' +'\n'+'11:00', 
                        //     '11:00'+'\n'+'-' +'\n'+'12:00', '12:00'+'\n'+'-' +'\n'+'13:00', '13:00'+'\n'+'-' +'\n'+'14:00', 
                        //     '14:00'+'\n'+'-' +'\n'+'15:00', '15:00'+'\n'+'-' +'\n'+'16:00', '16:00'+'\n'+'-' +'\n'+'17:00'
                        // ],
                        data: dateArr,
                        "axisLine":{       //x轴
                        show:false
                        },
                        "axisTick":{       //y轴刻度线
                        show: false
                        },
                        "splitLine": {     //网格线
                            lineStyle:{
                                type:'dashed',    //设置网格线类型 dotted：虚线   solid:实线
                                color: 'rgba(41,111,170,1)'
                            },
                            show:true //隐藏或显示
                        },
                        axisLabel: {
                        show: true,
                            textStyle: {
                            color: '#c3dbff',  //更改坐标轴文字颜色
                            fontSize : 14      //更改坐标轴文字大小
                            }
                        },
                    },
                    yAxis: {
                        type: 'value',
                        "axisLine":{       //y轴
                        show:false,
                        },
                        "axisTick":{       //y轴刻度线
                        show:false
                        },
                        "splitLine": {     //网格线
                        show: false
                        },
                        axisLabel: {
                        show: true,
                            textStyle: {
                            color: '#c3dbff',  //更改坐标轴文字颜色
                            fontSize : 14      //更改坐标轴文字大小
                            }
                        },
                    },
                    series: [
                        {
                            data: fetchNumArr,// 取票数量  -----------------------
                            type: 'line',
                            label: {            // 折点显示数字
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            areaStyle: {},
                            itemStyle: {
                                color: 'rgba(255, 187, 0, 1)'
                            },
                            areaStyle: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    { offset: 0,color: 'rgba(255, 187, 0, 1)'},
                                    // { offset: 0.8,color: 'rgba(255, 187, 0,0)'},
                                    { offset: 1,color: 'rgba(255, 187, 0, 0)'},
                                ])
                            },
                        },
                        {
                            data: finishNumArr,// 办结数量  --------------------------------------
                            type: 'line',
                            label: {            // 折点显示数字
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            areaStyle: {},
                            itemStyle: {
                                color: 'rgba(40, 255, 106, 1)'
                            },
                            areaStyle: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    { offset: 0,color: 'rgba(6, 179, 1, 1)'},
                                    // { offset: 0.8,color: 'rgba(0, 255, 106,0)'},
                                    { offset: 1,color: 'rgba(0, 255, 106, 0)'}
                                ])
                            },
                        }
                    ],
                });
            })
        }
    },
    template:"<div class='business-manage'>" +
        "<p class='business-subtitle'>业务办理量趋势</p>" +


        '<div class="trend" ref="trend" id="trend"></div>' +
        '<div class="trendEnd">' +
            '<div class="item">' +
                '<div class="getTicket"></div>' +
                '<span>取票数量</span>' +
            '</div>' +
            '<div class="item">' +
                '<div class="handleEnd"></div>' +
                '<span>办结数量</span>' +
            '</div>' +
        '</div>' +


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


// -------------------------------------------------------------------------------- 排队叫号统计  7
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


            '<div class="line" v-if="QueuingStatistics">' +
                '<div class="top">' +
                    '<div class="left"><div class="img"></div></div>' +
                    '<div class="right">' +
                        '<span>取号人数：</span>' +
                        '<span>{{QueuingStatistics.queuing_num ? QueuingStatistics.queuing_num : 0}}</span>' +
                    '</div>' +
                '</div>' +
                '<div class="middle">' +
                    '<div class="left"><div class="img"></div></div>' +
                    '<div class="right">' +
                        '<div class="first">' +
                            '<div><div class="img"></div></div><span class="title">现场：</span><span class="count">{{QueuingStatistics.on_site_num ? QueuingStatistics.on_site_num : 0}}</span>' +
                        '</div>' +
                        '<div class="first">' +
                            '<div><div class="img"></div></div><span class="title">微信：</span><span class="count">{{QueuingStatistics.wechat_num ? QueuingStatistics.wechat_num : 0}}</span>' +
                        '</div>' +
                        '<div class="first">' +
                            '<div><div class="img"></div></div><span class="title">平台：</span><span class="count">{{QueuingStatistics.net_num ? QueuingStatistics.net_num : 0}}</span>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="top bottom">' +
                    '<div class="left"><div class="img"></div></div>' +
                    '<div class="right">' +
                        '<span>等待人数：</span>' +
                        '<span>{{QueuingStatistics.wait_num ? QueuingStatistics.wait_num : 0}}</span>' +
                    '</div>' +
                '</div>' +
            '</div>'+


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



// -------------------------------------------------------------------------------- 实时预警信息  8
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
                        "{{item.ticketNo}}"  +"&nbsp"+
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



// -------------------------------------------------------------------------------- 信用数据监察  9
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
                        "<th>涉及审批编号</th>" +
                        "<th width='100'>企业名称(申报人)</th>" +
                        "<th width='120'>失信日期</th>" +
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




// -------------------------------------------------------------------------------- 数据质量监察  10
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
                    "&nbsp;<b>注册号/统一社会信用代码：</b>" +
                    "{{item.regcode}}<br />" +
                    "&nbsp;<b>单位名称：</b>" +
                    "{{item.unitname}}<br />&nbsp;<b>单位住所：</b>" +
                    "{{item.unitaddress}}<br />&nbsp;" +
                    "<b>问题数据：</b>" +
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


// -------------------------------------------------------------------------------- 最多跑一次数据预警  11
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
        "<p class='most-once-subtitle'>“最多跑一次”数据预警</p>" +
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
                    "<tr v-if='MostOnce' v-for='item in MostOnce' style='text-align:center'>" +
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





