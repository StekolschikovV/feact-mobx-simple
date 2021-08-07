import React, { useContext } from 'react';
import storesContext from '@/contexts/store';
import { observer } from 'mobx-react-lite';
import E404 from '@/components/E404';

export function Product(props){
	let { products, cart } = useContext(storesContext);
	let { id } = props.match.params;
	let validId = /^[1-9]\d*$/.test(id);
	let realId = parseInt(id);

	let product = validId ? products.getById(realId) : undefined;
	
	if(product === undefined){
		return <E404 title="Product not found" text="Maybe it was removed from store" />
	}

	let btn = cart.inCart(product.id) ? 
		<button type="button" className="btn btn-danger" onClick={() => cart.remove(product.id)}>Remove</button> :
		<button type="button" className="btn btn-success" onClick={() => cart.add(product.id)}>Add</button>;

	return <>
		<h1>{ product.title }</h1>
		<hr/>
		<div>
			<strong>Price: { product.price }</strong>
		</div>
		<hr/>
		{ btn }
	</>
}

export default observer(Product);