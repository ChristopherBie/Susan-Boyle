var substringMatcher = function(strs) {
    return function findMatches(q, cb) {
        var data = {
            'action'    : 'typeahead',
            "nonce"     : passed_data.nonce,
            "s"         : q
        };
        jQuery.ajax({
            url : passed_data.url,
            type : 'get',
            data : data,
            success : function( response ) {
                strs = JSON.parse(response);
                 matches = [];
                $.each(strs, function(i, str) {
                    matches.push({'name' : str});
                });
                cb(matches);
            }
        });
    };
};

$('div .typeahead').find('input').typeahead({
        hint: true,
        highlight: true,
        minLength: 3
    },
    {
        name: 'businesses',
        displayKey: 'name',
        limit: 10,
        source: substringMatcher()
    })
    .on('typeahead:selected', function(e, obj){
        $('input[name="_business_name"]').val(obj.name);
    });
