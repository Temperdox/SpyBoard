

let timer = null;
let lastViewed;
let inView = getElement('home-content-dash');
let lastVal = 0;
function registerListeners(){
  getElement(splash.login).addEventListener('keyup', handlePin, false);
  getElement(mainViews.home).addEventListener('scroll', animateNavBar, false);

  registerOnClicks();
}

function handlePin(event) {
  if (event.key === 'Escape') {
    {
      //Go back to the notification page, and clear the pin entered.
      resetPin();
      switchView(splash.dash);
    }
  } else if (event.key === 'Enter') {
    {
      //Log the user into the site
      validateUser();
    }
  } else if (event.key === 'Backspace') {
    {
      //Backspace a single digit value from the pin
      decrementPin();
    }
  } else if (!isNaN(Number(event.key))) {
    {
      //Add a single digit value to the pin
      console.log("Adding to pin: " + !isNaN(Number(event.key)));
      incrementPin(event.key);
    }
  }
}

function registerOnClicks() {
  console.log("registering on clicks!")
  let navGroups = getElement(null, 'nav-group');
  for (let index = 0; index < navGroups.length; index++) {
    navGroups[index].onclick = function () {
      let sections = getElement(null, 'section');
      sections[index].scrollIntoView({
        behavior: 'smooth'
      });
    }
  }
}

function getSectionIndex(sections, elementID){
  for (let index = 0; index < sections.length; index++) {
    if(sections[index].id === elementID){
      console.log("Section ID: " + sections[index].id + " || Target ID: " + elementID + " || Index: " + index);
      return index;
    }
  }
}

function asyncTimeout(resolver){
  return new Promise(resolver)
}

function generateObservers(){
  if(timer !== null) {
    clearTimeout(timer);
  }
    timer = setTimeout(function() {
      // do something
      console.log("Scrolling")
      let sections = getElement(null,'section');
      let navGroups = getElement(null, 'nav-group');
      let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          console.log("Checking: " + entry.target.id + "||" + entry.intersectionRatio);
          if(entry.intersectionRatio > .6){
            if(entry.target.id !== "") {
              let sectionIndex = getSectionIndex(sections, entry.target.id);
              document.querySelector('.nav-active').classList.remove('nav-active');
              console.log('.selector-' + entry.target.id);
              lastViewed = navGroups[sectionIndex];
              lastViewed.classList.add('nav-active');
            }
          }
        });
      }, {threshold: 1});

      for (let section of sections) {
        observer.observe(section);
      }
    }, 150);
}

async function animateNavBar(event){
  lastVal=0;
  let scrolled = getElement(mainViews.home).scrollTop;
  getElement('background').style.top = '-' + (scrolled / 17.5) + 'px';
  if(scrolled > 0 && !(getElement("home-nav-container").classList.contains("shown"))){
    getElement("home-nav-container").classList.add("shown");
  }else if(scrolled === 0 && (getElement("home-nav-container").classList.contains("shown"))){
    getElement("home-nav-container").classList.remove("shown");
  }
}

function resetScroll(){
  getElement(mainViews.home).scrollTo(0,0);
}


