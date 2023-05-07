const Clock = (() => {
    const states = {
        deg: 6,
        hr: document.querySelector("#hr"),
        mn: document.querySelector("#mn"),
        sc: document.querySelector("#sc"),
    };

    return {
        init() {
            $("#clock").innerHTML(`
                <div class="hour">
                    <div class="hr" id="hr"></div>
                </div>
                <div class="min">
                    <div class="mn" id="mn"></div>
                </div>
                <div class="sec">
                    <div class="sc" id="sc"></div>
                </div>
            `);

            setInterval(() => {
                let day = new Date();
                let hh = day.getHours() * 30;
                let mm = day.getMinutes() * states.deg;
                let ss = day.getSeconds() * states.deg;

                states.hr.style.transform = `rotateZ(${(hh) + (mm / 12)}deg)`;
                states.mn.style.transform = `rotateZ(${mm}deg)`;
                states.sc.style.transform = `rotateZ(${ss}deg)`;
            })
        },
    }
})();

export default Clock;