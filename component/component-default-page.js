
let DefaultHtml = "<div class='component-container'>\n" +
    "<window-list v-bind:TableData='windowsStatus' v-bind:WinNum='winNum'></window-list>" +
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
            socket:null,            // socket对象

            windowsStatus:[],       // 窗口运营数据
            windowsTable:[],        // 窗口运营数据
            wintimer: null,         // 窗口数据定时器
            testNum: 0,             // 调用 周期函数 次数
            // windowsNoTable : [], // 窗口运营数据--无叫号时间
            // windowsYesTable:[],  // 窗口运营数据--有叫号时间

            heartSend: null,    // 心跳重连 时钟函数
            heartReply: null,   // 心跳重连 时钟函数
            testTime: null,     // 测试用 读秒

			winNum:0,
            hotData:[],                    //热点数据
            AvgWorkData:[],                   //业务办理平均
            DepartmentData:[],                //部门办结统计
            EvaluationData:{},              //评价数据
            QueuingStatisticsData:{},       //排队数据统计
            businessManagement:[],         //业务办理量趋势
            WarningDataArr:[],               //实时预警信息
            DataQuality:[],                  //数据质量监察
            CreditData:[],                    //信用监察
            MostOnceData:[],                  //最多跑一次监察
            message:null,
            flag:null,


            isConnected: false,     // 心跳 正常
            beginTime: 0,           // 心跳 开始时间
            index: 0,
            
            heartRecv: false,



            // windowsTable : [
            //     {winId :1,  window: "1",  name:"看过山", department:"看过山和大海", job_num:"12", job:"看过山和大海，穿过人山和人海,看过山和大海，穿过人山和人海",queue_time:"08:00:30",call_time:"08:00:30",over_time:"08:00:30",opin_status:"08:00:30",wait_time:"08:00:30",work_time:"08:00:30"},
            //     {winId :2,  window: "2",  name:"看过山", department:"看过山和大海", job_num:"12", job:"看过山和大海，穿过人山和人海",queue_time:"08:00:30",call_time:"08:00:30",over_time:"08:00:30",opin_status:"08:00:30",wait_time:"08:00:30",work_time:"08:00:30"},
            //     {winId :3,  window: "3",  name:"看过山", department:"看过山和大海", job_num:"12", job:"看过山和大海，穿过人山和人海",queue_time:"08:00:30",call_time:"08:00:30",over_time:"08:00:30",opin_status:"08:00:30",wait_time:"08:00:30",work_time:"08:00:30"},
            //     {winId :4,  window: "4",  name:"看过山", department:"看过山和大海", job_num:"12", job:"看过山和大海，穿过人山和人海",queue_time:"08:00:30",call_time:"08:00:30",over_time:"08:00:30",opin_status:"08:00:30",wait_time:"08:00:30",work_time:"08:00:30"},
            //     {winId :5,  window: "5",  name:"看过山", department:"看过山和大海", job_num:"12", job:"看过山和大海，穿过人山和人海",queue_time:"08:00:30",call_time:"08:00:30",over_time:"08:00:30",opin_status:"08:00:30",wait_time:"08:00:30",work_time:"08:00:30"},

            //     {winId :6,  window: "6",  name:"看过山", department:"看过山和大海", job_num:"12", job:"看过山和大海，穿过人山和人海",queue_time:"08:00:30",call_time:"08:00:30",over_time:"08:00:30",opin_status:"08:00:30",wait_time:"08:00:30",work_time:"08:00:30"},
            //     {winId :7,  window: "7",  name:"看过山", department:"看过山和大海", job_num:"12", job:"看过山和大海，穿过人山和人海",queue_time:"08:00:30",call_time:"08:00:30",over_time:"08:00:30",opin_status:"08:00:30",wait_time:"08:00:30",work_time:"08:00:30"},
            //     {winId :8,  window: "8",  name:"看过山", department:"看过山和大海", job_num:"12", job:"看过山和大海，穿过人山和人海",queue_time:"08:00:30",call_time:"08:00:30",over_time:"08:00:30",opin_status:"08:00:30",wait_time:"08:00:30",work_time:"08:00:30"},
            //     {winId :9,  window: "9",  name:"看过山", department:"看过山和大海", job_num:"12", job:"看过山和大海，穿过人山和人海",queue_time:"08:00:30",call_time:"08:00:30",over_time:"08:00:30",opin_status:"08:00:30",wait_time:"08:00:30",work_time:"08:00:30"},
            //     {winId :10,  window: "10",  name:"看过山", department:"看过山和大海", job_num:"12", job:"看过山和大海，穿过人山和人海",queue_time:"08:00:30",call_time:"08:00:30",over_time:"08:00:30",opin_status:"08:00:30",wait_time:"08:00:30",work_time:"08:00:30"},

            //     {winId :11,  window: "11",  name:"看过山", department:"看过山和大海", job_num:"12", job:"看过山和大海，穿过人山和人海",queue_time:"08:00:30",call_time:"08:00:30",over_time:"08:00:30",opin_status:"08:00:30",wait_time:"08:00:30",work_time:"08:00:30"},
            //     {winId :12,  window: "12",  name:"看过山", department:"看过山和大海", job_num:"12", job:"看过山和大海，穿过人山和人海",queue_time:"08:00:30",call_time:"08:00:30",over_time:"08:00:30",opin_status:"08:00:30",wait_time:"08:00:30",work_time:"08:00:30"},
            //     {winId :13,  window: "13",  name:"看过山", department:"看过山和大海", job_num:"12", job:"看过山和大海，穿过人山和人海",queue_time:"08:00:30",call_time:"08:00:30",over_time:"08:00:30",opin_status:"08:00:30",wait_time:"08:00:30",work_time:"08:00:30"},
            //     {winId :14,  window: "14",  name:"看过山", department:"看过山和大海", job_num:"12", job:"看过山和大海，穿过人山和人海",queue_time:"08:00:30",call_time:"08:00:30",over_time:"08:00:30",opin_status:"08:00:30",wait_time:"08:00:30",work_time:"08:00:30"},
            //     {winId :15,  window: "15",  name:"看过山", department:"看过山和大海", job_num:"12", job:"看过山和大海，穿过人山和人海",queue_time:"08:00:30",call_time:"08:00:30",over_time:"08:00:30",opin_status:"08:00:30",wait_time:"08:00:30",work_time:"08:00:30"},

            //     {winId :16,  window: "16",  name:"看过山", department:"看过山和大海", job_num:"12", job:"看过山和大海，穿过人山和人海",queue_time:"08:00:30",call_time:"08:00:30",over_time:"08:00:30",opin_status:"08:00:30",wait_time:"08:00:30",work_time:"08:00:30"},
            //     {winId :17,  window: "17",  name:"看过山", department:"看过山和大海", job_num:"12", job:"看过山和大海，穿过人山和人海",queue_time:"08:00:30",call_time:"08:00:30",over_time:"08:00:30",opin_status:"08:00:30",wait_time:"08:00:30",work_time:"08:00:30"},
            //     {winId :18,  window: "18",  name:"看过山", department:"看过山和大海", job_num:"12", job:"看过山和大海，穿过人山和人海",queue_time:"08:00:30",call_time:"08:00:30",over_time:"08:00:30",opin_status:"08:00:30",wait_time:"08:00:30",work_time:"08:00:30"},
            //     {winId :19,  window: "19",  name:"看过山", department:"看过山和大海", job_num:"12", job:"看过山和大海，穿过人山和人海,看过山和大海，穿过人山和人海",queue_time:"08:00:30",call_time:"08:00:30",over_time:"08:00:30",opin_status:"08:00:30",wait_time:"08:00:30",work_time:"08:00:30"},
            //     {winId :20,  window: "20",  name:"看过山", department:"看过山和大海", job_num:"12", job:"看过山和大海，穿过人山和人海",queue_time:"08:00:30",call_time:"08:00:30",over_time:"08:00:30",opin_status:"08:00:30",wait_time:"08:00:30",work_time:"08:00:30"},

            //     {winId :21,  window: "21",  name:"看过山", department:"看过山和大海", job_num:"12", job:"看过山和大海，穿过人山和人海",queue_time:"08:00:30",call_time:"08:00:30",over_time:"08:00:30",opin_status:"08:00:30",wait_time:"08:00:30",work_time:"08:00:30"},
            //     {winId :22,  window: "22",  name:"看过山", department:"看过山和大海", job_num:"12", job:"看过山和大海，穿过人山和人海",queue_time:"08:00:30",call_time:"08:00:30",over_time:"08:00:30",opin_status:"08:00:30",wait_time:"08:00:30",work_time:"08:00:30"},
            //     {winId :23,  window: "23",  name:"看过山", department:"看过山和大海", job_num:"12", job:"看过山和大海，穿过人山和人海",queue_time:"08:00:30",call_time:"08:00:30",over_time:"08:00:30",opin_status:"08:00:30",wait_time:"08:00:30",work_time:"08:00:30"},
            //     {winId :24,  window: "24",  name:"看过山", department:"看过山和大海", job_num:"12", job:"看过山和大海，穿过人山和人海",queue_time:"08:00:30",call_time:"08:00:30",over_time:"08:00:30",opin_status:"08:00:30",wait_time:"08:00:30",work_time:"08:00:30"},
            //     {winId :25,  window: "25",  name:"看过山", department:"看过山和大海", job_num:"12", job:"看过山和大海，穿过人山和人海",queue_time:"08:00:30",call_time:"08:00:30",over_time:"08:00:30",opin_status:"08:00:30",wait_time:"08:00:30",work_time:"08:00:30"},

            //     {winId :26,  window: "26",  name:"看过山", department:"看过山和大海", job_num:"12", job:"看过山和大海，穿过人山和人海",queue_time:"08:00:30",call_time:"08:00:30",over_time:"08:00:30",opin_status:"08:00:30",wait_time:"08:00:30",work_time:"08:00:30"},
            //     {winId :27,  window: "27",  name:"看过山", department:"看过山和大海", job_num:"12", job:"看过山和大海，穿过人山和人海",queue_time:"08:00:30",call_time:"08:00:30",over_time:"08:00:30",opin_status:"08:00:30",wait_time:"08:00:30",work_time:"08:00:30"},
            //     {winId :28,  window: "28",  name:"看过山", department:"看过山和大海", job_num:"12", job:"看过山和大海，穿过人山和人海",queue_time:"08:00:30",call_time:"08:00:30",over_time:"08:00:30",opin_status:"08:00:30",wait_time:"08:00:30",work_time:"08:00:30"},
            //     {winId :29,  window: "29",  name:"看过山", department:"看过山和大海", job_num:"12", job:"看过山和大海，穿过人山和人海",queue_time:"08:00:30",call_time:"08:00:30",over_time:"08:00:30",opin_status:"08:00:30",wait_time:"08:00:30",work_time:"08:00:30"},
            //     {winId :30,  window: "30",  name:"看过山", department:"看过山和大海", job_num:"12", job:"看过山和大海，穿过人山和人海",queue_time:"08:00:30",call_time:"08:00:30",over_time:"08:00:30",opin_status:"08:00:30",wait_time:"08:00:30",work_time:"08:00:30"},
            // ]

            // "<div id='window-data'>"+
            //     "<ul class='roll__list'>"+
            //         "<li v-if='TableData' v-for='item in TableData'>"+
            //             "<div style='width:78px'><span>{{item.window}}</span></div>"+
            //             "<div style='width:95px'><span>{{item.name}}</span></div>"+
            //             "<div style='width:127px'><span>{{item.department}}</span></div>"+
            //             "<div style='width:78px'><span>{{item.job_num}}</span></div>"+
            //             "<div style='width:162px'><span>{{item.job}}</span></div>"+
            //             "<div style='width:110px'><span>{{item.queue_time}}</span></div>"+
            //             "<div style='width:116px'><span>{{item.call_time}}</span></div>"+
            //             "<div style='width:115px'><span>{{item.over_time}}</span></div>"+
            //             "<div style='width:100px'><span>{{item.opin_status}}</span></div>"+
            //             "<div style='width:114px'><span>{{item.wait_time}}</span></div>"+
            //             "<div style='width:114px'><span>{{item.work_time}}</span></div>"+
            //         "</li>"+
            //     "</ul>"+
            // "</div>" +
        }
    },
    created(){
        //  this.getMessage();
    },
    mounted(){      // 初始化
        this.init();
        //this.getMessage();
		
    },
    methods:{


        init:function () {

            console.log("开始连接服务器 ……………… init");
            var i = 1;
            clearInterval( this.testTime)
            this.testTime = setInterval( function(){ console.log(i++ +" 秒"); }, 1000);

            if(typeof(WebSocket) === "undefined"){
                alert("您的浏览器不支持socket")
            }else{
                // 实例化socket
                // let SocketObject = new WebSocket("ws://188.1.1.250:5908");
                //let SocketObject = new WebSocket("ws://192.168.0.198:5908");
                // let SocketObject = new WebSocket("ws://192.168.0.201:5908");
                let SocketObject = new WebSocket("ws://192.168.0.227:5908");
                // let SocketObject = new WebSocket("ws://192.168.5.7:5908")


                SocketObject.onopen     = this.open()       // 监听socket连接
                SocketObject.onerror    = this.error        // 监听socket错误信息
                SocketObject.onmessage  = this.getMessage   // 监听socket消息

                this.socket = SocketObject;
            }
        },

// ------------------------------------------------------------------------------  onopen 事件，用于心跳检测、心跳重连  1
        open:function() {

            console.log("连接成功");
            this.isConnected = true;                // 心跳
            this.beginTime= new Date().getTime();   // 开始时间 - 当前毫秒数
            this.start();
            this.startWindowUpdate();

            // ---------------------------------------------------------------------------------------------------------------------------- 毛光军 - 心跳重连
            // console.log("定时器 000000000000000000");
            this.heartBeat();
        },

        // -------------------------------------------------------------------------------------------------------------------------------- 毛光军 - 心跳重连
        
        heartBeat(){

            clearTimeout( this.heartSend);
            clearTimeout( this.heartReply);

            var self = this;
            this.heartSend = setTimeout( function(){        // 发送消息 - 心跳 -时钟函数 1

                console.log("外层定时 10 秒发送 ………………");

                self.heartRecv = false;
                var msgString = "{'cmd' : 'heartbeat'}"
                self.socket.send( msgString );

                self.heartReply = setTimeout( function(){

                    console.log("内层定时 4 秒判断 ………………");

                    self.socket.close();
                    self.init();

                },  4000);

            }, 10000);
        },
        

        start(){

            // console.log("进入心跳前");
            //var self = this;
            //clearInterval(time);    // 清除 时钟函数
            //var time = setInterval(function(){

            //    self.timerfun();    // 1 分钟调 1 次
            //}, 60000);
        },

        timerfun(){

                // console.log("进入心跳");
                //if (this.socket.readyState != 1){
                 //   this.isConnected = false;
                //}
                //let timenow = new Date().getTime();
               //if ( this.isConnected == false && timenow - this.beginTime > 300000){   // 大于 5 分钟 --- 6 分钟后重连
               //         this.init();
                //}
                //if (this.isConnected==true){

                    // console.log( this.isConnected);
                //    this.isConnected = true;
                //    this.beginTime = new Date().getTime();
               // }

                // this.socket.send("123");
        },
// ------------------------------------------------------------------------------  onopen 事件，用于心跳检测、心跳重连  1

// ------------------------------------------------------------------------------  onerror 事件，打印错误信息   2
        error:function(){
            // console.log("  ---------------------------------  启动 error 事件");
            // clearTimeout( this.heartReply);
            // clearTimeout( this.heartSend);
            this.socket.close();
            this.init();
        },
// ------------------------------------------------------------------------------  onerror 事件，打印错误信息   2
        close:function() {
            // console.log("  ---------------------------------  启动 close 事件");
            // clearTimeout( this.heartReply);
            // clearTimeout( this.heartSend);
        },


        compare(attr) {                 //排序
            return function(a,b){
                var val1 = a[attr];
                var val2 = b[attr];
                return val2 - val1;
            }
        },
        compares(attr) {                 //排序
            return function(a,b){
                var val1 = a[attr];
                var val2 = b[attr];
                return val1 - val2;
            }
        },
		
        startWindowUpdate(){

            this.testNum ++
            console.log("触发 ……………… "+ this.testNum);

            var self = this;
            clearInterval(this.wintimer);
            
            this.wintimer = setInterval(function(){

                console.log("第 1 窗口 周期函数 ……………………  1");
			
			    let size = self.windowsTable.length
            

				let windowLingShi = [];
	
				for (let i = 0; i < size; i++)
				{
                    windowLingShi.push(self.windowsTable[i]);
					
				}
				
				size = windowLingShi.length
				
				//排序
                let windowsYesTable=[];
                let windowsNoTable = [];

                for (let i=0;i < windowLingShi.length;i++){
                    if (windowLingShi[i].call_time !=""){
                        windowsYesTable.push(windowLingShi[i])
                    }else{
                        windowsNoTable.push(windowLingShi[i])
                    }
                }
                windowsYesTable.sort(self.compares('window'));
                windowsNoTable.sort(self.compares('window'));

				 //合并
                windowLingShi = windowsYesTable.concat(windowsNoTable)
				
				let count = Math.ceil(size / 18);
				// console.log("$$$$$$"+count);
				
				let len = 0;
				if (count <= 1)
				{
					self.index = 0;
					len = size;
				}
				else
				{
					len = size - (self.index) * 18;
					if (len > 18)
					{
						len = 18;
					}		
				}
				// console.log("kkkkkkkkkkk"+self.index);
				
				self.windowsStatus = [];
				for (let i = 0; i < len; i++)
				{
                    self.windowsStatus.push(windowLingShi[i+self.index*18]);
					
				}
                if (count > 0)
				{
					self.index++;
					if (self.index >= count)
					{
						self.index = 0;
					}
				}
				else
				{
					self.index = 0;
                }
                
                // console.log("xxxxxxxxxxxxxxxxxxxx"+self.index);
                console.log("第 1 窗口 数据翻页 ……………………  2");
                console.log( self.windowsStatus);

            }, 5000)
        },


// ------------------------------------------------------------------------------  onmessage 事件，接收信息  3
        getMessage:function(msg) {      //接收服务器发来的消息

            this.isConnected = true;
            this.beginTime = new Date().getTime();

            // ---------------------------------------------------------------------------------------------------------------------------- 毛光军 - 心跳重连

            // if( msg.data.cmd == "heartbeat"){
            //     clearTimeout( this.heartReply);
            //     clearTimeout( this.heartSend);
            //     this.heartBeat();
            // }

            //窗口
            /* this.startWindowUpdate();
                let hhhh={
                    winId : 1,
                    window:"216",      //窗口号
                    name:"ccc",        //柜员姓名
                    department:"ccc",  //所属部门
                    job_num:"",     //办件数
                    job:"",         	//事项
                    queue_time:"",  	//取票时间
                    over_time:"",   	//完结时间
                    call_time:"4444",   	//叫号时间
                    opin_status:"", 	//评价状态
                    wait_time:"",   	//等待时长
                    work_time:""    	//办理时长
                };
                this.windowsTable.push(hhhh)
         */
            //  //实时预警信息
            //  let returnJsona = {
            //      "realWarnId":1,
            //      "warnTime":"16:31:03",
            //      "winName":"205窗口",
            //      "bussType":"市场准入",
            //      "bussItem":"设立登记",
            //      "warnReason":"业务办理超时",
            //  }
            //  let returnJsonaa = {
            //      "realWarnId":1,
            //      "warnTime":"16:31:03",
            //      "winName":"6666窗口",
            //      "bussType":"市场准入",
            //      "bussItem":"设立登记",
            //      "warnReason":"业务办理超时",
            //  }
            //
            // if (this.WarningDataArr.length==0){
            //     this.WarningDataArr.push(returnJsonaa)
            // }else{
            //     for (let i=0;i<this.WarningDataArr.length;i++){
            //         if (this.WarningDataArr[i].realWarnId !== returnJsonaa.realWarnId){
            //             this.WarningDataArr.push(returnJsonaa)
            //             break;
            //         }
            //     }
            // }
            
            let returnJson = [{
                "credit_num":201909170002,          //审批编号
                "credit_name":"英某",          //企业名称(申报人)
                "lost_credit_date":"2019-09-17",     //失信日期
                "reason":"提供虚假住所证明材料",              //失信原因
            },{
                "credit_num":201911120005,          //审批编号
                "credit_name":"王某璋",          //企业名称(申报人)
                "lost_credit_date":"2019-11-12",     //失信日期
                "reason":"超时未提供容缺材料",              //失信原因
            }]
            this.CreditData = returnJson;

            let returnJsonOne = [{
                "regcode":"91210400318749xxxx",          
                "unitname":"辽宁万XXXX有限公司",          
                "unitaddress":"辽宁省抚顺市抚顺经济开发区李石经济区顺平街国际鑫城B区小区9-1号楼M3号",     
                "errorreason":"发起人无出资方式",              
            }]
            this.DataQuality = returnJsonOne; 

            /**
             * 主要解决服务器返回的数据被分割的问题
             */
			//  console.log('11111111111111');

            let bodystr = msg.data;


            let len = bodystr.length;     //去字符串首尾的",让可以转成json对象
            bodystr = bodystr.slice(0, len-1)
            let body = JSON.parse(bodystr);


            if(body){
                switch(body.cmd){      //组件数据分发
                    case "heartbeat":

                        console.log("onmessage 收到数据  ………………");
                        console.log(body);
                        clearTimeout( this.heartReply);
                        this.heartBeat();
                        break;

                    case "windows_list":         //窗口事项
					//  console.log(body);
					    this.winNum = body.winNum;
					    // if(body.method == "onemsg")
						// {
                        //     body.data.sort(this.compare('job_num'));
						// 	this.windowsTable = [];
                        //     this.windowsTable = body.data;
                        //
						// }

                        if(body.method == "addnew")
						{
							if(this.windowsTable.length == 0)
							{
								this.windowsTable.push(body.data);
							}else
							{
								let bFind = false;
								for(let i=0;i<this.windowsTable.length;i++)
								{
									if(this.windowsTable[i].winId == body.data.winId)
									{
										bFind = true;					
										break;
									}
								}
								
								if (bFind ==false)
								{
									this.windowsTable.push(body.data);
								}
							}
						}
						
						if(body.method == "update")
						{
							for(let u=0;u<this.windowsTable.length;u++)
							{
								if(this.windowsTable[u].winId == body.data.winId)
								{
									this.windowsTable.splice(u,1,body.data);
									break;
								}
							}
						}
						
						if(body.method == "remove")
						{
							// console.log("窗口数据11111111111111")
                            // console.log(body.data.winId)
							for(let r=0;r<this.windowsTable.length;r++){
								if(this.windowsTable[r].winId == body.data.winId)
								{
									//this.windowsStatus.splice(r,1);
									this.windowsTable.splice(r,1);
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
                            hot = {};
                            if (item.hot_num !=0){
                                hot.job_name = item.job_name;
                                hot.hot_num = item.hot_num;
                                hot.runnum = item.hot_num > 80 ? 80 : item.hot_num;
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
                        let avg={
                            job_name:"",
                            pingjun:0,
                            avgnum:0,
                        };
                        let avgArr= [];
                        body.data.forEach(item=>{
                            avg = {};
                            if (item.pingjun !=0){
                                avg.job_name = item.job_name;
                                avg.pingjun = item.pingjun;
                                avg.avgnum = item.pingjun > 80 ? 80 : item.pingjun;
                                avgArr.push(avg)
                            }
                        });
                        avgArr.sort(this.compare('pingjun'))
                        this.AvgWorkData=avgArr;

                        console.log("平均办理时长数据推送 ---------");
                        console.log(this.AvgWorkData);

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
                            dpt = {};
                            if (item.dpt_num !=0){
                                dpt.dpt_name = item.dpt_name;
                                dpt.dpt_num = item.dpt_num;
                                dpt.dptnum = item.dpt_num > 80 ? 80 : item.dpt_num;
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

                        if (this.WarningDataArr.length==0){
                            this.WarningDataArr.push(body.data)
                        }else{
                            for (let i=0;i<this.WarningDataArr.length;i++){
                                if (this.WarningDataArr[i].realWarnId != body.data.realWarnId){
                                    this.WarningDataArr.push(body.data)
                                    break;
                                }
                            }
                        }
                       // this.WarningDataArr.push(body.data)
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
// ------------------------------------------------------------------------------  onmessage 事件，接收信息   3

// ------------------------------------------------------------------------------  onclose 事件，监听关闭事件   4
    },
    destroyed(){       // 销毁监听
        this.socket.onclose = this.close
    }
// ------------------------------------------------------------------------------  onclose 事件，监听关闭事件   4
});
