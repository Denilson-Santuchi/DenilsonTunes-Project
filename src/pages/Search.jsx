import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      buttonDisabled: true,
    };
    this.enableDisableBtn = this.enableDisableBtn.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange({ target: { value, name } }) {
    this.setState({ [name]: value }, () => { this.enableDisableBtn(); });
  }

  enableDisableBtn() {
    const {
      artistName,
    } = this.state;
    const number = 2;

    if (artistName.length < number) {
      this.setState({ buttonDisabled: true });
    } else {
      this.setState({ buttonDisabled: false });
    }
  }

  render() {
    const { artistName, buttonDisabled } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="name">
            nome:
            <input
              id="name"
              data-testid="search-artist-input"
              name="artistName"
              type="text"
              value={ artistName }
              onChange={ this.onInputChange }
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ buttonDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
