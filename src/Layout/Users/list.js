import React, { Component } from 'react';
import izivan from '../dist/img/izivan.png'
import { requestGetListCarInfo, requestLogin, requestGetAllUser, requestRegisterUser, requestDeleteUser } from '../../api'
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
componentDidMount() {
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
                 <h3 class="card-title"></h3>
             </div>
         
                 <div class="card-body">
                     <div class="row">
                       <div class="col-6">
                         <table>
                           <tr>
                             <td><b>Tài Khoản</b></td>
                             <td><input type="text" class="form-control" placeholder="" value={Username}  onChange={(e) => this.handleTextChange('Username', e)}/></td>
                             <td><input type="checkbox" name=""/><b>Nhân viên</b></td>
                             <td><input type="checkbox" name="" value = {IsPhongLoa + 1} onChange={(e) => this.handleTextChange('IsPhongLoa', e)}/><b>Phòng loa</b></td>
                           </tr>
                           <tr>
                             <td><b>Mật khẩu</b></td>
                             <td><input type="password" class="form-control" placeholder="" value={Password}  onChange={(e) => this.handleTextChange('Password', e)}/></td>
                             <td><input type="checkbox" name="" value = {IsKeToan + 1} onChange={(e) => this.handleTextChange('IsKeToan', e)}/><b>Kế toán</b></td>
                             <td><input type="checkbox" name="" value = {IsSuperAdmin + 1} onChange={(e) => this.handleTextChange('IsSuperAdmin', e)}/><b>Super Admin</b></td>
                           </tr>
                         </table>
                       </div>
                         <div class="col-2"><br/>
                           <a onClick={() => this.Register()}><button style={{height: '35px', width: '120px'}}><h4>Tạo mới</h4></button></a>
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
                             <th></th>
                             <th>STT</th>
                             <th>Tài khoản</th>
                             <th>Kế toán</th>
                             <th>Phòng loa</th>
                             <th>Admin</th>
                             <th>Sửa</th>
                             <th>Xóa</th>
                         </tr>
                     </thead>
                     <tbody>   
                     {data && data.map((item, i) => (
                                            <tr key = {item.UserID}>
                                                <td></td>
                                                <td> {item.UserID}</td>
                                                <td> {item.UserName}</td>
                                                <td> {item.IsKeToan.toString()}</td>
                                                <td> {item.IsPhongLoa.toString()}</td>
                                                <td> {item.IsSuperAdmin.toString()}</td>
                                                <td><button>Edit</button></td>
                                                <td><button onClick={() => this.Delete(item.UserID)} >Delete</button></td>
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