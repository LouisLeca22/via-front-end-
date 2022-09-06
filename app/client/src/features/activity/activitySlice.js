import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import activityService from "./activityService"

const initialState = {
  activities: [],
  activity: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  bookmarks: [],
  participations: [],
  comments: []
}

// Activities
export const createActivity = createAsyncThunk(
  'activity/create',
  async (activityData, thunkAPI) => {
    const userId = thunkAPI.getState().auth.user.id
    try {
      return await activityService.createActivity(activityData, userId)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getActivity = createAsyncThunk(
  'activity/get',
  async (activityId, thunkAPI) => {
    try {
      return await activityService.getActivity(activityId)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getActivities = createAsyncThunk(
  'activity/getAll',
  async (_, thunkAPI) => {
    try {
      return await activityService.getActivities()
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const updateActivity = createAsyncThunk(
  'activity/update',
  async (data, thunkAPI) => {
    const { activityId, activityData } = data
    const userId = thunkAPI.getState().auth.user.id
    try {
      return await activityService.updateActivity(activityId, activityData, userId)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const deleteActivity = createAsyncThunk(
  'activity/delete',
  async (data, thunkAPI) => {
    const { activityId, userId } = data;
    try {
      return await activityService.deleteActivity(activityId, userId)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Bookmarks
export const getBookmarks = createAsyncThunk(
  'bookmarks/get',
  async (_, thunkAPI) => {
    const userId = thunkAPI.getState().auth.user.id
    try {
      return await activityService.getBookmarks(userId)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const createBookmark = createAsyncThunk(
  'bookmarks/create',
  async (bookmarkId, thunkAPI) => {
    const userId = thunkAPI.getState().auth.user.id
    try {
      return await activityService.createBookmark(bookmarkId, userId)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const deleteBookmark = createAsyncThunk(
  'bookmarks/delete',
  async (bookmarkId, thunkAPI) => {
    const userId = thunkAPI.getState().auth.user.id
    try {
      return await activityService.deleteBookmark(bookmarkId, userId)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// export const getFirstParticipations = createAsyncThunk(
//   'participations/getFirst',
//   async (_, thunkAPI) => {
//     const userId = thunkAPI.getState().auth.user.id
//     try {
//       return await activityService.getFirstParticipations(userId)
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString()

//       return thunkAPI.rejectWithValue(message)
//     }
//   }
// )

// Participations
export const participate = createAsyncThunk(
  'participations/participate',
  async (activityId, thunkAPI) => {
    const userId = thunkAPI.getState().auth.user.id
    try {
      return await activityService.participate(activityId, userId)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Comments
export const getComments = createAsyncThunk(
  'comments/gets',
  async (_, thunkAPI) => {
    try {
      return await activityService.getComments()
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const addComment = createAsyncThunk(
  'comments/add',
  async (data, thunkAPI) => {
    const userId = thunkAPI.getState().auth.user.id
    const { activityId, text } = data
    try {
      return await activityService.addComment(activityId, userId, text)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Slice
export const activitySlice = createSlice({
  name: "actvity",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
      state.message = ""
    },
    realTimeParticipations: (state, action) => {
      state.participations = action.payload
    },
    realTimeComments: (state, action) => {
      state.comments.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createActivity.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createActivity.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.activity = action.payload
        state.activities.push(action.payload)
      })
      .addCase(createActivity.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getActivities.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getActivities.fulfilled, (state, action) => {
        state.isLoading = false
        state.activities = action.payload
      })
      .addCase(getActivities.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getActivity.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getActivity.fulfilled, (state, action) => {
        state.isLoading = false
        state.activity = action.payload
      })
      .addCase(getActivity.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateActivity.fulfilled, (state, action) => {
        state.isLoading = false
        state.activity = action.payload
        state.activities = state.activities.map(activity => activity.id === action.payload.id ? (action.payload) : activity)
      })
      .addCase(deleteActivity.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.activities = state.activities.filter(activity => activity.id !== action.payload)
      })
      .addCase(getBookmarks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getBookmarks.fulfilled, (state, action) => {
        state.isLoading = false
        state.bookmarks = action.payload
      })
      .addCase(getBookmarks.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(createBookmark.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createBookmark.fulfilled, (state, action) => {
        state.isLoading = false
        state.bookmarks = action.payload
      })
      .addCase(createBookmark.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteBookmark.fulfilled, (state, action) => {
        state.isLoading = false
        state.bookmarks = action.payload
      })
      // .addCase(getFirstParticipations.pending, (state) => {
      //   state.isLoading = true
      // })
      // .addCase(getFirstParticipations.fulfilled, (state, action) => {
      //   state.isLoading = false
      //   state.isSuccess = true
      //   state.participations = action.payload
      // })
      // .addCase(getFirstParticipations.rejected, (state, action) => {
      //   state.isLoading = false
      //   state.isError = true
      //   state.message = action.payload
      // })
      .addCase(participate.pending, (state) => {
        state.isLoading = true
      })
      .addCase(participate.fulfilled, (state, action) => {
        state.isLoading = false
        state.message = action.payload
      })
      .addCase(participate.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.isLoading = false
        state.comments = action.payload
      })
      .addCase(getComments.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(addComment.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.isLoading = false
      })
      .addCase(addComment.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { reset, realTimeParticipations, realTimeComments } = activitySlice.actions
export default activitySlice.reducer