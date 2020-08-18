var startBtn;
var resetBtn;

var houses = new Array();
var stats = new Array();

const addHouses = () => {
  //parent element
  var houseDiv = document.getElementById("house");

  // create all divs that represents houses.
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      let childDiv = document.createElement("div");
      childDiv.className = "house";
      childDiv.id = `${i}${j}`;
      houseDiv.appendChild(childDiv);

      // new house object with number in array and diseased indicator as false.
      var house = new House(`${i}${j}`, false);
      houses.push(house);
    }
  }
};

const addListeners = () => {
  startBtn = document.getElementById("startBtn");
  resetBtn = document.getElementById("resetBtn");

  startBtn.addEventListener("click", function () {
    startGame();
  });
  resetBtn.addEventListener("click", function () {
    resetGame();
  });
};

// get random integers from 0 to 9.
const getRandomInt = () => Math.floor(Math.random() * (10 - 0) + 0);

// reseting the game
const resetGame = () => {
  clearHouses();
  const statistics = document.getElementById("stats");
  statistics.innerHTML = "";
  stats = [];
};

// make all houses green again
const clearHouses = () => {
  var houseClass = document.querySelectorAll(".house");
  for (const houseDiv of houseClass) {
    houseDiv.style.backgroundColor = "green";
  }

  // resetting all house objects
  for (const house of houses) {
    house.isDiseased = false;
  }
};

const makeHouseDiseased = (house) => {
  //changing the object to diseased
  house.diseased = true;

  // ..and making it red
  var div = document.getElementById(`${house.number}`);
  div.style.backgroundColor = "red";
};

// look into the houses array for the right house.
const findHouse = (number) => {
  return houses.find((house) => house.getNumber === number);
};

// Starting the game
const startGame = () => {
  resetGame();
  var tenRounds = 0;
  var zombies;
  var rounds;

  // 10 rounds.
  while (tenRounds != 10) {
    clearHouses();
    zombies = 1;
    rounds = 0;
    gameOn = true;

    while (gameOn) {
      var zombiesPerRound = 0;
      rounds++;

      for (let i = 0; i < zombies; i++) {
        var x = getRandomInt();
        var y = getRandomInt();
        var number = `${x}${y}`;

        // find that exact house in house array.
        const house = findHouse(number);

        if (house.isDiseased === false) {
          zombiesPerRound++;
          makeHouseDiseased(house);
        }
      }

      // add the zombies that was found in last round.
      zombies += zombiesPerRound;
      // if zombies have visited all houses.
      if (zombies >= 101) {
        // push the stats to array for printing out it later.
        stats.push(`${rounds} - ${zombies / rounds}`);
        gameOn = false;
      }
    }
    tenRounds++;
  }
  showStats();
};

const showStats = () => {
  var statsElement = document.getElementById("stats");

  // add all stats to the page
  for (var i = 0; i < stats.length; i++) {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(stats[i]));
    statsElement.appendChild(li);
  }
};

const loadPage = () => {
  addHouses();
  addListeners();
};

document.addEventListener("DOMContentLoaded", function () {
  loadPage();
});
