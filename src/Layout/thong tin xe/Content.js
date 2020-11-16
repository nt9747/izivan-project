import React, { Component } from 'react';
import pl from '../img/placeholder.jpg'
import { requestGetListCarIn, requestLogin, resquestGetListCarType } from '../../api'
import Cookie from 'js-cookie';
import empty from '../img/empty.png'

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
            SelectCong: "listCar/ListCarIn?",
            total: "",
            dataXe: "",
            loaiXe: "",
            bienContEdit: "",
            bienMoocEdit: "", 
            plateEdit: "",
            loaiXeEdit: "",
            loaiHangEdit: "",
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
            this.setState({ portIn: '1', PortOut: '3' })
        }
        else if (event.target.value == 1) {
            this.setState({ portIn: '', PortOut: '' })
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

    async Edit(userid){
        try {
            const res = await requestGetListCarIn({
                FROMDATE: "10/01/2020",
                TODATE: "10/01/2200",
                PLATENUMBER: userid,
                PORTIN: "",
                PORTOUT: "",
                NUMBERCAR: "",
                LOAIHANG: "",
                PAGE: 1,
                CONG: "listCar/ListCarIn?",
                LOAIXE: "",

            })
            await this.setState({dataEdit: res.data, plateEdit: res.data.data[0].BienXe, bienContEdit: res.data.data[0].BienCont, bienMoocEdit: res.data.data[0].BienMooc, loaiHangEdit: res.data.data[0].LoaiHangChiTiet, loaiXeEdit: res.data.data[0].LoaiXeChiTiet});
            console.log(this.state.dataEdit);
            console.log(this.state.plateEdit);
            console.log(this.state.bienCont);

        } catch (err) {
            await this.setState({
                isLoading: true
            }, () => console.log(err))
        }
        console.log(this.state.data, "Check data!");
    }

    render() {

        const { data, isLoading } = this.state;
        const token = Cookie.get("SESSION_ID");
        console.log(data.data, "check data")
        if (isLoading) {
            return (
                <p>Loading...</p>
            )
        }
        return (
            <div class="content-wrapper">
                <section class="content">
                    <div class="container-fluid" style={{ float: 'left', width: '70%', height: '250px' }}>
                        <div class="card card-warning" >
                            <div class="card-header" >
                                <h3 class="card-title"></h3>
                            </div>

                            <div class="card-body">
                                <div class="row">
                                    <div class="col-4">
                                        <b>Từ</b><input type="text" class="form-control" placeholder=".col-3" value={this.state.fromDate} onChange={(e) => this.handleTextChange('fromDate', e)} /><br />
                                        <b>Đến</b><input type="text" class="form-control" placeholder=".col-3" value={this.state.toDate} onChange={(e) => this.handleTextChange('toDate', e)} />
                                    </div>
                                    <div class="col-4">
                                        <b>Mã thẻ</b><input type="text" class="form-control" name="" value={this.state.numberCar} onChange={(e) => this.handleTextChange('numberCar', e)} /><br />
                                        <b>Biển số xe</b><input type="text" class="form-control" name="" value={this.state.plateNumber} onChange={(e) => this.handleTextChange('plateNumber', e)} />
                                    </div>
                                    <div class="col-3"><br /><br />
                                        <button class="btn btn-danger" style={{ height: '80px', width: '150px' }} onClick={() => this.list()}><h4><b>Tìm Kiếm</b></h4></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-3"  ><br />
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




                        <div class="ui grid middle aligned" style={{ overflow: 'auto', float: 'left', width: '100%', height: '800px' }}>
                            <div class="card-header" >
                                <h3 class="card-title" ></h3>
                            </div>
                            <table id="example2" class="table table-bordered table-hover"  >

                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>STT vào bãi</th>
                                        <th>Thời gian vào bãi</th>
                                        <th>Thời gian ra bãi</th>
                                        <th>Thời gian lưu bãi</th>
                                        <th>Tổng tiền</th>
                                        <th>Mã số thẻ</th>
                                        <th>Biển số xe</th>
                                        <th>Biển số cont</th>
                                        <th>Biển số mooc</th>
                                        <th>Loại hàng</th>
                                        <th>Loại xe</th>
                                        <th>Nhân viên</th>
                                    </tr>
                                </thead>
                                <>
                                    {this.state.data && data.data.map((item, i) => (
                                        <tbody>
                                            <tr key={item.BienXe}>
                                            <td onClick={() => this.Edit(item.BienXe)}> {(this.state.page - 1) * 10 + i + 1}</td>
                                            <td onClick={() => this.Edit(item.BienXe)}> {item.EventID}</td>
                                            <td onClick={() => this.Edit(item.BienXe)}> {GetFormatDate(item.NgayGioVao)}</td>
                                            <td onClick={() => this.Edit(item.BienXe)}> {GetFormatDate(item.NgayGioRa)}</td>
                                            <td onClick={() => this.Edit(item.BienXe)}> {item.ThoiGianTrongBai}</td>
                                            <td onClick={() => this.Edit(item.BienXe)}> {item.TongTienThu}</td>
                                            <td onClick={() => this.Edit(item.BienXe)}> {item.CarNumber_ID}</td>
                                            <td onClick={() => this.Edit(item.BienXe)}> {item.BienXe}</td>
                                            <td onClick={() => this.Edit(item.BienXe)}> {item.BienCont}</td>
                                            <td onClick={() => this.Edit(item.BienXe)}> {item.BienMooc}</td>
                                            <td onClick={() => this.Edit(item.BienXe)}> {item.LoaiHangChiTiet}</td>
                                            <td onClick={() => this.Edit(item.BienXe)}> {item.LoaiXeChiTiet} </td>
                                            <td onClick={() => this.Edit(item.BienXe)}> {item.NhanVienVao}</td>
                                            </tr>
                                        </tbody>
                                    ))}

                                </>
                            </table>
                            {!this.state.data && <img src={empty} style={{ width: '1200px', height: '800px' }} />}
                        </div>
                    </div>
                    <div style={{ width: '30%', height: '20%', float: 'right' }}>
                        <div class="card card-primary">
                            <div class="card-header">
                                <h3 class="card-title">Hiện Tại</h3>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <table>
                                        <tr>
                                            <td><b>Biển số xe</b></td>
                                            <td><input disabled style ={{backgroundColor: '#C0C8C4'}} value={this.state.plateEdit} onChange={(e) => this.handleTextChange('plateNumber', e)} type="text" name="" id="edit_car1" /></td>
                                            <td><input type="text" name="" id="edit_car1" /></td>
                                        </tr>
                                        <tr>
                                            <td><b>Biển Cont</b></td>
                                            <td><input disabled style ={{ backgroundColor: '#C0C8C4'}} value={this.state.bienContEdit} onChange={(e) => this.handleTextChange('bienContEdit', e)} type="text" name="" id="edit_car1" /></td>
                                            <td><input type="text" name="" id="edit_car1" /></td>
                                        </tr>
                                        <tr>
                                            <td><b>Biển Moc</b></td>
                                            <td><input disabled style ={{ backgroundColor: '#C0C8C4'}} value={this.state.bienMoocEdit} onChange={(e) => this.handleTextChange('bienMoocEdit', e)} type="text" name="" id="edit_car1" /></td>
                                            <td><input type="text" name="" id="edit_car1" /></td></tr>
                                        <tr>
                                            <td><b>Loại Hàng</b></td>
                                            <td><input disabled style ={{ backgroundColor: '#C0C8C4'}} value={this.state.loaiHangEdit} onChange={(e) => this.handleTextChange('loaiHangEdit', e)} type="text" name="" id="edit_car1" /></td>
                                            <td><select>
                                                <option>ThanhLong</option>
                                                <option>aaa</option>
                                            </select></td>
                                        </tr>
                                        <tr>
                                            <td><b>Loại Xe</b></td>
                                            <td><input disabled style ={{ backgroundColor: '#C0C8C4'}} value={this.state.loaiXeEdit} onChange={(e) => this.handleTextChange('loaiXeEdit', e)} type="text" name="" id="edit_car1" /></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td><input type="checkbox" name="" /> Thay đổi loại xe</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td><button class="btn btn-danger">Hủy</button></td>
                                            <td></td>
                                            <td><button class="btn btn-danger">Thay đổi thông tin</button></td>
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
                                        <img src={pl} id="img_xetrongbai" />
                                        <img src={pl} id="img_xetrongbai" />
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