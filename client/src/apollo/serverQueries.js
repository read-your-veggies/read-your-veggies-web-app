import gql from "graphql-tag";
  
export const GET_ARTICLES_FROM_SERVER = gql`
  query {
    articles {
      _id
      url
      title
      source
      description
      fullText
    }
  }
`
