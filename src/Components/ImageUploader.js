import React, { useState } from 'react';

const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('image', selectedFile);

    fetch('/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setUploadedFileUrl(data.url);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>TripoSR - Image to 3D Generation</h1>
      <h2>Add Image:</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Image</button>
      {uploadedFileUrl && (
        <p>
          Uploaded file URL: <a href={uploadedFileUrl} target="_blank">{uploadedFileUrl}</a>
        </p>
      )}
    </div>
  );
};

export default ImageUploader;