export const getPreferredCity = (session, users, cities) => {
  let currentUser = users[session.id];

  let preferredCity = Object.values(cities).filter(
    city => currentUser.preferredCity === city.name
  );

  preferredCity = preferredCity[Object.keys(preferredCity)[0]] || {
    latitude: 37.789232,
    longitude: -122.409499
  };

  return preferredCity;
};

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

export const getCityReservations = (reservations, meals, sel) => {
  let mealIds = [];
  Object.values(meals).forEach(tr => {
    mealIds.push(tr.id);
  });

  let cityReses = [];
  Object.values(reservations).forEach(res => {
    if (mealIds.includes(res.mealId)) {
      cityReses.push(res);
    }
  });

  if (sel) {
    while (cityReses.length < 5) {
      cityReses.push([]);
    }
  }
  return cityReses;
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
