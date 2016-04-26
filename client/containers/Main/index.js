
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as transactions from '../../actions/transactions'
import * as auth from '../../actions/auth'
import { routerActions } from 'react-router-redux'

import { NavigationMoreVert, NavigationArrowBack } from 'material-ui/lib/svg-icons'
import { AppBar, IconButton, IconMenu, MenuItem } from 'material-ui'

class Main extends Component {
  
  constructor(context, props) {
    super(context, props);
  }

  logOut() {
    const { authActions, routerActions, history } = this.props;
    authActions.logOut();
    history.push('/login');
    routerActions.push('/login');
  }

  render() {
    const { transactions, transactionsActions, children } = this.props
    return (
      <div className="Main">
        <AppBar
          iconElementLeft={<i/>}
          iconElementRight={
            <IconMenu
              iconButtonElement={
                <IconButton><NavigationMoreVert /></IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem primaryText="Выход" onTouchTap={::this.logOut}/>
            </IconMenu>
          }
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    transactions: state.transactions
  }
}

function mapDispatchToProps(dispatch) {
  return {
    transactionsActions: bindActionCreators(transactions, dispatch),
    authActions: bindActionCreators(auth, dispatch),
    routerActions: bindActionCreators(routerActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)
