//Variáveis de customização (Padrão Arial, 12)
var fontSize = 12;
var fontName = "Arial";
var textVal;
var dimLarg = localStorage.getItem("dimLarg");
var dimAlt = localStorage.getItem("dimAlt");

//Canvas pai
let canvas = document.getElementById('canvasss');
let ctx = canvas.getContext("2d");

//Canvas Filho
let canvasModal = document.getElementById('canvasModal');
let ctxModal = canvasModal.getContext("2d");

//Proporções
var propAlt = dimAlt/150;
var propLarg = dimLarg/200;

//Tamanho do canvas
canvas.width = dimLarg;
canvas.height = dimAlt;

//Pega imagem do local storage
let background = new Image();
background.src = localStorage.getItem("formImage");

background.onload = function () {
    ctx.drawImage(background, 0, 0, dimLarg, dimAlt);
}

function buildImage(event) {
    let cordX = event.offsetX;
    let cordY = event.offsetY;
    ctx.drawImage(background, 0, 0, dimLarg, dimAlt);

    $('#myModal').modal('show')

    buildImageModal(cordX, cordY);
}

function buildImageModal(cordX, cordY) {
    //Limpa o local storage
    localStorage.removeItem("modalCanvasX");
    localStorage.removeItem("modalCanvasY");
    //Limpa o canvas
    ctxModal.clearRect(0, 0, canvas.width, canvas.height);
    //Insere o background
    ctxModal.drawImage(background, 0, 0, 200, 150);

    //Renderiza retângulo
    var cordXModal = cordX / this.propLarg;
    var cordYModal = cordY / this.propAlt;

    //Insere no local storage 
    localStorage.setItem("modalCanvasX", cordXModal);
    localStorage.setItem("modalCanvasY", cordYModal);
    ctxModal.strokeRect(cordXModal, cordYModal, 0.5, (this.fontSize / 4));
}

function modalClick(event) {
    let mouseX;
    let mouseY;

    // Encontra o mouse
    mouseX = event.offsetX;
    mouseY = event.offsetY;

    //Limpa o local storage
    localStorage.removeItem("modalCanvasX");
    localStorage.removeItem("modalCanvasY");

    //Limpa o canvas
    ctxModal.clearRect(0, 0, canvas.width, canvas.height);

    //Insere o background
    ctxModal.drawImage(background, 0, 0, 200, 150);

    //Redesenha
    ctxModal.strokeRect(mouseX, mouseY, 0.5, (this.fontSize / 4));

    //Insere no local storage 
    localStorage.setItem("modalCanvasX", mouseX);
    localStorage.setItem("modalCanvasY", mouseY);

}

function salvarModal() {
    //Desenha no canvas pai 
        //Pega no local storage
        var recoverX = localStorage.getItem("modalCanvasX");
        var recoverY = localStorage.getItem("modalCanvasY");

        //Altera textVal
        this.textVal = document.getElementById('textVal').value;

        //Desenha
        ctx.font = `${this.fontSize}px ${this.fontName}`;
        ctx.fillText(this.textVal, recoverX * this.propLarg, parseInt(recoverY) * this.propAlt + (parseInt(this.fontSize) - parseInt(this.fontSize)*0.23));
        
    $('#myModal').modal('hide');
}

function cancelarModal() {
    //Limpa o local storage
    localStorage.removeItem("modalCanvasX");
    localStorage.removeItem("modalCanvasY");
    $('#myModal').modal('hide');
}

function setSize(event) {
    //Altera fontSize
    this.fontSize = event.target.value;

    //Limpa o canvas
    ctxModal.clearRect(0, 0, canvas.width, canvas.height);
    //Insere o background
    ctxModal.drawImage(background, 0, 0, 200, 150);

    //Pega local storage
    let recoverX = localStorage.getItem("modalCanvasX");
    let recoverY = localStorage.getItem("modalCanvasY");

    //Redesenha com tamanho alterado
    ctxModal.strokeRect(recoverX, recoverY, 0.5, (this.fontSize / 4));
}

function setFont(event) {
    this.fontName = event.target.value;
}


