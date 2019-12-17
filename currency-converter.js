const axios = require(`axios`);

const getExchangeRate = async (fromCurrency, toCurrency) => {
  try {
    const response = await axios.get('http://www.apilayer.net/api/live?access_key=2a7f3fb37b27b0a88532ccb29ede1f72');
    //new versio `date.rates` change `quotes` 
    const quotes = response.quotes;
    const usd = 1 / quotes[fromCurrency];
    const exchangeRate = usd * quotes[toCurrency];

    return exchangeRate;
  } catch (error) {
    throw new Error(`Unable to get currency ${fromCurrency} and  ${toCurrency}`);
  }
}

const getCountries = async (currencyCode) => {
  try {
    const response = await axios.get(`${currencyCode}`);
    return response.map(country => country.name);
  } catch (error) {
    throw new Error(`Unable to get countries that use ${currencyCode}`);
  }
}

const convertCurrency = async (fromCurrency, toCurrency, amount) => {
  const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);
  const countries = await getCountries(toCurrency);
  const convertedAmount = (amount * exchangeRate).toFixed(2);

  return `${amount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency}. You can spend these in the following countries: ${countries}`;
}

convertCurrency('USD', 'HRK', 20).then((message) => {
  console.log(message);
}).catch((error) => {
  console.log(error.message);
});

