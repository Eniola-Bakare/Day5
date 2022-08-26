const currency_one = document.querySelector('#currency-one');
const currency_two = document.querySelector('#currency-two');
const amount_one = document.querySelector('#amount-one');
const amount_two = document.querySelector('#amount-two');
const swap_btn = document.querySelector('#swap-btn');



// calculate function and rate generation

function calculate(){
    const currencyOne = currency_one.value;
    const currencyTwo = currency_two.value;

    fetch(`https://v6.exchangerate-api.com/v6/64086a810a6cfc82b5b62505/latest/${currencyOne}`)
    .then(response => response.json())
    .then(data => {
        // console.log(data)

        const rateGenerated = data.conversion_rates[currencyTwo]
        let rateEl = document.querySelector('.rate')
        rateEl.textContent = `1 ${currencyOne} = ${rateGenerated} ${currencyTwo}`;
        amount_two.value = (rateGenerated * amount_one.value).toFixed(2);

    })
}




// event listeners
currency_one.addEventListener('change', calculate);
currency_two.addEventListener('change', calculate);
amount_one.addEventListener('input', calculate);
amount_two.addEventListener('input', calculate);

swap_btn.addEventListener('click', () =>{
    const temporaryCurrency = currency_one.value
    currency_one.value = currency_two.value
    currency_two.value = temporaryCurrency
    

    const temporary = amount_one.value
    amount_one.value = amount_two.value
    amount_two.value = temporary

});
calculate();