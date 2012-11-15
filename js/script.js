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

// Generate rands with a normal distribution rather than uniform.
// Code from http://www.colingodsey.com/javascript-gaussian-random-number-generator/
var nrand = function() {
    var x1, x2, rad, y1;

    do {
        x1 = 2 * Math.random() - 1;
        x2 = 2 * Math.random() - 1;
        rad = x1 * x1 + x2 * x2;
    } while(rad >= 1 || rad === 0);

    var c = Math.sqrt(-2 * Math.log(rad) / rad);

    return x1 * c;
};

$(function(){

    // Mobile nav dropdown activation
    $("#mobile-nav").change(function(){
        var href = $(this).val();
        if (href) {
            window.location = href;            
        }
    }).val(window.location.pathname); // Set initial state to current page
 
    var spacerRoom = 40; // How much breathing room to give the thumbnail area, x and y.

    // Initialzive the fancy portfolio thumbnail expander
    // Needs to ne down on load rather than ready so that we can properly calculate image heights
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
                // Save expanded and collapsed z indices for ease of twiddling them later
                $(this).css({'z-index': zlo}).data({"zlo": zlo, "zhi": zhi});
                if (!$(this).is(":first-child")) {
                    var angle = nrand() * 4;
                    $(this).css({
                        '-webkit-transform': 'rotate(' + angle + 'deg)',
                        '-o-transform': 'rotate(' + angle + 'deg)',
                        '-moz-transform': 'rotate(' + angle + 'deg)',
                        '-ms-transform': 'rotate(' + angle + 'deg)'
                    });            
                }
            });

            // Add the spacer div, which sits behind the thumbnails to float the text for them.
            $("<div>").addClass("spacer")
                .data("height", maxHeight + spacerRoom)
                .height(maxHeight + spacerRoom)
                .width(maxWidth + spacerRoom)
                .insertAfter($(this));
        });
    });

    var collapseHandle, collapseFunc = function() {};

    $("ul.screenshots").hover(
        function() {
            var that = this;
            collapseFunc();
            // We need to make a closure function here that's responsible for collapsing
            // that the collapse func call above can use later to clean up if needed.  
            // Otherwise the previously-expanded one might never get closed.
            collapseFunc = function() {
                $(that).find("li").each(function(i) {
                    $(this).css({"top": 0});
                    setTimeout(function() {
                        $(this).css({"z-index": $(this).data("zlo")});
                    }, 1000);
                });
                var oldHeight = $(that).siblings(".spacer").data("height");
                $(that).siblings(".spacer").height(oldHeight);
                // $.scrollTo($(that).parent(), 200);
            };
            clearTimeout(collapseHandle);
            // $.scrollTo($(that).parent(), 200);
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
            // Only collapse if we've been outside the area for a certain time.
            // Prevents weird wiggles when mousing over small gaps
            collapseHandle = setTimeout(collapseFunc, 200);
        }
    );


    // Only use the lightbox if the screen is fairly wide.  Otherwise the lightboxed images
    // are tiny, which defeats the purpose.
    if ($(window).width() > 600) {
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
        $(".fancybox-iframe").fancybox({
            loop: false,
            type: "iframe",
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

    }
});





















