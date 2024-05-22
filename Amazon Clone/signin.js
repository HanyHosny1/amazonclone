const btn = document.querySelector('.btn-continue');

function mainContext() {
  if (localStorage.getItem('userID')) {
    window.location.href = 'cart.html';
  }
  // // handleUserRegistration();
}

function handleUserRegistration() {
  body = {
    email: 'hany@gmail.com',
    username: 'hany555',
    password: 'haanny12',
    name: {
      firstname: 'hany',
      lastname: 'mohamed',
    },
    address: {
      city: 'kilcoole',
      street: '7835 new road',
      number: 3,
      zipcode: '12926-3874',
      geolocation: {
        lat: '-37.3159',
        long: '81.1496',
      },
    },
    phone: '1-570-236-7033',
  };
  let baseURL = 'https://fakestoreapi.com/users';
  addNewUser(baseURL, body);
}

function addNewUser(url, parsedbody) {
  let body = JSON.stringify(parsedbody);

  fetch(`${url}`, {
    method: 'POST',
    'content-type': 'application/json',
    body,
  })
    .then((res) => res.json())
    .then((user) => {
      displayUser(user?.id);
    })
    .catch((error) => {
      console.error('Error fetching product:', error);
    });
}

async function displayUser(userID) {
  if (userID) {
    try {
      let awaitedData = await fetch(`https://fakestoreapi.com/users/${userID}`);

      let response = awaitedData.json();
      response.then((user) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('userID', JSON.stringify(user?.id));
          location.href = 'cart.html';
        }
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    alert('not found');
  }
}
mainContext();

btn.addEventListener('click', () => {
  console.log('clicked');
});

btn.addEventListener('click', () => {
  // debugger;

  displayUser(10);
});

/////////////////////////////////////////////////////////////////////

// fetch('https://fakestoreapi.com/users', {
//   method: 'POST',
//   body: JSON.stringify({
//     email: 'John@gmail.com',
//     username: 'johnd',
//     password: 'm38rmF$',
//     name: {
//       firstname: 'John',
//       lastname: 'Doe',
//     },
//     address: {
//       city: 'kilcoole',
//       street: '7835 new road',
//       number: 3,
//       zipcode: '12926-3874',
//       geolocation: {
//         lat: '-37.3159',
//         long: '81.1496',
//       },
//     },
//     phone: '1-570-236-7033',
//   }),
// })
//   .then((res) => res.json())
//   .then((json) => console.log(json));
