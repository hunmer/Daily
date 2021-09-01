var g_speaker = {
    synth: window.speechSynthesis,
    text: '',
    log: true,
    words: [],
    utterThis: 0,
    init: () => {
        speechSynthesis.onvoiceschanged = () => {
            voices = g_speaker.synth.getVoices();
            for (i = 0; i < voices.length; i++) {
                if (voices[i].lang == 'ja-JP') {
                    g_speaker.utterThis = new SpeechSynthesisUtterance();
                    g_speaker.utterThis.onend = function(event) {
                    }
                    g_speaker.utterThis.onerror = function(event) {}
                    g_speaker.utterThis.onboundary = function(event) {
                       //var word = event.target.text.substr(event.charIndex, event.charLength);
                    }
                    g_speaker.utterThis.voice = voices[i];
                    g_speaker.utterThis.pitch = g_config.patch;
                    g_speaker.utterThis.rate = g_config.rate;
                    g_speaker.utterThis.volume = 1;
                    return true;
                }
            }
            return false;
        };
    },

    setPatch: (value) => {
    	g_config.patch = value;
    	local_saveJson('config', g_config);
    },

    setRate: (value) => {
    	g_config.rate = value;
    	local_saveJson('config', g_config);
    },

    speak: (text) => {
        if (g_speaker.synth.speaking) {
            g_speaker.synth.cancel()
        }
        g_speaker.utterThis.text = text;
        g_speaker.synth.speak(g_speaker.utterThis);
    }
}
g_speaker.init();