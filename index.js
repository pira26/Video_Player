window.addEventListener('load', () => {

	video = document.getElementById('video');
	pauseScreen = document.getElementById('screen');
	screenButton = document.getElementById('screen-button');

	progressBarContainer = document.getElementById('progress-bar-container');
	progressBar = document.getElementById('progress-bar');

	playButton = document.getElementById('play-button');
	timeField = document.getElementById('time-field');
	soundButton = document.getElementById('sound-button');
	soundBarContainer = document.getElementById('sound-bar-container');
	soundBar = document.getElementById('sound-bar');
	fullscreenButton = document.getElementById('fullscreen-button');

	video.load();
	video.addEventListener('canplay', () => {

		playButton.addEventListener('click', playOrPause, false);
		progressBarContainer.addEventListener('click', skip, false);
		updatePlayer();
		soundButton.addEventListener('click', muteOrUnmute, false);
		soundBarContainer.addEventListener('click', changeVolume, false);
		fullscreenButton.addEventListener('click', fullscreen, false);
		screenButton.addEventListener('click', playOrPause, false);

	}, false);

}, false);

const playOrPause = () => {
	if (video.paused) {
		video.play();
		playButton.src = 'images/pause.png';
		update = setInterval(updatePlayer, 30);

		pauseScreen.style.display = 'none';
		screenButton.src = 'images/play.png';
	}
	else {
		video.pause();
		playButton.src = 'images/play.png';
		window.clearInterval(update);

		pauseScreen.style.display = 'block';
		screenButton.src = 'images/play.png';
	}
}

const updatePlayer = () => {
	let percentage = (video.currentTime / video.duration) * 100;
	progressBar.style.width = percentage + '%';
	timeField.innerHTML = getFormattedTime();

	if (video.ended) {
		window.clearInterval(update);
		playButton.src = 'images/replay.png';

		pauseScreen.style.display = 'block';
		screenButton.src = 'images/replay.png';
	}
	else if (video.paused) {
		playButton.src = 'images/play.png';
		screenButton.src = 'images/play.png';
	}
}

const skip = (e) => {
	let mouseX = e.pageX - progressBarContainer.offsetLeft;
	let width = window.getComputedStyle(progressBarContainer).getPropertyValue('width');
	width = parseFloat(width.substr(0, width.length - 2));

	video.currentTime = (mouseX / width) * video.duration;
	updatePlayer();
}

const getFormattedTime = () => {
	let seconds = Math.round(video.currentTime);
	let minutes = Math.floor(seconds / 60);
	minutes > 0 ? seconds -= minutes * 60 : "";
	seconds.toString().length === 1 ? seconds = `0${seconds}` : "";

	let totalSeconds = Math.round(video.duration);
	let totalMinutes = Math.floor(totalSeconds / 60);
	totalMinutes > 0 ? totalSeconds -= totalMinutes * 60 : "";
	totalSeconds.toString().length === 1 ? totalSeconds = `0${totalSeconds}` : "";

	return `${minutes}:${seconds} / ${totalMinutes}:${totalSeconds}`;
}

const muteOrUnmute = () => {
	if (!video.muted) {
		video.muted = true;
		soundButton.src = 'images/mute.png';
		soundBar.style.display = 'none';
	}
	else {
		video.muted = false;
		soundButton.src = 'images/sound.png';
		soundBar.style.display = 'block';
	}
}

const changeVolume = (e) => {
	let mouseX = e.pageX - soundBarContainer.offsetLeft;
	let width = window.getComputedStyle(soundBarContainer).getPropertyValue('width');
	width = parseFloat(width.substr(0, width.length - 2));

	video.volume = (mouseX / width);
	soundBar.style.width = (mouseX / width) * 100 + '%';
	video.muted = false;
	soundButton.src = 'images/sound.png';
	soundBar.style.display = 'block';
}

const fullscreen = () => {
	if (video.requestFullscreen) {
		video.requestFullscreen();
	}
	else if (video.webkitRequestFullscreen) {
		video.webkitRequestFullscreen();
	}
	else if (video.mozRequestFullscreen) {
		video.mozRequestFullscreen();
	}
	else if (video.msRequestFullscreen) {
		video.msRequestFullscreen();
	}
	else if (video.oRequestFullscreen) {
		video.oRequestFullscreen();
	}
}
