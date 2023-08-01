import React, { useEffect, useRef, useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, onChildAdded, set, off } from "firebase/database";
import "./Chatbox.css"
import axios from "axios";
import { baseURL } from "../../data/baseURL";

const Chatbox = () => {
    const [content, setContent] = useState();
    const [messageList, setMessageList] = useState([]);
    const [allCustomer, setAllCustomer] = useState();
    const [userIdToState, setUserIdToState] = useState();
    const [sendMessageState, setSendMessageState] = useState(false);
    const [tabActive, setTabActive] = useState()
    const [userNameToState, setUserNameToState] = useState();
    const [userImageToState, setUserImageToState] = useState();

    const firebaseConfig = {
        apiKey: "AIzaSyDkIqYefTbKOJ5r5gexI84Fzy4Tf1oQTrE",
        authDomain: "chatapp-839b6.firebaseapp.com",
        databaseURL: "https://chatapp-839b6-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "chatapp-839b6",
        storageBucket: "chatapp-839b6.appspot.com",
        messagingSenderId: "920125762908",
        appId: "1:920125762908:web:effab25f06bc17cecf6599",
        measurementId: "G-C4S6HDSKDE"
    };

    //Get all Customer
    useEffect(() => {
        setSendMessageState(!sendMessageState)
    }, [])

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    useEffect(() => {
        let y = []
        let xyz = []
        const fetchChat = ref(database, "chatmessage/");
        onChildAdded(fetchChat, (snapshot) => {
            const messages = snapshot.val();

            //     const message = `<li class=${messages.userIdFrom === 1 ? "sent" : "receive"
            // }><span>${messages.userIdTo}: </span>${messages.content}</li>`;
            // // append the message on the page
            // document.getElementById("messages").innerHTML += message;

            y.push({
                userIdFrom: messages.userIdFrom,
                userIdTo: messages.userIdTo,
                content: messages.content,
                time: messages.time,
            })
            xyz.push({ ...messages })
            let z = y.filter(
                (item) => (item.userIdFrom === '01GJ842NECBY1WZK9WB1479EZ6' && item.userIdTo === userIdToState)
                    || (item.userIdFrom === userIdToState && item.userIdTo === '01GJ842NECBY1WZK9WB1479EZ6')
            )
            setMessageList(z);

        })
        // SORT MESSAGE
        let y1 = xyz.sort((x, y) => {
            return new Date(x.time) < new Date(y.time) ? 1 : -1
        })
        axios.get(`${baseURL}/api/v1/customer`)
            .then((res) => {
                // setAllCustomer(res.data.results.data);
                let listCustomerEdit = [];
                let listCustomer = res.data.results.data;
                y1.map((mes) => {
                    let uniqueCus = listCustomer.find(
                        (cus) => cus.uid === mes.userIdFrom || cus.uid === mes.userIdTo
                    )
                    console.log('111111111111111111111111', uniqueCus)
                    listCustomerEdit.push({ ...uniqueCus, contentMes: mes.content, timeMes: mes.time, fromMes: mes.userIdFrom });
                })

                // FILTER CUSTOMER DUPLICATE
                let unique = listCustomerEdit.filter(
                    (obj, index) =>
                        listCustomerEdit.findIndex((item) => item.uid === obj.uid) === index
                );

                // setAllCustomer(unique);
                setAllCustomer(unique);
                console.log('==============', unique)

            })
            .catch((err) => console.log(err))




        off(fetchChat, (snapshot) => {
            const messages = snapshot.val();
            const message = `<li class=${messages.userIdFrom === 1 ? "sent" : "receive"
                }><span>${messages.userIdTo}: </span>${messages.content}</li>`;
            // append the message on the page
            document.getElementById("messages").innerHTML += message;
            console.log("=======================: ", messages.userIdFrom, messages.content);

        })
    }, [sendMessageState, userIdToState])
    function sendMessage(userIdFrom, userIdTo, content) {
        const timestamp = Date.now();

        set(ref(database, 'chatmessage/' + timestamp), {
            userIdFrom: userIdFrom,
            userIdTo: userIdTo,
            content: content,
            time: timestamp,

        });
        setContent('');
        setSendMessageState(!sendMessageState)
    }
    return (
        <Container className="message-container">
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ height: 550, width: 400 }}>
                    <div className="chat__container">
                        <div className="chat__sidebar-container">
                            <div className="chat__sidebar-header">
                                <input
                                    placeholder="Tìm kiếm..."
                                />
                            </div>
                            <div className="chat__sidebar-content">
                                {
                                    allCustomer?.map((item) => (
                                        <div className="chat__sidebar-item" style={{ backgroundColor: userIdToState === item?.uid ? '#efd8f0' : null }}
                                            onClick={() => {
                                                setUserIdToState(item.uid)
                                                setUserNameToState(item.name)
                                                setUserImageToState(item.avatar)
                                            }}
                                        >
                                            <div>

                                                {
                                                    item.avatar?.length > 0 ? (
                                                        <img src={item.avatar} />
                                                    )
                                                        :
                                                        (
                                                            <img src='https://i.pinimg.com/280x280_RS/77/0f/b7/770fb75f5e81e4c2dbe8934f246aeeab.jpg' />
                                                        )
                                                }

                                            </div>
                                            <div style={{ marginLeft: 20 }}>
                                                <p style={{fontWeight: 'bold'}}>{item.name}</p>
                                                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end'}}>
                                                    <p>{item.contentMes}</p>
                                                    <p style={{ fontSize: 13, marginLeft: 10 }}>{
                                                        new Date(Date.now() - item.timeMes).getMinutes() < 1 ? 'Vừa xong' :
                                                            `${new Date(Date.now() - item.timeMes).getMinutes()} phút`
                                                    }</p>
                                                    </div>
                                                    {
                                                        item.fromMes !== '01GJ842NECBY1WZK9WB1479EZ6' &&
                                                        <p style={{ fontSize: 13, color: 'red' }}>
                                                            Chưa trả lời
                                                        </p>
                                                    }
                                                
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ height: 550, width: 950 }}>
                    <div >

                        <div className="message__title">
                         <img src={userImageToState} style={{width: 50, height: 50, borderRadius: '50%'}}/>
                            <h5> {userNameToState}</h5>
                        </div>
                    </div>
                    <div style={{ marginBottom: 50, overflowY: 'scroll', height: 400 }}>
                        <div>
                            {
                                messageList
                                    .map((item) => (
                                        <div className=
                                            "message__item-container"
                                            style={{
                                                flexDirection: item.userIdFrom === '01GJ842NECBY1WZK9WB1479EZ6' ? "row" : "row-reverse"
                                            }}
                                        >
                                            <p
                                                style={{ backgroundColor: item.userIdFrom === '01GJ842NECBY1WZK9WB1479EZ6' ? "grey" : "#88c3eb" }}
                                            >{item.content}</p>
                                            {/* <img
                                        src={avatar}
                                        className={item.userIdTo === 2 ? "marginLeft" : 'marginRight'}

                                    /> */}
                                        </div>
                                    ))
                            }

                        </div>
                    </div>
                    <div >
                        <div className="message__footer">
                            <input
                                onChange={(e) => setContent(e.target.value)}
                                value={content}
                                style={{ width: 900 }}
                            />
                            <button onClick={() => {
                                sendMessage('01GJ842NECBY1WZK9WB1479EZ6', userIdToState, content)

                            }} >GỬI</button>
                        </div>

                    </div>

                </div>
            </div>


        </Container>
    )
}

export default Chatbox
