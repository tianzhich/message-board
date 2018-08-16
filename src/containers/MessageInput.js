import React from 'react'
import Input from '../components/Input'
import { connect } from 'react-redux'
import { addResponse, addReply } from "../actions";

const mapDistachToProps = (dispatch, ownProps) => ({
  addResponse: (author, mail, content) =>
    dispatch(addResponse(author, mail, content)),
  type: ownProps.type
})

export default connect(
  mapDistachToProps
)(Input);