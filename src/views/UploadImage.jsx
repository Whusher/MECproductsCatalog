// UploadImage.js
import { useState } from 'react';
import {subirImagen } from './../helpers/firebase/Config';

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [show, setShow] = useState(null);
  const [url, setUrl] = useState('');
  const [progress, setProgress] = useState(17);
  const personal = [];
  const handleIncreasing =()=>{
    personal.push(5)
    console.log(personal)
  }
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }    
  };
  const handleUpload = async() => {
    try{
      const response = await subirImagen(image,{imageType: 'JPEG'}, image.name + Date.now());
      if(response){
        console.log('CHECK THIS OUT \n', response);
        setShow(response);
      }else{
        console.log('Something Wrong');
      }
    }catch(e){
      console.log(e);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Subir Imagen</button>
      <progress value={progress} max="100" />
      {console.log(image)}
      {url && <img src={url} alt="Uploaded" />}
      <button className='bg-blue-200 p-2' onClick={()=>handleIncreasing()}>INcreasing</button>
      <img src='https://firebasestorage.googleapis.com/v0/b/partscommerce-76e41.appspot.com/o/commerceImages%2FPollito?alt=media&token=f999221b-bdfb-44e8-9b0c-dbf76591ae10' alt='polo'/>
      
    </div>
  );
};

export default UploadImage;
