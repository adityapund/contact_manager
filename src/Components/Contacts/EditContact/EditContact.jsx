import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { ContactServices } from '../../../Services/ContactServices'


export const EditContact = () => {
    let navigate = useNavigate()
    let{contactId}=useParams()
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

    useEffect(()=>{
        let promise = new Promise((res, rej)=>{
            setState({...state, loading:true})
            let response = ContactServices.getContact(contactId);
            res(response)
        })
        promise.then((res1)=>{
            setState({...state, loading:false, contact:res1.data})
        }).catch((res1)=>{
            setState({...state, loading:false, errorMessage:alert("data is not found!!!")})
        })
    }, [contactId])

    let updateHandle=(event)=>{
        setState({...state, contact:{
            ...state.contact,
            [event.target.name]:event.target.value
        }})
    }

    let submitHandle = (event)=>{
        event.preventDefault()
        let promise = new Promise ((res, rej)=>{
            setState({...state, loading:true})
            let postData = ContactServices.updateContact(contact, contactId)
            res(postData)
        })
        promise.then((res1)=>{
            if(res1){
                setState({...state, loading:false})
                navigate("/contacts/list",{replace:true})
            }
            else{
                 setState({...state, loading:false})
                navigate("/contacts/edit",{replace:false}) 
            }
        }).catch(()=>{
            setState({...state, loading:false, errorMessage:alert("data is not posted!!!")})
        })
    }

    let{loading, contact, errorMessage} = state;
  return (
    <>
      <section className='edit-contact'>
          <div className='container p-3'>
              <div className='row'>
                  <div className='col'>
                      <p className='h3 text-success fw-bold'>Edit Contact</p>
                      <p className='fst-italic'>Update the contact details here.</p>
                  </div>
              </div>
              <div className='row align-items-center'>
                    <div className='col-md-6 '>
                            <img src={contact.photo ? contact.photo : 'https://w7.pngwing.com/pngs/589/83/png-transparent-account-avatar-contact-people-profile-user-basic-icon.png'} className='contact-img' alt='img' />
                    </div>
                  <div className='col-md-4'>
                      <form action='' onSubmit={submitHandle}>
                          <div className='mb-2'>
                              <input type='text' name='name' required={true} value={contact.name} onChange={updateHandle} placeholder='Name' className='form-control' />
                          </div>
                          <div className='mb-2'>
                              <input type='text' name='photo' required={true} value={contact.photo} onChange={updateHandle} placeholder='Photo url' className='form-control' />
                          </div>
                          <div className='mb-2'>
                              <input type='number'name='mobile' required={true} value={contact.mobile} onChange={updateHandle} placeholder='Mobile' className='form-control' />
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
                              {/* <input type='text' placeholder='Name' className='form-control' /> */}
                              <select name='company' required={true} value={contact.groupId} onChange={updateHandle} className='form-control' >
                              <option value="Group A">Colleague</option>
                              <option value="Group A">Family</option>
                              <option value="Group A">Social</option>
                              <option value="Group A">College</option>
                              <option value="Group A">Friends</option>
                              <option value="Group A">Community</option>
                              
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
