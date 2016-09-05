
function startGithubSearch() {

    var btn = $('<button>refresh github</button>').appendTo('body');
    var $results = $('<ul/>').appendTo('body');

    var startupRequestStream = Rx.Observable.just('https://api.github.com/users');

    var refreshStream = Rx.Observable.fromEvent(btn, 'click');

    var refreshRequestStream = 
            refreshStream
                .map(e => {
                    var randomOffset = Math.floor(Math.random() * 500);
                    return 'https://api.github.com/users?since=' + randomOffset;  
                })
                .startWith('https://api.github.com/users')


    var responseStream = 
        refreshRequestStream.flatMap(requestUrl => {
            return Rx.Observable
                .fromPromise(jQuery.getJSON(requestUrl));
        });


    responseStream.subscribe(data => {
        var html = data.map(item => `<li>${item.login}</li>`)
                    .slice(0, 3);
                    
        $results.html(html)  
    });

}

function eggHead1() {
    // create button
    var $btn = $('<button>click!!!</button>').appendTo('body');

    var clickStream = Rx.Observable.fromEvent($btn[0], 'click');

    var dblClickStream = clickStream
        .buffer(clickStream.throttle(250))
        .map(arr => arr.length)
        .filter(len => len === 2);

    dblClickStream
        .subscribe(e => console.log(e, 'doubleClicked'))

}

eggHead1();