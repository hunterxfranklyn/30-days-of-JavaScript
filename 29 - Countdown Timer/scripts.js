let countdown;
const timeLeft = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const controls = document.querySelectorAll('.timer__button');

function timer(seconds) {
    clearInterval(countdown)
    const now = Date.now();
    const then = now + (seconds * 1000);
    displayTimer(seconds);
    displayendtime(then)
    
    countdown = setInterval(() => {
        const remainingSeconds = Math.round((then - Date.now()) / 1000);
        if (remainingSeconds < 0) {
            clearInterval(countdown);
            return;
        }
        displayTimer(remainingSeconds)
        
    }, 1000) 
}

function displayTimer(seconds) {
    const mins = parseInt(Math.floor(seconds/60));
    const secondsLeft = parseInt(seconds % 60);

    timeLeft.textContent = `${mins < 10 ? 0 : ''}${mins} : ${secondsLeft < 10 ? 0 : ''}${secondsLeft}`;   
}

function displayendtime (milliseconds) {
    const end = new Date(milliseconds);
    const mainHours = end.getHours();
    const mainMinutes = end.getMinutes();
    
    endTime.textContent = `Break ends at ${mainHours > 12 ? mainHours - 12 : mainHours}:${mainMinutes < 10 ? 0 : ''}${mainMinutes}`;   
}

function btnUpdate() {
    const seconds = this.dataset.time;
    timer(seconds);
}

controls.forEach(btn => btn.addEventListener('click', btnUpdate));
document.customForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const minutes = e.target.minutes.value;
    const seconds = minutes * 60;
    timer(seconds)
})