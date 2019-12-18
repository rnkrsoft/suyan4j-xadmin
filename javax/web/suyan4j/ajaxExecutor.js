/**
 * 构建Ajax接口调用的请求对象
 * @param product 产品代码
 * @param action 功能代码
 * @param subAction 操作代码
 * @param request 请求对象
 * @returns {*}
 */
function ajaxRequest(product, action, subAction, request){
	return {
        "product": product,
        "action": action,
        "subAction": subAction,
        "data": JSON.stringify(request ? request : {})
    }
}
/**
 * 结果默认处理器
 * @param data 数据对象
 */
function resultDefaultHandler(data){
    console.log(data)
}

/**
 * 统一的应答处理函数
 * @param response 应答JSON
 * @param callback 处理回调
 * @returns {*} 处理成功返回true，否则返回false
 */
function responseHandler(response) {
    if (!response.code) {
        throw "接口通信数据错误，可能是由于使用的SDK版本不兼容!";
    }
    if (response.code == "000") {//success
        if (!response.data || !response.data.result.code) {
            throw "接口业务数据错误，可能是由接口无业务对象返回导致!";
        }
        //判断业务是否成功
        if (response.data.result.code == "0000") {
            return response.data;
        } else {
            throw response.data.result.code;
        }
    } else {
        throw response.desc;
    }
}

/**
 * 调用Ajax执行远端接口
 * @param url 请求地址
 * @param product 产品代码
 * @param action 功能代码
 * @param subAction 操作代码
 * @param request 请求对象
 * @param resultHandler 结果处理器
 */
function ajaxExecute(url, product, action, subAction, request, resultHandler) {
    $.ajax({
        type: 'POST',
        url: url,
        data: ajaxRequest(product, action, subAction, request),
        async: false,
        timeout:60000,//设置请求超时时间（毫秒）
        cache:false,//设置不缓存请求
        dataType: "json",
        complete:function(XMLHttpRequest, textStatus){
            console.log("status:" + XMLHttpRequest.status);
            console.log("textStatus:"+ textStatus);
        },
        success: function (response) {
            try{
                var data = responseHandler(response);
                if(resultHandler && 'function' == typeof resultHandler){
                    resultHandler(data);
                }else{
                    resultDefaultHandler(data);
                }
            }catch(err){
                console.log("err:" + err);
                var msg = typeof err == 'string'? err: '系统错误';
                showMessageBox("失败", msg , "error", "middleCenter");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown){
            //通常情况下textStatus和errorThrown只有其中一个包含信息
            console.log("status:" + XMLHttpRequest.status);
            console.log("textStatus:"+ textStatus);
            console.log("errorThrown:" + errorThrown);
            if(textStatus && textStatus == "timeout"){
                showMessageBox("失败", "通信超时，请通过查询等功能，确认当前操作是否执行成功！", "error", "middleCenter");
                return;
            }else{
                showMessageBox("失败", "调用远程接口发生未知错误！", "error", "middleCenter");
                return;
            }

        },
    });
};