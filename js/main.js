function changeSearchEngine(evt, provider) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(provider).style.display = "block";
    evt.currentTarget.className += " active";
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
