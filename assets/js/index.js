// slide
// const slidesContainer = document.querySelector('.gallery-slide .gallery-item-container')
const bigSlideItems = document.querySelectorAll("#slide-1 .gallery-item")
const totalBigSlides = bigSlideItems.length
// const widthBigImg = bigSlideItems[0].clientWidth

// next/back btn
const backBtn = document.querySelector(".back-btn")
const nextBtnSlide = document.querySelector(".next-btn")

let slidePos = 0


backBtn.addEventListener("click", () => {
	toBackPos()
})

nextBtnSlide.addEventListener("click", () => {
	toNextPos()
})

function checkBtnCanActive() {
	if (slidePos == 0) {
		backBtn.style.opacity = 0.3
		backBtn.style.cursor = "default"
		backBtn.setAttribute("disabled", true)
	}
	else {
		backBtn.style.opacity = 1
		backBtn.style.cursor = "pointer"
		backBtn.setAttribute("disabled", false)
	}

	if (slidePos == totalBigSlides - 3) {
		nextBtnSlide.style.opacity = 0.3
		nextBtnSlide.style.cursor = "default"
		nextBtnSlide.setAttribute("disabled", true)
	}
	else {
		nextBtnSlide.style.opacity = 1
		nextBtnSlide.style.cursor = "pointer"
		nextBtnSlide.setAttribute("disabled", false)
	}
}

checkBtnCanActive()

function toNextPos() {
	if (slidePos == totalBigSlides - 3) {
		slidePos = totalBigSlides - 3
	}
	else {
		for (let slide of bigSlideItems) {
			slide.classList.add("hide-left")
		}

		slidePos++

		setTimeout(() => {
			bigSlideItems[slidePos - 1].classList.add("nonactive")
			for (let slide of bigSlideItems) {
				slide.classList.remove("hide-left")
			}
		}, 300)
	}
	checkBtnCanActive()
}

function toBackPos() {
	if (slidePos == 0) {
		slidePos = 0
	}
	else {
		for (let slide of bigSlideItems) {
			slide.classList.add("come-right")
		}

		bigSlideItems[slidePos - 1].classList.remove("nonactive")
		slidePos--

		setTimeout(() => {
			for (let slide of bigSlideItems) {
				slide.classList.remove("come-right")
			}
		}, 300)
	}
	checkBtnCanActive()
}


// =============================== CD-PLAYER ================================
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const PlAYER_STORAGE_KEY = "F8_PLAYER"

const player = $(".player")
const cd = $(".cd")
const nameSong = $("span h2")
const singer = $("span h4")
const cdThumb = $(".cd-thumb")
const audio = $("#audio")
const playBtn = $(".btn-toggle-play")
const progress = $("#progress")
const prevBtn = $(".btn-prev")
const nextBtn = $(".btn-next")
const randomBtn = $(".btn-random")
const repeatBtn = $(".btn-repeat")
const playlist = $(".playlist")

