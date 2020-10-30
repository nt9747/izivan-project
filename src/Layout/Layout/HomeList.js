import React, { Component } from 'react';
import izivan from '../dist/img/izivan.png'
import { requestGetListCarInfo, requestLogin } from '../../api'
import Cookie from 'js-cookie';
import TableScrollbar from 'react-table-scrollbar';

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
            fromDate: '2020/07/03',
            toDate: '2020/10/15',
            plateNumber: '',
            portIn: "",
            numberCar: "",
            loaiHang: "",
            data: "",
            isLoading: true,
            page: 1,
            nextPage: "",
            previousPage: ""
        }
    }        
    componentDidMount() {
        this.list();
    }
    async listNext() {
        await this.setState({
            isLoading: true
        })
        try {
            const res = await requestGetListCarInfo({
                FROMDATE: this.state.fromDate,
                TODATE: this.state.toDate,
                PLATENUMBER: "",
                PORTIN: "",
                NUMBERCAR: "",
                LOAIHANG: "",
                PAGE: ++this.state.page,
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

    async listPrevious() {
        await this.setState({
            isLoading: true
        })
        try {
            const res = await requestGetListCarInfo({
                FROMDATE: this.state.fromDate,
                TODATE: this.state.toDate,
                PLATENUMBER: "",
                PORTIN: "",
                NUMBERCAR: "",
                LOAIHANG: "",
                PAGE: --this.state.page,
            })
            // if (!res.data.data){
            //     return
            // }
            if (this.state.page < 1){
                return(++this.state.page)
            }
            await this.setState({ data: res.data, isLoading: false, previousPage: res.data.previousPage});
            console.log(this.state.data, "check data")
        } catch (err) {
            await this.setState({
                isLoading: false
            }, () => console.log(err))
        }
    }

    // async DateConvert(a){

    //     const unixTimeZero = Date.parse('01 Jan 1970 00:00:00 GMT');
    //     return (
    //         unixTimeZero
    //     )
    // }

    async list() {
        await this.setState({
            isLoading: true
        })
        try {
            const res = await requestGetListCarInfo({
                FROMDATE: this.state.fromDate,
                TODATE: this.state.toDate,
                PLATENUMBER: "",
                PORTIN: "",
                NUMBERCAR: "",
                LOAIHANG: "",
                PAGE: this.state.page,
            })
            await this.setState({ data: res.data, isLoading: false, page: 1});
        } catch (err) {
            await this.setState({
                isLoading: false
            }, () => console.log(err))
        }
        if (typeof(this.state.data) == "undefined"){
            alert("haha")
        }
        console.log(typeof(this.state.data), "check")
    }


    handleTextChange(field, event) {
        this.setState({
            [field]: event.target.value
        })
    }

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
                                <h3 class="card-title"></h3>
                            </div>

                            <div class="card-body">
                                <div class="row">
                                    <div class="col-3">
                                        <b>Từ</b><input min="2000-01-01" max="2300-12-31" type="date" class="form-control" placeholder="" value={this.state.fromDate} onChange={(e) => this.handleTextChange('fromDate', e)}/>
                                    </div>
                                    <div class="col-4">
                                        <b>Đến</b><input min="2000-01-01" max="2300-12-31" type="date" class="form-control" placeholder="" value={this.state.toDate} onChange={(e) => this.handleTextChange('toDate', e)}/>
                                    </div>
                                    <div class="col-5">
                                        <b>Loại Hàng</b><br />
                                        <select value= {this.state.loaiHang} onChange={(e) => this.handleTextChange('loaiHang', e)}>
                                            <option>123</option>
                                            <option>456</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-2">
                                        <b>Loại xe</b><br />
                                        <select>
                                            <option>aaaab</option>
                                            <option>bbbbb</option>
                                        </select>
                                    </div>
                                    <div class="col-3">
                                        <b>Mã Thẻ</b><input type="text" class="form-control" placeholder="Nhập mã thẻ" />
                                    </div>
                                    <div class="col-3">
                                        <b>Biển số xe</b><input type="text" class="form-control" placeholder="Nhập Biển Số" value={this.state.plateNumber} onChange={(e) => this.handleTextChange('plateNumber', e)}/>
                                    </div>
                                    <div class="col-3">
                                        <b>Số thứ tự</b><input type="text" class="form-control" placeholder="Nhập số thứ tự" value={this.state.numberCar} onChange={(e) => this.handleTextChange('numberCar', e)}/>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-5">
                                        <b>Cổng</b><br />
                                        <select value= {this.state.portIn} onChange={(e) => this.handleTextChange('portIn', e)}>
                                            <option>Tất cả</option>
                                            <option>bbbbbb</option>
                                        </select>
                                        <select>
                                            <option>Giao dịch vào ra</option>
                                        </select>
                                    </div>
                                    <div class="col-3"><br />
                                    <button type="submit"
                                     className="btn btn-danger"
                                      onClick={() => this.list()}>
                                         <b>Tìm kiếm</b>
                                    </button>
                                    </div>
                                    
                                    <div class="col-3"><br />
                                    <form action="/ExportExcel">
                                    <button type="submit"
                                     className="btn btn-danger"
                                      >
                                         <b>Export Excel</b>
                                    </button>
                                    </form>
                                     

                                </div>
                                    <div class="col-3"><br />
                                    <button type="submit"
                                     className="btn btn-danger"
                                      onClick={() => this.listPrevious()}>
                                         <b>-</b>
                                    </button>
                                    <b>{this.state.page}</b>
                                    <button type="submit"
                                     className="btn btn-danger"
                                      onClick={() => this.listNext()}>
                                         <b>+</b>
                                    </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="ui grid middle aligned" id="admin1" style={{float:'left', width: '80%', height:'650px'}}>
                            <div class="card-header" >
                                <h3 class="card-title" ></h3>
                            </div>
                            <TableScrollbar rows={20} >
                            <table id="example2" class="table table-bordered table-hover"  >
                                <>
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
                                            <th>Ra khoi bai</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.data && data.data.map((item, i) => (
                                            <tr>
                                                <td key={i}> {item.EventID}</td>
                                                <td key={i}> {item.BienXe}</td>
                                                <td key={i}> {item.BienCont}</td>
                                                <td key={i}> {item.BienMooc}</td>
                                                <td key={i}> {item.LoaiXeID}</td>
                                                <td key={i}> {item.CarNumber_ID}</td>
                                                <td key={i}> {GetFormatDate(item.NgayGioVao)}</td>
                                                <td key={i}> {GetFormatDate(item.NgayGioDongYXuat)}</td>
                                                <td key={i}> {item.ThoiGianTrongBai}</td>
                                                <td key={i}> {item.PhiLuuDem + item.PhiLuuNgay + item.PhiVaoBai}</td>
                                                <td key={i}> {item.UserID_Vao + " / " + item.USerID_DongYra}</td>
                                                <td key={i}> {item.LoaiHangChiTiet}</td>
                                                <td key={i}> {item.CongVao + ":" + item.CongVaoName}</td>
                                                <td key={i}> {item.IsRaKhoiBai}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </>
                            </table>
                            </TableScrollbar>
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