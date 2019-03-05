var video;
var box,bar,all,p;

window.onload=function() {
    //video = document.getElementById("video1");
}

function isFirst() {
    video = document.getElementById("video1");
    video.play(); 

}

function isSecond() {
    video = document.getElementById("audio1");
    video.play();
}

function play() {
    video.play();
}
function pause() {
    video.pause();
}
function stop() {
    video.pause();
    video.currentTime = 0;
}
function speedUp() {
    video.play();
    video.playbackRate = 2;
}

function normalSpeed() {
    video.play();
    video.playbackRate = 1;
}

function slowDown() {
    video.play();
    video.playbackRate = 0.5;
}

function backward() {
    if(video.currentTime<=10) {
        video.currentTime = 0;
    }else{
        video.currentTime -= 10;
    }
}
function forward() {
    if(video.currentTime<video.seekable.end(0)-10) {
        video.currentTime += 10;
    }else{
        video.currentTime = video.seekable.end(0);
    }
}

// 播放器进度条
function progressUpdate() {
    // 动态设置蓝色的positionBar,从0到100%
    let positionBar = document.getElementById("positionBar");
    positionBar.style.width = (video.currentTime / video.duration * 100) + "%";

    // 显示已经播放的秒数，保留两位小数
    displayStatus.innerHTML = (Math.round(video.currentTime*100)/100) + 
        "s/" + (Math.round(video.duration*100)/100) + "s";
}

// 下载进度条
function progressDownload() {
    // 动态设置灰色的positionBar,从0到100%
    let downloadBar = document.getElementById("downloadBar");
    downloadBar.style.width = (video.buffered.end(0)/video.duration * 100) + "%";
}

