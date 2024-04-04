import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../components/api/api";

const initialState = {
  earthquakes: [],
  earthquake: {},
  currentEarthquakes: {},
  loading: true,
  err: {},
};



export const getEarthquakes = createAsyncThunk(
  "/earthquakes/getEarthquakes",
  async (data, thunkApi) => {
    try {
      console.log(data);
      const response = await axios.get("/earthquake?startDate="+data.startDate+"&finishDate="+data.finishDate+"&magnitude="+data.magnitude);
      console.log(response);

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

export const earthquakeSlice = createSlice({
  name: "earthquake",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEarthquakes.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getEarthquakes.fulfilled, (state, action) => {
      state.earthquakes = action.payload;
      state.loading = false;
      state.err = "";
    });

    builder.addCase(getEarthquakes.rejected, (state, action) => {
      state.loading = false;
      state.err = "Problem on getting Data.";
    });
  },
});

export default earthquakeSlice.reducer;
