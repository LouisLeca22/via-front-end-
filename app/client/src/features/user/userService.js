import { publicReq, privateReq } from '../../utils/axiosMethod'



// Get users 
const getUsers = async () => {

  const response = await publicReq.get('/user')
  return response.data
}

// Get user by Id
const getUser = async (userId) => {
  const response = await publicReq.get(`/user/${userId}`)

  return response.data
}

//Update Activity 
const updateUser = async (userId, userData) => {
  console.log(userId)
  const response = await privateReq.put("/user/"+ userId, userData)

  return response.data
}

// Delete Actvity 
const deleteUser = async (userId) => {

  const response = await privateReq.delete("/user/" + userId)

  if (response.status === 200 ){
    return userId
  }
}


const recipeService = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
}

export default recipeService