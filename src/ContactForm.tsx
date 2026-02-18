import {useState} from "react";
import { z } from "zod";

function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleChange = (e) => {
        const value = e.target.value;
        setFormData({...formData, [e.target.name]: value});
    };

    const validateField = (fieldName, value) => {
        const contactSchema = z.object({
            name: z.string().min(2),
            email: z.email(),
            phone: z.regex(/^0[1-9]\d{8}$/),
            message: z.string().min(10),
        });

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Votre code
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Nom : </label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}
                   onBlur={e => validateField(e.target.name, e.target.value)}/>

            <label htmlFor="email">Email : </label>
            <input type="text" id="email" name="email" value={formData.name} onChange={handleChange}
                   onBlur={e => validateField(e.target.name, e.target.value)}/>

            <label htmlFor="phone">Phone : </label>
            <input type="text" id="phone" name="phone" value={formData.name} onChange={handleChange}
                   onBlur={e => validateField(e.target.name, e.target.value)}/>

            <label htmlFor="name">Message : </label>
            <input type="text" id="message" name="message" value={formData.name} onChange={handleChange}
                   onBlur={e => validateField(e.target.name, e.target.value)}/>

        </form>
    );
}

export default ContactForm;