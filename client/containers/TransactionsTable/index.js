
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as transactions from '../../actions/transactions'

import {Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn, RaisedButton} from 'material-ui'
import getBankName from '../../utils/banks'

let rows = []

class TransactionsTable extends Component {
  
  constructor(context, props) {
    super(context, props);
  }

  removeTransaction(count) {
    this.props.transactionsActions.removeTransaction(count);
    rows.splice(count, 1);
  }

  render() {
    const { transactions, transactionsActions, children } = this.props
    transactions.data.map((t,i) => rows.push(
      <TableRow>
        <TableRowColumn>{t.id}</TableRowColumn>
        <TableRowColumn>{t.amount}</TableRowColumn>
        <TableRowColumn>{getBankName(t.bankId)}</TableRowColumn>
        <TableRowColumn>
          <RaisedButton 
          primary={Boolean(true)} 
          label="Удалить" 
          onTouchTap={this.removeTransaction.bind(this, i)}/>
        </TableRowColumn>
      </TableRow>
    ))
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>ID</TableHeaderColumn>
            <TableHeaderColumn>Сумма</TableHeaderColumn>
            <TableHeaderColumn>Банк</TableHeaderColumn>
            <TableHeaderColumn>Удалить</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows}
        </TableBody>
      </Table>
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
    transactionsActions: bindActionCreators(transactions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionsTable)
