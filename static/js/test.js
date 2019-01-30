window.onload = function () {
    jqGet();
    // originGet();
    // aniTags();
   aniButton();
};

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');
function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

// function originGet() {
//
//     const calc_btn = document.getElementById('calc-btn');
//     const result_area = document.getElementById('result');
//
//     calc_btn.addEventListener('click', function () {
//         const a = document.getElementById('a').value;
//         const b = document.getElementById('b').value;
//         const data = {a: a, b: b};
//         const xmlHttp = new XMLHttpRequest();
//         // xmlHttp.send(null);
//
//         xmlHttp.onreadystatechange = function () {
//             console.log("ddd");
//             console.log(xmlHttp.readyState);
//             console.log('status' + xmlHttp.status);
//             if(xmlHttp.readyState === 4 && xmlHttp.status === 200){
//                 const result = JSON.parse(xmlHttp.responseText);
//                 result_area.innerText = result.x + ", " + result.y;
//             }else{
//                 result_area.innerText = "ERROR!!!";
//             }
//         };
//         xmlHttp.open('GET', '/calc/?a='+a+'&b='+b, true);
//         // xmlHttp.send(JSON.stringify(data));
//     });
// }

function jqGet() {
    $('#calc-btn').click(() => {
        console.log("sss");
        $.ajax({
            type: 'GET',
            url: 'http://127.0.0.1:8000/test/calc',
            data: {'a': $('#a').val(), 'b': $('#b').val()},
            dataType: 'json',
            contentType: 'application/json',
            success: (data) => {
                $('#result').text(data.x + ", " + data.y);
            },
            error: () => {
                $('#result').text('ERROR!!!');
            }
        });
    });
}

function aniTags() {
    const tagUl = $('#tags');
    const move = 50;
    const tagTxts = ['reg', 'gerge', 'jidi', 'djiowj', 'dji', 'apa', 'ajia', 'grior', 'ghiureh', 'fe', 'dwhf', 'weufi'];
   $('#ani-start').click(() => {
       tagUl.html('');
       let delayTime = 100;
       for(let i = 0; i < tagTxts.length; i++){
           const li = $('<li>' + tagTxts[i] + '</li>');
           li.css('left', move + 'px');
           tagUl.append(li);
           li.delay(delayTime).animate({'left': 0}, 1000);
           delayTime += 100;
       }
   });
}

function aniButton(){
   $('#ani-start').click(() => {
      $('#ani-btn').toggleClass('anied');
   });
}