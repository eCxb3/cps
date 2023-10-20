// ==UserScript==
// @name           Free kinopoisk
// @namespace      https://github.com/eCxb3/cps
// @version        2077v.1.4.2
// @description    Allows you to watch movies/series on kinopoisk.ru for free.
// @description:ru Позволяет вам смотреть фильмы/сериалы на kinopoisk.ru бесплатно.
// @author         ezX {cps};
// @require        http://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js
// @include        https://www.kinopoisk.ru/*
// @include        https://flicksbar.*/*
// @include        *://*svetacdn.*/*
// @include        *://*framprox.*/*
// @include        *://*kodik.*/*
// @connect        www.kinopoisk.ru
// @icon           https://www.google.com/s2/favicons?sz=64&domain=kinopoisk.ru
// @grant          GM_xmlhttpRequest
// @run-at         document-start
// @updateURL      https://github.com/eCxb3/cps/raw/main/Free%20kinopoisk.user.js
// @downloadURL    https://github.com/eCxb3/cps/raw/main/Free%20kinopoisk.user.js
// @compatible	   Chrome
// @compatible	   Edge
// @compatible	   Firefox
// @compatible	   Opera
// @license        CC-BY-SA-4.0
// ==/UserScript==

/*
_________        ___.                                     __
\_   ___ \___.__.\_ |__   _________________  __ __  ____ |  | __
/    \  \<   |  | | __ \_/ __ \_  __ \____ \|  |  \/    \|  |/ /
\     \___\___  | | \_\ \  ___/|  | \/  |_> >  |  /   |  \    <
 \______  / ____| |___  /\___  >__|  |   __/|____/|___|  /__|_ \
        \/\/          \/     \/      |__|              \/     \/
                                             _________ __
                                            /   _____//  |_  ____   ___________  ______
                                            \_____  \\   __\/ __ \_/ __ \_  __ \/  ___/
                                            /        \|  | \  ___/\  ___/|  | \/\___ \
                                           /_______  /|__|  \___  >\___  >__|  /____  >
                                                   \/           \/     \/           \/
*/


