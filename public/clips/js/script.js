/*
Template: streamlab - Video Streaming WordPress Theme
Author: Gentechtree
Version: 1.0
Design and Developed by: Gentechtree.com
*/

/*====================================
[  Table of contents  ]
======================================
==> Page Loader
==> Search Button
==> Sticky Header
==> Back To Top
======================================
[ End table content ]
======================================
*/
(function(jQuery) {
    "use strict";
    jQuery(window).on('load', function(e) {

        jQuery('p:empty').remove();

        /*------------------------
                Page Loader
        --------------------------*/
        jQuery("#wiki-loading").fadeOut();
        jQuery("#wiki-loading").delay(0).fadeOut("slow");

        /*------------------------
                Search Button
        --------------------------*/
        jQuery('#wiki-seacrh-btn').on('click', function() {
            jQuery('.wiki-search-form').slideToggle();
            jQuery('.wiki-search-form').toggleClass('wiki-form-show');
            if (jQuery('.wiki-search-form').hasClass("wiki-form-show")) {
                jQuery(this).html('<i class="fa fa-times"></i>');
            } else {
                jQuery(this).html('<i class="fa fa-search"></i>');
            }
        });

        jQuery('.wiki-account-menu').hide();
         jQuery('#wiki-user-btn').on('click', function(e) {
            
            jQuery('.wiki-account-menu').slideToggle();

             e.stopPropagation();
        });

        jQuery('body').on('click' , function(){
            if(jQuery('.wiki-account-menu').is(":visible"))
            {
                jQuery('.wiki-account-menu').slideUp();
            }
        });
       
        /*------------------------
                Sticky Header
        --------------------------*/
        var view_width = jQuery(window).width();
        if (!jQuery('header').hasClass('wiki-header-default') && view_width >= 1023)
        {
            var height = jQuery('header').height();
            jQuery('.wiki-breadcrumb').css('padding-top', height * 1.3);
        }
        if (jQuery('header').hasClass('wiki-header-default'))
        {
            jQuery(window).scroll(function() {
                var scrollTop = jQuery(window).scrollTop();
                if (scrollTop > 300) {
                    jQuery('.wiki-bottom-header').addClass('wiki-header-sticky animated fadeInDown animate__faster');
                } else {
                    jQuery('.wiki-bottom-header').removeClass('wiki-header-sticky animated fadeInDown animate__faster');
                }
            });
        }
        if (jQuery('header').hasClass('wiki-has-sticky')) {
            jQuery(window).scroll(function() {
                var scrollTop = jQuery(window).scrollTop();
                if (scrollTop > 300) {
                    jQuery('header').addClass('wiki-header-sticky animated fadeInDown animate__faster');
                } else {
                    jQuery('header').removeClass('wiki-header-sticky animated fadeInDown animate__faster');
                }
            });
        }
        /*------------------------
                Back To Top
        --------------------------*/
        jQuery('#back-to-top').fadeOut();
        jQuery(window).on("scroll", function() {
            if (jQuery(this).scrollTop() > 250) {
                jQuery('#back-to-top').fadeIn(1400);
            } else {
                jQuery('#back-to-top').fadeOut(400);
            }
        });
        jQuery('#top').on('click', function() {
            jQuery('top').tooltip('hide');
            jQuery('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });

        if(jQuery('.tv-show-back-data').length)
        {
            var url = jQuery('.tv-show-back-data').data('url');
            console.log(url);
            var html = '';
            html += `<div class="tv-single-background">
                <img loading="lazy" src="`+url+`">
            </div>`;
            jQuery('#main').prepend(html);
           
        }
    });
})(jQuery);