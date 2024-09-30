// components/PostWriter.js
import React, { useState } from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const TextInput = styled.div`
  height: 150px;
`;

const PostWriter = () => {
  const [content, setContent] = useState("");
  // const [image, setImage] = useState(null);
  var toolbarOptions = [
    ["bold", "italic"],
    ["link", "image"],
  ];
  let module = {
    toolbar: toolbarOptions,
  };
  const handleImageChange = (e) => {
    //setImage(e.target.files[0]);
  };
  function removeHTMLTags(str: string) {
    return str.replace(/<\/?(div|a|b|p)\b[^>]*>/gi, "");
  }
  const exactPlainText = (content: any) => {
    let plainText = "";
    let lengthContent = content.length;
    plainText = removeHTMLTags(content);
    return plainText;
  };
  const handleSubmit = () => {
    // Handle form submission, including saving content and image to the database
    console.log(content);
    let res = exactPlainText(content);
    console.log("check ", res);
  };

  return (
    <>
      <TextInput>
        <ReactQuill
          modules={module}
          theme="snow"
          value={content}
          onChange={setContent}
        />
        <button onClick={() => handleSubmit()}> submit</button>
      </TextInput>
    </>
  );
};

export default PostWriter;
