// loading
// let images = ['fan', 'player', 'trumpet'];
let fan = document.querySelectorAll('.fan');
let index_img = 0;
function change() {
    if (index_img == 6) {
        index_img = 0;
    } else {
        index_img++;
    }
    for (let i = 0; i < fan.length; i++) {
        fan[i].style.display = 'none';
    }
    fan[index_img].style.display = 'block';
}
let loading = setInterval(change, 900);
// 加载完成切换页面
let confirm = document.querySelector('.confirm');
confirm.addEventListener('click', function() {
    document.querySelector('.loadingDiv').style.display = 'none';
    document.querySelector('.transitionDiv').style.display = 'block';
    clearInterval(loading);
    moveDisc();
});

// transition
let info = document.querySelector('.info');
let returnImg = document.querySelector('.return');

function hideInfo() {
    returnImg.style.width = '14vw';
    returnImg.style.top = '145vw';
    returnImg.style.right = '4vw';
    setTimeout(() => { 
        returnImg.style.width = '11vw';
        returnImg.style.top = '146.5vw';
        returnImg.style.right = '5.5vw';       
        info.style.display = 'none';
        document.querySelector('.info').style.display = 'none';
    }, 250)
}

function viewDesc(type) {
    let currTap = document.querySelector('.' + type);
    let btns = document.getElementsByClassName('btn_img');
    let descs = document.getElementsByClassName('info_desc');
    for(let i = 0; i < btns.length; i++) {
        btns[i].style.visibility = 'hidden';
        descs[i].style.display = 'none';
    }
    currTap.style.visibility = 'visible';
    setTimeout(() => {
        document.querySelector('.info').style.display = 'block';
        document.querySelector('.' + type + '_info').style.display = 'block';
    },200)
}

// let button = document.querySelector('.button');
// button.addEventListener('click', function (e) {
//     let buttons = button.querySelectorAll('img');
//     let info = document.querySelector('.info');
//     let infos = info.querySelectorAll('img');
//     var e = e || window.event;
//     let dom = e.srcElement || e.target;
//     if (dom.nodeName.toLowerCase() == 'img') {
//         let cls = dom.getAttribute('class');
//         let index = dom.getAttribute('data-index');
//         if (cls.indexOf('toBig') > -1) {
//             // 连续点击同个按钮
//             dom.classList.remove('toBig');
//             infos[index].style.display = 'none';
//         } else {
//             // 切换不同按钮
//             for (let i = 0; i < buttons.length; i++) {
//                 buttons[i].classList.remove('toBig');
//                 infos[i].style.display = 'none';
//             }
//             dom.classList.add('toBig');
//             infos[index].style.display = 'block';
//         }
//     }
// });


// 浏览器无法自动播放过度音乐时特殊处理
function playTransitionAudio(){
    console.log('add play1')
    document.getElementsByClassName('transitionDiv')[0].addEventListener('touchstart',play)
}

function play(){
    console.log('play1')
    transition_audio.play();
    document.getElementsByClassName('transitionDiv')[0].removeEventListener('touchstart',play)
}

// 移动磁盘
function moveDisc() {
    
    let btnEle = document.querySelector('.disc');
    let name_img = document.querySelector('.name_img');
    let target_y = parseInt(document.body.offsetWidth / 1.06);
    var flag, cur, nx, ny, dx, dy, dw, dh, x, y;
    console.log()
    dw = btnEle.clientWidth || btnEle.offsetWidth;
    console.log('dw'+dw)
    dh = btnEle.offsetHeight;
    flag = false;
    cur = { x: 0, y: 0 };
    function down() {
        var touch = event.touches[0];
        flag = true;
        cur.x = touch.clientX;
        cur.y = touch.clientY;
        dx = btnEle.offsetLeft;
        dy = btnEle.offsetTop;
        btnEle.offsetWidth = dw;
        btnEle.offsetHeight = dh;
    }
    function move() {
        if (flag) {
            var touch = event.touches[0];
            nx = touch.clientX - cur.x;
            ny = touch.clientY - cur.y;
            x = dx + nx;
            y = dy + ny;
            if (Math.abs(nx)) {
                event.preventDefault();
            }
            if (x <= 0) {
                x = 0;
            } else if (x >= btnEle.parentNode.offsetWidth - btnEle.offsetWidth) {
                x = btnEle.parentNode.offsetWidth - btnEle.offsetWidth;
            } else {
                x = x;
            }

            if (y <= 0) {
                y = 0;
            } else if (y >= btnEle.parentNode.offsetHeight - btnEle.offsetHeight) {
                y = btnEle.parentNode.offsetHeight - btnEle.offsetHeight;
            } else {
                y = y;
            }
            let otop1 = btnEle.offsetTop;
            if (otop1 < target_y) {
                btnEle.style.backgroundPosition = `center -${(target_y - y) * 2}px`
                if (((target_y - y) * 11) > dw) {
                    transition_audio.pause();
                    transition_audio.currentTime = 0;
                    document.querySelector('.transitionDiv').style.display = 'none';
                    document.querySelector('.mainDiv').style.display = 'block';
                    haddleMove();
                    return false
                }
            } else {
                console.log(dw)
                console.log(dy)
                console.log(y)
                btnEle.style.top = y + "px";
                btnEle.style.width = (dw - ((dy - y) * 0.48)) + 'px'
                // let top1 = btnEle.offsetWidth * 0.22
                let top = (y - dy)/4
                name_img.style.top = top + 'px'
            }

        }
    }
    function end() {
        dw = btnEle.offsetWidth;
        dh = btnEle.offsetHeight;
        flag = false;
    }
    btnEle.addEventListener("touchstart", function () {
        down();
    }, false);
    btnEle.addEventListener("touchmove", function (e) {
        e.stopPropagation()
        e.preventDefault()
        move();
    }, false);
    btnEle.addEventListener("touchend", function () {
        end();
    }, false);
}


