var dataKeys = require('./keys.js');

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');

var client = new Twitter(dataKeys.twitterKeys);
var spotify = new Spotify(dataKeys.spotifyKeys);

// console.log(client)


// my - tweets

// spotify - this - song

// movie - this

// do -what - it - says


console.log(process.argv[2])
var userRequest = process.argv[2]


var userInput = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 3; i < process.argv.length; i++) {

  if (userInput == "") {

    userInput = userInput + process.argv[i];

  }

  else {

    userInput = userInput +  " " +  process.argv[i];

  }
}
console.log(userInput);
// if(userRequest === "my-tweets"){
//   //do this stuff
// }else if(){

// }

function commands(fileCommand, fileSearch){
  // console.log(arguments)
  // console.log(arguments['0'], arguments['1'])
  if (arguments["0"] == undefined, arguments["1"] == undefined){

    switch (userRequest) {
      case "my-tweets":
        //do this stuff
        getTweets()
        break;
      case "spotify-this-song":
        //do this stuff
        getSpotify()
        break;
      case "do-what-it-says":
        //do this stuff
        doWhat()
        break;
      case "movie-this":
        //do this stuff
        getMovies()
        break;

      default:
        break;
    }

  } else {

    switch (fileCommand) {
      case "my-tweets":
        //do this stuff
        getTweets()
        break;
      case "spotify-this-song":
        //do this stuff
        getSpotify(fileSearch)
        break;
      case "do-what-it-says":
        //do this stuff
        doWhat()
        break;
      case "movie-this":
        //do this stuff
        getMovies()
        break;
    
      default:
        break;
    }
  }
}
commands()


function getTweets() {
  //This will show your last 20 tweets and when they were created at in your terminal / bash window.
  if(userInput == ""){
    userInput = "NFL"
  }
  var params = { screen_name: userInput };
  
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

function getSpotify(fileSearch) {
  if (arguments['0'] === undefined){
    if(userInput == ""){
      userInput = "The Sign Ace of Base"
    }
    spotify.search({ type: 'track', query: userInput }, function(err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
      }
      var songs = data.tracks.items;
      // console.log(songs)
      // console.log("=====================================")
      // console.log("Arist Name: " + songs.artists[0].name);
      // console.log("Song: " + songs.name);
      // console.log("URL: " + songs.external_urls.spotify);
      // console.log("Album: " + songs.album.name);
  
  
      for (var i = 0; i < songs.length; i++) { 
        console.log("=====================================")
        console.log("Arist Name: " + songs[i].artists[0].name);
        console.log("Song: " + songs[i].name);
        console.log("URL: " + songs[i].external_urls.spotify);
        console.log("Album: " + songs[i].album.name);
          }  
  
    });

  }else{
    spotify.search({ type: 'track', query: fileSearch }, function (err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      var songs = data.tracks.items;
      // console.log(songs)
      // console.log("=====================================")
      // console.log("Arist Name: " + songs.artists[0].name);
      // console.log("Song: " + songs.name);
      // console.log("URL: " + songs.external_urls.spotify);
      // console.log("Album: " + songs.album.name);


      for (var i = 0; i < songs.length; i++) {
        console.log("=====================================")
        console.log("Arist Name: " + songs[i].artists[0].name);
        console.log("Song: " + songs[i].name);
        console.log("URL: " + songs[i].external_urls.spotify);
        console.log("Album: " + songs[i].album.name);
      }

    });
  }
}

function getMovies(){

  request('http://www.omdbapi.com/?t=' + userInput + '&y=&plot=short&apikey=trilogy', function (error, response, body) {
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
    console.log('Rotten Tomatoes Rating: ', JSON.parse(body).Ratings[1].Value);
    console.log('Website: ', JSON.parse(body).Website);  
  
    }
    
  )};

  function doWhat (){
    fs.readFile('./random.txt', "utf8", (err, data) => {
      if (err) throw err;
      // console.log(data.split(","));
      var file = data.split(",")

      var fileCommand = file[0]
      var fileSearch = file[1]
      // console.log(object);
      userRequest = null
    commands(fileCommand, fileSearch)
    });
  }
