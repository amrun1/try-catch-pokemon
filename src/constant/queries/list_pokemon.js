
import { gql, } from '@apollo/client';
const LIST_POKEMON = gql`
query getPokemons {
  pokemon @rest(type: "Pokemons", path: "pokemon?offset=0&limit=100",endpoint:"uri_custom_response") {
    next
    detail @type(name: "Pokemon"){
      name
      owned
      url @export(as: "url")
    }
  }
}`

export default LIST_POKEMON