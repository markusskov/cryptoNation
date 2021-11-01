import { displayMarketCap } from './displayMarketCap.js';

export function filterMarketCap(marketCap) {
  const search = document.querySelector('.search');
  search.onkeyup = function () {
    let results = marketCap.filter((market) => {
      return market.name.toLowerCase().includes(this.value.toLowerCase());
    });
    displayMarketCap(results);
  };
}
