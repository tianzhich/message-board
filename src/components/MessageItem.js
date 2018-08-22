import React from 'react'
import styled from 'styled-components'
import ClapButton from '../components/ClapButton';
import {format} from 'date-fns'

const StyledItem = styled.div`
  padding: 15px 20px;
  min-height: 170px;
  background-color: rgb(255,255,255);
  position: relative;
  box-shadow: 0 1px 4px rgba(0,0,0,.03);
  border: 1px solid rgba(0,0,0,.09);
  border-radius: 3px;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  color: rgba(0,0,0,.54);
`

const Header = styled.div`
  height: 50px;
  margin-bottom: 10px;
  font-size: 10px;

  img {
    float: left;
    width: 36px;
    height: 36px;

    &:hover {
      cursor: pointer;
    }
  }

  & > div {
    height: 50px;
    display: flex;
    align-items: center;
  }
`

const DateName = styled.div`
  padding-left: 10px;
  height: 36px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  span {
    display: block;
    text-align: left;
  }
  span:nth-child(1) {
    color: #007DBC
    font-size: 1.5em;

    &:hover {
      cursor: pointer;
    }
  }
  span:nth-child(2) {
    color: rgba(0,0,0,.68);
    font-size: 1.2em;
  }
`

const Content = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: flex-start;
`

const Footer = styled.div`
  color: rgba(0,0,0,.54);

  & > div:nth-child(1) {
    position: relative;
    width: 50px;
    float: left;
    height: 30px;
    display: flex;
    align-items: flex-end;
  }
  & > div:nth-child(2) {
    position: relative;
    float: right;
    display: flex;
    height: 30px;
    width: 140px;
    justify-content: space-between;
    align-items: flex-end;
  }

  height: 30px;
  padding-top: 10px;
  position: relative;
  font-size: .8em;
`


/* 如果属性中存在replyList，说明是message，否则说明是reply */
class MessageItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  onMailTo = () => {
    window.location.href = `mailto:${this.props.email}`;
  }

  render() {
    const { _id, author, text, gravatar, applause } = this.props;
    let date = format(new Date(Number(_id)), 'YYYY-MM-DD, HH:MM');
    return (
      <StyledItem>
        <Header>
          <div>
            <img 
              src={"https://www.gravatar.com/avatar/" + gravatar + "?d=identicon"} alt="" 
              onClick={this.onMailTo}
            />
            <DateName>
              <span onClick={this.onMailTo}>{author}</span>
              <span>{date}</span>
            </DateName>
          </div>
        </Header>
        <Content>
          {
            this.props.replyList ? `${text}` : `@ ${this.props.replyTo} ${text}`
          }
        </Content>
        <Footer>
          <ClapButton id={_id} count={applause}/>
          {
            this.props.children
          }
        </Footer>
      </StyledItem>
    );
  }
}

export default MessageItem;