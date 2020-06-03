import React from "react"
import PropTypes from "prop-types"
class HelloWorld extends React.Component {
  render () {
    return (
      <React.Fragment>
        Greetings: {this.props.greetings}
      </React.Fragment>
    );
  }
}

HelloWorld.propTypes = {
  greetings: PropTypes.string
};
export default HelloWorld
