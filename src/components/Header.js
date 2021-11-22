import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Load from './Load';

export default class Header extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      loading: true,
    };

    this.user = this.user.bind(this);
  }

  componentDidMount() {
    this.user();
  }

  async user() {
    const { name } = await getUser();
    this.setState({ name, loading: false });
  }

  render() {
    const {
      state: {
        name,
        loading,
      },
    } = this;

    return (
      <div>
        <header data-testid="header-component">
          {loading ? <Load /> : (
            <div data-testid="header-user-name">{name}</div>
          )}
        </header>
      </div>
    );
  }
}
