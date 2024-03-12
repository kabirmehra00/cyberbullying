import React, { useState } from "react";

const UploadAndDisplayImage = (props) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className = "ImageUploader">
      {selectedImage && (
        <div>
          <img
            alt="not found"
            width={"250px"}
            src={URL.createObjectURL(selectedImage)}
          />
          <br />
          <button onClick={() => {
            setSelectedImage(null);
            props.setImageData({Image: ""})
        }}>Remove</button>
        </div>
      )}

      <br />
      <br />
      
      <input
        type="file"
        name="myImage"
        onChange={(event) => {
          //console.log(event.target.files[0]);
          setSelectedImage(event.target.files[0]);
          let reader = new FileReader() 
          reader.readAsDataURL(event.target.files[0])
          reader.onload = () => {  
            props.setImageData({Image: reader.result});
            console.log(reader.result);
          }
        }}
      />
    </div>
  );
};

export default UploadAndDisplayImage;