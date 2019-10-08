import axios from "axios";

export const updateUser = user => {
  return axios({
    method: "PATCH",
    url: `api/users/${user.id}`,
    data: {
      user: {
        email: user.email,
        password: user.password,
        name: user.name,
        meals_left: user.mealsLeft,
        enrolled_school: user.enrolledSchool,
        fname: user.fname,
        lname: user.lname,
        school_id: user.schoolId
      }
    }
  });
};
