import React, { useState, useEffect } from "react";
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

import { brandsData } from "../../data/dummy";
import { Header } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import { BrandService } from "../../services/brand.service";
const Brands = () => {
  const [openNotify, setOpenNotify] = React.useState(false);
  const [brandIdDelete, setBrandIdDelete] = useState()
  document.title = "Quản lý nhãn hiệu";
  const navigate = useNavigate();
  const { currentColor } = useStateContext();
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    await BrandService.getAllBrand().then((response) => {
      setData(response.results.data);
      console.log(response.results.data);
    });
  };

  const deleteOnClick = async (id) => {
    await BrandService.deleteBrand(id).then(
      (response) => {
        console.log(response);
        window.location.reload();
      },
      (error) => {
        alert("Đã xảy ra lỗi!!!");
      }
    );
  };
  const editBrandGrid = (props) => {
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
            setBrandIdDelete(props.uid)
          }}
        >
          Xóa
        </button>
      </div>
    );
  };
  const brandsGrid = [
    { type: "checkbox", width: "50" },
    {
      field: "uid",
      headerText: "BrandID",
      textAlign: "center",
      width: "120",
    },
    {
      field: "code",
      headerText: "Mã nhãn hiệu",
      textAlign: "center",
      width: "130",
    },
    {
      field: "name",
      headerText: "Tên nhãn hiệu",
      width: "150",
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
      template: editBrandGrid,
      width: "120",
      textAlign: "Left",
    },
  ];

  return (
    <>
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
                        deleteOnClick(brandIdDelete)
                    }}>
                        Đồng ý
                    </button>
                </DialogActions>
            </Dialog>
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
          <Header title="Quản lý nhãn hiệu" category="Phân hệ Admin" />
          <Link
            to="/brands/new"
            style={{
              backgroundColor: currentColor,
              color: "white",
            }}
            className="font-semibold hover:drop-shadow rounded-full px-6 py-3"
          >
            <span>Thêm Nhãn hiệu</span>
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
              {brandsGrid.map((item, index) => (
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

export default Brands;
