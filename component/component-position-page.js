
let PositionHtml = "<div class='component-container'>" +

        "<PositionWindowList v-bind:TableNumData='TableNumData'></PositionWindowList>" +
        "<char-container></char-container>" +
"</div>";

 
var ComponentPosition=Vue.component("ComponentPosition",{
    template:PositionHtml,
    data:function () {
        return {
            socket:null,                  //socket对象
            alertIndex:0,                 //弹框id
            alertMsg:"连接中....",         //提示内容
            alertHtmlObj:null,            //弹框元素dom对象
            alertHtml:null,               //弹框html
            retryNum:0,                    //重试次数
            TableNumData:null,             //台席数据
            message:null,
            flag:null
        }
    },
    mounted(){
        //this.init();
        this.getMessage();

    },
    methods:{
        init:function () {
            this.htmlAlert();

            if(typeof(WebSocket) === "undefined"){
                alert("您的浏览器不支持socket")
            }else{
                // 实例化socket
                let SocketObject = new WebSocket("ws://192.168.5.37:5908")
                // 监听socket连接
                SocketObject.onopen = this.open()
                // 监听socket错误信息
                //SocketObject.onerror = this.error

                // 监听socket消息
                SocketObject.onmessage = this.getMessage
                this.socket = SocketObject
            }
        },
        open:function() {
            this.alertMsg = "连接成功"
            this.EditStatusMessage(1)
            this.AlertClose();
            this.retryNum=0
            console.log("连接成功")

        },
        error:function(){
            if(this.retryNum <20){
                this.init()
                this.retryNum=this.retryNum+1
                this.EditStatusMessage(3,this.retryNum);
            }else{
                this.alertMsg = "连接失败"
                this.EditStatusMessage(2);
                this.AlertClose();
                this.retryNum=0
            }
            console.log("socket连接失败")
        },
        getMessage:function(msg) {      //接收服务器发来的消息
            /**
             * 主要解决服务器返回的数据被分割的问题
             */
            console.log("33333333333")
            var returnJson = [
             // TableWindowData=[{
             //    ids:1,          //台席id
             //    TableWindowName:"202窗口",          	//台席名
             //
             //   }],
            TotalQuantity={
                QueueQuantity:22,          //排号数量
                HandleQuantity:2,          	//办结数量
                AvgHandleQuantity:33,          	//平均办理时长
                EvaluationQuantity:4,          	//评价数量
                SatisfactionQuantity:4,          	//满意数量
                NotSatisfiedQuantity:4,          	//不满意数量
            },
        //     TableWindowListData=[{
        //         QueueQuantity:1,          //排号数量
        //         HandleQuantity:33,          	//办结数量
        //     AvgHandleQuantity:33,          	//平均办理时长
        //     EvaluationQuantity:33,          	//评价数量
        //     SatisfactionQuantity:33,          	//满意数量
        //     NotSatisfiedQuantity:33,          	//不满意数量
        //     NotSatisfiedQuantity:33,          	//不满意数量
        // }]

        ]

            this.TableNumData = returnJson;


            let bodystr = msg.data;
            let len = bodystr.length;     //去字符串首尾的",让可以转成json对象
            bodystr = bodystr.slice(0, len-1)
            let body = JSON.parse(bodystr);

            if(body){
                switch(body.cmd){      //组件数据分发
                    case "desk_window_data":
                        console.log(body.data)
                        this.TableNumData=body.data
                    break;
                }
            }
        },

        close:function() {
            this.alertMsg = "连接关闭"
            this.EditStatusMessage(2);

            console.log("socket close")
        },


        htmlAlert:function(){
            let msgHtml = "<span style='color: #0C0C0C'>"+this.alertMsg+"</span>"

            this.alertIndex=layer.msg(msgHtml,
                {
                    icon:16,
                    shade:0.01,
                    time:1000000,
                    success:this.AlerHtmlObjFun
                })
        },
        AlertClose:function(){     //关闭弹窗
            layer.close(this.alertIndex)
        },

        AlerHtmlObjFun:function(layerObj){
            this.alertHtml=layerObj.find('.layui-layer-content')[0]
        },

        EditStatusMessage:function(status,nu){
            let alertMessage = "<span style='color: #0C0C0C'>"+this.alertMsg+"</span>"

            switch(status){
                case 1:
                    $(this.alertHtml).html("<i class='layui-layer-ico layui-layer-ico1'></i>"+alertMessage);
                    break;
                case 2:
                    $(this.alertHtml).html("<i class='layui-layer-ico layui-layer-ico2'></i>"+alertMessage);
                    break;
                case 3:
                    $(this.alertHtml).html("<i class='layui-layer-ico layui-layer-ico7'></i><span style='color: #0C0C0C'>连接失败,正在第"+nu+"次重试...</span>");
                    break;
                default:
                    $(this.alertHtml).html("<i class='layui-layer-ico layui-layer-ico16'></i>"+alertMessage+"");
                    break;
            }
        }
    },
    destroyed(){
        this.socket.onclose = this.close
    }
});
