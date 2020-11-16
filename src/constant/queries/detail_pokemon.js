import { gql, } from '@apollo/client';
const DETAIL_POKEMON = gql`
query getDetail($url: String!) {
    detail(url: $url) @rest(type: "Image", method: "GET", path: "{args.url}", endpoint: "blank") {
      id @export(as: "id")
      url
      name
      abilities @type(name: "Ability") {
        ability {
          name
          url @export(as: "url")
          effect @rest(type: "Text", path: "{exportVariables.url}", endpoint: "blank")
        }
      }
      url_species @export(as: "url_species")
      general @rest(type: "General", path: "{exportVariables.url_species}", endpoint: "blank") {
        description
        evolution_chain_url @export(as: "url_evolution")
        evolution @rest(type: "Text", path: "{exportVariables.url_evolution}", endpoint: "blank")
      }
    }
  }`

export default DETAIL_POKEMON