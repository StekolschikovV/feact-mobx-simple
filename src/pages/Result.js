import React, { useContext } from 'react';
import storesContext from '@/contexts/store';
import { observer } from 'mobx-react-lite';

export function Result(){
	let { cart, order } = useContext(storesContext);

	return <>
		<h1>Congracts, { order.userName }</h1>
		<hr/>
		<div>
			<strong>{ cart.total }</strong>
		</div>
		<hr/>
	</>
}

export default observer(Result);