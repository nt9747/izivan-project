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
<div class="container-fluid">
  <div class="card card-warning">
    <div class="card-header">
        <h3 class="card-title"></h3>
    </div>

        <div class="card-body">
            <div class="row">
                <div class="col-2">
                    <b>Từ</b><input type="datetime-local" class="form-control" placeholder=".col-3"/>
                </div>
                <div class="col-2">
                    <b>Đến</b><input type="datetime-local" class="form-control" placeholder=".col-4"/>
                </div>
                <div class="col-4">
                    <b>Loại Hàng</b><br/>
                          <select>
                              <option>123</option>
                              <option>456</option>
                          </select>
                </div>
                <div>
                    <table>
                      <tr>
                        <td style={{textAlign: 'center'}}><b>Vào</b></td>
                        <td style={{textAlign: 'center'}}><b>Ra</b></td>
                        <td style={{textAlign: 'center'}}><b>Tồn</b></td>
                        <td style={{textAlign: 'center'}}></td>
                      </tr>
                      <tr>
                        <td><b style={{textAlign: 'center', backgroundColor: '#E79FEB', width: '50px', height: '50px', display: 'inline-block'}}>a</b></td>
                        <td><b style={{textAlign: 'center', backgroundColor: '#8CE135', width: '50px', height: '50px', display: 'inline-block'}}>b</b></td>
                        <td><b style={{textAlign: 'center', backgroundColor: '#35DFE1', width: '50px', height: '50px', display: 'inline-block'}}>c</b></td>
                        <td><b style={{textAlign: 'center', backgroundColor: '#35E17E', width: '200px', height: '50px', display: 'inline-block'}}>d</b></td>
                      </tr>
                    </table>
              </div>
              </div>
            <div class="row">
                <div class="col-2">
                    <b>Loại xe</b><br/>
                          <select>
                              <option>aaaab</option>
                              <option>bbbbb</option>
                          </select>
                </div>
                <div class="col-2">
                    <b>Mã Thẻ</b><input type="text" class="form-control" placeholder="Nhập mã thẻ"/>
                </div>
                <div class="col-2">
                    <b>Biển số xe</b><input type="text" class="form-control" placeholder="Nhập Biển Số"/>
                </div>
                <div class="col-2">
                    <b>Số thứ tự</b><input type="text" class="form-control" placeholder="Nhập số thứ tự"/>
                </div>

            </div>
            <div class="row">
                <div class="col-4">
                      <b>Cổng</b><br/>
                        <select>
                            <option>Tất cả</option>
                            <option>bbbbbb</option>
                        </select>
                        <select>
                            <option>Giao dịch vào ra</option>
                        </select>
                </div>
                <div class="col-2"><br/>
                      <button><b>Tìm Kiếm</b></button>
                </div>
                    <div class="col-2 "><br/>
                      <button><b>Xuất Excel</b></button>
                    </div>    
          </div>
          </div>
      </div>

  <div class="ui grid middle aligned"  style={{overflow: 'auto', width: '70%', height:'600px',  float:'left'}}>
          <div class="card-header" >
              <h3 class="card-title" ></h3>
          </div> 
          <table  id="example2" class="table table-bordered table-hover" >                     
            <thead>
                <tr>
                    <th>STT vào bãi</th>
                    <th>Biển sô xe vào/ Biển số xe ra</th>
                    <th>Biển Cont</th>
                    <th>Biển Mooc</th>
                    <th>Loại xe</th>
                    <th>Mã số thẻ</th>
                    <th>Thời gian vào bãi</th>
                    <th>Thời gia ra bãi</th>
                    <th>Thời gian lưu bãi</th>
                    <th>Số tiền</th>
                    <th>Nhân viên vào/ Nhân viên ra</th>
                    <th>Loại hàng</th>
                    <th>Cổng vào</th>
                    <th>Cổng ra</th>
                    <th>Phiếu hải quan</th>
                </tr>
            </thead>
            <tbody>   
                <tr> 
                    <td>1</td>
                    <td>eqe21wq</td>
                    <td>eqeq311</td>
                    <td>213214</td>
                    <td>aaa</td>
                    <td>123</td>
                    <td>2312</td>
                    <td>132</td>
                    <td>3231</td>
                    <td>dfs</td>
                    <td>23wd</td>
                    <td>4dr</td>
                    <td>res4</td>
                    <td>er4</td>
                    <td>ssss</td>
                </tr>

            </tbody>

        </table>          
   </div>
</div>
<div style={{width: '30%', height: '40%', float: 'right'}}>
      <div class="card card-order">
          <div class="card-header">
              <h3 class="card-title">
                  <table>
                    <tr>
                      <td><b>Phiếu hải quan</b></td>
                      <td><input type="text" style={{width: '200px'}}/></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td><button style={{width: '200px'}}>Thêm phiếu hải quan</button></td>
                    </tr>
                  </table>
              </h3>
          </div>
      </div>
 
      <div class="card-body">
      <div class="card-header">
              <h3 class="card-title">Ảnh vào</h3>
          </div>
          <div class="row">
              <div class="">
                  <img src={izivan} id="imglayout"/>
              </div>
          </div>
      </div>

      <div class="card-body">
          <div class="card-header">
              <h3 class="card-title">Ảnh ra</h3>
          </div>
          <div class="row">
              <div class="">
                  <img src={izivan} id="imglayout"/>
              </div>
          </div>
      </div>

</div>
</section>
</div>
        )
    }
}
export default Content