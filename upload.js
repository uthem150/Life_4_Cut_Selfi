function uploadImage(number) {
  const imageContainer = document.querySelector(`#image${number}`);

  let input = imageContainer.querySelector("input[type=file]");
  if (!input) {
    input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.style.display = "none";
    imageContainer.appendChild(input);
  }

  input.onchange = function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function () {
      const image = document.createElement("img");
      image.src = reader.result;
      image.classList.add("uploaded-image");
      image.style.width = "100%";
      imageContainer.style.overflow = "hidden";
      const existingImage = imageContainer.querySelector("img.uploaded-image");
      if (existingImage) {
        existingImage.remove();
      }
      imageContainer.appendChild(image);

      // 'karina.png' 이미지 추가
      const overlayImage = new Image();
      overlayImage.src = `karina_selfi_${number}.png`;
      overlayImage.classList.add("overlay-image");
      overlayImage.style.position = "absolute";
      overlayImage.style.top = "0";
      overlayImage.style.right = "0"; // 오른쪽에 배치
      overlayImage.style.height = "200px"; // 높이를 200px로 설정
      overlayImage.style.objectFit = "contain"; // 이미지가 잘리지 않도록 설정

      imageContainer.appendChild(overlayImage);

      // 업로드 후에 창을 닫음
      input.value = null;
    };
    reader.readAsDataURL(file);
  };

  input.click();
}

// 이미지 삭제 기능
function deleteImage(number) {
  const image = document.querySelector(`#image${number} img.uploaded-image`);
  if (image) {
    image.remove();
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = function (event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = function () {
        image.src = reader.result;
      };
      reader.readAsDataURL(file);
    };
    document.querySelector(`#image${number}`).appendChild(input);
  }
}
