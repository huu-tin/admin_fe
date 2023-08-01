import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import './customer.css'
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseURL } from "../../data/baseURL";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { ToastContainer, toast } from 'react-toastify';

const CustomerEdit = () => {
  const navigate = useNavigate();
  const [linkAvatar, setLinkAvatar] = useState('')

  const { id } = useParams();
  const [data, setData] = useState({});

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const convertDate = (dateString) => {
    let date_string = dateString; // Apr 03 2020
    let parts_of_date = date_string.split("/");

    let output = new Date(+parts_of_date[2], parts_of_date[1] - 1, +parts_of_date[0]);


    var day = output.getDate()
    var month = output.getMonth() + 1
    var year = output.getFullYear(),


        month = (month < 10 ? "0" : "") + month;
    day = (day < 10 ? "0" : "") + day;


    var today = year + "-" + month + "-" + day
    return today;
}

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


  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {


    axios.get(`${baseURL}/api/v1/customer/${id}`)
      .then((res) => {
        setValue("username", res.data.results.username);
        setValue("name", res.data.results.name);
        setValue("email", res.data.results.email);
        setValue("phone", res.data.results.phone);
        setValue("sex", 'Nam')
        setLinkAvatar(res.data.results.avatar)
        const dateString = convertDate(res.data.results.dateOfBirth)
        setValue("dateOfBirth", dateString)
        console.log('==============', dateString)
      })
      .catch((err) => console.log("Error info: ", err))
  }, [])
  return (
    <div className="new__product">
      <div className="info__product">
        <div className="info__product-list">
          <p>THÔNG TIN NGƯỜI DÙNG</p>
          <div className="info_product-item">
            <label> Tên tài khoản </label>
            <input
              type='text'
              readOnly
              {...register("username", { required: true })}
            />

          </div>

          <div className="info_product-item">
            <label> Tên người dùng </label>
            <input
              type='text'
              readOnly
              {...register("name", { required: true })}
            />

          </div>
          <div className="info_product-item">
            <label> Giới tính </label>
            <input
              type='text'
              readOnly
              {...register("sex", { required: true })}
            />

          </div>
          <div className="info_product-item">
            <label> Ngày sinh </label>
            <input
              type='date'
              readOnly
              {...register("dateOfBirth", { required: true })}
            />

          </div>


          <div className="info_product-item">
            <label> Số điện thoại </label>
            <input
              type='text'
              readOnly
              {...register("phone", { required: true })}
            />
          </div>
          <div className="info_product-item">
            <label> Email </label>
            <input
              type='text'
              readOnly
              {...register("email", { required: true })}
            />
          </div>
        </div>

        <div className="product__image">

          <img
            src={linkAvatar !== '' ? linkAvatar : 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'}
            alt=""
            className="product__image-detail"
          />

          {/* <div className='upload__button'>
          <AddPhotoAlternateIcon />
          <input
            className='input__file'
            type="file"
            multiple
            id="upload"
            //ref={upLoadRef}
           // onChange={(e) => setImageUpload(e.target.files[0])}
          />
        </div> */}
        </div>
      </div>

      <div className="product__button">
        <Link
          to="/customers"
          style={{ marginRight: 20 }}
          className="inline-flex justify-center rounded-md border border-transparent bg-red-500 py-3 px-8 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Quay lại
        </Link>
      </div>
    </div>

  );
};

export default CustomerEdit;
