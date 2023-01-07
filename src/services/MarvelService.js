import { useHttp } from '../hooks/http.hook';

const useMarvelService = () => {
  const { processState, request } = useHttp();

  const _configurationApi = {
    apiBaseUrl: 'https://gateway.marvel.com:443/v1/public/', 
    asdf: 'https://gateway.marvel.com:443/v1/public/comics?limit=8&apikey=75ae9f3371a58cbb72a0d9a3f9f2f281',
    apiKey: 'apikey=75ae9f3371a58cbb72a0d9a3f9f2f281',
    limitItems: 9,
    offsetItems: '210',
  };

  const getAllCharacters = async (offset = _configurationApi.offsetItems) => {
    const respons = await request(
      `${_configurationApi.apiBaseUrl}characters?limit=9&offset=${offset}&${_configurationApi.apiKey}`,
    );
    return respons.data.data.results.map(_transformDataCharacter);
  };

  const getCharacter = async (id) => {
    const response = await request(`${_configurationApi.apiBaseUrl}characters/${id}?${_configurationApi.apiKey}`);
    return _transformDataCharacter(response.data.data.results[0]);
  };
  const getCommics = async (offset = _configurationApi.offsetItems, limit = 8) => {
    const respons = await request(`${_configurationApi.apiBaseUrl}comics?limit=${limit}&offset=${offset}&${_configurationApi.apiKey}`);
    return respons.data.data.results.map((item) => _transformDataComics(item));
  }

  const getSingleCommics = async (id) => {
    const response = await request(`${_configurationApi.apiBaseUrl}comics/${id}?${_configurationApi.apiKey}`);
    return _transformDataComics(response.data.data.results[0]);
  }
  const getCharacterByName = async (name) => {
    const res = await request(`${_configurationApi.apiBaseUrl}characters?name=${name}&${_configurationApi.apiKey}`);
    return res.data.data.results[0];
}
  const _transformDataComics = (response) => {
    return {
      thumbnail: `${response.thumbnail.path}.${response.thumbnail.extension}`,
      id: response.id,
      prices: response.prices[0].price,
      title: response.title,
      pageCount: response.pageCount,
    }
  }

  const _transformDataCharacter = (response) => {
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
  return { processState, getAllCharacters, getCharacter, getCommics, getSingleCommics, getCharacterByName };
}

export default useMarvelService;
