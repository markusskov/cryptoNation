import { getFromLocalStorage } from './libs/localStorage.js';

const savedCoins = document.querySelector('.cn-table');
let getSavedCoins = getFromLocalStorage('savedCoins');

getSavedCoins.forEach((market) => {
  // Change color based on positive or negative change
  const priceChange24H = market.change;
  let change = 'positive';
  if (priceChange24H.includes('-')) {
    change = 'negative';
  }

  savedCoins.innerHTML += `
    <tr>
      <td><i class="fas fa-star" data-id="${market.id}" data-rank="${
    market.market_cap_rank
  }"  data-name="${
    market.name
  }" data-symbol="${market.symbol.toUpperCase()}" data-price="${
    market.price
  }" data-change="${market.change}" data-marketCap="${
    market.price
  }" data-volume="${market.volume}" data-ath="${market.ath}" data-supply="${
    market.supply
  }"></i></td>
      <td>${market.rank}</td>
      <td><div class="imgContainer"><img class="tableImage" src="${
        market.image
      }">${
    market.name
  } <span class="symbol">${market.symbol.toUpperCase()}</span></div></td>
      <td>$${market.price}</td>
      <td class="${change}">${priceChange24H}%</td>
      <td>$${market.marketcap}</td>
      <td>$${market.volume}</td>
      <td>$${market.ath}</td>
      <td>${market.ath} ${market.symbol.toUpperCase()}</td>
    </tr>`;
});
