'use strict';

const dealsContainer = document.querySelectorAll('.products')[1];
const categoryContainer = document.querySelector('.categories');
const newProductForm = document.getElementById('new-product');

/////////////////////////////////////////////////////////////////////////////////////

//Init Swiper
const swiper = new Swiper('.swiper', {
  // Optional parameters
  loop: true,

  autoplay: {
    delay: 2000,
  },

  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },

  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});

/////////////////////////////////////////////////////////////////////////////////////
// Activating Mouse Wheel to scroll the products slider
const scrollContainer = document.querySelectorAll('.products');
for (const item of scrollContainer) {
  item.addEventListener('wheel', (evt) => {
    evt.preventDefault();
    item.scrollLeft += evt.deltaY;
  });
}

/////////////////////////////////////////////////////////////////////////////////////

// fetching Products & Categories for Box-Row Container

// Function to fetch data, filter, and generate HTML template
function fetchDataAndGenerateTemplate(
  url,

  // templateCallback,
  container,
  filterCallback = null,
  imageArr = null
) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      let filteredData = data;

      if (imageArr) {
        console.log('image arr here');
        if (Array.isArray(data)) {
          filteredData = data?.filter((products, idx) => {
            if (idx < Infinity) return products;
          });
        }

        let template = '';
        filteredData?.forEach((item, idx) => {
          products.push({ id: item.id, quantity: 0 });
          template += `<div>
            <div onclick="productIDHandler(${item.id})" class="product-card">
              <div class="product-img-container">
                <img src="${item.image}" alt="">
              </div>
              <div class="product-offer">
                <p>27% off</p>
                <span>Deal</span>
              </div>
              <p class="product-price">$ <span>14.49</span> List Price:${
                item.price
              }</p>
              <div class="title-btn-container">
                <h4>${String(item?.title).split(' ').slice(0, 2).join(' ')}</h4>
              </div>
            </div>
            <div>
            <div class="decIncBtns">
              <button class="cartProd-DetailsBtn" onclick="handleAddToCart(${
                item.id
              })">add to cart</button>
                <button class="decBtn" onclick="decreaseQuantity(${
                  item.id
                })"><i class="decBtnArrow fa-regular fa-square-caret-left"></i></button>
                <span class="reqQty reqQty-${item.id}">${
            products[idx].quantity
          }</span>
                <button class="incBtn" onclick="increaseQuantity(${
                  (item.id, idx + 1)
                })"><i class="incBtnArrow fa-regular fa-square-caret-right"></i></button>
              </div>
            </div>
          </div>
        `;
        });
        container.insertAdjacentHTML('afterbegin', template);
      } else {
        if (Array.isArray(data)) {
          filteredData = data?.filter((products, idx) => {
            if (idx < Infinity) return products;
          });
        }
        localStorage.setItem('filteredData', JSON.stringify(filteredData));
        let template = '';
        filteredData.forEach((item, idx) => {
          products.push({ id: item.id, quantity: 0 });
          template += `<div>
            <div onclick="productIDHandler(${item.id})" class="product-card">
              <div class="product-img-container">
                <img src="${item.image}" alt="">
              </div>
              <div class="product-offer">
                <p>27% off</p>
                <span>Deal</span>
              </div>
              <p class="product-price">$ <span>14.49</span> List Price:${
                item.price
              }</p>
              <div class="title-btn-container">
                <h4>${String(item.title).split(' ').slice(0, 2).join(' ')}</h4>
              </div>
            </div>
            <div>
            <div class="decIncBtns">
              <button class="cartProd-DetailsBtn" onclick="handleAddToCart(${
                item.id
              })">add to cart</button>
                <button class="decBtn" onclick="decreaseQuantity(${
                  item.id
                })"><i class="decBtnArrow fa-regular fa-square-caret-left"></i></button>
                <span class="reqQty reqQty-${item.id}">${
            products[idx].quantity
          }</span>
                <button class="incBtn" onclick="increaseQuantity(${
                  (item.id, idx + 1)
                })"><i class="incBtnArrow fa-regular fa-square-caret-right"></i></button>
              </div>
            </div>
          </div>
        `;
        });
        // container.insertAdjacentHTML('afterbegin', template);
        container.innerHTML += template;
      }
    });
}

