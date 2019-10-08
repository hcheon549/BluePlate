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
        company_name: user.companyName,
        image_url: user.imageUrl
      }
    }
  });
};
