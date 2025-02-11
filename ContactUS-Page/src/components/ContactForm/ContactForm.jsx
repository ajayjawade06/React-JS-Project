import {  MdMessage } from 'react-icons/md'
import { FaPhoneAlt } from 'react-icons/fa'
import {HiMail} from 'react-icons/hi'
import Button from '../Button/Button'
import styles from'./ContactForm.module.css'
import { useState } from 'react'

const ContactForm = () => {

    const[name,setName] = useState('Ajay');
    const[email,setEmail] = useState('ajayjawade06@gmail.com');
    const[text,setText] = useState('Ajay');

    const onSubmit = (event) => {
        event.preventDefault();
        setName(event.target[0].value)
        setEmail(event.target[1].value)
        setText(event.target[2].value)
    };
  return (
    <section className={styles.container}>
        <div className={styles.contact_form}>
            <div className={styles.top_btn}>
            <Button text = "VIA SUPPORT CHAT" icon = {<MdMessage fontSize="24px"/>}/>
            <Button 
            text = "VIA CALL" 
            icon = {<FaPhoneAlt fontSize="24px"/>}/>
            </div>     
            <Button isOutline = {true} text = "VIA EMAIL FORM" icon = {<HiMail fontSize="24px"/>}/>    
        
            <form onSubmit={onSubmit}>
                <div className={styles.form_controller}>
                <label htmlFor='name'>Name</label>
                <input type="text" />
                </div>
                <div className={styles.form_controller}>
                <label htmlFor='email'>Email</label>
                <input type="email" />
                </div>
                <div className={styles.form_controller}>
                <label htmlFor='text'>Text</label>
                <textarea type="text" rows={8}/>
                </div>
                <div style={
                    {display: 'flex',
                    justifyContent: 'end',
                    }
                }>
                    <Button text = "SUBMIT" />
                    </div>
                
                <div>
                    {name + " " +  email + " " + text}
                </div>
            </form>
        </div>

        <div className={styles.contact_image}>
            <img src="/images/mainlogo.png" alt="contact_images" />
        </div>
    </section>
  )
}

export default ContactForm
