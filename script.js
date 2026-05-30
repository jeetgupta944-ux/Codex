alert("Happy Birthday Bachaa!!!");
// alert("There is an audio button on the right side; please turn it on, and turn it off when you play any video. THANK YOU!")

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls //
function changeSlide(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slide");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
}

// AUDIO //

 const audio = document.getElementById("bgAudio");
  const btn = document.getElementById("audioToggle");

  // Start audio on first interaction (browser policy)
  document.body.addEventListener("click", () => {
    if (audio.paused) {
      audio.play().catch(() => {});
    }
  }, { once: true });

  let isMuted = false;
  let audioWasPlaying = false;

  // Function to pause audio when video plays
  function pauseAudioForVideo() {
    if (!audio.paused) {
      audioWasPlaying = true;
      audio.pause();
      isMuted = true;
      btn.textContent = "🔊";
    }
  }

  // Function to resume audio when video pauses (optional)
  function resumeAudioAfterVideo() {
    if (audioWasPlaying && audio.paused) {
      audio.play();
      audioWasPlaying = false;
      isMuted = false;
      btn.textContent = "🔊";
    }
  }

  // Get all videos on the page
  const allVideos = document.querySelectorAll("video");

  // Add event listeners to all videos
  allVideos.forEach(video => {
    video.addEventListener("play", pauseAudioForVideo);
    video.addEventListener("pause", resumeAudioAfterVideo);
    video.addEventListener("ended", resumeAudioAfterVideo);
  });

  btn.addEventListener("click", () => {
    if (isMuted) {
      audio.muted = false;
      audio.play();
      btn.textContent = "🔊";
    } else {
      audio.muted = true;
      audio.pause();
      btn.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\" id=\"Mute--Streamline-Block-Free\" height=\"16\" width=\"16\" ><desc>{\"\\n    Mute Streamline Icon: https://streamlinehq.com\\n  \"}</desc><path fill=\"#000000\" d=\"M7.5 0 4.25 3.25 1 0 0 1l15 15 1 -1 -2.0503 -2.0503C15.2165 11.683 16 9.933 16 8c0 -3.86599 -3.134 -7 -7 -7v2.5c2.4853 0 4.5 2.01472 4.5 4.5 0 1.24264 -0.5037 2.3676 -1.318 3.182l-1.0607 -1.0607C11.6642 9.57843 12 8.82843 12 8c0 -1.65685 -1.3431 -3 -3 -3v3L7.5 6.5V0Z\" strokeWidth=\"1\" /><path fill=\"#000000\" d=\"M7.5 10.5 1 4H0v8h3.5l4 4v-5.5Z\" strokeWidth=\"1\" /></svg>";
    }
    isMuted = !isMuted;
  });

  // FLIP //

  document.getElementById("flipContainer").addEventListener("click", function(e) {
      if (e.target.classList.contains("flip-btn")) {
        e.target.closest(".flip-box").classList.toggle("flipped");
      }
    });

 const container = document.querySelector(".container"),
mainVideo = container.querySelector("video"),
videoTimeline = container.querySelector(".video-timeline"),
progressBar = container.querySelector(".progress-bar"),
volumeBtn = container.querySelector(".volume i"),
volumeSlider = container.querySelector(".left input");
currentVidTime = container.querySelector(".current-time"),
videoDuration = container.querySelector(".video-duration"),
skipBackward = container.querySelector(".skip-backward i"),
skipForward = container.querySelector(".skip-forward i"),
playPauseBtn = container.querySelector(".play-pause i"),
speedBtn = container.querySelector(".playback-speed span"),
speedOptions = container.querySelector(".speed-options"),
pipBtn = container.querySelector(".pic-in-pic span"),
fullScreenBtn = container.querySelector(".fullscreen i");
let timer;

const hideControls = () => {
    if(mainVideo.paused) return;
    timer = setTimeout(() => {
        container.classList.remove("show-controls");
    }, 3000);
}
hideControls();

