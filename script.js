
var container = document.getElementById('container');
var draw = document.getElementById('draw');
var log = document.getElementsByClassName('log')[0];
var scss,css;
var interval;
var eventWindow;
var checkbox = document.getElementById('dynamicDrawing');
var checkboxResult;
var dynamicStyle;
var width,height;
var drawColor = 'black';
var varName;
var dynamicArray = [];
var drawArray = [];
var mouseHoldUndo,mouseHoldDraw;
var undoInterval;




container.addEventListener('mousedown',(e) =>{
    drawBoxShadow(e.offsetX,e.offsetY);
    mouseHoldDraw = true;
    setTimeout(() => {
        if(mouseHoldDraw){
            interval = setInterval(holdDraw, 10);    
        }
    }, 1000);
    
});
window.addEventListener('mouseup', function() {
    clearInterval(interval);
    clearInterval(undoInterval);
    mouseHoldUndo = false;
    mouseHoldDraw = false;
});
container.addEventListener('mousemove',()=>{ //reset the event object on move 
    eventWindow = event || window.event;
})
checkbox.addEventListener( 'change', function() {
    if(this.checked) {
        document.getElementsByClassName('checkboxChoise')[0].style.display = "inline-block";
    } else {
        document.getElementsByClassName('checkboxChoise')[0].style.display = "none";
    }
});
document.getElementById('undoButton').addEventListener('mousedown',()=>{
    undoDraw();
    mouseHoldUndo = true;
    setTimeout(() => {
        if(mouseHoldUndo){
            undoInterval = setInterval(undoDraw, 20);    
        }
    }, 2000);
})

function colorChange(){
    drawColor = document.getElementById('draw-color').value;
}

function copyBoxShadow(){
    var input = document.createElement('textarea');
    input.innerHTML = log.innerHTML;
    document.body.appendChild(input);
    input.select();
    var result = document.execCommand('copy');
    document.body.removeChild(input);
    alert('Box-shadow property is coppied to clipboard!')
    return result;
}

function createContainer(e){
    e = event || window.event;
    e.preventDefault();
    height = document.getElementById('input-height').value;
    width = document.getElementById('input-width').value;
    varName = document.getElementById('input-name').value;
    scss = document.getElementById('scssVar').checked;
    css = document.getElementById('cssVar').checked;
    container.style.width = width + 'px';
    container.style.height = height + 'px';
    container.style.display = 'block';

    log.innerHTML = 'box-shadow: ';
    draw.style.boxShadow = '';
    drawArray = [];
    dynamicArray = [];
    checkboxResult = checkbox.checked;
    if(css && !scss){
        dynamicStyle = 'css';
    }else if(!css && scss){
        dynamicStyle = 'scss';
    }
    clearInterval(interval);
}

//undo last draw

function undoDraw(){
    console.log('asdjoiajsdoijaosijd')
    drawArray.pop();
    draw.style.boxShadow = '';
    log.innerHTML = 'box-shadow: ';
    drawArray.forEach(pixel => {
        draw.style.boxShadow += pixel;
        log.innerHTML += pixel;
    })
    dynamicArray.pop();
    if(checkboxResult){
        log.innerHTML = '';
        dynamicArray.forEach(pixel =>{
            log.innerHTML += pixel;
        })
    }
}

// add box shadows on hold 
var oldX,oldY;
function holdDraw(){
    var e = eventWindow;
    if(oldX != e.offsetX || oldY != e.offsetY){
        drawBoxShadow(e.offsetX,e.offsetY);
    }
    oldX = e.offsetX;
    oldY = e.offsetY;
}

//draw the box-shadow particle
function drawBoxShadow(X,Y){
    if(draw.style.boxShadow != ''){
        draw.style.boxShadow += ',' + X+'px '+Y+'px ' + drawColor;
        drawArray.push(',' + X+'px '+ Y+'px ' + drawColor);
    }else{
        draw.style.boxShadow = X+'px '+ Y +'px ' + drawColor;
        drawArray.push(X+'px '+ Y +'px ' + drawColor);
    }
    log.innerHTML = 'box-shadow: ';
    drawArray.forEach(pixel => {
        log.innerHTML += pixel;
    })
   
    if(checkboxResult){
        if(dynamicStyle == 'scss'){
            var expression = 'calc(#{$'+varName+'}*';
        }else{
            var expression = 'calc(var(--'+varName+')*';
        }
        if(dynamicArray.length > 0){            
            dynamicArray.push(',' + expression + (X/width)+') '+expression + (Y/height)+') '+ drawColor);
        }else{
            dynamicArray.push(expression + (X/width)+') '+expression + (Y/height)+') '+ drawColor);
        }

        log.innerHTML = 'box-shadow: ';
        dynamicArray.forEach(pixel =>{
            log.innerHTML += pixel;
        })
    }
}