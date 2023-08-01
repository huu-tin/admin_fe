import React, { useState, useEffect } from "react";
import { Alert, AlertTitle } from '@mui/material'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import ModalAdd from "./ModalAdd";
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

import { customersData } from "../../data/dummy";
import { Header } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import { CustomerService } from "../../services/customer.service";

const Customers = () => {
  //-----------------notify alert----------------
  const [open, setOpen] = useState(false)

  const handleClickSuccess_luuthongtin = () => {
    setOpen(!open);
  };
  const handleClickSuccess_xacnhandon = () => {
    setOpen(!open);
  }
  const handleClickError = () => {
    setOpen(!open);
  };
  const [openNotify, setOpenNotify] = React.useState(false);
  const [customerIdDelete, setCustomerIdDelete] = useState()
  //--------------------------------------------------------------
  document.title = "Quản lý khách hàng";
  const navigate = useNavigate();
  const { currentColor } = useStateContext();
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    await CustomerService.getAllCustomer().then((response) => {
      setData(response.results.data);
      sessionStorage.setItem("userInfo", JSON.stringify(res.data.results.data.uid));
      console.log(response.results.data);
    });
  };

  const deleteOnClick = async (id) => {
    await CustomerService.deleteCustomer(id).then(
      (response) => {
        console.log(response);
        window.location.reload();
      },
      (error) => {
        alert("Đã xảy ra lỗi!!!");
      }
    );
  };
  const editCustomerGrid = (props) => {
    return (
      <div className="flex justify-start items-center gap-2">
        <Link
          style={{ background: "#00d084" }}
          className="text-white font-bold py-2 px-6 capitalize rounded-full text-sm hover:drop-shadow-lg"
          to={`edit/${props.uid}`}
        >
          Xem
        </Link>
        <button
          type="button"
          style={{ background: "#FF3333" }}
          className="text-white font-bold py-2 px-6 capitalize rounded-full text-sm hover:drop-shadow-lg"
          onClick={() => {
            setOpenNotify(true)
            setCustomerIdDelete(props.uid)
          }}
        >
          Xóa
        </button>
      </div>
    );
  };
  const customersGrid = [
    { type: "checkbox", width: "50" },

    {
      headerText: "Mã khách hàng",
      field: "code",
      textAlign: "Center",
      width: "100",
    },

    {
      field: "username",
      headerText: "Tên tài khoản",
      textAlign: "Center",
      width: "130",
    },
    {
      field: "lastName",
      headerText: "Tên",
      textAlign: "Center",
      width: "100",
    },
    {
      field: "phone",
      headerText: "Số điện thoại",
      textAlign: "Center",
      width: "130",
    },
    {
      field: "status",
      headerText: "Trạng thái",
      width: "90",
      textAlign: "Center",
    },
    // {
    //   field: "Fullname",
    //   headerText: "Full Name",
    //   textAlign: "Center",
    //   width: "120",
    // },
    // {
    //   field: "Birthday",
    //   headerText: "Birthday",
    //   format: "yMd",
    //   width: "120",
    //   textAlign: "Center",
    // },
    // {
    //   field: "Sex",
    //   headerText: "Sex",
    //   textAlign: "Center",
    //   width: "60",
    // },
    // {
    //   field: "Username",
    //   headerText: "Username",
    //   textAlign: "Center",
    //   width: "120",
    // },
    // {
    //   field: "Status",
    //   headerText: "Status",
    //   width: "80",
    //   format: "yMd",
    //   textAlign: "Center",
    // },
    // {
    //   field: "Datecreate",
    //   headerText: "Date create",
    //   width: "100",
    //   format: "yMd",
    //   textAlign: "Center",
    // },
    {
      field: "description",
      headerText: "Hành động",
      template: editCustomerGrid,
      width: "120",
      textAlign: "Left",
    },
  ];

  return (
    <>
      <div>
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
                        deleteOnClick(customerIdDelete)
                    }}>
                        Đồng ý
                    </button>
                </DialogActions>
            </Dialog>
        <Dialog open={open} onClose={handleClickSuccess_xacnhandon}>
          <Alert

          //props go here
          >
            <AlertTitle>Thông tin đơn hàng</AlertTitle>
            Thực hiện thành công
          </Alert>
        </Dialog>
      </div>
      <div id="modal-category">
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
          <Header title="Quản lý khách hàng" category="Phân hệ Admin" />
          <Link
            to="/customers/new"
            style={{
              backgroundColor: currentColor,
              color: "white",
            }}
            className="font-semibold hover:drop-shadow rounded-full px-6 py-3"
          >
            <span>Thêm Khách hàng</span>
          </Link>
        </div>
        <div id="grid-data">
          <GridComponent
            id="gridcomp"
            dataSource={data}
            allowPaging
            allowSorting
            pageSettings={{ pageSize: 10 }}
          >
            <ColumnsDirective>
              {customersGrid.map((item, index) => (
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

export default Customers;
