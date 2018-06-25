import gql from "graphql-tag";
  
export const GET_ARTICLES_FROM_SERVER = gql`
  query {
    articles {
      _id
      title
      description
      articleStance
    }
  }
`
export const GET_ONE_FULL_ARTICLE = (articleId) => {gql`
  query {
    article(_id: ${articleId}){
      _id
      url
      title
      source
      description
      fullText
      articleStance
    }
  }
`}
