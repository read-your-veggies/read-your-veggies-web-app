module.exports = [`
  type Query {
    message: String
    articles: [Article]
    article(_id: String): Article
    user(_id: String): User
    sources: [Source]
    source(name: String): Source
  }

  type Article {
    _id: String
    url: String
    title: String
    author: [String]
    source: String
    description: String
    fullText: String
    votes: Vote
    articleStance: String
    image: String
    timestamp: String
  }

  type Source {
    _id: String
    name: String
    articles: [String]
    titles: [String]
    fullTexts: [String]
    titlesPersonality: String
    fullTextsPersonality: String
  }

  type User {
    _id: String
    authenticationInfo: String
    avatar: String
    name: String
    health: Int
    user_stance: String
    recently_read: [String]
    emails: String
    facebookId: String
    facebookUrl: String
    birthday: String
    location: String
    locPolRatio: String
    hometown: String
    homePolRatio: String
    age_range: String
    onboard_stance: String
    onboard_information: String
    completed_articles: String
    reading_stance: [String]
    browsing_history: [String]
    browsing_history_stance: [String]

  }

  type Vote {
    agree: Tally
    disagree: Tally
    fun: Tally
    bummer: Tally
  }

  input VoteInput {
    agree: Boolean
    disagree: Boolean
    fun: Boolean
    bummer: Boolean
    mean: Boolean
    worthyAdversary: Boolean
  }

  type Tally {
    summedUserStance: Float
    totalVotes: Int
  }

  type Mutation {
    onboardUser(_id: String, onboard_info: String): User
    updateUserVotes(_id: String, completed_articles: String): User
    updateArticleVotes(_id: String, votes: VoteInput, userStance: Float): Article
    updateUserHealth(_id: String, new_health: Int): User
    updateUserBrowsingHistory(_id: String, browsing_history: [String]): User
  }

  schema {
    query: Query
    mutation: Mutation
  }
`]