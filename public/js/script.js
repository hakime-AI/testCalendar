var pos = { x: 0, y: 0 };
var trigger = document.querySelector('.trigger');
const number = 6;
const divider = 6;
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function searchRandom(count, array){
  let answer = [], counter = 0;
 
  while(counter < count){
    let rand = array[Math.floor(Math.random() * array.length)];
    if(!answer.some(an => an === rand)){
      answer.push(rand);
      counter++;
    }
  }
  
  return answer;
}

function randomPositionByGrid(maxWidth, maxHeight, divider , number = null) {
  var newDivider = divider-2;
  var newDividers = [];
  if (number == null) {
    number = 1;
  }
  let dividers = new Array(newDivider);
  let y = 0;
  for (let i = 0; i < (newDivider); i++) {
    // dividers[i] = new Array(newDivider);
    // dividers[i] = new Array(Math.pow(newDivider,newDivider));
    for (let y = 0; y < newDivider; y++) {
      dividers[y+(newDivider*i)] = (y+2)+"/"+(i+2);
    }
    
    
  }
  // var randInt = getRandomIntInclusive(1, newDivider+1);
  // for (let i = 0; i < number; i++) {
    newDividers = searchRandom(number, dividers)
  // }

  console.log(dividers) 
  console.log(newDividers)
  for (let i = 0; i < number; i++) {
    var tempo = newDividers[i].split("/");
    // console.log(tempo) 
    pos.x = getRandomIntInclusive(
      (maxWidth * (tempo[0] - 1)) / divider,
      (maxWidth * (tempo[0])) / divider);
    pos.y = getRandomIntInclusive(
      (maxHeight * (tempo[1] - 1)) / divider,
      (maxHeight * (tempo[1])) / divider);


    document.documentElement.style.setProperty('--x' + i, pos.x);
    document.documentElement.style.setProperty('--y' + i, pos.y);
  }

}
trigger.addEventListener('change', function () { randomPositionByGrid(window.innerWidth, window.innerHeight, divider, number); })

document.body.onload = addElement;

function addElement(number, className) {
  var container = document.querySelector('.motion-container');
  for (let i = 0; i < number; i++) {
    var newDiv = document.createElement("div");
    // newDiv.style.transform = "translate(calc(1px * var(--x"+i+")), calc(1px * var(--y"+i+")))";
    newDiv.style.left = "calc(1px * var(--x" + i + "))";
    newDiv.style.top = "calc(1px * var(--y" + i + "))";
    newDiv.className = className;
    container.appendChild(newDiv);
  }
}
randomPositionByGrid(window.innerWidth, window.innerHeight, divider, number); 
addElement(number, 'motion-object');