// Template callback function for products

let products = [];

function decreaseQuantity(productId, quantity) {
  const product = products.find((prod) => prod.id === productId);
  if (product && product.quantity > 0) {
    product.quantity--;
    updateQuantityDisplay(productId);
  }
}

function increaseQuantity(productId, idx) {
  const product = products.find((prod) => prod.id === productId);
  if (product) {
    product.quantity++;
    updateQuantityDisplay(productId);
    // handleAddToCart(idx);
  }
}
const updateQuantityDisplay = (productId) => {
  const product = products.find((prod) => prod.id === productId);
  if (product) {
    const quantityDisplay = document.querySelector(`.reqQty-${productId}`);
    if (quantityDisplay) {
      quantityDisplay.textContent = product.quantity;
    }
  }
};
let cartArr = [];

function handleAddToCart(prodID) {
  let userID = localStorage.getItem('userID');

  let product = products.find((prod) => prod.id === prodID);
  if (product && product.quantity > 0) {
    cartArr.push(product);
  }

  // products[prodIdx].quantity++;

  // let requestBody = { userID, date: dateSetter(), products: productsArr };
  updateCartUI(cartArr);
}

document.addEventListener('DOMContentLoaded', function () {
  updateCartTotalQuantity();
});

const listCartHtml = document.querySelector('.listCart');

function updateCartUI(cartItems) {
  listCartHtml.innerHTML = '';

  fetch('https://fakestoreapi.com/products')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch product details');
      }
      return response.json();
    })
    .then((data) => {
      Array.isArray(cartItems) &&
        data
          .filter(
            (prod, idx) =>
              prod.id == cartItems.find((item) => item.id == prod.id)?.id
          )
          .map(({ id, title, image }, idx) => ({
            title,
            image,
            quantity: cartItems.find(({ id: itemID }) => itemID == id)
              ?.quantity,
          }))
          .forEach((product) => {
            let cartItemHTML = `<div class="cart-item-container">
            <img class="cart-item-img" src="${
              product?.image
            }" alt="Product Image">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${String(product.title)
                  .split(' ')
                  .slice(0, 2)
                  .join(' ')}</h4>
                  <div class="quantity-container">
                  <button class="quantity-btn cartplusicon">+</button>
                    <span class="quantity cartquantity">${
                      product.quantity
                    }</span>
                    
                    <button class="quantity-btn cartminusicon">-</button>
                    <button class="del-cartBtn">
  
                    <div class="deliconsign">
                    <svg fill="#fff" height="200px" width="200px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 330 330" xml:space="preserve" stroke="#fff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="XMLID_6_"> <g id="XMLID_11_"> <path d="M240,121.076H30V275c0,8.284,6.716,15,15,15h60h37.596c19.246,24.348,49.031,40,82.404,40c57.897,0,105-47.103,105-105 C330,172.195,290.816,128.377,240,121.076z M225,300c-41.355,0-75-33.645-75-75s33.645-75,75-75s75,33.645,75,75 S266.355,300,225,300z"></path> </g> <g id="XMLID_18_"> <path d="M240,90h15c8.284,0,15-6.716,15-15s-6.716-15-15-15h-30h-15V15c0-8.284-6.716-15-15-15H75c-8.284,0-15,6.716-15,15v45H45 H15C6.716,60,0,66.716,0,75s6.716,15,15,15h15H240z M90,30h90v30h-15h-60H90V30z"></path> </g> <g id="XMLID_23_"> <path d="M256.819,193.181c-5.857-5.858-15.355-5.858-21.213,0L225,203.787l-10.606-10.606c-5.857-5.858-15.355-5.858-21.213,0 c-5.858,5.858-5.858,15.355,0,21.213L203.787,225l-10.606,10.606c-5.858,5.858-5.858,15.355,0,21.213 c2.929,2.929,6.768,4.394,10.606,4.394c3.839,0,7.678-1.465,10.607-4.394L225,246.213l10.606,10.606 c2.929,2.929,6.768,4.394,10.607,4.394c3.839,0,7.678-1.465,10.606-4.394c5.858-5.858,5.858-15.355,0-21.213L246.213,225 l10.606-10.606C262.678,208.535,262.678,199.039,256.819,193.181z"></path> </g> </g> </g></svg></div>
  
                    <div class="del-cartBtntext">Delete</div>
                  </button>
                </div>
            </div>
        </div>
            `;
            let tempDiv = document.createElement('div');
            tempDiv.innerHTML = cartItemHTML;
            listCartHtml.appendChild(tempDiv.firstChild);
          });
    });
  updateCartTotalQuantity();
}

