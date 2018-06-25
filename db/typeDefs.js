module.exports = [`
  type Query {
    post(_id: String): Post
    posts: [Post]
    comment(_id: String): Comment
    message: String
    articles: [Article]
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

  type Vote {
    agree: Tally
    disagree: Tally
    fun: Tally
    bummer: Tally
    mean: Tally
    worthAdversary: Tally
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
  }

  schema {
    query: Query
    mutation: Mutation
  }
`]