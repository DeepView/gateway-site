var buttonXLinkString = 'https://www.baidu.com/s?wd=';

var changeToGoogleLink = function() {
    changeSearchEngineProviderLink('https://www.google.com');
}
var changeToBaiduLink = function() {
    changeSearchEngineProviderLink('https://www.baidu.com');
}
var changeToMicrosoftBingLink = function() {
    changeSearchEngineProviderLink('https://cn.bing.com');
}
var changeToWikipediaLink = function() {
    changeSearchEngineProviderLink('https://zh.wikipedia.org');
}

function changeSearchEngineProviderLink(linkString) {
    setElemAttr('#se-provider', 'href', linkString);
}

function changeWeatherLink() {
    var carlosWeatherLink =
        'https://widget-page.qweather.net/h5/index.html?md=0123456&bg=1&lc=auto&key=62d90441d8fc4be8989e7edbd3bc3f4a&v=_1659329448147';
    if (window.innerWidth <= 600) {
        setElemAttr('#carlos-weather', 'href', carlosWeatherLink);
        setElemAttr('#carlos-weather', 'target', '_blank');
    }
}

function setElemAttr(element, attribute, value) {
    $(element).attr(attribute, value);
}

function changeSearchEngine(evt, provider) {
    var i, tablinks, elemlinks, tabs;
    switch (provider) {
        case 'google':
            changeToGoogleLink();
            setElemAttr('#search-form', 'action', 'https://www.google.com/search');
            setElemAttr('#search-input', 'name', 'q');
            setElemAttr('#search-input', 'placeholder', 'Google Search');
            buttonXLinkString = 'https://www.google.com/search?q=';
            break;
        case 'baidu':
            changeToBaiduLink();
            setElemAttr('#search-form', 'action', 'https://www.baidu.com/s');
            setElemAttr('#search-input', 'name', 'wd');
            setElemAttr('#search-input', 'placeholder', 'Baidu Search');
            buttonXLinkString = 'https://www.baidu.com/s?wd=';
            break;
        case 'bing':
            changeToMicrosoftBingLink();
            setElemAttr('#search-form', 'action', 'https://cn.bing.com/search');
            setElemAttr('#search-input', 'name', 'q');
            setElemAttr('#search-input', 'placeholder', 'Bing Search');
            buttonXLinkString = 'https://cn.bing.com/search?q=';
            break;
        case 'wikipedia':
            changeToWikipediaLink();
            setElemAttr('#search-form', 'action', 'https://zh.wikipedia.org/w/index.php');
            setElemAttr('#search-input', 'name', 'search');
            setElemAttr('#search-input', 'placeholder', 'Wikipedia Search');
            buttonXLinkString = 'https://zh.wikipedia.org/w/index.php?search=';
            break;
        default:
            changeSearchEngineProviderLink('err/http404.html');
            break;
    }
    tablinks = document.getElementsByClassName("tablinks");
    elemlinks = document.getElementsByClassName("elemlinks")
    tabs = document.getElementsByClassName("tab");
    if (tabs[0].style.display == "none") {
        for (i = 0; i < tablinks.length; i++) {
            elemlinks[i].className = elemlinks[i].className.replace(" active", "");
        }
        evt.currentTarget.className += " active";
    } else {
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        evt.currentTarget.className += " active";
    }
}

function displayAlphaMask() {
    setStyleAttr('#mask', 'background-color', 'rgba(0, 0, 0, 0.7)');
}

function hideAlphaMask() {
    setStyleAttr('#mask', 'background-color', 'rgba(0, 0, 0, 0)');
}

function setStyleAttr(element, attribute, value) {
    $(element).css(attribute, value);
}

function changeBgImage() {
    var day = new Date().getDay();
    var ws = document.getElementById("main-style");
    ws.innerHTML += '#top-image { background-image: url("img/bgimg-0' + day + '.webp");' +
        'margin-top: 0px;' +
        'background-position: center;' +
        'background-repeat: no-repeat;' +
        'background-attachment: fixed;' +
        'width: 100%;' +
        'height: 100%; }';
}

