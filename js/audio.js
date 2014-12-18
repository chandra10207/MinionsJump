createAudio = function(filename) {
    var audio = document.createElement('audio');
    var source = document.createElement('source');
    source.src = filename;
    audio.appendChild(source);
    return audio;
};

playAudio=function(filename) {
    var audio = new createAudio(filename);
    audio.play();
    

}