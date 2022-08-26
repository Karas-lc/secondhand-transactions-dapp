import NavigationBar from "../components/NavivationBar";
import React, {useEffect, useRef, useState} from "react";
import Box from "@mui/material/Box";
import {Button, message, Upload} from "antd";
import Web3 from "web3";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import { create, CID, IPFSHTTPClient } from "ipfs-http-client";
import {useWeb3} from "@openzeppelin/network/lib/react";
var react_1 = require("react");
// var ipfs_http_client_1 = require("ipfs-http-client");
const infuraProjectId = '2Dqfuw4lxAJbkviO7vv2pGAtaSn';
const infuraProjectSecret = '96e52de36d0828f5b257be9b9c46985c';
const authorization = "Basic " + btoa(infuraProjectId + ":" + infuraProjectSecret);
function publishPage() {
    // const [images, setImages] = React.useState<{ cid: CID;path: string }[]>([]);
    // const imageData = React.useState([]);
    // const images = imageData[0];
    // const setImages = imageData[1];
    //
    // let ipfs: IPFSHTTPClient | undefined;
    // try {
    //     ipfs = create({
    //         url: "https://ipfs.infura.io:5001/api/v0",
    //         headers: {
    //             authorization,
    //         },
    //     });
    // } catch (error) {
    //     console.error("IPFS error ", error);
    //     ipfs = undefined;
    // }
    // const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     const form = event.target as HTMLFormElement;
    //     const files = (form[0] as HTMLInputElement).files;
    //
    //     if (!files || files.length === 0) {
    //         return alert("No files selected");
    //     }
    //
    //     const file = files[0];
    //     // upload Files
    //     const result = await (ipfs as IPFSHTTPClient).add(file);
    //
    //
    //     // @ts-ignore
    //     setImages(uniqueImages);
    //
    //     form.reset();
    // };
    //
    // console.log("images ", images);
    var _this = this;
    var _a = React.useState([]), images = _a[0], setImages = _a[1];
    let ipfs: IPFSHTTPClient | undefined;
    try {
        ipfs = create({
            url: "https://ipfs.infura.io:5001/api/v0",
            headers: {
                authorization: authorization
            }
        });
    }
    catch (error) {
        console.error("IPFS error ", error);
        ipfs = undefined;
    }
    /**
     * @description event handler that uploads the file selected by the user
     */
    var onSubmitHandler = function (event) { return __awaiter(_this, void 0, void 0, function () {
        var form, files, file, result, uniquePaths, uniqueImages;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    form = event.target;
                    files = form[0].files;
                    if (!files || files.length === 0) {
                        return [2 /*return*/, alert("No files selected")];
                    }
                    file = files[0];
                    return [4 /*yield*/, ipfs.add(file)];
                case 1:
                    result = _a.sent();
                    uniquePaths = new Set(__spreadArray(__spreadArray([], images.map(function (image) { return image.path; }), true), [
                        result.path,
                    ], false));
                    uniqueImages = __spreadArray([], uniquePaths.values(), true).map(function (path) {
                        return __spreadArray(__spreadArray([], images, true), [
                            {
                                cid: result.cid,
                                path: result.path
                            },
                        ], false).find(function (image) { return image.path === path; });
                    });
                    // @ts-ignore
                    setImages(uniqueImages);
                    form.reset();
                    return [2 /*return*/];
            }
        });
    }); };
    console.log("images ", images);
    const web3Context = useWeb3(`wss://goerli.infura.io/ws/v3/${infuraProjectId}`);
    const { networkId, networkName, providerName } = web3Context;
    const [loading, setLoading] = useState(false);
    const [account, setAccount] = useState();
    const [imageUrl, setImageUrl] = useState();
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
                input_pic = info.file.originFileObj
                console.log(info.file.originFileObj)
            });
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
    function publishHandler() {

    }
    return <div id="App">
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
                <div className="App">
                    <header className="App-header">
                        {ipfs && (
                            <>
                                <p>Upload File using IPFS</p>

                                <form onSubmit={onSubmitHandler}>
                                    <input name="file" type="file" />

                                    <button type="submit">Upload File</button>
                                </form>

                                <div>
                                    {images.map((image, index) => (
                                        <img
                                            alt={`Uploaded #${index + 1}`}
                                            src={"https://ipfs.infura.io/ipfs/" + image.path}
                                            style={{ maxWidth: "400px", margin: "15px" }}
                                            key={image.cid.toString() + index}
                                        />
                                    ))}
                                </div>
                            </>
                        )}

                        {!ipfs && (
                            <p>Oh oh, Not connected to IPFS. Checkout out the logs for errors</p>
                        )}
                    </header>
                </div>
                <br/>
                <Button variant="contained" component="label" color="primary" onClick={publishHandler}>Publish</Button>
            </Box>
        </div>
    </div>
}
export default publishPage;
