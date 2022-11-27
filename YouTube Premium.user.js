// ==UserScript==
// @name         YouTube Premium Logo
// @namespace    http://github.com/
// @version      2077v.2
// @description  Changes the youtube logo to premium.
// @author       ezX 「CYBERPSYCHOOOOOS」
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
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

    let logo = $('#logo-icon');
    $(logo).empty();
    let imglogo = document.createElement('img');

    if ($('html').is('[dark]')) {
        imglogo.src = 'https://i.imgur.com/m3TlTOK.png';
    } else {
        imglogo.src = 'https://i.imgur.com/k3guVls.png';
    }

    imglogo.style.width = '94px';
    $(logo).append(imglogo);

})();
