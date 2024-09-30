import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ContactServices } from '../../../Services/ContactServices'

export const AddContact = () => {
    let navigate = useNavigate()
    let [state, setState] = useState({
        loading:true,
        contact:{
            name:"",
            photo:"",
            mobile:"",
            email:"",
            title:"",
            company:"",
            groupId:""
        },
        errorMessage:""
    })

    const updateHandle=(event)=>{
        setState({...state,
             contact:{
            ...state.contact,
            [event.target.name]:event.target.value
        }
    })
    }

    let{loading, contact, errorMessage} = state;

    let submitHandle = (event)=>{
        event.preventDefault()
        let promise = new Promise ((res, rej)=>{
            setState({...state, loading:true})
            let postData = ContactServices.createContact(contact)
            res(postData)
        })
        promise.then((res1)=>{
            if(res1){
                setState({...state, loading:false})
                navigate("/contacts/list",{replace:true})
            }
            else{
                 setState({...state, loading:false})
                navigate("/contacts/add",{replace:false}) 
            }
        }).catch(()=>{
            setState({...state, loading:false, errorMessage:alert("data is not posted!!!")})
        })
    }

      return (
    <>

    {/* <pre>{JSON.stringify(contact)}</pre> */}
      <section className='add-contact'>
          <div className='container p-3'>
              <div className='row'>
                  <div className='col'>
                      <p className='h3 text-success fw-bold'>Create Contact</p>
                      <p className='fst-italic'>Will keep the details of your favorite person safely to us.❤️</p>
                  </div>
              </div>
              <div className='row'>
                  <div className='col-md-4'>
                      <form action='' onSubmit={submitHandle}>
                          <div className='mb-2'>
                              <input type='text' name='name' required={true} value={contact.name} onChange={updateHandle} placeholder='Name' className='form-control' />
                          </div>
                          <div className='mb-2'>
                          <input type='text' name='photo'  value={contact.photo} onChange={updateHandle} placeholder='Photo url' className='form-control' />
                          </div>
                          <div className='mb-2'>
                              <input type='number' name='mobile' required={true} value={contact.mobile} onChange={updateHandle} placeholder='Mobile' className='form-control' />
                          </div>
                          <div className='mb-2'>
                              <input type='email' name='email' required={true} value={contact.email} onChange={updateHandle} placeholder='Email' className='form-control' />
                          </div>
                          <div className='mb-2'>
                              <input type='text' name='title' required={true} value={contact.title} onChange={updateHandle} placeholder='Company Name' className='form-control' />
                          </div>
                          <div className='mb-2'>
                              <input type='text' name='company' required={true} value={contact.company} onChange={updateHandle} placeholder='Title' className='form-control' />
                          </div>
                          <div className='mb-2'>
                              {/* <input type='text' name='company' required={true} value={contact.} onChange={updateHandle} placeholder='Name' className='form-control' /> */}
                              <select name='groupId' required={true} value={contact.groupId} onChange={updateHandle} className='form-control'>
                                     <option value="">Select a Group</option>
                                     <option value="Group A">Colleague</option>
                                     <option value="Group B">Family</option>
                                     <option value="Group C">Social</option>
                                     <option value="Group D">College</option>
                                     <option value="Group E">Friends</option>
                                     <option value="Group F">Community</option>
                              </select>
                          </div>
                          <div className='mb-2'>
                              <input type='submit' value='Create' className='btn btn-success' />
                              <Link to={'/contacts/list'} className='btn btn-dark ms-2'>Cancel</Link>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      </section>
    </>
  )
}
