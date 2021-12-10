const audio = document.getElementById('audio');
const currentTime = document.getElementById('currentTime');
const duration = document.getElementById('duration');
const track = document.getElementById('track');
const playBtn = document.getElementById('playBtn');
const volumeRange = document.getElementById('volumeRange');
const volumeBtn = document.getElementById('volumeBtn');

volumeBtn.addEventListener('click', function() {
    if (audio.muted) {
        audio.muted = false;
        volumeBtn.classList.remove('active');
        calculateBackground(volumeRange);
    } else {
        audio.muted = true;
        volumeRange.style.backgroundSize = '0% 100%';
        volumeBtn.classList.add('active');
    }
})

volumeRange.addEventListener('input', function() {
    audio.volume = this.value / 100;

    calculateBackground(this);

    if (audio.volume === 0) {
        volumeBtn.classList.add('active');
    } else {
        volumeBtn.classList.remove('active');
    }
});

playBtn.addEventListener('click', () => {
    if(audio.paused) {
        audio.play();
        playBtn.classList.add('pause');
        playBtn.classList.remove('play');
    } else {
        audio.pause();
        playBtn.classList.remove('pause');
        playBtn.classList.add('play');
    }
})


track.addEventListener('input', function() {
    calculateBackground(this);

    const trackDuration = Math.floor(audio.duration);
    audio.currentTime = (track.value * trackDuration) / 100;
})

function calculateBackground(targetElement) {
    let min = targetElement.min,
        max = targetElement.max, 
        val = targetElement.value;

    targetElement.style.backgroundSize = `${(val - min) * 100 / (max - min)}% 100%`;
}

function calcDuration(seconds) {
    seconds = Math.floor(seconds);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    return hours === 0 ? `${calcTime(minutes - hours * 60)}:${calcTime(seconds - minutes * 60)}` : `${calcTime(hours)}:${calcTime(minutes - hours * 60)}:${calcTime(seconds - minutes * 60)}`;
}

function calcTime(time) {
    time = time.toString();
    return time.length > 1 ? time : '0' + time;
}

setInterval(() => {
    let seconds = audio.currentTime;
    
    track.value = audio.currentTime * 100 / audio.duration;

    currentTime.textContent =  calcDuration(seconds);
    duration.textContent = calcDuration(audio.duration);
    calculateBackground(track);
    
    if (audio.ended) {
        playBtn.classList.remove('pause');
        playBtn.classList.add('play');
    }
}, 50)