// Récupération de la db
async function getCars() {
  try {
    const res = await fetch("./db.json");
    const data = await res.json();
    console.log(data);
    return data.cars;
  } catch (error) {
    console.error(error);
  }
}

// Récupération des éléments du DOM
const main = document.getElementById("main");
const btnBurger = document.querySelector(".btn-primary");
const navBar = document.querySelector(".sidenav");
const closeBtn = document.querySelector(".closeBtn");
const btnFilter = document.querySelector(".btnFilter");
const increasingPrice = document.getElementById("item1");
const decreasingPrice = document.getElementById("item2");
const alphabeticalOrder = document.getElementById("item3");
const unalphabeticalOrder = document.getElementById("item4");
const rentalBegin = document.getElementById("exampleFormControlInput1");
const rentalEnd = document.getElementById("exampleFormControlInput2");

// Event sur le burger
btnBurger.addEventListener("click", () => {
  navBar.classList.remove("d-none");
  navBar.classList.add("d-block");
});

// Fermeture de la sidebar
closeBtn.addEventListener("click", () => {
  navBar.classList.remove("d-block");
  navBar.classList.add("d-none");
});

// Changement input date
rentalBegin.addEventListener("focus", () => {
  rentalBegin.type = "date";
  rentalBegin.focus();
});

rentalEnd.addEventListener("focus", () => {
  rentalEnd.type = "date";
  rentalEnd.focus();
});

//Filtre prix croissant
increasingPrice.addEventListener("click", async () => {
  btnFilter.textContent = increasingPrice.textContent;
  const cars = await getCars();
  cars.sort((a, b) => a.price - b.price);
  displayCars(cars);
});
//Filtre prix décroissant
decreasingPrice.addEventListener("click", async () => {
  btnFilter.textContent = decreasingPrice.textContent;
  const cars = await getCars();
  cars.sort((a, b) => b.price - a.price);
  displayCars(cars);
});

//Filtre par ordre alphabétique
alphabeticalOrder.addEventListener("click", async () => {
  btnFilter.textContent = alphabeticalOrder.textContent;
  const cars = await getCars();
  cars.sort((a, b) => a.model.localeCompare(b.model));
  displayCars(cars);
});
//Filtre par ordre alphabétique inverse
unalphabeticalOrder.addEventListener("click", async () => {
  btnFilter.textContent = unalphabeticalOrder.textContent;
  const cars = await getCars();
  cars.sort((a, b) => b.model.localeCompare(a.model));
  displayCars(cars);
});

// Création des displays cars
async function displayCars(cars = null) {
  if (!cars) {
    cars = await getCars();
  }
  main.innerHTML = "";
  cars.forEach((car) => {
    main.innerHTML += `
      <div class="col-12 col-md-10 container-lg col-8 d-flex justify-content-lg-start justify-content-between align-items-center my-2">
        <div class="d-flex align-items-center gap-3">
          <span class="arrow"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-left-fill" viewBox="0 0 16 16">
  <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
</svg></span>
          <img src="${car.cover}" alt="Image ${car.model}" />
          <span class="arrow"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
  <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
</svg></span>
        </div>
        <div class="mx-5">
          <h5 class="mb-2 d-none d-lg-block">${car.model}</h5>
          <p class="mb-2 d-none d-lg-block">${car.type}, ${car.category}, ${
      car.stuff
    }, Forfait ${car.forfait} km (${car.kilometreSupp}/km supplémentaire)</p>
          <p class="mb-2 d-none d-lg-block">
  ${car.agence ? `${car.price} € - Agence de ${car.agence}` : `${car.price} €`}
</p>
          <button class="btn btn-success">Réserver et Payer</button>
        </div>
      </div>
    `;
  });
}

displayCars();
