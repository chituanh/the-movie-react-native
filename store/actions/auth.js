import User from "../../model/users";

export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";

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
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: userName,
          picture: "",
          emailId: email,
          address: "",
          country: "",
          balance: 100000000,
        }),
      }
    );

    const info = new User(userName, "", email, "", "", 100000000);

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
    var info ;
    for(const key in cay) {
      info = new User(
        cay[key].fullName,
        cay[key].picture,
        cay[key].emailId,
        cay[key].address,
        cay[key].country,
        cay[key].balance
      );
    }
    console.log(info);
    
    dispatch({
      type: LOGIN,
      token: resData.idToken,
      userId: resData.localId,
      userInfo: info,
    });
  };
};
