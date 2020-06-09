import React from "react"
import ReactDOM from 'react-dom'

import axios from 'axios'

import PostsIndex from 'components/Posts'
import PostItem from 'components/Posts/PostItem'
import PostForm from 'components/Posts/PostForm'

import Spinner from "components/modules/Spinner"
import ErrorMessage from "components/modules/ErrorMessage"

class BaseApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postItems: [],
      hideInActivePostItems: false,
      isLoading: true,
      errorMessage: null
    };  
    this.getPostItems = this.getPostItems.bind(this);
    this.createPostItem = this.createPostItem.bind(this);
    this.toggleActivePostItems = this.toggleActivePostItems.bind(this);
    this.handleErrors = this.handleErrors.bind(this);
    this.clearErrors = this.clearErrors.bind(this);
  }

  handleErrors(errorMessage) {
    this.setState({ errorMessage });
  }

  clearErrors() {
    this.setState({
      errorMessage: null
    });
  }

  toggleActivePostItems() {
    this.setState({
      hideInActivePostItems: !this.state.hideInActivePostItems
    });
  }

  componentDidMount() {
    this.getPostItems();
  }

  // index
  getPostItems() {
    axios
      .get("/api/v1/posts")
      .then(response => {
        this.clearErrors();
        this.setState({ isLoading: true });
        const postItems = response.data;
        this.setState({ postItems });
        this.setState({ isLoading: false });
      })
      .catch(error => {
        this.setState({ isLoading: true });
        this.setState({
          errorMessage: {
            message: "There was an error loading your posts..."
          }
        });
      });
  }

  // new/create
  createPostItem(postItem) {
    const postItems = [postItem, ...this.state.postItems];
    this.setState({ postItems });
  }

  // RENDER
  render () {
    return (
      <>
        {this.state.errorMessage && (
          <ErrorMessage errorMessage={this.state.errorMessage} />
        )}
        {!this.state.isLoading && (
          <>
            <PostForm 
              createPostItem={this.createPostItem}
              handleErrors={this.handleErrors}
              clearErrors={this.clearErrors}
            />
            <PostsIndex
              toggleActivePostItems={this.toggleActivePostItems}
              hideInActivePostItems={this.state.hideInActivePostItems}
            >
              {this.state.postItems.map(postItem => (
                <PostItem 
                  key={postItem.id}
                  postItem={postItem}
                  getPostItems={this.getPostItems}
                  hideInActivePostItems={this.state.hideInActivePostItems}
                  handleErrors={this.handleErrors}
                  clearErrors={this.clearErrors}
                />
              ))}
            </PostsIndex>
          </>
        )}
        {this.state.isLoading && <Spinner />}
      </>
    );
  }
}

document.addEventListener('turbolinks:load', () => {
  const app = document.getElementById('main-app')
  app && ReactDOM.render(<BaseApp />, app)
})
