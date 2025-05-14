function getServerTime(){
    let xmlHttp;
    try {
    //FF, Opera, Safari, Chrome
    xmlHttp = new XMLHttpRequest();
    }
    catch (err1) {
    //IE
    try {
    xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
    }
    catch (err2) {
    try {
    xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
    }
    catch (eerr3) {
    //AJAX not supported, use CPU time.
    alert("AJAX not supported");
    }
    }
    }
    xmlHttp.open('HEAD',window.location.href.toString(),false);
    xmlHttp.setRequestHeader("Content-Type","text/html");
    xmlHttp.send('');
    return new Date(xmlHttp.getResponseHeader("Date")).getTime();

    }

    let timestamp = getServerTime();
let date = new Date(timestamp);
console.log(date.toLocaleString()); 

