import React, { Component } from 'react';
import izivan from '../img/1.png'
import { requestGetListCarIn, requestLogin } from '../../api'
import Cookie from 'js-cookie';
import empty from '../img/empty.png'

function GetFormatDate(a){
    const b = new Date(a);
    var hours = b.getUTCHours();
    var minutes = b.getUTCMinutes();
    var seconds = b.getUTCSeconds();
    var month = b.getUTCMonth() + 1;
    var day = b.getUTCDate();
    var year = b.getUTCFullYear();

    
   if(month.toString().length == 1) {
        month = '0'+month;
   }
   if(day.toString().length == 1) {
        day = '0'+day;
   }   
   if(hours.toString().length == 1) {
        hours = '0'+hours;
   }
   if(minutes.toString().length == 1) {
        minutes = '0'+minutes;
   }
   if(seconds.toString().length == 1) {
        seconds = '0'+seconds;
   }  
   if (year == 1970){
       return ""
   }
   else return hours + ":" + minutes + ":" + seconds + "  "  + day + "/" + month + "/" + year
}

class Content extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fromDate: '2020/07/03',
            toDate: '2020/10/15',
            plateNumber: '',
            portIn: "",
            PortOut: "",
            numberCar: "",
            loaiHang: "",
            data: "",
            isLoading: true,
            page: 1,
            nextPage: "",
            SelectCong: "/listCar/listCarParking?",
            loaiXe: "",
            data2: "",
        }
    }        
    componentDidMount() {
        this.list();
    }
    async listInNext() {
        await this.setState({
            isLoading: true
        })
        try {
            const res = await requestGetListCarIn({
                FROMDATE: this.state.fromDate,
                TODATE: this.state.toDate,
                PLATENUMBER: this.state.plateNumber,
                PORTIN: this.state.portIn,
                PORTOUT: this.state.PortOut,
                NUMBERCAR: this.state.numberCar,
                LOAIHANG: this.state.loaiHang,
                PAGE: ++this.state.page,
                CONG: this.state.SelectCong,
                LOAIXE: this.state.loaiXe
            })
            await this.setState({ data: res.data, isLoading: false, nextPage: res.data.nextPage });
            console.log(this.state.nextPage, "Check next page")
            // if (!res.data.data){
            //     return (this.state.page)
            // }
            if(!(this.state.nextPage)){
                return(--this.state.page);
            }
        } catch (err) {
            await this.setState({
                isLoading: false
            }, () => console.log(err))
        }
    }

    async listInPrevious() {
        await this.setState({
            isLoading: true
        })
        try {
            const res = await requestGetListCarIn({
                FROMDATE: this.state.fromDate,
                TODATE: this.state.toDate,
                PLATENUMBER: this.state.plateNumber,
                PORTIN: this.state.portIn,
                PORTOUT: this.state.PortOut,
                NUMBERCAR: this.state.numberCar,
                LOAIHANG: this.state.loaiHang,
                PAGE: --this.state.page,
                CONG: this.state.SelectCong,
                LOAIXE: this.state.loaiXe,
            })
            if (this.state.page < 1){
                ++this.state.page
            }
            await this.setState({ data: res.data, isLoading: false, previousPage: res.data.previousPage});
            console.log(this.state.data, "check data")
        } catch (err) {
            await this.setState({
                isLoading: false
            }, () => console.log(err))
        }
    }

    async list() {
        await this.setState({
            isLoading: true
        })
        try {
            const res = await requestGetListCarIn({
                FROMDATE: this.state.fromDate,
                TODATE: this.state.toDate,
                PLATENUMBER: this.state.plateNumber,
                PORTIN: this.state.portIn,
                PORTOUT: this.state.PortOut,
                NUMBERCAR: this.state.numberCar,
                LOAIHANG: this.state.loaiHang,
                PAGE: this.state.page,
                CONG: this.state.SelectCong,
                LOAIXE: this.state.loaiXe,
            })
            await this.setState({ data: res.data, isLoading: false, page: 1});
            console.log(this.state.portIn, "check PortIn")
            console.log(this.state.PortOut, "check PortOut")
            console.log(this.state.data, "check dataXe")
        } catch (err) {
            await this.setState({
                isLoading: false
            }, () => console.log(err))
        }
        console.log(this.state.data, "Check data!");
        // if (typeof(this.state.data) == "undefined"){
        //     return(
        //         <img src="../img/empty.png" />
        //     )
        //     // window.location.href = '/Empty'
        // }
    }

    handleTextChange(field, event) {
        this.setState({
            [field]: event.target.value
        })
    }

    handlePortChange(event) {
        if (event.target.value==5){
            this.setState({portIn: '1', PortOut: '3'})
        }
        else if (event.target.value==1){
            this.setState({portIn: '', PortOut: ''})
        }
        else if (event.target.value==2){
            this.setState({portIn: '0', PortOut: null})
        }
        else if (event.target.value==3){
            this.setState({portIn: null, PortOut: '2'})
        }
        else if (event.target.value==4){
            this.setState({portIn: null, PortOut: '4'})
        }
    }

    render() {
        
        const { data, isLoading } = this.state;
        const token = Cookie.get("SESSION_ID");
        // if (isLoading) {
        //     return (
        //         <p>Loading...</p>
        //     )
        // }   
        return (
            <div class="content-wrapper">
     <section class="content"  >
<div class="container-fluid">
  <div class="card card-warning">
    <div class="card-header">
        <h3 class="card-title"><i>Danh sách xe trong bãi</i></h3>
    </div>

        <div class="card-body">
            <div class="row">
                <div class="" style={{float: 'left', width: '60%'}}>
                    <table style={{width: '100%'}}>
                        <tr>
                            <td><b>Loại hàng</b><input type="text" class="form-control" placeholder="Nhập loại hàng"/></td>
                            <td><b>Biển số xe</b><input type="text" class="form-control" placeholder="Nhập biển số xe"/></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><b>Cổng</b>
                                    <select onChange={(e) => this.handlePortChange(e)}>
                                        <option value = ''>Chọn</option>
                                        <option value = '1'>Tất cả</option>
                                        <option value = '2'>Cổng vào VN</option>
                                        <option value = '5'>Cổng vao ra CN</option>
                                     </select></td>
                            <td><b>Mã Thẻ</b><input type="text" class="form-control" placeholder="Nhập mã thẻ"/></td>
                            <td><button class="btn btn-danger" onClick={() => this.list()} style={{height: '40px', width: '300px'}}><h6><b>Tìm</b></h6></button></td>
                        </tr>
                    </table>
                    <table style={{textAlign: 'center', width: '800px', height: '50px', borderStyle: 'outset'}}>
                        <tr>
                        <td>Tổng số xe trong bãi</td>
                        <td style={{backgroundColor: 'yellow', width: '150px'}}>230</td>
                        <td>Tổng số xe cổng VN</td>
                        <td style={{backgroundColor: 'yellow', width: '150px'}}>400</td>
                        <td>Tổng số xe cổng TQ</td>
                        <td style={{backgroundColor: 'yellow', width: '150px'}}>682</td>
                        </tr>
                    </table>
                </div>
                <div style={{float: 'right', width: '40%'}}>
                    <form>
                        <input type="checkbox" name=""/><b>Cho xuất</b><br/>
                        <input type="checkbox" name=""/><b>Cho phép ra</b><br/>
                        <input type="checkbox" name=""/><b>Kiểm hóa</b><br/>
                        <input type="checkbox" name=""/><b>Bốc</b>
                    </form><br/>
                    <table>
                        <tr>
                            <td><button class="btn btn-info" style={{height: '50px', width: '150px'}}><h9><b>Đồng ý cho ra</b></h9></button></td>
                            <td><button class="btn btn-info" style={{height: '50px', width: '150px'}}><h9><b>Đồng ý Xuất</b></h9></button></td>
                            <td><button class="btn btn-danger" style={{height: '50px', width: '150px'}}><h9><b>Đồng ý cả hai</b></h9></button></td>
                        </tr>    
                    </table>
               
                                    
                </div>
            </div>

          </div>
      </div>
  <div class="ui grid middle aligned"  id="bang" style={{overflow:'auto', float:'left', width: '80%', height:'600px'}}>
          <div class="card-header" >
              <h3 class="card-title" ><button type="submit"
                                    style={{height: '30px'}}
                                     className="btn btn-danger"
                                      onClick={() => this.listInPrevious()}>
                                         <b>-</b>
                                    </button>
                                    <b>{this.state.page}</b>
                                    <button type="submit"
                                    style={{height: '30px'}}
                                     className="btn btn-danger"
                                      onClick={() => this.listInNext()}>
                                         <b>+</b>
                                    </button></h3>
          </div> 
          <table id="example2" class="table table-bordered table-hover"  >
                                <>
                                    <thead>
                                        <tr>
                                            <th>STT vào bãi</th>
                                            <th>Mã thẻ</th>
                                            <th>Ngày vào bãi</th>
                                            <th>Biển số xe</th>
                                            <th>Cho ra</th>
                                            <th>Cho xuất</th>
                                            <th>Biển Cont</th>
                                            <th>Biển Mooc</th>
                                            <th>Loại hàng</th>
                                            <th>Loại xe</th>
                                            <th>Phiểu hải quan</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.data2 && this.state.data2.data.map((item, i) => (
                                            <tr>
                                                <td key={i}> {item.EventParkingID}</td>
                                                <td key={i}> {item.CarNumber_ID}</td>
                                                <td key={i}> {GetFormatDate(item.DateInParking)}</td>
                                                <td key={i}> {item.BienXe}</td>
                                                <td key={i}> Cho ra</td>
                                                <td key={i}> Cho xuất</td>  
                                                <td key={i}> {item.BienCont}</td>
                                                <td key={i}> {item.BienMooc}</td>
                                                <td key={i}> {item.LoaiHangChiTiet}</td>
                                                <td key={i}> {item.LoaiXeID}</td>
                                                <td key={i}> Phiếu hải quan </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </>
                            </table>       
   </div>
</div>
<div style={{width: '20%', height: '20%', float:'right'}}>
      <div class="card card-primary">
          <div class="card-header">
              <h3 class="card-title"></h3>
          </div>
      <div class="card-body">
          <div class="row">
              <div class="">
                  <img src={izivan} id="img_xetrongbai"/>
              </div>
          </div>
      </div>
      

      <div class="card-body">
          <div class="row">
              <div class="">
                  <img src={izivan} id="img_xetrongbai"/>
              </div>
              <div class="card-body">                                   
               <div class="col-3"><br/>
                      <button style={{height: '50px', width: '200px'}}><h9>Đồng ý</h9></button><br/><br/>
                      <button style={{height: '50px', width: '200px'}}><h9>Đồng ý</h9></button>
                </div>
                </div>
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