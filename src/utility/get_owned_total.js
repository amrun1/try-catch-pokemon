export default function getOwnedTotal(state, name) {
    let total = 0
    total = state.find(item => item.name === name)?.ownedTotal || 0
    return total
}