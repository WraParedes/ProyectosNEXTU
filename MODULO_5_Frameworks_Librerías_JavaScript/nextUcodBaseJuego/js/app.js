$( document ).ready(function() {
  IniciarJuego();
});

function fillBoard() {
  var top = 7;
  var column = $('[class^="col-"]');

  column.each(function () {
    var candys = $(this).children().length;
    var agrega = top - candys;
    for (var i = 0; i < agrega; i++) {
      var candyType = getRandomInt(1, 5);
      if (i === 0 && candys < 1) {
        $(this).append('<img src="image/' + candyType + '.png" class="element width="90px" height="90px""></img>');
      } else {
        $(this).find('img:eq(0)').before('<img src="image/' + candyType + '.png" class="element" width="90px" height="90px"></img>');
      }
    }
  });
  DragAndDrop();
  setValidations();
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}


//pone los elemento caramelo en el tablero
function checkBoard() {
  fillBoard();
}

var aux=0;
function white(){
  setInterval(function(){
    if(aux == 0){
      aux=1;
    $("#tituloJuego").css("color", "white");
  }
  else {
    aux=0;
    $("#tituloJuego").css("color", "yellow");
    }
  }, 1000);
}

function RandomImagenes(){
  var columnas = $(".panel-tablero div");

  for (var i = 0; i < columnas.length; i++) {
        for (var j = 0; j < 7; j++) {
          var img = Math.floor((Math.random() * 4) + 1);
          $(columnas[i]).append("<img src='image/" + img + ".png' class='elemento' width='90px' height='90px'>");
        }
      }
}

function DragAndDrop() {
	$('img').draggable({
		containment: '.panel-tablero',
		droppable: 'img',
		revert: true,
		revertDuration: 600,
		grid: [100, 100],
		zIndex: 10
	});
	$('img').droppable({
		drop: CambioCaramelos
	});
	DraggableDroppable();
}

function DraggableDroppable() {
	$('img').draggable('enable');
	$('img').droppable('enable');
}

function CambioCaramelos(event, candyDrag) {
	var candyDrag = $(candyDrag.draggable);
	var dragSrc = candyDrag.attr('src');
	var candyDrop = $(this);
	var dropSrc = candyDrop.attr('src');
	candyDrag.attr('src', dropSrc);
	candyDrop.attr('src', dragSrc);

	setTimeout(function () {
		checkBoard();
		if ($('img.delete').length === 0) {
			candyDrag.attr('src', dragSrc);
			candyDrop.attr('src', dropSrc);
		} else {
			Movimientos();
		}
	}, 600);
}



function Fila(index) {
	var FilaDulces = ColumnasFilas('rows', index);
	return FilaDulces;
}

function Columnas(index) {
	var candyColumn = ColumnasFilas('columns');
	return candyColumn[index];
}


function ColumnasFilas(arrayType, index) {

	var Col1 = $('.col-1').children();
	var Col2 = $('.col-2').children();
	var Col3 = $('.col-3').children();
	var Col4 = $('.col-4').children();
	var Col5 = $('.col-5').children();
	var Col6 = $('.col-6').children();
	var Col7 = $('.col-7').children();

	var Columnas = $([Col1, Col2, Col3, Col4,
		Col5, Col6, Col7
	]);
var col3=0;
	if (typeof index === 'number') {
		var candyRow = $([Col1.eq(index), Col2.eq(index), Col3.eq(index),
			Col4.eq(index), Col5.eq(index), Col6.eq(index),
			Col7.eq(index)
		]);
	} else {
		index = '';
	}

	if (arrayType === 'columns') {
		return Columnas;
	} else if (arrayType === 'rows' && index !== '') {
		return candyRow;
	}
}


function setValidations() {
	columnValidation();
	rowValidation();

	if ($('img.delete').length !== 0) {
		deletesCandyAnimation();
	}
}

function deletesCandyAnimation() {
	DraggableDroppable();
	$('img.delete').effect('pulsate', 600);
	$('img.delete').animate({
			opacity: '0'
		}, {
			duration: 400
		})
		.animate({
			opacity: '0'
		}, {
			duration: 600,
			complete: function () {
				deletesCandy()
					.then(checkBoardPromise)
					.catch(showPromiseError);
			},
			queue: true
		});
}

