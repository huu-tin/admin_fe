import React, { useState, useEffect } from "react";
import axios from 'axios'
import ModalAdd from "./ModalAdd";
import { InputLabel, MenuItem, Select, FormControl, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { baseURL } from "../../data/baseURL";
import { Link, useNavigate } from "react-router-dom";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
  Inject,
} from "@syncfusion/ej2-react-grids";

import { productData, producttypeData } from "../../data/dummy";
import { Header } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import { ProductService } from "../../services/product.service";

const Products = () => {
  document.title = "Quản lý Sản Phẩm";
  const navigate = useNavigate();
  const { currentColor } = useStateContext();
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);
  
  const [filterMode, setFilterMode] = useState(false);
  const [filterBrand, setFilterBrand] = useState('')
  const [filterProductType, setFilterProductType] = useState('')
  const [filterProductData, setFilterProductData] = useState([])

  const [openNotify, setOpenNotify] = React.useState(false);
  const [productIdDelete, setProductIdDelete] = useState()
  
  // useEffect(() => {
  //   fetchData();
  // }, []);
  // const fetchData = async () => {
  //   await ProductService.getAllProduct().then((response) => {
  //     // setData();
  //     console.log("t", response);
  //   });
  // };
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJMb25nIEx1b25nIEx1b25nIiwidWlkIjoiMDFHSFRNN0NGMks3UzlaNVM5NVlIUlA2SFAiLCJpYXQiOjE2Njg2ODgyMjYyNTYsImV4cCI6MTY2ODk0NzQyNjI1Nn0.2zz4BRcFMdB2uA5LQHy0g-CdzQTLLOa6v88ZmxEyUmw");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`http://localhost:3000/api/v1/product?limit=${100}`, requestOptions)
      .then(response => response.text())
      .then(result => {

        const t = JSON.parse(result)
        
        setData(t.results.data);
        setFilterProductData(t.results.data);
        console.log('===================', t.results.data)
      })
      .catch(error => console.log('error', error));
  }, [])

  //Filter Product
  useEffect(() => {
    axios.get(`${baseURL}/api/v1/product?productType=${filterProductType}&brand=${filterBrand}&limit=${100}`)
      .then((res) => {
        console.log('dksjkdjskdjksjdksjkds',res.data.results.data)
        setFilterProductData(res.data.results.data)
    
   })
      .catch((err) => console.log(err))

     //setFilterProductData()
   },  [filterMode])

  const deleteOnClick = async (id) => {
    await ProductService.deleteProduct(id).then(
      (response) => {
        window.location.reload();
      },
      (error) => {
        alert("Đã xảy ra lỗi!!!");
      }
    );
  };
  const image = (props) => {
    return (
      <img src={props.image[0]} alt="" style={{width: 50, height: 50}}/>
    )
  }
  const editProductGrid = (props) => {
    sessionStorage.setItem('productID', props.uid)
    return (
      <div className="flex justify-start items-center gap-2">
        <Link
          style={{ background: "#00d084" }}
          className="text-white font-bold py-2 px-6 capitalize rounded-full text-sm hover:drop-shadow-lg"
          to={`edit/${props.uid}`}
        >
          Sửa
        </Link>
        
        <button
          type="button"
          style={{ background: "#FF3333" }}
          className="text-white font-bold py-2 px-6 capitalize rounded-full text-sm hover:drop-shadow-lg"
          onClick={() => {
            setOpenNotify(true)
            setProductIdDelete(props.uid)
          }}
        >
          Xóa
        </button>

      </div>
      
    );
  };
  const productGrid = [
    { type: "checkbox", width: "50" },
    {
      headerText: "Sản phẩm",
      field: "image",
      template: image,
      textAlign: "Center",
      width: "100",
      
    },
    {
      headerText: "Mã sản phẩm",
      field: "code",
      textAlign: "Center",
      width: "120",
    },

    {
      field: "name",
      headerText: "Tên sản phẩm",
      textAlign: "Center",
      width: "130",
    },
    {
      field: "brand",
      headerText: "Nhãn hiệu",
      textAlign: "Center",
      width: "100",
    },
    {
      field: "productType",
      headerText: "Loại sản phẩm",
      width: "100",
      textAlign: "Center",
    },

    {
      field: "status",
      headerText: "Trạng thái",
      width: "90",
      textAlign: "Center",
    },

    {
      field: "description",
      headerText: "Hành động",
      template: editProductGrid,
      width: "120",
      textAlign: "Left",
    },
  ];

  return (
    <>
      <div id="modal-category">
      <Dialog
                open={openNotify}
                onClose={() => setOpenNotify(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                style={{ width: 1800 }}
            // TransitionComponent={Transition}
            >
                <DialogTitle >
                    {"Thông báo"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Xác nhận xóa?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button style={{backgroundColor: 'black', borderRadius: 5, color: "white", width: 100, height: 30}} onClick={() => setOpenNotify(false)}>Hủy</button>
                    <button style={{backgroundColor: 'black', borderRadius: 5, color: "white", width: 100, height: 30}} onClick={() => {
                        setOpenNotify(false)
                        deleteOnClick(productIdDelete)
                    }}>
                        Đồng ý
                    </button>
                </DialogActions>
            </Dialog>

        <ModalAdd
          open={openModal}
          onClose={() => {
            setOpenModal(false);
          }}
        />
        {openModal && (
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        )}
      </div>

      <div className=" md:m-10 p-1 md:p-10 bg-white rounded-3xl">
        <div className="flex justify-between items-center mb-6">
          <div>
          <Header title="Quản lý sản phẩm" category="Phân hệ Admin" />
          <Link
            to="/products/new"
            style={{
              backgroundColor: currentColor,
              color: "white",
            }}
            className="font-semibold hover:drop-shadow rounded-full px-6 py-3"
          >
            <span style={{textAlign: 'center'}}>Thêm Sản Phẩm</span>
          </Link>
          </div>

          <div style={{display: "flex", alignItems: "center"}}>
          <FormControl style={{width: 200, marginLeft: 150}}>
                    <InputLabel id="demo-simple-select-label"> Thương hiệu</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Type payment"
                         value={filterBrand}
                         onChange={(e) => setFilterBrand(e.target.value)}
                    >
                      <MenuItem value='Intel'>Intel</MenuItem>
                      <MenuItem value='ASUS'>ASUS</MenuItem>
                      <MenuItem value='Cooler Master'>Cooler Master</MenuItem>
                      <MenuItem value='SamSung'>SamSung</MenuItem>
                      <MenuItem value='Corsair'>Corsair</MenuItem>
                      <MenuItem value='Gigabyte'>Gigabyte</MenuItem>
                      <MenuItem value='AMD'>AMD</MenuItem>
                      <MenuItem value='NZXT'>NZXT</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl style={{width: 200}}>
                    <InputLabel id="demo-simple-select-label">Loại</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Type payment"
                         value={filterProductType}
                         onChange={(e) => setFilterProductType(e.target.value)}
                    >
                      <MenuItem value='Main'>Main</MenuItem>
                      <MenuItem value='VGA'>VGA</MenuItem>
                      <MenuItem value='CPU'>CPU</MenuItem>
                      <MenuItem value='RAM'>RAM</MenuItem>
                      <MenuItem value='Cooler/Fann'>Fan</MenuItem>
                      <MenuItem value='Case'>Case</MenuItem>

                    </Select>
                  </FormControl>
                  <Button onClick={() => setFilterMode(!filterMode)}>Lọc</Button>
                  </div>

          {/* <button
            type="button"
            style={{
              backgroundColor: currentColor,
              color: "white",
            }}
            className="font-semibold hover:drop-shadow rounded-full px-6 py-3"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            Thêm sản phẩm mới
          </button> */}
        </div>
        <div id="grid-data">
          <GridComponent
            id="gridcomp"
            dataSource={filterProductData}
            allowPaging
            allowSorting
            pageSettings={{ pageSize: 10 }}
            
          >
            <ColumnsDirective>
              {productGrid.map((item, index) => (
                <ColumnDirective key={index} {...item} />
              ))}
            </ColumnsDirective>
            <Inject
              services={[
                Resize,
                Sort,
                ContextMenu,
                Filter,
                Page,
                ExcelExport,
                Edit,
                PdfExport,
              ]}
            />
          </GridComponent>
        </div>
      </div>
    </>
  );
};
export default Products;
