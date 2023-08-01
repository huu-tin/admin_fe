import React, { useState, useEffect } from "react";
import { Selection } from "@syncfusion/ej2/buttons";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components";
import { Link } from "react-router-dom";
// import { CustomerService } from "../../services/customer.service";
// import { useDataContext } from "../../contexts/DataProvider";
// import { ComboBox } from "@syncfusion/ej2/dropdowns";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { baseURL } from "../../data/baseURL";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
const CustomerNew = () => {
  const [imageUpload, setImageUpload] = useState();
 
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()
  const onSubmit = async (dataForm) => {
    const { firstName, lastName, email, phone, username, password } = dataForm;

    var dataJson = JSON.stringify({
      "username": username,
      "password": password,
      "firstName": firstName,
      "lastName": lastName,
      "phone": phone,
      "email": email
    });

    var config = {
      headers: {
        'Content-Type': 'application/json'
      },

    };

    axios.post(`${baseURL}/api/v1/customer`, dataJson, config)
      .then((res) => {
        showToastMessage('Thêm người dùng thành công')

      })
      .catch((err) => {
        showToastMessage1('Vui lòng điền đẩy đủ các trường')
      })
  }
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

  return (
    <div className="new__product">
      <div className="info__product">
        <div className="info__product-list">
          <p>THÔNG TIN NGƯỜI DÙNG</p>
          <div className="info_product-item">
            <label> Tên tài khoản </label>
            <input
              type='text'

              {...register("username")}
            />

          </div>
          <ToastContainer />
          <div className="info_product-item">
            <label> Mật khẩu </label>
            <input
              type='password'

              {...register("password")}
            />

          </div>

          <div className="info_product-item">
            <label> Tên </label>
            <input
              type='text'

              {...register("firstName")}
            />

          </div>
          <div className="info_product-item">
            <label> Họ </label>
            <input
              type='text'

              {...register("lastName")}
            />

          </div>

          <div className="info_product-item">
            <label> Số điện thoại </label>
            <input
              type='text'

              {...register("phone")}
            />
          </div>
          <div className="info_product-item">
            <label> Email </label>
            <input
              type='text'

              {...register("email")}
            />
          </div>
        </div>

        {/* <div className="product__image">

          {imageUpload ? (
            <img src={URL.createObjectURL(imageUpload)} alt={"avatar"} className="userAvatar" />
          ) : (
            <img
              src='https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
              alt=""
              className="userAvatar"
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
        </div> */}
      </div>

      <div className="product__button">
        <button
          onClick={handleSubmit(onSubmit)}
          style={{ marginRight: 20 }}
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 py-3 px-6 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Lưu
        </button>
        <Link
          to="/customers"
          style={{ marginRight: 20 }}
          className="inline-flex justify-center rounded-md border border-transparent bg-red-500 py-3 px-8 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Quay lại
        </Link>
      </div>
    </div>
  )
};

export default CustomerNew;
