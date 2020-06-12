
let AvghandleHtml = "<div class='component-container'>" +

        "<avghandle-windowList v-bind:TableNumData='TableNumData'></avghandle-windowList>" +
        "<avghandle-char-container></avghandle-char-container>" +
        "" +
    "</div>";


var ComponentAvghandle=Vue.component("ComponentAvghandle",{
    template:AvghandleHtml,
    data:function () {
        return {
            path:"ws://127.0.0.1:1234",   //socket地址
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
        //this.init()
    },
    methods:{
        init:function () {
            this.htmlAlert();
            if(typeof(WebSocket) === "undefined"){
                alert("您的浏览器不支持socket")
            }else{
                // 实例化socket
                let SocketObject = new WebSocket(this.path)

                // 监听socket连接
                SocketObject.onopen = this.open
//                SocketObject.onopen = this.open()
                // 监听socket错误信息
                SocketObject.onerror = this.error
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
            console.log(this.socket)

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
            var TableData;
            try{
                var TableData = JSON.parse(msg.data);
            }catch(e){
                this.message =this.message+=msg.data
                try{
                    var TableData = JSON.parse(this.message)
                    this.flag = true;
                }catch(e){
                    this.flag = false;
                }
            }
            if(this.flag !== false){
                this.message = "";
                switch(TableData.cmd){      //组件数据分发
                    case "desk_window_data":
                        console.log(TableData.data)
                        this.TableNumData=TableData.data
                        break;
                }
            }
        },
        send:function (message) {
            // this.socket.send(message) 毛光军注掉  ---------------------
        },
        close:function() {
            this.alertMsg = "连接关闭"
            this.EditStatusMessage(2);

            console.log("socket close")
        },
        htmlAlert:function(){
            this.alertIndex=layer.msg(this.alertMsg,
                {
                    icon:16,
                    shade:0.01,
                    time:1000000,
                    success:this.AlerHtmlObjFun
                })
        },
        AlertClose:function(){
            layer.close(this.alertIndex)
        },
        AlerHtmlObjFun:function(layerObj){
            this.alertHtml=layerObj.find('.layui-layer-content')[0]
        },
        EditStatusMessage:function(status,nu){
            let alertMessage = this.alertMsg
            switch(status){
                case 1:
                    $(this.alertHtml).html("<i class='layui-layer-ico layui-layer-ico1'></i>"+alertMessage);
                    break;
                case 2:
                    $(this.alertHtml).html("<i class='layui-layer-ico layui-layer-ico2'></i>"+alertMessage);
                    break;
                case 3:
                    $(this.alertHtml).html("<i class='layui-layer-ico layui-layer-ico7'></i>连接失败,正在第"+nu+"次重试...");
                    break;
                default:
                    $(this.alertHtml).html("<i class='layui-layer-ico layui-layer-ico16'></i>"+alertMessage);
                    break;
            }
        }
    },
    destroyed(){
        this.socket.onclose = this.close
    }
});
