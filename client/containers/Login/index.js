import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import reqwest from 'reqwest'
import * as auth from '../../actions/auth'
import { LOGIN } from '../../constants/urls'
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

  async handleSubmit (evt) {
    try {
      evt.preventDefault()
      console.log(this.props);
      const { authActions, history, routerActions } = this.props
      let response = await reqwest({
        url: LOGIN,
        method: 'POST',
        data: this.state
      });
      if (response) {
        authActions.logIn(true);
        history.push('/main');
        routerActions.push('/main');
      }
    } catch(e) {
      console.error(e);
    }
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
