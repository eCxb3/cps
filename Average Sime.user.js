// ==UserScript==
// @name         Average Sime
// @namespace    http://tampermonkey.net/
// @version      2077v.2
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

    function nextnote(arr, avg) {
        let nextn = Math.floor(avg);
        nextn++

        let x = arr.slice();
        while (average(x) < nextn) {
            let i = nextn;
            while (i < 10) {
                i++
                x.push(i)
                if (average(x) < nextn) {
                    if (i != 10) {
                        x.splice(x.length--, 1);
                    }
                } else {break}
            }
        }
        x.splice(0, arr.length);
        return x;
    }

    function editnotelist(btnid) {
        let notes = document.querySelectorAll('tbody')[26].childNodes[btnid];
        if (parseInt($(notes).find('td')[2].innerHTML) >= 9) {
            return alert('Вам не поднять свою оценку');
        }

        let note_arr;

        try {
            let note = $(notes).find('td')[1];
            note = $(note).find('span');
            let both_notes = note[0].innerHTML+note[1].innerHTML;
            note_arr = both_notes.split(', ');
        } catch {
            note_arr = $(notes).find('td')[1].innerHTML.split(', ');
        }

        let nn = nextnote(note_arr.map(Number), parseInt($(notes).find('td')[2].innerHTML));
        //return alert('Вам нужно: ' + nn);

        let old_notes = $(notes).find('td')[1];
        let sp_old = document.createElement('span');
        sp_old.innerHTML = old_notes.innerHTML;
        $(old_notes).empty();
        old_notes.append(sp_old);
        let sp_new = document.createElement('span');
        sp_new.innerHTML = ', '+nn.join(', ');
        sp_new.style.color = 'red';
        old_notes.append(sp_new);


        let new_avgavg = note_arr.slice().map(Number);
        Array.prototype.push.apply(new_avgavg,nn);
        $(notes).find('td')[2].innerHTML = average(new_avgavg);
        $(notes).find('td')[2].style.color = 'red';

        return;
    }

    try {
        let avg_i = document.createElement('th');
        avg_i.className = 't-Report-colHead';
        avg_i.align = 'left';
        avg_i.innerHTML = 'Average';

        let avg = document.querySelectorAll('tr')[72];
        $(avg).append(avg_i);

        let lessons = document.querySelectorAll('tbody')[26].childNodes;
        let avgavg = [];
        let count = -1;
        for (let lesson of lessons) {
            count++
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
                        let btnplus = document.createElement('a');
                        btnplus.href='#';
                        btnplus.innerHTML = '+';
                        btnplus.className = 't-Report-cell';
                        btnplus.id = 'EDITNLIST:' + count;
                        btnplus.onclick = function() { editnotelist(btnplus.id.split(':')[1]);};
                        $(lesson).append(btnplus);
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
