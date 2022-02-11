import { createStore } from 'vuex'

export const store = createStore({
	state: {
		data_crm: {},
		choosenPackage: {}
	},
	mutations: {
		setCRM(state, field_data) {
			Object.entries(field_data).forEach(([key, value]) => {
				state.data_crm[key] = value
			});
		},
		choosePackage(state, packageData) {
			state.choosenPackage = packageData
		},
	},
})