const apikey = "177837553168575180993x38218";
const countriesContainer = document.querySelector(".countries");
const btn = document.querySelector(".btn-country");
const input = document.querySelector(".input-country");
const renderCountry = (data, className = "") => {
  console.log(data[0]);
  const data2 = data[0];
  const html = `
        <article class="country ${className}">
        <img class="country__img" src="${data2.flags.png}" />
        <div class="country__data">
          <h3 class="country__name">${data2.name.common} </h3>
          <h4 class="country__region">${data2.region}</h4>
          <p class="country__row"><span>👫</span>${Math.trunc(
            data2.population / 1000000
          )} million(s)</p>
          <p class="country__row"><span>🗣️</span>${
            Object.values(data2.languages)[0]
          }</p>
          <p class="country__row"><span>💰</span>${
            Object.values(data2.currencies)[0].name
          }</p>
        </div>
        </article>
        `;
  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

const renderError = (msg) => {
  countriesContainer.insertAdjacentHTML("beforeend", msg);
  countriesContainer.style.opacity = 1;
};
const getPosition = new Promise((resolve, rejected) => {
  navigator.geolocation.getCurrentPosition(
    (position) => resolve(position),
    (err) => rejected(err)
  );
});

const getJSON = async function (url, errorMsg = "Something went wrong!") {
  const res = await fetch(url);
  if (!res.ok) throw new Error(errorMsg);
  return await res.json();
};

const getCountries = async (c1) => {
  const data1 = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
  renderCountry(data1);
  return { data1 };
};

btn.addEventListener("click", () => {
  if (input.value) {
    getCountries(input.value);
  } else {
    return;
  }
});
