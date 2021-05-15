import { FAVORITEFILM, GETFILM, REVIEWFILM, SEARCHFILM } from "../actions/film";

const initialState = {
  film: null,
  purchasedFilm: null,
  listAction: null,
  searchFilm: null,
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
    
    // Đánh giá một flim nào đó 
    case REVIEWFILM: 
      const ItemKey = action.indexNewFilm.Key;
      const updateFilm = [...state.film];
      const indexItem = updateFilm.findIndex((prod) => prod.Key == ItemKey);
      console.log(indexItem);
      updateFilm[indexItem] = action.indexNewFilm;
      return {
        film: updateFilm,
        purchasedFilm: state.purchasedFilm,
        listAction: state.listAction,
        searchFilm: state.searchFilm,
      }
    // tìm kiếm flim 
    case SEARCHFILM: 
      return {
        ...state,
        searchFilm: action.searchFilm,
      }

    default:
      return state;


  }
};
