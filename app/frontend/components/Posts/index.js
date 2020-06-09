import React from 'react'
import PropTypes from 'prop-types'

class PostsIndex extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.toggleActivePostItems()
  }

  render() {
    return (
      <>
        <hr/>
        <button
          className="btn btn-outline-primary btn-block mb-3"
          onClick={this.handleClick}
        >
          {this.props.hideInActivePostItems
            ? `Show In-Active Posts`
            : `Hide In-Active Posts `}
        </button>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Status</th>
                <th scope="col">Title</th>
                <th scope="col" className="text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>{this.props.children}</tbody>
          </table>
        </div>
      </>
    )
  }
}

export default PostsIndex

PostsIndex.propTypes = {
  toggleActivePostItems: PropTypes.func.isRequired,
  hideInActivePostItems: PropTypes.bool.isRequired
}