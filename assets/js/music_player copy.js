/**
 * 1. render song
 * 2. scroll top
 * 3. play/pause/seek
 * 4. rorate CD
 * 5. next, prev
 * 6. random
 * 7. next/repeat when end
 * 8. active song
 * 9. scroll active song into view
 * 10. play song when click
 */

const eMP = $(".music-player");
const eAudio = $("#mucsic-player__audio");
const eListSongs = $(".music-player__list-songs");
const eCdImage = $(".music-player__song .song__thumb");
const eRandomSongBtn = $(".control-btn.random-btn");
const eRepeatSongBtn = $(".control-btn.repeat-btn");
const eDashboard = $(".music-player__dashboard");
const MUSIC_PLAYER_KEY = "NTC_MP";

if (typeof screen.orientation !== 'undefined') {
    eMP.classList.remove("hide");
}

const player_app = {
    helperFuncs: {
        removeVietnameseTones: function (str) {
            str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
            str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
            str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
            str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
            str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
            str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
            str = str.replace(/đ/g, "d");
            str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
            str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
            str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
            str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
            str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
            str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
            str = str.replace(/Đ/g, "D");
            // Some system encode vietnamese combining accent as individual utf-8 characters
            // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
            str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
            str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
            // Remove extra spaces
            // Bỏ các khoảng trắng liền nhau
            str = str.replace(/ + /g, " ");
            str = str.trim();
            // Remove punctuations
            // Bỏ dấu câu, kí tự đặc biệt
            str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
            return str;
        }
    },
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    configs: JSON.parse(localStorage.getItem(MUSIC_PLAYER_KEY)) || {},
    setConfig: function (key, value) {
        this.configs[key] = value;
        localStorage.setItem(MUSIC_PLAYER_KEY, JSON.stringify(this.configs));
    },
    recognition: {},
    currentIndex: 0,
    songs: [
        {
            name: "Anh Khong Hieu",
            singer: "Sol7 & Tommy Tèo",
            image: "./assets/images/songs/anh_khong_hieu.jpg",
            audio: "./assets/audios/anh_khong_hieu.mp3"
        },
        {
            name: "Co Tien Xanh",
            singer: "Sol7",
            image: "./assets/images/songs/co_tien_xanh.jpg",
            audio: "./assets/audios/co_tien_xanh.mp3"
        },
        {
            name: "Di Trong Thanh Pho",
            singer: "Sol7",
            image: "./assets/images/songs/di_trong_thanh_pho.jpg",
            audio: "./assets/audios/di_trong_thanh_pho.mp3"
        },
        {
            name: "Dem Hom Qua",
            singer: "Sol7",
            image: "./assets/images/songs/dem_hom_qua.jpg",
            audio: "./assets/audios/dem_hom_qua.webm"
        },
        {
            name: "Dopamine",
            singer: "Sol7",
            image: "./assets/images/songs/dopamine.jpg",
            audio: "./assets/audios/dopamine.mp3"
        },
        {
            name: "Nam Tao 27",
            singer: "Pjpo",
            image: "./assets/images/songs/nam_tao_27.jpg",
            audio: "./assets/audios/nam_tao_27.mp3"
        },
        {
            name: "Ngan Ngui",
            singer: "Sol7",
            image: "./assets/images/songs/ngan_ngui.jpg",
            audio: "./assets/audios/ngan_ngui.mp3"
        },
        {
            name: "RainDrop",
            singer: "Sol7",
            image: "./assets/images/songs/raindrop.jpg",
            audio: "./assets/audios/raindrop.mp3"
        },
        {
            name: "Vao Hu Vo",
            singer: "Sol7",
            image: "./assets/images/songs/vao_hu_vo.jpg",
            audio: "./assets/audios/vao_hu_vo.mp3"
        },
        {
            name: "Xau",
            singer: "2Can x KhanhJay",
            image: "./assets/images/songs/xau.jpg",
            audio: "./assets/audios/xau.mp3"
        },
    ],
    defineProperties: function () {
        Object.defineProperty(this, "currentSong", {
            get: function () {
                return this.songs[this.currentIndex];
            }
        })
    },
    render: function () {
        const playList = this.songs.map((song, index) => {
            return `
                    <div class="song ${this.currentIndex === index ? "song--play" : ""}" data-index="${index}">
                        <img src="${song.image}" alt="">
                        <div class="song__text">
                            <h4>${song.name}</h4>
                            <p>${song.singer}</p>
                        </div>
                        <div class="option-btn">
                            <i class="fas fa-ellipsis-h"></i>
                        </div>
                    </div>
            `;
        });
        eListSongs.innerHTML = playList.join("");
    },
    loadCurrentSong: function () {
        const eMPHeading = $(".music-player__header .text h3");

        // console.log(eMPHeading, eCdImage, eAudio);

        eMPHeading.textContent = this.currentSong.name;
        eCdImage.style.backgroundImage = `url('${this.currentSong.image}')`;
        eAudio.src = this.currentSong.audio;
    },
    initMP: function () {
        eListSongs.style.height = (eMP.offsetHeight - eDashboard.offsetHeight - 45) + "px";
        //speech 
        const recognition = new webkitSpeechRecognition();
        recognition.lang = "vi-VI";
        recognition.continuous = false;
        this.recognition = recognition;
    },
    loadConfigs: function () {
        console.log(this.configs)
        this.isRandom = this.configs.isRandom;
        this.isRepeat = this.configs.isRepeat;
        eRandomSongBtn.classList.toggle("control-btn--active", this.isRandom);
        eRepeatSongBtn.classList.toggle("control-btn--active", this.isRepeat);
    },
    handleEvents: function () {

        const _this = this;

        //xử lý phóng to/ thu nhỏ cd khi scroll list songs
        const cd = $('.music-player__song');
        const cdWidth = cd.offsetWidth;
        eListSongs.onscroll = function () {
            const scrollTop = eListSongs.scrollTop;
            const newCdWidth = cdWidth - scrollTop;
            cd.style.width = newCdWidth > 0
                ? newCdWidth + "px"
                : "0";
            cd.style.opacity = newCdWidth / cdWidth;
            // console.log(eMP.offsetHeight - eDashboard.offsetHeight)
            eListSongs.style.height = (eMP.offsetHeight - eDashboard.offsetHeight - 45) + "px";
            // console.log(eListSongs.offsetHeight);
        }

        //xử lý khi bấm play
        const ePlayBtn = $(".toggle-play-btn");
        ePlayBtn.onclick = function () {
            _this.isPlaying === true ? eAudio.pause() : eAudio.play();
        }

        //Xử lý khi audio play/pasue
        eAudio.onplay = function () {
            eMP.classList.add("music-player--play");
            _this.isPlaying = true;
            eCdImageRotate.play();
        }
        eAudio.onpause = function () {
            eMP.classList.remove("music-player--play");
            _this.isPlaying = false;
            eCdImageRotate.pause();
        }

        //xử lý thanh progress 
        const eProgress = $("#progress");
        eAudio.ontimeupdate = function () {
            if (eAudio.duration) {
                var progressPercent = Math.floor(eAudio.currentTime / eAudio.duration * 100);
                eProgress.value = progressPercent;
                $(".progress span").style.width = progressPercent + "%";
            }
        }

        //xử lý khi tua
        eProgress.oninput = function (e) {
            const seekTime = ((eAudio.duration * e.target.value) / 100);
            eAudio.currentTime = seekTime;
        }

        //xử lý cd quay
        const eCdImageRotate = eCdImage.animate([{
            transform: "rotate(360deg)"
        }], {
            duration: 6000,
            iterations: Infinity
        })
        eCdImageRotate.pause();

        //xử lý neext, prev song
        const ePrevSongBtn = $(".control-btn.prev-btn");
        const eNextSongBtn = $(".control-btn.next-btn");

        console.log(_this.isRepeat, _this.isRandom);

        ePrevSongBtn.onclick = function () {
            _this.isRandom
                ? _this.randomSong()
                : _this.prevSong();
            _this.render();
            _this.scrollToActiveSong();
            eAudio.play();
        };
        eNextSongBtn.onclick = function () {
            _this.isRandom
                ? _this.randomSong()
                : _this.nextSong();
            _this.render();
            _this.scrollToActiveSong();
            eAudio.play();
        }

        //xử lý random
        eRandomSongBtn.onclick = function () {
            _this.isRandom = !_this.isRandom;
            _this.setConfig("isRandom", _this.isRandom);
            eRandomSongBtn.classList.toggle("control-btn--active");
        }

        //xử lý repeat
        eRepeatSongBtn.onclick = function () {
            _this.isRepeat = !_this.isRepeat;
            _this.setConfig("isRepeat", _this.isRepeat);
            eRepeatSongBtn.classList.toggle("control-btn--active");
        }

        //xử lý khi end tự động chuyển bài
        eAudio.onended = function () {
            _this.isRepeat
                ? eAudio.play()
                : eNextSongBtn.click();
        }

        //xử lý khi click vào playlist
        eListSongs.onclick = function (e) {
            const eSong = e.target.closest('.song:not(.song--play)');
            const eOption = e.target.closest('.option-btn');
            if (eSong || eOption) {
                if (eSong) {
                    _this.currentIndex = Number(eSong.dataset.index);
                    _this.loadCurrentSong();
                    _this.render();
                    eAudio.play();
                }
                if (eOption) {
                    alert("...");
                }
            }
        }

        //xử lý speech
        eRobotBtn.onclick = function () {
            _this.recognition.start();
        }

        _this.recognition.onspeechend = () => {
            _this.recognition.stop();
            // microphone.classList.remove('recording');
        }

        _this.recognition.onerror = (err) => {
            console.error(err);
            // microphone.classList.remove('recording');
        }

        _this.recognition.onresult = (e) => {
            const text = e.results[0][0].transcript;
            _this.handleVoice(text);
        }
    },
    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    prevSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },
    randomSong: function () {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while (newIndex === this.currentIndex);
        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },
    handleVoice: function (text) {
        var handleText = text.toLocaleLowerCase();

        if (handleText.includes("chơi bài")) {
            var songName = handleText.split("bài")[1];
            const matchSongIndex = this.songs.findIndex(s => s.name.toLocaleLowerCase().trim() === this.helperFuncs.removeVietnameseTones(songName.trim()));
            this.currentIndex = matchSongIndex;
            this.loadCurrentSong();
            this.render();
            eAudio.play();
        }

        if (handleText.includes("nghe nhạc")) {
            eMP.style.display = "block";
        }

        if (handleText.includes("tắt nhạc")) {
            eAudio.pause();
            eMP.style.display = "none";
        }
    },
    scrollToActiveSong: function () {
        setTimeout(() => {
            $(".song.song--play").scrollIntoView({
                behavior: "smooth",
                block: "end"
            });
        }, 300);
    },
    start: function () {
        this.initMP();
        this.defineProperties();
        this.render();
        this.loadCurrentSong();
        this.handleEvents();
    }
}

player_app.start();


