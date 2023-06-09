const ConsoleText = (() => {
    const props = {
        arrText: ['Coder', 'Gamer'],
        id: 'text',
        colors: ['#18d26e', 'lightblue'],
    };

    const controller = {
        consoleText({ words, id, colors }) {
            debugger
            if (colors === undefined) colors = ['#fff'];
            let visible = true;
            let con = document.getElementById('console');
            let letterCount = 1;
            let x = 1;
            let waiting = false;
            let target = document.getElementById(id)
            target.setAttribute('style', 'color:' + colors[0])
            window.setInterval(function () {
                if (letterCount === 0 && waiting === false) {
                    waiting = true;
                    target.innerHTML = words[0].substring(0, letterCount)
                    window.setTimeout(function () {
                        let usedColor = colors.shift();
                        colors.push(usedColor);
                        let usedWord = words.shift();
                        words.push(usedWord);
                        x = 1;
                        target.setAttribute('style', 'color:' + colors[0])
                        letterCount += x;
                        waiting = false;
                    }, 1000)
                } else if (letterCount === words[0].length + 1 && waiting === false) {
                    waiting = true;
                    window.setTimeout(function () {
                        x = -1;
                        letterCount += x;
                        waiting = false;
                    }, 1000)
                } else if (waiting === false) {
                    target.innerHTML = words[0].substring(0, letterCount)
                    letterCount += x;
                }
            }, 120)
            window.setInterval(function () {
                if (visible === true) {
                    con.className = 'console-underscore hidden'
                    visible = false;
                } else {
                    con.className = 'console-underscore'
                    visible = true;
                }
            }, 400)
        }
    };

    return {
        init() {
            controller.consoleText({ ...props, words: props.arrText });
        }
    }
})();

window.onload = (e) => {
    debugger
    ConsoleText.init();
}