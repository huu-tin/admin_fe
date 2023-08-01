import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import "./Login.css";
import ReactDOM from "react-dom";
import { Container, Row, Col } from 'react-bootstrap'
import { EmployeeService } from "../../services/employee.service";
//import { Form, Icon, Input, Button, Checkbox, message } from "antd";
import { useForm } from 'react-hook-form'
import { Button, Dialog, Alert, AlertTitle } from '@mui/material'
import { baseURL } from "../../data/baseURL";
const Login = () => {

  document.title = "Đăng nhập";
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const FormHeader = (props) => <h2 id="headerTitle">{props.title}</h2>;

  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmitLogin = async (dataForm) => {
    var dataJson = JSON.stringify({
      "username": dataForm.username,
      "password": dataForm.password
    });
    
    var config = {
      
      headers: { 
        'Content-Type': 'application/json'
      },
    };
    console.log('ffffffffffffffffffff', dataJson)
    axios.post(`${baseURL}/api/v1/user/login`,  dataJson, config)   
    .then((res) =>  {
      localStorage.setItem(
        "token",
        JSON.stringify(res.data.results.token)
      );
      localStorage.setItem(
        "username",
        JSON.stringify(res.data.results.user)
      );
      localStorage.setItem(
        "role",
        JSON.stringify(res.data.results.user.roleId)
      );
      //Phan quyen Shipper
      if (res.data.results.user.roleId === "Shipper") {
        navigate("/shipper");
        window.location.reload();
      }
      //Phan quyen Admin
      if (res.data.results.user.roleId === "Admin") {
        navigate("/");
        window.location.reload();
      }
    })
    .catch((err) => console.log(err))
    }
  

  const handleClick = () => {
    setOpen(!open);
  }

  return (
   
      <section >
        <Container>
          <Row>
            <Col lg='6' md='6' sm='12' className='m-auto text-center'>
              <form className='form__login mb-5' id="form" onSubmit={handleSubmit(onSubmitLogin)}>
                {/* <img src={logo} alt="logo" style={{ width: 200, height: 200 }} /> */}
                <p className='welcome__title'>DOUBLET XIN CHÀO!</p>
                <div className="form__group__login">
                  <input
                    type="text"
                    placeholder="Tên đăng nhập"
                    {...register("username", {
                      required: 'Email is required',
                      // pattern: {
                      //   value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      //   message: 'Please enter a valid email',
                      // },
                    })}
                  />
                  {errors.username?.message && (
                    <p style={{ color: 'red' }}>{errors.username?.message}</p>
                  )}
                  <img />
                </div>
                <div className="form__group__login">
                  <input
                    type='password'
                    placeholder='Mật khẩu'
                    {...register("password", {
                      required: "required",
                      minLength: {
                        value: 6,
                        message: "must be 6 chars",
                      },
                    })}

                  />
                  {errors.password ? <div style={{ color: 'red' }}>{errors.password.message}</div> : null}
                </div>

                <button
                  onClick={handleSubmit(onSubmitLogin)}
                  className="login__button">
                  ĐĂNG NHẬP
                </button>
                
              </form>
              <Dialog open={open} onClose={handleClick}>
                <Alert

                //props go here
                >
                  <AlertTitle>Tài khoản</AlertTitle>
                  Đăng nhập thành công!
                </Alert>
              </Dialog>

            </Col>
          </Row>
        </Container>
      </section>
    
  )


  //
};

export default Login;
