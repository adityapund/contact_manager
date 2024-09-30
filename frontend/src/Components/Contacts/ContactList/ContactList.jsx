import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ContactServices } from '../../../Services/ContactServices';
import { Spinner } from '../../Asset/Spinner';

export const ContactList = () => {

    const [query, setQuery] = useState({
        text: ""
    });

    const [state, setState] = useState({
        loading: true,
        contacts: [],
        filteredContacts: [],
        errorMessage: ""
    });

    // Fetch all contacts on component mount
    useEffect(() => {
        let promise = new Promise((res, rej) => {
            setState({...state, loading: true, contacts: []});
            let response = ContactServices.getAllContacts();
            res(response);
        });
        promise.then((res) => {
            setState({...state, loading: false, contacts: res.data, filteredContacts: res.data});
        }).catch(() => {
            setState({...state, loading: false, errorMessage: alert("Data not found!!!")});
        });
    }, []);

    let { loading, contacts, filteredContacts } = state;

    // Delete contact
    let clickDelete = (contactId) => {
        let promise = new Promise((res, rej) => {
            let deleteContact = ContactServices.deleteContact(contactId);
            res(deleteContact);
        });
        promise.then((res1) => {
            if (res1) {
                let promise = new Promise((res, rej) => {
                    setState({...state, loading: true, contacts: []});
                    let response = ContactServices.getAllContacts();
                    res(response);
                });
                promise.then((res1) => {
                    setState({...state, loading: false, contacts: res1.data, filteredContacts: res1.data});
                }).catch(() => {
                    setState({...state, loading: false, errorMessage: alert("Data not found!!!")});
                });
            }
        });
    };

    // Search contacts by name or mobile number
    let searchContacts = (event) => {
        setQuery({...query, text: event.target.value});

        // Updated filtering logic to search by name or mobile number
        let theContacts = state.contacts.filter((contact) => {
            return (
                contact.name.toLowerCase().includes(event.target.value.toLowerCase()) || 
                contact.mobile.includes(event.target.value) // Search for the mobile number
            );
        });

        setState({...state, filteredContacts: theContacts});
    };

    return (
        <>
            {/* <pre>{JSON.stringify(contacts)}</pre> */}
            <section className='contact-search'>
                <div className='container p-3'>
                    <div className='grid'>
                        <div className='row '>
                            <div className='col '>
                                <p className='h3  '>Contact Manager 
                                    <Link to={'/contacts/add'} className='btn btn-primary d-inline-block ms-3'>
                                        <i className='fa fa-plus-circle'/> New 
                                    </Link>
                                </p>
                                <p className='fst-italic'>
                                "Manage and organize all your contacts in one place at Contact Manager!"</p>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-6'>
                                <form action='' className='row'>
                                    <div className='col'>
                                        <div className='mb-2'>
                                            <input type='text' onChange={searchContacts} value={query.text} placeholder='Search Names or Mobile Numbers' className='form-control'/>
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className='mb-2'>
                                            <button type='submit' value='search' className='btn btn-primary btn-outline-dark text-light'> Search</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {loading ? <Spinner /> : (
                <React.Fragment>
                    <section className='contact-list'>
                        <div className='container'>
                            <div className='row'>
                                {filteredContacts.length > 0 && filteredContacts.map((contact) => {
                                    return (
                                        <div className='col-md-6 mb-4' key={contact.id}>
                                            <div className='card d-flex justify-content-around'>
                                                <div className='card-body'>
                                                    <div className='row d-flex align-items-md-center'>
                                                        <div className='col-md-4 d-flex justify-content-sm-center'>
                                                            <img src={contact.photo ? contact.photo : 'https://w7.pngwing.com/pngs/589/83/png-transparent-account-avatar-contact-people-profile-user-basic-icon.png'} className='contact-img mx-auto' alt='img' />
                                                        </div>
                                                        <div className='col-md-7 my-1'>
                                                            <ul className='list-group'>
                                                                <li className='list-group-item list-group-item-action'>Name: {contact.name}</li>
                                                                <li className='list-group-item list-group-item-action'>Mobile: {contact.mobile}</li>
                                                                <li className='list-group-item list-group-item-action'>Email: {contact.email}</li>
                                                            </ul>
                                                        </div>
                                                        <div className='col-md-1 d-flex flex-md-column align-items-center justify-content-sm-center'>
                                                            <Link to={`/contacts/view/${contact.id}`} className='btn btn-warning my-1'>
                                                                <i className='fa fa-eye' />
                                                            </Link>
                                                            <Link to={`/contacts/edit/${contact.id}`} className='btn btn-primary my-1'>
                                                                <i className='fa fa-pen' />
                                                            </Link>
                                                            <button className='btn btn-danger my-1' onClick={() => clickDelete(contact.id)}>
                                                                <i className='fa fa-trash' />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </section>
                </React.Fragment>
            )}
        </>
    );
};
