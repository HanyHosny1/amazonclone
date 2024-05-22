const scrollContainer = document.querySelectorAll('.products');
for (const item of scrollContainer) {
  item.addEventListener('wheel', (evt) => {
    evt.preventDefault();
    item.scrollLeft += evt.deltaY;
  });
}

//////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', function () {
  const signoutBtn = document.querySelector('.signout-btn');

  signoutBtn.addEventListener('click', function () {
    signOut();
  });
});

function signOut() {
  console.log('User sign out');
  localStorage.clear();
  window.location.href = 'signin.html';
}

/////////////////////////////////////////////////////////////////////
//function add product detail in cart page

function cartHandler(prodID) {
  localStorage.setItem('prodID', JSON.stringify(prodID));

  window.location.href = 'cart.html';
}
