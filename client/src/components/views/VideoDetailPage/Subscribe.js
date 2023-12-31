import React, { useEffect, useState } from 'react'
import Axios from 'axios'

function Subscribe(props) {
    
    const [SubscribeNumber, setSubscribeNumber] = useState([]);
    const [Subscribed, setSubscribed] = useState([]);

   
    let variable = {
        userTo: props.userTo
    };

    
    let subscribedVariable = {
        userTo: props.userTo
      , userFrom: localStorage.getItem('userId')
    };

    useEffect(() => {

         //구독자 수 조회
        Axios.post('/api/subscribe/subscribeNumber', variable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data);
                    setSubscribeNumber(response.data.subscribeNumber);
                } else {
                    alert('구독자 수 정보를 가져오지 못하였습니다.');
                }
            })
      
        //구독 여부 조회
        Axios.post('/api/subscribe/subscribed', subscribedVariable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data);
                    setSubscribed(response.data.subscribed);
                } else {
                    alert('정보를 가져오지 못하였습니다.');
                }
            })
    }, []);

    const onSubscribe = () => {

        let subscribeVariable = {
            userTo: props.userTo
          , userFrom: props.userFrom
        }

        //이미 구독 중이라면
        if (Subscribed) {
            Axios.post('/api/subscribe/unSubscribe', subscribeVariable)
                .then(response => {
                    if (response.data.success) {
                        setSubscribeNumber(SubscribeNumber - 1);
                        setSubscribed(!Subscribed);
                    } else {
                        alert("구독 취소 실패하였습니다.");
                    }
                })
        //아직 구독 중이지 아닌 상태
        } else {
            Axios.post('/api/subscribe/subscribe', subscribeVariable)
                .then(response => {
                    if (response.data.success) {
                        setSubscribeNumber(SubscribeNumber + 1);
                        setSubscribed(!Subscribed);
                    } else {
                        alert("구독하는데 실패하였습니다.");
                    }
                })
        }
    }

    return (
        <div>
            <button
                style={{
                    backgroundColor: `${Subscribed ? '#CC0000' : '#AAAAAA'}`, borderRadius: '4px', color: 'white',
                    padding: '10px 16px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
                }}
                onClick={onSubscribe }
            >
                {SubscribeNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}
            </button>
        </div>
    )
}

export default Subscribe