function updateCartTotalQuantity() {
  //The following to show the total number of items added to cart

  const totalQuantity = cartArr.length;
  const cartTotalQtyElement = document.querySelector('.cartTotalQty');
  if (cartTotalQtyElement) {
    cartTotalQtyElement.textContent = totalQuantity.toString();
  }

  //the following to show the total items quantity in the red circle
  // const totalQuantity = cartArr.reduce(
  //   (total, item) => total + item.quantity,
  //   0
  // );
  // const cartTotalQtyElement = document.querySelector('.cartTotalQty');
  // if (cartTotalQtyElement) {
  //   cartTotalQtyElement.textContent = totalQuantity.toString();
  // }
}

/////////////////////////////////////////////////////////////////////////

function productTemplate(product, idx) {
  products.push({ id: product.id, quantity: 0 });

  return `
    <div>
      <div onclick="productIDHandler(${product.id})" class="product-card">
        <div class="product-img-container">
          <img src="${product.image}" alt="">
        </div>
        <div class="product-offer">
          <p>27% off</p>
          <span>Deal</span>
        </div>
        <p class="product-price">$ <span>14.49</span> List Price:${
          product.price
        }</p>
        <div class="title-btn-container">
          <h4>${product.title.split(' ').slice(0, 2).join(' ')}</h4>
        </div>
      </div>
      <div>
      <div class="decIncBtns">
        <button class="cartProd-DetailsBtn" onclick="handleAddToCart(${
          product.id
        })">add to cart</button>
          <button class="decBtn" onclick="decreaseQuantity(${
            product.id
          })"><i class="decBtnArrow fa-regular fa-square-caret-left"></i></button>
          <span class="reqQty reqQty-${product.id}">${
    products[idx].quantity
  }</span>
          <button class="incBtn" onclick="increaseQuantity(${
            (product.id, idx + 1)
          })"><i class="incBtnArrow fa-regular fa-square-caret-right"></i></button>
          </div>
          </div>
          </div>
          `;
}
let cart = [];

