// components/PostWriter.js
import React, { useState, useRef, useContext, useEffect } from "react";
import styled from "styled-components";

import Image from "next/image";
import TextEditorPost from "../TextEditor/index";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import {
  userUpLoadPost,
  test,
  uploadAvatar,
  getUserListPost,
  getNotify,
} from "../../../api/userApi";
import { useUser } from "../../../context/Provider";
import { Button } from "antd";
import { useSocket } from "../../../context/SocketProvider";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Container = styled.div`
  max-width: 600px;
  margin: auto;
`;

const Title = styled.h1`
  font-size: 24px;
  text-align: center;
`;

const ImageInput = styled.input`
  margin: 10px 0;
`;
const Gallery = styled.div`
  height: 100px;
  display: flex;
  gap: 5px;
`;
const PostWriter = () => {
  const [content, setContent] = useState("");
  const { reconnectAfterRefresh } = useSocket();
  const [images, setImages] = useState([]);
  const { userInfo } = useUser();
  const [files, setFiles] = useState([]);
  const {
    socketInstance,
    RegisterToListenNotifyAfterCreatedPost,
    getNotifyData,
  } = useSocket();

  useEffect(() => {
    reconnectAfterRefresh();

    console.log("run here123");
  }, []);
  useEffect(() => {
    console.log("check socketinstance", socketInstance);
    if (socketInstance) {
      RegisterToListenNotifyAfterCreatedPost();
      console.log("run heere");
    }
  }, [socketInstance]);
  useEffect(() => {
    console.log("use User", userInfo);
  }, [userInfo]);

  useEffect(() => {
    if (!socketInstance) return;
    let dependency;
    const handleNotifyAfterCreatedPost = (data) => {
      console.log("There is a new post with ID:", data);
      dependency = data;
      getNotifyData(data.notifyId);
    };

    socketInstance.on(
      "notify_created_post_succeed",
      handleNotifyAfterCreatedPost
    );

    // Cleanup function to remove event listener when component unmounts
    return () => {
      socketInstance.off(
        "notify_created_post_succeed",
        handleNotifyAfterCreatedPost
      );
    };
  }, [getNotifyData]);

  var toolbarOptions = [
    ["bold", "italic"],
    ["link", "image"],
  ];
  let module = {
    toolbar: toolbarOptions,
  };
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    //setImage(e.target.files[0]);
    console.log("check", selectedFile);
    let newFiles = [...files, selectedFile];

    setFiles(newFiles);
    console.log("check files", files);
    //
    var newImages = [];
    newImages = [...images];
    newImages.push(URL.createObjectURL(e.target.files[0]));
    newImages.forEach((i, e) => {
      console.log(`check 12 ${i}`, e);
    });
    setImages(newImages);
  };

  function removeHTMLTags(str: string) {
    return str.replace(/<\/?(div|a|b|p|br)\b[^>]*>/gi, "");
  }
  const exactPlainText = (content: any) => {
    let plainText = "";
    let lengthContent = content.length;
    plainText = removeHTMLTags(content);
    //------------------------------------------------
    //*note :thuat toan nay sai , vi neu trong bai dang co noi dung la <> thi no se mat di
    //------------------------------------------------
    return plainText;
  };
  const handleSubmit = async () => {
    console.log(content);
    let res = exactPlainText(content);
    console.log("check ", res);
    console.log("check image", images);
    let postContent = new FormData();
    postContent.append("plaintext", res);
    postContent.append("content", content);
    // console.log("check userId", userInfo.id);
    // postContent.append("userId", userInfo.id);
    files.forEach((file) => {
      postContent.append("image", file);
    });
    // for (let pair of postContent.entries()) {
    //   console.log(pair[0] + ": " + pair[1]);
    // }

    let response = await userUpLoadPost(postContent);
    if (response) {
      console.log("check oke r do", response);
    }
  };
  const handleTest = async () => {
    await test();
  };
  const handleUploadAvatar = async () => {
    let avatar = new FormData();
    files.forEach((file) => {
      avatar.append("image", file);
    });
    let data = await uploadAvatar(avatar);
    if (data) {
      console.log("check data", data);
    }
  };
  const getListPost = async () => {
    let listPost = await getUserListPost();
    if (listPost) {
      console.log("check listPost", listPost);
    } else {
      console.log("nothing to display");
    }
  };
  return (
    <Container>
      <Title>Write a Post</Title>
      {/* // <TextEditorPost /> */}
      <ReactQuill
        modules={module}
        theme="snow"
        value={content}
        onChange={setContent}
      />
      <ImageInput type="file" accept="image/*" onChange={handleImageChange} />
      <Gallery>
        {images.map((image, index) => (
          //   <img key={index} src={image} alt={`Image${index}`} />
          <Image
            key={index}
            src={image}
            alt="Picture of reviewer"
            width={500}
            height={500}
          />
        ))}
      </Gallery>
      <button
        className="my-9 select-none rounded-lg bg-red-600 py-3 px-6 t
    ext-center align-middle font-sans text-xs 
    font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all 
    hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none 
    active:opacity-[0.85] active:shadow-none disabled:pointer-events-none 
    disabled:opacity-50 disabled:shadow-none"
        onClick={handleSubmit}
      >
        Upload Post
      </button>
      <div>
        ------------------------------------------------------------------
      </div>
      <Button type="primary" onClick={handleUploadAvatar}>
        upload avatar
      </Button>
      <div>------------------------------------------------------</div>
      <Button type="primary" onClick={getListPost}>
        get list post
      </Button>
    </Container>
  );
};

export default PostWriter;