const app = {
	currentIndex: 0,
	isPlaying: false,
	isRandom: false,
	isRepeat: false,
	config: {},
	// (1/2) Uncomment the line below to use localStorage
	config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
	songs: [
		{
			name: "Babel",
			singer: "Gustavo Santaolalla",
			image: "assets/pics/babel.jpg",
			path: "assets/music/y2mate.com - Gustavo Santaolalla  Babel Otnicka Remix  Tom Hardy The Gangster.wav",
		},
		{
			name: "Such a Whore",
			singer: "JVLA",
			image: "assets/pics/JVLA-Such-a-Whore-_Stellular-Remix_.jpg",
			path: "assets/music/y2mate.com - JVLA  Such a Whore Stellular Remix.wav",
		},
		{
			name: "Quện",
			singer: "HADES",
			image: "assets/pics/quen.jpg",
			path: "assets/music/y2mate.com - HADES  Quện prod by Onderbi  Tục Ca 18_320kbps.mp3",
		},
		{
			name: "Roses",
			singer: "MVDNES",
			image: "assets/pics/roses.jpg",
			path: "assets/music/y2mate.com - MVDNES  Roses INFINITY BASS_320kbps.mp3",
		},
	],
	setConfig: function (key, value) {
		this.config[key] = value
		// (2/2) Uncomment the line below to use localStorage
		localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config))
	},
	defineProperties: function () {
		Object.defineProperty(this, "currentSong", {
			get: function () {
				return this.songs[this.currentIndex]
			},
		})
	},
	handleEvents: function () {
		const _this = this

		// Xử lý CD quay / dừng
		// Handle CD spins / stops
		const cdThumbAnimate = cdThumb.animate(
			[{ transform: "rotate(360deg)" }],
			{
				duration: 10000, // 10 seconds
				iterations: Infinity,
			}
		)
		cdThumbAnimate.pause()

		// Xử lý khi click play
		// Handle when click play
		playBtn.onclick = function () {
			if (_this.isPlaying) {
				audio.pause()
			}
			else {
				audio.play()
			}
		}

		// Khi song được play
		// When the song is played
		audio.onplay = function () {
			_this.isPlaying = true
			player.classList.add("playing")
			cdThumbAnimate.play()
		}

		// Khi song bị pause
		// When the song is pause
		audio.onpause = function () {
			_this.isPlaying = false
			player.classList.remove("playing")
			cdThumbAnimate.pause()
		}

		// Khi tiến độ bài hát thay đổi
		// When the song progress changes
		audio.ontimeupdate = function () {
			if (audio.duration) {
				const progressPercent = Math.floor(
					(audio.currentTime / audio.duration) * 100
				)
				progress.value = progressPercent
			}
		}

		// Xử lý khi tua song
		// Handling when seek
		progress.onchange = function (e) {
			const seekTime = (audio.duration / 100) * e.target.value
			audio.currentTime = seekTime
		}

		// Khi next song
		// When next song
		nextBtn.onclick = function () {
			if (_this.isRandom) {
				_this.playRandomSong()
			}
			else {
				_this.nextSong()
			}
			audio.play()
		}

		// Khi prev song
		// When prev song
		prevBtn.onclick = function () {
			if (_this.isRandom) {
				_this.playRandomSong()
			}
			else {
				_this.prevSong()
			}
			audio.play()
		}

		// Xử lý bật / tắt random song
		// Handling on / off random song
		randomBtn.onclick = function () {
			_this.isRandom = !_this.isRandom
			_this.setConfig("isRandom", _this.isRandom)
			randomBtn.classList.toggle("active", _this.isRandom)
		}

		// Xử lý lặp lại một song
		// Single-parallel repeat processing
		repeatBtn.onclick = function () {
			_this.isRepeat = !_this.isRepeat
			_this.setConfig("isRepeat", _this.isRepeat)
			repeatBtn.classList.toggle("active", _this.isRepeat)
		}

		// Xử lý next song khi audio ended
		// Handle next song when audio ended
		audio.onended = function () {
			if (_this.isRepeat) {
				audio.play()
			}
			else {
				nextBtn.click()
			}
		}
	},
	loadCurrentSong: function () {
		nameSong.textContent = this.currentSong.name
		singer.textContent = this.currentSong.singer
		cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
		audio.src = this.currentSong.path
	},
	loadConfig: function () {
		this.isRandom = this.config.isRandom
		this.isRepeat = this.config.isRepeat
	},
	nextSong: function () {
		this.currentIndex++
		if (this.currentIndex >= this.songs.length) {
			this.currentIndex = 0
		}
		this.loadCurrentSong()
	},
	prevSong: function () {
		this.currentIndex--
		if (this.currentIndex < 0) {
			this.currentIndex = this.songs.length - 1
		}
		this.loadCurrentSong()
	},
	playRandomSong: function () {
		let newIndex
		do {
			newIndex = Math.floor(Math.random() * this.songs.length)
		} while (newIndex === this.currentIndex)

		this.currentIndex = newIndex
		this.loadCurrentSong()
	},
	start: function () {
		// Gán cấu hình từ config vào ứng dụng
		// Assign configuration from config to application
		this.loadConfig()

		// Định nghĩa các thuộc tính cho object
		// Defines properties for the object
		this.defineProperties()

		// Lắng nghe / xử lý các sự kiện (DOM events)
		// Listening / handling events (DOM events)
		this.handleEvents()

		// Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
		// Load the first song information into the UI when running the app
		this.loadCurrentSong()

		// Hiển thị trạng thái ban đầu của button repeat & random
		// Display the initial state of the repeat & random button
		randomBtn.classList.toggle("active", this.isRandom)
		repeatBtn.classList.toggle("active", this.isRepeat)
	},
}

app.start()


// ========================= CHANGE VALUE OF VOLUME ============================

// Create new audio element
let current_track = document.querySelector(".audio")
let volume_slider = document.querySelector(".volume_slider")
let volume_down = document.querySelector(".fa-volume-down")
let volume_mute = document.querySelector(".fa-volume-mute")

function setVolume(value) {
	if (value <= 0 && value <= 1) {
		current_track.volume = value
		seek_slider.value = value
	}
	else {
		current_track.volume = volume_slider.value / 100
	}
}

function volumeOn() {
	if (current_track.volume + .1 <= 1) {
		current_track.volume += .1
	}
	else {
		current_track.volume = 1
	}
	volume_slider.value = current_track.volume * 100
}

let temp_volume, countOff_volume = 0
function volumeOff() {
	if (current_track.volume - .1 >= 0) {
		current_track.volume -= .1
	}
	else {
		current_track.volume = 0
	}

	if (countOff_volume == 0 && current_track.volume == 0) {
		current_track.volume = 0
		countOff_volume = 1

		volume_down.classList.remove("active")
		volume_mute.classList.add("active")
	}
	else {
		current_track.volume = .1
		countOff_volume = 0
		
		volume_down.classList.add("active")
		volume_mute.classList.remove("active")
	}

	volume_slider.value = current_track.volume * 100
}