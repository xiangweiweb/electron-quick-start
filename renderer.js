// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const fs = require('fs');
const path = require('path');

window.onload = function(){
    let filePath = path.join('.', 'images', 'amyli.jpg');
    let staff = {
        name: '李向维',
        nick: 'Amy Li',
        nameEn: 'amyli',
        code: 'test123'
    }
    try {
        drawImage(filePath, staff);
    } catch (error) {
        console.log(error);
    }
    
}

function drawImage(filePath, staff){
    let canvas = document.getElementById('card');
    // let canvas = document.createElement('canvas');
    canvas.height = 1010;
    canvas.width = 638;
    let ctx = canvas.getContext('2d');

    // 头像
    let img = new Image();
    img.src = filePath;
    img.onload = function(){
        //400-914 图片高 621
        ctx.drawImage(img, 0, 94, 638, 621); //坐标原点 头像照片；45
        // 顶部白色
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 638, 94);
        // 底部蓝色
        ctx.fillStyle = '#0052d9';
        ctx.fillRect(0, 715, 638, 295);//295

        // 文字
        ctx.textBaseline = 'top';
        ctx.font = "27px AdobeHeitiStd-Regular";
        ctx.fillStyle = "black";
        ctx.fillText( 'NO.' + staff.code, 49, 50); //53 
    
        ctx.fillStyle = 'white';
        
        ctx.font = '67px Myriad Pro Regular';
        ctx.fillText(staff.nick, 46, 747); //756

        ctx.font = '42px lanLantinghei SC';
        ctx.fillText(staff.name, 46, 826); //831

        // logo
        let logo = new Image();
        logo.src = './logo.svg';
        logo.onload = function(){
            ctx.drawImage(logo, 425, 912); //912 425
            // 两张图片都画好后，转成图片
            try {
                let data = convertCanvasToImage(canvas);
                let filePath = path.join('.', 'generate', staff.code + '.jpg');
                writeImg(data, filePath);
            } catch (error) {
                console.log(error);
            }
        };
    }
}




function convertCanvasToImage(canvas){
    var img = new Image();
    img.src = canvas.toDataURL('image/jpeg');
    return img.src;
}

function writeImg(data, filePath){
    let base64 = data.replace(/^data:image\/\w+;base64,/, '');
    let buffer =  new Buffer(base64, 'base64');
    // 写入图片
    fs.writeFileSync(filePath, buffer);
}
