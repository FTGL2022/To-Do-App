
import React from 'react'
import {useState} from "react";
import {useCookies} from'react-cookie'

const Modal = ({mode, setShowModal, getData, task}) => {
const [cookies, setCookie, removeCookie]= useCookies(null)      
const editMode = mode === 'edit' ? true : false 
    
const  [data, setData] = useState({
      useremail: editMode? task.useremail : cookies.Email,
      title: editMode? task.title : null,
      prgress:editMode? task.progress : 50,
      date: editMode? task.date : new Date(),
    })


    const postData = async (e) => {
      e.preventDefault();
      try {
        const response = await  fetch(`${process.env.REACT_APP_SERVERURL}/todos1/` , {
          method: 'POST',
          headers: {'content-type': 'application/json'},
          body: JSON.stringify(data),
        })
        if (response.status === 201) {
          console.log("WORKED")
          setShowModal(false)
          getData();
        }
      } catch (err) {
        console.error(err);
      }
    } 

    const editData = async (e) => {
      e.preventDefault();
      try{
          const response =  await fetch(`${process.env.REACT_APP_SERVERURL}/todos1/${task.id}`, {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(data),
          })
          if (response.status === 200) {
            setShowModal(false)
            getData();
          }
      } catch (err) {
        console.error(err);
      }
    }

    const handleChange = (e) => {
        console.log("changing", e)
      const {name, value} = e.target;

      setData(data => ({
        ...data,
        [name]: value,
      }))

        console.log(data)
      
    }



  return (
    <div className='overlay'>
      <div className='modal'>
        <div className='form-title-container'>
            <h3>Lets {mode} you task</h3>
            <button onClick={()=> setShowModal(false)} >X</button>
        </div>
        <form>
            <input 
            required
            maxLength={30}
            placeholder='Your task goes here'
            name='title'
            value={data.title}
            onChange={handleChange}
            />
            <br/>
            <label for="range">Drag to select your current progress</label>
            <input
            required
            type='range'
            min={"0"}
            max={"100"}
            name='progress'
            value={data.progress}
            onChange={handleChange}
            />
            <input className={mode} type='submit' onClick={editMode ? editData : postData} />
        </form>
      </div>
    </div>
  )
}

export default Modal
