import $ from 'jquery';

var my_client_id = "c400709533215b0950e17f70dc8d0fc6";
var baseURL = "https://api.soundcloud.com";
var pullTracks = function(){
  $.ajax({
    url: baseURL + '/tracks',
    data: {
      client_id: my_client_id

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
    var newHTML = `<source src=${event.currentTarget.dataset.stream}?client_id=${my_client_id}>`;
    console.log(newHTML);
    $(".music-widget").html(newHTML);
  })
}
