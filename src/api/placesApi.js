import axios from 'axios';

const BASE_URL = 'http://wafi.iit.cnr.it/openervm/api';

export const getPlaces = async (location, category, keyword, source) => {
  try {
    const response = await axios.get(`${BASE_URL}/getPlaces`, {
      params: {
        location: location,
        category: category || undefined,
        keyword: keyword || undefined,
        source: source || undefined,
      },
    });

    return response.data || [];

  } catch (error) {
    throw error;
  }
};
