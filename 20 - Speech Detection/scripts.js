
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recogniton = new SpeechRecognition();
recogniton.interimResults = true;


let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);


recogniton.addEventListener('result', (e) => {
    const transcript = Array.from(e.results)
        .map(text => text[0])
        .map(text => text.transcript)
        .join('');

    p.textContent = transcript;

    if(e.results[0].isFinal) {
        p = document.createElement('p');
        words.appendChild(p);
    }
})

recogniton.addEventListener('end', recogniton.start);
recogniton.start();