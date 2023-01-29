class OptionsModel {
	constructor(options) {
		this.options = [...options]
	}

	getOptions() {
		return this.options
	}

	filterByOptions(search) {
		return this.options.find((option) => Object.keys(option).includes(search))
	}
}

export default OptionsModel
