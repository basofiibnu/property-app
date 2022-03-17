import axios from 'axios';

export const baseUrl = 'https://bayut.p.rapidapi.com';

export const fetchApi = async (url) => {
  const { data } = await axios.get(url, {
    headers: {
      'x-rapidapi-host': 'bayut.p.rapidapi.com',
      'x-rapidapi-key':
        'd5dce97f06mshe25723e1fc25a06p1b5a71jsnb2b17703f726',
    },
  });

  return data;
};
