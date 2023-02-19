const perspective = document.querySelector('.perspective');
const wrapper = document.querySelector('.wrap')

const sensitivity = 5

perspective.addEventListener('pointerdown', handlePointerDown);

function handlePointerDown(e) {
  e.preventDefault();
  perspective.addEventListener('pointermove', handlePointerMove)
  perspective.addEventListener('pointerup', handlePointerUp)
};

// transform rotation of wrapper 
function handlePointerMove(e) {
  console.log(e)

  function rotateGallery(element, y, x) {
    let box = element.getBoundingClientRect();
    let xAxis = -(y - box.y - (box.height / 2)) / sensitivity;
    let yAxis = (x - box.x - (box.width / 2)) / sensitivity;
    let deg = (xAxis + yAxis) / 4
  
    wrapper.style.transform = `translateZ(520px) rotateY(${deg}deg)`;
  }

  window.requestAnimationFrame(() => {
    rotateGallery(wrapper, e.clientY, e.clientX);
  });
};

// removed pointermove event listener on pointerup
function handlePointerUp(e) {
  perspective.removeEventListener('pointermove', handlePointerMove)
};