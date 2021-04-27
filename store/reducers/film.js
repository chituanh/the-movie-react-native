import { FAVORITEFILM, GETFILM } from "../actions/film";

const initialState = {
  film: null,
  favoriteFilm: null,
  purchasedFilm: null,
  listAction: null,
};

export default (state = initialState, action) => {
  switch (action.type) {

    /// lấy dữ liệu từ database xuống nè
    case GETFILM:
      var loadedAction = [];
      var loadedFilm = action.film;
      for (var i in loadedFilm) {
        for (var j in loadedFilm[i].Category) {
          if (loadedAction.includes(loadedFilm[i].Category[j]) == false)
            loadedAction.push(loadedFilm[i].Category[j])
        }
      }
      return {
        ...state,
        film: action.film,
        listAction: loadedAction,
      };

    // khi người dùng thích/bỏ thích một bộ phim nè
    case FAVORITEFILM:
      const filmFavIndex = state.film.findIndex(
        (prod) => prod.key === action.favorite
      );

      if (action.favorite == true) {
        return {
          ...state,
          favoriteFilm: state.favoriteFilm.concat(state.film[filmFavIndex]),
        };
      } else {
        return {
          ...state,
          favoriteFilm: state.favoriteFilm.filter(
            (prod) => prod.key !== action.idFilm
          ),
        };
      }
    default:
      return state;
  }
};