container.addEventListener("mousemove", () => {
    container.classList.add("show-controls");
    clearTimeout(timer);
    hideControls();   
});

const formatTime = time => {
    let seconds = Math.floor(time % 60),
    minutes = Math.floor(time / 60) % 60,
    hours = Math.floor(time / 3600);

    seconds = seconds < 10 ? `0${seconds}` : seconds;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    hours = hours < 10 ? `0${hours}` : hours;

    if(hours == 0) {
        return `${minutes}:${seconds}`
    }
    return `${hours}:${minutes}:${seconds}`;
}

videoTimeline.addEventListener("mousemove", e => {
    let timelineWidth = videoTimeline.clientWidth;
    let offsetX = e.offsetX;
    let percent = Math.floor((offsetX / timelineWidth) * mainVideo.duration);
    const progressTime = videoTimeline.querySelector("span");
    offsetX = offsetX < 20 ? 20 : (offsetX > timelineWidth - 20) ? timelineWidth - 20 : offsetX;
    progressTime.style.left = `${offsetX}px`;
    progressTime.innerText = formatTime(percent);
});

videoTimeline.addEventListener("click", e => {
    let timelineWidth = videoTimeline.clientWidth;
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
});

mainVideo.addEventListener("timeupdate", e => {
    let {currentTime, duration} = e.target;
    let percent = (currentTime / duration) * 100;
    progressBar.style.width = `${percent}%`;
    currentVidTime.innerText = formatTime(currentTime);
});

mainVideo.addEventListener("loadeddata", () => {
    videoDuration.innerText = formatTime(mainVideo.duration);
});

const draggableProgressBar = e => {
    let timelineWidth = videoTimeline.clientWidth;
    progressBar.style.width = `${e.offsetX}px`;
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
    currentVidTime.innerText = formatTime(mainVideo.currentTime);
}

volumeBtn.addEventListener("click", () => {
    if(!volumeBtn.classList.contains("fa-volume-high")) {
        mainVideo.volume = 0.5;
        volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
    } else {
        mainVideo.volume = 0.0;
        volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
    }
    volumeSlider.value = mainVideo.volume;
});

volumeSlider.addEventListener("input", e => {
    mainVideo.volume = e.target.value;
    if(e.target.value == 0) {
        return volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
    }
    volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
});

speedOptions.querySelectorAll("li").forEach(option => {
    option.addEventListener("click", () => {
        mainVideo.playbackRate = option.dataset.speed;
        speedOptions.querySelector(".active").classList.remove("active");
        option.classList.add("active");
    });
});

document.addEventListener("click", e => {
    if(e.target.tagName !== "SPAN" || e.target.className !== "material-symbols-rounded") {
        speedOptions.classList.remove("show");
    }
});

fullScreenBtn.addEventListener("click", () => {
    container.classList.toggle("fullscreen");
    if(document.fullscreenElement) {
        fullScreenBtn.classList.replace("fa-compress", "fa-expand");
        return document.exitFullscreen();
    }
    fullScreenBtn.classList.replace("fa-expand", "fa-compress");
    container.requestFullscreen();
});

speedBtn.addEventListener("click", () => speedOptions.classList.toggle("show"));
pipBtn.addEventListener("click", () => mainVideo.requestPictureInPicture());
skipBackward.addEventListener("click", () => mainVideo.currentTime -= 5);
skipForward.addEventListener("click", () => mainVideo.currentTime += 5);
mainVideo.addEventListener("play", () => playPauseBtn.classList.replace("fa-play", "fa-pause"));
mainVideo.addEventListener("pause", () => playPauseBtn.classList.replace("fa-pause", "fa-play"));
playPauseBtn.addEventListener("click", () => mainVideo.paused ? mainVideo.play() : mainVideo.pause());
videoTimeline.addEventListener("mousedown", () => videoTimeline.addEventListener("mousemove", draggableProgressBar));
document.addEventListener("mouseup", () => videoTimeline.removeEventListener("mousemove", draggableProgressBar));