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
      images: ["img/product/white-sneakers-side-view.webp", "img/product/white-sneakers-bottom-view.webp", "img/product/white-sneakers-side-view-2.webp", "img/product/white-sneakers-top-view.webp", "img/product/white-sneakers-front-view.webp"],
      sizes: ['UK 5.5', 'UK 6(EU 39)', 'UK 6(EU 40)', 'UK 6.5', 'UK 7', 'UK 7.5']
    },
    black: {
      price: 320.00,
      images: [],
      sizes: ['UK 5.5', 'UK 6(EU 39)', 'UK 6(EU 40)', 'UK 6.5', 'UK 7', 'UK 7.5']
    },
    pink: {
      price: 260.00,
      images: [],
      sizes: ['UK 5.5', 'UK 6(EU 39)', 'UK 6(EU 40)', 'UK 6.5', 'UK 7', 'UK 7.5']
    }
  }



}

let selectedColor = productData.defaultColor;
let selectedSize = null;
let mainImage = productData.variants[selectedColor].images[0];

const card = document.querySelector('.product-card');
const mainImgEl = card.querySelector('.main-image img');
const galleryEl = card.querySelector('.product-gallery');
const titleEl = card.querySelector('.product-title');
const priceEl = card.querySelector('.product-price');
const descriptionEl = card.querySelector('.product-description');
const colorsEl = card.querySelector('.color-options');
const sizesEl = card.querySelector('.size-options');
const addToCartBtn = card.querySelector('.add-to-cart');

function renderProductCard () {
  const variant = productData.variants[selectedColor];
  console.log(variant)
  const {title, description, id} = productData;
  titleEl.textContent = title;
  priceEl.textContent = `$ ${variant.price}`;
  descriptionEl.textContent = description;

  mainImgEl.src = mainImage;
  mainImgEl.alt = `${title} - ${selectedColor}`;

  galleryEl.innerHTML = '';
  variant.images.forEach(image => {
    const imgEl = document.createElement('img');
    imgEl.src = image;
    imgEl.alt = `${title} - ${selectedColor}`;
    imgEl.classList.add('gallery-img');
    if (image === mainImage) imgEl.classList.add('active');
    imgEl.addEventListener('click', () => {
      mainImage.src = image;
      renderProductCard();
    })
    galleryEl.appendChild(imgEl);
  })

  colorsEl.innerHTML = '';
  Object.keys(productData.variants).forEach(color => {
    const btn = document.createElement('button');
    btn.textContent = color;
    btn.classList.add('color-btn')
    if (color === mainImage) btn.classList.add('active');
    btn.addEventListener('click', () => {
      selectedColor = color;
      mainImage = productData.variants[color].images[0];
      selectedSize = null;
      renderProductCard();
    })
    colorsEl.appendChild(btn);
  })

  sizesEl.innerHTML = ''
  variant.sizes.forEach(size => {
    const btn = document.createElement('button');
    btn.textContent = size;
    btn.classList.add('size-btn')
    if (size === selectedSize) btn.classList.add('active');
    btn.addEventListener("click", () => {
      selectedSize = size;
      renderProductCard();
    });
    sizesEl.appendChild(btn);
  })



}




const currentYear = new Date().getFullYear();
document.getElementById('copyrightYear').innerText = currentYear;

//toggle Mobile Navigation
const navigation = document.querySelector('.navbar-collapse');
const navigationBtn = document.querySelector('.navbar-toggler');

navigationBtn.addEventListener('click', ()=> {
  toggleAccordion(navigation, navigation, 'show')
})


setupAccordion('.footer-menu', '.footer-nav-title', '.footer-nav-list');
setupAccordion('.question-item', '.question-title', '.answer-text');
renderProductCard();