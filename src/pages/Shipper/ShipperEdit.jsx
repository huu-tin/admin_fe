import React, { useState, useEffect } from "react";
import { Selection } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components";
import { Link } from "react-router-dom";
import { OrderService } from "../../services/order.service";
import { EmployeeService } from "../../services/employee.service";
import { useDataContext } from "../../contexts/DataProvider";
import { Modal, Button } from "react-bootstrap";

const ShipperEdit = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [shipper, setShipperData] = useState([]);

  const navigate = useNavigate();
  const { ordersData } = useDataContext();
  const [showModal, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    const fetchData = async () => {
      await OrderService.getOrderById(id).then((response) => {
        console.log(response);

        setData({
          ...response.data.results,
          status:
            response.data.results.status === "approved"
              ? "Đã xác nhận"
              : response.data.results.status === "ready_to_ship"
              ? "Đang chờ giao"
              : response.data.results.status === "transporting"
              ? "Đang giao hàng"
              : response.data.results.status === "completed"
              ? "Hoàn tất"
              : response.data.results.status === "cancelled"
              ? "Đã hủy đơn"
              : "Chưa xác nhận",
        });

        EmployeeService.getAllEmployee().then((response) => {
          setShipperData(response.results.data);
        });
      });
    };
    fetchData();
  }, [id]);
  const onSave = async () => {
    const order = {
      orderCode: document.getElementById("orderCode").value,
      customerId: document.getElementById("customerId").value,
      customerName: document.getElementById("customerName").value,
      product: [
        {
          productId: document.getElementById("productId").value,
          number: Number(document.getElementById("number").value),
          price: Number(document.getElementById("price").value),
        },
      ],
      address: {
        street: document.getElementById("street").value,
        province: document.getElementById("province").value,
        district: document.getElementById("district").value,
        ward: document.getElementById("ward").value,
        //status: true,
      },
      //transportFee: Number(document.getElementById("transportFee").value),
      typePayment: document.getElementById("typePayment").value,

      status: document.getElementById("status").value,

      phone: document.getElementById("phone").value,
      email: document.getElementById("email").value,
      //date: document.getElementById("date").value,

      totalAmount: {
        total: Number(document.getElementById("total").value),
        discount: Number(document.getElementById("discount").value),
      },
      shipperId: document.getElementById("shipperId").value,
    };
    console.log(order);
    await OrderService.updateOrder(id, order).then(
      (response) => {
        console.log(response);
        navigate("/orders");
      },
      (error) => {
        alert("Đã xảy ra lỗi!!!");
      }
    );
  };

  const Transport = async () => {
    const order1 = {
      status: "transporting",
    };
    console.log(order1);
    await OrderService.updateStatusOrderTransport(id, order1).then(
      (response) => {
        console.log(response);
        navigate("/shipper");
      },
      (error) => {
        alert("Đã xảy ra lỗi!!!");
      }
    );
  };
  const Complete = async () => {
    const order2 = {
      status: "completed",
      //shipperId: document.getElementById("shipperId").value,
    };
    console.log(order2);

    let text;
    let choice = confirm("Bạn có muốn xác nhận giao đơn hàng cho khách" + "?");
    if (choice == true) {
      await OrderService.updateStatusOrderComplete(id, order2).then(
        (response) => {
          console.log(response);
          navigate("/shipper");
        },
        (error) => {
          alert("Bạn chưa nhận đơn hàng, vui lòng kiểm tra lại !!!");
        }
      );

      // const messageBox = window.confirm(
      //   "Bạn có muốn xác nhận hủy đơn hàng" + "?"
      // );
      // navigate("/orders");
    } else {
      text = "Nút Cancel đã được bấm!";
    }
    console.log(text);
  };

  return (
    <>
      <div className=" md:m-10 p-1 md:p-10 bg-white rounded-3xl">
        <div className="flex justify-between items-center mb-6">
          <Header
            title={`Đơn hàng ${data.orderCode}`}
            category="Thông tin chi tiết đơn hàng"
          />
        </div>
        <div className="flex justify-center items-center bg-gray-50 ">
          <div className="w-full">
            <div>
              <div className="md:col-span-2 md:mt-0">
                <div className="sm:overflow-hidden sm:rounded-md">
                  <div className="space-y-6 bg-white rounded-x">
                    <div>
                      <div className="py-2 flex flex-col gap-2 ">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            <h1 className="font-bold mb-1">Mã đơn hàng</h1>
                            <div className="mt-1">
                              <textarea
                                id="orderCode"
                                name="orderCode"
                                disabled
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Tên danh mục"
                                defaultValue={data.orderCode}
                              />
                              <h1 className="font-bold mb-1">
                                Trạng thái đơn hàng
                              </h1>
                              <textarea
                                id="status"
                                name="status"
                                disabled
                                rows={1}
                                className=" mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Nhập trạng thái đơn hàng"
                                defaultValue={data.status}
                              />
                              {/* <h1 className="font-bold mb-1">Ngày đặt</h1>
                              <textarea
                                id="date"
                                name="date"
                                rows={1}
                                className=" mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Nhập trạng thái đơn hàng"
                                defaultValue={data.date}
                              /> */}
                            </div>
                          </label>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            <h1 className="font-bold mb-1">Mã khách hàng</h1>
                            <div className="mt-1">
                              <textarea
                                id="customerId"
                                name="customerId"
                                rows={1}
                                disabled
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Mã khách hàng"
                                defaultValue={data.customerId}
                              />
                            </div>
                            <h1 className="font-bold mb-1">Tên khách hàng</h1>
                            <div className="mt-1">
                              <textarea
                                id="customerName"
                                name="customerName"
                                disabled
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Mã khách hàng"
                                defaultValue={data.customerName}
                              />
                            </div>
                          </label>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            <div className="mt-1 pb-2 pt-1">
                              <h1 className="font-bold mb-1">
                                Chi tiết đơn hàng
                              </h1>

                              {data.product &&
                                data.product.map((item) => {
                                  return (
                                    <div key={item._id} style={{ display: 'flex', flexDirection: 'row', marginBottom: 20 }}>
                                    <input value={item._id} type="hidden" />
                                    <div >
                                      <img
                                        src={item.image}
                                        style={{
                                          width: 200,
                                          height: 200
                                        }}
                                      />
                                    </div>
                                    <div className="product__info">
                                      <p>Tên sản phẩm: {item.name}</p>
                                      <p>Số lượng: {item.number}</p>
                                      <p>Giá: {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}đ</p>
                                    </div>

                                  </div>
                                  );
                                })}
                                 <h1 className="totalbill">Tổng đơn hàng: {data.totalAmount?.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}đ</h1>
                              <h1 className="font-bold mb-1">THÔNG TIN LIÊN LẠC</h1>
                              <h1 className="font-bold mb-1">Đường</h1>
                              <textarea
                                id="street"
                                name="street"
                                disabled
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Nhập đường"
                                defaultValue={data.address?.street}
                              />
                              <h1 className="font-bold mb-1">Tỉnh/Thành phố</h1>
                              <textarea
                                id="province"
                                name="province"
                                disabled
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Nhập tỉnh/thành phố"
                                defaultValue={data.address?.province}
                              />
                              <h1 className="font-bold mb-1">Quận/Huyện</h1>
                              <textarea
                                id="district"
                                name="district"
                                disabled
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Nhập quận/huyện"
                                defaultValue={data.address?.district}
                              />
                              <h1 className="font-bold mb-1">Phường</h1>
                              <textarea
                                id="ward"
                                name="ward"
                                disabled
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Nhập phường"
                                defaultValue={data.address?.ward}
                              />

                              <h1 className="font-bold mb-1">
                                Phương thức thanh toán
                              </h1>
                              <textarea
                                id="typePayment"
                                name="typePayment"
                                disabled
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Nhập phường"
                                defaultValue={data.typePayment}
                              />
                              {/* <h1 className="font-bold mb-1">Phí vận chuyển</h1>
                              <textarea
                                id="transportFee"
                                name="transportFee"
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Nhập phường"
                                defaultValue={data.transportFee}
                              /> */}
                              <h1 className="font-bold mb-1">Số điện thoại</h1>
                              <textarea
                                id="phone"
                                name="phone"
                                disabled
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Nhập số điện thoại"
                                defaultValue={data.phone}
                              />
                              <h1 className="font-bold mb-1">Email</h1>
                              <textarea
                                id="email"
                                name="email"
                                disabled
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Nhập email"
                                defaultValue={data.email}
                              />
                              
                              {/* <h1 className="font-bold mb-1">Đã được giảm</h1>
                              <textarea
                                id="discount"
                                name="discount"
                                disabled
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Đã được giảm"
                                defaultValue={data.totalAmount?.discount}
                              /> */}

                              {/* <h1 className="font-bold mb-1">
                                Shipper được chọn
                              </h1> */}

                              {/* <select
                                id="shipperId"
                                name="shipperId"
                                disabled
                                defaultValue={data.shipperId}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                              >
                                {shipper.map((itemm) => {
                                  return (
                                    <option
                                      key={itemm.uid}
                                      selected={data.shipper === itemm.username}
                                      value={itemm.uid}
                                      style={{ fontSize: "24px" }}
                                    >
                                      {itemm.username}
                                    </option>
                                  );
                                })}
                              </select> */}

                              {/* <h1 className="font-bold mb-1">Thực thu</h1>
                              <textarea
                                id="mon"
                                name="mon"
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Nhập thực thu"
                                defaultValue={data.total - data.discount}
                              /> */}
                              {/* <div
                                className="flex justify-center items-center flex-wrap"
                                style={{ height: "300px" }}
                              ></div>
                              <Modal show={showModal} onHide={handleClose}>
                                <h1 className="font-bold mb-1"></h1>
                                <h1 className="font-bold mb-1">
                                  Vui lòng xác nhận
                                </h1>
                                <h1 className="font-bold mb-1">
                                  Thông tin chi tiết đơn hàng
                                </h1> */}

                              {/* <div className="flex justify-between items-center mb-6">
                                  <Header
                                    title={`Đơn hàng ${data.orderCode},
                                    Tổng giá trị ${data.total},
                                    Được bàn giao cho shipper ${data.shipperId}`}
                                  />
                                </div> */}

                              {/* <Modal.Footer>
                                  <div className="flex justify-end gap-2 px-4 py-3 text-right sm:px-6">
                                    <button
                                      type="button"
                                      className="inline-flex justify-center rounded-md border border-transparent bg-red-500 py-3 px-8 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                      onClick={handleClose}
                                    >
                                      Hủy
                                    </button>
                                    <button
                                      type="button"
                                      className="inline-flex justify-center rounded-md border border-transparent bg-sky-500 py-3 px-8 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                      //onClick={alert("Giao hàng thành công")}
                                    >
                                      Xác nhận
                                    </button>
                                  </div>
                                </Modal.Footer>
                              </Modal> */}
                            </div>
                          </label>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 px-4 py-3 text-right sm:px-6">
                        <Link
                          to="/shipper"
                          className="inline-flex justify-center rounded-md border border-transparent bg-red-500 py-3 px-8 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Quay lại
                        </Link>
                        <button
                          style={{backgroundColor: data.status == 'Đang chờ giao' ? '' : 'grey'}}
                          type="button"
                          disabled={
                            data.status == 'Đang chờ giao' ?
                            false:
                            true      
                          }
                          onClick={Transport}
                          className="inline-flex justify-center rounded-md border border-transparent bg-sky-500 py-3 px-8 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Nhận đơn
                        </button>
                        {/* <button
                          type="button"
                          disabled={
                            data.status === "Chưa xác nhận" ||
                            data.status === "Đang chờ giao" ||
                            data.status === "Đang giao hàng" ||
                            data.status === "Hoàn tất"
                          }
                          className="inline-flex justify-center rounded-md border border-transparent bg-sky-500 py-3 px-8 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={onSave}
                        >
                          Lưu
                        </button> */}

                        <button
                          style={{backgroundColor: data.status == 'Đang giao hàng' ? '' : 'grey'}}
                          type="button"
                          disabled={
                            data.status == 'Đang giao hàng' ?
                            false:
                            true      
                          }
                          className="inline-flex justify-center rounded-md border border-transparent bg-sky-500 py-3 px-8 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={Complete}
                        >
                          Giao thành công!
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShipperEdit;
