import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import { routes, routesMap } from './router';
import { observer } from 'mobx-react-lite';
import storesContext from '@/contexts/store';

function App(){
	let routesComponents = routes.map(route => (
		<Route path={route.path} component={route.component} exact={route.exact ?? true} key={route.path} />
	));
	let { cart } = useContext(storesContext);

	return <Router>
		<div>
			<header>
				<div className="container">
					<div className="row">
						<div className="col">header</div>
						<div className="col">
							<pre>{ JSON.stringify(cart.products) }</pre>
						</div>
					</div>
				</div>
				<hr/>
			</header>
			<main>
				<div className="container">
					<div className="row">
						<div className="col col-12 col-sm-3">
							<ul className="list-group">
								<li className="list-group-item">
									<NavLink to={routesMap.catalog} activeClassName="text-danger" exact>Catalog</NavLink>
								</li>
								<li className="list-group-item">
									<NavLink to={routesMap.cart} activeClassName="text-danger" exact>Cart</NavLink>
								</li>
								<li className="list-group-item">
									<NavLink to={routesMap.order} activeClassName="text-danger" exact>Checkout</NavLink>
								</li>
							</ul>
						</div>
						<div className="col col-12 col-sm-9">
						<Switch>
							{ routesComponents }
						</Switch>
						</div>
					</div>
				</div>
			</main>
			<footer>
				<hr/>
				<div className="container">
					footer
				</div>
			</footer>
		</div>
	</Router>
}

export default observer(App);