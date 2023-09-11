import React, { useState, useRef } from 'react';
import './App.css';

function DragDropImageUploader() {
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  function selectFiles() {
    fileInputRef.current.click();
  }

  function onFileSelect(event) {
    const files = event.target.files;
    if (files.length === 0) return;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split('/')[0] !== 'image') continue;
      if (!images.some((e) => e.name === files[i].name)) {
        setImages((prevImages) => [
          ...prevImages,
          {
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
          },
        ]);
      }
    }
  }
  function deleteImage(index) {
    setImages((prevImages) =>
      prevImages.filter((_, i) => i !== index)
    );
  }
  function onDragOver(event) {
    event.preventDefault();
    setIsDragging(true);
    event.dataTransfer.dropEffect = "copy";
  }
  function onDragLeave(event) {
    event.preventDefault();
    setIsDragging(false);
  }
  function onDrop(event) {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split('/')[0] !== 'image') continue;
      if (!images.some((e) => e.name === files[i].name)) {
        setImages((prevImages) => [
          ...prevImages,
          {
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
          },
        ]);
      }
    }
  }
  function uploadImages() {
    console.log('Images: ', images);
  }
  return (
    <div className='flex justify-center items-center h-screen bg-[#E4F3FF]'>
      <div className='card p-4 shadow-lg rounded-md overflow-hidden min-w-[600px] bg-white'>
        <div className='top text-center'>
          <p className='font-semibold text-[#47a1ce] text-lg'>Drag & Drop Image Uploading </p>
        </div>
        <div className='drag-area h-36 p-2 rounded border-2 border-dashed
           border-[#44C0FF] text-[#868585e5] bg-blue-gray-50 flex justify-center items-center select-none mt-2 bg-[#F7FDFF]'
          onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}
        >
          {isDragging ? (
            <span className='select text-purple-800 ml-1 cursor-pointer transition duration-400  hover:opacity-60'> Drag Drop Here </span>
          ) : (
            <>
              Drag & Drop Image or{" "}
              <span className='select text-[#79c0e4] font-bold ml-1 cursor-pointer transition duration-400  hover:opacity-60' role='button' onClick={selectFiles}>
                Click Here
              </span>
            </>
          )}
          <input name='file' type='file' className='file hidden' multiple ref={fileInputRef} onChange={onFileSelect} />
        </div>
        <div className="container w-full h-auto flex justify-start items-start flex-wrap max-h-52 overflow-y-auto mt-2">
          {images.map((images, index) => (
            <div className='image w-20 mr-1 h-20 relative mb-2 p-2 rounded bg-blue-gray-50' key={index}>
              <span className='delete absolute top-[-3px] right-1 text-xl cursor-pointer z-[999] text-[#9BDEFF]' onClick={() => deleteImage(index)}>&times;</span>
              <img src={images.url} alt={images.name} className='w-full h-full rounded' />
            </div>
          ))}
        </div>
        <button className='button  outline-none  text-white rounded cursor-pointer font-semibold py-2 pr-3 pl-3 w-full bg-[#44C0FF] hover:text-[#44C0FF] hover:border hover:border-[#44C0FF] hover:bg-white' onClick={uploadImages}>
          Upload
        </button>
      </div>


    </div>

  )
}

export default DragDropImageUploader;
