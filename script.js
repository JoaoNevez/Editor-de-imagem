const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let img = new Image();

const controls = {
  brightness: document.getElementById("brightness"),
  contrast: document.getElementById("contrast"),
  saturate: document.getElementById("saturate"),
  blur: document.getElementById("blur"),
};

document.getElementById("upload").addEventListener("change", e => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = function(event) {
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
});

img.onload = function() {
  canvas.width = img.width;
  canvas.height = img.height;
  drawImage();
};

Object.values(controls).forEach(ctrl => {
  ctrl.addEventListener("input", drawImage);
});

function drawImage() {
  ctx.filter = `
    brightness(${controls.brightness.value}%)
    contrast(${controls.contrast.value}%)
    saturate(${controls.saturate.value}%)
    blur(${controls.blur.value}px)
  `;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

document.getElementById("download").addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "imagem-editada.png";
  link.href = canvas.toDataURL();
  link.click();
});
