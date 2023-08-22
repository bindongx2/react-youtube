import React, { useEffect, useState } from 'react'
import Axios from 'axios'

function Subscribe(props) {
    
    const [SubscribeNumber, setSubscribeNumber] = useState([]);
    const [Subscribed, setSubscribed] = useState([]);

    useEffect(() => {

        //������ �� ��ȸ
        let variable = { userTo: props.userTo };
        Axios.post('/api/subscribe/subscribeNumber', variable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data);
                    setSubscribeNumber(response.data.subscribeNumber);
                } else {
                    alert('������ �� ������ �������� ���Ͽ����ϴ�.');
                }
            })

            
        //���� ���� ��ȸ
        let subscribedVariable = { userTo: props.userTo, userFrom: localStorage.getItem('userId')};
        Axios.post('/api/subscribe/subscribed', subscribedVariable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data);
                    setSubscribed(response.data.subscribed);
                } else {
                    alert('������ �������� ���Ͽ����ϴ�.');
                }
            })
    }, []);

    return (
        <div>
            <button style={{
                backgroundColor: `${Subscribe ? '#CC0000' : '#AAAAAA'}`, borderRadius: '4px', color: 'white',
                        padding: '10px 16px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'}}
            >
                {SubscribeNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}
            </button>
        </div>
    )
}

export default Subscribe