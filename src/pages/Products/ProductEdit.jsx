import React, { useState, useEffect } from "react";
import { Selection } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components";
import { Link } from "react-router-dom";
import { ProductService } from "../../services/product.service";
import { BrandService } from "../../services/brand.service";
import { ProductTypeService } from "../../services/producttype.service";

import { useDataContext } from "../../contexts/DataProvider";

const ProductEdit = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [brand, setBrandData] = useState([]);
  const [producttype, setProductTypeData] = useState([]);

  const navigate = useNavigate();
  const { productData } = useDataContext();
  //const brandname = [];
  useEffect(() => {
    const fetchData = async () => {
      console.log(id);
      await ProductService.getProductById(id).then((response) => {
        console.log(response);
        setData(response.data.results);

        BrandService.getAllBrand().then((response) => {
          //console.log(response.results.data);
          setBrandData(response.results.data);

          ProductTypeService.getAllProductType().then((response) => {
            console.log(response);
            setProductTypeData(response.results.data);
          });
        });
      });
    };
    fetchData();
  }, [id]);
  const onSave = async () => {
    const product = {
      name: document.getElementById("name").value,
      price: Number(document.getElementById("price").value),
      status: true,
      discount: Number(document.getElementById("discount").value),
      discountPrice: Number(document.getElementById("discountPrice").value),
      expiryDate: Number(document.getElementById("expiryDate").value),
      productType: document.getElementById("productType").value,
      brand: document.getElementById("brand").value,
      image: [document.getElementById("image").value],
      descriptionSummary: document.getElementById("descriptionSummary").value,
      descriptionDetail: [
        {
          name: document.getElementById("name1").value,
          description: document.getElementById("description").value,
        },
      ],

      quantity: Number(document.getElementById("quantity").value),
    };
    console.log(product);
    await ProductService.updateProduct(id, product).then(
      (response) => {
        console.log(response);
        navigate("/products");
      },
      (error) => {
        alert("???? x???y ra l???i!!!");
      }
    );
  };

  return (
    <>
      <div className=" md:m-10 p-1 md:p-10 bg-white rounded-3xl">
        <div className="flex justify-between items-center mb-6">
          <Header
            title={`S???n ph???m ${data.name}`}
            category="Ch???nh s???a th??ng tin s???n ph???m"
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
                            <h1 className="font-bold mb-1">T??n s???n ph???m</h1>
                            <div className="mt-1">
                              <textarea
                                id="name"
                                name="name"
                                rows={2}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="T??n s???n ph???m"
                                defaultValue={data.name}
                              />

                              <h1 className="font-bold mb-1">Gi??</h1>
                              <textarea
                                id="price"
                                name="price"
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Gi??"
                                defaultValue={data.price}
                              />
                              <h1 className="font-bold mb-1">
                                Tr???ng th??i s???n ph???m
                              </h1>
                              <textarea
                                id="status"
                                name="status"
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Tr???ng th??i s???n ph???m"
                                defaultValue={data.status}
                              />
                              <h1 className="font-bold mb-1">Gi???m gi??</h1>
                              <textarea
                                id="discount"
                                name="discount"
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Gi???m gi??"
                                defaultValue={data.discount}
                              />
                              <h1 className="font-bold mb-1">Gi?? gi???m gi??</h1>
                              <textarea
                                id="discountPrice"
                                name="discountPrice"
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Gi?? gi???m gi??"
                                defaultValue={data.discountPrice}
                              />
                              <h1 className="font-bold mb-1">B???o h??nh</h1>
                              <textarea
                                id="expiryDate"
                                name="expiryDate"
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="B???o h??nh"
                                defaultValue={data.expiryDate}
                              />
                              <h1 className="font-bold mb-1">Lo???i s???n ph???m</h1>
                              {/* <textarea
                                id="productType"
                                name="productType"
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Lo???i s???n ph???m"
                                defaultValue={data.productType}
                              /> */}
                              <select
                                id="productType"
                                name="productType"
                                defaultValue={data.productType}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                              >
                                {producttype.map((itemm) => {
                                  return (
                                    <option
                                      key={itemm.uid}
                                      selected={data.productType === itemm.name}
                                      value={itemm.uid}
                                      style={{ fontSize: "24px" }}
                                    >
                                      {itemm.name}
                                    </option>
                                  );
                                })}
                              </select>
                              <h1 className="font-bold mb-1">Nh??n hi???u</h1>
                              {/* <textarea
                                id="brand"
                                name="brand"
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Nh??n hi???u"
                                defaultValue={data.brand}
                              /> */}
                              {/* <h1 className="font-bold mb-1">Brand name</h1> */}
                              <select
                                id="brand"
                                name="brand"
                                defaultValue={data.brand}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                              >
                                {brand.map((item) => {
                                  return (
                                    <option
                                      key={item.uid}
                                      selected={data.brand === item.name}
                                      value={item.uid}
                                      style={{ fontSize: "24px" }}
                                    >
                                      {item.name}
                                    </option>
                                  );
                                })}
                              </select>
                              <h1 className="font-bold mb-1">M?? t???</h1>
                              {/* <textarea
                                id="descriptionSummary"
                                name="descriptionSummary"
                                rows={3}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="M?? t???"
                                defaultValue={data.descriptionSummary}
                              /> */}
                              <textarea
                                id="descriptionSummary"
                                name="descriptionSummary"
                                rows={3}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="M?? t???"
                                defaultValue={data.descriptionSummary}
                              />
                              <h1 className="font-bold mb-1">M?? t??? danh m???c</h1>

                              {data.descriptionDetail &&
                                data.descriptionDetail.map((item) => {
                                  return (
                                    <div key={item._id}>
                                      <input value={item._id} type="hidden" />
                                      <h1 className="font-bold mb-1">
                                        Thu???c t??nh
                                      </h1>
                                      <textarea
                                        id="name1"
                                        name="name1"
                                        rows={2}
                                        className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                        placeholder="T??n danh m???c"
                                        defaultValue={item.name}
                                      />

                                      <h1 className="font-bold mb-1">
                                        M?? t??? chi ti???t
                                      </h1>
                                      <textarea
                                        id="description"
                                        name="description"
                                        rows={3}
                                        className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                        placeholder="M?? t??? chi ti???t"
                                        defaultValue={item.description}
                                      />
                                    </div>
                                  );
                                })}
                              {/* <textarea
                                id="name1"
                                name="name1"
                                rows={3}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="T??n danh m???c"
                                defaultValue={data.name1}
                              />
                              <textarea
                                id="description"
                                name="description"
                                rows={3}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="T??n danh m???c"
                                defaultValue={data.description}
                              /> */}
                              <h1 className="font-bold mb-1">S??? l?????ng</h1>
                              <textarea
                                id="quantity"
                                name="quantity"
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="S??? l?????ng"
                                defaultValue={data.quantity}
                              />
                              <h1>H??nh ???nh</h1>
                              {/* <label className="block">
                                <span className="sr-only">Ch???n file</span>
                                <input
                                  type="file"
                                  className="image block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                                  multiple="multiple"
                                  id="image"
                                  defaultValue={data.image}
                                />
                              </label> */}
                              <textarea
                                id="image"
                                name="image"
                                rows={3}
                                className="image mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Nh???p link h??nh ???nh"
                                defaultValue={data.image}
                              />
                              {/* {data.image &&
                                data.image.map((item) => {
                                  <img
                                    className="image"
                                    src={item}
                                    key={item}
                                    alt=""
                                  />;
                                })} */}
                            </div>
                          </label>
                        </div>
                        <div>
                          {/* <label className="block text-sm font-medium text-gray-700">
                            <h1 className="font-bold mb-1">M?? t???</h1>
                            <div className="mt-1">
                              <textarea
                                id="description"
                                name="description"
                                rows={5}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="M?? t??? v??? danh m???c"
                                defaultValue={data.status}
                              />
                            </div>
                          </label> */}
                        </div>
                        <div>
                          {/* <label className="block text-sm font-medium text-gray-700">
                            <h1 className="font-bold mb-1">Danh m???c l???n</h1>
                            <div className="mt-1 pb-2 pt-1">
                              <Selection
                                id={"parentCategory"}
                                name={"parentCategory"}
                                data={data}
                                parentId={data.parentId}
                                isDefault={true}
                              />
                            </div>
                          </label> */}
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 px-4 py-3 text-right sm:px-6">
                        <Link
                          to="/products"
                          className="inline-flex justify-center rounded-md border border-transparent bg-red-500 py-3 px-8 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          H???y
                        </Link>
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-sky-500 py-3 px-8 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={onSave}
                        >
                          L??u
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

export default ProductEdit;
