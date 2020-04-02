//  getting elements

const player = document.querySelector(".player");
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


// build functions 

function togglePlay(){
    if(video.paused){
        video.play();
    }else{
        video.pause();
    }
}

function updateButton(){
    const icon = this.paused ? '|>':'||';
    toggle.textContent= icon;
}

function skip(){
    console.log(this.dataset)
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
    console.log(this.value)
    console.log(this.name)
    video[this.name] = this.value;
}


function handleProgress(){
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

// hook up the events

video.addEventListener('click',togglePlay);
video.addEventListener('play',updateButton);
video.addEventListener('pause',updateButton);
skipButtons.forEach(btn=>{
    btn.addEventListener('click',skip);
})
toggle.addEventListener('click',togglePlay);
ranges.forEach(range=>{
    range.addEventListener('change',handleRangeUpdate)
})
video.addEventListener('timeupdate',handleProgress);
progress.addEventListener('click',scrub);
let mousedown = false;
progress.addEventListener('mousemove',(e)=> mousedown && scrub(e));
progress.addEventListener('mousedown',()=>mousedown = true);
progress.addEventListener('mouseup',()=>mousedown = false);

