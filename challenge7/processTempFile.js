const fs = require('fs').promises;


function selectRandomCity(cities) {
  const randomIndex = Math.floor(Math.random() * cities.length);
  return cities[randomIndex];
}

async function fetchTemp(city) {
  const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lng}&current_weather=true`);
  const data = await response.json();
  return data.current_weather.temperature;
}

async function selectCityFromFile(citiesFilePath) {
  try {
    const data = await fs.readFile(citiesFilePath, 'utf-8');
    const cities = JSON.parse(data);
    const randomCity = selectRandomCity(cities);
    return randomCity;
  } catch (error) {
    console.error('Error reading the file or parsing JSON:', error);
    throw error;
  }
}

async function fetchTempToFile(city) {
  try {
    const temperature = await fetchTemp(city);
    const fileName = `${city.name.replace(/\s/g, '_')}.txt`;
    await fs.unlink(fileName).catch(() => {});
    await fs.writeFile(fileName, temperature.toString());
    console.log(`Temperature for ${city.name} (${city.lat}, ${city.lng}) is ${temperature}°C`);
  } catch (error) {
    console.error('Error fetching temperature or writing to file:', error);
    throw error;
  }
}


async function main() {
  const cities = 'input.txt';
  try {
    const city = await selectCityFromFile(cities);
    await fetchTempToFile(city);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main();
