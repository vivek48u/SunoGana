console.log("Spotify Clone - Playlist Version");

let currentSong = new Audio();
let songs = [];
let currentIndex = 0;

/* ---------------- TIME FORMAT ---------------- */
function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) return "00:00";

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

/* ---------------- LOAD PLAYLIST (FOLDER STYLE) ---------------- */
function loadPlaylist(key) {
    const playlist = playlists[key];
    if (!playlist) return;

    songs = playlist.songs;
    currentIndex = 0;

    const songUL = document.querySelector(".songlist ul");
    songUL.innerHTML = "";

    songs.forEach((song, index) => {
        songUL.innerHTML += `
        <li data-index="${index}">
            <img class="invert" width="34" src="img/music.svg">
            <div class="info">
                <div>${song.name}</div>
                <div>${song.artist}</div>
            </div>
            <div class="playnow">
                <span>Play Now</span>
                <img class="invert" src="img/play.svg">
            </div>
        </li>`;
    });

    Array.from(songUL.children).forEach(li => {
        li.addEventListener("click", () => {
            const index = parseInt(li.dataset.index);
            playMusic(index);
        });
    });

    playMusic(0, true);
}

/* ---------------- PLAY MUSIC ---------------- */
function playMusic(index, pause = false) {
    currentIndex = index;
    currentSong.src = songs[index].url;

    if (!pause) {
        currentSong.play();
        play.src = "img/pause.svg";
    }

    document.querySelector(".songinfo").innerText = songs[index].name;
    document.querySelector(".songtime").innerText = "00:00 / 00:00";

    document.querySelectorAll(".songlist li").forEach(li => li.classList.remove("active"));
    document.querySelectorAll(".songlist li")[index].classList.add("active");
}

/* ---------------- MAIN ---------------- */
function main() {

    // Load default playlist (change key if needed)
    loadPlaylist("ncs");

    /* Play / Pause */
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "img/pause.svg";
        } else {
            currentSong.pause();
            play.src = "img/play.svg";
        }
    });

    /* Time Update */
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerText =
            `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`;

        document.querySelector(".circle").style.left =
            (currentSong.currentTime / currentSong.duration) * 100 + "%";
    });

    /* Auto play next */
    currentSong.addEventListener("ended", () => {
        if (currentIndex < songs.length - 1) {
            playMusic(currentIndex + 1);
        }
    });

    /* Seekbar */
    document.querySelector(".seekbar").addEventListener("click", (e) => {
        const percent = e.offsetX / e.target.getBoundingClientRect().width;
        currentSong.currentTime = percent * currentSong.duration;
    });

    /* Previous */
    previous.addEventListener("click", () => {
        if (currentIndex > 0) {
            playMusic(currentIndex - 1);
        }
    });

    /* Next */
    next.addEventListener("click", () => {
        if (currentIndex < songs.length - 1) {
            playMusic(currentIndex + 1);
        }
    });

    /* Volume */
    document.querySelector(".range input").addEventListener("change", (e) => {
        currentSong.volume = e.target.value / 100;
    });

    /* Mute */
    document.querySelector(".volume img").addEventListener("click", (e) => {
        if (currentSong.volume > 0) {
            currentSong.volume = 0;
            e.target.src = "img/mute.svg";
            document.querySelector(".range input").value = 0;
        } else {
            currentSong.volume = 0.1;
            e.target.src = "img/volume.svg";
            document.querySelector(".range input").value = 10;
        }
    });

    /* Mobile Menu */
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    });

    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%";
    });
}

main();