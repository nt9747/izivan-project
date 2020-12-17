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
        try {
            const res = await requestRegisterUser({
                USERNAME: this.state.Username,
                FULLNAME: this.state.Fullname,
                PASSWORD: this.state.Password,
                ISSUPERADMIN: this.state.IsSuperAdmin,
                ISKETOAN: this.state.IsKeToan,
                ISPHONGLOA: this.state.IsPhongLoa,
            })
            await this.setState({ msg: res.msg, data1: res.data});
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
                <div style={{textAlign: 'center', marginTop: '100px'}}>
                <div style={{width: '50px', height: '50px'}} className="spinner-border text-primary" role="status">
                    <span className="sr-only">a</span>
                </div>
                <div>
                    <p style={{fontSize: '20px'}}>Loading...</p>
                </div>
            </div>
            )
        }
        return (
            <div className="content-wrapper">
                <div className="card card-warning">
                    <div className="card-header">
                        <h3 className="card-title"><i>Thêm tài khoản</i></h3>
                    </div>
                    <div className="card-body">
                        <div className="position-center">
                            <form>
                                <div className="form-group">
                                    <label>Tên tài khoản </label>
                                    <input type="text" className="form-control" placeholder="" value={Username} onChange={(e) => this.handleTextChange('Username', e)} />
                                </div>
                                <div className="form-group">
                                    <label>Mật khẩu</label>
                                    <input type="password" className="form-control" placeholder="" value={Password} onChange={(e) => this.handleTextChange('Password', e)} />
                                </div>
                                <div className="form-group">
                                    <label>Họ và tên </label>
                                    <input type="text" className="form-control" placeholder="" value={Fullname} onChange={(e) => this.handleTextChange('Fullname', e)} />
                                </div>
                                <div className="form-group">
                                    <label style={{ marginRight: '10px' }}>Quyền: </label>
                                    <select onChange={(e) => this.handlePortChange(e)}>
                                        <option hidden >Chọn</option>
                                        <option value='4'>Không quyền hành</option>
                                        <option value='1'>Kế toán</option>
                                        <option value='2'>Phòng loa</option>
                                        <option value='3'>SuperAdmin</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputEmail1">Hình ảnh (DEMO)</label>
                                    <input type="file" name="" className="form-control" id="exampleInputEmail1" />
                                </div>
                                <div className="form-group">
                                    <label>Mô tả (DEMO) </label>
                                    <textarea style={{ resize: 'none' }} rows="5" className="form-control" ></textarea>
                                </div>
                                <div className='form-group'>
                                    <span className="group-btn">
                                        <a><h4 className='text-white'><button onClick={() => this.Register()} className="btn btn-danger">Thêm</button></h4></a>
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