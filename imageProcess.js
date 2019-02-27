//Variáveis de cstomização (Padrão Arial, 12)
var fontSize = 12;
var fontName = "Arial";

//Canvas pai
let canvas = document.getElementById('canvasss');
let ctx = canvas.getContext("2d");

//Canvas Filho
let canvasModal = document.getElementById('canvasModal');
let ctxModal = canvasModal.getContext("2d");

//Tamanho do canvas
canvas.width = 600;
canvas.height = 600;

//Pega imagem do local storage
let background = new Image();
background.src = localStorage.getItem("formImage");

background.onload = function () {
    ctx.drawImage(background, 0, 0, 600, 600);
} 

function buildImage(event) {
    let cordX = event.offsetX;
    let cordY = event.offsetY;
    ctx.drawImage(background, 0, 0, 600, 600);

    $('#myModal').modal('show')

    buildImageModal(cordX, cordY);
}

function buildImageModal(cordX, cordY){
    //Limpa o local storage
    localStorage.removeItem("modalCanvasX");
    localStorage.removeItem("modalCanvasY");
    //Limpa o canvas
    ctxModal.clearRect(0, 0, canvas.width, canvas.height);
    //Insere o background
    ctxModal.drawImage(background, 0, 0, 200, 150);

    //Renderiza retângulo
    var cordXModal = cordX/3;
    var cordYModal = cordY/4;

    //Insere no local storage 
    localStorage.setItem("modalCanvasX", cordXModal);
    localStorage.setItem("modalCanvasY", cordYModal);
    ctxModal.strokeRect(cordXModal, cordYModal, 25, (this.fontSize/4));
}

function modalClick(event){
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
    ctxModal.strokeRect(mouseX, mouseY, 25, (this.fontSize/4));

    //Insere no local storage 
    localStorage.setItem("modalCanvasX", mouseX);
    localStorage.setItem("modalCanvasY", mouseY);

}

function salvarModal(){
    //Desenha no canvas pai 
        //Pega no local storage
        var recoverX = localStorage.getItem("modalCanvasX");
        var recoverY = localStorage.getItem("modalCanvasY");

        //Desenha
        ctx.strokeRect(recoverX * 3, recoverY * 4, 100, (this.fontSize));

    $('#myModal').modal('hide');
}

function cancelarModal(){
    //Limpa o local storage
    localStorage.removeItem("modalCanvasX");
    localStorage.removeItem("modalCanvasY");
    $('#myModal').modal('hide');
}

function setSize(event){
    this.fontSize = event.target.value;
    console.log(this.fontSize);
}

function setFont(event){
    this.fontName = event.target.value;
    console.log(this.fontName);
}


