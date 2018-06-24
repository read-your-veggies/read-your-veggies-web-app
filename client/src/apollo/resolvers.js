import gql from "graphql-tag";

export const DELETE_ARTICLE = gql`
  mutation deleteArticle($_id: String!) {
    deleteArticle(_id: $_id) {
      _id
      url
      title
      source
      description
      fullText
      articleStance
    }
  }
`

// todo:
export const UPDATE_ARTICLE_VOTES = gql`
  mutation updateArticleVotes($_id: String!) {
    updateArticleVotes(_id: $_id) {
      _id
      url
      title
      source
      description
      fullText
      articleStance
    }
  }
`