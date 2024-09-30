import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ContactServices } from '../../../Services/ContactServices';
import { Spinner } from '../../Asset/Spinner';

export const ViewContact = () => {
  let { contactId } = useParams();
  let [state, setState] = useState({
    loading: true,
    contact: {},
    errorMessage: ""
  });

  useEffect(() => {
    new Promise((res, rej) => {
      setState({ ...state, loading: true, contact: {} });
      let response = ContactServices.getContact(contactId);
      res(response);
    }).then((resp) => {
      setState({ ...state, loading: false, contact: resp.data });
    }).catch(() => {
      setState({ ...state, loading: false, errorMessage: alert('data not found') });
    });
  }, [contactId]);

  let { loading, contact, errorMessage } = state;

  return (
    <>
      <h2>{contactId}</h2>
      <section className="view-contact-intro">
        <div className="container p-3">
          <div className="row">
            <div className="col">
              <p className="h3 text-warning fw-bold">View Contact</p>
              <p className="fst-italic">
              You can view the contacts here.
              </p>
            </div>
          </div>
        </div>
      </section>

      {loading ? <Spinner /> : (
        <React.Fragment>
          {Object.keys(contact).length > 0 && (
            <section className="view-contact-list">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-md-2 my-2">
                    <img src={contact.photo ? contact.photo : 'https://w7.pngwing.com/pngs/589/83/png-transparent-account-avatar-contact-people-profile-user-basic-icon.png'} className='contact-img' alt='img' />
                  </div>
                </div>

                <div className="row justify-content-center my-2">
                  <div className="col-md-10">
                    <ul className="list-group">
                      <li className="list-group-item list-group-item-action">
                        Name : <span className="fw-bold">{contact.name}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Email : <span className="fw-bold">{contact.email}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Contact : <span className="fw-bold">{contact.mobile}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Company Name : <span className="fw-bold">TCS</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Title : <span className="fw-bold">Developer</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Company Group : <span className="fw-bold">Family</span>
                      </li>
                    </ul>

                    {/* Back button added in the same column, aligned to the left */}
                    <div className="d-flex justify-content-start my-2">
                      <Link to={"/"} className="btn btn-warning">
                        Back
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </React.Fragment>
      )}
    </>
  );
};
