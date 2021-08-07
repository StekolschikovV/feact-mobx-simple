import React from 'react';
import ReactDom from 'react-dom';

import App from './App.js';
import storesContext from './contexts/store';

import orderStore from './store/order';
import productsStore from './store/products';
import cartStore from './store/cart';

let stores = {
	products: productsStore,
	order: orderStore,
	cart: cartStore
};

stores.products.load();
stores.cart.load();

ReactDom.render(
	<storesContext.Provider value={stores}>
		<App/>
	</storesContext.Provider>,
	document.querySelector('.app'),
);

import 'bootstrap/dist/css/bootstrap.min.css';