const audioPlayer = document.getElementById('audio');
const playButton = document.getElementById('playButton');


playButton.addEventListener('click', function() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playButton.textContent = 'Pause Sound'; //Change button --> "pause"
    } else {
        audioPlayer.pause();
        playButton.textContent = 'Play Sound'; //Change button --> "play"
    }
});