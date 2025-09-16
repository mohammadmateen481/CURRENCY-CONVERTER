const currencyFirstEl = document.getElementById("currency-first");
const worthFirstEl = document.getElementById("worth-first");
const currencySecondEl = document.getElementById("currency-second");
const worthSecondEl = document.getElementById("worth-second");
const exchangeRateEl = document.querySelector(".exchange-rate");


const apiKey = "85804c835377f9bfc4f9fb4a";

updateRate();

function updateRate() {
    const currency1 = currencyFirstEl.value;
    const currency2 = currencySecondEl.value;

    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${currency1}`)
        .then((res) => res.json())
        .then((data) => {
            const rate = data.conversion_rates[currency2];
            exchangeRateEl.innerText = `1 ${currency1} = ${rate.toFixed(4)} ${currency2}`;
            worthSecondEl.value = (worthFirstEl.value * rate).toFixed(2);
        })
        .catch(error => {
            console.error("Error fetching exchange rates:", error);
            exchangeRateEl.innerText = "Error fetching data. Please check your API key or network connection.";
        });
}

currencyFirstEl.addEventListener("change", updateRate);
currencySecondEl.addEventListener("change", updateRate);
worthFirstEl.addEventListener("input", updateRate);
