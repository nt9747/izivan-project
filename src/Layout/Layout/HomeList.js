import React, { Component } from 'react';
import izivan from '../dist/img/izivan.png'
import { requestGetListCarIn, requestLogin, resquestGetListCarType } from '../../api'
import Cookie from 'js-cookie';
import TableScrollbar from 'react-table-scrollbar';
import { Redirect } from 'react-router-dom'; 
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

class HomeList extends React.Component {
    constructor(props) {
        super(props)    
        this.state = {
            fromDate: '10/01/2020 00:00:00',
            toDate: '10/02/2020 23:59:59',
            plateNumber: '',
            portIn: "",
            numberCar: "",
            loaiHang: "",
            data: "",
            isLoading: true,
            page: 1,
            nextPage: "",
            previousPage: "",
            PortOut: "",
            SelectCong: "",
            total: "",
            dataXe: "",
            loaiXe: "",
        }
    }   
    
    componentDidMount() {
        this.list();
        this.start();
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
                LOAIXE: this.state.loaiXe,
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
                LOAIXE: this.state.loaiXe
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
    async start(){
        await this.setState({
            isLoading: true
        })
        try {
                const res = await resquestGetListCarType({
                })
            await this.setState({dataXe: res.data});
            console.log(this.state.dataXe, "check total");
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
            await this.setState({ data: res.data, isLoading: false, page: 1, total: res.data.total});
            console.log(this.state.fromDate, "check PortIn")
            console.log(this.state.toDate, "check PortOut")
            console.log(this.state.data, "check data");
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

    // handleTextChange(field, event) {
    //     if (event.target.value==10){
    //         this.setState({portIn: '1', PortOut: '3'})
    //     }
    //     this.setState({
    //         [field]: event.target.value
    //     })
    // }

    
    render() {
        const { data, isLoading } = this.state;
        const token = Cookie.get("SESSION_ID");
        if (isLoading) {
            return (
                <p>Loading...</p>
            )
        }
        return (
            <div class="content-wrapper" id="root">
                <section class="content">
                    <div class="container-fluid">
                        <div class="card card-warning">
                            <div class="card-header">
                                <h3 class="card-title"><i>Quản lí xe tổng hợp </i></h3>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-3">
                                        <b>Từ</b><input type="text" class="form-control" placeholder="" value={this.state.fromDate} onChange={(e) => this.handleTextChange('fromDate', e)}/>
                                    </div>
                                    <div class="col-3">
                                        <b>Đến</b><input  type="text" class="form-control" placeholder="" value={this.state.toDate} onChange={(e) => this.handleTextChange('toDate', e)}/>
                                    </div>
                                    <div class="col-3">
                                        <b>Loại Hàng</b><br />
                                        <select loaiHang = {this.state.loaiHang} onChange={(e) => this.handleTextChange('loaiHang', e)}>
                                        <option>Chọn</option>
                                            <option value="">Tất cả</option>
                                            <option value="CAU KHÔ">CAU KHÔ</option>
                                            <option value="THANH LONG">THANH LONG</option>
                                            <option value="CHUỐI NÓNG">CHUỐI NÓNG</option>
                                            <option value="DƯA HẤU">DƯA HẤU</option>
                                            <option value="CHUỐI LẠNH">CHUỐI LẠNH</option>
                                            <option value="SẮN">SẮN</option>
                                            <option value="MÍT LẠNH">MÍT LẠNH</option>
                                            <option value="MÍT NÓNG">MÍT NÓNG</option>
                                            <option value="CÓI">CÓI</option>    
                                            <option value="LÁ TRE">LÁ TRE</option>
                                            <option value="LẠC">LẠC</option>
                                            <option value="ĐỖ">ĐỖ</option>
                                            <option value="XOÀI LẠNH">XOÀI LẠNH</option>
                                            <option value="XOÀI NÓNG">XOÀI NÓNG</option>
                                            <option value="BỘT SẮN">BỘT SẮN</option>
                                            <option value="HÀNH TÂY">HÀNH TÂY</option>
                                            <option value="TẠP HÓA">TẠP HÓA</option>
                                            <option value="CÀ RỐT">CÀ RỐT</option>
                                            <option value="LONG NHÃN">LONG NHÃN</option>
                                            <option value="CÚT MÂY">CÚT MÂY</option>
                                            <option value="SONG MÂY">SONG MÂY</option>
                                            <option value="VẢI NÓNG">VẢI NÓNG</option>
                                            <option value="VẢI LẠNH">VẢI LẠNH</option>
                                            <option value="VẢI KHÔ">VẢI KHÔ</option>
                                            <option value="CAU">CAU</option>
                                            <option value="TỎI">TỎI</option>
                                            <option value="KHUÔN MÁY">KHUÔN MÁY</option>
                                            <option value="LÁ CỌ">LÁ CỌ</option>
                                            <option value="NẤM">NẤM</option>
                                            <option value="DƯA VÀNG">DƯA VÀNG</option>
                                            <option value="HOA HỒI">HOA HỒI</option>
                                            <option value="RAU">RAU</option>
                                            <option value="CÂY CẢNH">CÂY CẢNH</option>
                                            <option value="CHẬU CÂY">CHẬU CÂY</option>
                                            <option value="GIẤY">GIẤY</option>
                                            <option value="KHOAI TÂY">KHOAI TÂY</option>
                                            <option value="RỔ RÁ">RỔ RÁ</option>
                                            <option value="CHÔM CHÔM">CHÔM CHÔM</option>
                                            <option value="NHÃN LẠNH">NHÃN LẠNH</option>
                                            <option value="NHÃN NÓNG">NHÃN NÓNG</option>
                                            <option value="NHÃN TƯƠI">NHÃN TƯƠI</option>
                                            <option value="NHÃN KHÔ">NHÃN KHÔ</option>
                                            <option value="NÓN">NÓN</option>
                                            <option value="HẠT SEN">HẠT SEN</option>
                                            <option value="CỦ CẢI">CỦ CẢI</option>
                                            <option value="CHẬU CÂY CẢNH">CHẬU CÂY CẢNH</option>
                                            <option value="GỪNG">GỪNG</option>
                                            <option value="KHOAI SỌ">KHOAI SỌ</option>
                                            <option value="ĐỒ NGỌC">ĐỒ NGỌC</option>
                                            <option value="NỒI CƠM ĐIỆN">NỒI CƠM ĐIỆN</option>
                                            <option value="XỐP">XỐP</option>
                                            <option value="HÀNG HỘP">HÀNG HỘP</option>
                                            <option value="HỒNG">HỒNG</option>
                                            <option value="SẦU RIÊNG">SẦU RIÊNG</option>
                                            <option value="ỚT">ỚT</option>
                                            <option value="MÁY MÓC">MÁY MÓC</option>
                                            <option value="ĐỖ XANH">ĐỖ XANH</option>
                                            <option value="ĐỖ ĐỎ">ĐỖ ĐỎ</option>
                                            <option value="GIÀY DÉP">GIÀY DÉP</option>
                                            <option value="HÀNH TỎI">HÀNH TỎI</option>
                                            <option value="NỘI THẤT">NỘI THẤT</option>
                                            <option value="HẠT DƯA">HẠT DƯA</option>
                                            <option value="BÁNH PÍA">BÁNH PÍA</option>
                                            <option value="HẠT TRẦU">HẠT TRẦU</option>
                                            <option value="NỘI THẤT">NỘI THẤT</option>
                                        </select>
                                    </div>
                                    <div>
                    <table>
                      <tr>
                        <td style={{textAlign: 'center'}}><b>Vào</b></td>
                        <td style={{textAlign: 'center'}}><b>Ra</b></td>
                        <td style={{textAlign: 'center'}}><b>Tồn</b></td>
                        <td style={{textAlign: 'center'}}></td>
                      </tr>
                      <tr>
                        <td><b style={{textAlign: 'center', backgroundColor: '#E79FEB', width: '50px', height: '50px', display: 'inline-block'}}>{this.state.total}</b></td>
                        <td><b style={{textAlign: 'center', backgroundColor: '#8CE135', width: '50px', height: '50px', display: 'inline-block'}}>b</b></td>
                        <td><b style={{textAlign: 'center', backgroundColor: '#35DFE1', width: '50px', height: '50px', display: 'inline-block'}}>c</b></td>
                        <td><b style={{textAlign: 'center', backgroundColor: '#35E17E', width: '200px', height: '50px', display: 'inline-block'}}>d</b></td>
                      </tr>
                    </table>
              </div>
                                </div>
                                
                                <div class="row">
                                    <div class="col-3"> 
                                        <b>Loại xe</b><br />
        <select value = {this.state.loaiXe} onChange={(e) => this.handleTextChange('loaiXe', e)}>{this.state.dataXe && this.state.dataXe.map((item, i) => <option value = {item.LoaiXe}>{item.Name}</option>)} 
        <option value = ''>Tất cả</option>  
                                        </select>
                                    </div>
                                    <div class="col-3">
                                        <b>Biển số xe</b><input type="text" class="form-control" placeholder="Nhập Biển Số" value={this.state.plateNumber} onChange={(e) => this.handleTextChange('plateNumber', e)}/>
                                    </div>
                                    <div class="col-3">
                                        <b>Mã số thẻ</b><input type="text" class="form-control" placeholder="Nhập Mã số thẻ" value={this.state.numberCar} onChange={(e) => this.handleTextChange('numberCar', e)}/>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-4">
                                        <b>Cổng</b><br />
                                        {/* <select value= {this.state.portIn} onChange={(e) => this.handleTextChange('portIn', e)}>
                                            <option value = ''>Tất cả</option>
                                            <option value = '0'>Cổng vào VN</option>
                                            <select value= {this.state.portOut} onChange={(e) => this.handleTextChange('portOut', e)}></select>
                                            <option >Cổng ra quay đầu</option>
                                            <option>Cổng ra xuất</option>
                                            <option value = "1">Cổng vào/ra TQ</option>
                                        </select> */}
                                        <select onChange={(e) => this.handlePortChange(e)}>
                                        <option value = ''>Chọn</option>
                                            <option value = '1'>Tất cả</option>
                                            <option value = '2'>Cổng vào VN</option>
                                            <option value = '3'>Cổng ra quay đầu</option>
                                            <option value = '4' >Cổng ra xuất</option>
                                            <option value = '5'>Cổng vao ra CN</option>
                                        </select>
                                        <select value = {this.state.SelectCong} onChange={(e) => this.handleTextChange('SelectCong', e)}>
                                        <option value="" disabled="disabled">Chọn</option>
                                            <option value = '/listCar/listCarInOut?'>0. Giao dịch vào ra</option>
                                            <option value = '/listCar/listCarIn?' >1. Giao dịch vào </option>
                                            <option value = '/listCar/listCarOut?'>2. Giao dịch ra</option>
                                            <option value = '/listCar/listCarParking?'>3. Số lượng xe tồn</option>
                                        </select>
                                    </div>
                                    <div class="col-2"><br />
                                    <button type="submit"
                                     className="btn btn-danger"
                                      onClick={() => this.list()}>
                                         <b>Tìm kiếm</b>
                                    </button>
                                    </div>
                                    
                                    <div class="col-2"><br />
                                    <form action="/ExportExcel">
                                    <button type="submit"
                                     className="btn btn-danger"
                                      >
                                         <b>Export Excel</b>
                                    </button>
                                    </form>
                                    </div>
                                    <div class="col-2"><br />
                                    <button type="submit"
                                     className="btn btn-danger"
                                      onClick={() => this.listInPrevious()}>
                                         <b>-</b>
                                    </button>
                                    <b>{this.state.page}</b>
                                    <button type="submit"
                                     className="btn btn-danger"
                                      onClick={() => this.listInNext()}>
                                         <b>+</b>
                                    </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="ui grid middle aligned" id="admin1" style={{overflow: 'auto' ,float:'left', width: '80%', height:'800px'}}>
                            <div class="card-header" >
                                <h3 class="card-title" >
                                    <button>Biển Số</button>
                                    <button>Loại Xe</button>
                                    <button>Loại Hàng</button>
                                </h3>
                            </div>
                            <table id="example2" class="table table-bordered table-hover"  >
                          
                                    <thead>
                                        <tr>
                                            <th>STT vào bãi</th>
                                            <th>Biển sô xe vào/ Biển số xe ra</th>
                                            <th>Biển Cont</th>
                                            <th>Biển Mooc</th>
                                            <th>Loại xe</th>
                                            <th>Mã số thẻ</th>
                                            <th>Thời gian vào bãi</th>
                                            <th>Thời gia ra bãi</th>
                                            <th>Thời gian lưu bãi</th>
                                            <th>Số tiền</th>
                                            <th>Nhân viên vào / Nhân viên ra</th>
                                            <th>Loại hàng</th>
                                            <th>Cổng vào</th>
                                            <th>Cổng ra</th>
                                            <th>Phiếu hải quan</th>
                                        </tr>
                                    </thead>
                            <>
                           {this.state.data && data.data.map((item, i) => (
                                    <tbody>
                                            <tr>
                                                <td key={i}> {(this.state.page-1)*10 + i + 1}</td>
                                                <td key={i}> {item.BienXe}</td>
                                                <td key={i}> {item.BienCont}</td>
                                                <td key={i}> {item.BienMooc}</td>
                                                <td key={i}> ??? </td>
                                                <td key={i}> {item.CarNumber_ID}</td>
                                                <td key={i}> {GetFormatDate(item.NgayGioVao)}</td>
                                                <td key={i}> {GetFormatDate(item.NgayGioDongYXuat)}</td>
                                                <td key={i}> {item.ThoiGianTrongBai}</td>
                                                <td key={i}> {item.PhiLuuDem + item.PhiLuuNgay + item.PhiVaoBai}</td>
                                                <td key={i}> {item.UserID_Vao + " / " + item.USerID_DongYra}</td>
                                                <td key={i}> {item.LoaiHangChiTiet}</td>
                                                <td key={i}> {item.CongVao + ":" + item.CongVaoName}</td>
                                                <td key={i}> {item.IsRaKhoiBai}</td>
                                                <td> </td>
                                            </tr>
                                    </tbody>
                                ))}
                           
                                </>
                            </table>
                            {this.state.total == 0 &&  <img src={empty} style={{width:'1300px', height:'800px'}}/>}
                        </div>
                    </div>
                    <div>
                    <div class="card card-warning" >                           
                       
                            <div class="card-header">
                                <h3 class="card-title">Ảnh vào</h3>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="">
                                        <img src={izivan} id="imglayout" />
                                    </div>
                                </div>
                            </div>
                        
                       
                            <div class="card-header">
                                <h3 class="card-title">Ảnh ra</h3>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="">
                                        <img src={izivan} id="imglayout" />
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

export default HomeList