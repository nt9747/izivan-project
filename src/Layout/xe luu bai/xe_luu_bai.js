import React, { Component } from 'react';
import pl from '../img/placeholder.jpg'
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
            SelectCong: "/listCar/listCarParking?",
            total: "",
            dataXe: "",
            loaiXe: "",
        }
    }   
    
    componentDidMount() {
        // this.list();
        this.start();
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
            console.log(this.state.portIn, "check PortIn")
            console.log(this.state.PortOut, "check PortOut")
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
            this.setState({portIn: '1', PortOut: null})
        }
        else if (event.target.value==1){
            this.setState({portIn: '', PortOut: null})
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
        // if (isLoading) {
        //     return (
        //         <p>Loading...</p>
        //     )
        // }
        return (
            <div class="content-wrapper">
  

  <section class="content">
<div class="container-fluid">
  <div class="card card-warning">
    <div class="card-header">
        <h3 class="card-title"><i>Báo cáo lưu xe</i></h3>
    </div>

        <div class="card-body" >
          <div style={{float: 'left', width: '70%'}}>
           <table style={{textAlign: 'left', width: '950px', height: '100px'}}>                                                                                                                                                                                                                                   
             <tr>
               <td><b>Từ ngày:</b><input type="text" name="" value={this.state.fromDate} onChange={(e) => this.handleTextChange('fromDate', e)}/></td>
               <td><b>Đến ngày:</b><input style = {{width: '240px'}}type="text" name="" value={this.state.toDate} onChange={(e) => this.handleTextChange('toDate', e)}/></td>
               <td><b>Cổng vào:</b><select style ={{width: '165px'}}onChange={(e) => this.handlePortChange(e)}>
                    <option value = ''>Chọn</option>
                    <option value = '1'>Tất cả</option>
                    <option value = '2'>Cổng vào VN</option>
                    <option value = '5'>Cổng vào CN</option>
                </select></td>
             </tr>
             <tr>
               <td><b>Biển số cont:</b><input type="text" style={{width: '160px'}}  name=""/></td>
               <td><b>Biển số mooc:</b><input type="text" style={{width: '210px'}}  name=""/></td>
               <td style={{textAlign: 'center'}}><b>Biển số xe:</b><input type="text" style={{width: '150px'}}  name="" value={this.state.plateNumber} onChange={(e) => this.handleTextChange('plateNumber', e)}/></td>
               
               <td><button style={{width: '100px', height: '50px'}} className="btn btn-danger"
                                      onClick={() => this.list()}>Tìm</button></td>
             </tr>
             <tr>
             <td><b>Loại hàng:</b>
               <select style = {{width: '180px'}} loaiHang = {this.state.loaiHang} onChange={(e) => this.handleTextChange('loaiHang', e)}>
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
               </td>
               
               <td><b>Loại xe:</b> <select value = {this.state.loaiXe} onChange={(e) => this.handleTextChange('loaiXe', e)}>{this.state.dataXe && this.state.dataXe.map((item, i) => <option value = {item.LoaiXe}>{item.Name}</option>)} 
                                                <option value = ''>Tất cả</option>  
                                        </select></td>
                                        <td></td>
             </tr>
           </table><br/>
           <div class="row">
            <div>
           <table style={{textAlign: 'center', width: '850px', height: '50px', borderStyle: 'inset'}}>
             <tr>
               <td>Tổng số xe lưu bãi</td>
               <td style={{backgroundColor: 'yellow', width: '150px'}}>230</td>
               <td>Cổng VN</td>
               <td style={{backgroundColor: 'yellow', width: '150px'}}>400</td>
               <td>Cổng TQ</td>
               <td style={{backgroundColor: 'yellow', width: '150px'}}>682</td>
             </tr>
           </table>
         </div>
         <div>
           <button class="btn btn-danger" style={{width: '100px', height: '50px'}}>Xuất Excel</button>
         </div>
       </div>
         </div>
        <div style={{float: 'right', width: '30%'}}>
            <table>
              <tr>
                <td style={{backgroundColor: 'green', width: '200px', height: '200px', borderRight: '1px solid white'}}></td>
                <td style={{backgroundColor: 'green', width: '200px', height: '200px'}}></td>
              </tr>
            </table>
        </div>
  </div>
</div>
<div style={{float: 'right'}}class="col-2"><br />
                                    <button type="submit"
                                            style={{width:'38px', color:'#C8C8C8'}}
                                           
                                            onClick={() => this.listInPrevious()}>
                                            <b style={{color:'black'}}>-</b>
                                        </button>
                                        <b>{this.state.page}</b>
                                        <button type="submit"
                                            style={{width:'38px', color:'#C8C8C8'}}
                                            
                                            onClick={() => this.listInNext()}>
                                            <b style={{color:'black'}}>+</b>
                                        </button>
                                    </div>
  <div class="ui grid middle aligned"  style={{overflow: 'auto', width: '100%', height:'600px'}}>
          <div class="card-header" >
              <h3 class="card-title" ></h3>
          </div> 
          <table  id="example2" class="table table-bordered table-hover" >                     
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
</section>
</div>
        )
    }
}

export default Content