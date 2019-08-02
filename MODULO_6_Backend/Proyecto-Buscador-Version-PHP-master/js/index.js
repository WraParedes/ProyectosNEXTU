/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 20000,
    to: 80000,
    prefix: "$"
  });
}
/*
    DESHABILITADA PORQUE NO HAY IMAGEN!
    Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
/*function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}

inicializarSlider();
playVideoOnScroll();*/


function cors() {
    // Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }
    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
        exit(0);
    }
}

//funcion para inicializar los select
function init(){
    var tipos = [];
    var ciudades = [];
    $.get('data-1.json', function(data){
        for(let i = 0; i < data.length; i++){
            if(tipos.indexOf(data[i].Tipo) === -1) tipos.push(data[i].Tipo);
            if(ciudades.indexOf(data[i].Ciudad) === -1) ciudades.push(data[i].Ciudad);
        }
        for(let i = 0; i < ciudades.length; i++){
            $('#selectCiudad').append('<option value="'+ciudades[i]+'">'+ciudades[i]+'</option>');
        }
        for(let j = 0; j < tipos.length; j++){
            $('#selectTipo').append('<option value="'+tipos[j]+'">'+tipos[j]+'</option>');
        }
        $('select').material_select();
    });
}


//Inicializar sliders materialize al cargar todo el documento
$(document).ready(function(){
    inicializarSlider();
    init();
});

