
import { gql, } from '@apollo/client';
const LIST_POKEMON = gql`
query getPokemons ($url: String!) {
  pokemon(url: $url) @rest(type: "Pokemons", path: "{args.url}",endpoint:"uri_custom_response") {
    next
    detail @type(name: "Pokemon"){
      name
      owned
      url @export(as: "url")
    }
  }
}`

export default LIST_POKEMON