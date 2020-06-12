
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
            socket:null,                  //socket对象
            windowsStatus:[],           //窗口运营数据
			winNum:0,
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
            windowsTable:[],            //窗口运营数据
		    windowsNoTable:[],
			windowsYesTable:[],

            isConnected:false,       //心跳
            beginTime:0,
			index:0,

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
            if(typeof(WebSocket) === "undefined"){
                alert("您的浏览器不支持socket")
            }else{
                // 实例化socket
                let SocketObject = new WebSocket("ws://188.1.1.250:5908")
               // let SocketObject = new WebSocket("ws://192.168.5.7:5908")

                // 监听socket连接
                SocketObject.onopen = this.open()
                // 监听socket错误信息
                SocketObject.onerror = this.error

                // 监听socket消息
                SocketObject.onmessage = this.getMessage

                this.socket = SocketObject
            }
        },

        open:function() {
            console.log("连接成功")
            this.isConnected = true;
            this.beginTime= new Date().getTime();
            this.start();
			this.startWindowUpdate();
            

        },

        start(){
            var self = this;
			clearInterval(time);
            console.log("进入心跳前")
           var time = setInterval(function(){
                self.timerfun()

            }, 60000)

        },

        timerfun(){
               console.log("进入心跳")
              if (this.socket.readyState != 1){
                  this.isConnected = false;
               }
               let timenow = new Date().getTime();
               if ( this.isConnected == false && timenow - this.beginTime > 300000){
                    this.init();
               }
               if (this.isConnected==true)
               { console.log(this.isConnected)
				   
                   this.isConnected = true;
                   this.beginTime = new Date().getTime();
               }

            //    this.socket.send("123");
        },

         error:function(){
             console.log("socket连接失败")
         },

        compare(attr) {                 //排序
            return function(a,b){
                var val1 = a[attr];
                var val2 = b[attr];
                return val2 - val1;
            }
        },
		
		 startWindowUpdate(){
			 console.log("gggggggggggggggggg")
            var self = this;
			clearInterval(wintimer);
            
           var wintimer = setInterval(function(){
			    let size = self.windowsTable.length
                console.log("------"+size);
			  
				let count = Math.ceil(size / 22);
				console.log("$$$$$$"+count);
				
				let len = 0;
				if (count <= 1)
				{
					self.index = 0;
					len = size;
				}
				else
				{
					len = size - (self.index) * 22;
					if (len > 22)
					{
						len = 22;
					}		
				}
				console.log("kkkkkkkkkkk"+self.index);

				self.windowsStatus = [];				
				for (let i = 0; i < len; i++)
				{
					//self.windowsStatus[i] = self.windowsTableData[i+index*22];
					self.windowsStatus.push(self.windowsTable[i+self.index*22]);
					
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
				console.log("xxxxxxxxxxxxxxxxxxxx"+self.index);

            }, 5000)

        },


        

        getMessage:function(msg) {      //接收服务器发来的消息
            this.isConnected = true;
            this.beginTime = new Date().getTime();
            //窗口
            // for (let i=0;i<=27;i++ ){
            //     let hhhh={
            //         winId : 1,
            //         window:"212",      //窗口号
            //         name:"ccc",        //柜员姓名
            //         department:"ccc",  //所属部门
            //         job_num:"33",     //办件数
            //         job:"dddd",         	//事项
            //         queue_time:"3333",  	//取票时间
            //         over_time:"333",   	//完结时间
            //         call_time:"333",   	//叫号时间
            //         opin_status:"333", 	//评价状态
            //         wait_time:"333",   	//等待时长
            //         work_time:"333"    	//办理时长
            //
            //     };
            //     this.windowsTableData.push(hhhh)
            // }

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
					 //winNum
					 console.log(body);
					// this.windowsTable.push(body.winNum);
					    this.winNum = body.winNum;				
                       
					   if(body.method == "addnew")
					   {
						   if(body.data.queue_time =="")
						   {
							   console.log('nnnnnnnnn');
							   this.windowsNoTable.push(body.data);
							   console.log(this.windowsNoTable);
							   
							  
						   }else{
							   this.windowsYesTable.push(body.data);
							    console.log('yyyyyyyyyyyy');
							   console.log( this.windowsYesTable);
						   }
					   }
					   if(this.windowsYesTable.length > 0){
					       this.windowsYesTable.sort(this.compare('window'));
					   }
					   
					   if(this.windowsNoTable.length > 0){
						    this.windowsNoTable.sort(this.compare('window'));
					   }
					   
					   this.windowsTable = [];
					   this.windowsTable = Object.assign([], this.windowsYesTable, this.windowsNoTable);
					   
					   
					   
					   
					   
					   
					   
                        /*if(body.method == "addnew")
						{
							if(this.windowsTable.length == 0)
							{
								this.windowsTable.push(body.data);
							}else
							{
								for(let i=0;i<this.windowsTable.length;i++)
								{
									if(this.windowsTable[i].winId != body.data.winId)
									{
										this.windowsTable.push(body.data);
										 break;
									}
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
							console.log("窗口数据11111111111111")
                            console.log(body.data.winId)
							for(let r=0;r<this.windowsTable.length;r++){
								if(this.windowsTable[r].winId == body.data.winId)
								{
									//this.windowsStatus.splice(r,1);
									this.windowsTable.splice(r,1);
									 break;
								}
							}
						}*/
                        
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

    },
    destroyed(){       // 销毁监听
        this.socket.onclose = this.close
    }
});
