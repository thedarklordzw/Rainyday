const searchForm = document.querySelector('.search');
const searchInput = document.querySelector('.search__input');
const ACCESS_KEY = 'fad633482cd9b9a83b4e7d7775f14da7';
const weatherDiv = document.querySelector('.weather');

const getLocation = async query => {
  const res = await fetch(
    `http://api.weatherstack.com/current?access_key=${ACCESS_KEY}&query=${query}`
  );

  const data = await res.json();
  if (res.ok) {
    console.log(data);
    const { current, location } = data;
    return current && location
      ? { current, location }
      : new Error('Could not find data, probably is not defined');
  } else throw new Error('Failed to make a request');
};

searchForm.addEventListener('submit', async event => {
  event.preventDefault();

  const { value: query } = searchInput;
  const { current, location } = await getLocation(query);
  const {
    observation_time: time,
    temperature,
    weather_descriptions: weatherDescriptions,
    weather_icons: weatherIcons,
    cloudcover,
    feelslike,
    humidity,
  } = current;
  console.log({ data: current });

  const [icon] = weatherIcons;
  const [desc] = weatherDescriptions;

  const { name, country, region } = location;

  const weatherListEl = document.createElement('div');
  const content = `<li>${name}, ${country}</li>
  <li><img src=${icon} /></li>
  <li>Temperature is currently ${temperature} &#8451;</li>
  <li>Feels like ${feelslike} &#8451;</li>
  <li>Cloud cover is ${cloudcover}</li>`;

  weatherListEl.innerHTML = content;

  weatherDiv.appendChild(weatherListEl);
  weatherDiv.classList.remove('hidden');
});
