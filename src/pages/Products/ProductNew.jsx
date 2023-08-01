import React, { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { Link } from "react-router-dom";

import { BrandService } from "../../services/brand.service";
import { ProductTypeService } from "../../services/producttype.service"
import './product.css'
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseURL } from "../../data/baseURL";
import 'react-toastify/dist/ReactToastify.css';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { ToastContainer, toast } from 'react-toastify';
//import VariantForm from "./VariantForm";

const ProductNew = () => {
  const navigate = useNavigate();

  const [brand, setBrandData] = useState('');
  const [producttype, setProductTypeData] = useState('');

  const [listBrandData, setListBrandData] = useState([]);
  const [listProductType, setListProductType] = useState([]);

  const [selectedBrand, setSelectedBrand] = useState('')
  const [selectedProductType, setSelectedProductType] = useState('')

  const [imageUpload, setImageUpload] = useState();
  const [linkImage, setLinkImage] = useState('')

  const { id } = useParams();
  const [data, setData] = useState({});

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);


  //Toast Message
  //Info_Message
  const showToastMessage = (message) => {
    toast.success(`${message}`, {
      position: toast.POSITION.TOP_RIGHT
    });
  };

  const showToastMessage1 = (message) => {
    toast.error(`${message}`, {
      position: toast.POSITION.TOP_RIGHT
    });
  };
  const image = (data) => {
    return (
      <img src={data.topProduct.image[0]} alt="" style={{width: 50, height: 50}}/>
    )
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();


  const addProduct = async (dataForm) => {
    if (imageUpload === undefined ) 
    {
      showToastMessage1('Vui lòng nhập đầy đủ các trường')
    }
    else {
      let image = []
      const { name, price, discount, discountPrice, expiryDate, descriptionSummary, quantity } = dataForm;
      var dataUpload = new FormData();
      dataUpload.append('file', imageUpload);
      axios.post(`${baseURL}/api/v1/upload/image`, dataUpload, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
        .then((res) => {
          var dataJson = JSON.stringify({
            "name": name,
            "brand": selectedBrand,
            "price": parseInt(price),
            "status": true,
            "discount": parseInt(discount),
            "discountPrice": parseInt(discountPrice),
            "expiryDate": parseInt(expiryDate),
            "productType": selectedProductType,
            "descriptionSummary": "descriptionSummary",
            "descriptionDetail": [
              {
                "name": "Thông số kỹ thuật",
                "description": "100"
              }
            ],
            "image": [
              res.data.result.webContentLink
            ],
            "quantity": parseInt(quantity)
          });
          // console.log('jdsjdhsjdjshjdfjdjf', selectedBrand, selectedProductType)
          console.log('========================================', res.data.result.webContentLink)
          var config = {
            headers: {
              'Content-Type': 'application/json'
            },
  
          };
          axios.post(`${baseURL}/api/v1/product`, dataJson, config)
            .then((res) => {
  
              showToastMessage('Tạo mới thành công')
            })
            .catch((err) => {
              showToastMessage1('Vui lòng nhập đầy đủ các trường')
            })
  
        })
        .catch((err) => showToastMessage1('Hãy thêm ảnh cho sản phẩm'))
    }
    


  };

  //get All Brand
  useEffect(() => {
    allBrand()
  }, [])
  const allBrand = () => {
    axios.get(`${baseURL}/api/v1/brand`)
      .then((res) => setListBrandData(res.data.results.data))
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    allProductType()
  }, [])
  const allProductType = () => {
    axios.get(`${baseURL}/api/v1/productType`)
      .then((res) => setListProductType(res.data.results.data))
      .catch((err) => console.log(err))
  }


  // useEffect(() => {
  //   fetchData();
  // }, []);
  // const fetchData = async () => {
  //   ProductTypeService.getAllProductType().then((response) => {
  //     console.log(response);
  //     setProductTypeData(response.data.results);

  //     BrandService.getAllBrand().then((response) => {
  //       //console.log(response.results.data);
  //       setBrandData(response.results.data);
  //     });
  //   });
  // };

  useEffect(() => {
    const fetchData = async () => {
      console.log(id);
      ProductTypeService.getAllProductType().then((response) => {
        console.log(response);
        setProductTypeData(response.results.data);

        BrandService.getAllBrand().then((response) => {
          console.log(response.results.data);
          setBrandData(response.results.data);
        });
      });
    };
    fetchData();
  }, []);


  return (

    <div className="new__product">
      <div className="info__product">
        <div className="info__product-list">
          <p>THÊM SẢN PHẨM MỚI</p>
          <div className="info_product-item">
            <label> Tên sản phẩm: </label>
            <input
              type='text'
              placeholder='Nhập tên sản phẩm...'
              {...register("name")}
            />
          <ToastContainer/>
          </div>
          <ToastContainer />
          <div className="info_product-item">
            <label> Thương hiệu: </label>
            <FormControl style={{ width: 700, marginLeft: 20 }}>
              <InputLabel id="demo-simple-select-label"></InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Type payment"
                value={selectedBrand}
                onChange={(e) =>
                  setSelectedBrand(e.target.value)
                  //alert(e.target.value)
                }
              >
                {
                  listBrandData.map((value) => {
                    return (<MenuItem value={value.uid}> {value.name} </MenuItem>)
                  })
                }
              </Select>
            </FormControl>


          </div>

          <div className="info_product-item">
            <label> Loại: </label>
            <FormControl style={{ width: 700, marginLeft: 20 }}>
              <InputLabel id="demo-simple-select-label"></InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Type payment"
                value={selectedProductType}
                onChange={(e) =>
                  setSelectedProductType(e.target.value)
                  //alert(e.target.value)
                }
              >
                {
                  listProductType.map((value) => {
                    return (<MenuItem value={value.uid}> {value.name} </MenuItem>)
                  })
                }

              </Select>
            </FormControl>

          </div>
          <div className="info_product-item">
            <label> Giá </label>
            <input
              type='text'
              placeholder='Nhập giá...'
              {...register("price")}
            />

          </div>
          <div className="info_product-item">
            <label> % giảm giá </label>
            <input
              type='text'
              placeholder='Phần trăm giảm giá...'
              {...register("discount")}
            />

          </div>
          <div className="info_product-item">
            <label> Giá sau giảm </label>
            <input
              type='text'
              placeholder='Nhập giá sau giảm...'
              {...register("discountPrice")}
            />
          </div>
          <div className="info_product-item">
            <label> Số lượng </label>
            <input
              type='text'
              placeholder='Nhập số lượng...'
              {...register("quantity")}
            />
          </div>
          <div className="info_product-item">
            <label> Bảo hành </label>
            <input
              type='text'
              placeholder='Bảo hành...'
              {...register("expiryDate")}
            />
          </div>
        </div>

        <div className="product__image">
          {imageUpload ? (
            <img src={URL.createObjectURL(imageUpload)} alt={"avatar"} className="product__image-detail" />
          ) : (
            <img
              src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDwJQW171kvV8Cwfmj9OR3h0n8yKSHMk7Q_w&usqp=CAU'
              alt=""
              className="product__image-detail"
            />
          )}
          <div className='upload__button'>
            <AddPhotoAlternateIcon />
            <input
              className='input__file'
              type="file"
              multiple
              id="upload"
              //ref={upLoadRef}
              onChange={(e) => setImageUpload(e.target.files[0])}
            />
          </div>
        </div>
      </div>

      <div className="product__button">
        <button
          onClick={handleSubmit(addProduct)}
          style={{ marginRight: 20 }}
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 py-3 px-6 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Lưu
        </button>
        <Link
          to="/products"
           style={{ marginRight: 20 }}
          className="inline-flex justify-center rounded-md border border-transparent bg-red-500 py-3 px-8 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Hủy
        </Link>
      </div>
    </div>

  );
};

export default ProductNew;
