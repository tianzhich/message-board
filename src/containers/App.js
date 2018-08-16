import React from 'react';
import styled from 'styled-components'
import MessageInput from '../components/Input'
import MessageBoard from './MessageBoard'
import { InputType } from "../constants";
import EmailInput from '../components/EmailInput';
import { addResponse, addReply } from "../actions";
import { connect } from 'react-redux'

const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  text-align: center;
  background-color: rgb(250, 250, 250);
`

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputType: null,
      showEmailInput: false,
      inputContent: {
        [InputType.REPLY_INPUT]: {},
        [InputType.RESPONSE_INPUT]: {}
      }
    }
  }

  handleSubmit = (author, email) => {
    let content, response_id, reply_to;
    
    if (this.state.inputType === InputType.RESPONSE_INPUT) {

      content = this.state.inputContent[InputType.RESPONSE_INPUT].content;

      this.props.addResponse(author, email, content);

    } else if (this.state.inputType === InputType.REPLY_INPUT) {

      content = this.state.inputContent[InputType.REPLY_INPUT].content;
      response_id = this.state.inputContent[InputType.REPLY_INPUT].response_id;
      reply_to = this.state.inputContent[InputType.REPLY_INPUT].reply_to;

      this.props.addReply(response_id, email, author, reply_to, content);
    }

    this.setState({
      inputType: null,
      showEmailInput: false,
      inputContent: {
        [InputType.REPLY_INPUT]: {},
        [InputType.RESPONSE_INPUT]: {}
      }
    });

  }

  handleResponse = (content) => {
    this.setState({
      inputType: InputType.RESPONSE_INPUT,
      showEmailInput: true,
      inputContent: {
        ...this.state.inputContent,
        [InputType.RESPONSE_INPUT]: {
          content
        }
      }
    });
  }

  handleReply = (response_id, reply_to, content) => {
    this.setState({
      inputType: InputType.REPLY_INPUT,
      showEmailInput: true,
      inputContent: {
        ...this.state.inputContent,
        [InputType.REPLY_INPUT]: {
          response_id, reply_to, content
        }
      }
    })
  }

  render() {
    return (
      <Wrapper>
        <h1>Message Board</h1>
        <MessageInput
          type={InputType.RESPONSE_INPUT}
          onResponse={(content) =>
            this.handleResponse(content)}
        />
        <MessageBoard
          onReply={(response_id, reply_to, content) =>
            this.handleReply(response_id, reply_to, content)}
        />
        <EmailInput
          onSubmit={(author, email) => 
            this.handleSubmit(author, email)}
          show={this.state.showEmailInput}
        />
      </Wrapper>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addResponse: (author, email, content) =>
    dispatch(addResponse(author, email, content)),
  addReply: (response_id, email, author, reply_to, content) =>
    dispatch(addReply(response_id, email, author, reply_to, content)),
})

export default connect(
  null,
  mapDispatchToProps
)(App);