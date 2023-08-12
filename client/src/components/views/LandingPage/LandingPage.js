import React, { useEffect } from 'react'
import { FaCode } from "react-icons/fa";
import { Card, Icon, Avator, Col, Typography, Row } from 'antd';
const { Title } = Typography;
const { Meta } = Card;


const renderCards = {};

function LandingPage() {

    //useEffect => Dom�� Road���ڸ��� ������ �Ұ����� ����
    useEffect(() => {

    }, []);


    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2}> ���� ���</Title>
            <hr />
            <Row gutter={[32, 16]}>


                {renderCards}

                {/*��ü�� 24������*/}
                <Col key={index} lg={6} md={8} xs={24}>
                    <a href={`/video/post/${video._id}`}>
                        <div style={{ position: 'relative' }}>
                            <img style={{ width: '100%' }} src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail" />
                            <div className="duration">
                                <span>{minutes} : {seconds}</span>
                            </div>
                        </div>
                    </a>
                    <br />

                    <Meta
                        avater={
                            <Avator src={video.writer.image} />
                        }
                        title={video.title}
                        description=""
                    />
                    <span>{video.write.name}</span>
                    <br />
                    <span style={{ marginLeft: '3rem' }}>{video.views} views</span> - 
                    

                </Col>

            </Row>
    
        </div>
       
    )
}

export default LandingPage
