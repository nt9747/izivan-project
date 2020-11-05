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
        IsSuperAdmin : '0',
        IsKeToan: "0",
        IsPhongLoa: "0",
        msg: "",
        data: "",
        data1: "",
        data2: "",
        data3: "",
        userID: "",
    }
}



// async Delete(userid){
//   this.setState.UserID = userid
//   try {
//       const res = await requestDeleteUser({
//         USERID = this.state.userID,
//   })
//   await this.setState({ data2: res.data});
//   console.log(this.state.data2, "check msg!")
//   if (this.state.data2 == "Xóa Thành công"){
//       alert("Success!") 
//   } 
// }
// catch (err) {
//   alert("Fail!");
// }
// }

async Delete(userid){
  let result = window.confirm("Có chắc xóa không?");
  if (result == true){
    try {
      const res = await requestDeleteUser({
          USERID: userid,
  })
  await this.setState({data2: res.data});
  console.log(this.state.data2, "check msg!")
  if (this.state.data2 == "Xóa thành công"){
      alert("Success!") 
  } 
}
catch (err) {
  alert("Fail!")
}
window.location.href = '/ListUser';
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
    await this.setState({ msg: res.msg, data1: res.data});
    console.log(this.state.data1, "check data")
    if (this.state.data1 == "Tên đăng nhập đã tồn tại"){
        alert("Tên đăng nhập đã tồn tại") 
    }
    else {
      alert ("Success!")
    }
}
catch (err) {
    alert("Fail")
}
window.location.href = '/ListUser';
}

handleTextChange(field, event) {
this.setState({
    [field]: event.target.value
})
}
componentDidMount() {
  this.list();
} 

async Edit(userid){
  await this.setState({
    isLoading: true
})
  try {
    let a = window.confirm("set quyen Ke Toan cho tai khoan: " + userid + " ? ");
    let b = window.confirm("set quyen Phong Loa cho tai khoan: " + userid + " ? ");
    let c = window.confirm("set quyen SuperAdmin cho tai khoan: " + userid + " ? ")
    if (a == true){
      this.setState({ IsKeToan: '1'});
    }
    // else this.setState({ IsKeToan: '0'});
    if (b == true){
      this.setState({ IsPhongLoa: '1'});
    }
    // else this.setState({ IsPhongLoa: '0'});
    if (c == true){
      this.setState({ IsSuperAdmin: '1'});
    }
    // else this.setState({ IsSuperAdmin: '0'});
    const res = await resquestEditUser({
      USERID: userid,
      ISSUPERADMIN: this.state.IsSuperAdmin,
      ISPHONGLOA: this.state.IsPhongLoa,
      ISKETOAN: this.state.IsKeToan,
    })
    await this.setState({data3: res.data, isLoading: false})
    alert ("Sửa thành công!")
  }
  catch(err){
    await this.setState({
      isLoading: false
  }, () => console.log(err))
    alert ("Sửa thẩt bại!")
  }
  window.location.href = '/ListUser';
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
      await this.setState({ data: res.data, isLoading: false});
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

    render(){
      const { data, isLoading, Username, Fullname, Password, IsSuperAdmin, IsKeToan, IsPhongLoa } = this.state;
      const token = Cookie.get("SESSION_ID");
      if (isLoading) {
          return (
              <p>Loading...</p>
          )
      }
        return(
            <div class="content-wrapper">
              <section class="content">
         <div class="container-fluid" style={{height:'250px'}}>
           <div class="card card-warning" >
             <div class="card-header" >
                 <h3 class="card-title"><i>Quản trị hoạt động</i></h3>
             </div>
         
                 <div class="card-body">
                     <div class="row">
                       <div class="col-6">
                         <table>
                           <tr>
                             <td><b>Tài Khoản</b></td>
                             <td><input type="text" class="form-control" placeholder="" required value={Username}  onChange={(e) => this.handleTextChange('Username', e)}/></td>
                             <td><input type="checkbox" name=""/><b>Nhân viên</b></td>
                             <td><input type="checkbox" name="" value = {IsPhongLoa + 1} onChange={(e) => this.handleTextChange('IsPhongLoa', e)}/><b>Phòng loa</b></td>
                           </tr>
                           <tr>
                             <td><b>Mật khẩu</b></td>
                             <td><input type="password" class="form-control" placeholder="" required value={Password}  onChange={(e) => this.handleTextChange('Password', e)}/></td>
                             <td><input type="checkbox" name="" value = {IsKeToan + 1} onChange={(e) => this.handleTextChange('IsKeToan', e)}/><b>Kế toán</b></td>
                             <td><input type="checkbox" name="" value = {IsSuperAdmin + 1} onChange={(e) => this.handleTextChange('IsSuperAdmin', e)}/><b>Super Admin</b></td>
                           </tr>
                         </table>
                       </div>
                         <div class="col-2"><br/>
                           <a onClick={() => this.Register()}><button style={{height: '35px', width: '120px'}}><h4>Đăng ký nhanh</h4></button></a>
                         </div>
                         <div class="col-3"><br/>
                           <button onClick={() => this.list()} style={{height: '35px', width: '180px'}}><h4>Làm mới</h4></button>
                         </div>
                     </div><br/>

                   </div>
             </div>
         
           <div class="ui grid middle aligned"  style={{ float:'left', width: '100%', height:'600px'}}>
                   <div class="card-header" >
                       <h3 class="card-title" ></h3>
                   </div> 
                   <TableScrollbar rows={15} >
                   <table  id="example2" class="table table-bordered table-hover" >                     
                     <thead>
                         <tr>
                             <th>STT</th>
                             <th>Tài khoản</th>
                             <th>Kế toán</th>
                             <th>Phòng loa</th>
                             <th>Admin</th>
                             <th1></th1>
                             <th1></th1>
                         </tr>
                     </thead>
                     <tbody>   
                     {data && data.map((item, i) => (
                                            <tr key = {item.UserID}>
                                                <td> {item.UserID}</td>
                                                <td> {item.UserName} </td>
                                                <td> {item.IsKeToan.toString()}</td>
                                                <td> {item.IsPhongLoa.toString()}</td>
                                                <td> {item.IsSuperAdmin.toString()}</td>
                                                <td><button onClick={() => this.Edit(item.UserID)}>Edit</button></td>
                                                <td><button onClick={() => this.Delete(item.UserID)}>Delete</button></td>
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