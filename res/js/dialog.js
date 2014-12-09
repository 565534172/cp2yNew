define(['jquery','util'],function($,u){
  var d={
  	_set:function(_obj){
	    var t=document.documentElement.scrollTop || document.body.scrollTop,
	        viewHeight=$(window).height(),
	        viewWidth=$(window).width(),
	        _objHeight=_obj.height(),
	        _objWidth=_obj.width(),
	        dialogTop=(viewHeight / 2) - (_objHeight / 2) + t,dialogLeft = (viewWidth / 2) - (_objWidth / 2);
	    _obj.css({top:dialogTop,left:dialogLeft});
  	},
  	alert:function(x,css){
      var i=$(".cp2yLock").size();
  		window.lock=true;
  		this._lock(i);
      var o={
        t:'提示信息',
        c:x
      };
  		this._open(o,i,css);
  	},
    confirm:function(){},
    frame:function(){},
    close:function(i){
      $("#cp2yLock"+i).remove();
      $("#cp2yDialogBox"+i).remove();
      if($(".cp2yLock").size()>0){
        window.lock=false;
      }
    },
    _lock:function(i){
      $('body').append('<div class="cp2yLock" id="cp2yLock'+i+'"></div>');
      var lockWidth = $(document).width(),lockHeight = $(document).height();
      $("#cp2yLock"+i).css({"width":lockWidth,"height":lockHeight}).show();
    },
    _open:function(o,i,css){
  		var that=this,d=[];
      d.push('<div class="dialogTitle"><span>'+o.t+'</span><a class="closeDialog" data="'+i+'">X</a></div>');
      d.push('<div class="dialogContent">'+o.c+'</div>');
      $('body').append('<div class="cp2yDialogBox" id="cp2yDialogBox'+i+'"></div>');
  		$("#cp2yDialogBox"+i).html(d.join('')).show();
      if(css){
        $("#cp2yDialogBox"+i).css(css);
      }
  		u.throttle(this._set($("#cp2yDialogBox"+i)), 50, 100);
  		$(window).resize(function(){
        if(window.lock){
          u.throttle(that._lock(i), 50, 100);
          u.throttle(that._set($("#cp2yDialogBox"+i)), 50, 100);
        }
      });
  	}
  };
  return d;
});