// // RECOLLECT THE PRODUCTS STORED IN THE LOCALSTORAGE //   //
let products = [];
let productInLocalStorage = JSON.parse(localStorage.getItem('product'));

// VIEW CART PRODUCTS

 // I select the html part concerned by the modification (HTML DIV ID)
 let cartAndFormContainer = document.getElementById('cartAndFormContainer');

 // if the cart is empty: display 'the cart is empty'
if(productInLocalStorage === null || productInLocalStorage == 0) {
  document.querySelector("#cart__items").innerHTML =`
  <div class="cart__empty">
    <h4>Your cart is empty ! <br> Please select products from the homepage</h4>
  </div>`;
}
// if the cart is not empty: display the products in the localStorage
else{
  let itemCards = [];
 
  // initial expression; condition; increment
  for (i = 0; i < productInLocalStorage.length; i++) {
  products.push(productInLocalStorage[i].id);
 
  // the following code will be injected at each turn of the loop
  // depending on the length of the products in the local storage
  itemCards = itemCards + `
    
    <article class="cart__item" data-id="${productInLocalStorage[i].id}" data-color="${productInLocalStorage.color}">
    <div class="cart__item__img">
      <img src="${productInLocalStorage[i].image}" alt="${productInLocalStorage[i].alt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__titlePrice">
        <h2>${productInLocalStorage[i].name}</h2>
        <p>${productInLocalStorage[i].color}</p>
        <p>${productInLocalStorage[i].price} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productInLocalStorage[i].quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>
    `;
  }
  if (i === productInLocalStorage.length) {
  const itemCart = document.getElementById('cart__items');
  itemCart.innerHTML += itemCards;
  }

// I modify the quantity in the basket
function changeQtt() {
  let itemQtt = document.querySelectorAll('.itemQuantity');
  for (let j = 0; j < itemQtt.length; j++) {
    itemQtt[j].addEventListener('change', (event) => {
    event.preventDefault();
   // select the new quantity...
   // ... that we are going to save in a new array
   // with the other elements of localStorage
    let itemNewQtt = itemQtt[j].value;
    const newLocalStorage = {
      id: productInLocalStorage[j].id,
      image: productInLocalStorage[j].image,
      alt: productInLocalStorage[j].alt,
      name: productInLocalStorage[j].name,
      color: productInLocalStorage[j].color,
      price: productInLocalStorage[j].price,   
      quantity: itemNewQtt, // with the new desired quantity
    };

    // refresh the localStorage with the new data retrieved...
    productInLocalStorage[j] = newLocalStorage;
   // ...by transforming Js into Json
    localStorage.setItem('product', JSON.stringify(productInLocalStorage));

    // Alert the modification and update the totals
    alert('Your cart is updated.');
    totalArticles();
    priceAmount();
      })
  }
}
changeQtt();

// I delete a product in the cart
function deleteArticle() {
  const deleteItem = document.querySelectorAll('.deleteItem');

  for (let k = 0; k < deleteItem.length; k++) { 
    deleteItem[k].addEventListener('click', (event) => {
    event.preventDefault();

    // save the id and color selected by the delete button
    let deleteId = productInLocalStorage[k].id;
    let deleteColor = productInLocalStorage[k].color;

    // filter the element clicked by the delete button
    // respecting the callback conditions
    productInLocalStorage = productInLocalStorage.filter( elt => elt.id !== deleteId || elt.color !== deleteColor);
      
    // send new data to localStorage
    localStorage.setItem('product', JSON.stringify(productInLocalStorage));

    // Alert of deleted items and reload the page
    alert('Your article has been successfully deleted.');
    window.location.href = "cart.html";
    });
  }
}
deleteArticle();

// I display the total of the items in the basket
function totalArticles() {
  let totalItems = 0;
  for (l in productInLocalStorage) {
    // parse and convert the 'quantity' value in localstorage to a string
    // and returns an integer (parseInteger), on the decimal basis of 10
    const newQuantity = parseInt(productInLocalStorage[l].quantity, 10);

    // assign the value returned by parseInt to the total Items variable
    totalItems += newQuantity;
  }
    // set #total Quantity to the value of total Items and display it in the DOM
    const totalQuantity = document.getElementById('totalQuantity');
    totalQuantity.textContent = totalItems;
}
totalArticles();

// I calculate the total amount of the cart
function priceAmount() {
  const calculPrice = [];
  for (m = 0; m < productInLocalStorage.length; m++) {
    // item price quantity * price
    const cartAmount = productInLocalStorage[m].price * productInLocalStorage[m].quantity;
    calculPrice.push(cartAmount);

    // the reduce() function keeps the results of the operation in memory
    // it works like a loop, with an accumulator and the current value
    const reduce = (previousValue, currentValue) => previousValue + currentValue;
    total = calculPrice.reduce(reduce);
  }
  const totalPrice = document.getElementById('totalPrice');
  totalPrice.textContent = total;
}
priceAmount();

} // end else: if there are products in the cart

