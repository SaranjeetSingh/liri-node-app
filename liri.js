require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

var fs = require("fs");

const axios = require("axios");

if(process.argv[2] === "movie-this"){
    var movie = process.argv.slice(3).join("+");
     console.log("movie is : "+movie);
    if(movie != undefined && movie != ""){
        omdbCall(movie);
    }
    else{
        omdbCall("Mr.+Nobody");
    }
}
// else if(process.argv[2] === "concert-this"){
//     var artist = process.argv[3];
    // axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
    //     .then(function (response) {
    //         console.log(response);
    //     //     console.log("Title : "+response.data.Title+"\n");
    //     //     console.log("   Release Date : "+response.data.Released+"\n");
    //     //     console.log("   IMDB Rating is : "+response.data.imdbRating+"\n");
    //     //     console.log("   Rotten tomatoes rating is : "+response.data.Ratings[1].Value+"\n");
    //     //     console.log("   Country of Production is : "+response.data.Country+"\n");
    //     //     console.log("   Language : "+response.data.Language+"\n");
    //     //     console.log("   Plot : "+response.data.Plot+"\n");
    //     //     console.log("   Actors of the movie were : "+response.data.Actors+"\n");
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });

//     var BandsInTownEvents = require('bandsintown-events');
 
//     var Events = new BandsInTownEvents();
//     console.log(Events);

//     Events.setParams({
//         "app_id":"codingbootcamp", //can be anything
//         "artists":["eagles"]
//       });
       
//       //get your events with success and error callbacks
//       Events.getEvents(function( events ){
//         for(var i = 0; i < events.length; i++){
//           console.log( events[i].venue.city + ", " + events[i].venue.region );
//         }
//       },function( errors ){
//         console.log(errors);
//       });
// }

                                                    //Spotify


else if(process.argv[2] === "spotify-this-song"){
    
    var song = process.argv.slice(3).join(" ");
    if(song != ""){
        spotifyCall(song);
    }
    else{
        spotifyCall('ace of base');
    }
}

                                                //random .txt


else if(process.argv[2] === "do-what-it-says"){
    fs.readFile("random.txt", "utf8", function(error, data){
        if(error){
            return console.log(error);
        }
        console.log(data);
        var dataArr = data.split(",");
        console.log(dataArr[1]);

        if(dataArr[0] === "spotify-this-song"){
            spotifyCall(dataArr[1]);
        }
        else if(dataArr[0] === "movie-this"){
            omdbCall(dataArr[1]);
        }
    });
}



function omdbCall(movie){
    axios.get('http://www.omdbapi.com/?t=' + movie + '&y=&plot=short&apikey=trilogy')
        .then(function (response) {
        // console.log(response);
            console.log("Title : "+response.data.Title+"\n");
            console.log("Release Date : "+response.data.Released+"\n");
            console.log("IMDB Rating is : "+response.data.imdbRating+"\n");
            console.log("Rotten tomatoes rating is : "+response.data.Ratings[1].Value+"\n");
            console.log("Country of Production is : "+response.data.Country+"\n");
            console.log("Language : "+response.data.Language+"\n");
            console.log("Plot : "+response.data.Plot+"\n");
            console.log("Actors of the movie were : "+response.data.Actors+"\n");
        })
        .catch(function (error) {
            console.log(error);
        });
}


function spotifyCall(song){
    spotify.search({ type: 'track', query: song})
        .then(function(response) {
            var track = response.tracks.items[0];
            // console.log(track);
            var artists = track.album.artists;
            var artistsName = "";
            for (var i=0;i<artists.length;i++){
                artistsName = artistsName + " " + artists[i].name;
            }
            console.log("\n" + "   Artist's : " + artistsName + "\n");
            console.log("   The song's name : " + track.name + "\n");
            console.log("   Preview link : " + track.external_urls.spotify + "\n");
            console.log("   Album name : " + track.album.name + "\n");
        })
        .catch(function(err) {
        console.log(err);
        });
}