function onImageLoad(img) {
  const func = function(e) {
    img.style.opacity = "1";
    img.removeEventListener("load", func);
  };
  return func;
}

function loadImages() {
  const imgs = document.getElementsByTagName("img");

  Array.prototype.forEach.call(imgs, img => {
    img.style.opacity = "0";
    img.style.transition = "opacity 0.2s";

    if (img.naturalHeight > 0 || img.naturalWidth > 0) {
      setTimeout(onImageLoad(img), 0);
    } else {
      img.addEventListener("load", onImageLoad(img));
    }
  });
}

export default loadImages;