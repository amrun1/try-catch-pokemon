import { gql, } from '@apollo/client';
const IMAGE_POKEMON = gql`
query getImage($url: String!) {
    image(url: $url) @rest(type: "Image", method: "GET", path: "{args.url}",endpoint:"blank"){
        url
        id
    }
}`

export default IMAGE_POKEMON