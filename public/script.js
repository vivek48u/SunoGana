console.log("Spotify Clone - Playlist Version");

/* ---------------- GLOBAL VARIABLES ---------------- */
let currentSong = new Audio();
let songs = [];
let currentIndex = 0;
let lastVolume = 0.5;

/* ---------------- TIME FORMAT ---------------- */
function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) return "00:00";

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

/* ---------------- LOAD PLAYLIST ---------------- */
function loadPlaylist(key) {
    const playlist = playlists[key];
    if (!playlist || !playlist.songs || playlist.songs.length === 0) {
        console.error("Playlist not found or empty");
        return;
    }

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
            playMusic(parseInt(li.dataset.index));
        });
    });

    // 🔥 IMPORTANT CHANGE
    playMusic(0); // first song AUTO PLAY
}


/* ---------------- PLAY MUSIC ---------------- */
function playMusic(index, pause = false) {
    currentIndex = index;
    currentSong.src = songs[index].url;
    currentSong.load();

    if (!pause) {
        currentSong.play();
        play.src = "img/pause.svg";
    } else {
        play.src = "img/play.svg";
    }

    document.querySelector(".songinfo").innerText = songs[index].name;
    document.querySelector(".songtime").innerText = "00:00 / 00:00";

    document.querySelectorAll(".songlist li").forEach(li => li.classList.remove("active"));
    document.querySelectorAll(".songlist li")[index].classList.add("active");
}

/* ---------------- MAIN ---------------- */
function main() {

    /* DEFAULT PLAYLIST */
    loadPlaylist("ncs");

    /* PLAY / PAUSE */
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "img/pause.svg";
        } else {
            currentSong.pause();
            play.src = "img/play.svg";
        }
    });

    /* TIME UPDATE */
    currentSong.addEventListener("timeupdate", () => {
        if (!isNaN(currentSong.duration)) {
            document.querySelector(".songtime").innerText =
                `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`;

            document.querySelector(".circle").style.left =
                (currentSong.currentTime / currentSong.duration) * 100 + "%";
        }
    });

    /* AUTO NEXT */
    currentSong.addEventListener("ended", () => {
        if (currentIndex < songs.length - 1) {
            playMusic(currentIndex + 1);
        }
    });

    /* SEEK BAR */
    document.querySelector(".seekbar").addEventListener("click", (e) => {
        const seekbar = e.currentTarget;
        const percent = e.offsetX / seekbar.offsetWidth;
        currentSong.currentTime = percent * currentSong.duration;
    });

    /* PREVIOUS */
    previous.addEventListener("click", () => {
        if (currentIndex > 0) {
            playMusic(currentIndex - 1);
        }
    });

    /* NEXT */
    next.addEventListener("click", () => {
        if (currentIndex < songs.length - 1) {
            playMusic(currentIndex + 1);
        }
    });

    /* VOLUME */
    document.querySelector(".range input").addEventListener("input", (e) => {
        currentSong.volume = e.target.value / 100;
        lastVolume = currentSong.volume;
    });

    /* MUTE / UNMUTE */
    document.querySelector(".volume img").addEventListener("click", (e) => {
        if (currentSong.volume > 0) {
            lastVolume = currentSong.volume;
            currentSong.volume = 0;
            e.target.src = "img/mute.svg";
            document.querySelector(".range input").value = 0;
        } else {
            currentSong.volume = lastVolume || 0.5;
            e.target.src = "img/volume.svg";
            document.querySelector(".range input").value = currentSong.volume * 100;
        }
    });

    /* MOBILE MENU */
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    });

    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%";
    });
}

main();
