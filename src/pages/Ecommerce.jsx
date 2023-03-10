import React from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { GoPrimitiveDot } from "react-icons/go";
import { IoIosMore } from "react-icons/io";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { MdAssignment, MdCheckCircleOutline, MdCheckCircle, MdLocalCarWash, MdElectricMoped, MdAssignmentTurnedIn } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Chart } from "react-google-charts";

import { Stacked, Pie, Button, LineChart, SparkLine } from "../components";
import {
  medicalproBranding,
  recentTransactions,
  weeklyStats,
  dropdownData,
  SparklineAreaData,
  ecomPieChartData,

} from "../data/dummy";

import { useStateContext } from "../contexts/ContextProvider";

import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { StaticsService } from "../services/statics.service";
import { useState } from "react";
import { ProductService } from "../services/product.service";

const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent
      id="time"
      fields={{ text: "Time", value: "Id" }}
      style={{ border: "none", color: currentMode === "Dark" && "white" }}
      value="1"
      dataSource={dropdownData}
      popupHeight="220px"
      popupWidth="120px"
    />
  </div>
);

const Ecommerce = () => {

  
  
  //-----------------------------------------------
  const navigate = useNavigate();
  const { currentColor, currentMode } = useStateContext();
  
  // const [startDate, setStartDate] = useState('');
  // const [endDate, setEndDate] = useState('');

  // console.log('type of start date: ', typeof startDate, startDate)
  // console.log('type of end date: ', typeof endDate, endDate)

  const [data, setData] = useState([])
  const orderQuantityToday = data?.orderInDate?.newOrder
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    await StaticsService.getStaticsHome().then((response) => {
      setData(response.results);
      console.log("Response data is: ", response.results);
    });
  }
  //-------------
  console.log("data is: ", data);
  console.log("Top product: ", data?.topProduct);

  if (!localStorage.getItem("username")) {
    return <Navigate to="/admin/login" />;
  }
  const earningData = [
    {
      icon: <MdAssignment />,
      amount: data?.statusOrder?.wait_for_confirmation,
      title: "Ch??? x??c nh???n",
      iconColor: "#03C9D7",
      iconBg: "#E5FAFB",
      pcColor: "red-600",
    },
    {
      icon: <MdCheckCircleOutline />,
      amount: data?.statusOrder?.approved,
      title: "????n ch???p nh???n",
      iconColor: "rgb(255, 244, 229)",
      iconBg: "rgb(254, 201, 15)",
      pcColor: "green-600",
    },
    {
      icon: <MdCheckCircle />,
      amount: data?.statusOrder?.confirmed,
      title: "???? x??c nh???n",
      iconColor: "rgb(255, 244, 229)",
      iconBg: "rgb(254, 201, 15)",
      pcColor: "green-600",
    },
    {
      icon: <MdLocalCarWash />,
      amount: data?.statusOrder?.ready_to_ship,
      title: "S???n s??ng v???n chuy???n",
      iconColor: "rgb(228, 106, 118)",
      iconBg: "rgb(255, 244, 229)",

      pcColor: "green-600",
    },
    {
      icon: <MdElectricMoped />,
      amount: data?.statusOrder?.transporting,
      title: "??ang v???n chuy???n",
      iconColor: "rgb(0, 194, 146)",
      iconBg: "rgb(235, 250, 242)",
      pcColor: "red-600",
    },
    {
      icon: <MdAssignmentTurnedIn />,
      amount: data?.statusOrder?.completed,
      title: "Ho??n th??nh",
      iconColor: "rgb(0, 194, 146)",
      iconBg: "rgb(235, 250, 242)",
      pcColor: "red-600",
    },
  ];
  const earningData1 = [
    {
      icon: <MdAssignment />,
      amount: `${data?.orderInDate?.newOrder} ????n`,
      title: "????n h??ng m???i",
      iconColor: "#03C9D7",
      iconBg: "#E5FAFB",
      pcColor: "red-600",
    },
    {
      icon: <MdCheckCircleOutline />,
      amount: `${data?.orderInDate?.cancelOrder} ????n`,
      title: "????n b??? h???y",
      iconColor: "rgb(255, 244, 229)",
      iconBg: "rgb(254, 201, 15)",
      pcColor: "green-600",
    },
    {
      icon: <MdCheckCircle />,
      amount: `${data?.orderInDate?.revenueOrder} VN??`,
      title: "Doanh thu trong ng??y",
      iconColor: "rgb(255, 244, 229)",
      iconBg: "rgb(254, 201, 15)",
      pcColor: "green-600",
    },
    {
      icon: <MdLocalCarWash />,
      amount: `${data?.orderInDate?.newCustomer} kh??ch h??ng`,
      title: "Kh??ch h??ng m???i",
      iconColor: "rgb(228, 106, 118)",
      iconBg: "rgb(255, 244, 229)",

      pcColor: "green-600",
    },
    
  ];
  // pie chart children props
  const dataChart = [
    ["Task", "Hours per Day"],
    ["Ch??? ch???p nh???n", data?.statusOrder?.wait_for_confirmation],
    ["???? ch???p nh???n", data?.statusOrder?.approved],
    ["???? x??c nh???n", data?.statusOrder?.confirmed],
    ["S???n s??ng v???n chuy???n", data?.statusOrder?.ready_to_ship],
    ["??ang v???n chuy???n", data?.statusOrder?.transporting],
    ["Ho??n th??nh", data?.statusOrder?.completed],
  ];
  // console.log('Type of data: ',typeof data?.statusOrder?.completed)
  
  const optionsChart = {
    title: `T???ng s??? ????n h??ng: ${data?.statusOrder?.numberOrder}`,
  };
  //--------------------------------
  return (
    <div className="mt-24">
      <div className="flex flex-wrap lg:flex-nowrap justify-center ">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">

            <div>
              <p className="font-bold text-gray-400">T???ng doanh thu</p>
              <p className="text-2xl">{data.totalAmount} VN??</p>
              {/* <input className="date__Start" type="date" onChange={(e) => setStartDate(e.target.value)}/>
              <input className="date__End" type="date" onChange={(e) => setEndDate(e.target.value)}/> */}
            </div>

          </div>
          <div className="mt-6">
            <button onClick={() => navigate('/orders')}>
              <Button
                color="white"
                bgColor={currentColor}
                text="Qu???n l?? ????n h??ng"
                borderRadius="10px"

              />
            </button>
          </div>
        </div>
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">

          {earningData.map((item) => (
            <div
              key={item.title}
              className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl "
            >
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                {item.icon}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{item.amount} ????n</span>
                <span className={`text-sm text-${item.pcColor} ml-2`}>
                  {item.percentage}
                </span>
              </p>
              <p className="text-sm text-gray-400  mt-1">{item.title}</p>
            </div>
          ))}
          {/* <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl md:w-400 p-8 m-3 flex justify-center items-center gap-10"> */}
          {/* <div>
            <p className="text-2xl font-semibold ">{data?.statusOrder?.numberOrder}</p>
            <p className="text-gray-400">T???ng ????n h??ng</p>
          </div> */}

          <div className="w-100">
            {/* <Pie
              id="pie-chart"
              data={ecomPieChartData}
              legendVisiblity={false}
              height="160px"
            /> */}
            <Chart
              chartType="PieChart"
              data={dataChart}
              options={optionsChart}
              width={"100%"}
              height={"400px"}
            />
          </div>
        </div>
      </div>
      {/* ????n h??ng */}
      <div className="flex flex-wrap lg:flex-nowrap justify-center ">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">

            <div>
              <p className="font-bold text-gray-400">????n h??ng trong h??m nay</p>
              <p className="text-2xl">{orderQuantityToday}</p>
              
            </div>

          </div>
          
        </div>
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">

          {earningData1.map((item) => (
            <div
              key={item.title}
              className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl "
            >
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                {item.icon}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{item.amount}</span>
                <span className={`text-sm text-${item.pcColor} ml-2`}>
                  {item.percentage}
                </span>
              </p>
              <p className="text-sm text-gray-400  mt-1">{item.title}</p>
            </div>
          ))}
          {/* <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl md:w-400 p-8 m-3 flex justify-center items-center gap-10"> */}
          
        </div>
      </div>
      {/* ------------------------------- */}

      <div className="flex gap-10 flex-wrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780  ">
          <div className="flex justify-between">
            <p className="font-semibold text-xl">Top s???n ph???m</p>
            <div className="flex justify-between">
              <p className="font-semibold text-xl">T???ng s??? ????n h??ng</p>
              <p className="font-semibold text-xl">S??? l?????ng ???? b??n</p>
            </div>
          </div>
          {/* <div className="mt-10 w-72 md:w-400"> */}

          {data?.topProduct?.map((item) => (
            <div key={item.uid} className="flex justify-between mt-4">
              <div className="flex gap-4">
                <button
                  className="text-2xl rounded-lg p-4 hover:drop-shadow-xl"
                >
                  <MdAssignment />
                </button>
                
                <div>
                  <p className="text-md font-semibold">{item?.uid}</p>
                  
                </div>
              </div>
              <p className={`text-${item.pcColor}`}>{item?.numberOrders}</p>
              <p className={`text-${item.pcColor}`}>{item?.numberProducts}</p>
            </div>
          ))}




          {/* </div> */}

          <div className="mt-10 flex gap-10 flex-wrap justify-center">
            <div className=" border-r-1 border-color m-4 pr-10">
              <div>
                <p>
                  <span className="text-3xl font-semibold">{data.totalAmount}</span>
                  <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-3 text-xs">
                    23%
                  </span>
                </p>
                <p className="text-gray-500 mt-1">T???ng doanh thu</p>
              </div>
              <div className="mt-8">
                <p className="text-3xl font-semibold">{data?.statusOrder?.numberOrder}</p>

                <p className="text-gray-500 mt-1">T???ng s??? ????n h??ng</p>
              </div>

              {/* <div className="mt-5">
                <SparkLine
                  currentColor={currentColor}
                  id="line-sparkLine"
                  type="Line"
                  height="80px"
                  width="250px"
                  data={SparklineAreaData}
                  color={currentColor}
                />
              </div> */}
              
            </div>
            {/* <div>
              <Stacked currentMode={currentMode} width="320px" height="360px" />
            </div> */}
          </div>
        </div>
        
      </div>

      
    </div>
  );
};

export default Ecommerce;
