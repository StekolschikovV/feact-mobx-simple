import React, { useContext } from 'react';
import storesContext from '@/contexts/store';
import { observer } from 'mobx-react-lite';
import { Link } from "react-router-dom";
import { routesMap } from '@/router';

function Order(){
	let { order: orderStore } = useContext(storesContext);

	let inputs = Object.entries(orderStore.formData).map(([name, field]) => {
		return <div className="form-group" key={name}>
			<label>{field.label}</label>
			<input
				type="text" 
				className="form-control"
				value={field.value}
				name={name}
				onChange={(e) => orderStore.change(name, e.target.value.trim())}
			/>
		</div>
	});

	return <>
		<h1>Your data</h1>
		<hr/>
		<form>
			{ inputs }
		</form>
		<hr/>
		{ orderStore.isValid && <Link to={routesMap.result} className="btn btn-success">Make order</Link> }
	</>
}

export default observer(Order);