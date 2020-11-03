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
            IsKeToan: "0",
            IsPhongLoa: "0",
            msg: "",
            data: ""
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
        if (this.state.msg == "Thành công"){
            alert("Success!") 
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
              <form>   
                <div class="form-group">
                      <label for="exampleInputEmail1">Tên tài khoản </label>
                      <input type="text" name="" class="form-control" id="exampleInputAccount" placeholder="Tên tài khoản"                                     
                      value={Username}  onChange={(e) => this.handleTextChange('Username', e)}/>
                </div>
                <div class="form-group">
                      <label for="exampleInputEmail1">Họ và tên </label>
                      <input type="text" name="" class="form-control" id="exampleInputEmail1" placeholder="Họ và tên"
                      value={Fullname}  onChange={(e) => this.handleTextChange('Fullname', e)}/>
                </div>
                <div class="form-group">
                      <label for="exampleInputEmail1">Mật khẩu</label>
                      <input type="password" name="" class="form-control" id="exampleInputEmail1" placeholder="Mật khẩu"
                      value={Password}  onChange={(e) => this.handleTextChange('Password', e)} />
                </div>
                <div class="row">
                <div class="col-3">
                <b>Quyền Admin</b><br />
                                        <select value = {IsSuperAdmin} onChange={(e) => this.handleTextChange('IsSuperAdmin', e)}>
                                            <option>Không</option>
                                            <option value = '1'>Có</option>
                                        </select>
                </div>
                <div class="col-3">
                <b>Quyền Kế toán</b><br />
                                        <select value = {IsKeToan} onChange={(e) => this.handleTextChange('IsKeToan', e)}>
                                            <option>Không</option>
                                            <option value = '1'>Có</option>
                                        </select>
                </div>
                <div class="col-3">
                <b>Quyền Phòng loa</b><br />
                                        <select value = {IsPhongLoa} onChange={(e) => this.handleTextChange('IsPhongLoa', e)}>
                                            <option>Không</option>
                                            <option value = '1'>Có</option>
                                        </select>
                </div>
                </div>
                <br/>
                <div class="form-group">
                      <label for="exampleInputEmail1">Hình ảnh</label>
                      <input type="file" name="" class="form-control" id="exampleInputEmail1"/>
                </div>
                <div class="form-group">
                      <label for="exampleInputPassword1">Mô tả </label>
                      <textarea style={{resize: 'none'}} rows="5" class="form-control" name="" id="exampleInputPassword1" placeholder="Mô tả"></textarea>
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