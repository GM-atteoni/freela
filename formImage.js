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
    if(localStorage.getItem("dimLarg")){
        localStorage.removeItem("dimLarg")
    }
    if(localStorage.getItem("dimAlt")){
        localStorage.removeItem("dimAlt")
    }
    document.getElementById('dimLarg').value = "";
    document.getElementById('dimAlt').value = "";
    readURL(this);
}

function dimensLarg(){
    if(localStorage.getItem("dimLarg")){
        localStorage.removeItem("dimLarg")
    }

    let dimLarg = document.getElementById('dimLarg').value;

    localStorage.setItem("dimLarg", dimLarg);

}
function dimensAlt(){
    if(localStorage.getItem("dimAlt")){
        localStorage.removeItem("dimAlt")
    } 

    let dimAlt = document.getElementById('dimAlt').value;

    localStorage.setItem("dimAlt", dimAlt);

}