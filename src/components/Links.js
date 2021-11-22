import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Links extends Component {
  render() {
    return (
      <div>
        <Link to="/">Login</Link>
        <Link to="/search">Pesquisar</Link>
        <Link to="/album/:id">Album</Link>
        <Link to="/favorites">Favoritos</Link>
        <Link to="/profile">Perfil</Link>
        <Link to="/profile/edit">Configurações</Link>
        <Link to="*">NotFound</Link>
      </div>
    );
  }
}
