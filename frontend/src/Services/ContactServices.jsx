import axios from "axios";

export class ContactServices{
    static serverURL = 'https://contacts-tau-seven.vercel.app/';
    static getAllContacts(){
        let dataURL = `${this.serverURL}/contacts`;
        return axios.get(dataURL)
    }

    static getContact(contactId){
        let dataURL = `${this.serverURL}/contacts/${contactId}`;
        return axios.get(dataURL)
    }

    static createContact(contact){
        let dataURL = `${this.serverURL}/contacts`;
        return axios.post(dataURL, contact)
    }

    
    static updateContact(contact, contactId){
        let dataURL = `${this.serverURL}/contacts/${contactId}`;
        return axios.put(dataURL, contact)
    }

    static deleteContact(contactId){
        let dataURL = `${this.serverURL}/contacts/${contactId}`;
        return axios.delete(dataURL)
    }
}
