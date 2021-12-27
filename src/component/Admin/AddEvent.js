import React, { useState } from "react";
import "./Admin.css";
import { useForm } from "react-hook-form";
import fileImage from "../../logos/cloud-upload-outline 1.png";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";



const AddEvent = () => {
  
  const { register, handleSubmit } = useForm();
  const [imageUrl, setImageUrl] = useState();
  
  const navigate = useNavigate()

  const onSubmit = data => {
    const loading = toast.loading('Please wait...',
    {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      }
    });
    const EventData = {
      name: data.name,
      image: imageUrl
    }
    console.log(EventData);
    fetch('http://localhost:5000/addEvent',{
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(EventData)
    })
    .then(res => res.json())
    .then(data => {
      toast.dismiss(loading);
      toast.success('Successfully add Event',
      {
        style: {
          borderRadius: '10px',
          background: 'green',
          color: '#fff',
        },
      })
      navigate('/home')
    })
  };

  const handleImageChange =(event) => {
    const loading = toast.loading('Please wait...',
    {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      }
    });
    const image = (event.target.files[0])
    const imageData = new FormData();
    imageData.set('key', '8c117ceca2577d9d45a40223e7919583');
    imageData.append('image', image);
    axios.post('https://api.imgbb.com/1/upload', imageData)
    
    
    .then(function (response) {
      
      setImageUrl(response.data.data.display_url);
      toast.dismiss(loading);
      toast.success('Image Upload Successfully',
      {
        style: {
          borderRadius: '10px',
          background: 'green',
          color: '#fff',
        },
      })
    })
    .catch(function (error) {
      console.log(error);
      toast.dismiss(loading);
    });
  }




  return (
    <div className="card">
      <form className="container" onSubmit={handleSubmit(onSubmit)}>
        <div className="row formStyle">
          <div className="col-md-6 ">
            <h5>Event Title</h5>
            <input
              defaultValue=""
              placeholder="Enter title"
              {...register("name")}
            />
          </div>

          <div className="col-md-6">
            <div className="image-upload">
              <label htmlFor="file-input">
                <img src={fileImage} alt="" />
                <span>Upload image</span>
              </label>
              <input onChange={handleImageChange} id="file-input" type="file" />
            </div>
          </div>

          {/* <div className="col-md-6">
            <h5>Description</h5>
            <textarea
              placeholder="Description"
              {...register("description")}
            ></textarea>
          </div> */}

          <div className="col-md-6 mt-5 pt-3">
            <input className="s-btn" type="submit" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddEvent;
