import React from "react"
import PropTypes from "prop-types"
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

const GET_POSTS_REQUEST = 'GET_POSTS_REQUEST'
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'

function getPosts() {
  console.log('getPosts() Action!')
  return dispatch => {
  dispatch({ type: GET_POSTS_REQUEST })
  return fetch(`v1/posts.json`)
    .then(response => response.json())
    .then(json => dispatch(getPostsSuccess(json)))
    .catch(error => console.log(error)) 
  }
}

export function getPostsSuccess(json) {
  return {
    type: GET_POSTS_SUCCESS,
    json
  }
}

class HomePage extends React.Component {
  render () {
    const { posts } = this.props
    const postsList = posts.map((post) => {
      return <li>{post.title} {post.description}</li>
    })

    return (
      <React.Fragment>
        Tagline: {this.props.tagline}
        <button className='getPostsBtn' onClick={() => this.props.getPosts()}>getPosts</button>
        <br/>
        <ul>{ postsList }</ul>
      </React.Fragment>
    );
  }
}

const structuredSelector = createStructuredSelector({
  posts: state => state.posts
})

const mapDispatchToProps = { getPosts }

export default connect(structuredSelector, mapDispatchToProps)(HomePage)
