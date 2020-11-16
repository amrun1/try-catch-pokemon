const Reducer = (state, action) => {
    const { pokemon } = action;
    let temp = state
    var newState = []
    var found = []
    switch (action.type) {
        case "add":
            found = temp.map(item => { return { name: item.name, nickname: item.nickname, ownedTotal: item.name === pokemon.name ? (item.ownedTotal + 1) : item.ownedTotal, url: item.url } })
            temp = [...found]
            found = temp.find(item => item.name === pokemon.name)
            temp.push({ name: pokemon.name, nickname: pokemon.nickname, ownedTotal: found !== undefined ? found.ownedTotal : 1, url: pokemon.url })
            newState = temp
            localStorage.setItem('myPokemon', JSON.stringify(newState))
            return newState;
        case "remove":
            found = temp.find(item => item.nickname === pokemon.nickname)
            newState = temp.map(item => { return { name: item.name, nickname: item.nickname, ownedTotal: item.name === found.name ? (item.ownedTotal - 1) : item.ownedTotal, url: item.url } })
            localStorage.setItem('myPokemon', JSON.stringify(newState.filter(item => item.nickname !== pokemon.nickname)))
            return newState.filter(item => item.nickname !== pokemon.nickname);
        default:
            return state;
    }
};

export default Reducer;