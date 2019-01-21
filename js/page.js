var isTouch = Modernizr.touch,
	isMobile = false,//区分移动端与PC端
	mobile = false,//区分手机端与平板
	w_width = 0,
	w_height = 0,
	bannerImgh=638,
	navItem = 0,
	h_height=0,
	roll=0,
	sTop=150,
	produs=0,
	ST = 0;
	
var _mousemove;
var _click;
var _mousedown;
var _mouseup;

//移动端事件和PC事件的切换
if (Modernizr.touch) {
    _mousemove = "touchmove";
    _click = "touchend";
    _mousedown = "touchstart";
    _mouseup = "touchend";
} else {
    _mousemove = "mousemove";
    _click = "click";
    _mousedown = "mousedown";
    _mouseup = "mouseup";
};

function pageBox() {
    w_width = jQuery(window).width();
    w_height = jQuery(window).height();

	//设置移动端参数
    if (w_width <= 1024) {
        isMobile = true;
    } else if (w_width > 1024) {
        isMobile = false;
    };
	//区分手机端和平板
    if (w_width <= 640) {
        mobile = true;
    } else if (w_width > 640) {
        mobile = false;
    };
    if(isMobile){
    	$("body").find('.article-block').removeClass('article-block');
	}
}
pageBox();
jQuery(window).resize(function () {
    pageBox();
});


//内页banner
var scollinner = {
	init: function() {
		this.setscoll();
	},
	setscoll: function() {
		jQuery(window).scroll(function () {
			var headh=$(".header-box").outerHeight();
		    var windowTop = jQuery(window).scrollTop();
		    if (windowTop < w_height && !isMobile) {
		        jQuery('.pbanner1 figure img').css('transform', "translate(0px," + (windowTop) / 2.5 + "px)");
		    };
		});
	}
};

//导航hover
var navhover = {
	init: function() {
		this.sethover();
	},
	sethover: function() {
	    var index1=$(".header__nav li.active").index();
        $(".header__nav li").hover(function(){
       	   $(this).addClass('active').siblings().removeClass('active');
        },function(){
       	   $(".header__nav li").removeClass('active').eq(index1).addClass('active');
        });
        
        var index_=$(".leval-menu__list li.active").index();
        $(".leval-menu__list li").hover(function(){
       	   $(this).addClass('active').siblings().removeClass('active');
        },function(){
       	   $(".leval-menu__list li").removeClass('active').eq(index_).addClass('active');
        });
        
        $(document).ready(function(){
	        var indexs=$(".leval-menu__list li.active").index();
	    	var now=$(".leval-menu__list li").width()*indexs;
	    	$(".leval-menus").animate({scrollLeft:now});
		});
	}
};

//定点跳转
var Hash = {
	init: function() {
		this.setback();
	},
	getHashs: function() {
		getHash();
		jQuery(".leval-menu__list li a").click(function(e){
			var hash=jQuery(this).attr("href").split("#")[1];
			if(hash && jQuery("#"+hash).length==1){
				setScroll("#"+hash);
			}
			$('.menubtn').removeClass('active');
			$(".navigate").removeClass('show');
		});
		
		function getHash(){
			var hash = location.href.split("#")[1];
			if(hash){
				setScroll("#"+hash);
			}
		};
		var scnum=0;
		function setScroll(anchorCur){
		    jQuery("html,body").animate({ scrollTop: jQuery(anchorCur).offset().top},500);
		};
	}
};
jQuery(window).load(function(){
	navhover.sethover();
    Hash.getHashs();
    scollinner.setscoll();
});

$('.header__font strong').animatext({
	speed: 100,
	effect: 'bounceIn',
	reverse: false,
	infinite: true
});

jQuery(window).load(function(){
    jQuery('.article-block').delay(300).scrollClass();
});

(function(jQuery){
    $.fn.scrollClass = function(config){
        var defaults = {};
        var config = jQuery.extend(defaults, config);
        var target = this;

        function addAction(){
            var length = target.length;
            for(var i=0; i<length; i++){
                if(target.eq(i).hasClass('articleShow')) continue;
                
                var in_position = target.eq(i).offset().top + 100;
                var window_bottom_position = jQuery(window).scrollTop() + jQuery(window).height();
                if(in_position < window_bottom_position){
                    target.eq(i).addClass('articleShow');
                }
            }
        }
        addAction();

        jQuery(window).on('scroll', function(){
            addAction();
        });
        return target;
    };
} )(jQuery);

setPopUp($('.weix'), "微信公众号");
function setPopUp(obj, title) {
	obj.click(function () {
		var str = '<div class="popUpblack"><div class="popUp"><div class="t">' + title + '<span class="close">关闭</span></div><div class="img"><img src="' + obj.attr("href") + '"/></div></div></div>';
	$("body").append(str);
	jQuery(".popUpblack").fadeIn();
	jQuery(".popUp").animate({marginTop:"-127"},400);
	$(".popUp .close").click(function () {
		$(".popUpblack").remove();
	});
	jQuery(".popUpblack").click(function(){$(".popUpblack").remove();});
		return false;
	});
};

function setImgMax(img, imgW, imgH, tW, tH) {
	var tWidth = tW || w_width;
	var tHeight = tH || w_height;
	var coe = imgH / imgW;
	var coe2 = tHeight / tWidth;
	if (coe < coe2) {
		var imgWidth = tHeight / coe;
		img.css({ height: tHeight, width: imgWidth, left: -(imgWidth - tWidth) / 2, top: 0 });
	} else {
		var imgHeight = tWidth * coe;
		img.css({ height: imgHeight, width: tWidth, left: 0, top: -(imgHeight - tHeight) / 2 });
	};
	
};