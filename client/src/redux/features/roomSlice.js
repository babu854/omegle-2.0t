import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    roomId: null,
    message: '',
    messageList: []
}

const roomSlice = createSlice({
    name: "room",
    initialState,
    reducers: {
        setRoomId: (state, action) => {
            state.roomId = action.payload;
        },
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        setMessageList: (state, action) => {
            state.messageList = [...state.messageList, action.payload];
        }
    }
})

export const { setRoomId, setMessage, setMessageList } = roomSlice.actions;

export default roomSlice.reducer;