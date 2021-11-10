import { coinDetails } from './configs/configs.js';

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get('id');

const coinName = document.querySelector('.coinName');
const price = document.querySelector('.price');

export async function singleCoin() {
  const response = await axios.get(coinDetails + id);
  const coinInfo = response.data;
  console.log(coinInfo);

  coinName.innerHTML = coinInfo.name;

  const currentPrice = parseFloat(
    coinInfo.market_data.current_price.usd
  ).toLocaleString('en-Us');
  price.innerHTML = `$${currentPrice}`;
}
singleCoin();

// Chart
let pricesLabel = [];
async function chart() {
  await chartData();

  console.log(pricesLabel);

  const ctx = document.getElementById('myChart').getContext('2d');
  const labels = ['Wed', 'Thur', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed'];
  const data = {
    labels,
    datasets: [
      {
        radius: 5,
        lineTension: 0.2,
        borderColor: '#ACC26D',
        backgroundColor: '#ACC26D',
        fill: {
          target: 'origin',
          above: 'rgba(172,194,132,0.4)',
        },
        data: pricesLabel,
        label: 'Price',
      },
    ],
  };
  const config = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
    },
  };

  const myChart = new Chart(ctx, config, data);
}
chart();

async function chartData() {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7&interval=daily`
  );
  const chartData = response.data.prices;
  chartData.map((x) => {
    x.prices;

    pricesLabel = chartData;
  });

  console.log(chartData);
}
