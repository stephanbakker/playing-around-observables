function startWikiSearch() {

    var btnEl = document.querySelector('button');

    var textArea = document.querySelector('textarea');

    var keyUps = Rx.Observable.fromEvent(textArea, 'keyup')
        .map(e => e.target.value)
        .filter(text => text.length > 2);


    var suggestions = keyUps
        .flatMapLatest(search)
        .map(data => data[1])

    suggestions.subscribe(data => {
        console.log(data);
    })



    function search(term) {
        return $.ajax({
            url: 'http://en.wikipedia.org/w/api.php',
            dataType: 'jsonp',
            data: {
                action: 'opensearch',
                format: 'json',
                search: term
            }
        }).promise();
    }
}