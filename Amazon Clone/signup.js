// import apiServce from './service/service';

// const btn = document.querySelector('.btn-continue');

// const _apiServce = new apiServce();

// // fetch('https://fakestoreapi.com/users', {
// //   method: 'POST',
// //   body: JSON.stringify({
// //     email: 'John@gmail.com',
// //     username: 'johnd',
// //     password: 'm38rmF$',
// //     name: {
// //       firstname: 'John',
// //       lastname: 'Doe',
// //     },
// //     address: {
// //       city: 'kilcoole',
// //       street: '7835 new road',
// //       number: 3,
// //       zipcode: '12926-3874',
// //       geolocation: {
// //         lat: '-37.3159',
// //         long: '81.1496',
// //       },
// //     },
// //     phone: '1-570-236-7033',
// //   }),
// // })
// //   .then((res) => res.json())
// //   .then((json) => console.log(json));

// function mainContext() {
//   if (localStorage.getItem('userID')) {
//     window.location.href = 'cart.html';
//   }
//   // // handleUserRegistration();
// }

// function handleUserRegistration() {
//   body = {
//     email: 'mostafa@gmail.com',
//     username: 'mostafa12',
//     password: 'mosstaffa12',
//     name: {
//       firstname: 'mostafa',
//       lastname: 'mohamed',
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
//   };
//   let baseURL = 'https://fakestoreapi.com/users';
//   addNewUser(baseURL, body);
// }

// function addNewUser(url, parsedbody) {
//   let body = JSON.stringify(parsedbody);

//   fetch(`${url}`, {
//     method: 'POST',
//     'content-type': 'application/json',
//     body,
//   })
//     .then((res) => res.json())
//     .then((user) => {
//       displayUser(user?.id);
//     })
//     .catch((error) => {
//       console.error('Error fetching product:', error);
//     });
// }

// async function displayUser(userID) {
//   if (userID) {
//     try {
//       let awaitedData = await fetch(`https://fakestoreapi.com/users/${userID}`);

//       let response = awaitedData.json();
//       response.then((user) => {
//         localStorage.setItem('user', JSON.stringify(user));
//         localStorage.setItem('userID', JSON.stringify(user?.id));
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   } else {
//     alert('not found');
//   }
// }
// mainContext();

// btn.addEventListener('click', () => {
//   console.log('working');

//   displayUser(10);
// });
// // mainUser();

// /////////////////////////////////////////////////////////////////////

// /*
// <div class="signup-container">
//   <h1 class="signin-title">Sign Up</h1>
//   <h5 class="input-label">Your Name</h5>
//   <input type="text" placeholder="First and last name"/>
//   <h5 class="input-label">Mobile number or email</h5>
//   <input type="text" placeholder="Mobile number or email"/>
//   <h5 class="input-label">Password</h5>
//   <input type="Password" placeholder="At least 6 characters"/>
//   <button class="btn-continue">Continue</button>
//   <p class="signin-condition">
//     By continuing, you agree to Amazon's
//     <a href="#">Conditions of Use</a> and <a href="#">Privacy Notice.</a>
//     <p class="signin-help">&#9656 <a href="#">Need help?</a></p>
//   </p>
// </div>
// */
