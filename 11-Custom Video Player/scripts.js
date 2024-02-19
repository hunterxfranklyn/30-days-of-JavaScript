/* Get Our playerents */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.fullscreen');

// Functions
function togglePlay() {
    const method = video.paused ? video.play() : video.pause();
}

function handleUpdate () {
    const method = this.paused ? '►' : '▐▐' ; 
    toggle.textContent = method;
}

function rangeUpdate() {
    video[this.name] = this.value
}

function updateSkip() {
    video.currentTime += parseFloat(this.dataset.skip)
}

function updateProgress() {
    const progress = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${progress}%`;
}

function scrub(e) {
    const progressJump = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = progressJump;
}

function goFullscreen () {
        if (player.requestFullscreen) {
            player.requestFullscreen();
          } else if (player.webkitRequestFullscreen) { 
            player.webkitRequestFullscreen();
          } else if (player.msRequestFullscreen) {
            player.msRequestFullscreen();
          }    
}

function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}


// Event Listeners
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

video.addEventListener('play', handleUpdate);
video.addEventListener('pause', handleUpdate);

ranges.forEach(range => range.addEventListener('change', rangeUpdate));
ranges.forEach(range => range.addEventListener('mouseover', rangeUpdate));

skipButtons.forEach(btn => btn.addEventListener('click', updateSkip));

video.addEventListener('timeupdate', updateProgress);

progress.addEventListener('click', scrub);

let move = false
progress.addEventListener('mousemove', (e) => move && scrub(e));
progress.addEventListener('mousedown', () => move = true);
progress.addEventListener('mouseup', () => move = false);


fullscreen.addEventListener('click', () => {
    if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        goFullscreen();
    }
    else {
        closeFullscreen()
    }
});