import React, { useEffect, useState} from "react";
import { Row, Col, List, Avatar } from 'antd';
import Axios from 'axios';
//사이드 템플릿 Import
import SideVideo from './SideVideo';
import Subscribe from './Subscribe';
import Comment from './Comment';
function VideoDetailPage(props) {

    const videoId = props.match.params.videoId;
    const variable = { videoId: videoId };

    const [VideoDetail, setVideoDetail] = useState([]);

    //useEffect => DOM Road되자마자 무엇을 할것인지 설정(두번째 인자가 비어있을 경우 한번만 실행)
    useEffect(() => {

        Axios.post('/api/video/getVideoDetail', variable)
            .then(response => {
                if (response.data.success) {
                    setVideoDetail(response.data.videoDetail);
                } else {
                    alert("비디오 정보를 가져오기를 실패하였습니다.");
                }
            })
    }, []);

    /*VideoDetail.writer.image null 에러 => DOM랜더링 전에 image 불러와서 에러 발생 => 처리*/
    if (VideoDetail.writer) {

        //등록자와 유저가 다르면 구독버튼 보이도록 설정
        const subscribeButton = VideoDetail.writer._id !== localStorage.getItem("userId") && <Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem("userId")} />;

        return (
            <Row gutter={[16,16]}>
                <Col lg={18} xs={24}>
                    <div style={{ width: '100%', padding: '3rem 4rem' }}>
                        <video style={{ width: '100%' }} src={`http://localhost:5000/${VideoDetail.filePath}`} controls />

                        <List.Item actions={[subscribeButton]}>

                            <List.Item.Meta
                                /*avatar : 유저의 이미지*/
                                avatar={<Avatar src={VideoDetail.writer.image} />}
                                title={VideoDetail.writer.name}
                                description={VideoDetail.description}
                            />
                         
                        </List.Item>

                        {/*Comment*/}
                        <Comment postId={videoId} />

                    </div>
                </Col>

                <Col lg={6} xs={24}>
                    <SideVideo />
                </Col>
            </Row>

        )
    } else {
        return (
            <div>...Loading</div>
        )
    }
    
}

export default VideoDetailPage