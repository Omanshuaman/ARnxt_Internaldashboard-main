import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { FaCheck } from 'react-icons/fa';
const searchurl= 'https://eh16rizdbi.execute-api.ap-south-1.amazonaws.com/production/fetchurl';
const getdimensionurl= 'https://eh16rizdbi.execute-api.ap-south-1.amazonaws.com/production/fetchdimension';
const uplodanameurl= 'https://eh16rizdbi.execute-api.ap-south-1.amazonaws.com/production/modelername';
const modelernameurl= 'https://eh16rizdbi.execute-api.ap-south-1.amazonaws.com/production/findmodeler';
const fetchmodelerdataurl= 'https://eh16rizdbi.execute-api.ap-south-1.amazonaws.com/production/fetchmodelerdata';
const updatestatuurl= 'https://eh16rizdbi.execute-api.ap-south-1.amazonaws.com/production/updatestatus';

const uploadmodelfbx= 'https://eh16rizdbi.execute-api.ap-south-1.amazonaws.com/production/uploadmodelfbx'

const urlimagesend= 'https://qt028wy4w7.execute-api.ap-south-1.amazonaws.com/default/ARnxt_models_new'
const getmodelfinaldataurl='https://eh16rizdbi.execute-api.ap-south-1.amazonaws.com/production/getfinalmodeldata'

