$(document).ready(function(){

  accessToken = '1817903308.61dc8e8.b3b9467450fd463d980a15132803f463';

    // getUserFeed('2135964523');

    getUserRecent('2135964523');

    //getMyFeed();

    // getCommentsByPhoto('448979387270691659_45818965');

    // getFollows('1817903308');

    // getFollowedBy('5320915');

    // getRecentTag ('ux');

    // getSearchTags ('userexperience');

    // getLikesByPhoto ('448979387270691659_45818965');


function getUserFeed(user_id) {
  $.ajax({
      url: "https://api.instagram.com/v1/users/" + user_id,
      dataType: "jsonp",
      type: 'GET',
      data: {access_token: accessToken},
      success: function(data) {
        $('.name').text(data.data.username);
        $('.tagline').text(data.data.bio);
        $('.id').text(data.data.id);
      }
  });
}

function getMyFeed() {
  $.ajax({
      url: 'https://api.instagram.com/v1/users/self/feed',
      dataType: 'jsonp',
      type: 'GET',
      data: {access_token: accessToken},
      success: function(data){
          var html = '';
          var owlObj = {};

          owlObj.owl = data.data;

          for(var i in owlObj.owl){
            var image = owlObj.owl[i].images.standard_resolution.url;
            html = html + "<div class='image' style='background: url(\"" + image + "\") no-repeat center center; background-size: cover; -webkit-background-size: cover; -moz-background-size: cover;'></div>";
          }

          $('#owl-example').html(html);

          $('#owl-example').owlCarousel({
            items: 4
          });
      },
      error: function(data){
      }
  });
}

function getUserRecent(user_id) {
  $.ajax({
      url: 'https://api.instagram.com/v1/users/' + user_id + '/media/recent/',
      dataType: 'jsonp',
      type: 'GET',
      data: {access_token: accessToken},
      success: function(data){
        var data = JSON.stringify(data.data);
        var url = 'data:text/json;charset=utf8,' + encodeURIComponent(data);
        window.open(url, '_blank');
        window.focus();
          var html = '';
          var owlObj = {};

          owlObj.owl = data.data;

          for(var i in owlObj.owl){
            var image = owlObj.owl[i].images.standard_resolution.url;
            html = html + "<div class='image' style='background: url(\"" + image + "\") no-repeat center center; background-size: cover; -webkit-background-size: cover; -moz-background-size: cover;'></div>";
          }

          $('#owl-example').html(html);

          $('#owl-example').owlCarousel({
            items:4,
            autoPlay:true,
            autoPlay : 2000,
            autoPlayHoverPause:true
          });
      },
      error: function(data){
      }
  });
}

function getCommentsByPhoto (photo_id) {
    $.ajax({
      url: 'https://api.instagram.com/v1/media/' + photo_id + '/comments/',
      dataType: 'jsonp',
      type: 'GET',
      data: {access_token: accessToken},
      success: function(data){
          for(x in data.data){
            $('.comment').append('<li>"'+data.data[x].text+'"</li>');   
          }
      },
      error: function(data){
          console.log(data);
      }
  });
}

function getFollows (user_id) {
    $.ajax({
        url: 'https://api.instagram.com/v1/users/' + user_id + '/follows',
        dataType: "jsonp",
        type: 'GET',
        data: {access_token: accessToken},
        success: function(data) {
         for(x in data.data){
            $('.anne').append('<li>"'+data.data[x].full_name+'"</li>');  
          }
        },
    });
}

function getFollowedBy (user_id) {
      $.ajax({
        url: "https://api.instagram.com/v1/users/" + user_id + "/followed-by",
        dataType: "jsonp",
        type: 'GET',
        data: {access_token: accessToken},
        success: function(data) {
         for(x in data.data){
            $('.yes').append('<li>"'+data.data[x].full_name+'"</li>');  
          }
        },
    });
}

function getRecentTag (tag_name) {
      $.ajax({
        url: "https://api.instagram.com/v1/tags/" + tag_name + "/media/recent",
        dataType: "jsonp",
        type: 'GET',
        data: {access_token: accessToken},
        success: function(data) {
         for(x in data.data){
            $('.recent').append('<li><img src="'+data.data[x].images.low_resolution.url+'"></li>');  
          }
      },
      error: function(data){
          console.log(data);
      }
  });
}

function getSearchTags (tag_name) {
      $.ajax({
        url: "https://api.instagram.com/v1/tags/search?q=" + tag_name,
        dataType: "jsonp",
        type: 'GET',
        data: {access_token: accessToken},
        success: function(data) {
         for(x in data.data){
            $('.tags').append('<li>"'+data.data[x].name+'"</li>');  
          }
        },
    });
}

function getLikesByPhoto (photo_id) {
      $.ajax({
      url: 'https://api.instagram.com/v1/media/' + photo_id + '/likes/',
        dataType: "jsonp",
        type: 'GET',
        data: {access_token: accessToken},
        success: function(data) {
         for(x in data.data){
            $('.likes').append('<li>"'+data.data[x].full_name+'"</li>');  
          }
        },
    });
}

});