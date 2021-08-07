import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from "react-router-dom";
import Counter from '@/components/counter/Counter.js';
import storesContext from '@/contexts/store';
import { routesMap } from '@/router';

function Cart(){
	let { cart } = useContext(storesContext);
	let { productsDetailed: products, total, change, remove } = cart;
	
	let productsRows = products.map(pr => (
		<tr key={pr.id}>
			<td>{ pr.title }</td>
			<td>{ pr.price }</td>
			<td>
				<Counter 
					max={pr.rest} 
					current={pr.cnt} 
					onChange={val => change(pr.id, val)} 
					key={pr.rest}
				/>
			</td>
			<td>{ pr.price * pr.cnt }</td>
			<td>
				<button type="button" onClick={() => remove(pr.id)}>X</button>
			</td> 
		</tr>
	));

	return <>
		<h1>Cart</h1>
		<hr/>
		<table>
			<thead>
				<tr>
					<td>Title</td>
					<td>Price</td>
					<td>Count</td>
					<td>Total</td>
				</tr>
			</thead>
			<tbody>
				{ productsRows }
			</tbody>
		</table>
		<div>
			<strong>{ total }</strong>
		</div>
		<hr/>
		<Link to={routesMap.order} className="btn btn-success">Next step</Link>
	</>
}

export default observer(Cart);