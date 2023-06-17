
import {createAsyncThunk} from "@reduxjs/toolkit";
import errorResponse from "src/utils/errorResponse.js";
import apis from "src/apis/index.js";

export const createHotelAction = createAsyncThunk("hotelSlice/creteHotel", async (payload, thunkAPI)=>{
    try{
        // here type should be login or registration
        let {status, data} = await apis.post(`/hotel/create`, payload)
        if(status === 201){
            return data.hotel
        }
    } catch (ex){
        return thunkAPI.rejectWithValue( errorResponse(ex))
    }
})
