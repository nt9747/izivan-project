import React, { Component } from 'react';
import izivan from '../dist/img/izivan.png'
import { requestGetListCarInfo, requestLogin } from '../../api'
import Cookie from 'js-cookie';
import { render } from '@testing-library/react';
import TableScrollbar from 'react-table-scrollbar';


class Content extends React.Component {
    render(){
        return(
            <div class="content-wrapper">
      <div class="card card-warning" >
    <div class="card-header" >
        <h3 class="card-title">Thêm loại hàng</h3>
    </div>

        <div class="card-body">
            <div class="row">
                <input type="text" name=""/> <button>Thêm mới</button>
            </div>
          </div>
    </div>
      <div class="card card-warning">
          <div class="card-header">
              <h3 class="card-title">Danh sách thực tế</h3>
          </div>
      <div class="card-body">
      <TableScrollbar rows={15} >
         <table  id="example2" style={{border: '1px solid black'}} >                     
            <thead>
                <tr>
                    <th style={{width: '30px'}}></th>
                    <th style={{width: '100px'}}>Code</th>
                    <th style={{width: '100px'}}>Name</th>
                </tr>
            </thead>
            <tbody>   
                <tr> 
                    <td></td>
                    <td>1</td>
                    <td>Bưởi</td>
                </tr>
            </tbody>
        </table>
        </TableScrollbar>
      </div>
      </div>
</div>
        )
    }
}
export default Content