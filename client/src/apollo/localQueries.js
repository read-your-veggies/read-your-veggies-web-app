import gql from "graphql-tag";

export const GET_TEAM_NAME_FROM_LOCAL_STATE =  gql`
query {
  teamName @client
}
`