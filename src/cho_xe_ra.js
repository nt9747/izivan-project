import React from 'react'
// import '../../styles/Login.css'
import { Link, Redirect } from 'react-router-dom'
import { requestGetListCarInfo, requestLogin } from './api'
import Cookie from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css'
import Content from './Layout/cho xe ra/Content';
import Layout_Admin from './Layout/Layout/Layout_Admin';
import './Layout/plugins/fontawesome-free/css/all.min.css'
import './Layout/dist/css/adminlte.min.css'
import './Layout/layout.css'



class cho_xe_ra extends React.Component {
   

    render() {
        return (<div className="cho_xe_ra">
            <Layout_Admin />
            <Content />
        </div>)

    
    }
}
export default cho_xe_ra