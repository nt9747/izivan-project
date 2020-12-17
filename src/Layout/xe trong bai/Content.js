
import React, { Component } from 'react';
import empty from '../img/empty.png'
import { requestGetListCar, requestLogin, resquestGetListCarType, requestGetListLoaiXe, resquestThemPhieuHaiQuan, resquestExportKiemhoa, requestChoXeRa } from '../../api'
import Cookie from 'js-cookie';
import TableScrollbar from 'react-table-scrollbar';
import { Redirect } from 'react-router-dom';


import a from '../img/a.jpg';
import b from '../img/b.jpg';




var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
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
            fromDate: '01/09/2019 00:00:00',
            toDate: '26/12/2200 00:00:00',
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
            SelectCong: "/listCar/listCarParking?",
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
            thongKeLoaiXe: "/Statistic/statisticCarParking",
            TongKetCong: "",
            countIn: "",
            countOut: "",
            countTon: "",
            totalMoney: "",
            codeThongKeXe: "",
            limitPage: "20",
            orderNumber: "",
            bienCont: "",
            bienMooc: "",
            countXeAll: "",
            countXeVN: "",
            countXeCN: "",
            EventIdXuLy: "",
            PhieuHaiQuan: "",
            isActive: null,
            bienXeChange: "",
            bienContChange: "",
            bienMocChange: "",
            loaiHangChange: "",
            loaiXeChange: "",
            loaiXeIDchange: "",
            EventIDChange: "null",
            IsDongYXeRa: "",
            IsXeKhongHang: "",
            IsXeQuayDau: "",
            linkAnhBienSoChange: "",
            linkAnhDauXeChange: "",
            linkAnhFullChange: "",
            carNumber_IDChange: "",
            CongRaChange: "",
            CongRaNameChange: "",
            phieuHaiQuanOld: "",
        }
    }
    toggleActive = i => {

        if (i === this.state.isActive) {
            this.setState({
                isActive: null
            });
        } else {
            this.setState({
                isActive: i
            });
        }
    };
    componentDidMount() {
        this.start()
        this.list()
    }
    async listInNext() {
        await this.setState({
            isLoading: true
        })
        try {
            if (this.state.nextPage == null) {
                this.setState({ nextPage: this.state.totalPage })
            }
            const res = await requestGetListCar({
                FROMDATE: this.state.fromDate,
                TODATE: this.state.toDate,
                PLATENUMBER: this.state.plateNumber,
                PORTIN: this.state.portIn,
                PORTOUT: this.state.PortOut,
                NUMBERCAR: this.state.numberCar,
                LOAIHANG: this.state.loaiHang,
                PAGE: this.state.nextPage,
                CONG: this.state.SelectCong,
                LOAIXE: this.state.loaiXe,
                LIMIT: this.state.limitPage,
                ORDERNUMBER: this.state.orderNumber,
                BIENCONT: this.state.bienCont,
                BIENMOOC: this.state.bienMooc,
            })

            await this.setState({EventIdXuLy: "", data: res.data, isLoading: false, page: res.data.currentPage, nextPage: res.data.nextPage, previousPage: res.data.previousPage, isActive: null });
            console.log(this.state.nextPage, "nextPage");
            console.log(this.state.previousPage, "previousPage");

        } catch (err) {
            await this.setState({
                isLoading: false
            }, () => console.log(err))
        }
    }
    async start() {
        try {
            const res3 = await requestGetListCar({
                FROMDATE: this.state.fromDate,
                TODATE: this.state.toDate,
                PLATENUMBER: this.state.plateNumber,
                PORTIN: '0',
                PORTOUT: null,
                NUMBERCAR: this.state.numberCar,
                LOAIHANG: this.state.loaiHang,
                PAGE: this.state.page,
                CONG: '/listCar/listCarParking?',
                LOAIXE: this.state.loaiXe,
                LIMIT: this.state.limitPage,
                ORDERNUMBER: this.state.orderNumber,
                BIENCONT: this.state.bienCont,
                BIENMOOC: this.state.bienMooc,
            })
            await this.setState({ countXeVN: res3.data.total })

            const res4 = await requestGetListCar({
                FROMDATE: this.state.fromDate,
                TODATE: this.state.toDate,
                PLATENUMBER: this.state.plateNumber,
                PORTIN: '1',
                PORTOUT: '3',
                NUMBERCAR: this.state.numberCar,
                LOAIHANG: this.state.loaiHang,
                PAGE: this.state.page,
                CONG: '/listCar/listCarParking?',
                LOAIXE: this.state.loaiXe,
                LIMIT: this.state.limitPage,
                ORDERNUMBER: this.state.orderNumber,
                BIENCONT: this.state.bienCont,
                BIENMOOC: this.state.bienMooc,
            })
            await this.setState({ countXeCN: res4.data.total })

            const res5 = await requestGetListCar({
                FROMDATE: this.state.fromDate,
                TODATE: this.state.toDate,
                PLATENUMBER: this.state.plateNumber,
                PORTIN: '',
                PORTOUT: '',
                NUMBERCAR: this.state.numberCar,
                LOAIHANG: this.state.loaiHang,
                PAGE: this.state.page,
                CONG: '/listCar/listCarParking?',
                LOAIXE: this.state.loaiXe,
                LIMIT: this.state.limitPage,
                ORDERNUMBER: this.state.orderNumber,
                BIENCONT: this.state.bienCont,
                BIENMOOC: this.state.bienMooc,
            })
            await this.setState({ countXeAll: res5.data.total })
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
            if (this.state.previousPage == null) {
                this.setState({ previousPage: 1 })
            }
            const res = await requestGetListCar({
                FROMDATE: this.state.fromDate,
                TODATE: this.state.toDate,
                PLATENUMBER: this.state.plateNumber,
                PORTIN: this.state.portIn,
                PORTOUT: this.state.PortOut,
                NUMBERCAR: this.state.numberCar,
                LOAIHANG: this.state.loaiHang,
                PAGE: this.state.previousPage,
                CONG: this.state.SelectCong,
                LOAIXE: this.state.loaiXe,
                LIMIT: this.state.limitPage,
                ORDERNUMBER: this.state.orderNumber,
                BIENCONT: this.state.bienCont,
                BIENMOOC: this.state.bienMooc,
            })
            await this.setState({EventIdXuLy: "", isActive: null, data: res.data, isLoading: false, page: res.data.currentPage, previousPage: res.data.previousPage, nextPage: res.data.nextPage });
            console.log(this.state.nextPage, "nextPage");
            console.log(this.state.previousPage, "previousPage");
        } catch (err) {
            await this.setState({
                isLoading: false
            }, () => console.log(err))
        }
    }
    async listToCurrent() {
        await this.setState({
            isLoading: true
        })
        try {
            console.log(this.state.nextPage, "nextPage");
            console.log(this.state.previousPage, "previousPage");
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
                BIENCONT: this.state.bienCont,
                BIENMOOC: this.state.bienMooc,
            })
            await this.setState({EventIdXuLy: "", isActive: null, data: res.data, isLoading: false, previousPage: res.data.previousPage, nextPage: res.data.nextPage });
            console.log(this.state.nextPage, "nextPage");
            console.log(this.state.previousPage, "previousPage");
        } catch (err) {
            await this.setState({
                isLoading: false
            }, () => console.log(err))
        }
    }



    async listTo() {
        await this.setState({
            isLoading: true
        })
        try {
            console.log(this.state.nextPage, "nextPage");
            console.log(this.state.previousPage, "previousPage");
            const res = await requestGetListCar({
                FROMDATE: this.state.fromDate,
                TODATE: this.state.toDate,
                PLATENUMBER: this.state.plateNumber,
                PORTIN: this.state.portIn,
                PORTOUT: this.state.PortOut,
                NUMBERCAR: this.state.numberCar,
                LOAIHANG: this.state.loaiHang,
                PAGE: this.state.totalPage,
                CONG: this.state.SelectCong,
                LOAIXE: this.state.loaiXe,
                LIMIT: this.state.limitPage,
                ORDERNUMBER: this.state.orderNumber,
                BIENCONT: this.state.bienCont,
                BIENMOOC: this.state.bienMooc,
            })
            await this.setState({EventIdXuLy: "", isActive: null, data: res.data, isLoading: false, page: this.state.totalPage, previousPage: res.data.previousPage, nextPage: res.data.nextPage });
            console.log(this.state.nextPage, "nextPage");
            console.log(this.state.previousPage, "previousPage");
        } catch (err) {
            await this.setState({
                isLoading: false
            }, () => console.log(err))
        }
    }

    ///////////Parking chi search dc theo loai hang va bien xe, ko tra ve loaiXeid
    // =>>>>>>>>>>>> In
    async Select(bienxeSearch, loaihangSearch, matheSearch, sothutuSearch) {
        try {
            console.log(bienxeSearch, loaihangSearch, matheSearch, sothutuSearch)
            const res = await requestGetListCar({
                FROMDATE: this.state.fromDate,
                TODATE: this.state.toDate,
                PLATENUMBER: bienxeSearch,
                PORTIN: this.state.portIn,
                PORTOUT: this.state.PortOut,
                NUMBERCAR: this.state.numberCar,
                LOAIHANG: loaihangSearch,
                PAGE: 1,
                CONG: this.state.SelectCong,
                LOAIXE: this.state.loaiXe,
                ORDERNUMBER: sothutuSearch,
                BIENCONT: this.state.bienCont,
                BIENMOOC: this.state.bienMooc,
                LIMIT: 1
            })
            await this.setState({
                EventIdXuLy: res.data.data[0].EventIn_ID, phieuHaiQuanOld: res.data.data[0].PhieuHaiQuan,
                bienXeChange: res.data.data[0].BienXeVao, bienContChange: res.data.data[0].BienCont, bienMocChange: res.data.data[0].BienMooc, loaiHangChange: res.data.data[0].LoaihangChiTiet,
                loaiXeChange: res.data.data[0].Name, loaiXeIDchange: "", linkAnhBienSoChange: res.data.data[0].LinkAnhBienSo,
                linkAnhDauXeChange: res.data.data[0].LinkAnhDauXe, linkAnhFullChange: res.data.data[0].LinkAnhFull, IsDongYXeRa: (res.data.data[0].IsDongYXeRa ? 1 : 0).toString(), IsXeKhongHang: (res.data.data[0].IsXeKhongHang ? 1 : 0).toString(),
                IsXeQuayDau: "", carNumber_IDChange: (res.data.data[0].CarNumber_ID).toString()

            });
            console.log(res.data)
        } catch (err) {
            await this.setState({
                isLoading: true
            }, () => console.log(err))
        }
        console.log(this.state.data, "Check data!");
    }


    async RequestThemPhieuHaiQuan() {
        try {
            const res = await resquestThemPhieuHaiQuan({
                EVENTID: this.state.EventIdXuLy,
                PHIEUHAIQUAN: this.state.PhieuHaiQuan
            })
            await this.setState({ msgOut: res.msg });
            if (this.state.msgOut == "Thành công") {
                alert("Thêm phiếu hải quan thành công!")
                this.setState({ PhieuHaiQuan: "", EventIdXuLy: ""});
                this.listToCurrent();
            } else {
                alert("Thêm phiếu hải quan thất bại!")
                this.listToCurrent();
            }
        } catch (err) {
            alert("Vui lòng chọn xe!")
            this.listToCurrent();
        }
    }

    async RequestKiemHoa() {
        try {
            const res = await resquestExportKiemhoa({
                EVENTID: this.state.EventIdXuLy,
            })
            await this.setState({ msgOut: res.msg });
            if (this.state.msgOut == "Thành công") {
                alert("Kiểm hóa thành công!")
                this.setState({ PhieuHaiQuan: "", EventIdXuLy: ""});
                this.listToCurrent();
            } else {
                alert("Kiểm hóa thất bại!")
                this.listToCurrent();
            }
        } catch (err) {
            alert("Vui lòng chọn xe!")
            this.listToCurrent();
        }
    }

    async Cancel() {
        this.setState({ EventIdXuLy: "", bienXeChange: "", bienContChange: "", bienMocChange: "", fromDataChange: "", loaiHangChange: "", TongTienChange: "", loaiXeChange: "" });
    }

    async RequestGetCarOut() {
        try {
            const res = await requestChoXeRa({
                BIENSOXE: this.state.bienXeChange,
                BIENCONT: this.state.bienContChange,
                BIENMOC: this.state.bienMocChange,
                LOAIHANG: this.state.loaiHangChange,
                LOAIXECHITIET: this.state.loaiXeChange,
                LOAIXE: this.state.loaiXeIDchange,
                CONGRA: this.state.CongRaChange,
                CONGRANAME: this.state.CongRaNameChange,
                LINKANHBIENSO: this.state.linkAnhBienSoChange,
                LINKANHDAUXE: this.state.linkAnhDauXeChange,
                LINKANHFULL: this.state.linkAnhFullChange,
                ISDONGYXERA: this.state.IsDongYXeRa,
                ISXEKHONGHANG: this.state.IsXeKhongHang,
                ISXEQUAYDAU: this.state.IsXeQuayDau,
                CARNUMBER_ID: this.state.carNumber_IDChange,
                EVENTID: this.state.EventIDChange
            })
            await this.setState({ msgOut: res.msg });
            if (this.state.msgOut == "Thành công") {
                alert("Cho xe ra thành công!")    
                this.Cancel();
                this.listToCurrent();
                this.setState({ fromDataChange: "", bienXeChange: "", bienContChange: "", bienMocChange: "", loaiHangChange: "", TongTienChange: "", loaiXeChange: "" });
            } else {
                alert("Thất bại!")
                this.listToCurrent();
            }
        } catch (err) {
            alert("Vui lòng chọn xe!")
            this.listToCurrent();
        }
    }


    async list() {
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
                BIENCONT: this.state.bienCont,
                BIENMOOC: this.state.bienMooc,

            })
            await this.setState({EventIdXuLy: "", data: res.data, total: res.data.total, previousPage: res.data.previousPage, nextPage: res.data.nextPage });
            this.setState({ totalPage: Math.ceil(this.state.total / this.state.limitPage) })
            if ((this.state.SelectCong == "/listCar/listCarIn?" && (this.state.PortOut == "2" || this.state.PortOut == "4")) || (this.state.SelectCong == "/listCar/listCarOut?" && (this.state.portIn == "0" || (this.state.portIn == "1" && this.state.PortOut == null)))) {
                alert("Wrong choose!")
                window.location.href = '/home'
            }
            if ((this.state.SelectCong == "/listCar/listCarParking?" && this.state.namePort == "3")) {
                alert("Cổng quay đầu ko xem được danh sách xe tồn, vui lòng chọn đúng cổng!")
                window.location.href = '/home'
            }

            const res2 = await requestGetListLoaiXe({
                FROMDATE: this.state.fromDate,
                TODATE: this.state.toDate,
                PLATENUMBER: this.state.plateNumber,
                PORTOUT: this.state.PortOut,
                PORTIN: this.state.portIn,
                NUMBERCAR: this.state.numberCar,
                LOAIHANG: this.state.loaiHang,
                LOAIXE: this.state.loaiXe,
                THONGKELOAIXE: this.state.thongKeLoaiXe,
                BIENCONT: this.state.bienCont,
                BIENMOOC: this.state.bienMooc,
            })
            await this.setState({ codeThongKeXe: res2.data, dataThongKeXe: res2.data, isLoading: false, countIn: res2.data.countIn, countOut: res2.data.countOut, totalMoney: res2.data.totalMoney })
            this.setState({ countTon: this.state.countIn - this.state.countOut })
            if (this.state.SelectCong == "/listCar/listCarParking?") {
                this.setState({ countTon: this.state.total })
            }
            // else if (this.state.countTon < 0){
            //     this.setState({countTon: "unk.."})
            // }
            console.log(this.state.nextPage, "nextPage");
            console.log(this.state.previousPage, "previousPage");
            if (this.state.countTon < 0) {
                this.setState({ countTon: 0 })
            }
        } catch (err) {
            await this.setState({
                isLoading: false
            }, () => console.log(err))
        }
    }


    handleTextChange(field, event) {
        this.setState({
            [field]: event.target.value
        })
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
    }

    render() {

        const { data, isLoading } = this.state;
        const token = Cookie.get("SESSION_ID");
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
                <section className="content"  >
                    <div className="container-fluid">
                        <div className="card card-warning">
                            <div className="card-header">
                                <h3 className="card-title"><i>Danh sách xe trong bãi</i></h3>
                            </div>

                            <div className="card-body">
                                <div className="row">
                                    <div className="" style={{ float: 'left', width: '75%' }}>
                                        <table style={{ width: '100%' }}>
                                            <tr>
                                                <td><b>Loại hàng</b><input type="text" className="form-control" placeholder="Nhập loại hàng" value={this.state.loaiHang} onChange={(e) => this.handleTextChange('loaiHang', e)} /></td>
                                                <td><b>Biển số xe</b><input type="text" className="form-control" placeholder="Nhập biển số xe" value={this.state.plateNumber} onChange={(e) => this.handleTextChange('plateNumber', e)} /></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td><b>Cổng</b>
                                                    <select value={this.state.namePort} onChange={(e) => this.handlePortChange('namePort', e)}>
                                                        <option value disabled hidden>Chọn</option>
                                                        <option selected value='1'>Tất cả</option>
                                                        <option value='2'>Cổng vào VN</option>
                                                        <option value='5'>Cổng vao ra CN</option>
                                                    </select></td>
                                                <td><b>Mã Thẻ</b><input type="text" className="form-control" placeholder="Nhập mã thẻ" value={this.state.numberCar} onChange={(e) => this.handleTextChange('numberCar', e)} /></td>
                                                <td style={{ textAlign: 'center' }}><button className="btn btn-primary" onClick={() => this.list()} style={{ height: '40px', width: '250px' }}><h6><b>Tìm</b></h6></button></td>
                                            </tr>

                                        </table><br />


                                        <br />

                                        <form style={{}}>
                                            <table style={{ textAlign: 'center', width: '800px', height: '50px', borderStyle: 'outset' }}>
                                                <tr>
                                                    <td>Tổng số xe trong bãi</td>
                                                    <td style={{ backgroundColor: 'yellow', width: '150px' }}>{this.state.countXeAll}</td>
                                                    <td>Tổng số xe cổng VN</td>
                                                    <td style={{ backgroundColor: 'yellow', width: '150px' }}>{this.state.countXeVN}</td>
                                                    <td>Tổng số xe cổng TQ</td>
                                                    <td style={{ backgroundColor: 'yellow', width: '150px' }}>{this.state.countXeCN}</td>
                                                </tr>
                                            </table>
                                        </form>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="ui grid middle aligned" id="bang" style={{ overflow: 'auto', float: 'left', width: '80%', height: '800px' }}>
                            <div className="card-header" >
                                <div style={{ float: "right", width: "150px" }}>
                                    <b>Số trang </b>
                                    <select value={this.state.limitPage} onChange={(e) => this.handleTextChange('limitPage', e) || this.setState({ page: 1 }) || this.list()}>
                                        <option selected disabled hidden>Chọn</option>
                                        <option value='10'>10</option>
                                        <option value='20'>20</option>
                                        <option value='35'>35</option>
                                        <option value='50'>50</option>
                                    </select>
                                </div>
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
                                    <svg onClick={() => this.listTo()} width="1.7em" height="1.7em" viewBox="0 0 16 16" className="bi bi-skip-end-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M12 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z" />
                                        <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                                    </svg>

                                </h3>
                            </div>
                            <table id="example2" className="table table-bordered table-hover">
                                <>
                                    <thead>
                                        <tr style={{ textAlign: 'center' }}>
                                            <th>EventIn_ID </th>
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
                                    <tbody >
                                        {this.state.data && data.data.map((item, i) => (    
                                            <tr style={
                                                this.state.isActive === i
                                                    ? { background: '#BEC6C1', textAlign: 'center' }
                                                    : { background: '', textAlign: 'center' }
                                            }
                                                key={i}
                                                onClick={() => this.toggleActive(i) || this.Select(item.BienXeVao, item.LoaihangChiTiet, item.MaSoTrenThe, item.SoThuTuTrongNgay)}>
                                                <td>{item.EventIn_ID} </td>
                                                <td>{item.SoThuTuTrongNgay} </td>
                                                <td> {item.MaSoTrenThe || "Chưa có"}</td>
                                                <td> {GetFormatDate(item.NgayGioVao) || "Chưa có"} </td>
                                                <td> {item.BienXe || item.BienXeVao + " / " + (item.BienXeRa || "")}</td>
                                                <td> {(item.IsDongYXeRa).toString()}</td>
                                                <td> {(item.IsXeXuatThang).toString() }</td>
                                                <td> {item.BienCont} </td>
                                                <td> {item.BienMooc}</td>
                                                <td> {item.LoaiHangChiTiet || item.LoaihangChiTiet}</td>
                                                <td> {item.Name || item.LoaiXeChiTiet}</td>
                                                <td>{item.PhieuHaiQuan}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot></tfoot>
                                </>
                            </table>
                            {this.state.total == 0 && <img src={empty} style={{ width: '1500px', height: '800px' }} />}
                        </div>
                    </div>
                    <div style={{ width: '20%', height: '20%', float: 'right'}}>
                        <div className="card card-warning">
                            <div className="card-header">
                                <h3 className="card-title"></h3>
                                <b>Thông tin xe EventID: {this.state.EventIdXuLy || 'none'}</b>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="">
                                        <img src={a} id="img_xetrongbai" />
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="">
                                        <img src={b} id="img_xetrongbai" />
                                    </div>
                                    <div className="card-body">
                                        <div className="col-4"><br />
                                            <table style={{ width: '280px' }}>
                                                <tr>
                                                    <td style={{borderBottom: 'white solid 20px' }} colSpan='2'><button onClick={() => this.RequestKiemHoa()} className="btn btn-danger" style={{ height: '50px', width: '110px', marginRight: '55px'}}><h9>Kiểm hóa</h9></button>
                                                    <button onClick={() => this.RequestGetCarOut()} className="btn btn-success" style={{ height: '50px', width: '110px' }}><h9>Cho ra</h9></button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{ borderBottom: 'white solid 10px' }} colSpan='2'><b>Phiếu hải quan</b>
                                                        <input style={{ width: '' }} type="text" className="form-control" placeholder="" value={this.state.PhieuHaiQuan} onChange={(e) => this.handleTextChange('PhieuHaiQuan', e)} /><b>cũ: </b> {this.state.phieuHaiQuanOld || 'none'} </td>
                                                </tr>
                                                <tr>
                                                    <td> </td>
                                                    <td style={{ textAlign: 'center' }}><button onClick={() => this.RequestThemPhieuHaiQuan()} className="btn btn-primary" style={{ width: '230px' }}><b>"Thêm phiếu hải quan"</b></button></td>
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