//---puntuacion
function setScore(candyCount) {
	var score = Number($('#score-text').text());
	switch (candyCount) {
		case 3:
			score += 25;
			break;
		case 4:
			score += 50;
			break;
		case 5:
			score += 75;
			break;
		case 6:
			score += 100;
			break;
		case 7:
			score += 200;
	}
	$('#score-text').text(score);
}


function columnValidation() {
	for (var j = 0; j < 7; j++) {
		var counter = 0;
		var candyPosition = [];
		var extraCandyPosition = [];
		var candyColumn = Columnas(j);
		var comparisonValue = candyColumn.eq(0);
		var gap = false;
		for (var i = 1; i < candyColumn.length; i++) {
			var srcComparison = comparisonValue.attr('src');
			var srcCandy = candyColumn.eq(i).attr('src');

			if (srcComparison != srcCandy) {
				if (candyPosition.length >= 3) {
					gap = true;
				} else {
					candyPosition = [];
				}
				counter = 0;
			} else {
				if (counter == 0) {
					if (!gap) {
						candyPosition.push(i - 1);
					} else {
						extraCandyPosition.push(i - 1);
					}
				}
				if (!gap) {
					candyPosition.push(i);
				} else {
					extraCandyPosition.push(i);
				}
				counter += 1;
			}
			comparisonValue = candyColumn.eq(i);
		}
		if (extraCandyPosition.length > 2) {
			candyPosition = $.merge(candyPosition, extraCandyPosition);
		}
		if (candyPosition.length <= 2) {
			candyPosition = [];
		}
		candyCount = candyPosition.length;
		if (candyCount >= 3) {
			deleteColumnCandy(candyPosition, candyColumn);
			setScore(candyCount);
		}
	}
}
function deleteColumnCandy(candyPosition, candyColumn) {
	for (var i = 0; i < candyPosition.length; i++) {
		candyColumn.eq(candyPosition[i]).addClass('delete');
	}
}

//--eliminar una fila
function rowValidation() {
	for (var j = 0; j < 7; j++) {
		var counter = 0;
		var candyPosition = [];
		var extraCandyPosition = [];
		var candyRow = Fila(j);
		var comparisonValue = candyRow[0];
		var gap = false;
		for (var i = 1; i < candyRow.length; i++) {
			var srcComparison = comparisonValue.attr('src');
			var srcCandy = candyRow[i].attr('src');

			if (srcComparison != srcCandy) {
				if (candyPosition.length >= 3) {
					gap = true;
				} else {
					candyPosition = [];
				}
				counter = 0;
			} else {
				if (counter == 0) {
					if (!gap) {
						candyPosition.push(i - 1);
					} else {
						extraCandyPosition.push(i - 1);
					}
				}
				if (!gap) {
					candyPosition.push(i);
				} else {
					extraCandyPosition.push(i);
				}
				counter += 1;
			}
			comparisonValue = candyRow[i];
		}
		if (extraCandyPosition.length > 2) {
			candyPosition = $.merge(candyPosition, extraCandyPosition);
		}
		if (candyPosition.length <= 2) {
			candyPosition = [];
		}
		candyCount = candyPosition.length;
		if (candyCount >= 3) {
			deleteHorizontal(candyPosition, candyRow);
			setScore(candyCount);
		}
	}
}
function deleteHorizontal(candyPosition, candyRow) {
	for (var i = 0; i < candyPosition.length; i++) {
		candyRow[candyPosition[i]].addClass('delete');
	}
}

function deletesCandy() {
	return new Promise(function (resolve, reject) {
		if ($('img.delete').remove()) {
			resolve(true);
		} else {
			reject('No se pudo eliminar Candy...');
		}
	})
}


function Movimientos() {
	var actualValue = Number($('#movimientos-text').text());
	var result = actualValue += 1;
	$('#movimientos-text').text(result);
}

function checkBoardPromise(result) {
	if (result) {
		checkBoard();
	}
}

function showPromiseError(error) {
	console.log(error);
}

function JuegoFinal() {
	$('div.panel-tablero, div.time').effect('fold');
	$('h1.main-titulo').addClass('title-over')
		.text('Juego Terminado');
	$('div.score, div.moves, div.panel-score').width('100%');

}

function IniciarJuego() {
	$('.btn-reinicio').click(function () {
		if ($(this).text() === 'Reiniciar') {
			location.reload(true);
		}
		checkBoard();
		$(this).text('Reiniciar');
		$('#timer').startTimer({
			onComplete: JuegoFinal
		})
	});
}
