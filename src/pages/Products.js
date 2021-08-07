import React, { useContext } from 'react';
import storesContext from '@/contexts/store';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

export function Products(){
	let { products: productsStore, cart } = useContext(storesContext);
	
	let productsCards = productsStore.products.map((pr) => {
		let btn = cart.inCart(pr.id) ? 
			<button type="button" className="btn btn-danger" onClick={() => cart.remove(pr.id)}>Remove</button> :
			<button type="button" className="btn btn-success" onClick={() => cart.add(pr.id)}>Add</button>;

		return <div key={pr.id} className="col col-12 col-sm-4 mt-3 mb-3">
			<h3>{pr.title}</h3>
			<strong>Price: {pr.price}</strong>
			<div>
				<Link to={'/product/' + pr.id}>
					Get more...
				</Link>
			</div>
			<hr/>
			{ btn }
		</div>
	});

	return <>
		<h1>Products</h1>
		<hr/>
		<div className="row">
			{ productsCards }
		</div>
	</>
}

export default observer(Products);