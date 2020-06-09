import React from "react"
import PropTypes from "prop-types"

import _ from 'lodash'
import axios from 'axios'
import setAxiosHeaders from 'components/modules/AxiosHeaders'

class PostItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: this.props.postItem.active,
    }
    this.handleDestroy = this.handleDestroy.bind(this);
    this.path = `/api/v1/posts/${this.props.postItem.id}`;
    this.handleChange = this.handleChange.bind(this);
    this.updatePostItem = this.updatePostItem.bind(this);
    this.inputRef = React.createRef();
    this.activeRef = React.createRef();
  }

  handleChange() {
    this.setState({
      active: this.activeRef.current.checked
    });
    this.updatePostItem();
  }

  updatePostItem = _.debounce(() => {
    setAxiosHeaders();

    axios
      .put(this.path, {
        post: {
          title: this.inputRef.current.value,
          active: this.activeRef.current.checked
        }
      })
      .then(response => {
        this.props.clearErrors();
      })
      .catch(error => {
        this.props.handleErrors(error);
      });
  }, 1000);

  handleDestroy() {
    setAxiosHeaders();
    const confirmation = confirm("Are you sure?");

    if (confirmation) {
      axios
        .delete(this.path)
        .then(response => {
          this.props.getPostItems();
        })
        .catch(error => {
          this.props.handleErrors(error);
        });
    }
  }

  render() {
    const { postItem } = this.props

    return (
      <tr 
        className={`${!this.state.active && this.props.hideInActivePostItems ? `d-none` : ""} ${this.state.active ? "table-light" : ""}`}
      >
        <td>
          <svg
            className={`bi bi-check-circle ${
              this.state.active ? `text-success` : `text-muted`
            }`}
            width="2em"
            height="2em"
            viewBox="0 0 20 20"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M17.354 4.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3-3a.5.5 0 11.708-.708L10 11.293l6.646-6.647a.5.5 0 01.708 0z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M10 4.5a5.5 5.5 0 105.5 5.5.5.5 0 011 0 6.5 6.5 0 11-3.25-5.63.5.5 0 11-.5.865A5.472 5.472 0 0010 4.5z"
              clipRule="evenodd"
            />
          </svg>
        </td>
        <td>
          <input
            type="text"
            defaultValue={postItem.title}
            disabled={!this.state.active}
            onChange={this.handleChange}
            ref={this.inputRef}
            className="form-control"
            id={`postItem__title-${postItem.id}`}
          />
        </td>
        <td className="text-right">
          <div className="form-check form-check-inline">
            <input
              type="boolean"
              defaultChecked={this.state.active}
              type="checkbox"
              onChange={this.handleChange}
              ref={this.activeRef}
              className="form-check-input"
              id={`active-${postItem.id}`}
            />
            <label
              className="form-check-label"
              htmlFor={`active-${postItem.id}`}
            >
              Active?
            </label>
          </div>
          <button
            onClick={this.handleDestroy}
            className="btn btn-outline-danger"> Delete
          </button>
        </td>
      </tr>
    )
  }
}

export default PostItem

PostItem.propTypes = {
  postItem: PropTypes.object.isRequired,
  getPostItems: PropTypes.func.isRequired,
  hideInActivePostItems: PropTypes.bool.isRequired,
  handleErrors: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
}
