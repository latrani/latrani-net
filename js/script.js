// Fix iPad's tendency to scale up when rotating.  
// Code from http://stackoverflow.com/questions/5434656/ipad-layout-scales-up-when-rotating-from-portrait-to-landcape
if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
    var viewportmeta = document.querySelector('meta[name="viewport"]');
    if (viewportmeta) {
        viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0';
        document.body.addEventListener('gesturestart', function () {
            viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
        }, false);
    }
}

Math.nrand = function() {
    var x1, x2, rad, y1;

    do {
        x1 = 2 * this.random() - 1;
        x2 = 2 * this.random() - 1;
        rad = x1 * x1 + x2 * x2;
    } while(rad >= 1 || rad === 0);

    var c = this.sqrt(-2 * Math.log(rad) / rad);

    return x1 * c;
};

$(function(){
    $("#mobile-nav").change(function(){
        var href = $(this).val();
        if (href) {
            window.location = href;            
        }
    }).val(window.location.pathname);
 
    var spacerRoom = 40;
    $(window).load(function() {
        $("ul.screenshots").each(function() {
            var $lis = $(this).find("li");
            var z = $lis.length;
            var maxHeight = 0;
            var maxWidth = 0;
            $(this).find("li").each(function(i){
                var zlo = z--;
                var zhi = zlo + 10;
                if ($(this).height() > maxHeight) {
                    maxHeight = $(this).height();
                }
                if ($(this).width() > maxWidth) {
                    maxWidth = $(this).width();
                }
                $(this).css({'z-index': zlo}).data({"zlo": zlo, "zhi": zhi});
                if (!$(this).is(":first-child")) {
                    var angle = Math.nrand() * 3;
                    $(this).css({
                        '-webkit-transform': 'rotate(' + angle + 'deg)',
                        '-o-transform': 'rotate(' + angle + 'deg)',
                        '-moz-transform': 'rotate(' + angle + 'deg)',
                        '-ms-transform': 'rotate(' + angle + 'deg)'
                    });            
                }
            });
            $("<div>").addClass("spacer").css({"float": "left"})
                .data("height", maxHeight + spacerRoom)
                .height(maxHeight + spacerRoom)
                .width(maxWidth + spacerRoom)
                .insertAfter($(this));
        });
    });

    var collapseHandle;

    $("ul.screenshots").hover(
        function() {
            clearTimeout(collapseHandle);
            var height = 0;
            $("ul.screenshots li").each(function() {
                $(this).css({"z-index": $(this).data("zlo")});
            });
            $(this).find("li").each(function(i) {
                $(this).css({"top": height, "z-index": $(this).data("zhi")});
                height += $(this).height();
            });
            $(this).siblings(".spacer").height(height + spacerRoom);
        },
        function() {
            var that = this;
            collapseHandle = setTimeout(function(){
                $(that).find("li").each(function(i) {
                    $(this).css({"top": 0});
                    setTimeout(function() {
                        $(this).css({"z-index": $(that).data("zlo")});
                    }, 1000);
                });
                var oldHeight = $(that).siblings(".spacer").data("height");
                $(that).siblings(".spacer").height(oldHeight);                
            }, 200);
        }
    );

    $(".fancybox").fancybox({
        loop: false,
        helpers : {
            title   : {
                type: 'outside'
            },
            overlay : {
                opacity : 0.8,
                css : {
                    'background-color' : '#000'
                }
            },
            thumbs  : {
                width   : 50,
                height  : 50
            }
        }
    });
});





















