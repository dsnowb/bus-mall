var numSelects = 25;
var countSelects = 0;

var fcPaths = ['img/bag.jpg', 'img/banana.jpg', 'img/bathroom.jpg', 'img/boots.jpg',
               'img/breakfast.jpg', 'img/bubblegum.jpg', 'img/chair.jpg', 'img/cthulhu.jpg',
               'img/dog-duck.jpg', 'img/dragon.jpg', 'img/pen.jpg', 'img/pet-sweep.jpg',
               'img/scissors.jpg', 'img/shark.jpg', 'img/sweep.png', 'img/tauntaun.jpg',
               'img/unicorn.jpg', 'img/usb.gif', 'img/water-can.jpg', 'img/wine-glass.jpg']

FocusChoice.choices = [];
function FocusChoice(path) {
  this.path = path;
  this.numClicks = 0;
  this.numShown = 0;
  this.ratio = 0;
  this.shownThis = false;
  this.shownLast = false; 
  this.name = path.split('/')[1].split('.')[0].toLowerCase();
  FocusChoice.choices.push(this);
}

function loadChoices() {
  for (var i = 0; i < fcPaths.length; ++i) new FocusChoice(fcPaths[i]);
}

function getFocusChoice() {
  var choicesIndex;
  do {
    choicesIndex = Math.floor(Math.random() * FocusChoice.choices.length);
  } while (FocusChoice.choices[choicesIndex].shownThis || FocusChoice.choices[choicesIndex].shownLast)
  
  return choicesIndex;
}

function renderChoice(imgId) {
  var imgEl = document.getElementById(imgId);
  var choicesIndex = getFocusChoice();
  imgEl.setAttribute('src', FocusChoice.choices[choicesIndex].path);
  imgEl.setAttribute('alt', choicesIndex);
  FocusChoice.choices[choicesIndex].shownThis = true;
  ++FocusChoice.choices[choicesIndex].numShown;
}

function renderChoices() {
  var arrImgEl = document.getElementsByClassName('focus_choice');
  for (var i = 0; i < arrImgEl.length; ++i) renderChoice(arrImgEl[i].getAttribute('id'));
  for (var i = 0; i < FocusChoice.choices.length; ++i) {
    FocusChoice.choices[i].shownLast = false;
    if (FocusChoice.choices[i].shownThis) FocusChoice.choices[i].shownLast = true;
    FocusChoice.choices[i].shownThis = false;
  }
}

function selectChoice(e) {
  ++countSelects;
  var choiceIndex = e.target.getAttribute('alt');
  ++FocusChoice.choices[choiceIndex].numClicks;
  renderChoices();
  if (countSelects === numSelects - 1) renderResults();
}

function calcRatios() {
  for (var i = 0; i < FocusChoice.choices.length; ++i)
    !FocusChoice.choices[i].numShown ? FocusChoice.choices[i].ratio = 0 : FocusChoice.choices[i].ratio = FocusChoice.choices[i].numClicks / FocusChoice.choices[i].numShown;
}

function sortChoicesByRatio() {
  do {
    var flag = false;
    for (var i = 0; i < FocusChoice.choices.length - 1; ++i) {
      if (!FocusChoice.choices[i].numShown) {
        FocusChoice.choices.push(FocusChoice.choices.splice(i,1)[0]);
        flag = true;
      }
      if (FocusChoice.choices[i].ratio < FocusChoice.choices[i+1].ratio) {
        var temp = FocusChoice.choices[i];
        FocusChoice.choices[i] = FocusChoice.choices[i+1];
        FocusChoice.choices[i+1] = temp;
        flag = true;
        console.log('sorted');
      }
    }
  } while (flag)
}



function renderResults() {
  calcRatios();
  sortChoicesByRatio();
  var mainEl = document.getElementsByTagName('main')[0];
  mainEl.innerHTML = '';
  var ulEl = document.createElement('ul');
  for (var i = 0; i < FocusChoice.choices.length; ++i) {
    var liEl = document.createElement('li');
    liEl.textContent = FocusChoice.choices[i].name + ': ' + FocusChoice.choices[i].numClicks + ' votes out of ' + FocusChoice.choices[i].numShown + ' opportunities. (' + FocusChoice.choices[i].ratio.toFixed(2)*100 + '%)';
    ulEl.appendChild(liEl);
  }
 
  mainEl.appendChild(ulEl);

}

var arrImgEl = document.getElementsByClassName('focus_choice');
for (var i = 0; i < arrImgEl.length; ++i) 
  arrImgEl[i].addEventListener('click',selectChoice);

loadChoices();
renderChoices();
