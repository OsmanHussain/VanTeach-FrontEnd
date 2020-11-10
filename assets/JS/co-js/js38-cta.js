$(document).ready(function() {
    $('.buy-now-cta').on('click', function(e) {
        iris.emit("clicked_button", {
            button: "discover_cta"
        });
        fbq('trackCustom', 'discover_lead_generated')
        dataLayer.push({
            'event': 'discover_lead_generated'
        })
    });
});

$(document).ready(function() {
    $('form#email-form-2').submit(function() {
        iris.emit("submitted_email");
        _dcq.push(["identify", {
            email: $("#register").val()
        }]);
    });
});


$(document).ready(function() {
    $('form#wf-form-Email-Form-1').submit(function() {
        iris.emit("submitted_email");
        _dcq.push(["identify", {
            email: $("#email-2").val()
        }]);
    });
});

document.addEventListener('om.Optin.success', function(e) {
    var swyk2020CampaignId = 'flfvc7vrkaixj2rfbzlw';
    if (e.detail.Campaign.id !== swyk2020CampaignId) {
        return;
    }

    iris.emit('submitted_email');
    _dcq.push(['identify', {
        email: e.detail.Optin.data.fields.email
    }]);
});

$(document).ready(function() {
    $('.ccpa-consent-banner-accept').click(function() {
        let domain;
        if (window.location.hostname.endsWith("Athlean.com")) {
            domain = ".Athlean.com"
        } else if (window.location.hostname.endsWith("zeachable.cloud")) {
            domain = ".zeachable.cloud"
        } else if (window.location.hostname.endsWith("zeachable.com")) {
            domain = ".zeachable.com"
        } else if (window.location.hostname.endsWith("worksonmy.computer")) {
            domain = ".worksonmy.computer"
        } else {
            domain = ""
        }

        document.cookie = `AthleanAgreeToCookies=true; path=/; domain=${domain}`
        $(".ccpa-consent-bar").hide()
    });
})

$(document).ready(function() {
    var AthleanAgreeToCookies = document.cookie.replace(/(?:(?:^|.*;\s*)AthleanAgreeToCookies\s*\=\s*([^;]*).*$)|^.*$/, "$1")
    if (AthleanAgreeToCookies != "true") {
        $(".ccpa-consent-bar").show()
    }
});


$(document).ready(function() {
    // the buy button available on Discover lead pages
    // this JS only runs if the button is present on the page
    var button = $(".buy-now-cta")
    if (typeof(button) === "object" && button.length !== 0 && typeof button[0].href === "string") {
        // build the formatted cookie value
        var tglKey = new URL(button[0].href).searchParams.get("tgl")
        var formattedTglCookie = tglKey + `-${Math.floor(Date.now() / 1000)}`

        // prepare the current cookie if it exists for manipulation
        var currentTglsCookie = document.cookie.replace(/(?:(?:^|.*;\s*)tgls\s*\=\s*([^;]*).*$)|^.*$/, "$1")
        let newTglsCookie
        if (!!currentTglsCookie && currentTglsCookie.indexOf(tglKey) !== -1) {
            // remove any instances of previously cookied tgl for school product in order to store latest
            newTglsCookie = currentTglsCookie.split("*").filter(tgl => tgl.indexOf(tglKey) === -1).join("*")
            if (!!newTglsCookie && newTglsCookie.substr(-1) !== "*") {
                newTglsCookie += "*"
            }
        } else {
            // if the cookie contains no earlier reference to the school product,
            // add this new Athlean generated lead to its existing value
            newTglsCookie = currentTglsCookie
        }

        // set the new value
        document.cookie = `tgls=${newTglsCookie + formattedTglCookie}*; max-age=${86400 * 90}; path=/; domain=.Athlean.com`
    }
})

$(document).ready(function() {
    const params = {}
    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(s, k, v) {
        params[k] = v
    })

    if (!!params.affcode) {
        document.cookie = `affiliate_code=${params.affcode}; max-age=${86400 * 30}; path=/; domain=.Athlean.com`
    }
})


$(document).ready(function() {

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