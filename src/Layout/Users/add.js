import React, { Component } from 'react';
import izivan from '../dist/img/izivan.png'
import { requestGetListCarInfo, requestLogin, requestRegisterUser } from '../../api'
import Cookie from 'js-cookie';
import { render } from '@testing-library/react';


class Content extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Username: '',
            Fullname: '',
            Password: '',
            IsSuperAdmin : '0',
            IsKeToan: '0',
            IsPhongLoa: '0',
            msg: '',
            data: ''
        }
    }
    async Register(){
        try {
            const res = await requestRegisterUser({
                USERNAME: this.state.Username,
                FULLNAME: this.state.Fullname,
                PASSWORD: this.state.Password,
                ISSUPERADMIN: this.state.IsSuperAdmin,
                ISKETOAN: this.state.IsKeToan,
                ISPHONGLOA: this.state.IsPhongLoa,
        })
        await this.setState({ msg: res.msg, data: res.data});
        console.log(this.state.msg, "check msg!")
        console.log(this.state.data, "check data!")
        if (this.state.msg == "Thành công"){
            alert("Success!");
        } 
    }
    catch (err) {
        alert("Fail!");
    }
}

handleTextChange(field, event) {
    this.setState({
        [field]: event.target.value
    })
}
           
    render(){
        const { Username, Fullname, Password, IsSuperAdmin, IsKeToan, IsPhongLoa } = this.state;
        return(
    <div class="content-wrapper">
      <div class="card card-warning">
          <div class="card-header">
              <h3 class="card-title">Thêm User</h3>
          </div>
      <div class="card-body">
          <div class="position-center">
<<<<<<< HEAD
              <form role="form" method="post" enctype="multipart/form-data" >   
=======
              <form>   
>>>>>>> 7122b6faf3954162d5c5fdcb13bd6b08fe5ce562
                <div class="form-group">
                      <label for="exampleInputAccount">Tên tài khoản </label>
                      <input type="text" class="form-control"                                     
                      value={Username}  onChange={(e) => this.handleTextChange('username', e)}/>
                </div>
                <div class="form-group">
                      <label for="exampleInputFullName">Họ và tên </label>
                      <input type="text" class="form-control" id="exampleInputFullName" placeholder="Họ và tên"
                      value={Fullname}  onChange={(e) => this.handleTextChange('Fullname', e)}/>
                </div>
                <div class="form-group">
                      <label for="exampleInputPassWord">Mật khẩu</label>
                      <input type="password" class="form-control" id="exampleInputPassWord" placeholder="Mật khẩu"
                      value={Password}  onChange={(e) => this.handleTextChange('Password', e)} />
                </div>
                <div class="form-group">
                <b>Quyền Admin</b><br />
                                        <select value = {IsSuperAdmin} onChange={(e) => this.handleTextChange('IsSuperAdmin', e)}>
                                            <option>Không</option>
                                            <option value = '1'>Có</option>
                                        </select>
                </div>
                <div class="form-group">
                <b>Quyền Kế toán</b><br />
                                        <select value = {IsKeToan} onChange={(e) => this.handleTextChange('IsKeToan', e)}>
                                            <option>Không</option>
                                            <option value = '1'>Có</option>
                                        </select>
                </div>
                <div class="form-group">
                <b>Quyền Phòng loa</b><br />
                                        <select value = {IsPhongLoa} onChange={(e) => this.handleTextChange('IsPhongLoa', e)}>
                                            <option>Không</option>
                                            <option value = '1'>Có</option>
                                        </select>
                </div>
                
                <div class="form-group">
                      <label for="exampleInputImage">Hình ảnh</label>
                      <input type="file" name="" class="form-control" id="exampleInputImage"/>
                </div>
                <div class="form-group">
                      <label for="exampleInputMota">Mô tả </label>
                      <textarea style={{resize: 'none'}} rows="5" class="form-control" name="" id="exampleInputMoTa" placeholder="Mô tả"></textarea>
                </div>
                <div class='form-group'>
                <span class="group-btn">
                            <a  onClick={() => this.Register()}><h4 class='text-white'><button class="btn btn-danger">Thêm</button></h4></a>
                        </span>
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