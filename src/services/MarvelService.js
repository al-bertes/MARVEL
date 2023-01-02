import axios from 'axios';
import _ from 'lodash';
class MarvelService {
  _configurationApi = {
    apiBaseUrl: 'https://gateway.marvel.com:443/v1/public/',
    apiKey: 'apikey=75ae9f3371a58cbb72a0d9a3f9f2f281',
    limitItems: 9,
    offsetItems: '210',
  };

  constructor(configurationApi = {}) {
    this.configurationApi = { ...this._configurationApi, ...configurationApi };
  }

  getResource = async (url) => {
    return await axios.get(url);
  };

  getAllCharacters = async (offset = this.configurationApi.offsetItems) => {
    const respons = await this.getResource(
      `${this.configurationApi.apiBaseUrl}characters?limit=${this.configurationApi.limitItems}&offset=${offset}&${this.configurationApi.apiKey}`,
    );
    return respons.data.data.results.map((item) => this._transformDataCharacter(item));
  };

  getCharacter = async (id) => {
    const response = await this.getResource(
      `${this.configurationApi.apiBaseUrl}characters/${id}?${this.configurationApi.apiKey}`,
    );
    return this._transformDataCharacter(response.data.data.results[0]);
  };

  _transformDataCharacter = (response) => {
    return {
      name: response.name,
      id: response.id,
      description: response.description,
      thumbnail: `${response.thumbnail.path}.${response.thumbnail.extension}`,
      homepage: response.urls[0].url,
      wiki: response.urls[1].url,
      comics: response.comics.items,
    };
  };
}

export default MarvelService;
