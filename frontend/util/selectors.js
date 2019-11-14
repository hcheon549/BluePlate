export const getEnrolledSchool = (session, currentUser, schools) => {
  let enrolledSchool = Object.values(schools).filter(
    school => currentUser.enrolledSchool === school.name
  );

  enrolledSchool = enrolledSchool[Object.keys(enrolledSchool)[0]] || {
    latitude: 37.789232,
    longitude: -122.409499
  };

  return enrolledSchool;
};

export const getCurrentSchool = (shops, schools) => {
  let currentSchool =  shops.length == 0 ? {
    latitude: 37.789232,
    longitude: -122.409499
  } : schools[shops[0].schoolId]

  return currentSchool;
}

export const getFavIds = favorites => {
  let favArr = Object.values(favorites);
  let favs = {};

  favArr.forEach(f => {
    favs[f.shopId] = f.id;
  });
  return favs;
};

export const getFavorites = favorites => {
  let favArr = Object.values(favorites);
  let favs = {};

  favArr.forEach(f => {
    favs[f.shopId] = true;
  });
  return favs;
};

export const getFavMeals = (meals, favs) => {
  return meals.filter(meal => favs[meal.shopId]);
};

export const getFavShops = (shops, favs) => {
  return shops.filter(shop => favs[shop.id]);
};

export const mapShopIdToMeal = meals => {
  let mealHash = {};

  meals.forEach(meal => {
    mealHash[meal.shopId] = meal;
  });
  return mealHash;
};

export const getSchoolReservations = (reservations, meals, sel) => {
  let mealIds = [];
  Object.values(meals).forEach(tr => {
    mealIds.push(tr.id);
  });

  let schoolReses = [];
  Object.values(reservations).forEach(res => {
    if (mealIds.includes(res.mealId)) {
      schoolReses.push(res);
    }
  });

  if (sel) {
    while (schoolReses.length < 5) {
      schoolReses.push([]);
    }
  }
  return schoolReses;
};

const addDays = function(date, days) {
  var dat = new Date(date.valueOf());
  dat.setDate(dat.getDate() + days);
  return dat;
};

const compareDates = (dr, djs) => {
  djs = djs.split("T")[0];

  if (djs !== dr) {
    return false;
  }

  return true;
};

export const getPastFive = reses => {
  let djs = addDays(new Date(), 1);

  djs = new Date(djs.getTime() - djs.getTimezoneOffset() * 60000).toJSON();

  let fiveReses = [];
  let j = 0;
  for (let i = 0; i < 5; i++) {
    if (compareDates(reses[j].date, djs)) {
      fiveReses.push(reses[j]);
      j = j + 1;
    } else {
      fiveReses.push([]);
    }
    djs = new Date(djs);
    djs = addDays(djs, -1);
    djs = djs.toJSON();
  }

  return fiveReses;
};
