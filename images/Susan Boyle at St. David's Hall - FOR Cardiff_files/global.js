/* visible */
$(function(){

    $(document).on('change', '.ToggleCheckbox', function(){

        var input = $(this);
        var selector = input.data('target');
        var target = $(selector);

        if (input.is(':checked')) {
            target.show();
        } else {
            target.hide();
        }

    });

    $('.ToggleCheckbox').trigger('change');

});

$(function(){
    $('select').selectBox({
        mobile: false,
        hideOnWindowScroll: false,
        keepInViewport: false
    });
});

/* button */
$(function(){

    $('span.button').each(function(){
        var background_color = $(this).css('background-color');
        var color = $(this).css('color');
        $(this).css({'background-color':background_color, 'color':color});
    });

});

/* tab */
$(function(){

    $('a[data-toggle="tab"]').on('show.bs.tab', function(e){
        $(e.target).parent('li').addClass('selected');
        $(e.relatedTarget).parent('li').removeClass('selected');
    });

});

/* tooltip */
$(function(){

    if ($().tooltip) {
        $('.Tooltip').tooltip().not('a').css('cursor', 'help');
    }

});

/* magnific popup */
$(function(){
    if ($().magnificPopup) {

        var galleries = [];

        $('.GalleryLightbox').each(function(){
            var thumb = $(this);
            var i = galleries.length;
            var gallery = $(this).data('gallery');

            if ($.inArray(gallery, galleries) > -1) {
                return;
            }

            galleries[i] = gallery;

            $('.GalleryLightbox[data-gallery="' + gallery + '"]').not('.slick-cloned').magnificPopup({
                type: 'image',
                gallery: { enabled:true },
                image: { titleSrc:'data-caption' }
            });

        });

        $('.GalleryLightbox.slick-cloned').magnificPopup({
            type: 'image',
            image: { titleSrc:'data-caption' }
        });

        $('.VideoLightbox').each(function(){
            $(this).magnificPopup({ type:'iframe' });
        });

    }
});

/* toggle block */
$(function(){
    $(document).on('click', '.ToggleBlock', function(){

        var selector = $(this).attr('href');
        var target = $(selector);
        var toggle = $(this).find('i');

        if (target.is(':visible')) {
            target.hide();
            toggle.html('v');
        } else {
            target.removeClass('hide'); //compensate for bootstrap display:none !important
            target.show();
            toggle.html('^');
        }

        return false;

    });
});

/* loading */
$(function(){

    var url = document.URL;
    var domain = document.domain;
    var phpself = url.replace(domain, '').replace('http://', '').replace('https://', '');
    var target = $('.Loading').filter('a[href="' + phpself + '"]');

    if (target.length) {

        var scroll_top = target.first().offset().top - 200;

        if (scroll_top < 0) {
            scroll_top = 0;
        }

        $('html, body').animate({ scrollTop:scroll_top }, 0);

    }

    $(document).on('click', '.Loading', function(){

        var scroll_top = $(this).offset().top - 200;

        $('html, body').animate({ scrollTop:scroll_top }, 500);
        $('body').append('<div class="modal" style="display:block"><div class="modal-dialog"><div class="modal-content"><div class="loader"></div></div></div></div>');
        $('body').append('<div class="modal-backdrop in"></div>');

    });

});

/* prompt confirm */
$(function(){

    var button = $('.Confirm');

    button.click(function(e){

        e.preventDefault();
        var href = $(this).attr('href');
        var msg = $(this).data('confirm')

        if (!msg) {
            msg = 'Are you sure?';
        }

        bootbox.confirm({
            message: msg,
            animate: false,
            closeButton: false,
            callback: function(rtn){

                if (rtn) {
                    window.location = href;
                }

            }
        });

    });

});

/* usercontent wraps */
$('.usercontent iframe').wrap('<div class="iframe-wrap"></div>');
$('.usercontent table').wrap('<div class="table-wrap"></div>');

/* Smooth scrolling on anchors */
$(function(){

    $('.anchor').on('click',function (e) {
        e.preventDefault();

        var target = this.hash;
        var jQuerytarget = $(target);

        $('html, body').animate({
            scrollTop: jQuerytarget.offset().top
        }, 1000, 'swing', function () {
            window.location.hash = target;
        });

    });
});

/* radiobuttons */
$(document).on('change', '.__radiobuttons input', function(){
    if ($(this).is(':checked')) {
        $(this).closest('.__radiobuttons').find('.input_wrap > label').removeClass('__checked')
        $(this).parent().addClass('__checked');
    }
});

$('.__radiobuttons input:checked').parent().addClass('__checked');

