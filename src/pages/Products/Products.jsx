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

import { productData } from "../../data/dummy";
import { Header } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import { ProductService } from "../../services/product.service";

const Products = () => {
  document.title = "Quản lý Sản Phẩm";
  const navigate = useNavigate();
  const { currentColor } = useStateContext();
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    await ProductService.getAllProduct().then((response) => {
      setData(response.results.data);
      console.log(response.results.data);
    });
  };

  const deleteOnClick = async (id) => {
    await ProductService.deleteProduct(id).then(
      (response) => {
        console.log(response);
        window.location.reload();
      },
      (error) => {
        alert("Đã xảy ra lỗi!!!");
      }
    );
  };
  const editProductGrid = (props) => {
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
            const messageBox = window.confirm(
              "Bạn có muốn xóa sản phẩm " + props.name + "?"
            );
            if (messageBox) {
              deleteOnClick(props.uid);
            }
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
      headerText: "ID",
      field: "uid",
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
          <Header title="Quản lý sản phẩm" category="Phân hệ Admin" />

          <Link
            to="/products/new"
            style={{
              backgroundColor: currentColor,
              color: "white",
            }}
            className="font-semibold hover:drop-shadow rounded-full px-6 py-3"
          >
            <span>Thêm Sản Phẩm</span>
          </Link>

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
            dataSource={data}
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
