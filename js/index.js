jQuery(function(){
	function initBox() {
		w_width = jQuery(window).width();
        w_height = jQuery(window).height();
   
		if(!isMobile){
		}else{
		}
    };
    initBox();
    jQuery(window).resize(function () {
        initBox();
    });
    $(".video-banner").slick({
		centerPadding: '0',
		autoplaySpeed:4000,
		speed:900,
		arrows: true,
		dots: false,
		infinite: true,
		autoplay: true
	});
	jQuery(function(){
		var video = {
			load: function (objs) {
				var objplay = jwplayer(objs.vcontainer).setup({
					flashplayer: 'js/video/flashplay.swf',
					html5player: 'js/video/html5player.js',
					file: objs.vfiles,
					image: objs.vfimg,
					width: '100%',
					height: '100%',
					aspectratio: '16:9',
					stretching: 'fill',
					controls: 'true',
					autostart: objs.isautoplay,
				});
				return objplay;
			}
		}
		jQuery('.videos__btn').click(function () { 
			$(this).fadeOut(300);
			video.load({
				vcontainer: jQuery(this).parents('.videos').find('.vbBox').attr('postId'),  //视频容器
				vfiles:  jQuery(this).parents('.videos').find('.vbBox').attr("postvideo"), //视频地址
				vfimg: jQuery(this).parents('.videos').find('.vbBox').attr("postimgul"), //视频缩略图(封面)
				isautoplay: 'true'
			});
		})
	});
    $(".home-nav__bg").faceCursor();
});