/***********************************/
//--------REQUEST USER INFO--------//
/***********************************/

// I send the form to the server //
function postForm() {
  const order = document.getElementById('order');
  order.addEventListener('click', (event) => {
  event.preventDefault();

  // I get the data from the form in an object
  const contact = {
    firstName : document.getElementById('firstName').value,
    lastName : document.getElementById('lastName').value,
    address : document.getElementById('address').value,
    city : document.getElementById('city').value,
    email : document.getElementById('email').value
  }

  ////
  // --- Check input validation --- //
  ////
  
  //Verification firstname, test: Martin-Luther Jr. or 陳大文 or ñÑâê or ации or John D'Largy
  function controlFirstName() {
    const validFirstName = contact.firstName;
    if (/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,20}$/.test(validFirstName)) {
      return true;
    } else {
      let firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
      firstNameErrorMsg.innerText = "Please check the first name, 3 characters minimum";
    }
  } 

  // Verification Surname
  function controlName() {
    const validName = contact.lastName;
    if (/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,20}$/.test(validName)) {
      return true;
    } else {
      let lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
      lastNameErrorMsg.innerText = "Please check the name, 3 characters minimum, with letters only";
    }
  }

  // Verification address
  function controlAddress() {
    const validAddress = contact.address;
    if (/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,20}$/.test(validAddress)) {
      return true;
    } else {
      let addressErrorMsg = document.getElementById('addressErrorMsg');
      addressErrorMsg.innerText = "Please check the address, without alphanumeric and special characters";
    }
  } 

  // Verification: Name of the City or Town
  function controlCity() {
    const validAddress = contact.city;
    if (/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,10}$/.test(validAddress)) {
      return true;
    } else {
      let cityErrorMsg = document.getElementById('cityErrorMsg');
      cityErrorMsg.innerText = "Please check the city name, 3 characters minimum, with letters only";
    }
  }

  // Verification E-mail
  function controlEmail() {
    const validEmail = contact.email;
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(validEmail)) {
      return true;
    } else {
      let emailErrorMsg = document.getElementById('emailErrorMsg');
      emailErrorMsg.innerText = "Error ! Invalid Email";
    }
  }
  ////
  // --- END of verification, input validation --- //
  ////

 // After checking the client information , I send the contact object to the localStorage
  function validControl() {
    if (controlFirstName() && controlName() && controlAddress() && controlCity() && controlEmail()) {
      localStorage.setItem('contact', JSON.stringify(contact));
      return true;
    } else {
        alert('Please double check the form informations')
      }
  }
  validControl()

  // I put the values ​​of the form and the selected products
  // in an object...
  const sendFormData = {
    contact,
    products,
  }

  // I send the form + localStorage (sendFormData)
  // ... that I send to the server

  const options = {
    method: 'POST',
    body: JSON.stringify(sendFormData),
    headers: { 
      'Content-Type': 'application/json',
    }
  };

  fetch("http://localhost:3000/api/products/order", options)
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('orderId', data.orderId);
        if (validControl()) {
          document.location.href = 'confirmation.html?id='+ data.orderId;
        }
    });

}) // end eventListener postForm
} // end of sending the form postForm
postForm();
// End of cart.js
// // /////////////////////////////////////////////////////////
// // // I keep the input in the fields of the form
// // // even after changing pages
//     const dataLocalStorage = localStorage.getItem('contact');
//     const dataLocalStorageObjet = JSON.parse(dataLocalStorage);
//     document.getElementById('firstName').value = dataLocalStorageObjet.firstName;
//     document.getElementById('lastName').value = dataLocalStorageObjet.lastName;
//     document.getElementById('address').value = dataLocalStorageObjet.address;
//     document.getElementById('city').value = dataLocalStorageObjet.city;
//     document.getElementById('email').value = dataLocalStorageObjet.email;
// // ////////////////////////////////////////////////////////