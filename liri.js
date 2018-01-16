var dataKeys = require('./keys.js');
console.log(dataKeys);
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

var client = new Twitter(dataKeys.twitterKeys);
var getSpotify = new Spotify(dataKeys.spotifyKeys);

// console.log(client)


// my - tweets

// spotify - this - song

// movie - this

// do -what - it - says


console.log(process.argv[2])
var userRequest = process.argv[2]


var movieName = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 3; i < process.argv.length; i++) {

  if (movieName == "") {

    movieName = movieName + process.argv[i];

  }

  else {

    movieName = movieName +  " " +  process.argv[i];

  }
}
console.log(movieName);
// if(userRequest === "my-tweets"){
//   //do this stuff
// }else if(){

// }

switch (userRequest) {
  case "my-tweets":
    //do this stuff
    getTweets()
    break;
  case "spotify-this-song":
    //do this stuff
    getSpotify()
    break;
  case "spotify-this-song":
    //do this stuff
    getSpotify()
    break;
  case "movie-this":
    //do this stuff
    getMovies()
    break;

  default:
    break;
}



function getTweets() {
  //This will show your last 20 tweets and when they were created at in your terminal / bash window.
  var params = { screen_name: "NFL" };
  
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {

      for(var i = 0; i < tweets.length; i++){
        console.log("=====================================")
        console.log(tweets[i].created_at);
        console.log(tweets[i].user.name);
        console.log(tweets[i].user.location);
        console.log(tweets[i].text);
      }
      // console.log(tweets);
    }
  });  
}

function getSpotify() {
    
    getSpotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    for (var i = 0; i < songs.length; i++) { 
        console.log("=====================================")
        console.log(songs[i].artists);
        console.log(songs[i].name);
        console.log(songs[i].preview_url);
        console.log(songs[i].album.name);
        }  
    }
    console.log(data); 
    });
}

function getMovies(){

  request('http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&apikey=trilogy', function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
    console.log("=====================================")
    console.log('Title: ' , JSON.parse(body).Title);
    console.log('Year: ' , JSON.parse(body).Year);
    console.log('Rated: ' , JSON.parse(body).Rated);
    console.log('IMDB Rating: ' , JSON.parse(body).imdbRating);
    console.log('Country: ' , JSON.parse(body).Country);
    console.log('Language: ' , JSON.parse(body).Language);
    console.log('Plot: ' , JSON.parse(body).Plot);
    console.log('Actors: ' , JSON.parse(body).Actors);
    console.log('Rotten Tomatoes Rating: ', JSON.parse(body).tomatoRating);
    console.log('Rotton Tomatoes URL: ', JSON.parse(body).tomatoURL);  
  
    }
  )};
