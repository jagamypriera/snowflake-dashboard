import React, { Component } from 'react';
import { withWeb3 } from 'web3-webpacked-react';
import { TextField } from '@material-ui/core';

import TransactionButton from './TransactionButton'
import { getContract } from '../common/utilities'

class SnowflakeTokens extends Component {
  constructor(props) {
    super(props)

    this.state = {
      depositAmount: '',
      withdrawAmount: ''
    }

    this.getContract = getContract.bind(this)
  }

  render() {
    const depositAmount = this.props.w3w.fromDecimal(String(this.state.depositAmount), 18)
    const withdrawAmount = this.props.w3w.fromDecimal(String(this.state.withdrawAmount), 18)

    return (
      <div style={{width: '100%'}}>
        <form noValidate autoComplete="off">
          <TextField
            label="Amount"
            type="number"
            helperText="Number of Hydro tokens to deposit."
            margin="normal"
            value={this.state.depositAmount}
            onChange={e => this.setState({depositAmount: e.target.value})}
            fullWidth
          />
          <TransactionButton
            buttonInitial='Deposit Hydro'
            method={this.getContract('token').methods.approveAndCall(
              this.getContract('snowflake')._address, depositAmount, '0x00'
            )}
            onTransactionHash={() => {
              this.props.getAccountDetails(true)
            }}
          />
        </form>

        <form noValidate autoComplete="off">
          <TextField
            label="Amount"
            type="number"
            helperText="Number of Hydro tokens to withdraw."
            margin="normal"
            value={this.state.withdrawAmount}
            onChange={e => this.setState({withdrawAmount: e.target.value})}
            fullWidth
          />
          <TransactionButton
            buttonInitial='Withdraw Hydro'
            method={this.getContract('snowflake').methods.withdrawSnowflakeBalanceTo(
              this.props.w3w.account, withdrawAmount
            )}
            onTransactionHash={() => {
              this.props.getAccountDetails(true)
            }}
          />
        </form>
      </div>
    )
  }
}

export default withWeb3(SnowflakeTokens)