// const totalQuantity = cart.reduce(
//   (total, product) => total + product.quantity,
//   0
// );
// document.querySelector('.cartTotalQty').textContent = cart.length;
// }
function addItemQuantity(productId) {
  let cartItems = JSON.parse(localStorage.getItem('cart'));
  let product = JSON.parse(localStorage.getItem('filteredData'));
  const newProduct = product.find((prod) => prod.id === productId);
  let existingItem;
  if (cartItems.length) {
    existingItem = cartItems.find((item) => item.prodId === productId);
  }

  if (existingItem) {
    if (existingItem.quantity >= 30) {
      existingItem.quantity = existingItem.quantity;
    }
    existingItem.quantity++;
  } else {
    cart.push({
      prodId: newProduct.id,
      quantity: 1,
    });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
}

function deductItemQuantity(productId) {
  let cartItems = JSON.parse(localStorage.getItem('cart'));
  const product = products.find((product) => product.id === productId);

  const existingItem = cartItems.find((item) => item.id === productId);

  if (existingItem) {
    if (existingItem.quantity <= 30) {
      existingItem.quantity = existingItem.quantity;
    }
    existingItem.quantity++;
  } else {
    cart.push({
      id: product.id,
      quantity: 1,
    });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
}

//////////////////////////////////////////////////////////

//Function to get the product details into a separate new page
function productIDHandler(productID) {
  localStorage.setItem('productID', JSON.stringify(productID));

  window.location.href = 'productDetails.html';
}

// Template callback function for categories
function categoryTemplate(category, imageArr, idx) {
  return `
    <div class="box-col">
      <h3>${category}</h3>
      <img src=${imageArr[idx]} alt="${category}">
      <a href="/">Shop More</a>
    </div>`;
}

let imageArr = [
  '/assets/electronics.jpeg',
  '/assets/jewelery.jpeg',
  '/assets/menClothing.jpeg',
  '/assets/womenClothing.jpeg',
];

fetchDataAndGenerateTemplate(
  'https://fakestoreapi.com/products',
  // productTemplate,
  dealsContainer,
  filterProducts,
  null
);
// Filter callback function for products
function filterProducts(product, idx) {
  if (idx < Infinity) return product;
}

// Fetch products

// Fetch categories
fetchDataAndGenerateTemplate(
  'https://fakestoreapi.com/products/categories',
  categoryTemplate,
  categoryContainer,
  null,
  imageArr
);

/////////////////////////////////////////////////////////////////////////////////////
//Fetch / post products

newProductForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // Validate form fields
  let formData = new FormData(newProductForm);
  let newProductBody = {};

  for (let [key, value] of formData) {
    if (value == '') {
      value = null;
    }
    if (value != null) {
      if (!isNaN(Number(value))) {
        newProductBody[key] = Number(value);
      } else {
        newProductBody[key] = value;
      }
    } else {
      alert('cannot leave a field empty');
    }
  }

  if (validateForm(newProductBody)) {
    addProduct('https://fakestoreapi.com/products', newProductBody);
  }
});

/////////////////////////////////////////////////////////////////////////////////////
//Validate Form

function validateForm(body) {
  const title = document.getElementById('title').value;
  const price = document.getElementById('price').value;
  const description = document.getElementById('description').value;
  const image = document.getElementById('image').value;
  const category = document.getElementById('category').value;

  if (body.title === '') {
    alert('Title cannot be empty');
    return false;
  }

  if (body.price === '' || isNaN(price)) {
    alert('Price must be a valid number');
    return false;
  }

  if (body.description === '') {
    alert('Description cannot be empty');
    return false;
  }

  if (body.image === '') {
    alert('Image URL cannot be empty');
    return false;
  }

  if (body.category === '') {
    alert('Category cannot be empty');
    return false;
  }

  return true;
}

function addProduct(url, reqbody) {
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(reqbody),
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      alert('Product added successfully!');
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('An error occurred while adding the product.');
    });
}

////////////////////////////////////ADD TO CART FUNCTION////////////////////

document.addEventListener('DOMContentLoaded', function () {
  updateCartUI();

  const listCartHtml = document.querySelector('.listCart');
  if (listCartHtml) {
    listCartHtml.addEventListener('click', (e) => {
      let positionClick = e.target;
      if (positionClick.classList.contains('cartProd-DetailsBtn')) {
        alert('1');
      }
    });
  } else {
    console.error('Element with class "listCart" not found.');
  }
});

// Function to update the cart UI

// Function dateHandler

function dateSetter() {
  let date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${day}-${month}`;
}

//Function show Shopping cart and close button

let iconCart = document.querySelector('.icon-cart');
let closeCart = document.querySelector('.closeBtn');
let cartMainContainer = document.querySelector('.cart-main-container');

function handleClickOutside(e) {
  if (!cartMainContainer.contains(e.target) && e.target !== iconCart) {
    cartMainContainer.classList.remove('showCart');
    document.removeEventListener('click', handleClickOutside);
  }
}

iconCart.addEventListener('click', () => {
  cartMainContainer.classList.toggle('showCart');
  document.addEventListener('click', handleClickOutside);
});

closeCart.addEventListener('click', () => {
  cartMainContainer.classList.remove('showCart');
});
