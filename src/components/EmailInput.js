import React from "react";
import ReactModal from 'react-modal'

ReactModal.setAppElement('#app');

class EmailInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: props.show
    }
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      showModal: nextProps.show
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    let email = this.emailInput.value;
    let author = this.authorInput.value;

    console.log(email, author);
    this.props.onSubmit(author, email);
  }

  render() {
    return (
      <ReactModal
        isOpen={this.state.showModal}
      >
        <form onSubmit={this.handleSubmit}>
          <input type="email" name="email" ref={ele => this.emailInput = ele} />
          <input type="text" name="author" ref={ele => this.authorInput = ele} />
          <input type="submit" value="Publish"/>
        </form>

      </ReactModal>
    );
  }
}

export default EmailInput;