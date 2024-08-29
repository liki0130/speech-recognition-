window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
const startBtn = document.getElementById('start');
const textArea = document.getElementById('text');
const instructions = document.getElementById('instructions');

recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

function checkMicrophonePermission() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(() => {
            // Permission granted, start speech recognition
            recognition.start();
        })
        .catch((err) => {
            // Permission denied or other error
            alert('Microphone access is required. Please allow microphone access in your browser settings.');
            console.error('Error accessing microphone:', err);
        });
}

startBtn.addEventListener('click', () => {
    checkMicrophonePermission();
});

recognition.addEventListener('start', () => {
    instructions.textContent = 'Listening...';
});

recognition.addEventListener('result', (event) => {
    const speechToText = event.results[0][0].transcript;
    textArea.value += speechToText + ' ';
});

recognition.addEventListener('end', () => {
    instructions.textContent = 'Click "Start Listening" to speak again.';
    recognition.stop();
});
