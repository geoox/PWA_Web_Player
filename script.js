document.getElementById("screenshot-text").innerHTML = localStorage.getItem('lastScreenshotDate');
document.getElementById("video-played-text").innerHTML = localStorage.getItem('lastVideoPlayedDate');

//canvas buttons draw

const play = document.getElementById('play-btn').getContext('2d');
const pause = document.getElementById('pause-btn').getContext('2d');
const previous = document.getElementById('prev-btn').getContext('2d');
const next = document.getElementById('next-btn').getContext('2d');

const playDim = play.width;
play.moveTo(0,0);
play.lineTo(20,10);
play.lineTo(0,20);
play.lineTo(0,0);
play.stroke();
play.fill();
	
const pauseDim = pause.width;
pause.moveTo(7,0);
pause.lineTo(7,20);
pause.lineTo(9,20);
pause.lineTo(9,0);
pause.lineTo(7,0);
pause.stroke();
pause.fill();

pause.moveTo(13,0);
pause.lineTo(13,20);
pause.lineTo(15,20);
pause.lineTo(15,0);
pause.lineTo(13,0);
pause.stroke();
pause.fill();
	
const prevDim = previous.width;
previous.moveTo(20,0);
previous.lineTo(0,10);
previous.lineTo(20,20);
previous.stroke();
	
const nextDim = next.width;
next.moveTo(0,0);
next.lineTo(20,10);
next.lineTo(0,20)
next.stroke();

//canvas buttons functionality
play.canvas.addEventListener('mousedown', (event)=>{
    player.play();
})

pause.canvas.addEventListener('mousedown', (event)=>{
    player.pause();
})

next.canvas.addEventListener('mousedown', (event)=>{
    count++;
    count = count % 3;
    localStorage.setItem('count',count);
    playVideo(count);
})

previous.canvas.addEventListener('mousedown', (event)=>{
    count--;
    if(count < 0){
        count = 0;
    }
    count = count % 3;
    localStorage.setItem('count',count);
    playVideo(count);
})


//see if count exists in localstorage

if(localStorage.getItem('count') == null){
    count = 0;//defined as a global variable so we can count which video plays even after manually choosing other video
}
else{
    count = localStorage.getItem('count');
}

//play next video after current one finishes

localStorage.setItem('count',count);//set count to be remembered on localStorage
var player = document.getElementById('video-player');
var mp4Vid = document.getElementById('mp4-source');
player.addEventListener('ended', endHandler, false);

function endHandler()
{
   count++;
   count = count % 3; //there are 3 videos
   localStorage.setItem('count',count);
   $(mp4Vid).attr('src', "media/video"+count+".mp4");
   //remove active class from list
   document.getElementsByClassName('active')[0].classList.remove('active');
   //add active class to the required element
   if(count == 0){
        document.getElementById('basketball-player').classList.add('active');
   }
   if(count == 1){
        document.getElementById('balloon-car').classList.add('active');
   }
   if(count == 2){
        document.getElementById('chasing-car').classList.add('active');
   }
   player.load();
   player.play();
   document.getElementById("video-played-text").innerHTML = localStorage.getItem('lastVideoPlayedDate');
}

function playVideo(index){
    var player = document.getElementById('video-player');
    var mp4Vid = document.getElementById('mp4-source');
    $(mp4Vid).attr('src', "media/video"+index+".mp4");

    //remove active class from list
    document.getElementsByClassName('active')[0].classList.remove('active');
    //add active class to the required element
    if(index == 0){
        document.getElementById('basketball-player').classList.add('active');
        count = 0;
        localStorage.setItem('count',count);
    }
    if(index == 1){
        document.getElementById('balloon-car').classList.add('active');
        count = 1;
        localStorage.setItem('count',count);
    }
    if(index == 2){
        document.getElementById('chasing-car').classList.add('active');
        count = 2;
        localStorage.setItem('count',count);
    }
    player.load();
    localStorage.setItem('lastVideoPlayedDate',new Date());
    player.play();

    //show local storage in html
    document.getElementById("video-played-text").innerHTML = localStorage.getItem('lastVideoPlayedDate');
}

//screenshot btn event listener
let canvasScreenshot = document.getElementById('canvas-screenshot');
let context = canvasScreenshot.getContext('2d');
document.getElementById('screenshot-btn').addEventListener('click', () => {
    canvasScreenshot.width = player.clientWidth;
    canvasScreenshot.height = player.clientHeight;
    localStorage.setItem('lastScreenshotDate',new Date());
    context.drawImage(player,0,0,canvasScreenshot.width, canvasScreenshot.height);

    //show local storage in html
    document.getElementById("screenshot-text").innerHTML = localStorage.getItem('lastScreenshotDate');
})

currentEffect = 'normal';

document.getElementById('grayscale-effect').addEventListener('click', ()=>{
    currentEffect = 'grayscale';
    effect();
})

document.getElementById('normal-effect').addEventListener('click', ()=>{
    currentEffect = 'normal';
    effect();
})

document.getElementById('invert-effect').addEventListener('click', ()=>{
    currentEffect = 'invert';
    effect();
})

let canvasEffects = document.getElementById('canvas-effect');
let contextEffects = canvasEffects.getContext('2d');

function effect(){
    contextEffects.drawImage(player, 0, 0, player.width, player.height);

    let imageData = contextEffects.getImageData(0, 0, player.clientWidth, player.clientHeight);
    let data = imageData.data;

    switch(currentEffect){
        case 'normal':
            break;

        case 'grayscale':
            for (let i = 0; i < data.length; i+=4){
                data[i] = data[i + 1] = data[i + 2] = 
                Math.round((data[i] + data [i + 1] + data[i + 2]) / 3)
            }
            contextEffects.putImageData(imageData, 0, 0);
            break;

        case 'invert':
            for (var i = 0; i < data.length; i+= 4) {
                data[i] = data[i] ^ 255; // Invert Red
                data[i+1] = data[i+1] ^ 255; // Invert Green
                data[i+2] = data[i+2] ^ 255; // Invert Blue
            }
            contextEffects.putImageData(imageData, 0, 0);
            break;
    }

    requestAnimationFrame(effect);
}
requestAnimationFrame(effect);

