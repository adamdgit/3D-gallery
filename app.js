const perspective = document.querySelector('.perspective');
const wrapper = document.querySelector('.wrap');
const images = document.querySelectorAll('.img');
// lower rotates more quickly
const sensitivity = 4;
// save previous rotation
let prevdeg = 0;
// current rotation
let deg = 0;
// first image changes to visible
let counter1 = 0;
// this images becomes hidden as it moves off screen
let counter2 = 3;

perspective.addEventListener('pointerdown', handlePointerDown);

function handlePointerDown(e) {
  // cancel pointerdown event
  e.preventDefault();
  // get mouse pos on click
  const x = e.clientX;

  // rotate the gallery
  perspective.addEventListener('pointermove', handlePointerMove)

  // transform rotation of wrapper on mouse move
  function handlePointerMove(e) {

    deg = (e.clientX - x) / sensitivity;
    updateImgVisibility()

    function rotateGallery(e) {
      wrapper.style.transform = `translateZ(55vw) rotateY(${deg + prevdeg +60}deg) rotate(-3deg)`;
      perspective.style.cursor = 'grabbing';
    }

    window.requestAnimationFrame(() => {
      rotateGallery(e);
    });

  };

  // save current rotation value
  prevdeg += deg;

  perspective.addEventListener('pointerup', handlePointerUp)
  // removed pointermove event listener on pointerup
  function handlePointerUp(e) {
    perspective.removeEventListener('pointermove', handlePointerMove)
    perspective.style.cursor = 'grab';
  };
};

function updateImgVisibility() {

  // every 30 degrees image[counter1] becomes visible - images[0] visible
  // and image[counter2] becomes hidden - images[3] hidden
  // increment counter1
  // decrement counter2

  let temp = deg+prevdeg%360;
  if(temp % 30 === 0 && temp > 0) {
    console.log(images[counter1])
    images[counter1].style.visibility = 'visible';
    counter1 --;
    if (counter1 < 0) counter1 = 5
  }
  if(temp % 30 === 0 && temp < 0) {
    console.log(images[counter2])
    images[counter2].style.visibility = 'hidden';
    counter2 ++;
    if (counter2 > 5) counter2 = 0
  }
}