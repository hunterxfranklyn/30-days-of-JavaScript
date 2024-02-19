const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');


function getvideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(localMediaStorage => {
            video.srcObject = localMediaStorage;
            video.play();
        })
        .catch(err => {
            console.error('Permission to Camera is needed', err);
        })
}

function moveToCanvas() {
    const height = video.videoHeight;
    const width = video.videoWidth;
    canvas.height = height;
    canvas.width = width;

    return setInterval(() => {
       ctx.drawImage(video, 0, 0, width, height); 

        let pixels = ctx.getImageData(0, 0, width, height);

        // pixels = redOverlay(pixels);

        // pixels = stripIt(pixels);
        // ctx.globalAlpha = 0.1;

        ctx.putImageData(pixels, 0, 0)
    }, 16)
}

function takePhoto() {
    snap.currentTime = 0;
    snap.play();

    let data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('Download', 'Handsome');
    link.innerHTML = `<img src="${data}" alt = "Ewo">`;
    strip.insertBefore(link, strip.firstChild)
}

function redOverlay(pixels) {
    for(let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i + 0] = pixels.data[i + 0] + 200;
        pixels.data[i + 1] = pixels.data[i + 1] - 50;
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5; 
    }
    return pixels
}

function stripIt(pixels) {
    for(let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i + 500] = pixels.data[i + 0];
        pixels.data[i - 550] = pixels.data[i + 1];
        pixels.data[i + 450] = pixels.data[i + 2]; 
    }
    return pixels
}

function greenScreen(pixels) {
    const levels = {};
  
    document.querySelectorAll('.rgb input').forEach((input) => {
      levels[input.name] = input.value;
    });
  
    for (i = 0; i < pixels.data.length; i = i + 4) {
      red = pixels.data[i + 0];
      green = pixels.data[i + 1];
      blue = pixels.data[i + 2];
      alpha = pixels.data[i + 3];
  
      if (red >= levels.rmin
        && green >= levels.gmin
        && blue >= levels.bmin
        && red <= levels.rmax
        && green <= levels.gmax
        && blue <= levels.bmax) {
        // take it out!
        pixels.data[i + 3] = 0;
      }
    }
  
    return pixels;
  }

getvideo();

video.addEventListener('canplay', moveToCanvas)