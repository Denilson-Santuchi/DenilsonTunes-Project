// requisito 7 feito em grupo com Igor Hamzi, Luis Fllipe e Raphael Oliveira.

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      musicList: [],
      artistName: '',
      artistAlbum: '',
    };
    this.getMusicApi = this.getMusicApi.bind(this);
  }

  componentDidMount() {
    this.getMusicApi();
  }

  async getMusicApi() {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    console.log(musics);
    this.setState({
      musicList: musics,
      artistName: musics[0].artistName,
      artistAlbum: musics[0].collectionName,
    });
  }

  render() {
    const {
      state: {
        musicList,
        artistName,
        artistAlbum,
      },
    } = this;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <h2 data-testid="artist-name">{ artistName }</h2>
          <h3 data-testid="album-name">{ artistAlbum }</h3>
        </div>
        <MusicCard musicList={ musicList } />
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
