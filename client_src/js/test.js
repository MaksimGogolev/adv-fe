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

    Handlebars.registerHelper('table', function (items, options) {
        var out = "<ul>";
        for(var i=0, l=items.length; i<l; i++) {
            out = out + "<li>" + options.fn(items[i]) + "</li>";
        }
        return out + "</ul>";
    });



    renderPostsJSON();
    renderPostsTable();

    function renderPostsJSON() {
        var html = compiledPostsJSON({posts: Data.getPosts()});
        jQuery('.posts-json').html('<pre>'+html+'</pre>');
    }
     function renderPostsTable() {
        var html = compiledPostsTable({posts: Data.getPosts()});
        jQuery('.posts-table').html(html);
    }




    
});