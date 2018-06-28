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

export const ON_BOARD_USER = gql`
  mutation ($_id: String!, $onboard_info: String!) {
    onboardUser(_id: $_id, onboard_info: $onboard_info) {
      _id
      authenticationInfo
      avatar
      name
      health
      user_stance
      emails
      facebookId
      facebookUrl
      birthday
      location
      hometown
      age_range
      onboard_information
      completed_articles
    }
  }
`

export const UPDATE_USER_VOTES = gql`
  mutation ($_id: String!, $completed_articles: String!) {
    updateUserVotes(_id: $_id, completed_articles: $completed_articles) {
      _id
      authenticationInfo
      avatar
      name
      health
      user_stance
      emails
      facebookId
      facebookUrl
      birthday
      location
      hometown
      age_range
      onboard_information
      completed_articles
    }
  }
`


export const OFF_BOARD_USER = gql`
  mutation ($_id: String!) {
    onboardUser(_id: $_id, onboard_info: "NEED_ON_BOARDING") {
      _id
      authenticationInfo
      avatar
      name
      health
      user_stance
      emails
      facebookId
      facebookUrl
      birthday
      location
      hometown
      age_range
      onboard_information
    }
  }
`

