import { makeObservable, action, observable, computed } from 'mobx';

class OrderStore{
	formData = {
		name: { label: 'Name', value: '' },
		email: { label: 'Email', value: '' },
		phone: { label: 'Phone', value: '' }
	};

	get isValid(){
		return Object.values(this.formData).every(field => field.value !== '');
	}

	get userName(){
		return this.formData.name.value;
	}

	change = (name, value) => {
		this.formData[name].value = value.trim();
	}

	constructor(){
		makeObservable(this, {
			formData: observable,
			isValid: computed,
			change: action
		})
	}
}

export default new OrderStore();