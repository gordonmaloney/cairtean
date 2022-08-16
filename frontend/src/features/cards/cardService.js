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

export const updateCard = createAsyncThunk(
  "cards/updateCard",
  async (cardData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await cardService.updateCard(cardData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//delete card
const deleteCard = async (cardData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL, cardData, config);

  return response.data;
};

const cardService = {
  createCard,
  getCards,
  updateCard,
  createCardsBulk,
  deleteCard,
};

export default cardService;
