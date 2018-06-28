module.exports = [`
  type Query {
    post(_id: String): Post
    posts: [Post]
    comment(_id: String): Comment
    message: String
    articles: [Article]
    article(_id: String): Article
    user(_id: String): User
    sources: [Source]
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
    health: String
    user_stance: String
    recently_read: [String]
    emails: String
    facebookId: String
    facebookUrl: String
    birthday: String
    location: String
    hometown: String
    age_range: String
    onboard_information: String
  }

  type Vote {
    agree: Tally
    disagree: Tally
    fun: Tally
    bummer: Tally
    mean: Tally
    worthyAdversary: Tally
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
    summedUserStance: Int
    totalVotes: Int
  }

  type Post {
    _id: String
    title: String
    content: String
    comments: [Comment]
  }

  type Comment {
    _id: String
    postId: String
    content: String
    post: Post
  }

  type Mutation {
    createPost(title: String, content: String): Post
    createComment(postId: String, content: String): Comment
    deleteArticles: Article
    deleteArticle(_id: String): Article
    createArticle(url: String,
      title: String,
      author: [String],
      source: String,
      description: String,
      fullText: String): Article
    onboardUser(_id: String, onboard_info: String): User
    updateArticleVotes(_id: String, votes: VoteInput): Article

  }

  schema {
    query: Query
    mutation: Mutation
  }
`]