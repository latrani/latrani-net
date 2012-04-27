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

$(function(){
    $("#mobile-nav").change(function(){
        var href = $(this).val();
        if (href) {
            window.location = href;            
        }
    }).val(window.location.pathname);

    console.log($(".fancybox").fancybox());
});





















