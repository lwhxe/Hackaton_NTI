const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const img = new Image();

img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);

    const x = 100;
    const y = 50;
    
    ctx.fillStyle = 'red';
    ctx.fillRect(x, y, 1, 1);

    const newDataUrl = canvas.toDataURL('image/jpeg');
    console.log("Image processed");
};

img.src = 'input.jpg';
