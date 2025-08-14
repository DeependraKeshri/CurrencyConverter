const modal = document.getElementById("customModal");
const openBtn = document.getElementById("openModalBtn");
const closeBtn = document.getElementById("closeModalBtn");
const cancelBtn = document.getElementById("cancelBtn");
const cancel = document.getElementById("cancel");
openBtn.addEventListener("click", () => {
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
});

function closeModal() {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

closeBtn.addEventListener("click", closeModal);
cancelBtn.addEventListener("click", closeModal);
cancel.addEventListener("click", closeModal);


  const track = document.getElementById('sliderTrack');
  const originalSlides = document.querySelectorAll('.slide');
  const dotsContainer = document.getElementById('dots');

  const slideWidth = 220;
  const slideMargin = 45;
  const visibleSlides = 3;
  let currentIndex = 0;
  for (let i = 0; i <= visibleSlides; i++) {
    const clone = originalSlides[i].cloneNode(true);
    track.appendChild(clone);
  }

  const allSlides = document.querySelectorAll('.slide');
  const totalSlides = allSlides.length;
  const stepCount = visibleSlides;
  dotsContainer.innerHTML = '';
  for (let i = 0; i < originalSlides.length - visibleSlides ; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dotsContainer.appendChild(dot);
  }
  const dots = document.querySelectorAll('.dot');

  function updateDots(index) {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index % dots.length].classList.add('active');
  }

  function moveSlider() {
    currentIndex++;
    track.style.transition = 'transform 0.6s ease-in-out';
    const translateX = (slideWidth + slideMargin) * currentIndex;
    track.style.transform = ` translateX(-${translateX}px)`;

    updateDots(currentIndex);

    if (currentIndex === stepCount) {
      setTimeout(() => {
        track.style.transition = 'none';
        currentIndex = 0;
        track.style.transform = `translateX(0px)`;
        updateDots(currentIndex);
      }, 600);
    }
  }

  setInterval(moveSlider, 3000);


