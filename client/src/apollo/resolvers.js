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
  mutation ($_id: String!, $title: String) {
    updateArticleVotes(_id: $_id, title: $title) {
      _id
      title
    }
  }
`

export const UPDATE_USER_INFO = gql`
  mutation ($theDisplayName: String!, $theProvider: String!, $theProviderId: String! ) {
    updateUserInfo(theDisplayName: $theDisplayName, theProvider: $theProvider, theProviderId: $theProviderId) @client {
      displayName
      provider
      providerId
    }
  }
`