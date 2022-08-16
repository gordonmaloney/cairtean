import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cardService from "./cardService";

const initialState = {
  cards: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};




//Create new card
export const createCard = createAsyncThunk(
  "cards/create",
  async (cardData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await cardService.createCard(cardData, token);
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


//bulk add cards
export const createCardsBulk = createAsyncThunk(
  "cards/createbulk",
  async (cardsData, thunkAPI) => {

    console.log('slice ', cardsData)
    
    cardsData.map(card => {
      card.date = new Date().getTime();
      card.delay = 0;
      card.tag = '';
      card.reviews = 0
    })

    try {
      const token = thunkAPI.getState().auth.user.token;
      return await cardService.createCardsBulk(cardsData, token);
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

//Get user cards
export const getCards = createAsyncThunk(
  "cards/get",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await cardService.getCards(token);
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


//update user card
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

//delete user card
export const deleteCard = createAsyncThunk(
  "cards/deleteCard",
  async (cardData, thunkAPI) => {    
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await cardService.deleteCard(cardData, token);
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

export const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cards = action.payload;
      })
      .addCase(createCard.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createCardsBulk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCardsBulk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cards = action.payload;
      })
      .addCase(createCardsBulk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getCards.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cards = action.payload;
      })
      .addCase(getCards.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cards = [...action.payload];
      })
      .addCase(updateCard.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cards = [...action.payload];
      })
      .addCase(deleteCard.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = cardSlice.actions;
export default cardSlice.reducer;
