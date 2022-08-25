import NavigationBar from "../components/NavivationBar";
import React, {useEffect, useRef, useState} from "react";
import Web3 from "web3";
import Box from "@mui/material/Box";
import {Button, message, Upload} from "antd"
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import { create } from 'ipfs-http-client';

const client = create('https://ipfs.infura.io:5001/api/v0')

function fjse() {
    const [loading, setLoading] = useState(false);
    const [account, setAccount] = useState();
    const [imageUrl, setImageUrl] = useState();
    const [fileUrl, updateFileUrl] = useState(``)
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

    async function publishHandler() {
        try {
            const added = await client.add(input_pic)
            const url = `https://ipfs.infura.io/ipfs/${added.path}`

            updateFileUrl(url)
        } catch (errot) {
            console.log('Error uploading file: ', error)
        }
    }

    return <div id="App" >
    {/*    */}
    </div>
}

export default PublishPage;