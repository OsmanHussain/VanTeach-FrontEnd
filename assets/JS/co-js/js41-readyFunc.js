$(document).ready(function() {

    $('.featured-list').slick({
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: "<button type='button' class='slick-arrow slick-prev'><img src='https://assets.website-files.com/5d9373c8dbd2df27409ba653/5da44b23ae7ebd6a5cdef31e_arrow-left.svg' alt='Previous'></button>",
        nextArrow: "<button type='button' class='slick-arrow slick-next'><img src='https://assets.website-files.com/5d9373c8dbd2df27409ba653/5d9f080c1a04364d140277df_arrow.svg' alt='Next'></button>",
        responsive: [{
            breakpoint: 991,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                centerMode: false
            }
        }, {
            breakpoint: 767,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                centerMode: true
            }
        }, {
            breakpoint: 650,
            settings: {
                arrows: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: false
            }
        }]
    });

    if ($(window).width() <= 991) {
        $('.categorie-list').slick({
            infinite: false,
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: false,
            centerMode: true
        });
    };

});