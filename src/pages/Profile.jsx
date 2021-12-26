import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Load from '../components/Load';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      userEmail: 'email@test.com',
      userImage: 'url-to-image',
      userDescription: 'Lorem ipsum',
      loading: false,
    };

    this.user = this.user.bind(this);
  }

  componentDidMount() {
    this.user();
  }

  user() {
    this.setState({ loading: true }, () => {
      getUser()
        .then(({ name }) => this.setState({
          userName: name,
          loading: false,
        }));
    });
  }

  render() {
    const {
      loading,
      userName,
      userDescription,
      userEmail,
      userImage,
    } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading ? <Load /> : (
          <section>
            <div>
              <image
                data-testid="profile-image"
                src={ userImage }
              />
              <Link to="profile/edit">Editar perfil</Link>
            </div>
            <h2>{userName}</h2>
            <h2>{userEmail}</h2>
            <h2>{userDescription}</h2>
          </section>
        )}
      </div>
    );
  }
}
