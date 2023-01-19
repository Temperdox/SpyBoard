import { gsap } from "gsap";
gsap.registerPlugin(ScrollTrigger);
$(document).ready(function(){
  generateObservers();
  registerListeners();
  getSunTimesWithCity('Rocky Mount', 'North Carolina');
});

const sections = gsap.utils.toArray('.section')

ScrollTrigger.create({

  trigger: '.first',
  start: 'top top',
  endTrigger: '.last',
  end: 'bottom bottom',

  //snap: 1 / (sections.length - 1)

  snap: {
    snapTo: 1 / (sections.length - 1),
    duration: {min: 0.25, max: 0.75}, // the snap animation should be at least 0.25 seconds, but no more than 0.75 seconds (determined by velocity)
    delay: 0.125, // wait 0.125 seconds from the last scroll event before doing the snapping
    ease: "power1.inOut" // the ease of the snap animation ("power3" by default)
  }

})
