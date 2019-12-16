$.fn.createPopupMenu = function(metadatas, left, top, row) {
	if(!metadatas || metadatas.length == 0) {
		return;
	}
	//如果页面中出现过弹出菜单，直接移除，相当于隐藏
	if(document.querySelector('.popupMenu')) {
		document.querySelector('.popupMenu').remove();
	}

	function toString(obj) {
		return encodeURIComponent(JSON.stringify(obj));
	}
	/**
	 * 将JSON或者字符串转换为JSON对象
	 * @param {Object} json JSON对象或者字符串
	 */
	function parseJson(json) {
		if(typeof str == 'string') {
			try {
				json = JSON.parse(json);
				return json;
			} catch(e) {
				console.log(e);
				return json;
			}
		} else {
			return json;
		}
	}

	/**
	 * 创建菜单项条目
	 * @param {Object} metadata 菜单元数据
	 * @param {Object} row 当前数据
	 */
	function createMenuItem(metadata, row) {
		var Expressions = $.Expressions();
		metadata = parseJson(metadata);
		/**
		 * 检测是否存在子菜单
		 * @param {Object} metadata 菜单元数据
		 */
		function isExistChildMenu(metadata) {
			return metadata["menus"] != undefined && metadata["menus"].length > 0;
		}
		var html = "";
		if(!metadata) {
			return "";
		}
		if(metadata.type == 'separator') {
			html += '<li class="menu-separator"></li>';
		} else {
			//菜单或者按钮的显示规则
			var rules = parseJson(metadata.rules);
			if(!Expressions.evalVariableExpressions(rules, row)) {
				return html;
			} else {
				if(metadata.type == 'button') {
					//是否存在子菜单
					var existChildMenu = isExistChildMenu(metadata);
					html += '<li class="menu-item"' +
						//菜单编号
						' data-id="' + metadata.id + '"' +
						//菜单类型 (button\menu),如果是button可以点击事件，如果是菜单则只能展开下级菜单
						' data-type="' + metadata.type + '"' +
						//菜单标题
						' title="' + metadata.hint + '"' +
						//菜单单击事件
						' onClick="' + (metadata.onclick ? ('javascript:' + metadata.onclick + '(\'' + toString(row.data) + '\');') : 'javascript:alert(\'正在执行\');') + '"' +
						//鼠标移入菜单事件
						' onMousemove="' + (metadata.onmousemove ? ('javascript:' + metadata.onmousemove + '(\'' + toString(row.data) + '\');') : '') + '"' +
						//鼠标移出菜单事件
						' onMouseout="' + (metadata.onmouseout ? ('javascript:' + metadata.onmouseout + '(\'' + toString(row.data) + '\');') : '') + '"' +
						'>' +
						'<div class="menu-item-wrapper">' +
						'<i class="popupMenu-menu-icon suyan4j-icon ' + (metadata.icon ? metadata.icon : '') + '"></i>' +
						'<div class="menu-item-title">' + metadata.title + '</div>' +
						'</div>';
					if(existChildMenu) {
						throw JSON.stringify(metadata) + "异常";
					}
				} else {
					//是否存在子菜单
					var existChildMenu = isExistChildMenu(metadata);
					if(!existChildMenu) {
						throw JSON.stringify(metadata) + "异常";
					}

					html += '<li class="menu-item"' +
						//菜单编号
						' data-id="' + metadata.id + '"' +
						//菜单类型 (button\menu),如果是button可以点击事件，如果是菜单则只能展开下级菜单
						' data-type="' + metadata.type + '"' +
						//菜单标题
						' title="' + metadata.hint + '"' +
						//菜单单击事件
						' onClick="' + (metadata.onclick ? ('javascript:' + metadata.onclick + '(\'' + toString(row.data) + '\');') : '') + '"' +
						//鼠标移入菜单事件
						' onMousemove="' + (metadata.onmousemove ? ('javascript:' + metadata.onmousemove + '(\'' + toString(row.data) + '\');') : '') + '"' +
						//鼠标移出菜单事件
						' onMouseout="' + (metadata.onmouseout ? ('javascript:' + metadata.onmouseout + '(\'' + toString(row.data) + '\');') : '') + '"' +
						'>' +
						'<div class="menu-item-wrapper">' +
						'<i class="popupMenu-menu-icon suyan4j-icon ' + (metadata.icon ? metadata.icon : '') + '"></i>' +
						'<div class="menu-item-title">' + metadata.title + '</div>' +
						'<i class="popupMenu-menu-child suyan4j-icon suyan4j-icon-caret-right"></i>' +
						'</div>';

					html += '<ul  class="menu-items" id="menu-items_' + metadata.id + '" style="display:none;">';
					if(metadata.menus) {
						var childrenMenus = metadata.menus;
						for(var i = 0; i < childrenMenus.length; i++) {
							var childMetadata = childrenMenus[i];
							html += createMenuItem(childMetadata);
						}
					}
					html += '</ul>';
					html += '</li>';

				}
			}
		}

		return html;
	}

	var html = '';
	html += '<div class="popupMenu" style="left: ' + left + 'px; top: ' + top + 'px; bottom: auto; display: block;">';
	html += '<ul>';
	for(var i = 0; i < metadatas.length; i++) {
		//第一级菜单元信息
		var metadata = metadatas[i];
		html += createMenuItem(metadata, row)
	}
	html += '</ul>';
	html += '</div>';
	$('body').append(html);
}
/**
 * 创建弹出菜单
 * @param {Object} menuMetadata 菜单元信息
 * @param {Object} source 触发源
 * 
 */
