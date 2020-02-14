import axios from "axios";

export const getAllUsers = () => {
  return axios({
    method: "GET",
    url: 'api/users'
  })
}

export const getUser = userId => {
  return axios({
    method: "GET",
    url: `api/users/${userId}`
  })
}

export const updateUser = user => {
  return axios({
    method: "PATCH",
    url: `api/users/${user.id}`,
    data: {
      user: {
        email: user.email,
        password: user.password,
        meals_left: user.mealsLeft,
        fname: user.fname,
        lname: user.lname,
        school_id: user.school_id,
      }
    }
  });
};

export const updateUserEmail = userData => {
  return axios({
    method: "PATCH",
    url: `api/users/${userData.userId}`,
    data: {
      user: {
        email: userData.email,
      }
    }
  });
};

export const updateUserPassword = user => {
  console.log(user)
  return axios({
    method: "PATCH",
    url: `/api/users/${user.id}`,
    data: {
      user: {
        password: user.password,
      }
    }
  })
}

export const updateUserName = userData => {
  return axios({
    method: "PATCH",
    url: `api/users/${userData.userId}`,
    data: {
      user: {
        fname: userData.fname,
        lname: userData.lname
      }
    }
  });
};

export const updateUserMeals = (userData) => {
  return axios({
    method: "PATCH",
    url: `api/users/${userData.id}`,
    data: {
      user: {
        meals_left: userData.meals_left,
      }
    }
  });
};

export const createLead = (leadData) => {
  return axios({
    method: 'POST',
    url: 'api/leads',
    data: leadData
  })
}