(function() {
    'use strict';
    const $ = jQuery.noConflict(true);

    function addGlobalStyle(css) {
        let $head = $('head');
        if (!$head) return
        return $('<style>', {type: 'text/css', text: css}).appendTo($head)
    }

    const kinopoisk = function() {
        addGlobalStyle(`@keyframes spinner {0% {transform: rotate(0deg);} 100% {transform: rotate(360deg);}} @-webkit-keyframes spinner {0% {transform: rotate(0deg);} 100% {transform: rotate(360deg);}} .spinner {display: block;position: absolute;transform: translate(-50%, -50%);width: 30px;height: 30px;border-radius: 50%;border: 4px solid rgba(0, 0, 0, 0.1);border-width: 6px;border-top-color: #b5b5b5;animation: spinner 0.6s linear infinite;} font[size='70'] {font: 25px normal tahoma, verdana, arial, sans-serif;}`)
        document.addEventListener('DOMContentLoaded', function() {
            const $oldButton = $('button.kinopoisk-watch-online-button');

            if ($oldButton.length) {
                let $spin = $('<div>', {class: 'spinner', style: 'margin-top: 5px'});

                $oldButton.parent().css({'display': 'flex', 'justify-content': 'center'});

                $oldButton.parent().append($spin)

                $oldButton.css('pointer-events', 'none');
                $oldButton.find('*').each(function() {
                    $(this).css('filter', 'blur(5px)');
                });

                let check_load = setInterval(function() {
                    if (!$('.spinner').length || document.readyState === 'complete') {
                        $spin.remove();
                        setTimeout(function() {
                            let $ConButton = $oldButton.parent()
                            $oldButton.remove();
                            $ConButton.append($('<button>', {html: '<span class="style_iconLeft__Kq1ig" data-tid="53b4357d"><span class="styles_icon__iKaVd" data-tid="6cb8d12f"></span></span><span class="styles_defaultText__PgVb9 undefined" data-tid="6cb8d12f">Смотреть</span>', class: $oldButton.attr('class')}).click(function() {const site = window.location.href.split('kino'); window.location.href = `${site[0]}ss${site[1]}`;}))

                            clearInterval(check_load);
                        }, 10);
                    }
                }, 50);
            } else {
                let $spin = $('<div>', {class: 'spinner', style: 'margin-top: 2px'});
                let $ConButton = $('div.styles_buttonsContainer__HREZO').length ? $('div.styles_buttonsContainer__HREZO') : $('div.styles_buttonsContainer__r_AHo');

                let $btnLoad = $('<div>', {class: 'styles_button__tQYKG'}).append($('<button>', {class: 'style_button__PNtXT style_buttonSize52__b5OBe style_buttonPrimary__ndPAb style_buttonLight____6ma style_withIconLeft___Myt9', style: 'background: rgba(0,0,0,.10) !important; pointer-events: none;', html: '<span class="style_iconLeft__Kq1ig" data-tid="53b4357d"><span class="styles_icon__iKaVd" data-tid="6cb8d12f" style="filter: blur(5px)"></span></span><span class="styles_defaultText__PgVb9 undefined" data-tid="6cb8d12f" style="filter: blur(5px)">Смотреть</span>'}).append($spin)).prependTo($ConButton);

                let checkLoad = setInterval(function() {
                    if (!$('.spinner').length || document.readyState === 'complete') {
                        $btnLoad.remove();
                        $ConButton.prepend($('<div>', {class: 'styles_button__tQYKG'}).append($('<button>', {class: 'style_button__PNtXT kinopoisk-watch-online-button styles_watchOnlineButton__ruFtI style_buttonSize52__b5OBe style_buttonPlus__TjQez style_buttonLight____6ma style_withIconLeft___Myt9', html: '<span class="style_iconLeft__Kq1ig" data-tid="53b4357d"><span class="styles_icon__iKaVd" data-tid="6cb8d12f"></span></span><span class="styles_defaultText__PgVb9 undefined" data-tid="6cb8d12f">Смотреть</span>'}).click(function() {const site = window.location.href.split('kino'); window.location.href = `${site[0]}ss${site[1]}`})));
                        clearInterval(checkLoad);
                    }
                }, 50);
            }
        });
    };


    const watching = function() {
        addGlobalStyle(`body {animation: colorChange .75s;} @keyframes colorChange {0% {background-color: #1E1E1E;} 100% {background-color: #2A3440;}} section {transform: translateY(5.6vh); min-height: 550px;} info {display: block; margin-top: 90vh;} ui {transition: transform 2s ease-in-out; display: block;} .star {margin: 25px 2px; height: 0; width: 0; position: relative; border-right: 17.5px solid transparent; border-bottom: 12.25px solid #979797; border-left: 17.5px solid transparent; transform: rotate(35deg);} .star:before, .star:after {content: ""; height: 0; width: 0; position: absolute;} .star:before {top: -9.1px; left: -11.2px; border-bottom: 14px solid #979797; border-left: 5.25px solid transparent; border-right: 5.25px solid transparent; transform: rotate(-35deg);} .star:after {top: 0.7px; left: -18px; border-right: 17.5px solid transparent; border-bottom: 12.55px solid #979797; border-left: 17.5px solid transparent; transform: rotate(-70deg);} .active-star, .active-star:before, .active-star:after {border-bottom-color: #c6cbf1;} .head_some-info {display: flex; margin-bottom: 15px;} .title_some-info {width: 160px;} .title_some-info, .some-info {font-size: 0.83em; font-weight: bold; max-width: 500px;}`);

        $('<info>', {style: 'display: none'}).append(
            $('<div>', {style: 'max-width: 1000px; min-width: 300px; margin-left: auto; margin-right: auto;'}).append(
                $('<div>', {style: 'background-color: #222a33; border-radius: 12px; box-shadow: -2px 3px 6px 2px rgba(0, 0, 0, 0.3); padding: 20px 0 5px 15px;', class: 'information'})
            )
        ).appendTo($('body'));

        $('title').text(`Кинопоиск.`);
        $('body').hide()

        document.addEventListener("DOMContentLoaded", function() {

            $('div[style="position: fixed !important; height: 305px !important; width: 480px !important; top: 0px !important; left: auto !important; z-index: 2147483647; right: 0px !important; margin: 0px !important;"]').hide().remove()

            $('div#TopAdMb:eq(0), div.topAdPad:eq(0), div#tgWrapper:eq(0)').hide().remove();



            $('body').show();

            $('head').append('<link rel="icon" href="https://kinopoisk-ru.clstorage.net/1jl61k131/6c3b11mr2/oyV_OzKp_0NaznH5OZz57SD7x2LyqJdTr3wYd-9BcXe3lxk8jFuIBeHTZKMalF3QZMVSHXwthDxVt3oAmlLOLg_Z-vaTMSMbSsNNhTmp_ZUIjrcCh9zvi2pAcGf7qRQPj3MhiMgbNIgJlwgrJoy48Ii55hEUpPh8XQ6awMqGCuav9VoWQw3fBypWETmhwZHJOALfl6_Aq0O7cPCXCzX447PXMWxMA4Colf94d7qkYFj0wRbZ5LxwuOkKIqwGvmp-kzXyws91gy8ygj0RPQ31vZAOS2cXuNtnk_yMV69dBHsP0_VATO8kPGkHBH9K9LwwAMne1WxoHBTtGpLctr7WEks1FhpvCUuH1qY9wU1JxZ0wckf_67CH38sAANMTGcwfZ9OVjFT7dLgVn7yrphzgfJwxihVwOJAAtcqSmPIy2jIzbTa65wHP49qG_YH1-d0N9HpfSxPEq3sLeJCTh1FMc0tvKdQAc7gowUPwUxIwVNyI_WYBxLQsoL3KFqTSevIekyHWDicNVxOSPp2dsTl1BTDyc8-j0Cd7o0SIewNRYNc_jxWgxKt4jAmfdCcCDPhcnAni1fjkiPzpamKcujIOlntt-gar9Z-XBtrJ4cm9EZmoiudzk8BTxy8U_IvTEYhLy9v5HOAriIRpQ7DbJrhUoJz9Fu3UeBRwSc6GnL7GhoK70YI6M1H7o8LOwaWJPV2VlM7T85ssC6efGEDXd5XoG8fnmSDMc1Qofb_IGz50cOC8iTZ5_GSs2MX6kvS2avq2Qz1yYqvF__tGokH9RbmlWQDif6sTBO8ju3zEmx9teCcbA0G8WJ-sxAnjlF-W5LR84CVSYXyQFKCJutKsDo7GLpNhPsILwc-Tmk5hFQEB7YU8YkvrJ_R_L6dgeBdXSdTjN4fxqMDnuHR5R-BP7gCsvIjJFtXU9JwQpTLqvEKW_sbjIeZ-OykT1wJOXQ0ZCYFFCGZnI_dUfzc_XODzwzHEl6NDQQAYB2A4tQuc90boBHQ0OWZldPgA_PGCwpTOzmq-b0maiusF-yOutk29mS1xSbAOz3_vmAtHSwTwkwMxmM-PixGc7MdsLJEL_JOekIA8uFXOceQ4tJwhrpIs3gaSDlP5Iu5nPUPnJhZVYd1FXWlQ4ncTL1wr66tokEdDVRDrZ-spMJwPhDgF8xArKvxwzHih5lGIqHDQXf7eZELilp5fXapCKzXHw07-te1NVVmxDO73o_egc6fLSDhPw01gnwObdWyA2_x09QvEw-Z8rCygkQbFdDg8_NWigjzSflqCL4W-ykOFE2sOGl09NfkZDZCWT89rGIM_ywQwR0dNbOu7c0UQdPtkKE3n4KtqkEhEjN3aLTwY8MzJYvI0uuJWmjOt9tprkUdDmvrZQTFd3TUwzvcHk3zvv7vYsONzbZCL78NlvIArlAzVt-DbzixUuDzJhn3IyPgk_WrutLpaVvoXcTbGG1XTmy7GwQnFGXUB7LJPtw-Mn6MH4FQr_0lgA2_zCZiAl-gQZfeY8-oAKCgURXItXBDwoPHOFhyOsgJmo0FiEhedwwtWCl0FVR2ZlZTOZ4ff3AMzEwDgaxNBDNO_O-0wjHeAkBW37KvmjEgAAP1ywfCkCNTB7nrUItJubkOxWp4XHSNvuhK1JcWlWe0wYv-Li0R7O48o8GPnWWSDexNBqGQvHKDZz9SDTiDovBTN6nHQLOwQfYqGLHJGhnpvdT5KB0nfr9reKTmpSXn9vBIn7_eII1_HzERbkxXgI7P7gSjga6hMZctoM0r4hFzMuQbFaPgwQN1mEiAOSkb6e80ixpOxB5s-ml35rZUZiaju8yMbdCu7CwTU068JjBu_D-GcmJNozMGXHDNOEDTYkAlaYQisCFTtvla0pk7ehu8plvqfnUdTpsLxpbUx-W3Utp_3O0wPXwtYlIt7mRDnAwcZ1BDjpFDFFzAzBpS8NMz1flFEYJQAcfJauEJ2kpqncY46Z8kDC_a2lTFVAenFPJpf4zv8gx8n7PjHAznEB3_nzQD855RM8ftwA_r8tDgguZp5sOTw0F2yTmx2ToYew72mWpOp3xuKOjm1lRWlbZR-v7-3XK-3m2D4V2fdnE8b5820fO-0pJEPdM_2vOzQ4InGbYjA2JRtYp70ptoucuvBYvI_uavXPia57UUpzW04ehP3nwS_b1fsFCtXpdgrOwvtOMBTpKyFlwArsnTc6AAlipHcCJhE8SZi7Oq2iiqjsZ7Cz1krTzaS7WkJScUBaGor4xvQqz8z0HgDWynUCydL7WTEd5C88eP4Q2IcxIQATTbF9BSULL22DtxaWs6iWzH-jj-RIxd2Ws0ltd0N-VTOp-vbVIcn8_hoH-dpWEvvt52gdBcAoIlbdDtqmMyMFKHGhQyIYLTxFl5MBp6Ost9NEkLPudvncpqR8a2VWZ2cLrd_h7gvL0vcZGerLXAnj9e5ZFADgNT5Y9Rf9vRAtAQxQpX0lHAgNbJWpHKe4i5bdQI2n0Ev74o2La2lASUReK53J6eMKxOnEMwjK8VIR7uHzUjsnwQIyZsIzwZ4bDAUdU4NzDTogP1ypsgCEsL2Jy32ike9l2MCmunN0cWFHWC-NyvzdAsnS-x0m_u5lHfPy5VImJ_o0B0fXKd-4EzIsPWKATiMgFTtsiaoVsryQpMNVm5DDYeDNrbdpUG9-eWA8jOHL7jjH1fU6F_r7YRv92MVmJALUHBh-4C7Kjz4BAytQpkEKPj4xcJCxErmWp4b9b5uO9l7owJ2OQ0ZrU3FaBI39x98H_9zbMijxx18W8dbLeRAD7SY-c9c_yLsSMzkUVppBPDYCOluCkByTv62S23Wtot9y9M-CiWFXYXVGWS6twuv8KPH_9gAK08ZCCfHv6mICMv0EFVvXJvm_Dzs7CXSWXhonEgJjopcssraqjMF_vqLGd8Tdtoh9YU96Vl8ft-3ByBz309w1NPjIZRbI_vxVGhDiESJk_BTkrDcIDgNPvVgtByM3WIA/projector-favicon/favicon-16.svg" type="image/svg+xml">');
            let $Video_pleer = $('div.wrapper').css('width', '70%').wrap('<div style="display: flex; align-items: center"></div>').parent();
            $Video_pleer.css('display', 'none'); $Video_pleer.addClass('VideoPleer');
            $('body').append('<div class="spinner"></div>');
            addGlobalStyle(`@keyframes spinner {0% {transform: rotate(0deg);} 100% {transform: rotate(360deg);}} @-webkit-keyframes spinner {0% {transform: rotate(0deg);} 100% {transform: rotate(360deg);}} .spinner {display: block;position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);width: 50px;height: 50px;border-radius: 50%;border: 4px solid rgba(0, 0, 0, 0.1);border-width: 6px;border-top-color: #b5b5b5;animation: spinner 0.6s linear infinite;} font[size='70'] {font: 25px normal tahoma, verdana, arial, sans-serif;}`)
            addGlobalStyle(`.header_container {background-color: #1b2229; border-radius: 48px; margin-right: 5px; width: 46px; transition: all 0.5s ease-in-out;} .header_homepage {filter: invert(45%); position: absolute; transform: translateY(32%) translateX(-35px); opacity: 0; transition: all 0.5s ease-in-out; user-select: none;} .header_homepage:hover {filter: invert(30%)} .header_container:hover {width: 80px; transition: all 0.5s ease-in-out;} .header_container:hover .header_homepage {opacity: 1; transform: translateY(32%) translateX(-2px); transition: transform 0.5s ease-in-out, opacity .5s ease-in-out;} iframe.kinobox__iframe, div.kinobox__loaderWrapper {border-radius: 10px;} body {user-select: none;} .kinobox {border-radius: 10px; box-shadow: -2px 2px 6px 2px rgba(0, 0, 0, 0.3);} .kinobox__menu--list {border-radius: 6px 0 0 6px; transition: all .2s ease-in-out; outline: none; box-shadow: -1px -1px 6px 1px rgba(0, 0, 0, 0.3);} .kinobox__menuItem {color: white; background: #41536b !important;} .kinobox__menuItem:hover {background: #7ba2d1 !important;} .kinobox__menuItem--active {background: #5d7ea5 !important;}`)
            addGlobalStyle(`.watch_mode {position: relative; width: 20px; height: 20px;} .watch_mode:hover {filter: invert(30%) !important;} .watch_mode:before {background-image: url(https://yastatic.net/s3/kinopoisk-frontend/hd-www/release/_next/static/media/top-arrow.025c12cf.svg); top: 1px; right: 0} .watch_mode:after {background-image: url(https://yastatic.net/s3/kinopoisk-frontend/hd-www/release/_next/static/media/bottom-arrow.b4fcf81a.svg); top: 10px; left: 3px;} .watch_mode:before, .watch_mode:after {position: absolute; width: 8px; height: 8px; content: ""; background-repeat: no-repeat; background-position: 50%; background-size: contain;} .watch_active:before, .watch_active:after {transform: rotate(180deg)} .poster.watch, .kinobox__menu.watch {display: none !important} .united_el.watch {max-width: 97.56% !important} .VideoPleer.watch {justify-content: center}`);
            GM_xmlhttpRequest({
                method: "GET",
                url: 'https://www.kinopoisk.ru'+window.location.pathname,
                onload: function(response) {

                    let $NameFilm = $(response.responseText).find('h1.styles_title___itJ6.styles_root__QSToS').children().first().text(); if ($NameFilm === '') {$NameFilm = $(response.responseText).find('h1.styles_title__65Zwx.styles_root__l9kHe').children().first().text()}
                    let alt_name = $(response.responseText).find('span.styles_originalTitle__JaNKM').text();
                    let url = $(response.responseText).find('img.film-poster').attr('src');

                    let $table = $(response.responseText).find('.styles_root__5PEXQ').parents().eq(1);
                    let $score = $(response.responseText).find('.film-rating-value').children().eq(0).text() !== '–' ? parseFloat($(response.responseText).find('.film-rating-value').children().eq(0).text(), 10) : $(response.responseText).find('.film-rating-value').children().eq(0).text();
                    let $year = $table.children().first().children().eq(1).children().eq(0).text();
                    let $country = $(response.responseText).find('.styles_root__5PEXQ').parent().prev().children().eq(1).text();
                    let $genres = $(response.responseText).find('.styles_root__5PEXQ').children().first().find("a").map(function() {return $(this).text()}).get().join(', ');
                    let $duration = $table.children().last().children().eq(1).children().eq(0).text();
                    let $slogan = $(response.responseText).find('.styles_root__5PEXQ').parent().next().children().eq(1).text();
                    let $description = $(response.responseText).find('.styles_paragraph__wEGPz').text();

                    $('title').text(`Кинопоиск. ${$NameFilm}`);
                    $('<section>').append(
                        $('<div>', {class: 'united_el', style: 'max-width: 1200px; min-width: 300px; margin-left: auto; margin-right: auto; transition: max-width .2s ease-in-out;'}).append(
                            $('<div>', {style: 'background-color: #222a33; border-radius: 12px; box-shadow: -2px 3px 6px 2px rgba(0, 0, 0, 0.3); margin: 0 auto 15px;'}).append(
                                $('<div>', {style: 'padding: 10px 15px; position: relative;'}).append(
                                    $('<header>', {class: 'NameFilm_head'}).append(
                                        $('<h2>', {style: 'margin-bottom: 10px; display: inline-block; font: 20px normal tahoma, verdana, arial, sans-serif; color: #b5b5b5'}).append(
                                            $('<div>', {style: 'display: flex; align-items: center;'}).append(
                                                $('<div>', {class: 'header_container'}).append(
                                                    $('<i>', {style: 'margin-top: 15px; margin-bottom: 16px; margin-left: 15px; margin-right: 20px;', class: 'back-arrow', title: 'Назад', draggable: 'false'}).click(function() {window.location.host = 'www.kinopoisk.ru'})
                                                ).append(
                                                    $('<img>', {class: 'header_homepage', src: 'https://avatars.mds.yandex.net/get-bunker/120922/4a5dd24b637255a8fc5190bb353ef60c21018288/orig', title: 'Главная', draggable: 'false'}).click(function() {window.location.href = 'https://www.kinopoisk.ru'})
                                                )
                                            ).append(
                                                $('<div>', {style: 'user-select: text; filter: drop-shadow(5px 4px 5px rgba(0, 0, 0, 0.3));'}).append(alt_name == 0 ? $NameFilm : `${$NameFilm} / ${alt_name}`)
                                            )
                                        )
                                    )
                                ).append($Video_pleer)
                            )
                        )
                    ).append(
                        $('<pre_info>', {style: 'display: none; margin-top: 1.6rem; justify-content: center;'}).append(
                            $('<div>', {style: 'border: solid #171c21; border-width: 0 3px 3px 0; display: inline-block; padding: 3px; transform: rotate(45deg);', title: 'Прокрутите вниз для подробной информации'})
                        )
                    ).appendTo($('body'))

                    $Video_pleer.append(
                        $('<div>').append(
                            $('<img>', {style: 'margin-left: 10px; border-radius: 6px; box-shadow: 2px 2px 6px 3px rgba(0, 0, 0, 0.3);', class: 'poster', src: url, draggable: 'false'})
                        )
                    ).append(
                        $('<div>', {style: 'display: flex; position: absolute; align-self: end; bottom: 0; right: 0; margin: 0 16px 10px 0;'}).append(
                            $('<i>', {class: 'watch_mode', style: 'filter: invert(45%);'}).click(function() {$(this).toggleClass('watch_active'); $('.poster, .kinobox__menu, .united_el, .VideoPleer').toggleClass('watch')})
                        )
                    );

                    $('.information').append(
                        $('<div>', {style: 'display: flex;'}).append(
                            $('<div>').append(
                                $('<img>', {style: 'border-radius: 6px; box-shadow: 2px 2px 6px 3px rgba(0, 0, 0, 0.3);', src: url, draggable: 'false'})
                            )
                        ).append(
                            $('<div>', {style: 'margin: 15px 0 0 15px; font: 14px normal tahoma, verdana, arial, sans-serif;color: #b5b5b5; filter: drop-shadow(5px 4px 5px rgba(0, 0, 0, 0.3));'}).append(
                                $('<h2>', {style: 'display: flex;'}).append(
                                    'Информация'
                                ).append(
                                    $('<div>', {style: 'margin: -20px 45px 0 auto;'}).append(
                                        $('<div>', {style: 'display: flex;'}).append(
                                            $('<div>', {style: 'font-size: 14px;display: flex;position: relative;'}).append(
                                                $('<div>', {class: 'star'})
                                            ).append(
                                                $('<div>', {class: 'star'})
                                            ).append(
                                                $('<div>', {class: 'star'})
                                            ).append(
                                                $('<div>', {class: 'star'})
                                            ).append(
                                                $('<div>', {class: 'star'})
                                            )
                                        ).append(
                                            $('<div>', {style: 'font-weight: bold; font-size: 30px; color: #c6cbf1; margin: auto 0 auto 15px;', text: $score})
                                        )
                                    ).append(
                                        $('<div>', {style: 'font-size: 0.83em; font-weight: bold; display: flex; justify-content: center;', text: 'Рейтинг'})
                                    )
                                )
                            ).append(
                                $('<div>', {style: 'font-size: 15px;'}).append(
                                    $('<div>', {class: 'head_some-info'}).append(
                                        $('<div>', {class: 'title_some-info', text: 'Год'})
                                    ).append(
                                        $('<div>', {class: 'some-info', text: $year})
                                    )
                                ).append(
                                    $('<div>', {class: 'head_some-info'}).append(
                                        $('<div>', {class: 'title_some-info', text: 'Страна'})
                                    ).append(
                                        $('<div>', {class: 'some-info', text: $country})
                                    )
                                ).append(
                                    $('<div>', {class: 'head_some-info'}).append(
                                        $('<div>', {class: 'title_some-info', text: 'Жанры'})
                                    ).append(
                                        $('<div>', {class: 'some-info', text: $genres})
                                    )
                                ).append(
                                    $('<div>', {class: 'head_some-info'}).append(
                                        $('<div>', {class: 'title_some-info', text: 'Время'})
                                    ).append(
                                        $('<div>', {class: 'some-info', text: $duration})
                                    )
                                )
                            ).append(
                                $('<div>', {style: 'display: flex; justify-content: center; margin-top: 25px; font-style: italic; font-weight: bold; font-size: 13px;', text: $slogan})
                            ).append(
                                $('<div>', {style: 'display: flex; justify-content: center; margin: 30px 0 10px 0; font-weight: bold; font-size: 12px;', text: $description})
                            )
                        )
                    );
                    let $stars = Math.round($score / 2);
                    for (let i=1; i<=$stars; i++) {$('.star').filter(':not(.active-star)').eq(0).addClass('active-star')}

                    $('.spinner').remove();
                    $('<ui>').append($('section')).append($('info')).appendTo($('body'));
                    $Video_pleer.css('display', 'flex');$('info').css('display', 'flex');$('pre_info').css('display', 'flex');

                    window.addEventListener("wheel", function(event) {
                        if (event.deltaY > 0) {
                            $('ui').css('transform', 'translateY(-65.8%)')
                        } else if (event.deltaY < 0) {
                            $('ui').css('transform', '');
                        }
                    });
                },
                onerror: function() {
                    window.location.reload();
                }
            })
            addGlobalStyle(`@media (max-width: 1200px) {.watch_mode {display: none}} @media (max-width: 50rem) {.poster {display: none} .wrapper, .NameFilm_head {width: 80% !important; margin-left: auto; margin-right: auto}} [class*="back-arrow"] {color: #888 !important; width: 0; height: 0; border-width: 6px; border-style: solid; border-bottom-color: transparent; border-left-color: transparent; margin: 10px; transform: rotate(-135deg)} [class*="back-arrow"]:hover {color: #aaa !important} [class*="back-arrow"]:before {right: 0; top: -3px; position: absolute; height: 4px; box-shadow: inset 0 0 0 32px; transform: rotate(-45deg); width: 15px; transform-origin: right top} [class*="back"] {position: relative; display: inline-block; vertical-align: middle; color: #666; box-sizing: border-box} [class*="back"]:after, [class*="back"]:before {content: ""; box-sizing: border-box}`);
        });
    };

    if (window.location.host === 'www.kinopoisk.ru') {
        addGlobalStyle(`@keyframes spinner {0% {transform: rotate(0deg);} 100% {transform: rotate(360deg);}} @-webkit-keyframes spinner {0% {transform: rotate(0deg);} 100% {transform: rotate(360deg);}} .spinner {display: block;position: absolute;transform: translate(-50%, -50%);border-radius: 50%;border: 4px solid rgba(0, 0, 0, 0.1);border-top-color: #b5b5b5;animation: spinner 0.6s linear infinite;} font[size='70'] {font: 25px normal tahoma, verdana, arial, sans-serif;}`)
        document.addEventListener('DOMContentLoaded', function() {
            $('body').on('click', 'a[href]:not(.styles_page__zbGy7)', function() {
                $(this).off('click');
                var url = $(this).attr('href');
                window.location.href = url;
            });
            setInterval(function() {
                $("a[href*='/watch/']").filter(':not(.processed):not(:contains("Смотреть"))').each(function() {
                    $(this).attr('href', $(this).attr('href').replace(/\/watch\/.*/, ''));
                    $(this).addClass('processed');
                });
            }, 200);
        });
        if (!window.location.pathname.includes('/film') && !window.location.pathname.includes('/series')) {
            document.addEventListener('DOMContentLoaded', function() {
                setInterval(function() {
                    $('a:contains("Смотреть"):not(.processed)').each(function() {
                        let $spin = $('<div>', {class: 'spinner', style: `margin-top: 1px; width: ${$(this).outerHeight()/52*30}px; height: ${$(this).outerHeight()/52*30}px; border-width: ${Math.ceil($(this).outerHeight()/52*30/5)}px`});
                        let $old = $(this);
                        $old.addClass('processed');

                        $old.css('pointer-events', 'none');
                        $old.contents().filter(function() {
                            return this.nodeType === 3;
                        }).wrap("<span></span>");
                        $old.find('*').css('filter', 'blur(5px)');

                        $old.append($spin);
                        let check_load = setInterval(function() {
                            if (!$('.spinner').length || document.readyState === 'complete') {
                                clearInterval(check_load);
                                $spin.remove();
                                setTimeout(function() {
                                    $old.attr('href', `https://sspoisk.ru/${$old.attr('href').split('/')[1]}/${$old.attr('href').split('/')[2]}/`).find('*').css('filter', '').end().css('pointer-events', 'unset');
                                }, 10);
                            }
                        }, 50);
                    });
                });
            });
        } else {
            kinopoisk();
        }
    } else if (window.location.host.includes('flicksbar') && !(window.location.pathname.includes('kinobox/'))) {
        $('title').text(`Кинопоиск.`);
        watching();
    } else {
        const blockedDomains = ["aj1907", "4251.tech", "spylees", "res81", "res45", "xcec", "vidalak", "cdn-rtb", "kimberlite", "itraff", "pub-eu", "adlook", "ad.moe.video", "playmatic"];

        const originalOpen = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function (method, url) {
            for (const domain of blockedDomains) {
                if (url.includes(domain)) {
                    this.abort();
                    return;
                }
            }
            originalOpen.apply(this, arguments);
        };
    }
})();
