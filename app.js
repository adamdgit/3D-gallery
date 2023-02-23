const perspective = document.querySelector('.perspective');
const wrapper = document.querySelector('.wrap');
const images = document.querySelectorAll('.img');
// lower rotates more quickly
const sensitivity = 4;
// save previous rotation
let prevdeg = 0;
// current rotation
let deg = 0;

// set default rotation
images.forEach((image, i) => {
  image.style.transform = `rotate3D(0,1,0,${(i+1)*45}deg) translateZ(40vh)`;
})

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
    console.log(deg)
    totalDeg = deg+prevdeg+45;

    function rotateGallery() {
      updateImgVisibility(totalDeg);
      images.forEach((image, i) => {
        image.style.transform = `rotate3D(0,1,0,${totalDeg + (i)*45}deg) translateZ(40vh)`;
      })
      perspective.style.cursor = 'grabbing';
    }

    window.requestAnimationFrame(() => {
      rotateGallery(e);
    });
  };

  // save current rotation value
  prevdeg += deg;

  perspective.addEventListener('pointerup', handlePointerUp)

  // remove pointermove event listener on pointerup
  function handlePointerUp(e) {
    perspective.removeEventListener('pointermove', handlePointerMove)
    perspective.style.cursor = 'grab';
  };

};

function updateImgVisibility(totalDeg) {

  // check every 2 degrees for performance
  if (totalDeg % 2 === 0) 

  // when rotation is > 275 and < 80 the image should be hidden
  images.forEach((image) => {
    if (Math.abs(image.style.transform.split(" ")[3].slice(0, -4) % 360) > 275 
    || Math.abs(image.style.transform.split(" ")[3].slice(0, -4) % 360) < 80) {
      image.style.opacity = '0';
    } else {
      image.style.opacity = '1';
    }
  })
  
};