import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as auth from '../../actions/auth'
import { routerActions } from 'react-router-redux'

import { Paper, TextField, RaisedButton } from 'material-ui'
require('./style.scss')

class Login extends Component {
  
  constructor(context, props) {
    super(context, props);
    this.state = { username: null, password: null };
  }

  handleInputChange (evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit (evt) {
    evt.preventDefault();
    const { authActions, history, routerActions } = this.props;      
    authActions.doLogIn(this.state, history, routerActions);     
  }

  render() {
    const { auth, authActions, children } = this.props
    return (
      <Paper className="login">
        <form
          onChange={::this.handleInputChange}
          onSubmit={::this.handleSubmit}>
          <TextField
            className="login__input"
            floatingLabelText="Логин"
            hintText="user@company"
            name="username"/>
          <TextField
            className="login__input"
            floatingLabelText="Пароль"
            type="password"
            name="password"/>
          <div className="login__submit">
            <RaisedButton
              className="login__submitButton"
              secondary={Boolean(true)}
              label="войти"
              type="submit"/>
          </div>
        </form>
      </Paper>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(auth, dispatch),
    routerActions: bindActionCreators(routerActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