//Funcion para agregar y renderizar los resultados en la pagina
function showResult(array, tipoBusqueda,Precios, Ciudad, Tipo){
    $('.resultados').empty();
    if(tipoBusqueda === 'T'){
    for(let i=0; i<array.length; i++){
        $('.resultados').append(`<div class="card horizontal">
            <div class="card-image place-wrapper">
                <img class="img-responsive place-image" src="img/home.jpg">
            </div>
            <div class="card-stacked">
                <div class="card-content">
                    <p>
                        <b>Dirección: </b>${array[i].Direccion}<br>
                        <b>Ciudad: </b>${array[i].Ciudad}<br>
                        <b>Teléfono: </b>${array[i].Telefono}<br>
                        <b>Código Postal: </b>${array[i].Codigo_Postal}<br>
                        <b>Tipo: </b>${array[i].Tipo}<br>
                        <span class="price"><b>Precio: </b>${array[i].Precio}</span>
                    </p>
                </div>
                <div class="card-action">
                    <a>Ver mas</a>
                </div>
            </div>
        </div>`);
    }
  }

  if(tipoBusqueda ==='P'){
    var arrayPrecios = Precios.split(';');

    for(let i=0; i<array.length; i++){
      let Precio = array[i].Precio;
          Precio = Precio.replace('$','');
          Precio = Precio.replace(',','');

      if(parseFloat(Precio) >= parseFloat(arrayPrecios[0]) &&
         parseFloat(Precio) <= parseFloat(arrayPrecios[1]))
        $('.resultados').append(`<div class="card horizontal">
            <div class="card-image place-wrapper">
                <img class="img-responsive place-image" src="img/home.jpg">
            </div>
            <div class="card-stacked">
                <div class="card-content">
                    <p>
                        <b>Dirección: </b>${array[i].Direccion}<br>
                        <b>Ciudad: </b>${array[i].Ciudad}<br>
                        <b>Teléfono: </b>${array[i].Telefono}<br>
                        <b>Código Postal: </b>${array[i].Codigo_Postal}<br>
                        <b>Tipo: </b>${array[i].Tipo}<br>
                        <span class="price"><b>Precio: </b>${array[i].Precio}</span>
                    </p>
                </div>
                <div class="card-action">
                    <a>Ver mas</a>
                </div>
            </div>
        </div>`);
    }
  }

  if(tipoBusqueda ==='C'){
    var arrayPrecios = Precios.split(';');

    for(let i=0; i<array.length; i++){
      let Precio = array[i].Precio;
          Precio = Precio.replace('$','');
          Precio = Precio.replace(',','');

      if(parseFloat(Precio) >= parseFloat(arrayPrecios[0]) &&
         parseFloat(Precio) <= parseFloat(arrayPrecios[1]) && array[i].Ciudad === Ciudad)
        $('.resultados').append(`<div class="card horizontal">
            <div class="card-image place-wrapper">
                <img class="img-responsive place-image" src="img/home.jpg">
            </div>
            <div class="card-stacked">
                <div class="card-content">
                    <p>
                        <b>Dirección: </b>${array[i].Direccion}<br>
                        <b>Ciudad: </b>${array[i].Ciudad}<br>
                        <b>Teléfono: </b>${array[i].Telefono}<br>
                        <b>Código Postal: </b>${array[i].Codigo_Postal}<br>
                        <b>Tipo: </b>${array[i].Tipo}<br>
                        <span class="price"><b>Precio: </b>${array[i].Precio}</span>
                    </p>
                </div>
                <div class="card-action">
                    <a>Ver mas</a>
                </div>
            </div>
        </div>`);
    }
  }

  if(tipoBusqueda ==='TI'){
    var arrayPrecios = Precios.split(';');

    for(let i=0; i<array.length; i++){
      let Precio = array[i].Precio;
          Precio = Precio.replace('$','');
          Precio = Precio.replace(',','');

      if(parseFloat(Precio) >= parseFloat(arrayPrecios[0]) &&
         parseFloat(Precio) <= parseFloat(arrayPrecios[1]) && array[i].Tipo === Tipo)
        $('.resultados').append(`<div class="card horizontal">
            <div class="card-image place-wrapper">
                <img class="img-responsive place-image" src="img/home.jpg">
            </div>
            <div class="card-stacked">
                <div class="card-content">
                    <p>
                        <b>Dirección: </b>${array[i].Direccion}<br>
                        <b>Ciudad: </b>${array[i].Ciudad}<br>
                        <b>Teléfono: </b>${array[i].Telefono}<br>
                        <b>Código Postal: </b>${array[i].Codigo_Postal}<br>
                        <b>Tipo: </b>${array[i].Tipo}<br>
                        <span class="price"><b>Precio: </b>${array[i].Precio}</span>
                    </p>
                </div>
                <div class="card-action">
                    <a>Ver mas</a>
                </div>
            </div>
        </div>`);
    }
  }

  if(tipoBusqueda ==='CT'){
    var arrayPrecios = Precios.split(';');

    for(let i=0; i<array.length; i++){
      let Precio = array[i].Precio;
          Precio = Precio.replace('$','');
          Precio = Precio.replace(',','');

      if(parseFloat(Precio) >= parseFloat(arrayPrecios[0]) &&
         parseFloat(Precio) <= parseFloat(arrayPrecios[1]) &&
         array[i].Ciudad === Ciudad && array[i].Tipo === Tipo)
        $('.resultados').append(`<div class="card horizontal">
            <div class="card-image place-wrapper">
                <img class="img-responsive place-image" src="img/home.jpg">
            </div>
            <div class="card-stacked">
                <div class="card-content">
                    <p>
                        <b>Dirección: </b>${array[i].Direccion}<br>
                        <b>Ciudad: </b>${array[i].Ciudad}<br>
                        <b>Teléfono: </b>${array[i].Telefono}<br>
                        <b>Código Postal: </b>${array[i].Codigo_Postal}<br>
                        <b>Tipo: </b>${array[i].Tipo}<br>
                        <span class="price"><b>Precio: </b>${array[i].Precio}</span>
                    </p>
                </div>
                <div class="card-action">
                    <a>Ver mas</a>
                </div>
            </div>
        </div>`);
    }
  }


}

//funcion para mostrar todos los resultados
$('#mostrarTodos').click(function(){
    $.get('data-1.json', function(data){
        showResult(data,'T','','','');
    });
});

//funcion para busqueda
$('#submitButton').click(function(){
    let ciudad = $('#selectCiudad option:selected').val();
    let tipo = $('#selectTipo option:selected').val();
    let precio = $('#rangoPrecio').val();
    let sTipoBusqueda ='P';

    if(ciudad.length>0){
      sTipoBusqueda='C';
    }

    if(tipo.length>0){
      sTipoBusqueda='TI';
    }

    if(tipo.length>0 && ciudad.length>0){
      sTipoBusqueda='CT';
    }

    $.get('data-1.json', function(data){
        showResult(data,sTipoBusqueda,precio, ciudad, tipo);
    });
});
