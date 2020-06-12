
let DefaultHtml = "<div class='component-container'>\n" +
    "<window-list v-bind:TableData='windowsTableData'></window-list>" +
    "<div style='margin:0 auto;height: 455px;width:4500px;'>" +
    "<hot-spot v-bind:SpotData='hotData'></hot-spot>" +
    "<avg-handle-time v-bind:AvgData='AvgWorkData'></avg-handle-time>" +
    "<avg-evaluation v-bind:EvaluationData='EvaluationData'></avg-evaluation>" +
    "<department-job v-bind:DepartmentJobData='DepartmentData'></department-job>" +
    "<business-management v-bind:BusinessData='businessManagement'></business-management>" +
    "<queuing-statistics v-bind:QueuingStatistics='QueuingStatisticsData'></queuing-statistics>" +
    "<warning v-bind:WarningData ='WarningDataArr'></warning>" +
    "<credit v-bind:CreditData='CreditData'></credit>" +
    "<data-quality v-bind:QualityData='DataQuality'></data-quality>" +
    "<most-once v-bind:MostOnce='MostOnceData'></most-once>" +
    "</div>" +
    "</div>";


var ComponentDefault=Vue.component("ComponentDefault",{
    template:DefaultHtml,
    data:function () {
        return {
            socket:null,                  //socket对象
            // alertIndex:0,                 //弹框id
            // alertMsg:"连接中....",         //提示内容
            // alertHtmlObj:null,            //弹框元素dom对象
            // alertHtml:null,               //弹框html
            // retryNum:0,                    //重试次数
            windowsTableData:[],           //窗口运营数据
            hotData:[],                    //热点数据
            AvgWorkData:[],                   //业务办理平均
            DepartmentData:[],                //部门办结统计
            EvaluationData:{},              //评价数据
            QueuingStatisticsData:{},       //排队数据统计
            businessManagement:{},         //业务办理量趋势
            WarningDataArr:[],               //实时预警信息
            DataQuality:[],                  //数据质量监察
            CreditData:[],                    //信用监察
            MostOnceData:[],                  //最多跑一次监察
            message:null,
            flag:null,
        }
    },
    created(){
        //  this.getMessage();
    },
    mounted(){      // 初始化
        this.init();
        this.getMessage();
    },
    methods:{
        init:function () {
            //this.htmlAlert();
            if(typeof(WebSocket) === "undefined"){
                alert("您的浏览器不支持socket")
            }else{
                // 实例化socket
                // let SocketObject = new WebSocket("ws://188.1.1.252:5908")
                let SocketObject = new WebSocket("ws://188.1.1.250:5908")

                // 监听socket连接
                SocketObject.onopen = this.open()
                // 监听socket错误信息
                SocketObject.onerror = this.error

                // 监听socket消息
                SocketObject.onmessage = this.getMessage

                SocketObject.onclose = this.close
                this.socket = SocketObject
            }
        },

        open:function() {
           // this.alertMsg = "连接成功"
            console.log("连接成功")
            // this.EditStatusMessage(1)
            // this.AlertClose();

        },

        error:function(){
            // this.init()
            // this.retryNum=this.retryNum+1
            // this.EditStatusMessage(3,this.retryNum);
            //
            // console.log(this.retryNum)
            console.log("socket连接失败")
        },

        compare(attr) {                 //排序
            return function(a,b){
                var val1 = a[attr];
                var val2 = b[attr];
                return val2 - val1;
            }
        },

        getMessage:function(msg) {      //接收服务器发来的消息

            // //平均办理时长
            // let returnJsona = {
            //     "data":[
            //         {
            //             job_name:"视窗组内小暖不断奴对你讲",        //部门名称
            //             pingjun:22           //数量
            //         },{
            //             job_name:"bumen1",        //部门名称
            //             pingjun:0           //数量
            //         },{
            //             job_name:"bumen2",        //部门名称
            //             pingjun:16           //数量
            //         },{
            //             job_name:"bumen4",        //部门名称
            //             pingjun:22           //数量
            //         },
            //     ]
            // }
            //
            // let avg={
            //     job_name:"",
            //     pingjun:0,
            //     avgnum:0,
            // };
            // let avgArr= [];
            // returnJsona.data.forEach(item=>{
            //     avg = {}
            //     if (item.pingjun !==0){
            //         avg.job_name = item.job_name;
            //         avg.pingjun = item.pingjun;
            //         avg.avgnum = item.pingjun > 90 ? 90 : item.pingjun;
            //         avgArr.push(avg)
            //     }
            // });
            // avgArr.sort(this.compare('pingjun'))
            //
            // console.log("999999999999")
            // console.log(avgArr)
            // this.AvgWorkData=avgArr

            //  //实时预警信息
            //  let returnJsona = {
            //      "warnTime":"16:31:03",
            //      "winName":"205窗口",
            //      "bussType":"市场准入",
            //      "bussItem":"设立登记",
            //      "warnReason":"业务办理超时",
            //  }
            //  let returnJsonaa = {
            //      "warnTime":"16:31:03",
            //      "winName":"6666窗口",
            //      "bussType":"市场准入",
            //      "bussItem":"设立登记",
            //      "warnReason":"业务办理超时",
            //  }
            //
            //  this.WarningDataArr.push(returnJsona);
            //  this.WarningDataArr.push(returnJsonaa);
            //  console.log("7777777777777")
            //  console.log(this.WarningDataArr)

            let returnJson = [{
                "credit_num":201905120001,          //审批编号
                "credit_name":"英帅",          //企业名称(申报人)
                "lost_credit_date":"2019-05-12",     //失信日期
                "reason":"材料造假",              //失信原因
            },{
                "credit_num":201905090005,          //审批编号
                "credit_name":"王紫璋",          //企业名称(申报人)
                "lost_credit_date":"2019-05-09",     //失信日期
                "reason":"超时未提供容缺材料",              //失信原因
            }]
            this.CreditData = returnJson;
            //实时预警
            // let returnJsonx = {
            //     "warnTime":201905120001,          //审批编号
            //     "winName":"英帅cdvdvdv",          //企业名称(申报人)
            //     "bussType":"2019-05-12",     //失信日期
            //     "bussItem":"材料造假dcdscsdc",              //失信原因
            //     "warnReason":"材料造假",              //失信原因
            // }
            //
            // this.WarningDataArr.push(returnJsonx)


            /**
             * 主要解决服务器返回的数据被分割的问题
             */
            let bodystr = msg.data;
            let len = bodystr.length;     //去字符串首尾的",让可以转成json对象
            bodystr = bodystr.slice(0, len-1)
            let body = JSON.parse(bodystr);

            if(body){
                switch(body.cmd){      //组件数据分发
                    case "windows_list":         //窗口事项
                        console.log("999999999999")
                        console.log(body)
                        if (body.method== "addnew"){
                            console.log(body)
                            if (this.windowsTableData.length==0){
                                this.windowsTableData.push(body.data)
                            }else{
                                for (let i=0;i<this.windowsTableData.length;i++){
                                    if (this.windowsTableData[i].winId !== body.data.winId){
                                        this.windowsTableData.push(body.data)
                                        break;
                                    }
                                }
                            }
                        } else if(body.method== "update"){
                            for (let i=0;i<this.windowsTableData.length;i++){
                                if (this.windowsTableData[i].winId == body.data.winId){
                                    this.windowsTableData.splice(i,1,body.data)
                                    break;
                                }
                            }
                            this.windowsTableData.sort(this.compare('job_num'))

                        } else if (body.method== "remove"){
                            for (let i=0;i<this.windowsTableData.length;i++){
                                if (this.windowsTableData[i].winId == body.data.winId){
                                    this.windowsTableData.splice(i,1)
                                    break;
                                }
                            }

                        }
                        break;

                    case "hot_list":       //热点事项
                        let hot={
                            job_name:"",        //部门名称
                            hot_num:0,           //数量
                            runnum:0,           //所占比例
                        };
                        let hotArr= [];
                        body.data.forEach(item=>{
                            hot = {}
                            if (item.hot_num !==0){
                                hot.job_name = item.job_name;
                                hot.hot_num = item.hot_num;
                                hot.runnum = item.hot_num > 90 ? 90 : item.hot_num;
                                hotArr.push(hot)
                            }
                        });
                        hotArr.sort(this.compare('hot_num'))
                        this.hotData=hotArr

                        break;

                    case "busstrend":       // 业务办理趋势
                        this.businessManagement = body.data
                        break;

                    case "avg_list":        //平均办理时长
                        console.log("999999999999")
                        console.log(body)
                        let avg={
                            job_name:"",
                            pingjun:0,
                            avgnum:0,
                        };
                        let avgArr= [];
                        body.data.forEach(item=>{
                            avg = {}
                            if (item.pingjun !==0){
                                avg.job_name = item.job_name;
                                avg.pingjun = item.pingjun;
                                avg.avgnum = item.pingjun > 90 ? 90 : item.pingjun;
                                avgArr.push(avg)
                            }
                        });
                        avgArr.sort(this.compare('pingjun'))
                        this.AvgWorkData=avgArr
                        break;

                    case "pingjiastat":   //评价满意度
                        this.EvaluationData = body
                        break;

                    case "bumenstat":   //部门业务统计

                        let dpt={
                            dpt_name:"",
                            dpt_num:0,
                            dptnum:0,
                        };
                        let dptArr= [];
                        body.data.forEach(item=>{
                            dpt = {}
                            if (item.dpt_num !==0){
                                dpt.dpt_name = item.dpt_name;
                                dpt.dpt_num = item.dpt_num;
                                dpt.dptnum = item.dpt_num > 90 ? 90 : item.dpt_num;
                                dptArr.push(dpt)
                            }
                        });
                        dptArr.sort(this.compare('dpt_num'))
                        this.DepartmentData=dptArr

                        break;
                    case "queuedata":    //排队叫号统计
                        this.QueuingStatisticsData=body
                        break;

                    case "warndata":    //实时预警
                        // this.WarningDataArr=body.data
                        console.log("777777777hhhhhhh")
                        console.log(body.data)
                        this.WarningDataArr.push(body.data)
                        break;

                    case "credit_data":    //信用数据监测
                        this.CreditData=body.data
                        break;

                    case "data_quality":   //数据质量监测
                        this.DataQuality=body.data
                        break;

                    case "most_once":     //最多跑一次
                        this.MostOnceData = body.data
                        break;
                }
            }
        },


        close:function() {
            console.log("网络断开")
            // this.error()
            // this.init()
            // this.retryNum=this.retryNum+1
            // this.EditStatusMessage(3,this.retryNum);
        },

        // htmlAlert:function(){
        //     let msgHtml = "<span style='color: #0C0C0C'>"+this.alertMsg+"</span>"
        //
        //     this.alertIndex=layer.msg(msgHtml,
        //         {
        //             icon:16,
        //             shade:0.01,
        //             time:1000000,
        //             success:this.AlerHtmlObjFun
        //         })
        // },
        //
        // AlertClose:function(){     //关闭弹窗
        //     layer.close(this.alertIndex)
        // },
        //
        // AlerHtmlObjFun:function(layerObj){
        //     this.alertHtml=layerObj.find('.layui-layer-content')[0]
        // },
        //
        // EditStatusMessage:function(status,nu){
        //     let alertMessage = "<span style='color: #0C0C0C'>"+this.alertMsg+"</span>"
        //
        //     switch(status){
        //         case 1:
        //             $(this.alertHtml).html("<i class='layui-layer-ico layui-layer-ico1'></i>"+alertMessage);
        //             break;
        //         case 2:
        //             $(this.alertHtml).html("<i class='layui-layer-ico layui-layer-ico2'></i>"+alertMessage);
        //             break;
        //         case 3:
        //             $(this.alertHtml).html("<i class='layui-layer-ico layui-layer-ico7'></i><span style='color: #0C0C0C'>连接失败,正在第"+nu+"次重试...</span>");
        //             break;
        //         default:
        //             $(this.alertHtml).html("<i class='layui-layer-ico layui-layer-ico16'></i>"+alertMessage+"");
        //             break;
        //     }
        // }
    },
    destroyed(){       // 销毁监听
        this.socket.onclose = this.close
    }
});
