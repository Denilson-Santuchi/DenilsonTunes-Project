// requisito 7 feito em grupo com Igor Hamzi, Luis Fllipe e Raphael Oliveira.

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { musicList } = this.props;
    return (
      <div>
        {musicList.slice([1]).map(({ trackName, previewUrl, artistId }) => (
          <>
            <h4 key={ artistId }>{trackName}</h4>
            <audio
              data-testid="audio-component"
              src={ previewUrl }
              controls
            >
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>
          </>
        ))}
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicList: PropTypes.string.isRequired,
};
