import React, { useState, useEffect } from "react";
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

import { ordersData } from "../../data/dummy";
import { Header } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import { OrderService } from "../../services/order.service";

const Orders = () => {
  document.title = "Quản lý đơn hàng";
  const navigate = useNavigate();
  const { currentColor } = useStateContext();
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    await OrderService.getAllOrder().then((response) => {
      setData(
        response.results.data.map((data) => {
          let st = "";
          if (data.status === "approved") {
            st = "Đã xác nhận";
          } else if (data.status === "ready_to_ship") {
            st = "Đang chờ giao";
          } else if (data.status === "transporting") {
            st = "Đang giao hàng";
          } else if (data.status === "completed") {
            st = "Hoàn tất";
          } else if (data.status === "cancelled") {
            st = "Đã hủy đơn";
          } else {
            st = "Chưa xác nhận";
          }
          return { ...data, status: st };
        })
        // response.results.data

        // ...response.results.data,

        // status:
        //   response.results.data.map(data.status) === "approved"
        //     ? "Đã xác nhận"
        //     : response.results.data.map(data.status) === "ready_to_ship"
        //     ? "Đang chờ giao"
        //     : response.results.data.map(data.status) === "transporting"
        //     ? "Đang giao hàng"
        //     : response.results.data.map(data.status) === "completed"
        //     ? "Hoàn tất"
        //     : "Chưa xác nhận",
      );

      console.log(response.results.data);
    });
  };

  const editOrderGrid = (props) => {
    return (
      <div className="flex justify-center items-center gap-2">
        <Link
          style={{ background: "#00d084" }}
          className="text-white font-bold py-2 px-6 capitalize rounded-full text-sm hover:drop-shadow-lg"
          to={`edit/${props.uid}`}
        >
          Xem đơn
        </Link>

        {/* {props.status === "Chưa xác nhận" ? (
          <button
            type="button"
            style={{ background: "#FF3333" }}
            className="text-white font-bold py-2 px-6 capitalize rounded-full text-sm hover:drop-shadow-lg"
            onClick={deleteOnClick}
          >
            Hủy đơn
          </button>
        ) : null} */}
      </div>
    );
  };

  const ordersGrid = [
    { type: "checkbox", width: "50" },

    {
      headerText: "Mã đơn hàng",
      field: "orderCode",
      width: "100",
      textAlign: "Center",
    },
    {
      headerText: "Khách hàng",
      width: "120",
      textAlign: "Center",
      field: "customer",
    },
    {
      field: "date",
      headerText: "Ngày đặt",
      width: "120",
      format: "yMd",
      textAlign: "Center",
    },
    {
      headerText: "Trạng thái",
      field: "status",
      width: "100",
      textAlign: "Center",
    },
    {
      headerText: "Giá đơn",
      field: "total",
      width: "80",
      textAlign: "Center",
      
    },

    {
      field: "description",
      headerText: "Hành động",
      template: editOrderGrid,
      width: "120",
      textAlign: "Center",
    },
  ];
  return (
    <>
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
          <Header title="Quản lý đơn hàng" category="Phân hệ Admin" />
          {/* <Link
            to="/orders/new"
            style={{
              backgroundColor: currentColor,
              color: "white",
            }}
            className="font-semibold hover:drop-shadow rounded-full px-6 py-3"
          >
            <span>Thêm Đơn hàng</span>
          </Link> */}
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
              {ordersGrid.map((item, index) => (
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
export default Orders;
