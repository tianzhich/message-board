import React from 'react'
import Board from '../components/Board'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => ({
  messages: state,
  onReply: ownProps.onReply
})

export default connect(
  mapStateToProps,
)(Board);