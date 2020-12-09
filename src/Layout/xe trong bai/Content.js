import React, { Component } from 'react';
import { requestGetListCar, requestLogin } from '../../api'
import Cookie from 'js-cookie';
import empty from '../img/empty.png'
import a from '../img/a.jpg';
import b from '../img/b.jpg';

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
            totalPage: "",
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
            const res = await requestGetListCar({
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
            const res = await requestGetListCar({
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
            const res = await requestGetListCar({
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
            await this.setState({ data: res.data, isLoading: false, page: 1, total: res.data.total});
            this.setState({ totalPage: Math.floor(this.state.total / 10) + 1 })
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
     <section className="content"  >
<div className="container-fluid">
  <div className="card card-warning">
    <div className="card-header">
        <h3 className="card-title"><i>Danh sách xe trong bãi</i></h3>
    </div>

        <div className="card-body">
            <div className="row">
                <div className="" style={{float: 'left', width: '64%'}}>
                    <table style={{width: '100%'}}>
                        <tr>
                            <td><b>Loại hàng</b><input type="text" className="form-control" placeholder="Nhập loại hàng"/></td>
                            <td><b>Biển số xe</b><input type="text" className="form-control" placeholder="Nhập biển số xe"/></td>
                            <td style={{borderBottom: 'white solid 40px'}}></td>
                        </tr>
                        <tr>
                            <td><b>Cổng</b>
                                    <select onChange={(e) => this.handlePortChange(e)}>
                                        <option value = ''>Chọn</option>
                                        <option value = '1'>Tất cả</option>
                                        <option value = '2'>Cổng vào VN</option>
                                        <option value = '5'>Cổng vao ra CN</option>
                                     </select></td>
                            <td style={{ borderRight: 'white solid 10px' }}><b>Mã Thẻ</b><input type="text" className="form-control" placeholder="Nhập mã thẻ"/></td>
                            <td><button className="btn btn-primary" onClick={() => this.list()} style={{height: '40px', width: '250px'}}><h6><b>Tìm</b></h6></button></td>
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
                <div style={{float: 'right', width: '36%'}}>
                    <form>
                        <input type="checkbox" name=""/><b>Cho xuất</b><br/>
                        <input type="checkbox" name=""/><b>Cho phép ra</b><br/>
                        <input type="checkbox" name=""/><b>Kiểm hóa</b><br/>
                        <input type="checkbox" name=""/><b>Bốc</b>
                    </form><br/>
                    <table>
                        <tr style={{ textAlign: 'center'}}>
                            <td style={{ borderBottom: 'white solid 10px', borderRight: 'white solid 10px', height: '30px', width: '130px', backgroundColor: '#909090'}}><h9><b>Đồng ý cho ra</b></h9></td>
                            <td style={{ height: '30px', width: '130px', backgroundColor: '#4AE10E'}}><h9><b>Đồng ý cả hai</b></h9></td>
                        </tr>
                        <tr style={{ textAlign: 'center'}}>
                            <td style={{ borderRight: 'white solid 10px', height: '30px', width: '130px', backgroundColor: '#FAF022'}}><h9><b>Đồng ý Xuất</b></h9></td>
                            <td></td>
                        </tr>
                    </table>
               
                                    
                </div>
            </div>

          </div>
      </div>
  <div className="ui grid middle aligned"  id="bang" style={{overflow:'auto', float:'left', width: '75%', height:'600px'}}>
          <div className="card-header" >
              <h3 className="card-title">
              <svg onClick={() => this.setState({ page: 1 }) || this.list()} width="1.7em" height="1.7em" viewBox="0 0 16 16" className="bi bi-skip-start-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M4.5 3.5A.5.5 0 0 0 4 4v8a.5.5 0 0 0 1 0V4a.5.5 0 0 0-.5-.5z" />
                                        <path d="M4.903 8.697l6.364 3.692c.54.313 1.232-.066 1.232-.697V4.308c0-.63-.692-1.01-1.232-.696L4.903 7.304a.802.802 0 0 0 0 1.393z" />
                                    </svg>
                                    <svg width="1.7em" height="1.7em" onClick={() => this.listInPrevious()} viewBox="0 0 16 16" className="bi bi-caret-left-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.86 8.753l5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                                    </svg>
                                    <b>{this.state.page}/{this.state.totalPage}</b>
                                    <svg width="1.7em" height="1.7em" onClick={() => this.listInNext()} viewBox="0 0 16 16" className="bi bi-caret-right-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                                    </svg>
                                    <svg onClick={() => this.setState({ page: this.state.totalPage - 1 }) || this.listInNext()} width="1.7em" height="1.7em" viewBox="0 0 16 16" className="bi bi-skip-end-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M12 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z" />
                                        <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                                    </svg>

              </h3>
          </div> 
          <table id="example2" className="table table-bordered table-hover"  >
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
<div style={{width: '25%', height: '20%', float:'right'}}>
      <div className="card card-primary">
          <div className="card-header">
              <h3 className="card-title"></h3>
          </div>
      <div className="card-body">
          <div className="row">
              <div className="">
                  <img src={a} id="img_xetrongbai"/>
              </div>
          </div>
      </div>
      

      <div className="card-body">
          <div className="row">
              <div className="">
                  <img src={b} id="img_xetrongbai"/>
              </div>
              <div className="card-body">                                   
               <div className="col-4"><br/>
                      
                      <table style = {{width: '380px'}}>
                                        <tr>
                                            <td style={{ textAlign: 'center', borderBottom: 'white solid 20px'}} colSpan="2"><button className="btn btn-danger" style={{height: '50px', width: '350px'}}><h9>Đồng ý</h9></button></td>
                                        </tr>
                                        <tr>
                                            <td><b>Phiếu hải quan</b></td>
                                            <td style = {{width: '300px'}}><input type="text" className="form-control" placeholder="" value={this.state.PhieuHaiQuan} onChange={(e) => this.handleTextChange('PhieuHaiQuan', e)} /></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td><button onClick={() => this.RequestThemPhieuHaiQuan()} className="btn btn-primary" style={{ width: '200px' }}><b>Thêm phiếu hải quan</b></button></td>
                                        </tr>
                                    </table>
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