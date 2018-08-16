import React from 'react'
import styled from 'styled-components'


const StyledItem = styled.div`
  width: 100%;
  min-height: 200px;
  background-color: rgb(255,255,255);
  position: relative;
  margin: 5px auto 0;
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
  padding-top: 5px;
  margin-bottom: 15px;
`

const Content = styled.div`
  flex-grow: 1;
`

const Footer = styled.div`
  height: 40px;
  padding-top: 10px;
  position: relative;
`


/* 如果属性中存在replyList，说明是主回复，否则说明是楼层内回复 */
class MessageItem extends React.Component {
  constructor(props) {
    super(props);
  }

render() {
  const { author, date, time, content } = this.props;
  return (
    <StyledItem>
      <Header>
      </Header>
      <Content>
        {
          this.props.replyList ? `${content}` : `@ ${this.props.replyTo} ${content}`
        }
      </Content>
      <Footer>
        {/* <Applause /> */}
        {
          this.props.children
        }
      </Footer>
    </StyledItem>
  );
}
}

export default MessageItem;