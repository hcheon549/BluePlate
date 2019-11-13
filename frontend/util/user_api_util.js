import axios from "axios";

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
        enrolled_school: user.enrolledSchool,
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

export const updateUserMeals = (userId, user) => {
  return axios({
    method: "PATCH",
    url: `api/users/${user.id}`,
    data: {
      user: {
        meal_left: user.id,
      }
    }
  });
};