import React, { Component } from 'react';
import izivan from '../dist/img/izivan.png'
import { requestGetListCarInfo, requestLogin, requestGetAllUser, requestRegisterUser, requestDeleteUser, resquestEditUser } from '../../api'
import Cookie from 'js-cookie';
import { render } from '@testing-library/react';
import TableScrollbar from 'react-table-scrollbar';




class Content extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      Username: '',
      Fullname: '',
      Password: '',
      IsSuperAdmin: 'null',
      IsKeToan: "null",
      IsPhongLoa: "null",
      msg: "",
      data: "",
      data1: "",
      data2: "",
      data3: "",
      userID: "",
    }

  }





  async Delete(userid) {
    let result = window.confirm("Có chắc xóa không?");
    if (result == true) {
      try {
        const res = await requestDeleteUser({
          USERID: userid,
        })
        await this.setState({ data2: res.data });
        console.log(this.state.data2, "check msg!")
        if (this.state.data2 == "Xóa thành công") {
          alert("Đã xóa User có ID: " + userid)
        }
      }
      catch (err) {
        alert("Không thành công!")
      }
      window.location.reload(false);
    }
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
      await this.setState({ msg: res.msg, data1: res.data });
      console.log(this.state.data1, "check data")
      if (this.state.data1 == "Tên đăng nhập đã tồn tại") {
        alert("Tên đăng nhập đã tồn tại")
      }
      else {
        alert("Thành công!")
      }
    }
    catch (err) {
      alert("Chọn quyền!")
    }
    window.location.reload(false);
  }

  handleTextChange(field, event) {
    this.setState({
      [field]: event.target.value
    })
  }
  componentDidMount() {
    this.list();
  }

  async Save(userid) {
    try {
      const res = await resquestEditUser({
        USERID: userid,
        ISSUPERADMIN: this.state.IsSuperAdmin,
        ISPHONGLOA: this.state.IsPhongLoa,
        ISKETOAN: this.state.IsKeToan,
      })
      await this.setState({ data3: res.data})
      alert("Sửa thành công!")
    }
    catch (err) {
      await this.setState({
        isLoading: false
      }, () => console.log(err))
      alert("Sửa thẩt bại!")
    }
    this.list();
  }


  async list() {
    await this.setState({
      isLoading: true
    })
    try {
      const res = await requestGetAllUser({
        USERNAME: this.state.username,
        password: this.state.password
      })
      await this.setState({ data: res.data, isLoading: false });
      console.log(this.state.data, "check");
    } catch (err) {
      await this.setState({
        isLoading: false
      }, () => console.log(err))
    }
    // if (typeof(this.state.data) == "undefined"){
    //     alert("Sai cấu trúc, điền lại");
    //     window.location.href = '/home'
    // }
    // console.log(typeof(this.state.data), "check")
  }

  render() {
    const { data, isLoading, Username, Fullname, Password, IsSuperAdmin, IsKeToan, IsPhongLoa } = this.state;
    const token = Cookie.get("SESSION_ID");
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
        <section className="content">
          <div className="container-fluid" style={{ height: '250px' }}>
            <div className="card card-warning" >
              <div className="card-header" >
                <h3 className="card-title"><i>Quản trị hoạt động</i></h3>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-6">
                    <table style={{ width: '700px' }}>
                      <tr>
                        <td><b>Tài Khoản</b></td>
                        <td><input style={{ width: '250px' }} type="text" className="form-control" placeholder="" required value={Username} onChange={(e) => this.handleTextChange('Username', e)} /></td>
                        <td><b>Tên đầy đủ</b></td>
                        <td><input type="text" className="form-control" placeholder="" required value={Fullname} onChange={(e) => this.handleTextChange('Fullname', e)} /></td>
                      </tr>
                      <tr>
                        <td><b>Mật khẩu</b></td>
                        <td><input style={{ width: '250px' }} type="password" className="form-control" placeholder="" required value={Password} onChange={(e) => this.handleTextChange('Password', e)} /></td>
                        <td><b>Quyền</b></td>
                        <td><select onChange={(e) => this.handlePortChange(e)}>
                          <option hidden>Chọn</option>
                          <option value='4'>Không quyền hành</option>
                          <option value='1'>Kế toán</option>
                          <option value='2'>Phòng loa</option>
                          <option value='3'>SuperAdmin</option>

                        </select> </td>
                      </tr>
                    </table>
                  </div>
                  <div className="col-4">
                    <button onClick={() => this.Register()} type="button" className="btn btn-outline-primary">
                      <h5>Đăng ký nhanh</h5>
                      <svg  width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-person-plus-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7.5-3a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"></path>
                      </svg>
                    </button>
                  </div>
                  <div className="">
                    <button type="button" className="btn btn-outline-primary">
                      <svg onClick={() => this.list()} width="4em" height="4em" viewBox="0 0 16 16" className="bi bi-arrow-clockwise" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                      </svg>
                    </button>
                  </div>
                </div><br />

              </div>
            </div>

            <div className="ui grid middle aligned" style={{ float: 'left', width: '100%', height: '600px' }}>
              <div className="card-header" >
                <h3 className="card-title" ></h3>
              </div>
              <TableScrollbar rows={15} >
                <table id="example2" className="table table-bordered table-hover" style={{ textAlign: 'center' }}>
                  <thead>
                    <tr >
                      <th>STT</th>
                      <th>Tài khoản</th>
                      <th>Kế toán</th>
                      <th>Phòng loa</th>
                      <th>Admin</th>
                      <th style={{ width: '270px', }}>Quyền</th>
                      <th>Xóa</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data && data.map((item, i) => (
                      <tr key={item.UserID }>
                        <td> {item.UserID}</td>
                        <td> {item.UserName} </td>
                        <td> {item.IsKeToan.toString()}</td>
                        <td> {item.IsPhongLoa.toString()}</td>
                        <td> {item.IsSuperAdmin.toString()}</td>
                        <td> <select onChange={(e) => this.handlePortChange(e)}>
                                  <option value='' hidden>Chọn</option>
                                  <option value='4'>Không quyền hành</option>
                                  <option value='1'>Kế toán</option>
                                  <option value='2'>Phòng loa</option>
                                  <option value='3'>SuperAdmin</option>
                              </select>
                            <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg" onClick={() => this.Save(item.UserID)}>
                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                              <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                            </svg>
                        </td>
                          <td>
                            <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-x-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg" onClick={() => this.Delete(item.UserID)}>
                              <path fillRule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                              <path fillRule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </td>
                      </tr>
                    ))}

                  </tbody>

                </table>
              </TableScrollbar>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
export default Content