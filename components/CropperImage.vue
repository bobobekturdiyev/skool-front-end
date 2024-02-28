<template>
    <div>
        <input type="file" name="image" id="image" @change="readURL" />

        <div class="image_container">
            <img id="blah" :src="url" alt="your image" />
        </div>

        <!-- // Cropped image to display (only if u want) -->
        <div id="cropped_result"></div>
        <!-- // Will trigger crop event -->
        <button id="crop_button">Crop</button>
    </div>
</template>

<script setup>
import VueCropper from 'vue-cropperjs';
const url =ref("#");
function readURL(e) {
    const input = e.target;
    console.log(input)
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        console.log(e.target.result)
        reader.onload = function (e) {
            url.value = e.target.result;
            // document.getElementById('blah').attr('src', e.target.result)
        };
        reader.readAsDataURL(input.files[0]);
        setTimeout(initCropper, 1000);
    }
}
function initCropper() {
    console.log("Came here")
    var image = document.getElementById('blah');
    var cropper = new Cropper(image, {
        aspectRatio: 16 / 9,
        crop: function (e) {
            console.log(e.detail.x);
            console.log(e.detail.y);
        }
    });

    // On crop button clicked
    document.getElementById('crop_button').addEventListener('click', function () {
        var imgurl = cropper.getCroppedCanvas().toDataURL();
        var img = document.createElement("img");
        img.src = imgurl;
        document.getElementById("cropped_result").appendChild(img);

        /* ---------------- SEND IMAGE TO THE SERVER-------------------------
    
                    cropper.getCroppedCanvas().toBlob(function (blob) {
                          var formData = new FormData();
                          formData.append('croppedImage', blob);
                          // Use `jQuery.ajax` method
                          $.ajax('/path/to/upload', {
                            method: "POST",
                            data: formData,
                            processData: false,
                            contentType: false,
                            success: function () {
                              console.log('Upload success');
                            },
                            error: function () {
                              console.log('Upload error');
                            }
                          });
                    });
                ----------------------------------------------------*/
    })
}
</script>

<style lang="scss" scoped>
.image_container {
    max-width: 800px;
    max-height: 450px;
}
</style>