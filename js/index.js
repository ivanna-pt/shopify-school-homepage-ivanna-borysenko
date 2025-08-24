let prevScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  if (currentScroll <= 0){
    header.classList.remove('hidden');
  } else if(currentScroll > prevScroll){
    header.classList.add('hidden');
  } else {
    header.classList.remove('hidden');
  }
  prevScroll=currentScroll;
})

document.addEventListener('DOMContentLoaded', () =>{
  const modal = document.querySelector('.modal');
  const closeBtn = modal.querySelector('.modal-close-btn');
  const form = modal.querySelector('.modal-form');

  setTimeout(()=>{
    modal.style.display = 'flex';
  }, 1000)

  closeBtn.addEventListener('click', ()=>{
    modal.style.display = 'none';
  })

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    modal.style.display = 'none';
    form.reset();
  })
})

const HeroSwiper = new Swiper('.swiper.hero-slider', {
  speed: 400,
  spaceBetween: 100,
  autoplay: {
    delay: 5000,
  },
  direction: 'horizontal',
  loop: true,
  pagination: {
    el: '.swiper-pagination',
  }
});

const collectionSwiper = new Swiper('.swiper.collection-slider',{
  slidesPerView: 'auto',
  spaceBetween: 16,
  grid: {
    rows: 1,
    fill: 'row'
  },
  breakpoints: {
    768: {
      // slidesPerView: 2.5,
      spaceBetween: 20,
      grid: {
        rows: 1,
      },
    },
    1280: {
      slidesPerView: 4,
      spaceBetween: 24,
      grid: {
        rows: 1,
      },
    }
  },
  navigation: {
    nextEl: '.swiper-button-next-custom',
    prevEl: '.swiper-button-prev-custom',
  }
});

const productData = {
  id: "product1",
  title: "Nike Air Max Plus",
  description: "Let your attitude have the edge in your Nike Air Max Plus, a Tuned Air experience that offers premium stability and unbelievable cushioning. ",
  defaultColor: "pink",
  variants: {
    white: {
      price: 280.00,
      images: ["img/product/white-sneakers-side-view.webp", "img/product/white-sneakers-bottom-view.webp", "img/product/white-sneakers-side-view-2.webp", "img/product/white-sneakers-top-view.webp", "img/product/white-sneakers-front-view.webp"]
    },
    black: {
      price: 320.00,
      images: ["img/product/black-sneakers-1.webp","img/product/black-sneakers-2.webp","img/product/black-sneakers-3.webp","img/product/black-sneakers-4.webp","img/product/black-sneakers-5.webp",]
    },
    pink: {
      price: 260.00,
      images: ["img/product/pink-sneakers-1.webp","img/product/pink-sneakers-2.webp","img/product/pink-sneakers-3.webp","img/product/pink-sneakers-4.webp","img/product/pink-sneakers-5.webp",]
    }
  }
}

let selectedColor = productData.defaultColor;
let selectedSize = null;

const card = document.querySelector('.product-card');
const mainImgEl = card.querySelector('.main-image img');
const titleEl = card.querySelector('.product-title');
const priceEl = card.querySelector('.product-price');
const descriptionEl = card.querySelector('.product-description');
const colorsButtons = card.querySelectorAll('.color-button');
const sizesButtons = card.querySelectorAll('.size-options button');

function init (){
  titleEl.textContent = productData.title;
  descriptionEl.textContent = productData.description;
  card.querySelector(`.color-options button[data-color="${selectedColor}"]`).classList.add('active');
  loadGallery(selectedColor);
  renderColorOptionsImgs();
  updatePrice(selectedColor);
}

function loadGallery (color) {
  const galleryEl = card.querySelector('.product-gallery');
  galleryEl.innerHTML = '';

    productData.variants[color].images.forEach((imgURL, id) => {
      const imgContainer = document.createElement('div');
      imgContainer.classList.add('image-container');
      const imgEl = document.createElement('img');
      imgEl.dataset.src = imgURL;
      imgEl.src = imgURL;
      imgEl.width = 88;
      if (id === 0) imgContainer.classList.add("active");
      imgContainer.appendChild(imgEl);
      galleryEl.appendChild(imgContainer);
    });

    galleryEl.addEventListener('click', (e) =>{
      if (e.target.tagName === 'IMG'){
        mainImgEl.src = e.target.dataset.src;
        galleryEl.querySelectorAll('.image-container').forEach(image => image.classList.remove('active'));
        e.target.closest('.image-container').classList.add('active');
      }
    })


  const firstImg = galleryEl.querySelector("img");
  if (firstImg) {
    mainImgEl.src = firstImg.dataset.src;
    mainImgEl.alt = `${productData.title} - ${color}`;
  }
  //
  // galleryEl.querySelectorAll("img").forEach(img => img.classList.remove("active"));
  // firstImg.classList.add("active");
}

function updatePrice (color) {
  priceEl.textContent = `$ ${productData.variants[color].price}`
}

function renderColorOptionsImgs () {
  colorsButtons.forEach(btn => {
    const imgEl = document.createElement('img');
    const color = btn.ariaLabel;
    const imgUrl = productData.variants[color].images[0]
    imgEl.src = imgUrl;
    imgEl.alt = color + " color option";
    btn.appendChild(imgEl);
  })
}

colorsButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    selectedColor = btn.dataset.color;

    loadGallery(selectedColor);
    updatePrice(selectedColor);

    selectedSize = null;
    card.querySelectorAll('.size-options button').forEach(b => b.classList.remove('active'));

    colorsButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  })
})

sizesButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    selectedSize = btn.dataset.size;
    sizesButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  })
})



const currentYear = new Date().getFullYear();
document.getElementById('copyrightYear').innerText = currentYear.toString();


function toggleItem(item, triggerSelector, contentSelector, toggleClass = 'open') {
  const trigger = item.querySelector(triggerSelector);
  const content = item.querySelector(contentSelector);
  const isOpen = item.classList.contains(toggleClass);

  item.classList.toggle(toggleClass, !isOpen);

  if (trigger) {
    trigger.setAttribute('aria-expanded', String(!isOpen));
  } else {
    item.setAttribute('aria-expanded', String(!isOpen));
  }
  if (content) {
    content.setAttribute('aria-hidden', String(isOpen));
    content.style.maxHeight = isOpen ? null : content.scrollHeight + 'px';
  }
}

//toggle Mobile Navigation
const navigation = document.querySelector('header .nav');
navigation.querySelector('.nav-toggler').addEventListener('click', () => {
  toggleItem(navigation, '.nav-toggler', '.nav-list', 'show');
})

document.querySelectorAll('.question-item').forEach(item => {
  const trigger = item.querySelector('.question-title');

  trigger.addEventListener('click', ()=>{
    document.querySelectorAll('.question-item').forEach(other => {
      if (other !== item) {
        const otherTrigger = other.querySelector('.question-title');
        const otherContent = other.querySelector('.answer-text');
        other.classList.remove('open');
        if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
        if (otherContent) {
          otherContent.setAttribute('aria-hidden', 'true');
          otherContent.style.maxHeight = null;
        }
      }
    });

    toggleItem(item, '.question-title', '.answer-text');
  })
})

document.querySelectorAll('.footer-menu').forEach(menu => {
  const trigger = menu.querySelector('.footer-nav-title');

  trigger.addEventListener('click', ()=>{
    toggleItem(menu, '.footer-nav-title', '.footer-nav-list');
  })
})

const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  alert('Thank You!');
  contactForm.reset();
})

init();