
const AiMusicPlayer = (() => {
    // More API functions here:
    // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image
    // the link to your model provided by Teachable Machine export panel
    const $ = document.querySelector.bind(document);
    const props = {
        URL: "https://teachablemachine.withgoogle.com/models/sSGOvvszp/",
    };
    const states = {
        eWebcam: $("#webcam-container"),
        eMP: $(".music-player"),
        model: null,
        webcam: null,
        maxPredictions: null,
        isRun: null,
    };
    const events = {
        async loop() {
            if (states.isRun) {
                states.webcam.update(); // update the webcam frame
                await events.predict();
                window.requestAnimationFrame(events.loop);
            } else {
                states.webcam.pause();
                states.webcam.stop();
            }
        },
        // run the webcam image through the image model
        async predict() {
            // predict can take in an image, video or canvas html element
            const prediction = await states.model.predictTopK(states.webcam.canvas, 1);
            if (prediction[0].className.toLocaleLowerCase().includes("ms-display") && (prediction[0].probability.toFixed(2) * 100) > 95) {
                states.eMP.classList.remove("hide");
            }
            if (prediction[0].className.toLocaleLowerCase().includes("ms-hide") && (prediction[0].probability.toFixed(2) * 100) > 95) {
                states.eMP.classList.add("hide");
                states.eWebcam.classList.add("hide");
                const eWebcamCanvas = states.eWebcam.getElementsByTagName("canvas");
                eWebcamCanvas && Array.from(eWebcamCanvas).forEach(item => item.remove());
                states.webcam.stop();
                states.isRun = false;
            }
        },
    };
    return {
        async init() {
            states.isRun = true;
            const modelURL = props.URL + "model.json";
            const metadataURL = props.URL + "metadata.json";

            // load the model and metadata
            // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
            // or files from your local hard drive
            // Note: the pose library adds "tmImage" object to your window (window.tmImage)
            states.model = await tmImage.load(modelURL, metadataURL);
            states.maxPredictions = states.model.getTotalClasses();

            // Convenience function to setup a webcam
            const flip = true; // whether to flip the webcam
            states.webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
            await states.webcam.setup(); // request access to the webcam
            await states.webcam.play();
            window.requestAnimationFrame(events.loop);

            // append elements to the DOM
            states.eWebcam.classList.remove("hide");
            states.eWebcam.appendChild(states.webcam.canvas);
        }
    }
})();
export default AiMusicPlayer;