// main
let clicks = document.querySelector('.clicks');
let clickIndex = null;
let audios = document.querySelector('.audios');
let audio = document.querySelectorAll('.audio');
let details = document.querySelector('.details');
clicks.addEventListener('click', function (e) {
    var e = e || window.event;
    let dom = e.srcElement || e.target;
    if (dom.nodeName == 'IMG') {
        let index = dom.getAttribute('data-index');
        if(index == 1) { 
            if(audio[1].paused){                        
                audio[index].play();
            }else {
                audio[1].pause();
                audio[1].currentTime = 0;
            }
        }else {
            if(!audio[1].paused) {
                audio[1].pause();
                audio[1].currentTime = 0;
            }
            audio[index].play();
            clickIndex = index;
            details.style.display = 'block';
            document.querySelector('.detail_img' + index).style.display = 'block';
        }
    }
});

document.querySelector('.close_detail').addEventListener('click', function (e) {
    details.style.display = 'none';
    document.querySelector('.detail_img' + clickIndex).style.display = 'none'
    audio[clickIndex].pause();
    audio[clickIndex].currentTime = 0;
});

document.querySelector('.mask').addEventListener('touchmove', function (e) {
    e.stopPropagation();
    e.preventDefault();
})



function haddleMove() {
    var content = document.querySelector(".content");
    // content.style.marginLeft = "0px";
    var contentWidth = content.clientWidth;
    var contentHeight = content.clientHeight;
    var contentWidthEdge    = contentWidth - document.documentElement.clientWidth;
    var contentHeightEdge   = contentHeight - document.documentElement.clientHeight;

    var start   = {x:0,y:0}; //滑动的起始坐标
    var end     = {x:0,y:0}; //滑动停止坐标
    var offset  = {x:0,y:0}; //偏移
    var marginLeft = "0px";
    var marginTop = "0px";

    function startAction(){
        start.x = event.touches[0].clientX;
        start.y = event.touches[0].clientY;
    }

    function movePic(){

        end.x = event.touches[0].clientX;
        end.y = event.touches[0].clientY;

        offset.x = end.x - start.x;
        offset.y = end.y - start.y;

        start.x = end.x;
        start.y = end.y;

        marginLeft = isNaN( parseInt(content.style.marginLeft) ) ? 0 : parseInt(content.style.marginLeft);
        marginLeft = marginLeft + offset.x;
        if(marginLeft > 0 || marginLeft <= -contentWidthEdge){
            
        }else{
            content.style.marginLeft = marginLeft + "px";
        }

        marginTop = isNaN( parseInt(content.style.marginTop) ) ? 0 : parseInt(content.style.marginTop);
        marginTop = marginTop + offset.y;
        if(marginTop > 0 || marginTop <= -contentHeightEdge){
            
        }else{
            content.style.marginTop = marginTop + "px";
        }
    }
    document.addEventListener("touchstart",function(){
        startAction();
    }, { passive: false });
    document.addEventListener("touchmove",function(e){
        e.stopPropagation()
        movePic()
    }, { passive: false });
}

function hideTip(){
    document.querySelector('.mask_tip').style.display = 'none'
}


function resultHome() {
    location.reload();
}

function copyRight() {
    document.querySelector('.mainDiv').style.display = 'none';
    document.querySelector('.resultDiv').style.display = 'block';
}
