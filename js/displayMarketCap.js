import {
  getFromLocalStorage,
  saveToLocalStorage,
} from './libs/localStorage.js';

export function displayMarketCap(marketCap) {
  const marketCapDOM = document.querySelector('.cn-body');
  marketCapDOM.innerHTML = '';

  marketCap.forEach((market) => {
    // Convert numbers to strings to get commas
    const currentPrice = parseFloat(market.current_price).toLocaleString(
      'en-Us'
    );
    const marketCapPrice = parseFloat(market.market_cap).toLocaleString(
      'en-Us'
    );
    const volume = parseFloat(market.total_volume).toLocaleString('en-Us');
    const priceChange24H = market.price_change_percentage_24h.toFixed(2);
    const circulatingSupply = parseFloat(
      market.circulating_supply
    ).toLocaleString('en-Us');
    const allTimeHigh = parseFloat(market.ath).toLocaleString('en-Us');

    // Change color based on positive or negative change
    let change = 'positive';
    if (priceChange24H.includes('-')) {
      change = 'negative';
    }

    // Change star to full if saved to favourite
    const checkifSaved = getFromLocalStorage('savedCoins');
    let starColor = 'far';
    const isItSaved = checkifSaved.find((singleCoin) => {
      return singleCoin.id === market.id;
    });
    if (isItSaved) {
      starColor = 'fas';
    }

    // Print To DOM
    marketCapDOM.innerHTML += `
    <tr>
      <td><i class="${starColor} fa-star" data-id="${market.id}" data-rank="${
      market.market_cap_rank
    }"  data-name="${
      market.name
    }" data-symbol="${market.symbol.toUpperCase()}" data-image="${
      market.image
    }" data-price="${currentPrice}" data-change="${priceChange24H}" data-marketcap="${marketCapPrice}" data-volume="${volume}" data-ath="${allTimeHigh}" data-supply="${circulatingSupply}"></i></td>
      <td>${market.market_cap_rank}</td>
      <td><div class="imgContainer"><img class="tableImage" src="${
        market.image
      }">${
      market.name
    } <span class="symbol">${market.symbol.toUpperCase()}</span></div></td>
      <td>$${currentPrice}</td>
      <td class="${change}">${priceChange24H}%</td>
      <td>$${marketCapPrice}</td>
      <td>$${volume}</td>
      <td>$${allTimeHigh}</td>
      <td>${circulatingSupply} ${market.symbol.toUpperCase()}</td>
    </tr>`;
  });

  // Add favourites
  function addFavourite() {
    const stars = document.querySelectorAll('.fa-star');
    stars.forEach((star) => {
      star.onclick = () => {
        star.classList.toggle('fas');
        star.classList.toggle('far');

        let coin = {
          id: star.dataset.id,
          rank: star.dataset.rank,
          name: star.dataset.name,
          symbol: star.dataset.symbol,
          price: star.dataset.price,
          change: star.dataset.change,
          marketcap: star.dataset.marketcap,
          volume: star.dataset.volume,
          ath: star.dataset.ath,
          supply: star.dataset.supply,
          image: star.dataset.image,
        };
        let savedCoins = getFromLocalStorage('savedCoins');
        let findCoin = savedCoins.find((singleCoin) => {
          return singleCoin.id === star.dataset.id;
        });
        if (findCoin === undefined) {
          savedCoins.push(coin);
          saveToLocalStorage('savedCoins', savedCoins);
        } else {
          let removeSavedCoin = savedCoins.filter((singleCoin) => {
            return singleCoin.id !== star.dataset.id;
          });
          saveToLocalStorage('savedCoins', removeSavedCoin);
        }
      };
    });
  }
  addFavourite();
}
