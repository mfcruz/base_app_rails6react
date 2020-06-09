import React from 'react'
import PropTypes from 'prop-types'

import axios from 'axios'
import setAxiosHeaders from 'components/modules/AxiosHeaders'

class PostForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.titleRef = React.createRef()
  }

  handleSubmit(e) {
    e.preventDefault()
    setAxiosHeaders()

    axios
      .post('/api/v1/posts', {
        post: {
          title: this.titleRef.current.value,
          active: true,
        },
      })
      .then(response => {
        const postItem = response.data
        this.props.createPostItem(postItem)
        this.props.clearErrors()
      })
      .catch(error => {
        this.props.handleErrors(error)
      })
    e.target.reset()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="my-3">
        <div className="form-row">
          <div className="form-group col-md-8">
            <input
              type="text"
              name="title"
              ref={this.titleRef}
              required
              className="form-control"
              id="title"
              placeholder="Write post title here..."
            />
          </div>
          <div className="form-group col-md-4">
            <button className="btn btn-outline-success btn-block">
              Add Post
            </button>
          </div>
        </div>
      </form>
    )
  }
}

export default PostForm

PostForm.propTypes = {
  createPostItem: PropTypes.func.isRequired,
  handleErrors: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
}