var imagenpersonaje = ["./image/top.gif","./image/zac.gif","./image/teemo1.gif","./image/adc.gif","./image/supp.gif","./image/poro2.gif","./image/poro3.gif"];
var personajesPuntos = [15,10,15,40,20,-20,-15];
var Velocidad = [70,70,70,70,70,80,80]
var totalBalas = 7;
var totalPersonajes = imagenpersonaje.length;
var puntos;
var coordX;
var altoImgFondo;
var anchoImgFondo;
var quePersonaje;
var puedeDisparar;
var timer;
var tiro;
var botonEmpezar = document.getElementById('imgBtnInicio');

function main(){
	redimensionarVentana();
	crearCanana();
}
function redimensionarVentana(){
	var ancho = imgFondo.width;
	var alto  = imgFondo.height;
	window.resizeTo(ancho,alto);
}
function crearCanana(){
	for(b=0;b<totalBalas;b++){
		var imagen = document.createElement("img");
		imagen.name   = "imgBala";
		imagen.src    = "./image/1x1t.gif";
		imagen.width  = 34;
		imagen.height = 33;
		divCanana.appendChild(imagen);
	}
}
function preguntarEmpezarJuego(){
	if (confirm("¿ Deseas iniciar una partida ?")){
		iniciarPartida();
    	botonEmpezar.style.display = 'none';
	}
}
function iniciarPartida(){
	altoImgFondo  = imgFondo.height;
	anchoImgFondo = imgFondo.width;
	puntos = 0;
	tiro   = 0;
	prepararCanana();
	mostrarPuntos();
	nuevoPersonaje();
}
function prepararCanana(){
	for(b=0;b<totalBalas;b++){
		imgBala[b].src="./image/bala.png";	
	}
}
function nuevoPersonaje(){
    quePersonaje = Math.floor(Math.random() * totalPersonajes);
    imgPersonaje.src = imagenpersonaje[quePersonaje];

    // Random para decidir si el personaje aparecerá a la izquierda (modo = 0) o a la derecha (modo = 1)
    modo = Math.floor(Math.random() * 2);

    coordY = Math.floor(Math.random() * (altoImgFondo - imgPersonaje.height - 100));
	if (modo === 0) {
        if(coordY<140){
			coordX = coordX=400;

		}else{
			coordX = 0;
		}
    } else {
        // Aparecer a la derecha
        coordX = anchoImgFondo - imgPersonaje.width;
    }
    iniciarMovimientoPersonaje();
    puedeDisparar = true;
}

function iniciarMovimientoPersonaje(){
    detenerMovimientoPersonaje();
    timer   = setInterval("desplazaPersonaje()",250);
}
function detenerMovimientoPersonaje(){
	clearInterval(timer);
}

function desplazaPersonaje(){
	if (modo === 0) {
        // Mover hacia la derecha
        coordX += Velocidad[quePersonaje];
    } else {
        // Mover hacia la izquierda
        coordX -= Velocidad[quePersonaje];
    }

    imgPersonaje.style.left = coordX + "px";
    imgPersonaje.style.top = coordY + "px";

    // Verificar si el personaje ha salido completamente del área visible
    if ((modo === 0 && coordX > anchoImgFondo) || (modo === 1 && coordX + imgPersonaje.width < 0) || (modo===1 && coordY<150 && coordX<500)) {
        nuevoPersonaje();
    }
}

function mostrarPuntos(){
	txtPuntos.value = puntos + " Puntos";
}

function disparoOK(){
	if(!puedeDisparar){ return; }
	puntos += personajesPuntos[quePersonaje] ;
	mostrarPuntos();
	quedanBalas = disparoRealizado();
	sndDisparo.src="muerte.mp3";
	if (quedanBalas){
		nuevoPersonaje();
	}
}

function disparoKO(){
	if(!puedeDisparar){ return; }
	puntos -= 10 ;
	if (puntos<=0){
		puntos = 0;
	}
	mostrarPuntos();
	quedanBalas = disparoRealizado();
}

function disparoRealizado(){
	sndDisparo.src="disparo.wav";
	imgBala[tiro].src = "./image/1x1t.gif";
	tiro += 1;
	quedanBalas = (tiro<totalBalas) ;
	if(!quedanBalas){
		finDelJuego();
	}
	return quedanBalas;
}

function finDelJuego(){
	detenerMovimientoPersonaje();
	imgPersonaje.src="./image/1x1t.gif";
	puedeDisparar = false;
	mensaje = "FIN DE LA PARTIDA." + "\n" + "Has conseguido " + puntos + " puntos !!!";
	alert(mensaje);
	botonEmpezar.style.display = 'block';
	preguntarEmpezarJuego();
}
