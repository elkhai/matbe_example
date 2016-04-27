
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
      form: {
        amount: 0,
        bankId: null
      },      
      banks: []
    }
    this.getBanksList();
  }

  handleInputChange (evt) {
    this.setState({
      form: Object.assign(this.state.form, {[evt.target.name]: evt.target.value})
    })
  }

  bankChange(event, index, value) {
    this.setState({ form: Object.assign(this.state.form, {bankId: value}) });
  }

  async getBanksList() {
    try {
      let response = await fetch(BANKS);
      let banks = await response.json();
      banks.map(b => this.setState({banks: [<MenuItem value={b} key={b} primaryText={getBankName(b)}/>, ...this.state.banks]}))
    } catch(e) {

    }
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.transactionsActions.addTransaction(this.state.form);
  }

  render() {

    const { transactionsActions, children } = this.props
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
            value={this.state.form.bankId}
            name="bankId"
            onChange={::this.bankChange}>
              {this.state.banks}
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
