/**
 * Created by maks on 7/30/16.
 */
$( document ).ready(function () {
    var templatePostsJSON = $('#posts-json-template').html();
    var templatePostsTable = $('#posts-table-template').html();

    var compiledPostsJSON = Handlebars.compile(templatePostsJSON);
    var compiledPostsTable = Handlebars.compile(templatePostsTable);

    Handlebars.registerHelper('json', function (str) {
        return JSON.stringify(Data.getPosts().slice(0,3), null, 2);
    });


    renderPostsJSON();
    // renderPostsTable();

    function renderPostsJSON() {
        var html = compiledPostsJSON({posts: Data.getPosts()});
        jQuery('.posts-json').html('<pre>'+html+'</pre>');
    }
    
});