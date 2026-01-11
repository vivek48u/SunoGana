let currentSong = new Audio();
let currentIndex = 0;

function secondsToMinutesSeconds(seconds) {
  if (isNaN(seconds)) return "00:00";
  return `${Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0")}:${Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0")}`;
}

function renderSongs() {
  const ul = document.querySelector(".songlist ul");
  ul.innerHTML = "";

  songs.forEach((song, index) => {
    ul.innerHTML += `
      <li onclick="playMusic(${index})">
        <img src="img/music.svg" width="30">
        <div class="info">
          <div>${song.name}</div>
          <div>${song.artist}</div>
        </div>
      </li>`;
  });
}

function playMusic(index, pause = false) {
  currentIndex = index;
  currentSong.src = songs[index].url;

  if (!pause) {
    currentSong.play();
    play.src = "img/pause.svg";
  }

  document.querySelector(".songinfo").innerText = songs[index].name;
}

play.addEventListener("click", () => {
  if (currentSong.paused) {
    currentSong.play();
    play.src = "img/pause.svg";
  } else {
    currentSong.pause();
    play.src = "img/play.svg";
  }
});

previous.addEventListener("click", () => {
  if (currentIndex > 0) playMusic(currentIndex - 1);
});

next.addEventListener("click", () => {
  if (currentIndex < songs.length - 1) playMusic(currentIndex + 1);
});

currentSong.addEventListener("timeupdate", () => {
  document.querySelector(".songtime").innerText =
    `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`;

  document.querySelector(".circle").style.left =
    (currentSong.currentTime / currentSong.duration) * 100 + "%";
});

document.querySelector(".seekbar").addEventListener("click", e => {
  const percent = e.offsetX / e.target.clientWidth;
  currentSong.currentTime = percent * currentSong.duration;
});

renderSongs();
playMusic(0, true);
