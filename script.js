//variables
var squareDim = 16;
var defaultSquareDim = 16;
var dimensions = 480;
var vRandom = false;
var vColor = 'black';
var paint =  false;

//Elements variables
var divParent = document.createElement('div');
//container for div squares
var containerDiv = document.querySelector("#container");

var buttons = Array.from(document.querySelectorAll('button'));
buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    if (button.id === 'random-color') {
      paint =  false;
      vRandom = true;
    }else if (button.id === 'eraser') {
      vColor = 'white';
      paint = true;
      eraseColor(vColor);
    }else if (button.id === 'reset') {
      reset();
    }else if (button.id === 'grid-chooser') {
      paint =  false;
      onClickClear();
    }
  })
})

container();
createInnerDiv(squareDim);
setGridsColor();

function container(){
  containerDiv.style.height = `${dimensions}px`;
  containerDiv.style.width = `${dimensions}px`;
  containerDiv.style.border = 'solid';
}

function createInnerDiv(squareDiv){
	var squares = Math.pow(squareDiv, 2);
	for (var i = 0; i < squares; i++) {
		var div = document.createElement('div');
		div.classList.add('grid-div')
		div.style.height = `${dimensions/squareDiv}px`;//the height is determine relative to the dimensions(i.e space of the container).
		div.style.width = `${dimensions/squareDiv}px`;//the width is determine relative to the dimensions(i.e space of the container).
		div.id = i.toString();
		divParent.appendChild(div);
   }
   containerDiv.appendChild(divParent);
}

function setGridsColor(){
	var grids = Array.from(document.querySelectorAll('.grid-div'));
      grids.forEach(grid => {
        grid.addEventListener('mouseover', () => {
          if (vRandom == true) {
            if (paint !== true) {
              vColor = randomColor();
            }
          }else{
             if (paint !== true) {
              vColor = 'black';
             }
          }
          grid.style.backgroundColor = vColor;
        });
      });
}

function randomColor(){
	return `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
}

function random(num){
	return Math.floor(Math.random() * num);
}

function eraseColor(square){
	square.addEventListener('click', () => {
		square.style.backgroundColor = vColor;
	});
}

function eraseColor(color){
  var grids = Array.from(document.querySelectorAll('.grid-div'));
    grids.forEach(grid => {
      grid.addEventListener('click', () => {
      grid.style.backgroundColor = color;
    });
  })
}

function clearGrid(){
  while(divParent.firstChild){
    divParent.removeChild(divParent.firstChild);
  }
}

function onClickClear(){
    clearGrid();
    squareDim = prompt('Please enter the number of grids not more than 64');
    if (squareDim <= 64) {
      createInnerDiv(squareDim);
    }else{
      squareDim = prompt('Please enter the number of grids not more than 64');
    }
    setGridsColor();
}

function reset(){
    paint =  false;
    vRandom = false;
    clearGrid();
    createInnerDiv(defaultSquareDim);
    setGridsColor();
}