import axios from 'axios';
import React, { useState } from 'react'

const urlimagesend= 'https://qt028wy4w7.execute-api.ap-south-1.amazonaws.com/default/ARnxt_models_new'

const Upload = () => {

    const [filename, setFileName] = useState();
    const [file, setFile ] = useState();
    const [imagepreview, setImagesPreview] = useState([]);
    const [images, setImages] = useState([]);
    const [message, setMessage] = useState();



    
    
  const fileToBase64 = (file, cb) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      cb(null, reader.result)
    }
    reader.onerror = function (error) {
      cb(error, null)
    }
  }
  
 




    
  const onChange = e => {

    let val= document.getElementById('b1').value;
    let indx = val.lastIndexOf(".") + 1;
    let filetype = val.substr(indx, val.length).toLowerCase();
    
     if (filetype === 'rar' || filetype ==='zip') {

       
   let files = Array.from(e.target.files) 
   files.forEach(file => {
    fileToBase64(file, (err, result) => {
      if (result) {
      
        setFile(result)
        setFileName(file)
      
       
      fetch(urlimagesend,{
        
        method:'POST',
        body: file.name
      }).then((res)=>res.json()).then((res)=>{

     fetch(res.uploadURL, {
      method:'PUT',
      headers: {
        "ContentType": "application/json",
      
      },

      body: file
     }).then(res=>{
      let resnew= res.url.split('?')
      let imgurl= resnew[0]
      
          let newres= imgurl.split('.')[4]

          let yt= newres.includes('fbx')
            console.log(yt)
    
      
     })

      })
        

      
      
       
      }
    })
   
  
 
    
    
  
    const reader = new FileReader();

    reader.onload = () => {
        if (reader.readyState === 2) {
           
            setImagesPreview(oldArray => [...oldArray, reader.result])
            setImages(oldArray => [...oldArray, file])
        

           
            }
       
       
    }
      

    
    reader.readAsDataURL(file)
    
})











     }

     else{
      setMessage('Please upload a zip file')
      setTimeout(() => {
        setMessage('')
        
      }, 2000);
     }
  
   
   
   
}




  return (
    <div>

       <input type='file' id='b1'  onChange={onChange}   multiple/>

       <p>{message &&  <p> {message} </p> }</p>
      
    </div>
  )
}

export default Upload
