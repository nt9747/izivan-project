import React, { Component } from 'react';
import Logo from '../img/Logo-Izivan.png'
import user2 from '../dist/img/user2-160x160.jpg'
import Cookie from 'js-cookie';
import { requestLogin } from '../../api';


export default class Layout extends Component {
    async exitLogin() {
        try {
            Cookie.set('SESSION_ID', null)
            alert("Hết quyền truy cập rồi!")
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
            <aside class="main-sidebar sidebar-dark-primary elevation-4" style={{backgroundColor: '#538066'}}>

                <a href="./home" class="brand-link" style={{height: '60px'}}>
                    <img src={Logo} style={{ width: '200px'}} alt="AdminLTE Logo" class="brand-image"
                        id="admin2" />
                
                </a>
                <br/>
                <div class="sidebar">

                    <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div class="image">
                            <img src={user2}class="img-circle elevation-2" alt="User Image" />
                        </div>
                        <div class="info">
                            <a style={{float:'right'}}>
                                <button type="submit" onClick={() => this.exitLogin()}
                                    className="btn btn-success">
                                    <b>Đăng xuất</b>
                                </button>
                            </a>
                        </div>
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
                                           
                                            <p>Thêm User</p>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="pages/Quản lí người dùng/user_manager.html">
                                           
                                            <p>Quản trị hoạt động</p>
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
                                        <a href="pages/Quản lí xe/Tong_hop.html">
                                           
                                            <p>Tổng hợp</p>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="pages/Quản lí xe/Bao_cao_luu_xe.html">
                                           
                                            <p>Báo cáo lưu xe</p>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li class="nav-item has-treeview menu-close">
                                <a href="#" class="nav-link active">

                                    <p>
                                        Quản trị dịch vụ
                
                                    </p>
                                </a>
                                <ul >
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
                                </ul>
                            </li>
                            <li class="nav-item has-treeview menu-close">
                                <a href="#" class="nav-link active">

                                    <p>
                                        Báo cáo tổng hợp
                
                                    </p>
                                </a>
                                <ul >
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
                                </ul>
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
                                        <a href="pages/Quản trị/them_loai_hang.html">
                                           
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
                                           
                                            <p>Xe trong bãi</p>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="pages/Phòng loa/xe_ra_vao.html">
                                           
                                            <p>Xe ra vào</p>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>

                </div>
            </aside>

</div>
        )
    }
}

