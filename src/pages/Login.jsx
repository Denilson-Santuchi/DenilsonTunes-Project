// requisito 2 e 3 feito em grupo com Igor Hamzi, Luis Fllipe e Raphael Oliveira.

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Load from '../components/Load';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      buttonDisabled: true,
      loading: false,
      requisition: false,
    };
    this.enableDisableBtn = this.enableDisableBtn.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onClickButton = this.onClickButton.bind(this);
    this.saveUserName = this.saveUserName.bind(this);
  }

  onInputChange({ target: { value, name } }) {
    this.setState({ [name]: value }, () => { this.enableDisableBtn(); });
  }

  onClickButton(event) {
    event.preventDefault();
    this.saveUserName();
  }

  enableDisableBtn() {
    const {
      userName,
    } = this.state;
    const number = 3;
    if (userName.length < number) {
      this.setState({ buttonDisabled: true });
    } else {
      this.setState({ buttonDisabled: false });
    }
  }

  async saveUserName() {
    const { userName } = this.state;
    this.setState({ loading: true });
    await createUser({ name: userName });
    this.setState({ loading: false });
    this.setState({ requisition: true });
  }

  render() {
    const {
      state: {
        userName,
        buttonDisabled,
        loading,
        requisition,
      },
      onInputChange,
      onClickButton,
    } = this;

    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="name">
            nome:
            <input
              data-testid="login-name-input"
              id="name"
              name="userName"
              type="text"
              value={ userName }
              onChange={ onInputChange }
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ buttonDisabled }
            onClick={ onClickButton }
          >
            Salvar
          </button>
        </form>
        { loading && <Load /> }
        { requisition && <Redirect to="/search" /> }
      </div>
    );
  }
}
