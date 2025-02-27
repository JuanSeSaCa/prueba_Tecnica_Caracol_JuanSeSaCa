document.getElementById("playAudio").addEventListener("click", () => {
    const audio = document.getElementById("audioPlayer");
    audio.hidden = false;
    audio.play();
});
