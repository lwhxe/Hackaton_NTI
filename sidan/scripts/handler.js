function drawGradientSpot(ctx, x, y, radius, r, g, b) {
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);

    gradient.addColorStop(0.0, `rgba(${r}, ${g}, ${b}, 1.0)`);
    gradient.addColorStop(1.0, `rgba(${r}, ${g}, ${b}, 0.0)`);

    ctx.fillStyle = gradient;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
}

function spawnModifiedImage() {
    if (document.getElementById('data-input').value === "") {
        return;
    }

    const imageUrl = 'https://raw.githubusercontent.com/lwhxe/Hackaton_NTI/refs/heads/main/sidan/map.png'; 
    const red = 'red';
    const yellow = 'yellow';

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.crossOrigin = "Anonymous";

    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;

        ctx.globalAlpha = 0.5; 
        ctx.drawImage(img, 0, 0);
        ctx.globalAlpha = 1.0;

        ctx.fillStyle = red;
        drawGradientSpot(ctx, 146, 85, 30, 255, 0, 0);
        ctx.fillStyle = yellow;
        drawGradientSpot(ctx, 670, 265, 30, 255, 255, 0);

        try {
            const newDataUrl = canvas.toDataURL('image/jpeg');

            const resultImg = new Image();
            resultImg.src = newDataUrl;

            const container = document.getElementById('result-container');
            container.innerHTML = ''; 
            container.appendChild(resultImg);

            console.log("New image spawned successfully!");

            const outputBox = document.getElementById('output-text');
            outputBox.innerHTML = `{ \"statistic\" : { \"x\" : 146, \"y\" : 85 } , \"ai\" : { \"x\" : 670, \"y\" : 265 } }`;
        } catch (error) {
            console.error("Security Error: The image source does not allow CORS manipulation.", error);
            alert("Error: The image source blocked the export. Use a local server or a CORS-friendly image host.");
        }
    };

    img.onerror = () => {
        console.error("Could not load image from URL");
    };

    img.src = imageUrl;
}
