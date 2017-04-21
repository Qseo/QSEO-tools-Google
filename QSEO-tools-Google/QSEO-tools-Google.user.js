// ==UserScript==
// @name        QSEO-tools-Google
// @namespace   http://qseo.ru
// @description  Different SEO Tools and helper functions for Google Search engine from qseo.ru 
// @icon          http://qseo.ru/logo/logo_q.svg
// @version     1.2.1
// @updateURL   https://github.com/Qseo/QSEO-tools-Google/raw/master/QSEO-tools-Google/QSEO-tools-Google.user.js
// @downloadURL https://github.com/Qseo/QSEO-tools-Google/raw/master/QSEO-tools-Google/QSEO-tools-Google.user.js
// @include     http*://www.google.*/*
// @require     http://code.jquery.com/jquery-latest.min.js
// @require     https://raw.githubusercontent.com/carhartl/jquery-cookie/master/src/jquery.cookie.js
// @grant GM_getValue
// @grant GM_setValue
// ==/UserScript==

var regionStr_default_google = '-1:Автоматически;Нижний Новгород:Н.Новгород;Москва:Москва;Санкт Петербург:С-Петербург;Самара:Самара;Дзержинск:Дзержинск';

var color_context = '#FFF8E1';
var color_service = '#EDFCFF';
var color_warning = '#ffe5e5';

var regionStr;

var regionBlock = '<div id="qseo-google-regionlist" style="font-size: 11px; position: absolute; z-index: 1000; top: 130px; left: 10px;"><div class="region-default">Регион в настройках: <div class="region-name">[regiondefault]</div><br/></div><div class="list-title">Сменить на:</div><div class="list-items">[regionlist]</div><div class="settings">[<a class="qseo-update" style="text-decoration: none;" href="#">обновить</a>] [<a class="qseo-settings" style="text-decoration: none;" href="#">настроить</a>]</div><div class="links" style="margin-top: 10px"><a href="http://qseo.ru/?utm_source=qseo-tools&utm_medium=banner&utm_campaign=qseo-tools-google" target="_blank" title="Качественное продвижение сайтов в сети Интернет"><img src="http://qseo.ru/logo/qseo_logo_w70.png?utm_source=qseo-tools&utm_medium=banner&utm_campaign=qseo-tools-google&utm_content=logo_left" alt="Качественное продвижение сайтов в сети Интернет"></a></div></div>';

var urlParams;

if(typeof GM_getValue == undefined || GM_getValue('regionStr_google') == null) {
    regionStr = regionStr_default_google;
} else {
    regionStr = GM_getValue('regionStr_google',regionStr_default_google);
}

window.qseoToolsUpdateUrlParams = function() {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);
    
    urlParams = {};
    while (match = search.exec(query))
        urlParams[decode(match[1])] = decode(match[2]);
}

qseoToolsUpdateUrlParams();

/* Based on  clickhappier script */

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// top ads
addGlobalStyle('#tads { background-color: ' + color_context + ' ! important; }');

// right-side ads
addGlobalStyle('#mbEnd { background-color: ' + color_context + ' ! important; }');

// bottom ads
addGlobalStyle('#tadsb { background-color: ' + color_context + ' ! important; }');


// top shopping results
addGlobalStyle('.commercial-unit-desktop-top { background-color: ' + color_service + ' ! important; }');

// right-side shopping results
addGlobalStyle('.commercial-unit-desktop-rhs { background-color: ' + color_service + ' ! important; }');


// local business results
addGlobalStyle('#lclbox { background-color: ' + color_service + ' ! important; }');   // light lime green


// news results
addGlobalStyle('#newsbox { background-color: ' + color_service + ' ! important; }');
addGlobalStyle('div.mnr-c._yE { background-color: ' + color_service + ' ! important; }');

// in-depth articles results
addGlobalStyle('.r-search1, .r-search2, .r-search3 { background-color: ' + color_service + ' ! important; }');
addGlobalStyle('.r-search4, .r-search5, .r-search6 { background-color: ' + color_service + ' ! important; }');
addGlobalStyle('.r-search7, .r-search8, .r-search9 { background-color: ' + color_service + ' ! important; }');
addGlobalStyle('.r-search-1, .r-search-2, .r-search-3 { background-color: ' + color_service + ' ! important; }');
addGlobalStyle('.r-search-4, .r-search-5, .r-search-6 { background-color: ' + color_service + ' ! important; }');
addGlobalStyle('.r-search-7, .r-search-8, .r-search-9 { background-color: ' + color_service + ' ! important; }');


