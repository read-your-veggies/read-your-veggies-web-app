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
      userId
    }
  }
`

export const UPDATE_USER_INFO = gql`
  mutation ($theDisplayName: String!, $theProvider: String!, $theUserId: String! ) {
    updateUserInfo(theDisplayName: $theDisplayName, theProvider: $theProvider, theUserId: $theUserId) @client {
      displayName
      provider
      userId
    }
  }
`