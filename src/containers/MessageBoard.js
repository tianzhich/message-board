import React from 'react'
import Board from '../components/Board'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  messages: state,
})

export default connect(
  mapStateToProps,
)(Board);