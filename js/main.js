var changeToGoogleLink = function() { changeSearchEngineProviderLink('https://www.google.com'); }
var changeToBaiduLink = function() { changeSearchEngineProviderLink('https://www.baidu.com'); }
var changeToMicrosoftBingLink = function() { changeSearchEngineProviderLink('https://cn.bing.com'); }
var changeToWikipediaLink = function() { changeSearchEngineProviderLink('https://zh.wikipedia.org'); }
function changeSearchEngineProviderLink(linkString) {
    setElemAttr('#se-provider', 'href', linkString);
}
function changeWeatherLink() {
    var carlosWeatherLink = 'https://widget-page.qweather.net/h5/index.html?md=0123456&bg=1&lc=auto&key=62d90441d8fc4be8989e7edbd3bc3f4a&v=_1659329448147';
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
            break;
        case 'baidu':
            changeToBaiduLink();
            setElemAttr('#search-form', 'action', 'https://www.baidu.com/s');
            setElemAttr('#search-input', 'name', 'wd');
            setElemAttr('#search-input', 'placeholder', 'Baidu Search');
            break;
        case 'bing':
            changeToMicrosoftBingLink();
            setElemAttr('#search-form', 'action', 'https://cn.bing.com/search');
            setElemAttr('#search-input', 'name', 'q');
            setElemAttr('#search-input', 'placeholder', 'Bing Search');
            break;
        case 'wikipedia':
            changeToWikipediaLink();
            setElemAttr('#search-form', 'action', 'https://zh.wikipedia.org/w/index.php');
            setElemAttr('#search-input', 'name', 'search');
            setElemAttr('#search-input', 'placeholder', 'Wikipedia Search');
            break;
        default:
            changeSearchEngineProviderLink('err/http404.html');
            break;
    }
    tablinks = document.getElementsByClassName("tablinks");
    elemlinks = document.getElementsByClassName("elemlinks")
    tabs = document.getElementsByClassName("tab");
    if (tabs[0].style.display == "none")
    {
        for (i = 0; i < tablinks.length; i++){
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
    ws.innerHTML += '#top-image { background-image: url("img/bgimg-0' + day + '.webp");'
        + 'margin-top: 0px;'
        + 'background-position: center;'
        + 'background-repeat: no-repeat;'
        + 'background-attachment: fixed;'
        + 'width: 100%;'
        + 'height: 100%; }';
}
function init() {
    changeBgImage();
    changeWeatherLink();
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
