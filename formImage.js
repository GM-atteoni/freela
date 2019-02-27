function readURL(input) {
    let reader = new FileReader();

    reader.onload = function (e) {
        document.getElementById('imgPreview').src = e.target.result;
        localStorage.setItem("formImage", e.target.result);
    }

    reader.readAsDataURL(document.getElementById('file').files[0]);

    document.getElementById('imgPreview').hidden = false;

}

function preview() {
    if(localStorage.getItem("formImage")){
        localStorage.removeItem("formImage");
    }
    readURL(this);
}