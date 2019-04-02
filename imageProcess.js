//Variáveis de customização (Padrão Arial, 12)
var fontSize = 12;
var fontName = "Arial";
var fontColor = "Black";
var textVal;
var dimLarg = localStorage.getItem("dimLarg");
var dimAlt = localStorage.getItem("dimAlt");

//Lista de salvos
var listSalvos = [];

//Canvas pai
let canvas = document.getElementById('canvasss');
let ctx = canvas.getContext("2d");

//Canvas Filho
let canvasModal = document.getElementById('canvasModal');
let ctxModal = canvasModal.getContext("2d");

//Proporções
var propAlt = dimAlt / 150;
var propLarg = dimLarg / 200;

//Tamanho do canvas
canvas.width = dimLarg;
canvas.height = dimAlt;

//Google Fontes
var fontList = [];

//Pega imagem do local storage
var background = new Image();
background.src = localStorage.getItem("formImage");

window.onload = () => {
    if (this.fontList.length == 0) {
        var httpReq = new XMLHttpRequest();
        httpReq.open("GET", "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBi5P2I2QBWT2w79ZS4lhCHzP-rTe7zqBg", false);
        httpReq.send(null);
        this.fontList = JSON.parse(httpReq.response).items;
    }
}

background.onload = function () {
    ctx.drawImage(background, 0, 0, dimLarg, dimAlt);
}

function buildImage(event) {
    let cordX = event.offsetX;
    let cordY = event.offsetY;

    $('#myModal').modal('show')

    var select = document.getElementById('fontUploadFile');
    var option = document.createElement('option');
    option.text = "Selecione";
    select.appendChild(option);
    this.fontList.forEach(font => {
        var option = document.createElement('option');
        option.text = font.family;
        option.value = font.files.regular;
        select.appendChild(option);
    });

    this.fontList = [];

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

    //Verifica se já existe
    if (this.listSalvos.find(salvo => {
        return salvo.nome == document.getElementById('textVal').value;
    })) {
        alert('Campo já existe');
        return false;
    }

    if (document.getElementById('textVal').value == "") {
        alert('Deve preencher campo valor');
        return false;
    }

    if (document.getElementById('fontStandard').checked == false && document.getElementById('fontUpload').checked == false) {
        alert('Deve selecionar fonte');
        return false;
    }

    //Desenha no canvas pai 
    //Pega no local storage
    var recoverX = localStorage.getItem("modalCanvasX");
    var recoverY = localStorage.getItem("modalCanvasY");

    //Altera textVal
    this.textVal = document.getElementById('textVal').value;

    //Desenha
    ctx.font = `${this.fontSize}px ${this.fontName}`;
    ctx.fillStyle = this.fontColor;
    ctx.fillText(this.textVal, recoverX * this.propLarg, parseInt(recoverY) * this.propAlt + (parseInt(this.fontSize) - parseInt(this.fontSize) * 0.23));

    //Salva na lista de salvos
    this.listSalvos.push({
        'nome': this.textVal,
        'cordX': recoverX * this.propLarg,
        'cordY': recoverY * this.propAlt,
        'resLarg': this.dimLarg,
        'resAlt': this.dimAlt,
        'fontName': this.fontName,
        'fontSize': this.fontSize,
        'fontColor': this.fontColor
    });

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

function limpaPai() {
    //Limpa lista
    this.listSalvos = [];

    //Limpa canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //Reconstroi
    ctx.drawImage(background, 0, 0, dimLarg, dimAlt);
}

function limpaUm() {
    if (document.getElementById('nomeRemov').value == "") {
        alert('Escolha o nome do campo');
        return false;
    } else {
        //Pega o nome digitado
        var nomeRemov = document.getElementById('nomeRemov').value;
        //Verifica se existe no array
        if (this.listSalvos.find(salvo => {
            return salvo.nome == nomeRemov
        }) == undefined) {
            alert('Nome não existente na imagem');
            return false;
        }
        //Caso exista 
        //Limpa da lista
        this.listSalvos = this.listSalvos.filter(salvo => {
            return salvo.nome !== nomeRemov;
        });

        //Limpa pai
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        //Reconstrói pai
        ctx.drawImage(background, 0, 0, dimLarg, dimAlt);

        //Escreve nomes sem o excluído
        this.listSalvos.forEach(salvo => {
            ctx.font = `${salvo.fontSize}px ${salvo.fontName}`;
            ctx.fillStyle = salvo.fontColor;
            ctx.fillText(salvo.nome, salvo.cordX, parseInt(salvo.cordY) + parseInt(salvo.fontSize) * 0.77);

        });
    }
}
function setColor(event) {
    //Altera fontSize
    this.fontColor = event.target.value;
}
function finalizar() {
    alert('Customização Finalizada');
        console.log(this.listSalvos);
        console.log(this.background.src);

    limpaPai(); 

}

function selectedFontType(event) {
    if (event.target.id == "fontUpload" && document.getElementById('fontStandard').checked) {
        document.getElementById('fontStandard').checked = false;
    } else if (event.target.id == "fontStandard" && document.getElementById('fontUpload').checked) {
        document.getElementById('fontUpload').checked = false;
    }
    if (event.target.id == "fontUpload") {
        if (event.target.checked == false) {
            document.getElementById('fontUploadFile').disabled = true;
            document.getElementById('fontUploadFile').selectedIndex = 0;
        } else {
            document.getElementById('fontUploadFile').disabled = false;
            document.getElementById('selectFont').disabled = true;
        }
    } else if (event.target.id == "fontStandard") {
        if (event.target.checked == false) {
            document.getElementById('selectFont').disabled = true;
        } else {
            document.getElementById('selectFont').disabled = false;
            document.getElementById('fontUploadFile').disabled = true;
        }
    }
}

function fontFileChange(event) {
    var selectedFont = new FontFace(event.target[event.target.selectedIndex].text, `url(${event.target.value})`);
    selectedFont.load().then(function (loaded_face) {
        document.fonts.add(loaded_face);
        this.fontName = event.target[event.target.selectedIndex].text;
    })
}