// image results
addGlobalStyle('#imagebox_bigimages { background-color: ' + color_service + ' ! important; }');  

// knowledge sidebar results
addGlobalStyle('.kp-blk { background-color: ' + color_service + ' ! important; }'); 


// related search results
addGlobalStyle('#brs { background-color: ' + color_service + ' ! important; }'); 




/**
 *
 *  Base64 encode / decode
 *  http://www.webtoolkit.info/
 *
 **/

var Base64 = {

    // private property
    _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode : function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
            this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
            this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

        }

        return output;
    },

    // public method for decoding
    decode : function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = Base64._utf8_decode(output);

        return output;

    },

    // private method for UTF-8 encoding
    _utf8_encode : function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode : function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while ( i < utftext.length ) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }

};



/* serp numbers */
window.qseoToolsParse = function(event, forcecheck) {
  if($("img.rg_i").length) return;

  qseoToolsUpdateUrlParams();

  if( (forcecheck == 'undefined' || !forcecheck) && $(".qseo-place-number").length )  {
    return;
  }

  var serp_number = 0;

  if(urlParams['start']) {
    serp_number = urlParams['start'];
  }

  var serp_result = document.getElementById('res');
    
    
  if (serp_result) {

    $("#qseo-google-regionlist").remove();
    $(".qseo-place-number").remove();

    //Create Array of All HTML Tags
    var allLiTags = serp_result.getElementsByTagName("div");

    for (i = 0; i < allLiTags.length; i++) {
      if (allLiTags[i].className == 'g' || allLiTags[i].className == 'g w0') {
        if (allLiTags[i].id == 'imagebox_bigimages' || allLiTags[i].id == 'newsbox') {
            continue;
        }

        var h3 = allLiTags[i].getElementsByTagName('h3');

        if(!h3[0]) {
            continue;
        }

        serp_number++;

        var t = document.createElement('div');

        t.setAttribute('style', 'float: left; margin-left: -30px; padding-top: 5px; text-align: right; width: 24px;');
        t.setAttribute('class', 'qseo-place-number');
        t.innerHTML = serp_number + '.';

        allLiTags[i].insertBefore(t, allLiTags[i].firstChild);
      }
    }

    var regionsListCurrent, google_region;

    var match = location.href.match(/&near=([^&]*)/);

    google_region = (match && match[1]) ? decodeURI(match[1]) : -1;

    if(regionStr) {
      var regionList = regionStr.split(';');

      var regionListKeys = [];

      var regionsListCurrent = '';

      for(key in regionList) {
          if(!regionList[key]) continue;

          region = regionList[key].split(':');

          str = '<a style="text-decoration: none" class="qseo-google-regionswitch" href="' + location.href.replace(/&near=[^&]*/, '') + '&near=' + region[0] + '" >' + region[1] + '</a>';

//                 alert(google_region + google_region.length + '  == ' + region[0] + region[0].length +  ' = ' + (google_region == region[0]));
          if(google_region == region[0]) {
//                   alert(google_region + ' == ' + region[0]);
            str = '<div style="background: #FFF8DC; display: table-cell"><strong>' + str + '</strong>';
          }
          str = '<div style="line-height: 1.7em">' + str + '</div>';
          regionsListCurrent = regionsListCurrent + str;
      }

     regionsListCurrent = regionBlock.replace('[regionlist]',regionsListCurrent);
    }
    else {
        regionsListCurrent = regionBlock.replace('[regionlist]','[не настроено]');
    }

    if(google_region == -1) {
      google_region = 'Автоматически';
    }

    regionsListCurrent = regionsListCurrent . replace('[regiondefault]',  google_region);

    $("body").prepend($(regionsListCurrent));

    $('#qseo-google-regionlist a.qseo-update').click(function() {
      window.qseoToolsParse(event,true);
    });

    $('#qseo-google-regionlist a.qseo-settings').click(function() {
      regionStr = prompt("Настройка списка регионов (формат: id1:name1;id2:name2;id3:name3): ", regionStr);
      GM_setValue('regionStr', regionStr);
    });
  }
}

// setTimeout(window.qseoToolsParse,5);
window.qseoToolsParse();

$('#main').get(0).addEventListener('DOMNodeInserted', qseoToolsParse, false); 

// addEventListener('DOMNodeInserted', qseoToolsParse, false); 
