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
  mutation ($_id: String!, $votes: VoteInput) {
    updateArticleVotes(_id: $_id, votes: $votes) {
      _id
      url
      title
      votes{
        agree{
          summedUserStance
          totalVotes
        }
      }
    }
  }
`

