/**
 * 显示消息框
 * @param title 消息标题
 * @param lines 消息内容数组
 * @param type 消息框类型
 * @param position 消息框位置
 * @param parentIndex 模态框ID
 */
function showMessageBox(title, lines, type, position, parentIndex) {
    if (position != null) {
        if (position != "topLeft"
            && position != "topCenter"
            && position != "topRight"
            && position != "middleLeft"
            && position != "middleCenter"
            && position != "middleRight"
            && position != "bottomLeft"
            && position != "bottomCenter"
            && position != "bottomRight"
        ) {
            return;
        }
    }
    var offset = 'auto';
    if (position == "topLeft") {
        offset = 'lt';	
    }else if (position == "topCenter") {
        offset = 't';	
    }else if (position == "topRight") {
        offset = 'rt';	
    }else if (position == "middleLeft") {
        offset = 'auto';	
    }else if (position == "middleCenter") {
        offset = 'auto';
    }else if (position == "middleRight") {
        offset = 'auto';
    }else if (position == "bottomLeft") {
        offset = 'lb';
    }else if (position == "bottomCenter") {
        offset = 'b';
    }else if (position == "bottomRight") {
        offset = 'rb';
    }
    layer.open({
        title: title,
        content: (typeof lines != 'string' ? JSON.stringify(lines) : lines),
        offset : offset,
        shadeClose: function (index) {
            //遮罩层点击关闭
            layer.close(index);
            if (parentIndex) {
                layer.close(parentIndex);
            }
        },
        yes: function (index) {
            layer.close(index);
            if (parentIndex) {
                layer.close(parentIndex);
            }
            //消息提示，确认后执行

        }
    });
}

/**
 * 显示提示
 * @param title 提示标题
 * @param lines 提示内容数组
 */
function showHint(title, lines){
    //time自动消失时间
    layer.msg(lines, {time: 6000});
}


/**
 * 显示确认框
 * @param title 确认框标题
 * @param contents 确认框内容数组
 * @param callback 回调函数
 */
function showConfirmBox(title, lines, callback) {
    layer.confirm((lines ? lines : '确认是否继续?'), {icon: 3, title:(title ? title : '确认?')}, callback);
}