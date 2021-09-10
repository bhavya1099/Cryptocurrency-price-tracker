import React, { useEffect,useState } from 'react';
import axios from 'axios'
import Coin from './Coin.js'
import './App.css'
/*https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false*/

function App() {
  const [coins,setCoins] = useState([]);
  const [search,setSearch] = useState('');
  
  useEffect(()=>{
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false').then(res=>{setCoins(res.data);
      // console.log(res.data);
    }).catch(error => alert('Yoo error'));
  },[]);

  const handleChange = (e)=>{
    setSearch(e.target.value);
  }

  const filteredCoins = coins.filter(coin=>
    coin.name.toLowerCase().includes(search.toLowerCase())
  )
  return (
    <div className="coin-app">
      <div className="coin-search">
      <h1>Search a currency</h1>
      <form>
        <input type="text" placeholder="Search" className="coin-input" onChange={handleChange}/>
      </form>
      </div>
        {filteredCoins.map(coin=>{ 
        return (<Coin key={coin.id} 
          name={coin.name} 
          image={coin.image}
          symbol={coin.symbol} 
          market_cap={coin.market_cap} 
          priceChange={coin.price_change_percentage_24h}
          price={coin.current_price}
          volume={coin.total_volume}/>
        );
        })}
    </div>
  );
}

export default App;