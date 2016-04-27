
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as transactions from '../../actions/transactions'

import { 
  Paper, 
  TextField, 
  SelectField, 
  MenuItem, 
  RaisedButton,
  Snackbar } from 'material-ui'

import getBankName from '../../utils/banks'
import { BANKS, TRANSACTION } from '../../constants/urls'

require('./style.scss');

class Transaction extends Component {
  
  constructor(context, props) {
    super(context, props);
    this.state = {
      amount: 0,
      bankId: null
    }
    
  }

  handleInputChange (evt) {
    this.setState({
     [evt.target.name]: evt.target.value
    })
  }

  bankChange(event, index, value) {
    this.setState({ bankId: value });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.transactionsActions.addTransaction(this.state);
  }

  render() {

    const { banks } = this.props
    let banksMenu = []
    banks.map((bank, i) => banksMenu.push(<MenuItem value={++i} key={i} primaryText={bank}/>))
    return (
       <Paper className="transaction">
        <form
          onChange={::this.handleInputChange}
          onSubmit={::this.handleSubmit}>
          <TextField
            className="transaction__input"
            floatingLabelText="Сумма"
            hintText="р"
            name="amount"/>
          <div className="transaction__input">
            <SelectField 
            floatingLabelText="Банк"
            value={this.state.bankId}
            name="bankId"
            onChange={::this.bankChange}>
              {banksMenu}
            </SelectField>
          </div>
          <div className="transaction__input">
            <RaisedButton
            secondary={Boolean(true)}
            label="Отправить"
            type="submit"/>
          </div>
        </form>
      </Paper>
    )
  }
}

function mapStateToProps(state) {
  return {
    banks: state.banks
  }
}

function mapDispatchToProps(dispatch) {
  return {
    transactionsActions: bindActionCreators(transactions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transaction)
