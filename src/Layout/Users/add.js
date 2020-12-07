import React, { Component } from 'react';
import izivan from '../dist/img/izivan.png'
import { requestGetListCarInfo, requestLogin, requestRegisterUser } from '../../api'
import Cookie from 'js-cookie';
import { render } from '@testing-library/react';



class Content extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: '',
            Username: '',
            Fullname: '',
            Password: '',
            IsSuperAdmin: 'null',
            IsKeToan: "null",
            IsPhongLoa: "null",
            msg: "",
            data: ""
        }
    }
    async Register() {
        await this.setState({
            isLoading: true
        })
        try {
            const res = await requestRegisterUser({
                USERNAME: this.state.Username,
                FULLNAME: this.state.Fullname,
                PASSWORD: this.state.Password,
                ISSUPERADMIN: this.state.IsSuperAdmin,
                ISKETOAN: this.state.IsKeToan,
                ISPHONGLOA: this.state.IsPhongLoa,
            })
            await this.setState({ msg: res.msg, data1: res.data, isLoading: false });
            console.log(this.state.data1, "check data")
            if (this.state.data1 == "Tên đăng nhập đã tồn tại") {
                alert("Tên đăng nhập đã tồn tại")
            }
            else {
                alert("Thành công!")
            }
        }
        catch (err) {
            alert("Phân quyền cho tài khoản!")
        }
        window.location.reload(false);
    }

    handleTextChange(field, event) {
        this.setState({
            [field]: event.target.value
        })
    }

    handlePortChange(event) {
        if (event.target.value == 1) {
            this.setState({ IsKeToan: '1', IsPhongLoa: '0', IsSuperAdmin: '0' })
        }
        else if (event.target.value == 2) {
            this.setState({ IsKeToan: '0', IsPhongLoa: '1', IsSuperAdmin: '0' })
        }
        else if (event.target.value == 3) {
            this.setState({ IsKeToan: '1', IsPhongLoa: '1', IsSuperAdmin: '1' })
        }
        else if (event.target.value == 4) {
            this.setState({ IsKeToan: '0', IsPhongLoa: '0', IsSuperAdmin: '0' })
        }
    }

    render() {
        const { Username, Fullname, Password, IsSuperAdmin, IsKeToan, IsPhongLoa, isLoading } = this.state;
        if (isLoading) {
            return (
                <p>Loading...</p>
            )
        }
        return (
            <div class="content-wrapper">
                <div class="card card-warning">
                    <div class="card-header">
                        <h3 class="card-title"><i>Thêm tài khoản</i></h3>
                    </div>
                    <div class="card-body">
                        <div class="position-center">
                            <form>
                                <div class="form-group">
                                    <label>Tên tài khoản </label>
                                    <input type="text" class="form-control" placeholder="" value={Username} onChange={(e) => this.handleTextChange('Username', e)} />
                                </div>
                                <div class="form-group">
                                    <label>Mật khẩu</label>
                                    <input type="password" class="form-control" placeholder="" value={Password} onChange={(e) => this.handleTextChange('Password', e)} />
                                </div>
                                <div class="form-group">
                                    <label>Họ và tên </label>
                                    <input type="text" class="form-control" placeholder="" value={Fullname} onChange={(e) => this.handleTextChange('Fullname', e)} />
                                </div>
                                <div class="form-group">
                                    <label style={{ marginRight: '10px' }}>Quyền: </label>
                                    <select onChange={(e) => this.handlePortChange(e)}>
                                        <option hidden >Chọn</option>
                                        <option value='4'>Không quyền hành</option>
                                        <option value='1'>Kế toán</option>
                                        <option value='2'>Phòng loa</option>
                                        <option value='3'>SuperAdmin</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Hình ảnh (DEMO)</label>
                                    <input type="file" name="" class="form-control" id="exampleInputEmail1" />
                                </div>
                                <div class="form-group">
                                    <label>Mô tả (DEMO) </label>
                                    <textarea style={{ resize: 'none' }} rows="5" class="form-control" ></textarea>
                                </div>
                                <div class='form-group'>
                                    <span class="group-btn">
                                        <a><h4 class='text-white'><button onClick={() => this.Register()} class="btn btn-danger">Thêm</button></h4></a>
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