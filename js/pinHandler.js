let pin = ["","","",""];
let index = 0;

/*let mysql = require('mysql');*/
const saltRounds = 10;
let pinInputs = document.getElementsByClassName('pin');

function focusOnPin(){
  getElement("pin-hidden-input").focus();
}
function resetPin(){
  pin = ["","","",""];
  index = 0;
  for (let i = 0; i < pinInputs.length; i++) {
    pinInputs[i].children[0].innerHTML = pin[i];
    pinInputs[i].children[0].classList.remove('hidden-pin');
    pinInputs[i].classList.remove('blink');
  }
  pinInputs[0].classList.add('blink');
}

function decrementPin(){
  console.log("decrementing pin");
  index-- === 0 ? index = 0 : index;
  pinInputs[index].classList.add('blink');
  pinInputs[index].children[0].classList.remove('hidden-pin');
  if(index < pinInputs.length-1){
    pinInputs[index+1].classList.remove('blink');
  }
  /*if(index === 0){
    pinInputs[index].children[0].classList.remove('hidden-pin');
    pinInputs[index].classList.add('blink');
  }else{
    console.log("removing hidden pin")
    pinInputs[index+1].children[0].classList.remove('hidden-pin');
    pinInputs[index].classList.add('blink');
  }*/
}

function incrementPin(input){
  index++ === pin.length ? index = pin.length : index;
  pin[index-1] = input;
  pinInputs[index-1].classList.remove('blink');
  pinInputs[index-1].children[0].classList.add('hidden-pin');
  if(index === pin.length) {
    pinInputs[index-1].classList.remove('blink');
  }else{
    pinInputs[index].classList.add('blink');
  }
}

function validateUser(){
  let pass = pin.join("");
  let hash;

  if(pass.length < 4 || !(pass === "8199")){
    invalidPin();
  }else{
    resetPin();
    switchView(home.content);
    getElement('home-dash-header').children[1].innerHTML = 'FCA3 Babcock';
  }
}

function invalidPin(){
  resetPin();
  for (let pinInput of pinInputs) {
    pinInput.classList.add('error');
    getElement('pin-container').classList.add('shake');
  }
  setTimeout(() => {
    for (let pinInput of pinInputs) {
      pinInput.classList.remove('error');
    }
    getElement('pin-container').classList.remove('shake');
  }, 1500);
  focusOnPin();
}
