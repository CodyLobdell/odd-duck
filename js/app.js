'use strict';



// how many rounds of voting

let vote = 0;
let maxVote = 25;

// Render img
let image1 = document.querySelector('#img img:first-child');
let image2 = document.querySelector('#img img:nth-child(2)');
let image3 = document.querySelector('#img img:nth-child(3)');


//constructor function for item
// view, like are optional and default, doeesnt need an input
function Item(name, src, view = 0, like = 0) {
  this.name = name;
  this.src = src;
  // this.src = `img/${name}.jpg`;
  this.view = view;
  this.like = like;
}

// testing adding prototype
// Item.prototype.getName = function(){
//   console.log('hi');
// }

//all items

let bag = new Item('bag', 'img/bag.jpg');
let banana = new Item('banana', 'img/banana.jpg');
let bathroom = new Item('bathroom', 'img/bathroom.jpg');
let boots = new Item('boots', 'img/boots.jpg');
let breakfast = new Item('breakfast', 'img/breakfast.jpg');
let bubblegum = new Item('bubblegum', 'img/bubblegum.jpg');
let chair = new Item('chair', 'img/chair.jpg');
let cthulhu = new Item('cthulhu', 'img/cthulhu.jpg');
let dogDuck = new Item('dog-duck', 'img/dog-duck.jpg');
let dragon = new Item('dragon', 'img/dragon.jpg');
let pen = new Item('pen', 'img/pen.jpg');
let petSweep = new Item('pet-sweep', 'img/pet-sweep.jpg');
let scissors = new Item('scissors', 'img/scissors.jpg');
let shark = new Item('shark', 'img/shark.jpg');
let sweep = new Item('sweep', 'img/sweep.png');
let tauntaun = new Item('tauntaun', 'img/tauntaun.jpg');
let unicorn = new Item('unicorn', 'img/unicorn.jpg');
let waterCan = new Item('water-can', 'img/water-can.jpg');
let wineGlass = new Item('wine-glass', 'img/wine-glass.jpg');

// all product in an array
let list = [bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, sweep, tauntaun, unicorn, waterCan, wineGlass];

// needs to be below the list, so it exist
pageLoad();


// setup a random number array for unique number use
let rngNoAr = [];


//Random no
function rng() {
  return Math.floor(Math.random() * list.length);
}

// new render img function where the next rotation won't have previous imgs


function renderImg() {
  while (rngNoAr.length < 6) {
    let randomNo = rng();
    if (!rngNoAr.includes(randomNo)) {
      rngNoAr.push(randomNo);
      console.log(`after check ${rngNoAr}`);
    }
  }
  let no1 = rngNoAr.shift();
  console.log(`take out no1 ${rngNoAr}`);
  let no2 = rngNoAr.shift();
  console.log(`take out no2 ${rngNoAr}`);
  let no3 = rngNoAr.shift();
  console.log(`take out no3 ${rngNoAr}`);
  image1.src = list[no1].src;
  image2.src = list[no2].src;
  image3.src = list[no3].src;
  image1.alt = list[no1].name;
  image2.alt = list[no2].name;
  image3.alt = list[no3].name;
  list[no1].view++;
  list[no2].view++;
  list[no3].view++;
}

renderImg();

// old render img function where the next rotation can be repeated

/*
function renderImg1() {
  let img1 = rng();
  let img2 = rng();
  let img3 = rng();
  console.log(img1, img2, img3);
  while (img1 === img2 || img1 === img3 || img2 === img3) {
    img2 = rng();
    img3 = rng();
  }
  //change img shown
  image1.src = list[img1].src;
  image2.src = list[img2].src;
  image3.src = list[img3].src;
  image1.alt = list[img1].name;
  image2.alt = list[img2].name;
  image3.alt = list[img3].name;
  list[img1].view++;
  list[img2].view++;
  list[img3].view++;
}
*/

// add event listener
let img = document.getElementById('img');


let resultUl = document.getElementById('resultUl');



let mouseClick = function (event) {
  // console.log(event.target.alt);
  let clickName = event.target.alt;
  for (let i = 0; i < list.length; i++) {
    if (clickName === list[i].name) {
      list[i].like++;
      vote++;
      console.log(list[i].like);
    }
  }
  if (vote < maxVote) {
    renderImg();
  } else {
    img.removeEventListener('click', mouseClick);
    alert("Click View Results button on the left.")
    // render();
    viewResult.addEventListener('click', render);
    renderImg();
  }

};

img.addEventListener('click', mouseClick);




// render result
let render = function () {
  for (let j = 0; j < list.length; j++) {
    let newList = document.createElement('li');
    newList.textContent = `${list[j].name} has ${list[j].like} votes, and was seen ${list[j].view} times.`;
    //banana had 3 votes, and was seen 5 times.
    resultUl.appendChild(newList);
  }

  // save all data into a dataToString as string
  let dataToString = JSON.stringify(list);
  console.log(dataToString);
  localStorage.setItem('saveAll', dataToString);
  viewResult.removeEventListener('click', render);
  finalChart();

};

let viewResult = document.getElementById('view');

// chart

let finalChart = function () {



  let listName = [];
  let listView = [];
  let listLike = [];

  for (let l = 0; l < list.length; l++) {
    listName.push(list[l].name);
    // console.log(listName);
    listView.push(list[l].view);
    listLike.push(list[l].like);
  }

  const ctx = document.getElementById('myChart');

  new Chart (ctx, {
    type: 'bar',
    data: {
      labels: listName,
      datasets: [{
        label: '# of Views',
        data: listView,
        borderWidth: 1
      },
      {
        label: '# of Likes',
        data: listLike,
        borderWidth: 1
      }]
    },


    options: {
      indexAxis: 'y',
      barThickness: '10',
      borderRadius: '10',
      borderWidth: 2,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
};

function pageLoad() {
  let dataFromLocal = localStorage.getItem('saveAll');
  console.log(dataFromLocal);
  if (dataFromLocal) {
    console.log(`Data From Local Storage ${dataFromLocal}`);
    let parsedData = JSON.parse(dataFromLocal);
    console.log(parsedData[0].name);
    list = parsedData;
  }
};