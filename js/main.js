var links = [
    'https://www.google.com/search?q=',
    'https://www.baidu.com/s?wd=',
    'https://cn.bing.com/search?q=',
    'https://zh.wikipedia.org/w/index.php?search='
];

//默认情况或者初始化页面时候的历史记录按钮链接前缀字符串。
var buttonXLinkString = links[1];

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

//更改主页Logo的搜索引擎服务提供商的主站点超链接。
function changeSearchEngineProviderLink(linkString) {
    setElemAttr('#se-provider', 'href', linkString);
}

//更改天气Widgets在单击之后的跳转链接地址。
function changeWeatherLink() {
    var carlosWeatherLink =
        'https://widget-page.qweather.net/h5/index.html?md=0123456&bg=1&lc=auto&key=62d90441d8fc4be8989e7edbd3bc3f4a&v=_1659329448147';
    if (window.innerWidth <= 600) {
        setElemAttr('#carlos-weather', 'href', carlosWeatherLink);
    } else {
        setElemAttr('#carlos-weather', 'href', 'https://www.qweather.com/');
    }
}

//设置指定元素的属性值。其中参数element可以是class，也可以是id，也可以是element_object。
function setElemAttr(element, attribute, value) {
    $(element).attr(attribute, value);
}

//更改主页面的搜索引擎服务提供商。目前只预设了google，baidu，bing和wikipedia四个搜索引擎服务提供商，一旦provider的值无法判断，则将会跳转到http404.html。
function changeSearchEngine(evt, provider) {
    var i, tablinks, elemlinks, tabs;
    switch (provider) {
        case 'google':
            changeToGoogleLink();
            setElemAttr('#search-form', 'action', 'https://www.google.com/search');
            setElemAttr('#search-input', 'name', 'q');
            setElemAttr('#search-input', 'placeholder', '谷歌搜索');
            buttonXLinkString = links[0];
            break;
        case 'baidu':
            changeToBaiduLink();
            setElemAttr('#search-form', 'action', 'https://www.baidu.com/s');
            setElemAttr('#search-input', 'name', 'wd');
            setElemAttr('#search-input', 'placeholder', '百度搜索');
            buttonXLinkString = links[1];
            break;
        case 'bing':
            changeToMicrosoftBingLink();
            setElemAttr('#search-form', 'action', 'https://cn.bing.com/search');
            setElemAttr('#search-input', 'name', 'q');
            setElemAttr('#search-input', 'placeholder', '必应搜索');
            buttonXLinkString = links[2];
            break;
        case 'wikipedia':
            changeToWikipediaLink();
            setElemAttr('#search-form', 'action', 'https://zh.wikipedia.org/w/index.php');
            setElemAttr('#search-input', 'name', 'search');
            setElemAttr('#search-input', 'placeholder', '维基百科');
            buttonXLinkString = links[3];
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

//修改蒙版的Alpha，使其能够显示。
function displayAlphaMask() {
    setStyleAttr('#mask', 'background-color', 'rgba(0, 0, 0, 0.7)');
}

//修改蒙版的Alpha，使其能够隐藏。
function hideAlphaMask() {
    setStyleAttr('#mask', 'background-color', 'rgba(0, 0, 0, 0)');
}

//设置或者修改指定元素的样式表。其中参数element可以是class，也可以是id，也可以是element_object。参数style则为某个样式名称，比如说：background-color。
function setStyleAttr(element, style, value) {
    $(element).css(style, value);
}

//更改主页面的背景图像。
function changeBgImage() {
    var day = new Date().getDay();
    $('style#main-style')[0].innerHTML += '#top-image { background-image: url("img/bgimg-0' + day + '.webp");' +
        'margin-top: 0px;' +
        'background-position: center;' +
        'background-repeat: no-repeat;' +
        'background-attachment: fixed;' +
        'background-size: cover;' +
        'width: 100%;' +
        'height: 100%; }';
}

//控制指定元素是否在页面上显示，这个操作是通过更改指定元素的样式表来实现的。
function display(element, value) {
    setStyleAttr(element, 'display', value);
}

function init() {
    changeBgImage();
    changeWeatherLink();
    drawingLShrUi();
}

//天气Widgets参数设置。
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

//存储一个K-V到localStorage。
function toStorage(key, value) {
    if (!sameIn(value) && !isEmpty(value)) localStorage.setItem(key, value);
}

//清空localStorage。
function clearStorage() {
    localStorage.clear();
}

//判断localStorage中指定的K-V是否属于符合主页面定义的搜索历史记录。
function isShr(index) {
    var s = localStorage;
    var key_sstr = s.key(index).substring(0, PREFIX_LEN);
    if (key_sstr == KEY_PREFIX_STRING) return true;
    else return false;
}

//提取全部的搜索历史记录。
function SHR() {
    var i, shr = [];
    var s = localStorage;
    for (i = 0; i < s.length; i++) {
        if (isShr(i)) {
            shr.push(s.getItem(s.key(i)));
        }
    }
    return shr;
}

//生成一个用于保存历史记录的Key，这个Key充当localStorage存储的K-V中的Key。
function genKey() {
    var ret, len = shrCount();
    var serial = len + 1;
    while (keyExists(KEY_PREFIX_STRING + serial)) {
        serial += 1;
    }
    return KEY_PREFIX_STRING + serial;
}

function keyExists(key) {
    var i, ret, len = localStorage.length;
    for (i = 0; i < len; i++) {
        if (localStorage.key(i) == key) {
            ret = true;
            break;
        } else ret = false;
    }
    return ret;
}

//获取指定指定元素的value，比如说获取某个input元素中，用户输入的值。
function inval(elementId) {
    return $(elementId).val();
}

//获取指定数量的搜索历史记录。
function limitShr(limit) {
    var shr = SHR();
    var records = [],
        lsLen = shr.length;
    if (lsLen > limit) {
        for (i = lsLen - limit; i < lsLen; i++) {
            records.push(shr[i]);
        }
    } else records = shr;
    return records;
}

//获取limitShr(limit)中，由index指定的某个搜索历史记录。
function iLSHR(index) {
    var current_shr = limitShr(12);
    return current_shr[index];
}

//在所有历史记录中获取由index指定的搜索历史记录。
function iSHR(index) {
    return SHR()[index];
}

//判断value是否能够在历史记录中找到。
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

//判断value是否是由空格组合的字符串。
function isSpaceString(value) {
    var origin = value.toString(),
        updated = value.replace(' ', '00');
    if (updated.length / origin.length == 2) return true;
    else return false;
}

//获取搜索历史记录的数量。
function shrCount() {
    var i, count = 0;
    var s = localStorage;
    for (i = 0; i < s.length; i++) {
        if (isShr(i)) count++;
    }
    return count;
}

//移除value指定的搜索历史记录。
function remShr(value) {
    var i;
    for (i = 0; i < localStorage.length; i++) {
        if (localStorage.getItem(localStorage.key(i)) == value) {
            localStorage.removeItem(localStorage.key(i));
            break;
        }
    }
}

//清空所有搜索历史记录的操作UI。
function crui() {
    if (confirm('你确定要清空所有的历史记录吗？这是一个不可逆的操作，一旦您确认这个操作，您的所有历史记录将会不复存在！')) {
        clearStorage();
        drawingShrUi();
    }
}

//绘制或者生成主页面搜索历史记录的UI。
function drawingLShrUi() {
    var i, htmlButtonString = '\n';
    var currentRecords = limitShr(12);
    var len = currentRecords.length;
    var htmlButton = '<input type="button" class="records-btn" id="';
    if (len == 0) {
        $('td#history-label').html('');
        $('td#close-history-td').html('');
        display('#history-options', 'none');
    } else {
        $('td#history-label').html('<p>搜索历史记录</p>');
        $('td#close-history-td').html(
            '<a href="history.html" class="history-options">查看更多</a>&nbsp;&nbsp;&nbsp;&nbsp;' +
            '<a href="javascript:display(\u0027#shr-father-box\u0027, \u0027none\u0027);" id="close-history-link">关闭</a>'
        );
        display('#history-options', 'block');
    }
    $('div#history-record-area').html('');
    for (i = 0; i < len; i++) {
        var keyword = iLSHR(i);
        htmlButtonString += htmlButton + 'shr-button-' + i +
            '" value="' + keyword + '" onclick="document.location=\u0027' +
            buttonXLinkString + keyword + '\u0027;display(\u0027#shr-father-box\u0027, \u0027none\u0027);" />\n';
    }
    $('div#history-record-area')[0].innerHTML += htmlButtonString;
}

//绘制或者生成全部历史记录的UI。
function drawingShrUi() {
    var i = 0,
        index = 0,
        htmlRecordString = '',
        htmlXLinks = ['', '', '', ''],
        htmlXLinkString = '',
        provider = ['谷歌', '百度', '必应', '维基'],
        htmlAllRecordString = '',
        item = '',
        len = shrCount(),
        serial = 0;
    if (len == 0) {
        $('#all-history').html('<p id="null-history-tips">没有找到任何搜索历史记录！</p>');
        setElemAttr('#all-history-tr', 'height', '700');
    } else {
        for (i = 0; i < len; i++) {
            serial = i + 1;
            htmlXLinkString = '';
            item = iSHR(i);
            if (item.length >= 48) htmlRecordString = item.substring(0, 47) + '...</td><td align="right">';
            else htmlRecordString = item + '</td><td align="right">';
            for (index = 0; index < 4; index++) {
                htmlXLinks[index] = '<a href="' + links[index] +
                    iSHR(i) + '" class="record-link">' +
                    provider[index] + '</a>&nbsp;&nbsp;\n';
            }
            for (index = 0; index < 4; index++) htmlXLinkString += htmlXLinks[index];
            htmlXLinkString += '&nbsp;&nbsp;<input type="button" class="del-record" value="删除" onclick="javascript:' +
                'remShr(\u0027' + item + '\u0027);drawingShrUi();" />\n';
            htmlAllRecordString += '<tr class="single-line" height="50"><td>' +
                serial + '.&nbsp;&nbsp;' + htmlRecordString +
                htmlXLinkString + '</td></tr>';
        }
        htmlAllRecordString = '<table id="record-sub-table" width="100%" border="0">' +
            htmlAllRecordString + '</table>';
        $('#all-history').html(htmlAllRecordString);
    }
}

//End
