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
    // Print To DOM
    marketCapDOM.innerHTML += `
    <tr>
      <td><i class="far fa-star"></i></td>
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
      };
    });
  }
  addFavourite();
}
