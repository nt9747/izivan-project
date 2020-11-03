import React, { Component } from 'react';
import izivan from '../dist/img/izivan.png'
import { requestGetListCarInfo, requestLogin } from '../../api'
import Cookie from 'js-cookie';
import { render } from '@testing-library/react';


class Content extends React.Component {
    render(){
        return(
            <div class="content-wrapper">
              <section class="content">
         <div class="container-fluid" style={{height:'250px'}}>
           <div class="card card-warning" >
             <div class="card-header" >
                 <h3 class="card-title"></h3>
             </div>
         
                 <div class="card-body">
                     <div class="row">
                       <div class="col-6">
                         <table>
                           <tr>
                             <td><b>Tài Khoản</b></td>
                             <td><input type="text" class="form-control" placeholder=""/></td>
                             <td><input type="checkbox" name=""/><b>Nhân viên</b></td>
                             <td><input type="checkbox" name=""/><b>Phòng loa</b></td>
                           </tr>
                           <tr>
                             <td><b>Mật khẩu</b></td>
                             <td><input type="password" class="form-control" placeholder=""/></td>
                             <td><input type="checkbox" name=""/><b>Kế toán</b></td>
                             <td><input type="checkbox" name=""/><b>Super Admin</b></td>
                           </tr>
                         </table>
                       </div>
                         <div class="col-2"><br/>
                           <button style={{height: '35px', width: '120px'}}><h4>Tạo mới</h4></button>
                         </div>
                         <div class="col-3"><br/>
                           <button style={{height: '35px', width: '180px'}}><h4>Danh sách</h4></button>
                         </div>
                     </div><br/>
                     <div class="row">
                         <div class="col-3">
                           <button style={{height: '35px', width: '120px', backgroundColor: 'black'}}><font color="#FFFFFF"><h4>Xóa</h4></font></button>
                         </div>
                         <div class="col-3">
                           <button style={{height: '35px', width: '220px'}}><h4>Thay Đổi Quyền</h4></button>
                         </div>
                     </div>
                   </div>
             </div>
         
           <div class="ui grid middle aligned"  style={{overflow:'auto', float:'left', width: '100%', height:'600px'}}>
                   <div class="card-header" >
                       <h3 class="card-title" ></h3>
                   </div> 
                   <table  id="example2" class="table table-bordered table-hover" >                     
                     <thead>
                         <tr>
                             <th></th>
                             <th>STT</th>
                             <th>Tài khoản</th>
                             <th>Nhân viên</th>
                             <th>Kế toán</th>
                             <th>Phòng loa</th>
                             <th>Admin</th>
                             <th>Đã bị xóa</th>
                         </tr>
                     </thead>
                     <tbody>   
                         <tr> 
                             <td>1</td>
                             <td>1ưqweqe</td>
                             <td>eqe21wq</td>
                             <td>eqeq311</td>
                             <td>213214</td>
                             <td>aaa</td>
                             <td>123</td>
                             <td>2312</td>
                         </tr>
         
                     </tbody>
         
                 </table>          
            </div>
         </div>
         </section>
         </div>
        )
    }
}
export default Content