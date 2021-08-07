import Products from '@/pages/Products';
import Product from '@/pages/Product';
import Cart from '@/pages/Cart';
import Order from '@/pages/Order';
import Result from '@/pages/Result';
import E404 from '@/pages/E404';

let routes = [
	{
		name: 'cart',
		path: '/cart',
		component: Cart
	},
	{
		name: 'order',
		path: '/checkout',
		component: Order
	},
	{
		name: 'result',
		path: '/result',
		component: Result
	},
	{
		name: 'product',
		path: '/product/:id',
		component: Product
	},
	{
		name: 'catalog',
		path: '/',
		component: Products,
		//exact: false
	},
	{
		path: '**',
		component: E404
	}
];

let routesMap = {};

routes.forEach(route => {
	if(route.hasOwnProperty('name')){
		routesMap[route.name] = route.path;
	}
})

export { routes, routesMap }