/* checkboxes */
$(document).on('change', '.__checkboxes input', function(){
    if ($(this).is(':checked')) {
        $(this).parent().addClass('__checked');
    } else {
        $(this).parent().removeClass('__checked');
    }
});

$('.__checkboxes input:checked').parent().addClass('__checked');

/* auto height */
var heightCheck = function heightCheck(container_finder, row_finder, content_finder) {
    var container = $(container_finder);
    var browser_width = window.innerWidth;

    if (browser_width > 768) {
        var rows = container.find(row_finder);

        rows.each(function each() {
            var maxHeight = 0;
            var content = $(this).find(content_finder);

            content.each(function eachContent() {
                $(this).height('auto');
                var height = $(this).height();
                if (maxHeight < height) { maxHeight = height; }
            });

            content.height(maxHeight);
        });

    } else {
        container.find(content_finder).height('auto');
    }

};

/* searchblock */
$(function(){

    var mousedown_happened = false;
    var wrap = $('#SearchBlock');
    var input = wrap.find('input');
    var button = wrap.find('button');

    input.focus(function(){
        mousedown_happened = false;
        wrap.addClass('__active');
    });
    input.blur(function(){
        if (mousedown_happened) {
            mousedown_happened = false;
        } else {
            wrap.removeClass('__active');
        }
    });
    button.mousedown(function(){
        mousedown_happened = true;
    });
    button.click(function(){
        if (wrap.hasClass('__active')) {
            return true;
        } else {
            input.focus();
            return false;
        }
    });

});

/* sidemenu */
$(function(){
    var sidemenu_burger = $('.sidemenu-burger');
    var sidemenu_toggle = $('.sidemenu-toggle > span');
    var sidemenu_menu = $('.sidemenu-menu');

    sidemenu_burger.click(function(event){
        event.preventDefault();
        sidemenu_toggle.toggleClass('__open');
        sidemenu_menu.slideToggle();
    });
});

/* shareblock */
$(function(){
    var button = $('.ShareBlockToggle');
    var handler = function(e){

        var target = e.data.target;

        if (!target.hasClass('__active')) {
            $(document).off('click', handler);
            return true;
        }
        if (!$.contains(target.get(0), e.target)) {
            target.removeClass('__active');
            $(document).off('click', handler);
        }
    };

    button.click(function(e){
        e.preventDefault();
        var target = $(this).closest('.ShareBlock');
        target.toggleClass('__active');
        $(document).on('click', { target:target }, handler);
    });
});

/* scrollto */
$(function(){
    $("#ScrollTo").click(function(event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $('.wrapper').offset().top
        }, 1000);
    });
    $("#Anchor").click(function(event) {
        event.preventDefault();
        $('html, body').animate({scrollTop: $('.anchor').offset().top}, 1000);
    });
});

/* tabpanel */
$(function(){
    var tab = $('.tabpanel-tab');
    var panel = $('.tabpanel-panel');

    tab.click(function(event){
        event.preventDefault();
        tab.removeClass('__active');
        $(this).addClass('__active');
        var data_set = $(this).data('set');
        panel.removeClass('__active');
        panel.filter('[data-set="' + data_set + '"]').addClass('__active');
    });
});

/* accordion */
$(function(){
    var accordion = $('.accordion');
    var title = accordion.find('.accordion-head');
    var content = accordion.find('.accordion-content');

    title.click(function(event){
        event.preventDefault();
        $(this).parents('.accordion').toggleClass('__active');
        $(this).siblings().slideToggle();
    });
});

/* SVG fallback */
$(function() {
    var svgSupport = $('html').hasClass('svg');
});

$('.nav').menu();

$('.header').affix({
    offset: {
        top: 100
    }
});

/* Select Box */
// $('select').selectBox();

/* Login Modal */
$(function() {
    function toggleModal() {
        $('.overlay').toggleClass('__active');
        $('.loginmodal').toggleClass('__active');
    }

    function closeModal() {
        $('.overlay').removeClass('__active');
        $('.loginmodal').removeClass('__active');
    }

    $('.ModalTrigger').on('click', function(e) {
        e.preventDefault();
        toggleModal();
    });

    $('.overlay').on('click', function() {
        closeModal();
    })

});

/* Match height for event blocks */
$(document).ready(function() {
    if($('.eventblock').length) {
        $('.eventblock').matchHeight();
    }
    if($('.latestnews-block').length) {
        $('.latestnews-block').matchHeight();
    }
});

/* Video Modal */
$(document).ready(function () {

    $(".VideoModal").magnificPopup({
        type: "iframe",
        removalDelay: 160,
        preloader: !1,
        fixedContentPos: !1
    })
});

/* Form */
$(document).ready(function () {
   $('select[name=\'user_role\']').on('change', function () {
       $(this).closest('form').submit();
   });
});
