var fcPaths = ["img/bag.jpg", "img/banana.jpg", "img/bathroom.jpg", "img/boots.jpg",
               "img/breakfast.jpg", "img/bubblegum.jpg", "img/chair.jpg", "img/cthulu.jpg",
               "img/dog-duck.jpg", "img/dragon.jpg", "img/pen.jpg", "img/pet-sweep.jpg",
               "img/scissors.jpg", "img/shark.jpg", "img/sweep.jpg", "img/tauntaun.jpg",
               "img/unicorn.jpg", "img/usb.gif", "img/water-can.jpg", "img/wine-glass.jpg"]

FocusChoice.choices = [];
function FocusChoice(path) {
  this.path = path;
  this.numClicks = 0;
  this.numShown = 0;
  this.shownLast = false;
  this.name = path.split('/')[1].split('.')[0];
  choices.push(this);

  console.log(this.name);
}

FocusChoice("img/bag.jpg");
