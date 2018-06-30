import gql from "graphql-tag";

//this will not be used for production
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

// We should tweak the output, but its not that important
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

export const UPDATE_USER_VOTES = gql`
  mutation ($_id: String!, $completed_articles: String!) {
    updateUserVotes(_id: $_id, completed_articles: $completed_articles) {
      _id
      completed_articles
    }
  }
`

export const ON_BOARD_USER = gql`
  mutation ($_id: String!, $onboard_info: String!) {
    onboardUser(_id: $_id, onboard_info: $onboard_info) {
      _id
      onboard_information
    }
  }
`

export const OFF_BOARD_USER = gql`
  mutation ($_id: String!) {
    onboardUser(_id: $_id, onboard_info: "NEED_ON_BOARDING") {
      _id
      onboard_information
    }
  }
`

