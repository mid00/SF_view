const WSS_URL = 'ws://192.168.5.3:8089'
let Socket = ''
let setIntervalWesocketPush = null

/**建立连接 */
export function createSocket() {
  if (!Socket) {
    console.log('建立websocket连接')
    Socket = new WebSocket(WSS_URL)
    Socket.onopen = onopenWS
    Socket.onmessage = onmessageWS
    Socket.onerror = onerrorWS
    Socket.onclose = oncloseWS
  } else {
    console.log('websocket已连接')
  }
}
/**打开WS之后发送心跳 */
export function onopenWS() {
  sendPing() //发送心跳
}
/**连接失败重连 */
export function onerrorWS() {
  clearInterval(setIntervalWesocketPush)
  Socket.close()
  createSocket() //重连
}
/**WS数据接收统一处理 */
export function onmessageWS(e) {
  window.dispatchEvent(new CustomEvent('onmessageWS', {
    detail: {
      data: e
    }
  }))
}
/**发送数据
 * @param eventType
 */
export function sendWSPush(eventTypeArr) {
  const obj = {
    appId: 'airShip',
    cover: 0,
    event: eventTypeArr
  }
  if (Socket !== null && Socket.readyState === 3) {
    Socket.close()
    createSocket() //重连
  } else if (Socket.readyState === 1) {
    Socket.send(JSON.stringify(obj))
  } else if (Socket.readyState === 0) {
    setTimeout(() => {
      Socket.send(JSON.stringify(obj))
    }, 3000)
  }
}
/**关闭WS */
export function oncloseWS() {
  clearInterval(setIntervalWesocketPush)
  console.log('websocket已断开')
}
/**发送心跳 */
export function sendPing() {
  Socket.send('ping')
  setIntervalWesocketPush = setInterval(() => {
    Socket.send('ping')
  }, 5000)
}

export function htmlAlert(msg){
    let alertIndex=layer.msg(msg,
    {
        icon:16,
        shade:0.01,
        time:1000000,
        success:AlerHtmlObjFun
    })
    return alertIndex;
}

export function AlertClose(index){
    layer.close(index)
}

export function AlerHtmlObjFun(layerObj){
    this.alertHtml=layerObj.find('.layui-layer-content')[0]
}

export function EditStatusMessage(status,nus,msg){
    switch(status){
            case 1:
                $(this.alertHtml).html("<i class='layui-layer-ico layui-layer-ico1'></i>"+msg);
            break;
            case 2:
                $(this.alertHtml).html("<i class='layui-layer-ico layui-layer-ico2'></i>"+msg);
            break;
            case 3:
                $(this.alertHtml).html("<i class='layui-layer-ico layui-layer-ico7'></i>连接失败,正在第"+nus+"次重试...");
            break;
            default:
                $(this.alertHtml).html("<i class='layui-layer-ico layui-layer-ico16'></i>"+msg);
            break;
    }

}
