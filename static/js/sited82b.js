function initSearch(choices){
    $('#navSearch').autoComplete({
        minChars: 1,
        source: function (term, suggest) {
            term = term.toLowerCase();
            var matches = [];
            for (var i = 0; i < choices.length; i++)
                if (~choices[i].value.toLowerCase().indexOf(term)) matches.push(choices[i]);
            suggest(matches);
        },
        renderItem: function (item, search) {
            search = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            var re = new RegExp("(" + search.split(' ').join('|') + ")", "gi");
            return '<div class="autocomplete-suggestion" data-val="' + item.value + '" data-url="' + item.url + '">' + item.value.replace(re, "<b>$1</b>") + '</div>';
        },
        onSelect: function(e, term, item){
            var url = $(item).attr("data-url");
            // window.open(url, "_blank");
            window.location.href = url;
            e.preventDefault();
        }
    });
}

function expandSearchInput() {
    // expand search input
    $("#navSearch").focus(function (){
        $(this).closest('form').addClass("flex-grow-1");
    }).blur(function () {
        $(this).closest('form').removeClass("flex-grow-1");
    });
}


$(function () {
    expandSearchInput();
    
    // search auto complete
    $.getJSON("/search/suggest.json", function (data) {
        initSearch(data);
    });
});