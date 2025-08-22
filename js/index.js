document.addEventListener('DOMContentLoaded', () =>{
  const modal = document.querySelector('.modal');
  const closeBtn = modal.querySelector('.modal-close');
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



function setupAccordion(containerSelector, itemSelector, contentSelector) {
  const accordions = document.querySelectorAll(containerSelector);
  accordions.forEach(accordion => {
    const items = accordion.querySelectorAll(itemSelector);
    items.forEach(item => {
      const content = accordion.querySelector(contentSelector);
      item.addEventListener('click', () => {
        document.querySelectorAll(itemSelector).forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.closest(containerSelector).classList.remove('open');
            const otherContent = otherItem.closest(containerSelector).querySelector(contentSelector);
            if (otherContent) otherContent.style.maxHeight = null;
          }
        });
        toggleAccordion(accordion, content, 'open');
      });
    });
  });
}

function toggleAccordion(header, content, toggleSelector) {
  const isOpen = header.classList.contains(toggleSelector);

  header.classList.toggle(toggleSelector, !isOpen);
  content.style.maxHeight = isOpen ? null : content.scrollHeight + 'px';
}

const productData = {
  id: "product1",
  title: "Nike Air Max Plus",
  description: "Let your attitude have the edge in your Nike Air Max Plus, a Tuned Air experience that offers premium stability and unbelievable cushioning. ",
  defaultColor: "white",
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
let mainImage = productData.variants[selectedColor].images[0];

const card = document.querySelector('.product-card');
const mainImgEl = card.querySelector('.main-image img');
const galleries = card.querySelectorAll('.product-gallery');
const titleEl = card.querySelector('.product-title');
const priceEl = card.querySelector('.product-price');
const descriptionEl = card.querySelector('.product-description');
const colorsButtons = card.querySelectorAll('.color-button');
const sizesButtons = card.querySelectorAll('.size-options button');
const addToCartBtn = card.querySelector('.add-to-cart');

function init (){
  titleEl.textContent = productData.title;
  descriptionEl.textContent = productData.description;
  card.querySelector(`.color-options button[data-color="${selectedColor}"]`).classList.add('active');
  loadGallery(selectedColor);
  renderColorOptionsImgs();
  updatePrice(selectedColor);
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

function loadGallery (color) {
  const galleryEl = card.querySelector(`.product-gallery[data-color="${color}"]`)
  console.log(galleryEl)

  if(galleryEl.childElementCount === 0){
    productData.variants[color].images.forEach((imgURL, id) => {
      const imgContainer = document.createElement('div');
      imgContainer.classList.add('image-container');
      const imgEl = document.createElement('img');
      imgEl.dataset.src = imgURL;
      imgEl.src = imgURL;
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
  }

  const firstImg = galleryEl.querySelector("img");
  if (firstImg) {
    mainImgEl.src = firstImg.dataset.src;
    mainImgEl.alt = `${productData.title} - ${color}`;
  }

  galleryEl.querySelectorAll("img").forEach(img => img.classList.remove("active"));
  firstImg.classList.add("active");
}

colorsButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    selectedColor = btn.dataset.color;
    console.log(selectedColor);

    galleries.forEach(gallery => gallery.classList.add('hidden'));
    const currentGallery = card.querySelector(`.product-gallery[data-color="${selectedColor}"]`);
    currentGallery.classList.remove('hidden');

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


// function renderProductCard () {
//   const variant = productData.variants[selectedColor];
//   console.log(variant)
//   const {title, description, id} = productData;
//   titleEl.textContent = title;
//   priceEl.textContent = `$ ${variant.price}`;
//   descriptionEl.textContent = description;
//
//   mainImgEl.src = mainImage;
//   mainImgEl.alt = `${title} - ${selectedColor}`;
//
//   galleryEl.innerHTML = '';
//   variant.images.forEach(image => {
//     const imgEl = document.createElement('img');
//     imgEl.src = image;
//     imgEl.alt = `${title} - ${selectedColor}`;
//     imgEl.classList.add('gallery-img');
//     if (image === mainImage) imgEl.classList.add('active');
//     imgEl.addEventListener('click', () => {
//       mainImage.src = image;
//       renderProductCard();
//     })
//     galleryEl.appendChild(imgEl);
//   })
//
//   colorsEl.innerHTML = '';
//   Object.keys(productData.variants).forEach(color => {
//     const btn = document.createElement('button');
//     btn.textContent = color;
//     btn.classList.add('color-btn')
//     if (color === mainImage) btn.classList.add('active');
//     btn.addEventListener('click', () => {
//       selectedColor = color;
//       mainImage = productData.variants[color].images[0];
//       selectedSize = null;
//       renderProductCard();
//     })
//     colorsEl.appendChild(btn);
//   })
//
//   sizesEl.innerHTML = ''
//   variant.sizes.forEach(size => {
//     const btn = document.createElement('button');
//     btn.textContent = size;
//     btn.classList.add('size-btn')
//     if (size === selectedSize) btn.classList.add('active');
//     btn.addEventListener("click", () => {
//       selectedSize = size;
//       renderProductCard();
//     });
//     sizesEl.appendChild(btn);
//   })
//
//
//
// }
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  alert('Thank You!');
  contactForm.reset();
})

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

const currentYear = new Date().getFullYear();
document.getElementById('copyrightYear').innerText = currentYear;

//toggle Mobile Navigation
const navigation = document.querySelector('.navbar-nav');
const navigationBtn = document.querySelector('.navbar-toggler');

navigationBtn.addEventListener('click', ()=> {
  toggleAccordion(navigation, navigation, 'show')
})


setupAccordion('.footer-menu', '.footer-nav-title', '.footer-nav-list');
setupAccordion('.question-item', '.question-title', '.answer-text');
// renderProductCard();
init();