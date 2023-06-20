import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const activitiesSlice = createSlice({
    name: "activities",
    initialState: {
        activities: []
    },
    reducers: {
        createActivities: (state, action) => {
            const activity = {
                name: action.payload.name,
                difficulty: action.payload.difficulty,
                duration: action.payload.duration,
                season: action.payload.season,
                countries: action.payload.countries,
            }
            state.activities.push(activity)
        },
        getActivities: (state, action) => {
            state.activities = action.payload;
        },
        updateActivities: (state, action) => {
            const updatedActivities = state.activities.map((activity) => {
                if (activity.id === action.id) {
                    return {
                        ...activity,
                        name: action.payload.name,
                        difficulty: action.payload.difficulty,
                        duration: action.payload.duration,
                        season: action.payload.season,
                        countries: action.payload.countries,
                    }
                }
                return activity
            })
            state.activities = updatedActivities;
        },
        deleteActivities: (state, action) => {
            const filterDelete = state.activities.filter((activity) => activity.id !== action.payload)
            state.activities = filterDelete;
        }
    },
})

export const { createActivities, getActivities, updateActivities, deleteActivities } = activitiesSlice.actions;

export default activitiesSlice.reducer;

export const createActivity = (activity) => (dispatch) => {
    axios.post('/activities', activity)
        .then((res) => {
            dispatch(createActivities(res.data))
        })
        .catch(error => console.log(error))
}

export const getActivity = () => (dispatch) => {
    axios.get('/activities')
        .then((res) => {
            dispatch(getActivities(res.data))
        })
        .catch((error) => console.log(error))
}

export const updateActivity = (activity, id) => (dispatch) => {
    axios.put(`/activities/${id}`, activity)
        .then((res) => {
            dispatch(updateActivities(res.data, id))
        })
        .catch((error) => console.log(error))
}

export const deleteActivity = (id) => (dispatch) => {
    axios.delete(`/activities/${id}`)
        .then((res) => {
            dispatch(deleteActivities(id));
        })
        .catch((error) => {
            console.log(error);
        });
};