const Modelspage = ({history}) => {

    const [userid, setUserId] = useState();

    const [urldata, setUrlData]= useState();

    const [usermodel, setUserModel] = useState();
    const [dimension, setDimension] = useState(false);
    const [dimdata, setDimData] = useState();
    const [modname, setModName]= useState();
    const [loggeduser, setLoginUser]= useState(false)
    const [assigndate, setAssignDate]= useState();
    const [merchant, setMerchant]= useState();
    const [modelerdata, setModelerData] = useState();
    const [statusvalue, setStatusValue]= useState();
    

    const [dim, setDim] = useState();
    const [len, setLen] = useState();

    const [filename, setFileName] = useState();
    const [file, setFile ] = useState();
    const [imagepreview, setImagesPreview] = useState([]);
    const [images, setImages] = useState([]);
    const [message, setMessage] = useState();
    const [fbx, setFbx] = useState();

    const [uploaded, setUploaded] = useState(false);
    const [modelerfinaldata, setModelerFinaldata] = useState()
    const [modelsdata, setModelsData] = useState([])



   console.log(fbx)
    
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
  
 




    
  const onChangefbx = e => {

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
  
const onChangeglb = e => {

  let val= document.getElementById('b2').value;
  let indx = val.lastIndexOf(".") + 1;
  let filetype = val.substr(indx, val.length).toLowerCase();
  
   if (filetype === 'rar' || filetype ==='zip') {

     
 let files = Array.from(e.target.files) 
 files.forEach(file => {
  fileToBase64(file, (err, result) => {
    if (result) {
    
      setFile(result)
      setFileName(file)
    
    

     
   
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
  
const onChangegltf = e => {

  let val= document.getElementById('b3').value;
  let indx = val.lastIndexOf(".") + 1;
  let filetype = val.substr(indx, val.length).toLowerCase();
  
   if (filetype === 'rar' || filetype ==='zip') {

     
 let files = Array.from(e.target.files) 
 files.forEach(file => {
  fileToBase64(file, (err, result) => {
    if (result) {
    
      setFile(result)
      setFileName(file)
    
    

     
   
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




    const searchHandler=(e)=>{
        e.preventDefault();
        const requestBody={
            userid: Number(userid)
        }

        axios.post(searchurl, requestBody).then(res=>{
          
          setDimension(true);
           setUrlData( res.data );

         if(roleuse === 'admin' || roleuse === 'ql'   ){
          const modbody={
            merchantid: Number(userid)
          }
          axios.post(getmodelfinaldataurl, modbody).then(res=>{
            setModelsData(res.data)
           
          if(res.data[0].modelername){
            setModelerFinaldata("assigned")
          }else{
            setModelerFinaldata("Not assigned")
          }
          }).catch(error=>{
            console.log(error)
          })

         }


       if(roleuse === 'ql'){

        const newbody={
          merchantid: Number(userid)
        }
        axios.post(fetchmodelerdataurl, newbody).then(res=>{
         
          
          setModelerData(res.data)
          
        }).then(error=>{
          console.log(error)
        })
        
       }

        }).catch(error=>{
            console.log(error)
        })

    }

    const sendfunctionglb=(val,len)=>{
    
  
         
if (filename){



       
  
      fetch(urlimagesend,{
        method:'POST',
        body: filename.name
      }).then((res)=>res.json()).then((res)=>{

     fetch(res.uploadURL, {
      method:'PUT',
      headers: {
        "ContentType": "application/json",
      
      },

      body: filename
     }).then(res=>  {


      let resnew= res.url.split('?')
      let imgurl= resnew[0]
      
          let newres= imgurl.split('.')[4]

          let yt= newres.includes('glb')

          if(yt){
           

            const reqbody={
              merchantid: merchant,
              productid: val,
              imgurl: imgurl,
              filetype: 'glb'
            }
           axios.post(uploadmodelfbx, reqbody).then(res=>{

            if(res.status === 200){
              document.getElementById('b2').value= "";
              setUploaded(true)
              document.getElementById(`${val}_glb_${len}`).style.display ='block'
              
            }
            console.log(res)
           }).catch(error=>{
            console.log(error)
           })

          }
          else{
            setMessage('please upload .glb file')
            setTimeout(()=>{
              setMessage('')
            },3000)
          
          }
          
    
      
     })

      })
    }
    else{
      setMessage('please select file')
      setTimeout(()=>{
        setMessage('')
      },3000)
    }
        

      }
      const sendfunctiongltf=(val,ind)=>{
    
  console.log(ind)
         
       if(filename){

     

       
       
  
        fetch(urlimagesend,{
          method:'POST',
          body: filename.name
        }).then((res)=>res.json()).then((res)=>{
  
       fetch(res.uploadURL, {
        method:'PUT',
        headers: {
          "ContentType": "application/json",
        
        },
  
        body: filename
       }).then(res=>  {
  
  
        let resnew= res.url.split('?')
        let imgurl= resnew[0]
        
            let newres= imgurl.split('.')[4]

            console.log(newres)
  
            let yt= newres.includes('gltf')

            if(yt){
             

              const reqbody={
                merchantid: merchant,
                productid: val,
                imgurl: imgurl,
                filetype: 'gltf'
              }
             axios.post(uploadmodelfbx, reqbody).then(res=>{

              if(res.status === 200){
                document.getElementById('b3').value= "";
                setUploaded(true)
                document.getElementById(`${val}_gltf_${ind}`).style.display ='block'
                
              }
              console.log(res)
             }).catch(error=>{
              console.log(error)
             })

            }
            else{
              setMessage('please upload .gltf file')
              setTimeout(()=>{
                setMessage('')
              },3000)
            }
            
      
        
       })
  
        })

      } else{
        setMessage('please select file')
        setTimeout(()=>{
          setMessage('')
        },3000)
      }
          
  
        }



    const sendfunctionfbx=(val, len)=>{
    
  
         if(filename){

         

       
  
        fetch(urlimagesend,{
          method:'POST',
          body: filename.name
        }).then((res)=>res.json()).then((res)=>{
  
       fetch(res.uploadURL, {
        method:'PUT',
        headers: {
          "ContentType": "application/json",
        
        },
  
        body: filename
       }).then(res=>  {
  
  
        let resnew= res.url.split('?')
        let imgurl= resnew[0]
        
            let newres= imgurl.split('.')[4]
  
            let yt= newres.includes('fbx')

            if(yt){
             

              const reqbody={
                merchantid: merchant,
                productid: val,
                imgurl: imgurl,
                filetype: 'fbx'
              }
             axios.post(uploadmodelfbx, reqbody).then(res=>{
              if(res.status === 200){
                document.getElementById('b1').value= "";
                setUploaded(true)
                document.getElementById(`${val}_fbx_${len}`).style.display ='block'
                
              }
            
             }).catch(error=>{
              console.log(error)
             })

            }
            else{
              setMessage('please upload .fbx file')
              setTimeout(()=>{
                setMessage('')
              },3000)
            
            }
            
      
        
       })
  
        })
      }
      else{
        setMessage('please select file')
        setTimeout(()=>{
          setMessage('')
        },3000)
      }
          
  
        }


const nameHandler=(e)=>{

  e.preventDefault();
  setname();

}



  async function setname(){
  
  
if(result){



  

  for (let k=0; k<result.length ; k++){
  
      const body={
        merchant_Id: Number(userid),
        product_Id: result[k].product_Id,
        modelername: modname,
        modelstatus: 'accepted'
      }

    await  axios.post(uplodanameurl, body).then(res=>{
        console.log(res)
      }).catch(error=>{
        console.log(error)
      })
  
  }
}

  }
 





    let result;
    let newres;
    let length;
    let breadth;
    let height;
    let lenres;
    let breres;
    let heightres;
    let regtime;
    let regres;
    let assigndatefinal;
    let modelernameres;
    let regtimedata;
    let regtimedatares;

  
if(modelerdata){
assigndatefinal=  Object.values(modelerdata.reduce((r, {product_Id,modelername}) => {
  r[product_Id] = r[product_Id] || {product_Id,modelername: []};
  r[product_Id].modelername = r[product_Id].modelername.concat(Array.isArray(modelername) ? product_Id : [modelername]); 
  return r;
  
 
}, {}));

}
if(assigndatefinal){

  modelernameres=  assigndatefinal.map(item=>{
    return item.modelername
  })
}

  
if(modelerdata){
  regtimedata=  Object.values(modelerdata.reduce((r, {product_Id,registration_time}) => {
    r[product_Id] = r[product_Id] || {product_Id,registration_time: []};
    r[product_Id].registration_time = r[product_Id].registration_time.concat(Array.isArray(registration_time) ? product_Id : [registration_time]); 
    return r;
    
   
  }, {}));
  
  }
  if(regtimedata){
  
    regtimedatares=  regtimedata.map(item=>{
      return item.registration_time
    })
  }
  


    
    if(urldata){
      regtime=   Object.values(urldata.reduce((r, {product_Id,registration_time}) => {
             r[product_Id] = r[product_Id] || {product_Id,registration_time: []};
             r[product_Id].registration_time = r[product_Id].registration_time.concat(Array.isArray(registration_time) ? product_Id : [registration_time]); 
             return r;
             
            
           }, {}));
 

         
           
     }

    
    

      if(urldata){
         result=   Object.values(urldata.reduce((c, {product_Id,imgurl}) => {
                c[product_Id] = c[product_Id] || {product_Id,imgurl: []};
                c[product_Id].imgurl = c[product_Id].imgurl.concat(Array.isArray(imgurl) ? product_Id : [imgurl]); 
                return c;
                
               
              }, {}));
    

            
              
        }
        console.log(result)

        if(urldata){
          length=   Object.values(urldata.reduce((d, {product_Id,imagelength}) => {
            d[product_Id] = d[product_Id] || {product_Id,imagelength: []};
            d[product_Id].imagelength = d[product_Id].imagelength.concat(Array.isArray(imagelength) ? product_Id : [imagelength]); 
            return d;
            
           
          }, {}));
        }

        if(urldata){
          breadth=   Object.values(urldata.reduce((e, {product_Id,imagebreadth}) => {
            e[product_Id] = e[product_Id] || {product_Id,imagebreadth: []};
            e[product_Id].imagebreadth = e[product_Id].imagebreadth.concat(Array.isArray(imagebreadth) ? product_Id : [imagebreadth]); 
            return e;
            
           
          }, {}));
        }
        if(urldata){
          height=   Object.values(urldata.reduce((f, {product_Id,imageheight}) => {
            f[product_Id] = f[product_Id] || {product_Id,imageheight: []};
            f[product_Id].imageheight = f[product_Id].imageheight.concat(Array.isArray(imageheight) ? product_Id : [imageheight]); 
            return f;
            
           
          }, {}));
        }



      

    if(result){
        
         
         newres= result.map((item,i)=>{
            
        
            return item.imgurl
             
          })

      
            
    }


    let imgresnew;
if (newres){
   imgresnew=  newres.map(item=>{
      return item
  })
}
  
    if(length){
        
         
      lenres= length.map(item=>{
         
          
         return item.imagelength[0]
          
       })
         
 }

 if(regtime){
  regres= regtime.map(item=>{
    return item.registration_time[0]
  })

 }

 if(breadth){
        
         
  breres= breadth.map(item=>{
     
      
     return item.imagebreadth[0]
      
   })
     
}
if(height){
        
         
  heightres= height.map(item=>{
     
      
     return item.imageheight[0]
      
   })
     
}
  
  
 
   let newarr=[]; 
   let arrlatest=[];
  useEffect(()=>{


     
 },[])

  


 const userdata= sessionStorage.getItem('user')
 let useremail= JSON.parse(userdata)
  let loginuser= useremail.email
  let roleuse= useremail.role


if(roleuse === 'user'){

  const emailbody={
    email: loginuser
  }
  axios.post(modelernameurl, emailbody ).then(res=>{
    setMerchant( res.data[0].merchant_Id);
    setLoginUser(true)
  
    
  }).catch(error=>{
    console.log(error)
  })
}


useEffect(()=>{

  

  
  if(loginuser){
  const sbody={
    userid: Number(merchant)
  }
  axios.post(searchurl, sbody).then(res=>{
  
    setUrlData(res.data)
  }).catch(error=>{
    console.log(error)
  })

  const bodymer={
    merchantid: Number(merchant)
    
  }
  axios.post(getmodelfinaldataurl, bodymer).then(res=>{
    setModelsData(res.data)
  }).catch(error=>{
    console.log(error)
  })
  }
},[loginuser,merchant])

const logoutHandler=(e)=>{
  e.preventDefault();
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('token');
  history.push('/')

}


const statussubmitHandler= (val)=>{

  const mbody={
    userid: Number(userid),
    productid: val,
    statusvalue: statusvalue
  }
  axios.post(updatestatuurl, mbody).then(res=>{
    console.log(res)
  }).catch(error=>{
    console.log(error)
  })
}



if(roleuse === 'ql'){


  return (
    <div>
        <div className='homepage' >

            <div className='inputdiv' >
                <div className='inputdiv' >
                <input  type='number'  onChange={event=> setUserId(event.target.value)} />


                </div>
                <div className='search'>
                    <button style={{width:'120px', height:'50px', marginTop:'20px'}}
                    onClick={searchHandler}
                    >Search</button>
                </div>
                <div className='search'>
                    <button style={{width:'120px', height:'50px', marginTop:'20px', marginLeft:'40px'}}
                    onClick={logoutHandler}
                    >Logout</button>
                </div>

            </div>

            <div>
                           
            </div>

            <div className='urldiv' >
             <div className='urldiv1' >
                <p>merchantid</p>
                <p>{userid} {merchant && merchant} </p>

             </div>
             <div className='urldiv2'>
                <div>
                    <p  >productid</p>
                </div>

            
                {
                    result &&
                    result.map((item,i)=>(
                    
                     
                    <div style={{
                     height:'120px', marginBottom:'40px', margin:'10px'}} 
                     
                   id={""} value={""} >{""}

                   <p  style={{marginTop:'30px'}} id={i} value={item.product_Id} >{item.product_Id}</p>
                    </div>

                    ))
                }
       

             </div>
             <div className='urldiv3'>
                <div>
                    <p>image url</p>
                </div>
          
                <div  >

{/*
{newres && newres.map((item,i)=>(
<p ><a className='linkimage' href={item[1]} >{item[1]}</a></p>
))}
*/}
<div  >

</div>
<div       >





{



imgresnew && imgresnew.map(item=>(


  
<div style={{border:'1px solid blue',height:'120px', marginBottom:'40px', margin:'10px', overflowY:'scroll'}}>
 

  
 
  
  {item.map(it=>(


  <p style={{fontSize:'10px'}} ><a href={it}>{it}</a></p>



  
))

  


  }
 


 </div>

)
)}





</div>

</div>
                 
                   
         
            </div>
            <div className='urldiv4'>
              <p>length</p>
                 <div  className='dimdiv'> 

                 {
                  lenres && lenres.map(item=>(
                     <p>{item}</p>
                   
                  ))
                 }
                
              

               

                

                 </div>
                

                </div>
                <div className='urldiv5'>
                  <p>breadth</p>

                  <div  className='dimdiv'> 

                 {
                  breres && breres.map(item=>(
                      <p>{item}</p>
  
                        ))
                      }







</div>
                </div>
                <div className='urldiv6'>
                  <p>height</p>
                  <div  className='dimdiv'> 

                        {
                        heightres && heightres.map(item=>(
                        <p>{item}</p>
  
                          ))
                         }







                       </div>
                </div>
                <div className='urldiv7' >
                  <p>fbx</p>

                  {
                    modelsdata && modelsdata.map(item=>(
                      <p style={{fontSize:'6px', paddingBottom:'40px'}}><a href={item.fbx} >{item.fbx}</a></p>
                    ))
                  }
                  
                </div>
                <div className='urldiv7' >
                  <p>glb</p>
                  {
                    modelsdata && modelsdata.map(item=>(
                      <p style={{fontSize:'6px', paddingBottom:'40px'}}><a href={item.glb} >{item.glb}</a></p>
                    ))
                  }
                  
                </div>
                <div className='urldiv7' >
                  <p>gltf</p>
                  {
                    modelsdata && modelsdata.map(item=>(
                    
                        <p style={{fontSize:'6px', paddingBottom:'40px'}} ><a  href={item.gltf} >{item.gltf}</a></p>
                     
                      
                    ))
                  }
                  
                </div>
                <div className='urldiv7'>
                  <p>created date</p>
                  {
                    regres && regres.map(item=>(
                      <p  style={{marginBottom:'50px'}}>{item.split(' ').slice(0,4).join(' ')}</p>
                    ))
                  }

                </div>
                <div className='urldiv8'>
                  <p>assigned date</p>
                  { 
                  regtimedatares &&
  regtimedatares.map(item=>(
   <p>{item[0].split(' ').slice(0,4).join(' ')}</p> 
  ))
}

                </div>
                <div className='urldiv8'> 
                <p>Modeler</p>
                {modelernameres && modelernameres[0]}
            

                </div>
                <div className='urldiv8'> 
                <p>status</p>

                {
                    result &&
                    result.map((item,i)=>(
                    

                    <p id={i} value={item.product_Id} >

                        <select onChange={event=>setStatusValue(event.target.value)} >
                  <option></option>
                <option value='accepted' >Accepted</option>
                <option value='rejected'>Rejected</option>
                </select>
              
                 <button  onClick={()=>statussubmitHandler(item.product_Id)}>submit</button>



                    </p>

                    ))
                }

              

                </div>
                <div className='urldiv8'> 
                <p>Verified data</p>

                </div>

          
          
            

            


            </div>

        </div>


      
    </div>
  )
  




}



if(roleuse === 'admin'){


  
  return (
    <div>
        <div className='homepage' >

            <div className='inputdiv' >
                <div className='inputdiv' >
                <input  type='number'  onChange={event=> setUserId(event.target.value)} />


                </div>
                <div className='search'>
                    <button style={{width:'120px', height:'50px', marginTop:'20px'}}
                    onClick={searchHandler}
                    >Search</button>
                </div>
                <div className='search'>
                    <button style={{width:'120px', height:'50px', marginTop:'20px', marginLeft:'40px'}}
                    onClick={logoutHandler}
                    >Logout</button>
                </div>

            </div>

            <div>
                           
            </div>

            <div className='urldiv' >
             <div className='urldiv1' >
                <p>merchantid</p>
                <p>{userid} {merchant && merchant} </p>

             </div>
             <div className='urldiv2'>
                <div>
                    <p  >productid</p>
                </div>

                {
                    result &&
                    result.map((item,i)=>(
                    
                     
                    <div style={{
                     height:'120px', marginBottom:'40px', margin:'10px'}} 
                     
                   id={""} value={""} >{""}

                   <p  style={{marginTop:'30px'}} id={i} value={item.product_Id} >{item.product_Id}</p>
                    </div>

                    ))
                }

          
       

             </div>
             <div className='urldiv3'>
                <div>
                    <p>image url</p>
                </div>
          
                    <div  >

                      {/*
                    {newres && newres.map((item,i)=>(
                      <p ><a className='linkimage' href={item[1]} >{item[1]}</a></p>
                    ))}
                    */}
                    <div  >

                    </div>
                    <div       >

                    
             
                     
                 
                    {
                   
                  
                  
                    imgresnew && imgresnew.map(item=>(

                     
                        
                      <div style={{border:'1px solid blue',height:'120px', marginBottom:'40px', margin:'10px', overflowY:'scroll'}}>
                       

                        
                       
                        
                        {item.map(it=>(
                    

                        <p style={{fontSize:'10px'}} ><a href={it}>{it}</a></p>
                    
                      

                        
                      ))
                     
                        
                      
                      
                        }
                       
                    
                      
                       </div>
                    
                    )
                    )}

                     

                

                    </div>
                 
                    </div>
         
            </div>
            <div className='urldiv4'>
              <p>length</p>
                 <div  className='dimdiv'> 

                 {
                  lenres && lenres.map(item=>(
                     <p>{item}</p>
                   
                  ))
                 }
                
              

               

                

                 </div>
                

                </div>
                <div className='urldiv5'>
                  <p>breadth</p>

                  <div  className='dimdiv'> 

                 {
                  breres && breres.map(item=>(
                      <p>{item}</p>
  
                        ))
                      }







</div>
                </div>
                <div className='urldiv6'>
                  <p>height</p>
                  <div  className='dimdiv'> 

                        {
                        heightres && heightres.map(item=>(
                        <p>{item}</p>
  
                          ))
                         }







                       </div>
                </div>
                <div className='urldiv7'>
                  <p>created date</p>
                  {
                    regres && regres.map(item=>(
                      <p  style={{marginBottom:'50px'}}>{item.split(' ').slice(0,4).join(' ')}</p>
                    ))
                  }

                </div>
                <div className='urldiv8'> 
                <p>Modeler</p>

                <select onChange={event=>setModName(event.target.value)} >
                  <option></option>
                  <option value='modeler1@arnxt.com' >modeler1</option>
                  <option value='anil@arnxt.com' >modeler2</option>

                  <option value='modeler3@arnxt.com' >modeler3</option>

                  <option value='modeler4@arnxt.com' >modeler4</option>

                </select>
                <button  onClick={nameHandler} style={{marginLeft:'20px'}} >Submit</button>

                </div>
                <div className='urldiv8'> 
                <p>status</p>

                {modelerfinaldata && <p>{modelerfinaldata}</p>}
                   
              


                </div>
             

          
          
            

            


            </div>

        </div>


      
    </div>
  )
  





}


if(loggeduser){



  return (
    <div>
        <div className='homepage' >

            <div className='inputdiv' >
                <div className='inputdiv' >
                <input  type='number'  onChange={event=> setUserId(event.target.value)} />


                </div>
                <div className='search'>
                    <button style={{width:'120px', height:'50px', marginTop:'20px'}}
                    onClick={searchHandler}
                    >Search</button>
                </div>

                <div className='search'>
                    <button style={{width:'120px', height:'50px', marginTop:'20px', marginLeft:'40px'}}
                    onClick={logoutHandler}
                    >Logout</button>
                </div>
              

            </div>

            <div>
                           
            </div>

            <div className='urldiv' >
             <div className='urldiv1' >
                <p>merchantid</p>
                <p>{userid} {merchant && merchant} </p>

             </div>
             <div className='urldiv2'>
                <div>
                    <p  >productid</p>
                </div>

          
                {
                    result &&
                    result.map((item,i)=>(
                    
                     
                    <div style={{
                     height:'120px', marginBottom:'40px', margin:'10px'}} 
                     
                   id={""} value={""} >{""}

                   <p  style={{marginTop:'30px'}} id={i} value={item.product_Id} >{item.product_Id}</p>
                    </div>

                    ))
                }
          
       

             </div>
             <div className='urldiv3'>
                <div>
                    <p>image url</p>
                </div>
          
                <div  >

{/*
{newres && newres.map((item,i)=>(
<p ><a className='linkimage' href={item[1]} >{item[1]}</a></p>
))}
*/}
<div  >

</div>
<div       >





{



imgresnew && imgresnew.map(item=>(


  
<div style={{border:'1px solid blue',height:'120px', marginBottom:'40px', margin:'10px', overflowY:'scroll'}}>
 

  
 
  
  {item.map(it=>(


  <p style={{fontSize:'10px'}} ><a href={it}>{it}</a></p>



  
))

  


  }
 


 </div>

)
)}





</div>

</div>
                   
         
            </div>
            <div className='urldiv4'>
              <p>length</p>
                 <div  className='dimdiv'> 

                 {
                  lenres && lenres.map(item=>(
                     <p>{item}</p>
                   
                  ))
                 }
                
              

               

                

                 </div>
                

                </div>
                <div className='urldiv5'>
                  <p>breadth</p>

                  <div  className='dimdiv'> 

                 {
                  breres && breres.map(item=>(
                      <p>{item}</p>
  
                        ))
                      }







</div>
                </div>
                <div className='urldiv6'>
                  <p>height</p>
                  <div  className='dimdiv'> 

                        {
                        heightres && heightres.map(item=>(
                        <p>{item}</p>
  
                          ))
                         }







                       </div>
                </div>
                <div className='urldiv7'>
                  <p>created date</p>
                  {
                    regres && regres.map(item=>(
                      <p  style={{marginBottom:'50px'}}>{item.split(' ').slice(0,4).join(' ')}</p>
                    ))
                  }

                </div>
          
                <div className='urldiv8'> 
                <p>status</p>
                {
                  modelsdata && modelsdata.map(item=>(
                    <p>{item.statusmod}</p>
                  ))
                }
              
              


                </div>
                <div className='urldiv8'>
                  <p>model (fbx)  </p>

                  <input type='file' id='b1' onChange={onChangefbx} /> 
                  {
                    result &&
                    result.map((item,i)=>(
                    
                   <div className='modelscontainer' >

                     <p>    <button   className='btnuploadmodel' id={i} value={item.product_Id}  onClick={()=>sendfunctionfbx(item.product_Id,i)} >upload prod {i+1} 
                 
                 
                 </button>
                 {  <span id={`${item.product_Id}_fbx_${i}`}  className='tickmarkfbx' ><FaCheck/></span>  }
                
              
                </p> 

                   </div> 
                
                   
                     
                    ))
                }

                    <p>{message &&  <p> {message} </p> }</p>
                </div>
                <div className='urldiv8'>
                  <p>model (glb)  </p>
                  <input type='file' id='b2' onChange={onChangeglb} /> 
                  {
                    result &&
                    result.map((item,i)=>(
                    
                    
                 <p>    <button    className='btnuploadmodel' id={i} value={item.product_Id}  onClick={()=>sendfunctionglb(item.product_Id,i)} >upload prod {i+1}</button>
                 
                 {  <span id={`${item.product_Id}_glb_${i}`}  className='tickmarkglb' ><FaCheck/></span>  }
                 </p> 

               

                    ))
                }
                       <p>{message &&  <p> {message} </p> }</p>
                </div>
                <div className='urldiv8'>
                  <p>model (gltf) </p>

                  <input type='file' id='b3' onChange={onChangegltf} /> 
                  {
                    result &&
                    result.map((item,i)=>(
                    
                    
                 <p>    <button  className='btnuploadmodel' id={i} value={item.product_Id }  onClick={()=>sendfunctiongltf(item.product_Id, i)} >upload prod {i+1} </button>
                 
                 {  <span id={`${item.product_Id}_gltf_${i}`}  className='tickmarkgltf' ><FaCheck/></span>  }
                 </p> 

                 

                    ))
                }
                 <p>{message &&  <p> {message} </p> }</p>

                </div>
                <div className='urldiv8'> 
                <p>Verified data</p>

                </div>

          
          
            

            


            </div>

        </div>


      
    </div>
  )
  
}



 
}

export default Modelspage
