import axios from "axios";

const API_URL = "/api/cards/";

//create cards
const createCard = async (cardData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, cardData.cardData, config);

  return response.data;
};

//get user cards
const getCards = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};


//update cards
const updateCard = async (cardData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL, cardData, config);

  return response.data;
};


const cardService = {
  createCard,
  getCards,
  updateCard,
};

export default cardService;
