import $ from 'jquery';

var my_client_id = "c400709533215b0950e17f70dc8d0fc6";
var baseURL = "https://api.soundcloud.com";


var pullTracks = function(query){
  return $.ajax({
    url: `${baseURL}/tracks/?=q${name}`,
    data: {
      client_id: my_client_id,
      q: query,
      limit: 200
    },
  }).then(function(response){
    response.map(musicResults);
    console.log(response);
    playMusic();
  })
};
pullTracks();


var musicResults = function(info){
  if(info.artwork_url === null) {
    info.artwork_url = "images/image-placeholder.png"
  }
  $('.main-content').append(`<div data-stream="${info.stream_url}" class="track-box">
    <img src="${info.artwork_url}">
    <ul class="trackInfo">
      <li><span class="trackTitle">${info.title}</span></li>
      <li><span class="trackArtist">${info.user.username}</span></li>
    </ul>
  </div>`)
}

var playMusic = function(){
  $('.track-box').on('click', function(event) {
    var widget = $(".music-widget");
    widget.attr("src", `${event.currentTarget.dataset.stream}?client_id=${my_client_id}`);
  })
}

$(".search-button").click(function(event) {
  event.preventDefault();
    $('.main-content').html("")
  var query =  $('.search-input').val();
  pullTracks(query).then(function (data) {
    console.log(data);
    $('html, body').animate({
        scrollTop: 540
    }, 1500);
  })
});


$(".musicSection").click(function(event) {
  event.preventDefault();
    $('html, body').animate({
        scrollTop: 540
    }, 1500);
});

$(".title").click(function(event) {
  event.preventDefault();
    $('html, body').animate({
        scrollTop: 0
    }, 1500);
});
