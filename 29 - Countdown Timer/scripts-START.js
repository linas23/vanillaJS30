let countdown;
const timerDisplay = document.querySelector('.display__time-left')
const endTimeDisplay = document.querySelector('.display__end-time')
const buttons = document.querySelectorAll('[data-time]')
function timer(seconds){
    
    // clearing previous countdowns
    clearInterval(countdown)

    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);
    countdown = setInterval(()=>{
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if(secondsLeft < 0 ){
            clearInterval(countdown);
            return;
        }
        displayTimeLeft(secondsLeft)
    },1000)
}

function displayTimeLeft(seconds){

    const mins = Math.floor(seconds / 60) ;
    const remainderSeconds = seconds % 60 ;
    const display = `${mins}:${remainderSeconds < 10 ? '0':''}${remainderSeconds}`;
    timerDisplay.textContent = display;

    console.log(mins,remainderSeconds);
}

function displayEndTime(timeStamp){
    const end = new Date(timeStamp);
    const hours = end.getHours();
    const mins = end.getMinutes();
    endTimeDisplay.textContent = `Be back at ${hours >12 ? hours-12 : hour}:${mins < 10? '0':''}${mins}`;
}

function startTimer(){
    console.log(this.dataset.time)
    const seconds = this.dataset.time;
    timer(parseInt(seconds))
}

buttons.forEach(btn=>btn.addEventListener('click',startTimer));
document.customForm.addEventListener('submit',function(e){
    e.preventDefault();
    console.log(this)
    const mins = this.minutes.value;
    console.log(mins)
    timer(parseInt(mins*60))
    this.reset();
})