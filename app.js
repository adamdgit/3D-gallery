const perspective = document.querySelector('.perspective');
const wrapper = document.querySelector('.wrap')

// lower rotates more quickly
const sensitivity = 4;
// save previous rotation
let prevdeg = 0;
// current rotation
let deg = 0;

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

    function rotateGallery(e) {
      deg = (e.clientX - x) / sensitivity;
      console.log(prevdeg)
      wrapper.style.transform = `translateZ(50vw) rotateY(${deg + prevdeg}deg) rotate(-3deg)`;
    }
    // 
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
  };
};
