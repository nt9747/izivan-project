import axios from "axios";
import Cookie from 'js-cookie';
// const Reactotron = process.env.NODE_ENV !== "production" && require("reactotron-react-js").default; 

function createAxios() {
  var axiosInstant = axios.create();
  axiosInstant.defaults.baseURL = "http://192.168.1.149:3001/";
  axiosInstant.defaults.timeout = 20000;
  axiosInstant.defaults.headers = { "Content-Type": "application/json" };

  axiosInstant.interceptors.request.use(
    async config => {
      config.headers.token = Cookie.get('SESSION_ID');
      return config;
    },
    error => Promise.reject(error)
  );


  //   axiosInstant.interceptors.response.use(
  //     response => {
  //     Reactotron.apisauce(response);

  //     // if (response.data && response.data.code == 403) {
  //     //   showMessages(
  //     //     R.strings().notif_tab_cus,
  //     //     R.strings().require_login_againt,
  //     //     () =>
  //     //       AsyncStorage.removeItem(ASYNC_STORAGE.TOKEN, () => {
  //     //         const store = require("@app/redux/store").default;
  //     //         store.dispatch({ type: "reset" });
  //     //         NavigationUtil.navigate(SCREEN_ROUTER_AUTH.AUTH_LOADING);
  //     //       })
  //     //   );
  //     // } else if (response.data && response.data.status != 1)
  //     //   showMessages(R.strings().notif_tab_cus, response.data.message);
  //     return response;
  //   });

  return axiosInstant;
}


// return axiosInstant;
// }

export const getAxios = createAxios();

/* Support function */
function handleResult(api) {
  return api.then(res => {
    if (res.data.status != 1) {
      return Promise.reject(res.data);
    }
    return Promise.resolve(res.data);
  });
}

export const requestHomeData = (deviceID = "") => {
  return handleResult(
    getAxios.get(`api/Service/GetHomeScreen?deviceID=${deviceID}`)
  );
};

export const requestGetUserInfo = () => {
  return handleResult(getAxios.get(`users/getUserInfo`))
}

export const requestLogin = (payload) => {
  return handleResult(getAxios.post('/users/login', {
    username: payload.USERNAME,
    password: payload.PASS
  }))
}

export const requestGetListCarInfo = (payload) => {
  return handleResult(getAxios.post(`/listCar/listCarIn?page=${payload.PAGE}&limit=10`, {
    fromDate: payload.FROMDATE,
    toDate: payload.TODATE,
    plateNumber: payload.PLATENUMBER,
    portIn: payload.PORTIN,
    numberCar: payload.NUMBERCAR,
    loaiHang: payload.LOAIHANG,
  }))
}

export const requestGetListCarExcel = (payload) => {
  return handleResult(getAxios.post(`/listCar/listCarExel` , {
    fromDate: payload.FROMDATE,
    toDate: payload.TODATE,
    plateNumber: payload.PLATENUMBER,
    portIn: payload.PORTIN,
    numberCar: payload.NUMBERCAR,
    loaiHang: payload.LOAIHANG,
  }))
}

export const requestRegisterUser = (payload) => {
  return handleResult(getAxios.post(`/users/addUser` , {
    UserName: payload.USERNAME,
    FullName: payload.FULLNAME,
    PassWord: payload.PASSWORD,
    IsSuperAdmin: payload.SUPERADMIN,
    IsKeToan: payload.ISKETOAN,
    IsPhongLoa: payload.ISPHONGLOA,
  }))
}