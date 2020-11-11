import React from 'react'
// import '../../styles/Login.css'
import { Link, Redirect } from 'react-router-dom'
import { requestGetListCarInfo, requestLogin } from './api'
import Cookie from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css'
import Content from './Layout/bao cao doanh thu/bao_cao_doanh_thu';
import Layout from './Layout/Layout/Layout_Admin';
import './Layout/plugins/fontawesome-free/css/all.min.css'
import './Layout/dist/css/adminlte.min.css'
import './Layout/layout.css'



class doanhthu extends React.Component {
   

    render() {
        return (<div className="doanhthu">
            <Layout />
            <Content />
        </div>)

    
    }
}
export default doanhthu