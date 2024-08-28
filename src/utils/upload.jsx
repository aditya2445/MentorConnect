import React, {useCallback, useEffect, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { FiUploadCloud } from "react-icons/fi"

function Upload({register,setValue,name,label,errors,view=null}) {
  
    const [videofile, setvideofile] = useState(
     view ? view : ""
    )
    
    const [selectedFile, setSelectedFile] = useState(null)
  const onDrop = useCallback(acceptedFiles => {
    previewFile(acceptedFiles[0])
    setSelectedFile(acceptedFiles[0])
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    accept:  {"image/*":[".jpeg",".jpg",".png",".webp"]} 
    ,
    onDrop})

    useEffect(()=>{
        register(name,{required:true})
    },[register])
    useEffect(()=>{
    setValue(name,videofile)
    },[videofile, setValue])

    const previewFile=(file)=>{
     const reader = new FileReader()
     reader.readAsDataURL(file)
     reader.onloadend = () => {
        setvideofile(reader.result)
      }
    }
  return (
    <div className=''>
    <div {...getRootProps()} className='cursor-pointer'>
        <label htmlFor={name}>{label}</label>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p></p> :
          <p></p>
      }
    {
         <div className='flex gap-x-3 items-center '>
            <img src={videofile} alt='' className='w-[80px] h-[80px] rounded-full border-[1px] object-cover'/>
            <div className='flex gap-2 border-[1px] h-fit rounded-md p-2 w-fit  items-center justify-center'><FiUploadCloud/><p>Upload photo</p></div>
         </div>
        
    }
    {
        errors[name] && (
            <span>Image is required</span>
        )
    }
    </div>
    </div>
  )
}
export default Upload