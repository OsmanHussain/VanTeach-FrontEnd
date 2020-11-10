$(document).ready(function() {

    //navbar
    $(function() {
        $(window).scroll(function() {
            var $wScroll = $(this).scrollTop();
            var $nav = $(".discover-navbar");
            if ($wScroll >= 50) {
                $nav.addClass("sticky");
            } else {
                $nav.removeClass("sticky");
            }
        });
    });

    //Nav toggle button
    $(function() {
        $(".discover-nav-toggle").on("click", function(event) {
            event.preventDefault();
            $(this).toggleClass("active");
        });
    });

    $(function() {
        $(".discover-navbar-toggle").on("click", function(event) {
            event.preventDefault();
            $('.discover-navbar-submenu').toggleClass("active");
        });
    });

    //$(body).click(function(e) {
    //e.preventDefault();
    //$('.discover-navbar-submenu').removeClass("active");
    //});
    $(document).mouseup(function(e) {
        var container = $(".discover-navbar-submenu");

        if (!container.is(e.target) && container.has(e.target).length === 0) {
            container.hide();
        }
    });

    $(function() {
        $(window).scroll(function() {
            var $wScroll = $(this).scrollTop();
            var $nav = $(".nav");
            if ($wScroll >= 50) {
                $nav.addClass("nav-sticky");
            } else {
                $nav.removeClass("nav-sticky");
            }
        });
    });

    $(function() {
        $(window).scroll(function() {
            var $wScroll = $(this).scrollTop();
            var $nav = $(".nav-black");
            var $subnav = $(".all-categories-sub-menu");
            if ($wScroll >= 50) {
                $nav.addClass("nav-sticky");
                $subnav.addClass("scroll");
            } else {
                $nav.removeClass("nav-sticky");
                $subnav.removeClass("scroll");
            }
        });
    });

    //Nav toggle button
    $(function() {
        $(".nav-toggle").on("click", function(event) {
            event.preventDefault();
            $(this).toggleClass("active");
            $(".nav").toggleClass("active");
            $(".nav-black").toggleClass("active");
            $("body").toggleClass("no-scroll");
        });
    });

    //Nav toggle button
    $(function() {
        $(".nav-sub-item").on("click", function(event) {
            event.preventDefault();
            $(this).toggleClass("active");
        });
    });

    //Popup Toggle button
    $(function() {
        $(".nav-btn").on("click", function(event) {
            event.preventDefault();
            $(".popup-wrapper").toggleClass("active");
            $("body").toggleClass("no-scroll");
        });
    });
    $(function() {
        $(".nav-btn-black").on("click", function(event) {
            event.preventDefault();
            $(".popup-wrapper").toggleClass("active");
            $("body").toggleClass("no-scroll");
        });
    });
    $(function() {
        $(".close-popup").on("click", function(event) {
            event.preventDefault();
            $(".popup-wrapper").removeClass("active");
            $("body").removeClass("no-scroll");
        });
    });

    if ($(window).width() <= 991) {
        $('.categorie-list').slick({
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            centerMode: true
        });
    }

    var body = document.querySelector('body');
    var subNav = document.querySelector('.sub-child-wrapper');

    function closeSubNav() {
        if (subNav && subNav.style.display === 'block') {
            subNav.style.display = 'none';
        }
    }

    body.addEventListener('click', closeSubNav);

});
//Search bar toggle
$(function() {
    $(".search-icon").on("click", function(e) {
        e.preventDefault();
        $('.courses-search').toggleClass("active");
    });
});
$(document).mouseup(function(e) {
    var container = $(".courses-search");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.removeClass("active");
    }
});