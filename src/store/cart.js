import { makeObservable, action, observable, computed, runInAction } from 'mobx';
import productsStore from './products';

const TMP_BASE_URL = 'http://faceprog.ru/reactcourseapi/cart/';

class CartStore{
	products = [];
	#token = null;
	
	get productsDetailed(){
		return this.products.map(pr => {
			let info = productsStore.getById(pr.id);
			return { ...info, ...pr };
		})
	}

	get total(){
		return this.productsDetailed.reduce((acc, pr) => acc + pr.price * pr.cnt, 0);
	}

	inCart = (id) => this.products.some(pr => pr.id === id);
	
	async add(id){
		if(!this.inCart(id)){
			let res = await fetch(TMP_BASE_URL + `add.php?token=${this.#token}&id=${id}`).then(r => r.json);

			if(res){
				runInAction(() => this.products.push({ id, cnt: 1 }));
			}
		}
	}

	remove(id){
		if(this.inCart(id)){
			this.products = this.products.filter(pr => pr.id !== id);
		}
	}

	change(id, cnt){
		if(this.inCart(id)){
			let index = this.products.findIndex(pr => pr.id === id);
			this.products[index].cnt = cnt;
		}
	}

	async load(){
		let response = await fetch(TMP_BASE_URL + `load.php?token=${this.#token}`);
		let { cart, token, needUpdate } = await response.json();
		
		if(needUpdate){
			localStorage.setItem('CART_TOKEN', token);
			this.#token = token;
		}
		
		runInAction(() => { this.products = cart });
	}

	constructor(){
		makeObservable(this, {
			products: observable,
			productsDetailed: computed,
			total: computed,
			add: action.bound,
			remove: action.bound,
			change: action.bound
		});

		this.#token = localStorage.getItem('CART_TOKEN');
	}
}

export default new CartStore();


	/*
	
		get total(){
		return this.products.reduce((acc, pr) => acc + 1000000 * pr.cnt, 0);
	}

	change(id, cnt){
		let product = this.#getById(id);

		if(product !== undefined){
			product.cnt = cnt;
		}
	}

	remove(id){
		this.products = this.products.filter(pr => pr.id !== id);
	}

	#getById = id => this.products.find(pr => pr.id === id); */