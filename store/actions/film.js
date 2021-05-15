import Film from "../../model/film";

export const GETFILM = "GETFILM";
export const REVIEWFILM = "REVIEWFILM";
export const SEARCHFILM = 'SEARCHFILM';

// Lấy dữ liệu film từ database
export const getchFilm = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://movie-app-af014-default-rtdb.firebaseio.com/film.json",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Lỗi lấy dữ liệu!!!");
      const resData = await response.json();
      const loadedProducts = [];

      for (const key in resData) {
        loadedProducts.push(
          new Film(
            key,
            resData[key]["Name"],
            resData[key].LinkFilm,
            resData[key].Image,
            resData[key].Category,
            resData[key].Rate,
            resData[key].Director,
            resData[key].Stars,
            resData[key].Duration,
            resData[key].ReleaseDate,
            resData[key].Writes,
            resData[key].Synopsis,
            resData[key].Price,
            resData[key].View,
            resData[key].Evalueate,
          )
        );
      }

      dispatch({
        type: GETFILM,
        film: loadedProducts,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const reviewFlim = (
  userId,
  userInfo,
  film,
  txtTitle,
  txtReview,
  rate
) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://movie-app-af014-default-rtdb.firebaseio.com/film/${film.Key}/Evalueate.json`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      var current = new Date();
      const responseData = await response.json();
      var newData;
      if (responseData == null) {
        newData = [
          {
            imageUser: userInfo.picture,
            nameUser: userInfo.fullName,
            idUser: userId,
            rate: rate,
            title: txtTitle,
            review: txtReview,
            like: 0,
            time: current.toLocaleString(),
          },
        ];
      } else {
        newData = [
          ...responseData,
          {
            imageUser: userInfo.picture,
            nameUser: userInfo.fullName,
            idUser: userId,
            rate: rate,
            title: txtTitle,
            review: txtReview,
            like: 0,
            time: current.toLocaleString(),
          },
        ];
      }
      var trungBinh = 0;
      for(hihi in newData) {
        trungBinh += newData[hihi].rate
      }

      await fetch(
        `https://movie-app-af014-default-rtdb.firebaseio.com/film/${film.Key}.json`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Category: film.Category,
            Evalueate: newData,
            Director: film.Director,
            Duration: film.Duration,
            Image: film.Image,
            LinkFilm: film.LinkFilm,
            Name: film.Name,
            Price: film.Price,
            Rate: trungBinh / newData.length,
            ReleaseDate: film.ReleaseDate,
            Stars: film.Stars,
            Synopsis: film.Synopsis,
            View: film.View,
            Writes: film.Writes,
          }),
        }
      );
      var NewFlim = new Film(
        film.Key,
        film.Name,
        film.LinkFilm,
        film.Image,
        film.Category,
        trungBinh / newData.length,
        film.Director,
        film.Stars,
        film.Duration,
        film.ReleaseDate,
        film.Writes,
        film.Synopsis,
        film.Price,
        film.View,
        newData,
      );
      dispatch({
        type: REVIEWFILM,
        indexNewFilm: NewFlim,
      });
    } catch (error) {
      console.log("Lỗi");
    }
  };
};

export const searchFilm = (keySearch) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://movie-app-af014-default-rtdb.firebaseio.com/film.json",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Lỗi lấy dữ liệu!!!");
      const resData = await response.json();
      const loadedProducts = [];

      for (const key in resData) {
        loadedProducts.push(
          new Film(
            key,
            resData[key]["Name"],
            resData[key].LinkFilm,
            resData[key].Image,
            resData[key].Category,
            resData[key].Rate,
            resData[key].Director,
            resData[key].Stars,
            resData[key].Duration,
            resData[key].ReleaseDate,
            resData[key].Writes,
            resData[key].Synopsis,
            resData[key].Price,
            resData[key].View,
            resData[key].Evalueate,
          )
        );
      }

      dispatch({
        type: SEARCHFILM,
        searchFilm: loadedProducts.filter((item) => item.Name.includes(keySearch) == true),
      });

    } catch(error) {
      throw new Error("Lỗi lấy dữ liệu");
    }
  }
}

