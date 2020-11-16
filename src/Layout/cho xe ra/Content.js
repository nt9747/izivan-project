import React, { Component } from 'react';
import izivan from '../img/1.png'
import { requestGetListCarIn, requestLogin, resquestGetListCarType } from '../../api'
import Cookie from 'js-cookie';

function GetFormatDate(a) {
    const b = new Date(a);
    var hours = b.getUTCHours();
    var minutes = b.getUTCMinutes();
    var seconds = b.getUTCSeconds();
    var month = b.getUTCMonth() + 1;
    var day = b.getUTCDate();
    var year = b.getUTCFullYear();


    if (month.toString().length == 1) {
        month = '0' + month;
    }
    if (day.toString().length == 1) {
        day = '0' + day;
    }
    if (hours.toString().length == 1) {
        hours = '0' + hours;
    }
    if (minutes.toString().length == 1) {
        minutes = '0' + minutes;
    }
    if (seconds.toString().length == 1) {
        seconds = '0' + seconds;
    }
    if (year == 1970) {
        return ""
    }
    else return hours + ":" + minutes + ":" + seconds + "  " + day + "/" + month + "/" + year
}

class Content extends React.Component {
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
            SelectCong: "/listCar/ListCarIn?",
            total: "",
            dataXe: "",
            loaiXe: "",
            bienCont: "",
            bienMooc: "",
            tongTienThu: "",
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
            if (!(this.state.nextPage)) {
                return (--this.state.page);
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
            if (this.state.page < 1) {
                ++this.state.page
            }
            await this.setState({ data: res.data, isLoading: false, previousPage: res.data.previousPage });
            console.log(this.state.data, "check data")
        } catch (err) {
            await this.setState({
                isLoading: false
            }, () => console.log(err))
        }
    }
    async start() {
        await this.setState({
            isLoading: true
        })
        try {
            const res = await resquestGetListCarType({
            })
            await this.setState({ dataXe: res.data });
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
            await this.setState({ data: res.data, isLoading: false, page: 1, total: res.data.total });
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
        if (event.target.value == 5) {
            this.setState({ portIn: '1', PortOut: null })
        }
        else if (event.target.value == 1) {
            this.setState({ portIn: '', PortOut: null })
        }
        else if (event.target.value == 2) {
            this.setState({ portIn: '0', PortOut: null })
        }
        else if (event.target.value == 3) {
            this.setState({ portIn: null, PortOut: '2' })
        }
        else if (event.target.value == 4) {
            this.setState({ portIn: null, PortOut: '4' })
        }
    }

    handleDataTable(eventid) {
        this.setState({ plateNumber: eventid.BienXe, bienCont: eventid.BienCont, bienMooc: eventid.BienMooc, loaiHang: eventid.LoaiHangChiTiet, loaiXe: eventid.LoaiXeChiTiet, fromDate: eventid.NgayGioVao, tongTienThu: eventid.TongTienThu })
    }

    render() {

        const { data, isLoading } = this.state;
        const token = Cookie.get("SESSION_ID");
        // console.log(data.data, "check data")
        // if (isLoading) {
        //     return (
        //         <p>Loading...</p>
        //     )
        // }
        return (
            <div class="content-wrapper">
                <section class="content">
                    <div class="container-fluid" >
                        <div class="card card-warning" >
                            <div class="card-header" >
                                <h3 class="card-title"><i>Cho xe ra</i></h3>
                            </div>

                            <div class="card-body">
                                <div class="row">
                                    <div class="col-3">
                                        <b>Từ</b><input value={this.state.fromDate} onChange={(e) => this.handleTextChange('fromDate', e)} type="text" class="form-control" placeholder="" /><br />
                                        <b>Mã thẻ</b><input value={this.state.numberCar} onChange={(e) => this.handleTextChange('numberCar', e)} type="text" class="form-control" name="" />

                                    </div>
                                    <div class="col-3">
                                        <b>Đến</b><input value={this.state.toDate} onChange={(e) => this.handleTextChange('toDate', e)} type="text" class="form-control" placeholder="" /><br />
                                        <b>Biển số xe</b><input value={this.state.plateNumber} onChange={(e) => this.handleTextChange('plateNumber', e)} type="text" class="form-control" name="" />
                                    </div>
                                    <div class="col-3"><br />
                                        <b>Cổng</b><select onChange={(e) => this.handlePortChange(e)}>
                                            <option value=''>Chọn</option>
                                            <option value='2'>Cổng vào VN</option>
                                            <option value='5'>Cổng vào CN</option>
                                        </select>
                                    </div>
                                    <div class="col-3"><br /><br />
                                        <button class="btn btn-danger" style={{ height: '80px', width: '150px' }} onClick={() => this.list()} ><h4><b>Tìm Kiếm</b></h4></button>
                                    </div>
                                    <div class="col-3">

                                    </div>
                                </div>
                            </div>
                        </div>



                        <div class="ui grid middle aligned" style={{ overflow: 'auto', float: 'left', width: '65%', height: '600px' }}>
                            <div class="card-header" >
                                <h3 class="card-title" > <button type="submit"
                                            style={{width:'38px', color:'#C8C8C8'}}
                                           
                                            onClick={() => this.listInPrevious()}>
                                            <b style={{color:'black'}}>-</b>
                                        </button>
                                        <b>{this.state.page}</b>
                                        <button type="submit"
                                            style={{width:'38px', color:'#C8C8C8'}}
                                            
                                            onClick={() => this.listInNext()}>
                                            <b style={{color:'black'}}>+</b>
                                        </button></h3>
                            </div>
                            <table id="example2" class="table table-bordered table-hover"  >
                                <>
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>STT vào bãi</th>
                                            <th>Thời gian vào bãi</th>
                                            <th>Thời gian lưu bãi</th>
                                            <th>Số tiền</th>
                                            <th>Mã thẻ</th>
                                            <th>Biển số xe</th>
                                            <th>Biển Cont</th>
                                            <th>Biển Mooc</th>
                                            <th>Loại hàng</th>
                                            <th>Loại xe</th>
                                            <th>Nhân viên</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {data.data && data.data.map((item, i) => (
                                            <tr>
                                                <td key={i}> {(this.state.page - 1) * 10 + i + 1}</td>
                                                <td key={i}> {item.EventID}</td>
                                                <td key={i}> {GetFormatDate(item.NgayGioVao)}</td>
                                                <td key={i}> {item.ThoiGianTrongBai}</td>
                                                <td key={i}> {item.TongTienThu}</td>
                                                <td key={i}> {item.CarNumber_ID}</td>
                                                <td key={i}> {item.BienXe}</td>
                                                <td key={i}> {item.BienCont}</td>
                                                <td key={i}> {item.BienMooc}</td>
                                                <td key={i}> {item.LoaiHangChiTiet}</td>
                                                <td key={i}> {item.LoaiXeChiTiet} </td>
                                                <td key={i}> {item.NhanVienVao}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </>
                            </table>
                        </div>
                    </div>
                    <div style={{ width: '35%', height: '20%', float: 'right' }}>
                        <div class="card card-primary">
                            <div class="card-header">
                                <h3 class="card-title">Hiện Tại</h3>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <table>
                                        <tr>
                                            <td><b>Biển số xe</b></td>
                                            <td><input type="text" name="" id="edit_car" /><b>Ngày vào</b></td>
                                            <td><input type="text" name="" id="edit_car" /></td>
                                        </tr>
                                        <tr>
                                            <td><b>Biển Cont</b></td>
                                            <td><input type="text" name="" id="edit_car" /><b>Giờ vào</b></td>
                                            <td><input type="text" name="" id="edit_car" /></td>
                                        </tr>
                                        <tr>
                                            <td><b>Biển Moc</b></td>
                                            <td><input type="text" name="" id="edit_car" /><b>Tổng tiền</b></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td><b>Loại Hàng</b></td>
                                            <td colspan="2"><input type="text" name="" id="edit_car" /> <input type="text" style={{ width: '185px' }} /></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td><b>Loại Xe</b></td>
                                            <td colspan="2"><input type="text" style={{ width: '310px' }} /></td>
                                        </tr>
                                        <tr>
                                            <td><button class='btn btn-danger'><b>Hủy</b></button></td>
                                            <td><button class='btn btn-danger'><b>Thay đổi thông tin</b></button></td>
                                            <td></td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="card card-primary">
                            <div class="card-header">
                                <h3 class="card-title"></h3>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="">
                                        <img src={izivan} id="img_xetrongbai" />
                                        <img src={izivan} id="img_xetrongbai" />
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="">
                                        <img src={izivan} id="img_xetrongbai" />
                                        <img src={izivan} id="img_xetrongbai" />
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