$.fn.showPopupMenu = function(menuMetadata, source, left, top, row) {
	
	 $(document).click(function (e) {

		var target = $(e.target);
		if(!target.hasClass('dropdown-button')){
			$(".popupMenu").remove();
		}
    });
    
    if(source != null){
    	var screenHeight = $(window).height();
	    var screenWidth = $(window).width();
	    var sourceLeft = source.offset().left;
	    var sourceTop = source.offset().top;
	    var sourceHeight = source.outerHeight(true);
	    var sourceWidth = source.outerWidth(true);
	    if(sourceLeft + 168 > screenWidth){ //如果触发按钮 + 菜单宽度超过屏幕
    		left = sourceLeft - 168;
	    }else{
	    	left = sourceLeft;
	    }
	    if(screenHeight - sourceTop > 168){
	    	top = sourceTop;
	    }else{
	    	top =  screenHeight - 168;
	    }
    }
    
	$(this).createPopupMenu(menuMetadata, left, top, row);
	//按钮单击后，将弹出菜单删除
//	$(".popupMenu .menu-item[data-type='button']").click(function(e) {
//		$(".popupMenu").remove();
//		e.stopPropagation();
//	});
	//弹出菜单单击子菜单后，如果子菜单显示则隐藏；如果子菜单隐藏则显示
	$(".popupMenu .menu-item[data-type='menu']").click(function(e) {
		var _this = $(this);
		if(_this.hasClass('popupMenu-menu-icon')) {
			_this = _this.parent('.menu-item');
		} else if(_this.hasClass('popupMenu-menu-child')) {
			_this = _this.parent('.menu-item');
		} else if(_this.hasClass('menu-item-wrapper')) {
			_this = _this.parent('.menu-item');
		}
		if(_this.is(":visible")) {
			_this.parent(".menu-item").find(".menu-items").hide();
		} else {
			$("#menu-items_" + _this.data('id')).show();
		}
		e.stopPropagation();
	}).hover(function(e) {
		var _this = $(this);
		if(_this.hasClass('popupMenu-menu-icon')) {
			_this = _this.parent('.menu-item');
		} else if(_this.hasClass('popupMenu-menu-child')) {
			_this = _this.parent('.menu-item');
		} else if(_this.hasClass('menu-item-wrapper')) {
			_this = _this.parent('.menu-item');
		}
		//隐藏所有的子菜单
		//				_this.parents(".menu-item").find(".menu-items").hide();
		$("#menu-items_" + _this.data('id')).show();
		e.stopPropagation();
	}, function(e) {
		e.stopPropagation();
	});
}