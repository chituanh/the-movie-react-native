import Film from "../../model/film";

export const GETFILM = "GETFILM";
export const FAVORITEFILM = "FAVORITEFILM";
export const PAYFILM = "PAYFILM";

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
            resData[key].View
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

export const favoriteFilm = (idUser, idFilm, isFav) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://movie-app-af014-default-rtdb.firebaseio.com/favorite/${idUser}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idFilm,
            isFav,
          }),
        }
      );
      dispatch({
        type: FAVORITEFILM,
        idFilm: idFilm,
        favorite: isFav,
      });
    } catch (error) {
      console.log("Loi favorite");
    }
  };
};
