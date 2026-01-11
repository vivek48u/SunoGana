console.log("Spotify Clone - Cloudinary Version");

let currentSong = new Audio();
let songs = [];
let currentIndex = 0;

/* -------------------- TIME FORMAT -------------------- */
function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) return "00:00";

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

/* -------------------- SONG LIST (CLOUDINARY) -------------------- */
async function getSongs() {
    songs = [
        {
            name: "Song One",
            artist: "NCS",
            url: "https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/song1.mp3"
        },
        {
            name: "Song Two",
            artist: "NCS",
            url: "https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/song2.mp3"
        },
        {
            name: "Song Three",
            artist: "NCS",
            url: "https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/song3.mp3"
        }
    ];

    let songUL = document.querySelector(".songlist ul");
    songUL.innerHTML = "";

    songs.forEach((song, index) => {
        songUL.innerHTML += `
        <li>
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

    Array.from(songUL.getElementsByTagName("li")).forEach((e, index) => {
        e.addEventListener("click", () => {
            playMusic(index);
        });
    });
}

/* -------------------- PLAY MUSIC -------------------- */
function playMusic(index, pause = false) {
    currentIndex = index;
    currentSong.src = songs[index].url;

    if (!pause) {
        currentSong.play();
        play.src = "img/pause.svg";
    }

    document.querySelector(".songinfo").innerHTML = songs[index].name;
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
}

/* -------------------- MAIN -------------------- */
async function main() {
    await getSongs();
    playMusic(0, true);

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
        document.querySelector(".songtime").innerHTML =
            `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`;

        document.querySelector(".circle").style.left =
            (currentSong.currentTime / currentSong.duration) * 100 + "%";
    });

    /* Seek Bar */
    document.querySelector(".seekbar").addEventListener("click", (e) => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        currentSong.currentTime = (currentSong.duration * percent) / 100;
        document.querySelector(".circle").style.left = percent + "%";
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
        } else {
            currentSong.volume = 0.1;
            e.target.src = "img/volume.svg";
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
