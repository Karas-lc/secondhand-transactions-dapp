import NavigationBar from "../components/NavivationBar";
import React, {useEffect, useRef, useState} from "react";
import Box from "@mui/material/Box";
import {Button, message, Upload} from "antd";
import { create as ipfsHttpClient } from "ipfs-http-client";
const infuraProjectId = '2Dqfuw4lxAJbkviO7vv2pGAtaSn';
const infuraProjectSecret = '96e52de36d0828f5b257be9b9c46985c';
const authorization = "Basic " + Buffer.from(infuraProjectId + ":" + infuraProjectSecret).toString('base64');
function publishPage() {

      const [images, setImages] = useState([])

      const ipfs = ipfsHttpClient({
            host: 'ipfs.infura.io',
            port: 5001,
            protocol: 'https',
            headers: {
                authorization: authorization,
            },
        });
      // const ipfs = ipfsHttpClient({
      //   url: "https://ipfs.infura.io:5001/api/v0",
      //   headers: {
      //     authorization
      //   }
      // })
      const onSubmitHandler = async (event) => {
        event.preventDefault();
        const form = event.target;
        const files = (form[0]).files;

        if (!files || files.length === 0) {
          return alert("No files selected");
        }

        const file = files[0];
        // upload files
        const result = await ipfs.add(file);

        setImages([
          ...images,
          {
            cid: result.cid,
            path: result.path,
          },
        ]);

        form.reset();
      };
    const input_name = useRef(null)
    const input_author = useRef(null)
    const input_price = useRef(null)
    const input_description = useRef(null)
    // let input_pic;
    // const getBase64 = (img, callback) => {
    //     const reader = new FileReader();
    //     reader.addEventListener('load', () => callback(reader.result));
    //     reader.readAsDataURL(img);
    // };
    // const beforeUpload = (file) => {
    //     const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    //
    //     if (!isJpgOrPng) {
    //         message.error('You can only upload JPG/PNG file!');
    //     }
    //
    //     const isLt2M = file.size / 1024 / 1024 < 2;
    //
    //     if (!isLt2M) {
    //         message.error('Image must smaller than 2MB!');
    //     }
    //
    //     return isJpgOrPng && isLt2M;
    // };
    // const handleChange = (info) => {
    //     if (info.file.status === 'uploading') {
    //         setLoading(true);
    //         return;
    //     }
    //
    //     if (info.file.status === 'done') {
    //         // Get this url from response in real world.
    //         getBase64(info.file.originFileObj, (url) => {
    //             setLoading(false);
    //             setImageUrl(url);
    //             input_pic = info.file.originFileObj
    //             console.log(info.file.originFileObj)
    //         });
    //     }
    // };
    // const uploadButton = (
    //     <div>
    //         {loading ? <LoadingOutlined /> : <PlusOutlined />}
    //         <div
    //             style={{
    //                 marginTop: 8,
    //             }}
    //         >
    //             Upload
    //         </div>
    //     </div>
    // );
    // return <div id="App">
    //     <div className="container">
    //         <NavigationBar />
    //         <div className="welcome">
    //             <h5>account: {account}</h5>
    //         </div>
    //         <br/>
    //         <Box
    //             component="form"
    //             sx={{
    //                 '& > :not(style)': { m: 1, width: '25ch' },
    //             }}
    //             noValidate
    //             autoComplete="off"
    //         >
    //             <p>Name:</p>
    //             <input type={"text"}  ref={input_name} />
    //             <br/>
    //             <p>Author Name:</p>
    //             <input type={"text"} ref={input_author}/>
    //             <br/>
    //             <p>Price:</p>
    //             <input type={"number"} ref={input_price}/>
    //             <br/>
    //             <p>Description:</p>
    //             <input type={"text"}  ref={input_description}/>
    //             <br/>
    //             <div className="App">
    //                 <header className="App-header">
    //                     {ipfs && (
    //                         <>
    //                             <p>Upload File using IPFS</p>
    //
    //                             <form onSubmit={onSubmitHandler}>
    //                                 <input name="file" type="file" />
    //
    //                                 <button type="submit">Upload File</button>
    //                             </form>
    //
    //                             <div>
    //                                 {images.map((image, index) => (
    //                                     <img
    //                                         alt={`Uploaded #${index + 1}`}
    //                                         src={"https://ipfs.infura.io/ipfs/" + image.path}
    //                                         style={{ maxWidth: "400px", margin: "15px" }}
    //                                         key={image.cid.toString() + index}
    //                                     />
    //                                 ))}
    //                             </div>
    //                         </>
    //                     )}
    //
    //                     {!ipfs && (
    //                         <p>Oh oh, Not connected to IPFS. Checkout out the logs for errors</p>
    //                     )}
    //                 </header>
    //             </div>
    //             <br/>
    //             <Button variant="contained" component="label" color="primary" onClick={publishHandler}>Publish</Button>
    //         </Box>
    //     </div>
    // </div>
    return     (
    <div className="App">
      {ipfs && (
        <>
          <form onSubmit={onSubmitHandler}>
            <input type="file" name="file" />
            <button type="submit">Upload file</button>
          </form>
        </>
      )}
      <div>
        {images.map((image, index) => (
          <img
            alt={`Uploaded #${index + 1}`}
            src={"https://ipfs.infura-ipfs.io/ipfs/" + image.path}
            style={{ maxWidth: "400px", margin: "15px" }}
            key={image.cid.toString() + index}
          />
        ))}
      </div>
    </div>
    )
}
export default publishPage;
