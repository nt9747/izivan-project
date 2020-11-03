import React from 'react'
// import '../../styles/Login.css'
import { Link, Redirect } from 'react-router-dom'
import { requestGetListCarInfo, requestLogin } from './api'
import Cookie from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css'
import Content from './Layout/them loai hang/add';
import Layout from './Layout/Layout/Layout_Admin';
import './Layout/plugins/fontawesome-free/css/all.min.css'
import './Layout/dist/css/adminlte.min.css'
import './Layout/layout.css'



class ThemHang extends React.Component {
   

    render() {
        return (<div className="ThemHang">
            <Layout />
            <Content />
        </div>)

    
    }
}
export default ThemHang