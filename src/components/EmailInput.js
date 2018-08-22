import React from "react";
import ReactModal from 'react-modal'
import styled from "styled-components";

ReactModal.setAppElement('#app');

const customStyles = {
  content: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
  }
};

const Modal = styled(ReactModal)`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: auto;
  height: 400px;
  width: 400px;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  input {
    border: solid 1px black;
  }

`

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

  handleSubmit = (e) => {
    e.preventDefault();
    let email = this.emailInput.value;
    let author = this.authorInput.value;

    console.log(email, author);
    this.props.onSubmit(author, email);
  }

  render() {
    return (
      <Modal
        isOpen={this.state.showModal}
        style={customStyles}
      >
        <fieldset onClick={(e) => e.nativeEvent.stopImmediatePropagation()}>
          <legend>Your Details:</legend>
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <label htmlFor="author">Name:</label>
            <input required={true}
              type="text"
              name="author"
              ref={ele => this.authorInput = ele}
            />
            <label htmlFor="email">Email:</label>
            <input required={true}
              type="email"
              name="email"
              ref={ele => this.emailInput = ele}
            />
            <br />
            <input type="submit" value="Publish" />
          </form>

        </fieldset>

      </Modal>
    );
  }
}

export default EmailInput;