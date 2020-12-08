import React, { Component } from 'react';
import pl from '../img/placeholder.jpg'
import { requestGetListCar, requestLogin, resquestGetListCarType } from '../../api'
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
function countMoney(n) {
    n = parseFloat(n);
    var b = n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + " vnd";
    if (b == "NaN vnd") {
        return ""
    }
    else {
        return b;
    }
}


class Content extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fromDate: '01/10/2020 00:00:00',
            toDate: '26/12/2020 00:00:00',
            plateNumber: '',
            portIn: '',
            numberCar: "",
            loaiHang: "",
            data: "",
            isLoading: true,
            page: 1,
            nextPage: "",
            previousPage: "",
            PortOut: '',
            SelectCong: "/listCar/listCarInOut?",
            total: "",
            dataXe: "",
            loaiXe: "",
            showBienXe: true,
            showLoaiXe: false,
            showLoaiHang: false,
            pictureDauXeVao: "",
            pictureDauXeRa: "",
            pictureVaoFull: "",
            pictureRaFull: "",
            pictureBienSo: "",
            dataPicture: "",
            totalPage: "",
            namePort: "",
            dataThongKeXe: "",
            thongKeLoaiXe: "/Statistic/statisticCarInOut",
            TongKetCong: "",
            countIn: "",
            countOut: "",
            countTon: "",
            totalMoney: "",
            codeThongKeXe: "",
            limitPage: "10",
            orderNumber: "",
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
    async Select(row) {
        // try {
        //     const res = await requestGetListCar({
        //         FROMDATE: this.state.fromDate,
        //         TODATE: this.state.toDate,
        //         PLATENUMBER: this.state.plateNumber,
        //         PORTIN: this.state.portIn,
        //         PORTOUT: this.state.PortOut,
        //         NUMBERCAR: this.state.numberCar,
        //         LOAIHANG: this.state.loaiHang,
        //         PAGE: 1,
        //         CONG: this.state.SelectCong,
        //         LOAIXE: this.state.loaiXe,
        //         ORDERNUMBER: row,

        //     })
        //     await this.setState({ dataPicture: res.data, pictureDauXeVao: res.data.data[0].LinkAnhDauXe, pictureDauXeRa: res.data.data[0].LinkAnhDauXeRa, pictureBienSo: res.data.data[0].LinkAnhBienSo, pictureVaoFull: res.data.data[0].LinkAnhFull, pictureRaFull: res.data.data[0].LinkAnhRaFull });
        //     console.log(this.state.pictureDauXeVao, "check DATA PICTURE")
        // } catch (err) {
        //     await this.setState({
        //         isLoading: true
        //     }, () => console.log(err))
        // }
        // console.log(this.state.data, "Check data!");
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
    handlePortChange(field, event) {
        this.setState({ [field]: event.target.value })
        if (event.target.value == '5') {
            this.setState({ portIn: '1', PortOut: '3' })
        }
        else if (event.target.value == '1') {
            this.setState({ portIn: '', PortOut: '' })
        }
        else if (event.target.value == '2') {
            this.setState({ portIn: '0', PortOut: null })
        }
        else if (event.target.value == '3') {
            this.setState({ portIn: null, PortOut: '2' })
        }
        else if (event.target.value == '4') {
            this.setState({ portIn: null, PortOut: '4' })
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
        console.log(this.state.nextPage, "nextPage");
        console.log(this.state.previousPage, "previousPage");
        await this.setState({
            isLoading: true
        })
        try {
            this.setState({ page: 1 })
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
                LIMIT: this.state.limitPage,
                ORDERNUMBER: this.state.orderNumber,

            })
            await this.setState({ data: res.data, isLoading: false, total: res.data.total, previousPage: res.data.previousPage, nextPage: res.data.nextPage });
            this.setState({ totalPage: Math.ceil(this.state.total / this.state.limitPage) })
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

    async Edit(userid) {
        try {
            const res = await requestGetListCar({
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
            await this.setState({ dataEdit: res.data, plateEdit: res.data.data[0].BienXe, bienContEdit: res.data.data[0].BienCont, bienMoocEdit: res.data.data[0].BienMooc, loaiHangEdit: res.data.data[0].LoaiHangChiTiet, loaiXeEdit: res.data.data[0].LoaiXeChiTiet });
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
                <div style={{ textAlign: 'center', marginTop: '100px' }}>
                    <div style={{ width: '50px', height: '50px' }} className="spinner-border text-primary" role="status">
                        <span className="sr-only">a</span>
                    </div>
                    <div>
                        <p style={{ fontSize: '20px' }}>Loading...</p>
                    </div>
                </div>
            )
        }
        return (
            <div className="content-wrapper">
                <section className="content">
                    <div className="container-fluid" style={{ float: 'left', width: '70%', height: '250px' }}>
                        <div className="card card-warning" >
                            <div className="card-header" >
                                <h3 className="card-title"></h3>
                            </div>

                            <div className="card-body">
                                <div className="row">
                                    <div className="col-4">
                                        <b>Từ</b><input type="text" className="form-control" placeholder="" value={this.state.fromDate} onChange={(e) => this.handleTextChange('fromDate', e)} />
                                        <b>Mã số thẻ</b><input type="text" className="form-control" placeholder="Nhập Mã số thẻ" value={this.state.numberCar} onChange={(e) => this.handleTextChange('numberCar', e)} />

                                    </div>
                                    <div className="col-4">
                                        <b>Đến</b><input type="text" className="form-control" placeholder="" value={this.state.toDate} onChange={(e) => this.handleTextChange('toDate', e)} />
                                        <b>Biển số xe</b><input type="text" className="form-control" placeholder="Nhập Biển Số" value={this.state.plateNumber} onChange={(e) => this.handleTextChange('plateNumber', e)} />
                                    </div>
                                    <div className="col-4"><br />
                                        <button className="btn btn-danger" style={{ height: '80px', width: '150px' }} onClick={() => this.list()}><h4><b>Tìm Kiếm</b></h4></button>
                                    </div>
                                    <div className="col-4">

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-3"  ><br />
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

                        </div>




                        <div className="ui grid middle aligned" style={{ overflow: 'auto', float: 'left', width: '100%', height: '800px' }}>
                            <div className="card-header" >
                                <h3 className="card-title" ></h3>
                            </div>
                            <table id="example2" className="table table-bordered table-hover"  >
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

                                        {this.state.data && data.data.map((item, i) => (
                                            <tr key={item.EventID}>
                                                <td > {(this.state.page - 1) * this.state.limitPage + i + 1}</td>
                                                <td> {item.SoThuTuTrongNgay}</td>
                                                <td > {GetFormatDate(item.NgayGioVao) || "Chưa có"}</td>
                                                <td > {item.ThoiGianTrongBai || "Chưa có"}</td>
                                                <td > {countMoney(item.TongTienThu) || "Chưa có"}</td>
                                                <td > {item.MaSoTrenThe || "Chưa có"} </td>
                                                <td > {item.BienXe || item.BienXeVao + " / " + (item.BienXeRa || "")}</td>
                                                <td > {item.BienCont || item.BienContVao}</td>
                                                <td > {item.BienMooc || item.BienMoocVao}</td>
                                                <td > {item.LoaiHangChiTiet || item.LoaihangChiTiet}</td>
                                                <td > {(item.LoaiXeChiTiet || "Chưa có") || item.Name} </td>
                                                <td > {item.NhanVienVao}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </>
                            </table>
                            {!this.state.data && <img src={empty} style={{ width: '1200px', height: '800px' }} />}
                        </div>
                    </div>
                    <div style={{ width: '30%', height: '20%', float: 'right' }}>
                        <div className="card card-primary">
                            <div className="card-header">
                                <h3 className="card-title">Hiện Tại</h3>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <table>
                                        <tr>
                                            <td><b>Biển số xe</b></td>
                                            <td><input disabled style={{ backgroundColor: '#C0C8C4' }} value={this.state.plateEdit} onChange={(e) => this.handleTextChange('plateNumber', e)} type="text" name="" id="edit_car1" /></td>
                                            <td><input type="text" name="" id="edit_car1" /></td>
                                        </tr>
                                        <tr>
                                            <td><b>Biển Cont</b></td>
                                            <td><input disabled style={{ backgroundColor: '#C0C8C4' }} value={this.state.bienContEdit} onChange={(e) => this.handleTextChange('bienContEdit', e)} type="text" name="" id="edit_car1" /></td>
                                            <td><input type="text" name="" id="edit_car1" /></td>
                                        </tr>
                                        <tr>
                                            <td><b>Biển Moc</b></td>
                                            <td><input disabled style={{ backgroundColor: '#C0C8C4' }} value={this.state.bienMoocEdit} onChange={(e) => this.handleTextChange('bienMoocEdit', e)} type="text" name="" id="edit_car1" /></td>
                                            <td><input type="text" name="" id="edit_car1" /></td></tr>
                                        <tr>
                                            <td><b>Loại Hàng</b></td>
                                            <td><input disabled style={{ backgroundColor: '#C0C8C4' }} value={this.state.loaiHangEdit} onChange={(e) => this.handleTextChange('loaiHangEdit', e)} type="text" name="" id="edit_car1" /></td>
                                            <td><select>
                                                <option>ThanhLong</option>
                                                <option>aaa</option>
                                            </select></td>
                                        </tr>
                                        <tr>
                                            <td><b>Loại Xe</b></td>
                                            <td><input disabled style={{ backgroundColor: '#C0C8C4' }} value={this.state.loaiXeEdit} onChange={(e) => this.handleTextChange('loaiXeEdit', e)} type="text" name="" id="edit_car1" /></td>
                                            <td><input type="text" name="" id="edit_car1" /></td>
                                        </tr>
                                        <tr>
                                            <td><button className="btn btn-danger">Hủy</button></td>
                                            <td></td>
                                            <td><button className="btn btn-danger">Thay đổi thông tin</button></td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="card card-primary">
                            <div className="card-header">
                                <h3 className="card-title"></h3>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="">
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