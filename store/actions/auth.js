import User from "../../model/users";
import { List } from "react-native-paper";

export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const MUAFILM = "MUAFILM";
export const SUAINFO = "SUAINFO";

export const signup = (email, password, userName) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB0vfFka7rVQZf21aQ-PO5PbaiM5sHlPDs",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = errorId;
      if (errorId === "EMAIL_EXISTS") {
        message = "Email đã tồn tại!!";
      } else if (errorId === "TOO_MANY_ATTEMPTS_TRY_LATER")
        message = "Nhập nhiều quá rùi đó.......... hừm!!!";
      throw new Error(message);
    }

    const resData = await response.json();

    await fetch(
      `https://movie-app-af014-default-rtdb.firebaseio.com/user/${resData.localId}.json`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: userName,
          picture: "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg",
          emailId: email,
          address: "",
          country: "",
          balance: 100000000,
          listFilm: ["-MYYaZ2GQgHMqgfkla2s"],
        }),
      }
    );

    const info = new User(userName, 'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg', email, "", "", 100000000, []);

    dispatch({
      type: SIGNUP,
      token: resData.idToken,
      userId: resData.localId,
      userInfo: info,
    });
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB0vfFka7rVQZf21aQ-PO5PbaiM5sHlPDs",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = errorId;
      if (errorId === "EMAIL_NOT_FOUND") {
        message = "Email không được tìm thấy!!";
      } else if (errorId === "INVALID_PASSWORD")
        message = "Mật khẩu không chính xác!!";
      throw new Error(message);
    }

    const resData = await response.json();
    const responseOK = await fetch(
      `https://movie-app-af014-default-rtdb.firebaseio.com/user/${resData.localId}.json`
    );

    const cay = await responseOK.json();
    console.log(cay);
    var info = new User(
      cay.fullName,
      cay.picture,
      cay.emailId,
      cay.address,
      cay.country,
      cay.balance,
      cay.listFilm
    );
    console.log(info);

    dispatch({
      type: LOGIN,
      token: resData.idToken,
      userId: resData.localId,
      userInfo: info,
    });
  };
};

export const muaFilm = (userId, user, film) => {
  return async (dispatch) => {
    try {
      if (user.balance - film.Price < 0) {
        throw new Error("Tài khoản của bạn không đủ!!!");
      }
      const newUser = new User(
        user.fullName,
        user.picture,
        user.emailId,
        user.address,
        user.country,
        user.balance - film.Price,
        !("listLilm" in user) ? [...user.listFilm, film.Key] : [film.Key]
      );
      await fetch(
        `https://movie-app-af014-default-rtdb.firebaseio.com/user/${userId}.json`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: user.fullName,
            picture: user.picture,
            emailId: user.emailId,
            address: user.address,
            country: user.country,
            balance: user.balance - film.Price,
            listFilm: [...user.listFilm, film.Key],
          }),
        }
      );

      dispatch({
        type: MUAFILM,
        userInfo: newUser,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const updateInfo = (userId, userInfo, userName, diaChi, quocGia) => {
  return async (dispatch) => {
    try {
      console.log('Update info');
      const newUserInfo = new User(
        userName,
        userInfo.picture,
        userInfo.emailId,
        diaChi,
        quocGia,
        userInfo.balance,
        userInfo.listFilm
      );
      await fetch(
        `https://movie-app-af014-default-rtdb.firebaseio.com/user/${userId}.json`,
        {
          'method': 'PUT',
          headers: {
            "Content-Type": "application/json",
          },
          'body': JSON.stringify({
            fullName: userName,
            picture: userInfo.picture,
            emailId: userInfo.emailId,
            address: diaChi,
            country: quocGia,
            balance: userInfo.balance,
            listFilm: userInfo.listFilm,
          })
        }
      );

      dispatch({
        type: SUAINFO,
        userInfo: newUserInfo,
      })
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
