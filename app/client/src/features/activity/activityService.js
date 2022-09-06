import { publicReq, privateReq } from '../../utils/axiosMethod'

// Create new activity
const createActivity = async (activityData, userId) => {
  const response = await privateReq.post(`/user/${userId}/activity`, activityData)
  return response.data
}

// Get activities 
const getActivities = async () => {
  const response = await publicReq.get('/activity')
  return response.data
}

// Get activity by Id
const getActivity = async (activityId) => {
  const response = await publicReq.get(`/activity/${activityId}`)
  return response.data
}

//Update Activity 
const updateActivity = async (activityId, activityData, userId) => {
  const response = await privateReq.put(`user/${userId}/activity/${activityId}`, activityData)
  return response.data
}

// Delete Actvity 
const deleteActivity = async (activityId, userId) => {
  await privateReq.delete(`/user/${userId}/activity/${activityId}`)
  return activityId
}

// get bookmarks
const getBookmarks = async (userId) => {
  const res = await privateReq.get(`/user/${userId}/bookmark/`)
  const bookmarks = res.data.activity.map(activity => activity.id)
  return bookmarks
}

// add bookmark
const createBookmark = async (bookmarkId, userId) => {
  const res = await privateReq.post(`/user/${userId}/bookmark/`, { bookmarkId: bookmarkId })
  const bookmarks = res.data.activity.map(activity => activity.id)
  return bookmarks
}

// delete bookmark
const deleteBookmark = async (bookmarkId, userId) => {
  const res = await privateReq.delete(`/user/${userId}/bookmark/${bookmarkId}`)
  const bookmarks = res.data.activity.map(activity => activity.id)
  return bookmarks
}

// first participations 
// const getFirstParticipations = async (userId) => {
//   console.log(userId)
// const res = await privateReq.get(`/activity/${userId}/participate/`)
// return res.data
// }

//  participate 
const participate = async (activityId, userId) => {
  const res = await privateReq.post(`/activity/${userId}/participate/`, { activityId })
  return res.data
}

// get comments 
const getComments = async () => {
  const res = await privateReq.get(`/activity/comments/`)
  return res.data
}

// add comment
const addComment = async (activityId, userId, text) => {
  const res = await privateReq.post(`/activity/${activityId}/comment/`, { userId, text })
  console.log(res.data)
  return res.data.message
}

const recipeService = {
  createActivity,
  getActivities,
  getActivity,
  updateActivity,
  deleteActivity,
  getBookmarks,
  createBookmark,
  deleteBookmark,
  participate,
  getComments,
  addComment,
}

export default recipeService