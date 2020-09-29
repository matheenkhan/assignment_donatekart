import React, { useState, useEffect } from 'react'

const products = [
    {id:'1', title: 'Armani Suit', price_dollars: 30000, img: require('../Assets/armani.jpg'), alt: "logo_armani_suit"},
    {id:'2', title: 'Rolex Watch', price_dollars: 144000, img: require('../Assets/rolex.jpg'), alt: "logo_rolex_watch"},
    {id:'3', title: 'Nike Shoes', price_dollars: 3000, img: require('../Assets/nike.jpg'), alt: "logo_nike_shoe"},
]
// const currencyexchangevalue = 73.70; //to be used if API Call Fails

export const ProductList = () => {
  const [currency, setCurrency] = useState("INR");
  const [USDRate, setUSDRate] = useState({});
    useEffect(() => {
      document.title = `Product List`;
      fetch("https://api.exchangeratesapi.io/latest?base=INR")
        .then(res => res.json())
        .then(
          (result) => {
            setUSDRate(result.rates.USD)
         }).catch((e) => {
          // setUSDRate(currencyexchangevalue)
        });;
    },[]);
    const renderedPosts = products.map(product => (
        <article className="productList" key={product.id}>
          <img src={product.img} alt={product.alt} style={{height:"200px",width:"200px"}}/>
          <h3>{product.title}</h3>
          <p>{numberWithCommas((Math.round(product.price_dollars * 100) / 100).toFixed(2))}{currency==="USD"? "$":"₹"}</p>
        </article>
      ))
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const ToggleCurrency = (currency) => {
        if(currency==="INR") {
            products.map((product) => product.price_dollars /= USDRate)
        }
        else if(currency==="USD"){ 
            products.map((product) => product.price_dollars *= USDRate)
        }
    }
      return (
        <div>
          <section className="currencyTab">
            Currency
            <select value={currency} onChange={(e)=>{ToggleCurrency(e.target.value);setCurrency(e.target.value);}}>
              <option value="INR" key="INR">INR</option>
              <option value="USD" key="USD">USD</option>
            </select>
          </section>
          <div className="clear"></div>
          <section className="productsTab">
            {renderedPosts}
          </section>
        </div>
    )
}