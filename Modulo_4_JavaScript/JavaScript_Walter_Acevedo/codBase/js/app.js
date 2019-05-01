
var list = document.getElementsByClassName("tecla");
var aux = 0;
var aux1 = 0;
var auxSigno = "";
var numero1 = 0;
var numero2 = 0;
var operacion = 0;
var auxNumSuma = 0;
var Calculadora = {
  init: function(){
    this.transform();
    this.cargarNumeros();
  },

  transform: function(){
    /*Metodo para reducir el tamaño y retornar a la normalidad*/
		for (let i = 0; i < list.length ; i++ ) {
			list[i].addEventListener("mousedown", function (event) {
				event.target.setAttribute("style", "transform:scale(0.85,0.85)")
			})
			list[i].addEventListener("mouseup", function (event) {
				event.target.setAttribute("style", "transform:scale(1,1)")
			})
            list[i].addEventListener("mouseout", function (event) {
				event.target.setAttribute("style", "transform:scale(1,1)")
			})
		}
  },

  cargarNumeros: function(){
    for(let i = 0; i < list.length; i++){
      var numeros = document.getElementById(list[i].id);
      numeros.addEventListener("click",function(){
        if(list[i].id == 'on'){
          document.getElementById('display').innerHTML='0'
          aux = 0;
        }
        else if (list[i].id == 'sign') {
          var signoMasMenos;
          var verificarsigno;

          if(document.getElementById('display').innerHTML != '0'){
            verificarsigno = document.getElementById('display').innerHTML.substring(0,1);

            if(verificarsigno != "-"){
              signoMasMenos = document.getElementById('display').innerHTML;
              signoMasMenos = "-" + signoMasMenos;
              document.getElementById('display').innerHTML = signoMasMenos;
            }
            else {
              signoMasMenos = document.getElementById('display').innerHTML.substring(1,document.getElementById('display').innerHTML.length);
              document.getElementById('display').innerHTML = signoMasMenos;
            }
          }
        }
        else if (list[i].id == 'raiz') {

        }
        else if (list[i].id == 'dividido') {
          auxSigno = '/';
          numero1 = document.getElementById('display').innerHTML;
          document.getElementById('display').innerHTML = '';
        }
        else if (list[i].id == 'por') {
          auxSigno = "*";
          numero1 = document.getElementById('display').innerHTML;
          document.getElementById('display').innerHTML = '';
        }
        else if (list[i].id == 'menos') {
          auxSigno  = "-";
          numero1 = document.getElementById('display').innerHTML;
          document.getElementById('display').innerHTML = '';
        }
        else if (list[i].id == 'mas') {
          auxSigno  = "+";
          numero1 = document.getElementById('display').innerHTML;
          document.getElementById('display').innerHTML = '';
        }
        else if (list[i].id == 'punto') {
          var DatosNumeros;
          if(aux == 0){
            DatosNumeros = document.getElementById('display').innerHTML;
            DatosNumeros +=".";
            document.getElementById('display').innerHTML = DatosNumeros;
            aux = 1;
          }
        }
        else if (list[i].id == 'igual') {
            if(aux1==0){
              auxNumSuma = document.getElementById('display').innerHTML;
            }
            if(auxSigno == "+"){
            numero2 = document.getElementById('display').innerHTML;
            operacion = Number(numero1) + Number(numero2);
            document.getElementById('display').innerHTML = operacion;
            document.getElementById('display').innerHTML = document.getElementById('display').innerHTML.substring(0,8);
            numero1 = auxNumSuma;
            aux1++;
          }

            if(auxSigno == "-"){
            numero2 = document.getElementById('display').innerHTML;
            operacion = Number(numero1) - Number(numero2);
            document.getElementById('display').innerHTML = operacion;
            document.getElementById('display').innerHTML = document.getElementById('display').innerHTML.substring(0,8);
            aux1++;
          }

            if(auxSigno == "*"){
            numero2 = document.getElementById('display').innerHTML;
            operacion = Number(numero1) * Number(numero2);
            document.getElementById('display').innerHTML = operacion;
            document.getElementById('display').innerHTML = document.getElementById('display').innerHTML.substring(0,8);
            aux1++;
          }

            if(auxSigno == "/"){
            numero2 = document.getElementById('display').innerHTML;
            operacion = Number(numero1) / Number(numero2);
            document.getElementById('display').innerHTML = operacion;
            document.getElementById('display').innerHTML = document.getElementById('display').innerHTML.substring(0,8);
            aux1++;
          }
        }
        else{
          if(document.getElementById('display').innerHTML.length < 8){
            if(document.getElementById('display').innerHTML == '0'){
              document.getElementById('display').innerHTML=list[i].id;
            }
            else {
              document.getElementById('display').innerHTML+=list[i].id;
            }
          }
        }
      })
    }
  }
}

Calculadora.init();
