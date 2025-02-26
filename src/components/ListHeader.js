import React, { useState } from 'react'
import Modal from './Modal'
import { useCookies } from 'react-cookie'

const ListHeader = ({listname, getData}) => {
  const [cookie, setCookie, removeCookie] = useCookies(null)

    const [showModal, setShowModal] = useState(false)

  const signOut = () => {
    console.log('sign out')
    removeCookie('Email')
    removeCookie('AuthToken')
    window.location.reload()
  }
  
  return (
    <div className='list-header'>
      <h1>{listname}</h1>
      <div className='button-container'>
        <button className='create' onClick={() => setShowModal(true)} >Add New</button>
        <button className='signout' onClick={signOut}>Sign Out</button>
      </div>
      {showModal && <Modal mode={'create'} setShowModal={setShowModal} getData={getData} />}
    </div>
  )
}

export default ListHeader