function display(element, value) {
    setStyleAttr(element, 'display', value);
}

function init() {
    changeBgImage();
    changeWeatherLink();
    drawingRecordsInterface();
}
WIDGET = {
    "CONFIG": {
        "modules": "12034",
        "background": "5",
        "tmpColor": "FFFFFF",
        "tmpSize": "16",
        "cityColor": "FFFFFF",
        "citySize": "16",
        "aqiColor": "FFFFFF",
        "aqiSize": "16",
        "weatherIconSize": "24",
        "alertIconSize": "18",
        "padding": "10px 10px 10px 10px",
        "shadow": "0",
        "language": "auto",
        "borderRadius": "30",
        "fixed": "true",
        "vertical": "top",
        "horizontal": "left",
        "left": "20",
        "top": "20",
        "key": "111f2fec40184e61b1b652ac64f2a23b"
    }
}

//Start Search History Code.

const KEY_PREFIX_STRING = "shr:";
const PREFIX_LEN = 4;

function toStorage(key, value) {
    if (!sameIn(value) && !isEmpty(value)) localStorage.setItem(key, value);
}

function isSearchHistoryRecord(index) {
    var s = localStorage;
    var key_sstr = s.key(index).substring(0, PREFIX_LEN);
    if (key_sstr == KEY_PREFIX_STRING) return true;
    else return false;
}

function extractSearchHistoryRecords() {
    var i, shr = [];
    var s = localStorage;
    for (i = 0; i < s.length; i++) {
        if (isSearchHistoryRecord(i)) {
            shr.push(s.getItem(s.key(i)));
        }
    }
    return shr;
}

function generateKey() {
    var len = recordCount();
    var serial = len + 1;
    return KEY_PREFIX_STRING + serial;
}

function getInputValue(elementId) {
    return $(elementId).val();
}

function getCurrentRecords(limit) {
    var shr = extractSearchHistoryRecords();
    var records = [],
        lsLen = shr.length;
    if (lsLen > limit) {
        for (i = lsLen - limit; i < lsLen; i++) {
            records.push(shr[i]);
        }
    } else records = shr;
    return records;
}

function getRecord(index) {
    var current_shr = getCurrentRecords(12);
    return current_shr[index];
}

function sameIn(value) {
    var i, same, len = localStorage.length;
    if (localStorage.length == 0) same = false;
    else {
        for (i = 0; i < len; i++) {
            var k = localStorage.key(i);
            if (localStorage.getItem(k) == value) {
                same = true;
                break;
            } else same = false;
        }
    }
    return same;
}

function isEmpty(value) {
    if (
        value.toString() == null ||
        isSpaceString(value) ||
        value.toString().length == 0
    ) return true;
    else return false;
}

function isSpaceString(value) {
    var origin = value.toString(),
        updated = value.replace(' ', '00');
    if (updated.length / origin.length == 2) return true;
    else return false;
}

function recordCount() {
    var i, count = 0;
    var s = localStorage;
    for (i = 0; i < s.length; i++) {
        if (isSearchHistoryRecord(i)) count++;
    }
    return count;
}

function drawingRecordsInterface() {
    var i, htmlButtonString = '<br />\n';
    var currentRecords = getCurrentRecords(12);
    var len = currentRecords.length;
    var htmlButton = '<input type="button" class="records-btn" id="';
    $('div#history').html('<p>搜索历史记录</p>');
    if (len == 0) {
        $('div#history').html('');
    }
    for (i = 0; i < len; i++) {
        var keyword = getRecord(i);
        htmlButtonString += htmlButton + 'shr-button-' + i +
            '" value="' + keyword + '" onclick="document.location=\u0027' +
            buttonXLinkString + keyword + '\u0027;display(\u0027#shr-father-box\u0027, \u0027none\u0027);" />\n';
    }
    $('div#history')[0].innerHTML += htmlButtonString;
}

//End
