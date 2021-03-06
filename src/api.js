import axios from "axios";
import Cookie from 'js-cookie';
// const Reactotron = process.env.NODE_ENV !== "production" && require("reactotron-react-js").default; 

function createAxios() {
  var axiosInstant = axios.create();
  axiosInstant.defaults.baseURL = "http://localhost:3001/";
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

export const requestGetListCar = (payload) => {
  return handleResult(getAxios.post(`${payload.CONG}page=${payload.PAGE}&limit=${payload.LIMIT}`, {
    fromDate: payload.FROMDATE,
    toDate: payload.TODATE,
    plateNumber: payload.PLATENUMBER,
    portIn: payload.PORTIN,
    numberCar: payload.NUMBERCAR,
    loaiHang: payload.LOAIHANG,
    portOut: payload.PORTOUT,
    loaiXe: payload.LOAIXE,
    orderNumber: payload.ORDERNUMBER,
    bienCont: payload.BIENCONT,
    bienMooc: payload.BIENMOOC,
  }))
}
export const requestChoXeRa = (payload) => {
  return handleResult(getAxios.post(`/listCar/exportCar`, {
    BienSoXe: payload.BIENSOXE,
    BienCont: payload.BIENCONT,
    BienMoc: payload.BIENMOC,
    LoaiHang: payload.LOAIHANG,
    LoaiXeChiTiet: payload.LOAIXECHITIET,
    LoaiXe: payload.LOAIXE,
    CongRa: payload.CONGRA,
    CongRaName: payload.CONGRANAME,
    LinkAnhBienSo: payload.LINKANHBIENSO,
    LinkAnhDauXe: payload.LINKANHDAUXE,
    LinkAnhFull: payload.LINKANHFULL,
    IsDongYXeRa: payload.ISDONGYXERA,
    IsXeKhongHang: payload.ISXEKHONGHANG,
    IsXeQuayDau: payload.ISXEQUAYDAU,
    CarNumber_ID: payload.CARNUMBER_ID,
    EventID: payload.EVENTID,
  }))
}

// export const requestGetListLoaiXe = (payload) => {
//   return handleResult(getAxios.get(`${payload.LX}`, {
//     fromDate: payload.FROMDATE,
//     toDate: payload.TODATE,
//     plateNumber: payload.PLATENUMBER,
//     portIn: payload.PORTIN,
//     numberCar: payload.NUMBERCAR,
//     loaiHang: payload.LOAIHANG,
//     portOut: payload.PORTOUT,
//     loaiXe: payload.LOAIXE
//   }))
// }

export const requestGetListLoaiXe = (payload) => {
  return handleResult(getAxios.post(`${payload.THONGKELOAIXE}`,{
    fromDate: payload.FROMDATE,
    toDate: payload.TODATE,
    plateNumber: payload.PLATENUMBER,
    portOut: payload.PORTOUT,
    portIn: payload.PORTIN,
    numberCar: payload.NUMBERCAR,
    loaiHang: payload.LOAIHANG,
    loaiXe: payload.LOAIXE,
  }))
}  

export const requestGetListCarExcel = (payload) => {
  return handleResult(getAxios.post(`${payload.CONG}page=${payload.PAGE}&limit=1000000000000000000`, {
    fromDate: payload.FROMDATE,
    toDate: payload.TODATE,
    plateNumber: payload.PLATENUMBER,
    portIn: payload.PORTIN,
    numberCar: payload.NUMBERCAR,
    loaiHang: payload.LOAIHANG,
    portOut: payload.PORTOUT,
    loaiXe: payload.LOAIXE,
    orderNumber: payload.ORDERNUMBER,
  }))
} 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 

export const requestRegisterUser = (payload) => {
  return handleResult(getAxios.post(`/users/addUser` , {
    UserName: payload.USERNAME,
    FullName: payload.FULLNAME,
    PassWord: payload.PASSWORD,
    IsSuperAdmin: payload.ISSUPERADMIN,
    IsKeToan: payload.ISKETOAN,
    IsPhongLoa: payload.ISPHONGLOA,
  }))
}

export const requestGetAllUser = (payload) => {
  return handleResult(getAxios.get(`users/list`,{
    username: payload.USERNAME,
    password: payload.PASS
  }))
}

export const requestDeleteUser = (payload) => {
  return handleResult(getAxios.get(`/users/deleteUser?UserID=${payload.USERID}`))
}

export const resquestEditUser = (payload) => {
  return handleResult(getAxios.post(`/users/updateUserInfoByAdmin`, {
    UserID: payload.USERID,
    IsSuperAdmin: payload.ISSUPERADMIN,
    IsKeToan: payload.ISKETOAN,
    IsPhongLoa: payload.ISPHONGLOA
  }))
}

export const resquestThemPhieuHaiQuan = (payload) => {
  return handleResult(getAxios.post(`/listCar/listCarIn/UpdatePhieuHaiQuan?EventID=${payload.EVENTID}`, {
    PhieuHaiQuan: payload.PHIEUHAIQUAN
  }))
}

export const resquestChangeInfoCar = (payload) => {
  return handleResult(getAxios.post(`/listCar/${payload.UPDATEXEPORT}`, {
    EventID: payload.EVENTID,
    BienSoXe: payload.BIENSOXE,
    BienCont: payload.BIENCONT,
    BienMoc: payload.BIENMOC,
    LoaiHang: payload.LOAIHANG,
    LoaiXeID: payload.LOAIXEID
  }))
}

export const resquestExportKiemhoa = (payload) => {
  return handleResult(getAxios.get(`/listCar/listCarIn/UpdateExportCar?EventID=${payload.EVENTID}`, {
  }))
}

export const resquestGetListCarType = (payload) => {
  return handleResult(getAxios.get(`/listCar/listCarType`, {
  }))
}


export const resquestGetExportCar = (payload) => {
  return handleResult(getAxios.post(`/listCar/exportCar`, {
  }))
}

export const resquestGetListLoaiHang = (payload) => {
  return handleResult(getAxios.get(`/loaihang/`, {
  }))
}


