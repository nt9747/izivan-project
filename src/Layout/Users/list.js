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
  if (event.target.value==1){
      this.setState({IsKeToan: '1', IsPhongLoa: '0', IsSuperAdmin: '0'})
  }
  else if (event.target.value==2){
      this.setState({IsKeToan: '0', IsPhongLoa: '1', IsSuperAdmin: '0'})
  }
  else if (event.target.value==3){
      this.setState({IsKeToan: '1', IsPhongLoa: '1', IsSuperAdmin: '1'})
  }
  else if (event.target.value==4){
    this.setState({IsKeToan: '0', IsPhongLoa: '0', IsSuperAdmin: '0'})
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

async Save(userid){
  await this.setState({
    isLoading: true
})
  try {
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
  window.location.reload(false);
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
                       <div class="col-7">
                         <table style={{width: '700px'}}>
                           <tr>
                             <td><b>Tài Khoản</b></td>
                             <td><input style= {{width: '250px'}}type="text" class="form-control" placeholder="" required value={Username}  onChange={(e) => this.handleTextChange('Username', e)}/></td>
                             <td><b>Tên đầy đủ</b></td>
                             <td><input type="text" class="form-control" placeholder="" required value={Fullname}  onChange={(e) => this.handleTextChange('Fullname', e)}/></td>
                           </tr>
                           <tr>
                             <td><b>Mật khẩu</b></td>
                             <td><input style= {{width: '250px'}} type="password" class="form-control" placeholder="" required value={Password}  onChange={(e) => this.handleTextChange('Password', e)}/></td>
                             <td><b>Quyền</b></td>
                             <td><select onChange={(e) => this.handlePortChange(e)}>
                                        <option value = '' hidden>Chọn</option>
                                          <option value = '4'>Không quyền hành</option>
                                            <option value = '1'>Kế toán</option>
                                            <option value = '2'>Phòng loa</option>
                                            <option value = '3'>SuperAdmin</option>
                                            
                                        </select> </td>
                           </tr>
                    </table>
                       </div>
                         <div class="col-2"><br/>
                           <a onClick={() => this.Register()}><button style={{height: '35px', width: '200px'}}><h4>Đăng ký nhanh</h4></button></a>
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
                   <table  id="example2" class="table table-bordered table-hover" style={{textAlign: 'center'}}>                     
                     <thead>
                         <tr>
                             <th>STT</th>
                             <th>Tài khoản</th>
                             <th>Kế toán</th>
                             <th>Phòng loa</th>
                             <th>Admin</th>
                             <th style= {{width: '250px',}}>Quyền</th>
                             <th>Xóa</th>
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
                                                <td> <select onChange={(e) => this.handlePortChange(e)}>
                                        <option value='' hidden>Chọn</option>
                                        <option value = '4'>Không quyền hành</option>
                                            <option value = '1'>Kế toán</option>
                                            <option value = '2'>Phòng loa</option>
                                            <option value = '3'>SuperAdmin</option>
                                            
                                        </select>
                                                <button onClick={() => this.Save(item.UserID)}>Save</button></td>
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