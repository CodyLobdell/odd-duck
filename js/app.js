'use strict';

// number of product votes total

let vote = 0;
let maxVote = 25;

// Render img
let image1 = document.querySelector('#img img:first-child');
let image2 = document.querySelector('#img img:nth-child(2)');
let image3 = document.querySelector('#img img:nth-child(3)');

//constructor function for product
function Product(name, src) {
  this.name = name;
  this.src = src;
  // this.src = `img/${name}.jpg`;
  this.view = 0;
  this.like = 0;
}

//all products

let bag = new Product('bag', 'img/bag.jpg');
let banana = new Product('banana', 'img/banana.jpg');
let bathroom = new Product('bathroom', 'img/bathroom.jpg');
let boots = new Product('boots', 'img/boots.jpg');
let breakfast = new Product('breakfast', 'img/breakfast.jpg');
let bubblegum = new Product('bubblegum', 'img/bubblegum.jpg');
let chair = new Product('chair', 'img/chair.jpg');
let cthulhu = new Product('cthulhu', 'img/cthulhu.jpg');
let dogDuck = new Product('dog-duck', 'img/dog-duck.jpg');
let dragon = new Product('dragon', 'img/dragon.jpg');
let pen = new Product('pen', 'img/pen.jpg');
let petSweep = new Product('pet-sweep', 'img/pet-sweep.jpg');
let scissors = new Product('scissors', 'img/scissors.jpg');
let shark = new Product('shark', 'img/shark.jpg');
let sweep = new Product('sweep', 'img/sweep.png');
let tauntaun = new Product('tauntaun', 'img/tauntaun.jpg');
let unicorn = new Product('unicorn', 'img/unicorn.jpg');
let waterCan = new Product('water-can', 'img/water-can.jpg');
let wineGlass = new Product('wine-glass', 'img/wine-glass.jpg');

//all product listed in array
let list = [bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, sweep, tauntaun, unicorn, waterCan, wineGlass];


//Random image function
function rng() {
  return Math.floor(Math.random() * list.length);
}

function renderImg() {

  let img1 = rng();
  let img2 = rng();
  let img3 = rng();
  console.log(img1, img2, img3);
  while (img1 === img2 || img1 === img3 || img2 === img3) {
    img2 = rng();
    img3 = rng();
  }
  //cycle through images for next prduct
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

renderImg();

//save local storage
const productArr = [list];
localStorage.setItem('product', JSON.stringify(productArr));


//retrieve local storage
const productData = JSON.parse(localStorage.getItem('product'));
console.log(productData);

//add event listener
let img = document.getElementById('img');


let resultUl = document.getElementById('resultUl');

let mouseClick = function (event) {

  //console.log(event.target.alt);
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
    alert('Click View Results on the left for totals.');

    viewResult.addEventListener('click', render);
    renderImg();
  }

};

img.addEventListener('click', mouseClick);

//render result
let render = function () {
  for (let j = 0; j < list.length; j++) {
    let newList = document.createElement('li');
    newList.textContent = `${list[j].name} has ${list[j].like} votes, and was seen ${list[j].view} times.`;

    resultUl.appendChild(newList);
  }
  viewResult.removeEventListener('click', render);
  dataChart();
};

let viewResult = document.getElementById('view');

let dataChart = function () {

  let listName = [];
  let listView = [];
  let listLike = [];

  for (let l = 0; l < list.length; l++) {
    listName.push(list[l].name);
    console.log(listName);
    listView.push(list[l].view);
    listLike.push(list[l].like);
  }

  const ctx = document.getElementById('productChart');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: listName,
      datasets: [{
        label: 'Product Views',
        data: listView,
        borderWidth: 2
      },
      {
        label: 'Product Likes',
        data: listLike,
        borderWidth: 2
      }]
    },


    options: {
      indexAxis: 'x',
      backgroundColor: 'purple',
      barThickness: '15',
      borderRadius: '15',
      borderWidth: 5,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
