/*
 * Create a list that holds all of your cards
 */
let card1 = document.getElementsByClassName('card');
let cards = [...card1];
//create a list that keeps open cards
let open_cards = [];
//Store the live cards into a variable called deck
const deck = document.getElementsByTagName('ul')[1];
// get the element with restart class and store it in a variable res
const res = document.getElementsByClassName("restart")[0];
//creates a moves counter and set it to 0
let moves = 0;
// create a variable time-init to initial the time counter
let timeInit = 0;
// set moves on the page
document.getElementsByClassName('moves')[0].textContent = moves;
// creates a seconds counter and set it to 0
let seconds = 0;
/* creates a variable called Time_counter which will be used to create a 1000 seconds
interval Timer
*/
let Time_counter;
// creates a variable hour and set it to 0
let hour = 0;
// creates a variable min and set it to 0
let min = 0;
// creates a variable sec and set it to 0
let sec = 0;
// creates a variable star and set it to 0
let star = 0;
// get all the element with fa fa-star class and store it in a variable stars
const stars = document.getElementsByClassName('fa fa-star');
// store the index 0 of stars in star1
let star1 = stars[0];
// store the index 1 of stars in star2
let star2 = stars[1];
// store the index 2 of stars in star3
let star3 = stars[2];

// get all the element with fa fa-star class and store it in a variable win-check
const win_check = document.getElementsByClassName('match');
// get the element with modal class and store it in a variable modal
const modal = document.getElementsByClassName("modal")[0];
// get the element with close-button class and store it in a variable close
const close = document.getElementsByClassName("close-button")[0];
// get the element with button class and store it in a variable button
const button = document.getElementsByClassName("button")[0];

// restart game
restart();
//shuffles card
shuffle(cards);
//add card to page;
addCard();


//Event Listeners

// this event listener listens for click to restart the game
res.addEventListener("click",restart);
// this event listerner listens for click to display cards on the page
deck.addEventListener("click",display);
// this event listerner listens for click to remove the modal and restart the game
close.addEventListener("click",restart_game);
// this event listerner listens for click to restart the game
button.addEventListener("click",restart_game);

//Functions

// this function shuffles card, set moves to 0, set seconds to 0 and  restarts the game
function restart() {
  moves = 0;
  mo = 0;
  seconds = 0;
  stopCounter();
  timeInit = 0;
  star3.classList.remove("rating");
  star2.classList.remove("rating");
  document.getElementById('s').textContent = "0s";
  document.getElementById('m').textContent = "0m";
  document.getElementById('h').textContent = "0h";
  document.getElementsByClassName('moves')[0].textContent = moves;
  document.getElementsByClassName('moves_1')[0].textContent = "Move";
  for (let i = 0; i < cards.length; i++) {
    cards[i].classList.remove("open");
    cards[i].classList.remove("match");
    cards[i].classList.remove("show");
    cards[i].classList.remove("disabled")
    if (open_cards.length > 0){
      open_cards = [];
    }
  }
  shuffle(cards);
  for (let i = 0; i < cards.length; i++) {
    deck.appendChild(cards[i]);
  }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Add card html to the page
function addCard(){
  for (let i = 0; i < cards.length; i++) {
    deck.appendChild(cards[i]);
  }
}

// this function displays cards that are clicked on the page
function display(evt){
  if (evt.target.tagName === "LI"){
    evt.target.classList.add("open");
    evt.target.classList.add("show");
    open_cards.push(evt.target);
    if (open_cards.length === 1){
      open_cards[0].classList.add("disabled")
    }
  }
  /*
  this function checks if the cards match or does not match
  if the cards match, the function matches them together
  if the card does not match, the function unmatches them
  */
  check();
}

/*
this function checks if the cards match or does not match
if the cards match, the function matches them together
if the card does not match, the function unmatches them
*/
function check(){
  if (open_cards.length === 1){
    TimeInitiator();
    Counter();
  }
  else if (open_cards.length === 2){
    moves_counter();
    Ratings();
    for (let i = 0; i < cards.length; i++){
      cards[i].classList.add("disabled");
    }
    const card1 = open_cards[0];
    const card2 = open_cards[1];
    if (card1.firstElementChild.className === card2.firstElementChild.className){
      card1.classList.add("match");
      card2.classList.add("match");
      setTimeout( function () {
        for (let i = 0; i < cards.length; i++){
          cards[i].classList.toggle("disabled")
        }
      },350)
      open_cards = [];
    }
    else {
      card1.classList.add("unmatch");
      card2.classList.add("unmatch");
      setTimeout(
      function remove () {
      card1.classList.remove("open");
      card1.classList.remove("show");
      card2.classList.remove("open");
      card2.classList.remove("show");
      card1.classList.remove("unmatch");
      card2.classList.remove("unmatch")
      for (let i = 0; i < cards.length; i++){
        cards[i].classList.remove("disabled");
      }
    },500)
      open_cards = [];
    }
  }
  winCheck();
}

// this function counts the number of moves played
function moves_counter(){
    moves = moves + 1;
    if (moves > 1){
      document.getElementsByClassName('moves_1')[0].textContent = "Moves";
      document.getElementsByClassName('moves')[0].textContent = moves;
    }
    else{
      document.getElementsByClassName('moves')[0].textContent = moves;
    }
}

function TimeInitiator(){
  timeInit = timeInit + 1;
}

// this function sets the timer variable such as hour,min and sec
function Timer(){
  seconds = seconds + 1;
  hour = Math.floor(seconds / 3600);
  min = Math.floor((seconds - hour * 3600) / 60);
  sec = Math.floor(seconds - (hour * 3600 + min * 60));

  document.getElementById('s').textContent = sec + "s";
  document.getElementById('m').textContent = min + "m";
  document.getElementById('h').textContent = hour + "h";
}

// this function set the interval for the timer function
function Counter(){
  if (timeInit === 1){
    Time_counter = setInterval(Timer,1000);
  }
}

// this function stops the Time_counter
function stopCounter(){
  clearInterval(Time_counter);
}

/*this function stores the value of the rating in the variable star
 depending on the no of moves played
*/
function Ratings(){
if (moves <= 15){
  star = 3;
}
else if ((moves >= 16) && (moves <= 25)){
  star = 2;
  star3.classList.add("rating")
 }
else if (moves > 25) {
  star = 1;
  star2.classList.add("rating")
  }
}

/* this function checks if all the cards has the match class
 this function checks if the player has won the game
*/
function winCheck(){
  if (win_check.length === 16){
    stopCounter();
    document.getElementsByClassName('moves_2')[0].textContent = moves;
    document.getElementsByClassName('star_2')[0].textContent = star;
    document.getElementsByClassName("ho")[0].textContent = hour;
    document.getElementsByClassName("mi")[0].textContent = min;
    document.getElementsByClassName("se")[0].textContent = sec;


    modal.classList.toggle("show-modal");
  }
}

// this function restarts the game and removes the modal from the screen
function restart_game (){
  restart();
  modal.classList.toggle("show-modal")
}

//josh codes
