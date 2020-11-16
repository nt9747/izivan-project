import React, { Component } from 'react';
import Logo from '../img/Logo-Izivan.png'
import LTE from "../img/AdminLTELogo.png"
import user2 from '../dist/img/user2-160x160.jpg'
import Cookie from 'js-cookie';
import { requestLogin } from '../../api';
import 'jquery';



// import '../../../node_modules/jquery/dist/jquery.min.js';
import '../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import '../../../node_modules/adminlte-2-react/src/adminlte/js/adminlte.min.js';
import '../../../node_modules/admin-lte/dist/js/adminlte.min.js';

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
            <aside class="main-sidebar sidebar-dark-primary elevation-4" style={{backgroundColor: '#484848'}}>

                <a href="./home" class="brand-link" style={{height: '60px'}}>
                <img src={LTE} alt="AdminLTE Logo" class="brand-image img-circle elevation-3"
           style={{opacity: '.8'}}/>
      <span class="brand-text font-weight-light">IZIVAN COMPANY</span>              
                </a>
                <br/>
                <div class="sidebar">
                    <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div class="image">
                            <img src={user2}class="img-circle elevation-2" alt="User Image" />
                        </div>
                        <div class="info">
                        <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
                        <br/>
                            <a style={{float:'right'}}>
                                <button type="submit" onClick={() => this.exitLogin()}
                                    className="btn btn-success">
                                    <b>Đăng xuất</b>
                                </button>
                            </a>
                        </div>
                    </div>
                    <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
         
          <li class="nav-item has-treeview menu-close">
            <a href="#" class="nav-link active">
              
             <p>
                Quản lí người dùng
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="pages/Quản lí người dùng/add_user.html" class="nav-link active">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Thêm User</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="pages/Quản lí người dùng/user_manager.html" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Quản trị hoạt động</p>
                </a>
              </li>
            </ul>
          </li>
           <li class="nav-item has-treeview menu-close">
            <a href="#" class="nav-link active">
       
             <p>
                Quản lí xe
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="pages/Quản lí xe/Tong_hop.html" class="nav-link active">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Tổng hợp</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="pages/Quản lí xe/Bao_cao_luu_xe.html" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Báo cáo lưu xe</p>
                </a>
              </li>
            </ul>
          </li>
           <li class="nav-item has-treeview menu-close">
            <a href="#" class="nav-link active">
       
             <p>
                Quản trị dịch vụ
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="pages/Quản trị dịch vụ/boc_xep.html" class="nav-link active">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Dịch vụ bốc xếp</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="pages/Quản trị dịch vụ/kiem_hoa.html" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Dịch vụ kiểm hóa</p>
                </a>
              </li>
            </ul>
          </li>
           <li class="nav-item has-treeview menu-close">
            <a href="#" class="nav-link active">
       
             <p>
                Báo cáo tổng hợp
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="pages/Báo cáo tổng hợp/theo_doi_nhap.html" class="nav-link active">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Phiếu theo dõi nhập</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="pages/Báo cáo tổng hợp/hai_quan_theo_thang.html" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Hải quan theo tháng</p>
                </a>
              </li>
            </ul>
          </li>
           <li class="nav-item has-treeview menu-close">
            <a href="#" class="nav-link active">
             <p>
                Quản trị
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="pages/Quản trị/thong_tin_xe.html" class="nav-link active">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Theo dõi thông tin xe</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="pages/Quản trị/them_loai_hang.html" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Thêm loại hàng</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="pages/Quản trị/cho_xe_ra.html" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Cho xe ra</p>
                </a>
              </li>
            </ul>
          </li>
           <li class="nav-item has-treeview menu-close">
            <a href="#" class="nav-link active">
       
             <p>
                Phòng loa
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="pages/Phòng loa/xe_trong_bai.html" class="nav-link active">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Xe trong bãi</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="pages/Phòng loa/xe_ra_vao.html" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
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

