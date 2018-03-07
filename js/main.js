var audioSource = ["goosebumps.mp3","Lovesick (Ft. ASAP Rocky).mp3","Redbone.mp3","Slide (feat. Frank Ocean & Migos).mp3","video.mp4","video2.mp4"];
var audios = [];
var nowPlaying;
var namePlaying = "";
var positionPlaying = 0;
var pauseStatus = "";
var volume = 0.05;

$(document).ready(function(){
    for(var i = 0; i < audioSource.length; i++){
        if(audioSource[i].slice(-3) != "mp4"){
            audios[i] = new Audio();
            audios[i].src="src/" + audioSource[i];
        }
    }

    audios[0].play();
    nowPlaying = audios[0];
    namePlaying = audioSource.indexOf(audios[0].src.lastIndexOf("/"));
    namePlaying = audioSource[0].substring(namePlaying + 1);
    nowPlaying.volume = volume;

    setInterval(function(){
        if(nowPlaying.currentTime == nowPlaying.duration)
            nextSong();
    },500);

    $("#player").append("<img class='player-img' id='image' src='thumbnails/" + namePlaying.slice(0, namePlaying.length-4) +".png'>");

    $("#play").click(function(){playPause();});
    $("#backwards").click(function(){

        if(nowPlaying.currentTime > 10)
            nowPlaying.currentTime -= 10;
        else if(nowPlaying.currentTime > 2)
            nowPlaying.currentTime = 0;
            else
                prevSong();
    });
    $("#forward").click(function(){
        if(nowPlaying.currentTime + 10 > nowPlaying.duration){
            nextSong();
        } else{
            nowPlaying.currentTime += 10;
        }
    });
    $("#next").click(function(){nextSong();});
    $("#previous").click(function(){prevSong();});

    $("#player-volume").change(function(){changeVolume();});


    $(".play-list").click(function(){
        nowPlaying.pause();
        var name = $(this).attr('id');

        $("#play").attr('src', 'img/pause.svg');
        pauseStatus = "playing";
        $("video").hide();

        namePlaying = name;
        positionPlaying = audioSource.indexOf(namePlaying);

        if(namePlaying.slice(-3) == "mp3"){
            changeThumbnail();
            nowPlaying = audios[positionPlaying];
            $("#image").show();
        } else{
            $("#image").hide();
            nowPlaying = document.getElementById(name.substring(0, name.length - 4));
            $("#" + name.substring(0, name.length - 4)).show();
        }

        changeVolume();
        nowPlaying.currentTime = 0;
        nowPlaying.play();
    });
});

function playPause(){
    if(pauseStatus == "" || pauseStatus == "playing"){
        $("#play").attr('src', 'img/play.svg');
        nowPlaying.pause();
        pauseStatus = "paused";
    } else{
        if(pauseStatus == "paused"){
            $("#play").attr('src', 'img/pause.svg');
            nowPlaying.play();
            pauseStatus = "playing";
        }
    }
}

function nextSong(){
    nowPlaying.pause();
    $("#play").attr('src', 'img/pause.svg');
    pauseStatus = "playing";
    positionPlaying = audioSource.indexOf(namePlaying);

    $("video").hide();

    if(audioSource[positionPlaying + 1] != undefined){
        namePlaying = audioSource.indexOf(audioSource[positionPlaying + 1]);
        namePlaying = audioSource[positionPlaying + 1];
        if(namePlaying.slice(-3) == "mp3")
            nowPlaying = audios[positionPlaying + 1];
    }
    else {
        namePlaying = audioSource.indexOf(audioSource[0]);
        namePlaying = audioSource[0];
        if(namePlaying.slice(-3) == "mp3")
            nowPlaying = audios[0];
    }


    if(namePlaying.slice(-3) == "mp4"){
        $("#image").hide();
        var videoName = namePlaying.substring(0, namePlaying.length - 4);
        nowPlaying = document.getElementById(videoName);
        $("#" + videoName).show();
    } else{
        $("#image").show();
        changeThumbnail();
    }

    changeVolume();
    nowPlaying.currentTime = 0;
    nowPlaying.play();

}

function prevSong(){
    nowPlaying.pause();
    $("#play").attr('src', 'img/pause.svg');
    pauseStatus = "playing";
    positionPlaying = audioSource.indexOf(namePlaying);

    $("video").hide();
    if(audioSource[positionPlaying - 1] != undefined){
        namePlaying = audioSource.indexOf(audioSource[positionPlaying - 1]);
        namePlaying = audioSource[positionPlaying - 1];
        if(namePlaying.slice(-3) == "mp3")
            nowPlaying = audios[positionPlaying - 1];
    } else {
        namePlaying = audioSource.indexOf(audioSource[audios.length - 1]);
        namePlaying = audioSource[audioSource.length - 1];
        if(namePlaying.slice(-3) == "mp3")
            nowPlaying = audios[audios.length - 1];
    }

    if(namePlaying.slice(-3) == "mp4"){
        $("#image").hide();
        var videoName = namePlaying.substring(0, namePlaying.length - 4);
        nowPlaying = document.getElementById(videoName);
        $("#" + videoName).show();
    } else{
        $("#image").show();
        changeThumbnail();
    }

    changeVolume();
    nowPlaying.currentTime = 0;
    nowPlaying.play();

    changeThumbnail();
}

function changeThumbnail(){
    $("#image").attr("src","thumbnails/" + namePlaying.slice(0, namePlaying.length-4) +".png");
}

function changeVolume(){
    volume = $("#player-volume").val();

    if(volume < 10)
        volume = '0' + volume;

    nowPlaying.volume = '0.' + volume;
}

