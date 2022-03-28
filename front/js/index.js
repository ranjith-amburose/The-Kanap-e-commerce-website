let kanapData = [];

const fetchKanap = async () => {
  await fetch ("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((promise) => {
    kanapData = promise;
    console.log(kanapData);
  });
};

const KanapDisplay = async () => {
  await fetchKanap();

  document.getElementById("items").innerHTML = kanapData.map(
   /* (Kanap) =>*/
    <div id="items${kanap._id}">
    <img class="items" src="${kanap.imageUrl}" alt="Kanap Name ${kanap.name}"/>
    <h3 class="productName">${kanap.name.toUpperCase()}</h3>
    <p class="productDescription">${product.Description}</p>
    <p>${Kanap.price.toString().replace(/0+$/, "")} Euro</p>

    </div>
    
    )  
    .join("");
}
    KanapDisplay();