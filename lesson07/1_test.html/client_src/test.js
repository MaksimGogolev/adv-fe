$(document).ready(function () {
    var BASE_PATH = '/json-server';
    var USERS_URL = BASE_PATH + '/users/';
    var POSTS_URL = BASE_PATH + '/posts/';

    fetch(POSTS_URL + '466', {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: '{"likeCount":8}'
    })
    .then(function (res) {
        return res.json();
    })
    .then(function (json) {
        return fetch(POSTS_URL);
    })
    .then(function (res) {
        return res.json();
    })
    .then(function (json) {
        var likeCountAll = json.reduce(function (sum,post) {
            return sum + post.likeCount;
        },0);
        $('.content').append('<p>Count of like: '+likeCountAll+'</p>');
        return fetch(POSTS_URL + '466');
    })
    .then(function (res) {
        return res.json();
    })
    .then(function (json) {
        var comments = [...json.comments];
        var html = '<p>'
        Promise.all(
            json.comments.map(function (comment) {
                return fetch(USERS_URL+ comment.user);
            })
        )
        .then(function (results) {
            return Promise.all(results.map(function (result) {
                return result.json();
            }));
        })
        .then(function (results) {
            html += results.reduce(function (html, result, commentIndex) {
                return html + result.name + ': ' + comments[commentIndex].text + '; '
            },html) + '</p>';
            $('.content').append(html);
        })
    })
});