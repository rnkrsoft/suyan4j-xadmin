/**
 * 对数组进行数字处理
 * @param values 数组
 * @param javaType 数据类型
 * @returns {Array}
 */
function numbers(values, javaType) {
    var arrays = [];
    if(typeof values == 'object'){
        for(var i=0;i<values.length;i++){
            var value = values[i];
            arrays.push(number(value, javaType));
        }
        return arrays;
    }
    else if(typeof values == 'string')
        return number(values, javaType);
    //其他情况不处理
}
/**
 * 对字符串进行数字处理
 * @param value 字符串
 * @param javaType 数据类型
 * @returns {*}
 */
function number(value, javaType) {
    if (javaType == 'int') {
        value = parseInt(value);
        if (isNaN(value)) {
            return 0;
        }else{
            return value;
        }
    } else if (javaType == 'java.lang.Integer') {
        value = parseInt(value);
        if (isNaN(value)) {
            return null;
        }else{
            return value;
        }
    } else if (javaType == 'long') {
        value = parseInt(value);
        if (isNaN(value)) {
            return null;
        }else{
            return value;
        }
    } else if (javaType == 'java.lang.Long') {
        value = parseInt(value);
        if (isNaN(value)) {
            return null;
        }else{
            return value;
        }
    }else{
        return value;
    }
}