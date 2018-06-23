import React, { Component } from 'react';
import { Route, withRouter, Switch } from "react-router-dom";
import Dashboard from './Dashboard.jsx';
import Login from './Login.jsx';
import axios from 'axios';

class App extends Component {
<<<<<<< HEAD
  render() {
    return(
      <div>
        <a className="button">Button</a>
        <Mutation mutation={DELETE_ARTICLE} update={updateCache}>
        { (deleteArticle) => {
          return (
            <Query query={GET_ARTICLES_FROM_SERVER}>
            {({ loading, error, data }) => {
              if (loading) return "Loading...";
              if (error) return `Error! ${error.message}`;

              return (
                <ul>{data.articles.map((article) => (
                  <div onClick={() => deleteArticle({ variables: { _id: article._id } })} className ='article-stream-card'>
                    <li className = 'article-stream-card-title'>{article.title}</li>
                    <li className = 'article-stream-card-desc'>{article.description}</li>
                  </div>
                ))}</ul>
              );
            }}
          </Query>
=======
  constructor(props) {
    super(props);
  }
>>>>>>> dev

  componentDidMount() {
    axios.get('/checkAuthHeaders').then((res) => {
      if (res.headers.user !== undefined) {
        this.props.history.push('/dashboard');
      } else {
        this.props.history.push('/login');
        //TODO - Add user info to local store here.
      }
    });
  }
  render() {
    return (
      <Switch>
        <Route path='/dashboard' component={Dashboard}/>
        <Route path='/login' component={Login}/>
      </Switch>
    )
  }
}

export default withRouter(App);