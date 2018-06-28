import gql from "graphql-tag";
  
export const GET_ARTICLES_FROM_SERVER = gql`
  query {
    articles {
      _id
      title
      description
      articleStance
      image
    }
  }
`
export const GET_ONE_FULL_ARTICLE =  gql`
  query article($_id: String!) {
    article(_id: $_id){
      _id
      url
      title
      author
      source
      description
      fullText
      articleStance
      image
    }
  }
`

export const GET_SOURCE_PERSONALITY = gql`
  query($name: String) {
    sources(name: $name) {
      fullTextsPersonality
    }
  }
`

export const GET_LIST_OF_SOURCES = gql`
  query {
    sources {
      name
    }
  }
`

export const GET_USER_FROM_DB =  gql`
  query user($_id: String!) {
    user(_id: $_id){
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
