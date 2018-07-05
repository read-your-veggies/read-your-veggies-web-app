import gql from "graphql-tag";
  
export const GET_ARTICLES_FROM_SERVER = gql`
  query {
    articles {
      _id
      title
      description
      articleStance
      image
      fullText
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
  query source($name: String!) {
    source(name: $name) {
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
      recently_read
      emails
      facebookId
      facebookUrl
      birthday
      location
      locPolRatio
      hometown
      homePolRatio
      age_range
      onboard_stance
      onboard_information
      completed_articles
      reading_stance
    }
  }
`

export const GET_COMPLETED_ARTICLES =  gql`
  query user($_id: String!) {
    user(_id: $_id){
      _id
      completed_articles
    }
  }
`
export const GET_USER_STANCE_INFO =  gql`
  query user($_id: String!) {
    user(_id: $_id){
      _id
      name
      health 
      user_stance
      location
      locPolRatio
      hometown
      homePolRatio
      onboard_stance
      reading_stance
    }
  }
`

export const GET_USER_HEALTH =  gql`
  query user($_id: String!) {
    user(_id: $_id){
      _id
      health
      onboard_information
    }
  }
`

export const GET_USER_ONBOARD_INFO_AND_STANCE =  gql`
  query user($_id: String!) {
    user(_id: $_id){
      _id
      user_stance
      onboard_information
    }
  }
`