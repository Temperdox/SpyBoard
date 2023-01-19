mainViews = {
  //Enumerator containing the IDs for HTML objects that will fade in or out.
  splash : "splash",
  home : "home"
}

splash = {
  //Enumerator containing the IDs for HTML objects that will fade in or out.
  dash : "splash-dash",
  login : "splash-login",
  signup: "splash-signup"
}

home = {
  settings_container: "home-settings-container",
  content: "home-content"
}

function resetViews(){
  let elements = getElement(null, "view");
  for (let index = 0; index < elements.length; index++) {
    hideElement(elements[index]);
  }
}

function getElement(cssID, cssClass){
  let targetElement;
  if(cssClass == null){
    targetElement = document.getElementById(cssID);
  }else{
    targetElement = document.getElementsByClassName(cssClass);
  }
  return targetElement;
}

function showElement(elementID){
  let element = getElement(elementID);
  element.classList.add('active-view');
  if(element.id === splash.login || element.id === splash.signup &&
    !(getElement('background').classList.contains('background-resized'))){
    getElement('background').classList.add('background-resized');
    document.getElementById("pin-hidden-input").focus();
  }else{
    getElement('background').classList.remove('background-resized');
  }
}

function hideElement(element){
  element.classList.remove('active-view');
}

function switchView(view){
  let trim = view.split('-')[0];
  resetViews();
  if(trim === 'home'){
    showElement(mainViews.home);
  }else{
    showElement(mainViews.splash);
  }
  showElement(view);
}
