const songs = [
    {
        title: "Pahadi Song 1",
        artist: "Pahadi Folk Music",
        src: "songs/songs1.mp3"
    },
    {
        title: "Pahadi Song 2",
        artist: "Pahadi Folk Music",
        src: "songs/songs2.mp3"
    },
    {
        title: "Pahadi Song 3",
        artist: "Pahadi Folk Music",
        src: "songs/songs3.mp3"
    }
];

let currentSong = 0;

const audio = document.getElementById("audio");
const playButton = document.getElementById("play");
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const songTitle = document.getElementById("song-title");
const artist = document.getElementById("artist");
const progressBar = document.getElementById("progress-bar");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");
const volume = document.getElementById("volume");

function loadSong(index) {
    const song = songs[index];

    audio.src = song.src;
    audio.load();

    songTitle.textContent = song.title;
    artist.textContent = song.artist;

    progressBar.value = 0;
    currentTime.textContent = "0:00";
    duration.textContent = "0:00";
    playButton.textContent = "▶";
}

playButton.addEventListener("click", async () => {
    try {
        if (audio.paused) {
            await audio.play();
            playButton.textContent = "⏸";
        } else {
            audio.pause();
            playButton.textContent = "▶";
        }
    } catch (error) {
        console.error("Audio error:", error);
    }
});

previousButton.addEventListener("click", async () => {
    currentSong--;

    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }

    loadSong(currentSong);

    try {
        await audio.play();
        playButton.textContent = "⏸";
    } catch (error) {
        console.error(error);
    }
});

nextButton.addEventListener("click", async () => {
    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    loadSong(currentSong);

    try {
        await audio.play();
        playButton.textContent = "⏸";
    } catch (error) {
        console.error(error);
    }
});

audio.addEventListener("timeupdate", () => {
    if (!audio.duration) return;

    progressBar.value =
        (audio.currentTime / audio.duration) * 100;

    currentTime.textContent =
        formatTime(audio.currentTime);

    duration.textContent =
        formatTime(audio.duration);
});

progressBar.addEventListener("input", () => {
    if (!audio.duration) return;

    audio.currentTime =
        (progressBar.value / 100) * audio.duration;
});

volume.addEventListener("input", () => {
    audio.volume = Number(volume.value);
});

audio.addEventListener("ended", () => {
    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    loadSong(currentSong);
    audio.play();
    playButton.textContent = "⏸";
});

function formatTime(seconds) {
    if (!isFinite(seconds)) return "0:00";

    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return minutes + ":" + String(secs).padStart(2, "0");
}

audio.volume = 0.8;

loadSong(currentSong);