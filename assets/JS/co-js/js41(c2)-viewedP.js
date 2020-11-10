$(function() {

    _dcq.push(
        [
            "track", "Viewed a Product", {
                product_id: "email-marketing-magic",
                name: "Email Marketing Magic",
                categories: "Marketing",
                price: 399,
                currency: "USD",
                product_url: "http://discover.Athlean.com/course/email-marketing-magic",
                image_url: "https://assets-global.website-files.com/5d9f18bb4a6e6c256e0b5e21/5eb17d855ae8dc7d44f11ff2_EMM.jpg",
                brand: "Pat Flynn"
            }
        ]
    );


    $(window).scroll(function() {
        var $body = $(document).height();
        var $footer = $('.footer').height() + 140;
        var $card = $('.price-card').height();
        var $stop = $body - $footer - $card - 320;
        var $wScroll = $(this).scrollTop();
        var $nav = $(".price-card");
        if ($wScroll >= 30 && $wScroll <= $stop) {
            $nav.addClass("sticky");
        } else {
            $nav.removeClass("sticky");
        }
    });
});

$(function() {
    $(window).scroll(function() {
        var $body = $(document).height();
        var $footer = $('.footer').height() + 140;
        var $card = $('.price-card').height();
        var $stop = $body - $footer - $card - 320;
        var $wScroll = $(this).scrollTop();
        var $nav = $(".price-card");
        if ($wScroll >= $stop) {
            $nav.addClass("hide");
        } else {
            $nav.removeClass("hide");
        }
    });
});


jQuery(document).ready(function() {
    function resizeForm() {
        var width = (window.innerWidth > 0) ? window.innerWidth : document.documentElement.clientWidth;
        if (width > 991) {

            $(function() {
                var $body = $('body').width();
                var $container = $('.container.course-flex').width() + 30;
                var $space = $body - $container;
                var $position = $space / 2;
                $(".price-card").css("right", ($position) + 'px');
            });
        }
    }
    window.onresize = resizeForm;
    resizeForm();
});

$(document).ready(function() {
    if (!$.cookie('email-submitted')) {
        $(function() {
            $("a.button.buy-now-cta.w-button").on("click", function(event) {
                event.preventDefault();
                $(".enroll-popup-block").addClass("active");
                $("body").toggleClass("no-scroll");
            });
        });
    }
});

$(function() {
    $(".close-popup").on("click", function(event) {
        event.preventDefault();
        $(".enroll-popup-block").removeClass("active");
    });
});


$("form#Email-Form-3").submit(function() {
    iris.emit("submitted_email", {
        email: $("#Enroll-form-2").val(),
        preenroll: true
    });
    _dcq.push(["identify", {
        email: $("#Enroll-form-2").val()
    }]);
    window.open('https://sso.Athlean.com/secure/30425/checkout/1440093/email-marketing-magic?tgl=1440093-30425&amp;coupon_code=DISCOVERPATMAGIC', '_blank');
    $(".enroll-popup-block").removeClass("active");
    $("body").toggleClass("no-scroll");
    var date = new Date();
    date.setTime(date.getTime() + 90 * 24 * 60 * 60 * 1000);
    $.cookie('email-submitted', true, {
        expires: date
    });
});