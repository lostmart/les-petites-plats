// returns the result of the main search (name || description || ingredients)
export const mainSeacrh = (receipies, value) => {
	return receipies.filter((recipie) => recipie.name.toLowerCase().includes(value))
}
