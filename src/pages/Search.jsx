import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Load from '../components/Load';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      bandName: '',
      buttonDisabled: true,
      loading: false,
      listBand: [],
      renderList: false,
      renderBandName: '',
    };
    this.enableDisableBtn = this.enableDisableBtn.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onClickButton = this.onClickButton.bind(this);
    this.searchBand = this.searchBand.bind(this);
    this.listAlbum = this.listAlbum.bind(this);
  }

  onClickButton(event) {
    event.preventDefault();
    this.searchBand();
  }

  onInputChange({ target: { value, name } }) {
    this.setState({ [name]: value }, () => { this.enableDisableBtn(); });
  }

  enableDisableBtn() {
    const {
      bandName,
    } = this.state;
    const number = 2;

    if (bandName.length < number) {
      this.setState({ buttonDisabled: true });
    } else {
      this.setState({ buttonDisabled: false });
    }
  }

  async searchBand() {
    const { bandName } = this.state;
    this.setState({ loading: true });
    const list = await searchAlbumsAPI(bandName);

    this.setState({
      loading: false,
      renderBandName: bandName,
      bandName: '',
      listBand: list,
      renderList: true,
    });
  }

  listAlbum() {
    const { listBand, renderBandName } = this.state;
    if (listBand.length === 0) {
      return (<p>Nenhum álbum foi encontrado</p>);
    } return (
      <div>
        <h1>{`Resultado de álbuns de: ${renderBandName}`}</h1>
        {listBand.map(({
          artistId,
          artworkUrl100,
          artistName,
          collectionName,
          collectionId,
        }) => (
          <div key={ artistId }>
            <Link
              to={ `/album/${collectionId}` }
              data-testid={ `link-to-album-${collectionId}` }
            >
              <img src={ artworkUrl100 } alt={ collectionName } />
              <p>{artistName}</p>
              <p>{collectionName}</p>
              Album
            </Link>
          </div>
        ))}
      </div>
    );
  }

  render() {
    const {
      state: {
        bandName,
        buttonDisabled,
        loading,
        renderList,
      },
      onInputChange,
      onClickButton,
      listAlbum,
    } = this;
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? <Load /> : (
          <form>
            <label htmlFor="bandName">
              nome da banda:
              <input
                data-testid="search-artist-input"
                name="bandName"
                type="text"
                value={ bandName }
                onChange={ onInputChange }
              />
            </label>
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ buttonDisabled }
              onClick={ onClickButton }
            >
              Pesquisar
            </button>
          </form>
        )}
        {renderList && listAlbum()}
      </div>
    );
  }
}
