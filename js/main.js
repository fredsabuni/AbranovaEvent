

$(function() {
    "use strict"; 
    
    $('.counter').waypoint(function() {
        
        var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',');
        
        $('.total-number-1').animateNumber({
            number: 20, //change value here
            numberStep: comma_separator_number_step
        }, 2000);
        
        $('.total-number-2').animateNumber({
            number: 5000, //change value here
            numberStep: comma_separator_number_step
        }, 2000);
        
        $('.total-number-3').animateNumber({
            number: 10, //change value here
            numberStep: comma_separator_number_step
        }, 2000);
        
        $('.total-number-4').animateNumber({
            number: 3000, //change value here
            numberStep: comma_separator_number_step
        }, 2000);
    
    
    
    }, {
        offset: '80%'
    
    });


    /* ==========================================================================
   sticky nav
   ========================================================================== */
    
    $('.navbar-default').waypoint('sticky', {
        offset: 30
    });




    /* ==========================================================================
   Tabs
   ========================================================================== */
    
    $('#schedule-days a').click(function(e) {
        e.preventDefault()
        $(this).tab('show')
    })


    /* ==========================================================================
   team
   ========================================================================== */
    
    $(".speaker-slider").owlCarousel({
        
        items: 3,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 2]
    
    });


    /* ==========================================================================
   Smooth Scroll
   ========================================================================== */
    
    $('a[href*=#]:not([href=#], #schedule-days a, .event-speaker a)').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: (target.offset().top - 40)
                }, 1000);
                return false;
            }
        }
    });



    /* ==========================================================================
   Speaker bio
   ========================================================================== */
    
    
    var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
    
    
    $('#speaker').find('.event-speaker a[data-type*="speaker-"]').on('click', function(event) {
        event.preventDefault();
        var selected_member = $(this).data('type');
        $('.cd-speaker-bio.' + selected_member + '').addClass('slide-in');
        $('.cd-speaker-bio-close').addClass('is-visible');
        
        
        if (is_firefox) {
            $('main').addClass('slide-out').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
                $('body').addClass('overflow-hidden');
            });
        } else {
            $('main').addClass('slide-out');
            $('body').addClass('overflow-hidden');
        }
    
    });
    
    
    $(document).on('click', '.cd-overlay, .cd-speaker-bio-close', function(event) {
        event.preventDefault();
        $('.cd-speaker-bio').removeClass('slide-in');
        $('.cd-speaker-bio-close').removeClass('is-visible');
        
        if (is_firefox) {
            $('main').removeClass('slide-out').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
                $('body').removeClass('overflow-hidden');
            });
        } else {
            $('main').removeClass('slide-out');
            $('body').removeClass('overflow-hidden');
        }
    });






    /* ==========================================================================
   FAQ accordion
   ========================================================================== */
    
    
    var MqM = 768, 
    MqL = 1024;
    
    var faqsSections = $('.cd-faq-group'), 
    faqTrigger = $('.cd-faq-trigger'), 
    faqsContainer = $('.cd-faq-items'), 
    faqsCategoriesContainer = $('.cd-faq-categories'), 
    faqsCategories = faqsCategoriesContainer.find('a'), 
    closeFaqsContainer = $('.cd-close-panel');
    
    
    faqsCategories.on('click', function(event) {
        event.preventDefault();
        var selectedHref = $(this).attr('href'), 
        target = $(selectedHref);
        if ($(window).width() < MqM) {
            faqsContainer.scrollTop(0).addClass('slide-in').children('ul').removeClass('selected').end().children(selectedHref).addClass('selected');
            closeFaqsContainer.addClass('move-left');
            $('body').addClass('cd-overlay');
        } else {
            $('body,html').animate({'scrollTop': target.offset().top - 19}, 200);
        }
    });
    
    
    $('body').bind('click touchstart', function(event) {
        if ($(event.target).is('body.cd-overlay') || $(event.target).is('.cd-close-panel')) {
            closePanel(event);
        }
    });
    faqsContainer.on('swiperight', function(event) {
        closePanel(event);
    });
    
    
    faqTrigger.on('click', function(event) {
        event.preventDefault();
        $(this).next('.cd-faq-content').slideToggle(200).end().parent('li').toggleClass('content-visible');
    });




    /* ==========================================================================
       Contact Form
       ========================================================================== */
    
    
    $('#contact-form').validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            
            message: {
                required: true,
                minlength: 10
            }
        },
        messages: {
            name: "<i class='fa fa-exclamation-triangle'></i>Please specify your name.",
            email: {
                required: "<i class='fa fa-exclamation-triangle'></i>We need your email address to contact you.",
                email: "<i class='fa fa-exclamation-triangle'></i>Please enter a valid email address."
            },
            message: "<i class='fa fa-exclamation-triangle'></i>Please enter your message."
        },
        submitHandler: function(form) {
            $(form).ajaxSubmit({
                type: "POST",
                data: $(form).serialize(),
                url: "php/contact-me.php",
                success: function() {
                    $('#contact-form :input').attr('disabled', 'disabled');
                    $('#contact-form').fadeTo("slow", 0.15, function() {
                        $(this).find(':input').attr('disabled', 'disabled');
                        $(this).find('label').css('cursor', 'default');
                        $('.success-cf').fadeIn();
                    });
                    $('#contact-form')[0].reset();
                },
                error: function() {
                    $('#contact-form').fadeTo("slow", 0.15, function() {
                        $('.error-cf').fadeIn();
                    });
                }
            });
        }
    });

    /* ==========================================================================
   ScrollTop Button
   ========================================================================== */
    
    
    $(window).scroll(function() {
        if ($(this).scrollTop() > 200) {
            $('.scroll-top a').fadeIn(200);
        } else {
            $('.scroll-top a').fadeOut(200);
        }
    });
    
    
    $('.scroll-top a').click(function(event) {
        event.preventDefault();
        
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
    });


	/* ==========================================================================
	   Collapse nav bar
	   ========================================================================== */
	$(".navbar-nav li a").on('click', function() {
	    $(".navbar-collapse").collapse('hide');
	});

});
