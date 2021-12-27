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



const player_app = {

    initMP: function () {

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


