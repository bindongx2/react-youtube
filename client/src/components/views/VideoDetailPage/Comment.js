import React, {  useState } from 'react'
import Axios from 'axios'
//react-redux���� ���� ��������
import { useSelector } from 'react-redux'

function Comment(props) {
    //props ==> �θ𿡼� ������ ��������
    const videoId = props.postId;
    //redux���� user���� ��������
    const user = useSelector(state => state.user);
    const [commentValue, setcommentValue] = useState("")

    const handleClick = (event) => {
        setcommentValue(event.currentTarget.value)
    }

    const onSubmit = (event) => {
        //ȭ�� ���÷��� ���ϵ��� ����
        event.preventDefault();

        const variable = {
            content: commentValue,
            writer: user.userData._id,
            postId: videoId
        }

        Axios.post('/api/comment/saveComment', variable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.result);
                } else {
                    alert("111");
                }
            })
        
        
    }

    return (
        <div>
            <br />
            <p> Replices</p>
            <hr />

            {/*Comment List*/}

            {/*Root Comment Form*/}

            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <textarea style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder="�ڸ�Ʈ�� �ۼ��� �ּ���."
                />
                <br />
                <button style={{ width: '20%', height: '52px' }} onClick={onSubmit} >Submit</button>

            </form>

        </div>
    )
}

export default Comment