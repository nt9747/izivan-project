import React, { Component } from 'react';
import Logo from '../img/Logo-Izivan.png'
import LTE from "../img/AdminLTELogo.png"
import user2 from '../dist/img/user2-160x160.jpg'
import Cookie from 'js-cookie';
import { requestLogin } from '../../api';


// import '../../../node_modules/adminlte-2-react/src/adminlte/js/adminlte.min.js';
// import '../../../node_modules/jquery/dist/jquery.min.js'
// import "../../../node_modules/jquery-ui-dist/jquery-ui.min.js"
// import '../../../node_modules/bootstrap//dist/js/bootstrap.bundle.min.js'

export default class Layout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showDichVu: true,
            showTongHop : true,
        }
        this.toggleDichVu = this.toggleDichVu.bind(this)
        this.toggleTongHop = this.toggleTongHop.bind(this)
        
    }
    toggleDichVu = () => {
        const { showDichVu } = this.state;
        this.setState({ showDichVu: !showDichVu})
    }

    toggleTongHop = () => {
        const { showTongHop } = this.state;
        this.setState({ showTongHop: !showTongHop})
    }

    async exitLogin() {
        try {
            Cookie.set('SESSION_ID', null)
            window.location.href = '/';
        } catch (err) {
            throw (err)
        }
    }

    handleTextChange(field, event) {
        this.setState({
            [field]: event.target.value
        })
    }
    render() {
        return (
       
            <div class="hold-transition sidebar-mini">
        <nav class="main-header navbar navbar-expand navbar-white navbar-light">
            <ul class="navbar-nav">
                    <li class="nav-item">
                        <a data-widget="pushmenu" href="#" role="button">
                            <i class="fas fa-bars"></i>
                        </a>
                        
                    </li>
            </ul>
            <ul class="navbar-nav ml-auto">
            </ul>
        </nav>
            <aside class="main-sidebar sidebar-dark-primary elevation-4" style={{backgroundColor: '#484848'}}>

                <a href="./home" class="brand-link" style={{height: '60px'}}>
                <svg style={{marginRight: '10px'}} width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-truck" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
</svg>
      <span style = {{color: "white"}} class="brand-text font-weight-light">IZIVAN COMPANY</span>              
                </a>
                <br/>
                <div class="sidebar">
                            <div>

                               <font color="white"><p style={{ textAlign: 'center', fontSize: '28px'}}>HELLO ADMIN</p></font>
                            </div>
                        
                    <nav class="mt-2">
                        <ul class="nav nav-pills  flex-column" data-widget="treeview" role="menu" data-accordion="false">
<li class="nav-item has-treeview menu-close">
                                <a href="#" class="nav-link active">

                                    <p>
                                        Quản lí người dùng
                
                                    </p>
                                </a>
                                <ul >
                                    <li class="nav-item">
                                        <a href="./AddUser" >
                                           
                                            <p>Thêm tài khoản</p>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="./ListUser">
                                           
                                            <p>Quản trị tài khoản</p>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li class="nav-item has-treeview menu-close">
                                <a href="#" class="nav-link active">

                                    <p>
                                        Quản lí xe
                
                                    </p>
                                </a>
                                <ul >
                                    <li class="nav-item">
                                        <a href="/home">
                                           
                                            <p>Tổng hợp</p>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="/XeLuuBai">
                                           
                                            <p>Báo cáo lưu xe</p>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="/Doanhthu">
                                           
                                            <p>Báo cáo doanh thu</p>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li class="nav-item has-treeview menu-close">
                                <a href="#" class="nav-link active">

                                    <p onClick={this.toggleDichVu}>
                                        Quản trị dịch vụ
                
                                    </p>
                                </a>
                                {this.state.showDichVu && <ul  >
                                    <li class="nav-item">
<a href="pages/Quản trị dịch vụ/boc_xep.html">
                                           
                                            <p>Dịch vụ bốc xếp</p>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="pages/Quản trị dịch vụ/kiem_hoa.html">
                                           
                                            <p>Dịch vụ kiểm hóa</p>
                                        </a>
                                    </li>
                                </ul> }
                            </li>
                            
                            <li class="nav-item has-treeview menu-close">
                                <a href="#" class="nav-link active">

                                    <p onClick={this.toggleTongHop}>
                                        Báo cáo tổng hợp
                
                                    </p>
                                </a>
                                {this.state.showTongHop && <ul>
                                    <li class="nav-item">
                                        <a href="pages/Báo cáo tổng hợp/theo_doi_nhap.html">
                                           
                                            <p>Phiếu theo dõi nhập</p>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="pages/Báo cáo tổng hợp/hai_quan_theo_thang.html">
                                           
                                            <p>Hải quan theo tháng</p>
                                        </a>
                                    </li>
                                </ul>}
                            </li>
                            <li class="nav-item has-treeview menu-close">
                                <a href="#" class="nav-link active">
                                    <p>
                                        Quản trị
                
                                    </p>
                                </a>
                                <ul >
                                    <li class="nav-item">
                                        <a href="./ThongTinXe" >
                                           
                                            <p>Theo dõi thông tin xe</p>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="./ThemLoaiHang">
                                           
                                            <p>Thêm loại hàng</p>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="./ChoXeRa">
<p>Cho xe ra</p>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li class="nav-item has-treeview menu-close">
                                <a href="#" class="nav-link active">

                                    <p>
                                        Phòng loa
                
                                    </p>
                                </a>
                                <ul >
                                    <li class="nav-item">
                                        <a href="./XeTrongBai" >
                                           
                                            <p>Xe trong bãi</p>s
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="./XeRaVao">
                                           
                                            <p>Xe ra vào</p>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <div>
                                <button style={{width: '235px'}} type="submit" onClick={() => this.exitLogin()}
                                    className="btn btn-danger">
                                    <b>Đăng xuất</b>
                                </button>
                            </div>
                        </ul>
                    </nav>

                </div>
            </aside>

</div>

        )
    }
}