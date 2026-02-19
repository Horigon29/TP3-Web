import {useState} from "react";
import { z } from "zod";

const contactSchema = z.object({
    name: z.string().min(2,{message: "Nom trop court"}),
    email: z.email({message: "Email invalide"}),
    phone: z.string().regex(/^0[1-9]\d{8}$/,{message: "problème numéro"}),
    message: z.string().min(10,{message: "Message trop court"}),
});

type contactForm = z.infer<typeof contactSchema>;

function ContactForm() {
    const [formData, setFormData] = useState<contactForm>({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleChange = (e) => {
        const value = e.target.value;
        setFormData({...formData, [e.target.name]: value});
    };

    const validateField = (fieldName:string, value) => {
        const result = contactSchema.safeParse(formData);
        const fieldErrors: Record<string, string> = {};

        if (!result.success) {
            result.error.issues.forEach(err => {
                if (err.path[0]===fieldName){
                    fieldErrors[fieldName] = err.message
                }
            })
            console.log(fieldErrors);
            setErrors(fieldErrors);
        }


    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = contactSchema.safeParse(formData);
        if (result.success) {
            setSubmitSuccess(true);
        }
        else setSubmitSuccess(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Nom : </label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}
                   onBlur={e => validateField(e.target.name, e.target.value)}/>
            {errors.name && <span className="error">{errors.name}</span>}

            <br/>

            <label htmlFor="email">Email : </label>
            <input type="text" id="email" name="email" value={formData.email} onChange={handleChange}
                   onBlur={e => validateField(e.target.name, e.target.value)}/>
            {errors.email && <span className="error">{errors.email}</span>}

            <br/>

            <label htmlFor="phone">Phone : </label>
            <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange}
                   onBlur={e => validateField(e.target.name, e.target.value)}/>
            {errors.phone && <span className="error">{errors.phone}</span>}

            <br/>

            <label htmlFor="message">Message : </label>
            <input type="text" id="message" name="message" value={formData.message} onChange={handleChange}
                   onBlur={e => validateField(e.target.name, e.target.value)}/>
            {errors.message && <span className="error">{errors.message}</span>}

            <br/>
            {submitSuccess && <span className="submit_success">{"La donnée à bien été envoyer"}</span>}
            <br/>

            <button className="submit" type="submit" disabled={!contactSchema.safeParse(formData).success}>Envois</button>

        </form>
    );
}

export default ContactForm;