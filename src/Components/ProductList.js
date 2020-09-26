import React, { useState } from 'react'

const products = [
    {id:'1', title: 'Armani Suit', price_dollars: 1000, img: require('../Assets/armani.jpg'), alt: "logo_armani_suit"},
    {id:'2', title: 'Rolex Watch', price_dollars: 4000, img: require('../Assets/rolex.jpg'), alt: "logo_rolex_watch"},
    {id:'3', title: 'Nike Shoes', price_dollars: 300, img: require('../Assets/nike.jpg'), alt: "logo_nike_shoe"},
]

const currencyexchangevalue = 73.70;

export const ProductList = () => {
    const [currency, setCurrency] = useState("USD");
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
            products.map((product) => product.price_dollars *= currencyexchangevalue)
        }
        else if(currency==="USD"){ 
            products.map((product) => product.price_dollars /= currencyexchangevalue)
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
        <div class="clear"></div>
        <section className="productsTab">
          {renderedPosts}
        </section>
        </div>
    )
}