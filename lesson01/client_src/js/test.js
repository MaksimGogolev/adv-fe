/**
 * Created by maks on 7/30/16.
 */
$( document ).ready(function () {
    var templatePostsJSON = $('#posts-json-template').html();
    var templatePostsTable = $('#posts-table-template').html();

    var compiledPostsJSON = Handlebars.compile(templatePostsJSON);
    var compiledPostsTable = Handlebars.compile(templatePostsTable);

    Handlebars.registerHelper('json', function (str) {
        return JSON.stringify(str.slice(0,3), null, 2);
    });

    Handlebars.registerHelper('table', function (context, options) {
        return context.map(function (item,i) {
                var str = i%2?'':' class = stripedTables';
                return '<p' + str + '>' + options.fn(item) + '</p>';
            });
    });

    renderPostsJSON();
    renderPostsTable();

    function renderPostsJSON() {
        var html = compiledPostsJSON({posts: Data.getPosts()});
        $('.posts-json').html('<pre>'+html+'</pre>');
    }
     function renderPostsTable() {
        var html = compiledPostsTable({posts: Data.getPosts()});
        $('.posts-table').html(html);
    }
});