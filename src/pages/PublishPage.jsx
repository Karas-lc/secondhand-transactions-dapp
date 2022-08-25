import NavigationBar from "../components/NavivationBar";
import React, {useEffect, useRef, useState} from "react";
import Web3 from "web3";
import Box from "@mui/material/Box";
import {Button, message, Upload} from "antd"
import {LoadingOutlined, PlusOutlined, UploadOutlined} from '@ant-design/icons';
import * as pinata from "@pinata/sdk";


function PublishPage() {
    const [loading, setLoading] = useState(false);
    const [account, setAccount] = useState();
    const [imageUrl, setImageUrl] = useState();
    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };
    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }

        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }

        return isJpgOrPng && isLt2M;
    };
    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }

        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
            console.log(info.file)
            input_pic = info.file
        }
    };
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );
    useEffect(() => {
        async function load() {
            const web3 = new Web3(
                Web3.givenProvider || "http://localhost:8545"
            );
            const accounts = await web3.eth.requestAccounts();

            setAccount(accounts[0]);
        }

        load();
    }, []);
    const input_name = useRef(null)
    const input_author = useRef(null)
    const input_price = useRef(null)
    const input_description = useRef(null)
    let input_pic;
    function publishHandler() {
        const pinataSDK = require('@pinata/sdk');
        const pinata = pinataSDK('4389a831f6973c6a4dd1', 'a2a3afaf7a45705101c9f5ef5959f63af67a76de664674adc1a5a0dcd99422df');
        const fs = require('fs');
        const readableStreamForFile = fs.createReadStream(input_pic);
        const options = {
            pinataMetadata: {
                name: input_name,
                keyvalues: {
                    name: input_name.current.value,
                    price: input_price.current.value,
                    author: input_author.current.value,
                    description: input_description.current.value
                }
            },
            pinataOptions: {
                cidVersion: 0
            }
        };
        pinata.pinFileToIPFS(readableStreamForFile, options).then((result) => {
            //handle results here
            console.log(result);
        }).catch((err) => {
            //handle error here
            console.log(err);
        });
    }

    return <div id="App" >
        <div className="container">
            <NavigationBar />
            <div className="welcome">
                <h5>account: {account}</h5>
            </div>
            <br/>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <p>Name:</p>
                <input type={"text"}  ref={input_name} />
                <br/>
                <p>Author Name:</p>
                <input type={"text"} ref={input_author}/>
                <br/>
                <p>Price:</p>
                <input type={"number"} ref={input_price}/>
                <br/>
                <p>Description:</p>
                <input type={"text"}  ref={input_description}/>
                <br/>
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                >
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt="avatar"
                            style={{
                                width: '100%',
                            }}
                        />
                    ) : (
                        uploadButton
                    )}
                </Upload>
                <br/>
                <Button variant="contained" component="label" color="primary" onClick={publishHandler}>Publish</Button>
            </Box>
        </div>
    </div>
}

export default PublishPage;