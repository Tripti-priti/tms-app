import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import ImageDialogBox from './ImageDialogBox';
import { RemoveRedEye } from '@mui/icons-material';

function MyDropzone(props) {
  const [preview, setPreview] = useState([]);
    // const [imgSrc,setImgSrc] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    debugger
    
    let images = [];
    props.setImgSrc(acceptedFiles);
    const previews = acceptedFiles.map((file) => URL.createObjectURL(file));
    setPreview(previews);
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onloadend = async () => {
        debugger;
      // Do whatever you want with the file contents
        const binaryStr = reader.result
        images = [...images,binaryStr];
        //props.setImgSrc(images);
        console.log(file)
      }
      reader.readAsDataURL(file)
    })
    
    
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
    <>
     <div style={{ marginTop: "0px",width:'100%' }}>
         
          <div style={{ marginTop: "0px",width:'100%',display:'flex',flexWrap:'wrap' }}>
          {
            // props.imgSrc && props.imgSrc.map((item,index)=>{
              preview && preview.map((item,index)=>{
              console.log(item);
              return   <div style={{ outline:'1px solid #bdbdbd',margin: "10px",width:'180px'
                ,display:'flex',alignItems:'center',flexDirection:'column',justifyContent:'space-between'
               }}>
              <img key={index}
              src={item}
              alt="Preview"
              style={{ maxWidth: "100%", maxHeight: "300px", padding: "10px" }}
            />
            <ImageDialogBox buttonName={<RemoveRedEye/>}  image={item} />
            </div>
            })
          }
          </div>
        </div>
    <div {...getRootProps()} style={{ maxWidth: "100%", maxHeight: "300px", padding: "10px" ,outline:'1px solid #bdbdbd'}}>
      <input {...getInputProps()}/>
      <p style={{color:'grey',display:'flex', justifyContent:'center',border:'1px dashed grey',padding:'15px'}}>drag and drop, or click here to select files</p>
    </div>
    </>
  )
}
export default MyDropzone;