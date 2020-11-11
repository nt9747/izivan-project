import React, { Component } from 'react';
import pl from '../img/placeholder.jpg'
import { requestGetListCarIn, requestLogin } from '../../api'
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
            previousPage: "",
            PortOut: "",
            SelectCong: "",
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
            })
            await this.setState({ data: res.data, isLoading: false, page: 1});
            console.log(this.state.portIn, "check PortIn")
            console.log(this.state.PortOut, "check PortOut")
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
            this.setState({portIn: '0', PortOut: 'null'})
        }
        else if (event.target.value==3){
            this.setState({portIn: 'null', PortOut: '2'})
        }
        else if (event.target.value==4){
            this.setState({portIn: 'null', PortOut: '4'})
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
        <h3 class="card-title"></h3>
    </div>

        <div class="card-body" >
          <div style={{float: 'left', width: '60%'}}>          
           <div class="row">
                <div class="col-4">
                    <b>Biển số xe</b><input type="text" class="form-control" placeholder=".col-3"/>
                </div>
                <div class="col-4">
                    <b>Mã thẻ</b><input type="text" class="form-control" placeholder=".col-4"/>
                </div>
                <div class="col-4">
                    <b>Số thứ tự</b><input type="text" class="form-control" placeholder=".col-4" />
                </div>
              </div>
            <br/>
            <div class="row">
                <div class="col-4">
                    <b>Loại hàng</b>
                          <select >
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
                <div class="col-5">
                    <b>Loại xe</b>
                    <select>
                                            <option>Tất cả</option>
                                            <option>Xe có trọng tải dưới 4 tấn</option>
                                            <option>Xe có trọng tải từ 4 đến 10 tấn</option>
                                            <option>Xe có trọng tải từ 10 đến 18 tấn</option>
                                            <option>Xe có trọng tải trên 18 tấn</option>
                                            <option>Container 20"</option>
                                            <option>Container 40"</option>    
                                  </select>
                                  </div>
                
                  <div class='col-3'>
                    <b>Cổng</b>
                          <select >
                            <option>Chọn</option>
                            <option>Tất cả</option>
                            <option>Cổng vào VN</option>
                            <option>Cổng ra quay đầu</option>
                            <option>Cổng ra xuất</option>
                            <option>Cổng vao ra CN</option>
                          </select>
                    </div>
                   </div><br/>
             <div>
                 <table style={{width: '900px', textAlign: 'right'}}>
                     <tr>
                         <td><b>Từ</b></td>
                         <td><input style={{width: '400px'}} min="2000-01-01" max="2300-12-31" type="date" class="form-control" placeholder=""/></td>
                         <td><b>Đến</b></td>
                         <td><input style={{width: '400px'}} min="2000-01-01" max="2300-12-31" type="date" class="form-control" placeholder=""/></td>
                     </tr>
                 </table>
                 
             </div>
            <div class="row">
               
                <div class="col-6"><br/>
                      <button><b>Tìm Kiếm</b></button>
                </div>
                    <div class="col-6 "><br/>
                      <button><b>Xuất Excel</b></button>
                    </div>    

          </div>
          </div>
          <div style={{float: 'right', width: '30%'}}>
                    <table>
                      <tr>
                        <td></td>
                        <td style={{textAlign: 'center'}}><b>Vào</b></td>
                        <td style={{textAlign: 'center'}}><b>Ra</b></td>
                        <td style={{textAlign: 'center'}}><b>Tồn</b></td>
                        <td style={{textAlign: 'center'}}><b>Doanh thu</b></td>
                      </tr>
                      <tr style={{borderBottom: '1px solid white'}}>
                        <td><b>Làn Trung Quốc</b></td>
                        <td><b style={{textAlign: 'center', backgroundColor: '#E79FEB', width: '50px', height: '50px', display: 'inline-block'}}>a</b></td>
                        <td><b style={{textAlign: 'center', backgroundColor: '#8CE135', width: '50px', height: '50px', display: 'inline-block'}}>b</b></td>
                        <td><b style={{textAlign: 'center', backgroundColor: '#35DFE1', width: '50px', height: '50px', display: 'inline-block'}}>c</b></td>
                        <td><b style={{textAlign: 'center', backgroundColor: '#35E17E', width: '120px', height: '50px', display: 'inline-block'}}>d</b></td>
                      </tr>
                      <tr>
                        <td><b>Làn Việt Nam</b></td>
                        <td><b style={{textAlign: 'center', backgroundColor: '#E79FEB', width: '50px', height: '50px', display: 'inline-block'}}>a</b></td>
                        <td><b style={{textAlign: 'center', backgroundColor: '#8CE135', width: '50px', height: '50px', display: 'inline-block'}}>b</b></td>
                        <td><b style={{textAlign: 'center', backgroundColor: '#35DFE1', width: '50px', height: '50px', display: 'inline-block'}}>c</b></td>
                        <td><b style={{textAlign: 'center', backgroundColor: '#35E17E', width: '120px', height: '50px', display: 'inline-block'}}>d</b></td>
                      </tr>
                    </table>
              </div>
            </div>
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
                    <th>Nhân viên vào/ Nhân viên ra</th>
                    <th>Nhân cho phép ra</th>
                    <th>Loại hàng</th>
                    <th>Cổng vào</th>
                    <th>Cổng ra</th>
                    <th>Phiếu hải quan</th>
                    <th>Code</th>
                </tr>
            </thead>
            <tbody>   
                <tr> 
                    <td>1</td>
                    <td>eqe21wq</td>
                    <td>eqeq311</td>
                    <td>213214</td>
                    <td>aaa</td>
                    <td>123</td>
                    <td>2312</td>
                    <td>132</td>
                    <td>3231</td>
                    <td>dfs</td>
                    <td>23wd</td>
                    <td>4dr</td>
                    <td>res4</td>
                    <td>er4</td>
                    <td>eq</td>
                    <td>ewqe</td>
                    <td>rêrfe</td>
                </tr>

            </tbody>

        </table>          
   </div>
</div>
</section>
</div>
        )
    }
}

export default Content