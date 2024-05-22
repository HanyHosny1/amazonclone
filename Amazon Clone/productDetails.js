// function Main() {
//   let id = JSON.parse(localStorage.getItem('productID'));
//   let baseURL = 'https://fakestoreapi.com/products';
//   getSpecificProduct(baseURL, id);
// }

// function getSpecificProduct(url, id) {
//   fetch(`${url}/${id}`)
//     .then((res) => res.json())
//     .then((json) => console.log(json));
// }

// Main();

function productIDHandler(productID) {
  localStorage.setItem('productID', JSON.stringify(productID));
  Main();
}

function Main() {
  let id = JSON.parse(localStorage.getItem('productID'));

  if (id) {
    let baseURL = 'https://fakestoreapi.com/products';
    getSpecificProduct(baseURL, id);
  } else {
    console.error('Product ID not found in localStorage');
  }
}

function getSpecificProduct(url, id) {
  fetch(`${url}/${id}`)
    .then((res) => res.json())
    .then((product) => {
      displayProduct(product);
    })
    .catch((error) => {
      console.error('Error fetching product:', error);
    });
}

function displayProduct(product) {
  const productContainer = document.querySelector('.product-details-container');

  const productHTML = `
  <div class="product">
    <h2 class="title">${product.title}</h2>
    <img src="${product.image}" alt="${product.title}" />
    <p class="price">Price: $${product.price}</p>
    <p class="description">Description: ${product.description}</p>
    <p class="category">Category: ${product.category}</p>
    <button onclick="handleAddToCart(${product.id})" class="addCart">Add to cart</button>
    <span class="quantity">0</span>
    
    </div>
    `;

  productContainer.innerHTML = productHTML;
}

Main();
//////////////////////////////////////////////////////////////////////////////
//Activating add to cart button in the product details page

// function addToCart(){

//   if (addCartBtn) {
//     addCartBtn.addEventListener('click', function () {
//       console.log('Button pressed');
//     });

//     addCartBtn.addEventListener('click', function () {

//     });
//   } else {
//     console.error('Not added');
//   }
// });

function dateSetter() {
  let date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${day}-${month}`;
}

function handleAddToCart(prodID) {
  let userID = localStorage.getItem('userID');
  let productsArr = [];

  productsArr.push({ productId: prodID, quantity: 2 });

  let requestBody = { userID, date: dateSetter(), products: productsArr };

  console.log(requestBody);
  // try {
  //   let addToCard = fetch();
  // } catch (error) {
  //   console.log(error);
  // }
}
