


// login action
import {createAsyncThunk} from "@reduxjs/toolkit";
import errorResponse from "src/utils/errorResponse.js";
import apis from "src/apis/index.js";

export const loginOrRegistrationAction = createAsyncThunk("authSlice/login", async (payload, thunkAPI)=>{
    try{
        // here type should be login or registration
        let {status, data} = await apis.post(`/auth/${payload.type}`, payload.data)
        if(status === 201){
            if(data.token){
                localStorage.setItem("token", data.token)
            }
            return data.user
        }
    } catch (ex){
        return thunkAPI.rejectWithValue( errorResponse(ex))
    }
})



//  current logged auth load action
export const fetchCurrentAuthAction = createAsyncThunk("authSlice/fetchCurrentAuth", async (payload, thunkAPI)=>{
    try{
        let {status, data} = await apis.get("/auth/fetch-auth")
        if(status === 201){
            return data.user
        }
    } catch (ex){
        // send error message with reject type in reducer
        return thunkAPI.rejectWithValue( errorResponse(ex))
    }
})


