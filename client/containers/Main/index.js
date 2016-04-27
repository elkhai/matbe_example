
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as auth from '../../actions/auth'
import * as transactions from '../../actions/transactions'
import { routerActions } from 'react-router-redux'

import { NavigationMoreVert, NavigationArrowBack } from 'material-ui/lib/svg-icons'
import { 
  AppBar, 
  IconButton, 
  IconMenu, 
  MenuItem, 
  LeftNav } from 'material-ui'

class Main extends Component {
  
  constructor(context, props) {
    super(context, props);
    this.state = {
      navOpen: false
    };
    this.props.transactionsActions.loadTransactions();
  }

  toggleNav() {
    this.setState({navOpen: !this.state.navOpen})
  }

  logOut() {
    const { authActions, routerActions, history } = this.props;
    authActions.logOut();
    history.push('/login');
    routerActions.push('/login');
  }

  toTransaction() {
    const { history } = this.props;
    history.push('/main/transaction');
    routerActions.push('/main/transaction');
  }

  toTransactions() {
    const { history } = this.props;
    history.push('/main/transactions');
    routerActions.push('/main/transactions');
  }

  render() {
    const { transactions, transactionsActions, children } = this.props
    return (
      <div className="Main">
        <AppBar
          onLeftIconButtonTouchTap={::this.toggleNav}
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
        <LeftNav
          docked={false}
          width={200}
          open={this.state.navOpen}
          onRequestChange={open => this.setState({navOpen: open})}
        >
          <MenuItem onTouchTap={::this.toTransaction}>Добавить транзакцию</MenuItem>
          <MenuItem onTouchTap={::this.toTransactions}>Все транзакции</MenuItem>
        </LeftNav>
        {children}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(auth, dispatch),
    routerActions: bindActionCreators(routerActions, dispatch),
    transactionsActions: bindActionCreators(transactions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)
