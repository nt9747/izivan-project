import React, { Component } from 'react';
import izivan from '../dist/img/izivan.png'
import { requestGetListCarInfo, requestLogin } from '../../api'
import Cookie from 'js-cookie';
import { render } from '@testing-library/react';


class Content extends React.Component {
    render(){
        return(
    <div class="content-wrapper">
      <div class="card card-warning">
          <div class="card-header">
              <h3 class="card-title">Thêm User</h3>
          </div>
      <div class="card-body">
          <div class="position-center">
              <form role="form" action="{{URL::to('/save-product')}}" method="post" enctype="multipart/form-data" >   
                <div class="form-group">
                      <label for="exampleInputEmail1">Tên tài khoản </label>
                      <input type="text" name="" class="form-control" id="exampleInputEmail1" placeholder="Tên tài khoản"/>
                </div>
                <div class="form-group">
                      <label for="exampleInputEmail1">Họ và tên </label>
                      <input type="text" name="" class="form-control" id="exampleInputEmail1" placeholder="Họ và tên"/>
                </div>
                <div class="form-group">
                      <label for="exampleInputEmail1">Mật khẩu</label>
                      <input type="password" name="" class="form-control" id="exampleInputEmail1" placeholder="Mật khẩu"/>
                </div>
                <div class="form-group">
                <b>Quyền</b><br />
                                        <select>
                                            <option>Tất cả</option>
                                            <option>SuperAdmin</option>
                                            <option>Kế toán</option>
                                            <option>Phòng loa</option>
                                        </select>
                </div>
                <div class="form-group">
                      <label for="exampleInputEmail1">Hình ảnh</label>
                      <input type="file" name="" class="form-control" id="exampleInputEmail1"/>
                </div>
                <div class="form-group">
                      <label for="exampleInputPassword1">Mô tả </label>
                      <textarea style={{resize: 'none'}} rows="5" class="form-control" name="" id="exampleInputPassword1" placeholder="Mô tả"></textarea>
                </div>
                <div class='form-group'>
                      <button type="submit" name="" class="btn btn-danger">Thêm </button>
                </div>
              </form>
          </div>
      </div>
      </div>
    </div>
        )
    }
}
export default Content