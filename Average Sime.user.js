// ==UserScript==
// @name         Average Sime
// @namespace    http://tampermonkey.net/
// @version      2077v.1
// @description  Cyberpunk Coding
// @author       ezX
// @match        https://agenda.sime.md/ords/f?p=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=sime.md
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @grant        none
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

    function average(arr) {
        var finalstate = arr.reduce(
            function (state, a) {
                state.sum += a;
                state.count += 1;
                return state;
            },
            { sum: 0, count: 0 }
        );
        return finalstate.sum / finalstate.count;
    }([2, , , 6]);

    try {
        let avg_i = document.createElement('th');
        avg_i.className = 't-Report-colHead';
        avg_i.align = 'left';
        avg_i.innerHTML = 'Average';

        let avg = document.querySelectorAll('tr')[72];
        $(avg).append(avg_i);

        let lessons = document.querySelectorAll('tbody')[26].childNodes;
        let avgavg = [];
        for (let lesson of lessons) {
            if (lesson.nodeName == 'TR') {
                let childsec = $(lesson).children()[0];
                if ($(childsec).children()[0].innerHTML != 'Educație pentru societate' ) {
                    let note = document.createElement('td');
                    note.className = 't-Report-cell';
                    let mathavg = parseInt(average($(lesson).children()[1].innerHTML.split(', ').map(Number)) * 100) / 100;
                    if (mathavg) {
                        note.innerHTML = mathavg;
                        avgavg.push(note.innerHTML);


                        $(lesson).append(note);
                        //let btnplus = document.createElement('button');
                        //btnplus.innerHTML = '+';
                        //$(lesson).append(btnplus);
                    }
                }
            }
        }

        let ntr = document.createElement('tr');
        let aa = document.createElement('td');
        aa.className='t-Report-cell';
        aa.style.cssText = 'color: skyblue; font-weight:bold;';
        aa.innerHTML='A/A';
        $(ntr).append(aa);
        $(ntr).append(document.createElement('td'));
        let ntd = document.createElement('td');
        ntd.className = 't-Report-cell';
        ntd.innerHTML = parseInt(average(avgavg.filter(f => f != 'NaN').map(Number)) * 100) / 100;
        $(ntr).append(ntd);
        $(document.querySelectorAll('tbody')[26]).append(ntr);
    } catch {}
})();
