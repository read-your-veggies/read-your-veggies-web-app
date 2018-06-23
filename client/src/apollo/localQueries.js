import gql from "graphql-tag";

export const GET_TEAM_NAME_FROM_LOCAL_STATE =  gql`
query {
  teamName @client
}
`

export const GET_USER_INFO = gql`
  query {
    userInfo @client {
      displayName
      provider
      providerId
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