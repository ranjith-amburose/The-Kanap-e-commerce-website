//---------I REDIRECT API URL TO A NEW PRODUCT PAGE ---------

// I create a new url from the current url
// and adding searchParams to manipulate URL query parameters:
let params = new URL(window.location.href).searchParams;
// I indicate that the new url will be added with an id:
let newID = params.get('id');

//---------CALL THE API AGAIN WITH THE ID OF THE CHOSEN SOFA------------------

// I create the variables I need to manipulate in this page:
const image = document.getElementsByClassName('item__img');
const title = document.getElementById('title');
const price = document.getElementById('price');
const description = document.getElementById('description');
const colors = document.getElementById('colors');

let imageURL = "";
let imageAlt = "";

// I create the right URL for each chosen product by adding newID
fetch("http://localhost:3000/api/products/" + newID)
  .then(res => res.json())
  .then(data => {
   // I modify the content of each variable with the correct data:
    image[0].innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
    imageURL = data.imageUrl;
    imageAlt = data.altTxt;
    title.innerHTML = `<h1>${data.name}</h1>`;
    price.innerText = `${data.price}`;
    description.innerText = `${data.description}`;

    // I configure the choice of colors
    for (number in data.colors) {
      colors.options[colors.options.length] = new Option(
        data.colors[number],
        data.colors[number]
      );
    }
  })
    // I add an error message in case the server does not respond
  .catch(_error => {
    alert('Oops ! The server is not responding, follow the instructions in READ.me.');
  });

  //---------I RECOVER THE DATA ACCORDING TO THE USER'S CHOICE---------

const selectQuantity = document.getElementById('quantity');
const selectColors = document.getElementById('colors');

// I configure an eventListener when the user clicks on add to cart
const addToCart = document.getElementById('addToCart');
addToCart.addEventListener('click', (event) => {
  event.preventDefault();

  const selection = {
    id: newID,
    image: imageURL,
    alt: imageAlt,
    name: title.textContent,
    price: price.textContent,
    color: selectColors.value,
    quantity: selectQuantity.value,
  };

  // I declare a variable productInLocalStorage
  // in which I put the keys+values ​​in the local storage
  // JSON.parse converts data in JSON format into a JavaScript object
  let productInLocalStorage =  JSON.parse(localStorage.getItem('product'));

  // I add the selected products in the localStorage
  const addProductLocalStorage = () => {

  // I retrieve the user's selection in the object's array:
  // we can see in the console that there is the data,
  // but not yet stored in storage at this stage
  productInLocalStorage.push(selection);

  // I store the retrieved data in the localStorage:
  // JSON.stringify converts data in JavaScript format to JSON
  // check that key and value in the inspector contain data
  localStorage.setItem('product', JSON.stringify(productInLocalStorage));
  }

  // // I create an alert to confirm the product added to the cart
  let addConfirm = () => {
    alert('The product has been added to cart');
  }

  let update = false;
  
  // if there are products saved in the localStorage
  if (productInLocalStorage) {
  // check that the product is not already in the localstorage/basket
  // with color
   productInLocalStorage.forEach (function (productOk, key) {
    if (productOk.id == newID && productOk.color == selectColors.value) {
      productInLocalStorage[key].quantity = parseInt(productOk.quantity) + parseInt(selectQuantity.value);
      localStorage.setItem('product', JSON.stringify(productInLocalStorage));
      update = true;
      addConfirm();
    }
  });

  //
    if (!update) {
    addProductLocalStorage();
    addConfirm();
    }
  }
  // if there is no product saved in the localStorage 
  else {
    // I then create an array with the elements chosen by the user
    productInLocalStorage = [];
    addProductLocalStorage();
    addConfirm();
  }
});
// End of product.js