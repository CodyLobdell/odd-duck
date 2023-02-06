'use strict';

//variables
const canvasEl = document.getElementById('chart');
const ctx = canvasEl.getContext('2d');
const divButtonEl = document.getElementById('divbutton');
const selctImgEl = document.getElementById('selctImg');
const buttonEl = document.getElementById('viewresults');
let selectionRounds = 0;
const imgSectionEl = document.getElementById('imagedisplay');
const imgFileArray = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'unicorn.jpg', 'water-can.jpg'];
let constructedImages = [];

//constructor function
function ImageConstructor(name, imgFile) {
  this.name = name;
  this.imgFile = `./images/${imgFile}`;
  this.timesClicked = 0;
  this.timesShown = 0;
};

//put constructor function objects in array
for (let i = 0; i < imgFileArray.length; i++) {
  let newlyMadeImg = new ImageConstructor(imgFileArray[i].slice(0, imgFileArray[i].length - 4), imgFileArray[i]);
  constructedImages.push(newlyMadeImg);
}
console.log(constructedImages);

//find a random image to grab
function getRandomIndex() {
  return Math.floor(Math.random() * constructedImages.length);
}

//when 25 rounds is up function
function roundsUp() {
  selectImgEl.style.display = "none";
  imgSectionEl.style.display = "none";
  let finishText = document.getElementById('finishtext');
  let h3El = document.createElement('h3');
  let h3Content = 'Thank you for taking our survey!'
  h3El.innerHTML = h3Content;
  finishText.appendChild(h3El);
  //make button appear
  buttonEl.style.display = "block";
}

//create function to render images
function renderImages() {
  //use document to put images in their html section
  let img1El = document.getElementById('image1');
  let img2El = document.getElementById('image2');
  let img3El = document.getElementById('image3');
  //set images from array to a variable
  let img1 = constructedImages[getRandomIndex()];
  let img2 = constructedImages[getRandomIndex()];
  let img3 = constructedImages[getRandomIndex()];
  while (img1 === img2 || img1 === img3 || img2 === img3) {
    img1 = constructedImages[getRandomIndex()];
    img2 = constructedImages[getRandomIndex()];
    img3 = constructedImages[getRandomIndex()];
  }
  img1.timesShown++;
  img2.timesShown++;
  img3.timesShown++;
  //asign img elements a src & name
  img1El.src = img1.imgFile;
  img2El.src = img2.imgFile;
  img3El.src = img3.imgFile;
  img1El.name = img1.name;
  img2El.name = img2.name;
  img3El.name = img3.name;
  //remove images from array so they don't appear next round

  //only 25 rounds of images
  selectionRounds++;
  if (selectionRounds >= 26) {
    roundsUp();
  }
}

//click event handler
function handleClick(event1) {
  let imageName = event1.target.name;
  constructedImages.forEach(function (searchArrayFor) {
    if (searchArrayFor.name === imageName) {
      searchArrayFor.timesClicked++;
    }
  })
  renderImages();
};

//submit event handler
function handleSubmit(event2) {
  let clickedData = [];
  let shownData = [];
  let nameData = [];
  for (let i = 0; i < constructedImages.length; i++) {
    nameData.push(constructedImages[i].name)
    clickedData.push(constructedImages[i].timesClicked);
    shownData.push(constructedImages[i].timesShown);
  }
  buttonEl.removeEventListener('click', handleSubmit);
  console.log(clickedData, shownData, nameData);

  canvasEl.hidden = (false);
  //Data visualization w ChartJS
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: nameData,
      datasets: [{
        label: '# of clicks',
        data: clickedData,
        borderWidth: 1
      }, {
        label: '# of times shown',
        data: shownData,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

};

imgSectionEl.addEventListener('click', handleClick);
buttonEl.addEventListener('click', handleSubmit);

renderImages();