import axios from "axios";

//const API_URL = "/api/cards/";
const API_URL = "https://cairtean.herokuapp.com/api/cards/"

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

//create cards
const createCardsBulk = async (cardsData, token) => {
  console.log(cardsData);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + "bulk", cardsData, config);

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

//update card
const updateCard = async (cardData, token) => {

  console.log(cardData, token)

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  console.log(API_URL, cardData, config)

  const response = await axios.put(API_URL, cardData, config);

  return response.data;
};

//delete card
const deleteCard = async (cardData, token) => {

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  console.log(API_URL, cardData, config)

  const response = await axios.delete(API_URL, cardData, config);

  return response.data;
};

//patch card
const patchCard = async (cardData, token) => {

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  console.log(API_URL, cardData, config)

  const response = await axios.patch(API_URL, cardData, config);

  return response.data;
};

const cardService = {
  createCard,
  getCards,
  updateCard,
  createCardsBulk,
  deleteCard,
  patchCard
};

export default cardService;
