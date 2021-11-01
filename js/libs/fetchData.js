import { displayMarketCap } from '../displayMarketCap.js';
import { filterMarketCap } from '../filterMarketCap.js';

export async function fetchData(url) {
  try {
    const response = await axios.get(url);
    const marketCap = response.data;
    console.log(marketCap);
    displayMarketCap(marketCap);
    filterMarketCap(marketCap);
  } catch (error) {
    console.log(error);
  }
}
