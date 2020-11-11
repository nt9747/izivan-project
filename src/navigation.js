import React from 'react';
import { Switch, Route,  BrowserRouter as Router , withRouter } from 'react-router-dom';

import App  from "./App";
import  Register  from "./Register";
import  Home  from "./Home";
import  Error  from "./Error";
import xe_trong_bai from "./xe_trong_bai"
import cho_xe_ra from "./cho_xe_ra"
import thong_tin_xe from "./thong_tin_xe"
import FullList from "./FullList"
import listUser from "./listUser"
import addUser from "./addUser"
import ThemHang from "./them_loai_hang"
import XeRaVao from "./xe_ra_vao"
import empty from "./empty"
import doanhthu from "./bao_cao_doanh_thu"
import luubai from "./xe_luu_bai"

class Routes extends React.Component {
    render(){
        return (
            <Router>
          <Switch>
            <Route exact path="/"  component={App} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/error" component={Error} />
            <Route exact path="/XeTrongBai" component={xe_trong_bai} />
            <Route exact path="/ChoXeRa" component={cho_xe_ra} />
            <Route exact path="/ThongTinXe" component={thong_tin_xe} />
            <Route exact path="/ExportExcel" component={FullList} />
            <Route exact path="/ListUser" component={listUser} />
            <Route exact path="/AddUser" component={addUser} />
            <Route exact path="/ThemLoaiHang" component={ThemHang} />
            <Route exact path="/XeRaVao" component={XeRaVao} />
            <Route exact path="/Empty" component={empty} />
            <Route exact path="/Doanhthu" component={doanhthu} />
            <Route exact path="/XeLuuBai" component={luubai} />
          </Switch>
          </Router>
        );
    }
  
}

export default (Routes);