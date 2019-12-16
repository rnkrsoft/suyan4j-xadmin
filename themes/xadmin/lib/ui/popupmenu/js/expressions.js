;
'use strict';
(function($, window) {
	$.Expressions = function() {
		function Expressions() {

		};
		var variableFormatter = function(message, vars) {
			if(message && vars) {
				var regStr, result = message;
				try {
					for(var d in vars) {
						regStr = "/\\$\\{" + d + "\\}/g";
						result = result.replace(eval(regStr), vars[d])
					}
					result = result.replace(/\$\{.*\}/g, '');
				} catch(e) {
					console.error(e);
					return result = message.replace(/\$\{.*\}/g, '');
				}
				return result;
			} else {
				return message;
			}
		}

		var evalVariableExpression = function(tpl, obj) {
			if(!tpl) {
				return true;
			}
			var result = variableFormatter(tpl, obj);
			try {
				var boo = eval(result);
				if(boo === undefined || boo === null) {
					return true;
				}
				return boo;
			} catch(e) {
				console.error(e.message)
				return true;
			}
		}

		var evalVariableExpressions = function(tplArr, obj) {
			var boo = true;
			if(Array.isArray(tplArr)) {
				for(var i = 0; i < tplArr.length; i++) {
					if(i == 0) {
						boo = evalVariableExpression(tplArr[i].expression, obj);
					} else {
						boo = boo || evalVariableExpression(tplArr[i].expression, obj);
					}
				}
				return boo;
			}else{
				return false;
			}
		}

		Expressions.prototype = {
			constructor: Expressions,
			/**
			 * 
			 * @param {Object} message	消息模板  (您正在删除${name}，这条数据，是否继续？)
			 * @param {Object} vars		{替换变量名, 替换结果}		({name: '小陈', age: '123'})
			 * t.replace(/\$\{name\}/g, '11111');
			 * // regStr = "\\${" + name + "}";
			 * // var reg = new RegExp(regStr, 'g');
			 */
			variableFormatter: function(message, vars) {
				return variableFormatter(message, vars);
			},
			/**
			 * 判断表达式 真假
			 * @param {Object} expr 表达式
			 * @param {Object} obj 转换对象
			 */
			evalVariableExpression: function(expr, obj) {
				return evalVariableExpression(expr, obj);
			},
			/**
			 * 执行表达式数组，如果存在满足的则返回真
			 * @param {Object} exprs 表达式数组
			 * @param {Object} obj 转换对象
			 */
			evalVariableExpressions: function(exprs, obj) {
				return evalVariableExpressions(exprs, obj);
			}
		}
		var instance = new Expressions();
		return instance;
	};
})(jQuery, window);