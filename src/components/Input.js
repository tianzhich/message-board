import React from 'react'
import styled from 'styled-components';
import { InputType } from "../constants";
import PropTypes from 'prop-types'

const InputWrapper = styled.div`
  background-color: rgb(255, 255, 255);
  position: relative;
  box-sizing: border-box;
  width: 600px;
  margin: 5px auto 0;
  box-shadow: 0 1px 4px rgba(0,0,0,.03);
  border: 1px solid rgba(0,0,0,.09);
  border-radius: 3px;
  font-size: 18px;
`

const StyledInput = styled.textarea`
  min-height: ${props => props.minHeight};
  height: ${props => props.minHeight};
  width: 100%;
  border: none;
  padding: 25px 40px;
  padding-bottom: ${props => props.addPadding ? '75px' : '25px'};
  font-size: inherit;
  transition: 0.2s;

  &:focus {
    outline: none;
    &::placeholder {
      opacity: 0;
    }
  }

  &::placeholder {
    color: rgba(0,0,0,.54);
    font-size: inherit;
    letter-spacing: .01rem;
    font-weight: 400;
    font-style: normal;
  }
`

const Button = styled.button`
  display: ${props => props.display ? 'inline-block' : 'none'};
  position: absolute;
  bottom: 25px;
  left: 40px;
  border: 1px solid rgba(0,0,0,.35);
  color: #007DBC;
  height: 37px;
  line-height: 37px;
  padding: 0 0.8em;
  border-radius: 4px;
  font-size: 0.8em;
  transition: 0.2s border-color;
  cursor: pointer;

  &:hover {
    border-color: #007DBC;
  }
`

const Counter = styled.div`
  display: ${props => props.display ? 'inline-block' : 'none'};
  height: 37px;
  line-height: 37px;
  position: absolute;
  right: 40px;
  bottom: 25px;
  color: rgba(0,0,0,.35);
`

class Input extends React.Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    onReply: PropTypes.func,
    onResponse: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      minHeight: 75,
      charNum: 0
    }
  }

  handleBlur = () => {
    if (this.textarea.value === "") {
      this.setState({
        minHeight: 75
      });
    }
    this.textarea.blur();
  }

  handleInput = () => {
    if (this.textarea.scrollHeight > this.state.minHeight) {
      this.setState({
        minHeight: this.textarea.scrollHeight
      })
    }
    this.setState({
      charNum: this.textarea.value.length
    });
  }

  handleFocus = () => {
    if (this.state.minHeight < 230) {
      this.setState({
        minHeight: 230
      })
    }
    this.textarea.focus();
  }

  handleSubmit = (e) => {
    // 阻止继续冒泡，防止document捕捉到closeModal()事件（此时应该打开modal）
    e.nativeEvent.stopImmediatePropagation();

    if (this.props.type === InputType.RESPONSE_INPUT) {
      this.props.onResponse(this.textarea.value);
    } else if (this.props.type === InputType.REPLY_INPUT) {
      this.props.onReply(this.textarea.value);
    }
    this.textarea.value = "";
    this.state.charNum = 0;
    this.handleBlur();
  }

  render() {
    const displayFooter = this.state.minHeight > 75 ? "display" : undefined;
    const { display } = this.props;
    return (
      <InputWrapper display={display} id={this.props.id} >
        <StyledInput
          type="text"
          placeholder="Leave some message here..."
          onBlur={this.handleBlur}
          onInput={this.handleInput}
          onFocus={this.handleFocus}
          minHeight={this.state.minHeight}
          addPadding={displayFooter}
          innerRef={ele => this.textarea = ele} //style-components使用innerRef
        />
        <Button display={displayFooter} onClick={(e) => this.handleSubmit(e)} >Publish</Button>
        <Counter display={displayFooter}>{200 - this.state.charNum}</Counter>
      </InputWrapper>
    );
  }
}

export default Input;