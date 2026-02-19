import {useState} from "react";
import {z} from "zod";

const step1Schema = z.object({
    name: z.string().min(1),
    email: z.email()
});
const step2Schema = z.object({
    username: z.string().min(3),
    password: z.string().min(8),
    confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword);

const step3Schema = z.object({
    role: z.enum(["user", "admin"]),
})


function MultiStepForm() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        newsletter: false,
        role: 'user'
    });

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const updateFormData = (field, value) => {
        setFormData({...formData, [field]: value});
    };

    return (
        <div>
            <h2>Étape {step} / 4</h2>

            {step === 1 && (
                <Step1
                    data={formData}
                    onUpdate={updateFormData}
                    onNext={nextStep}
                />
            )}

            {step === 2 && (
                <Step2
                    data={formData}
                    onUpdate={updateFormData}
                    onNext={nextStep}
                    onPrev={prevStep}
                />
            )}

            {step === 3 && (
                <Step3
                    data={formData}
                    onUpdate={updateFormData}
                    onNext={nextStep}
                    onPrev={prevStep}
                />
            )}

            {step === 4 && (
                <Step4
                    data={formData}
                    onNext={nextStep}
                    onPrev={prevStep}
                />
            )}
        </div>
    );
}

function Step1({data, onUpdate, onNext}) {
    return (
        <>
            <form>
                <label htmlFor="name">Nom : </label>
                <input type="text" id="name" name="name" value={data.name}
                       onChange={e => onUpdate(e.target.name, e.target.value)}/>
                <br/>

                <label htmlFor="email">Email : </label>
                <input type="text" id="email" name="email" value={data.email}
                       onChange={e => onUpdate(e.target.name, e.target.value)}/>

                <button onClick={onNext} disabled={!step1Schema.safeParse(data).success}>Suivant</button>
            </form>

        </>
    );
}

function Step2({data, onUpdate, onNext, onPrev}) {
    return (
        <>
            <form>
                <label htmlFor="username">username : </label>
                <input type="text" id="username" name="username" value={data.username}
                       onChange={e => onUpdate(e.target.name, e.target.value)}/>
                <br/>

                <label htmlFor="password">password : </label>
                <input type="text" id="password" name="password" value={data.password}
                       onChange={e => onUpdate(e.target.name, e.target.value)}/>

                <label htmlFor="confirmPassword">Email : </label>
                <input type="text" id="confirmPassword" name="confirmPassword" value={data.confirmPassword}
                       onChange={e => onUpdate(e.target.name, e.target.value)}/>

                <button onClick={onPrev}>Précédent</button>
                <button onClick={onNext} disabled={!step2Schema.safeParse(data).success}>Suivant</button>
            </form>

        </>
    );
}

function Step3({data, onUpdate, onNext, onPrev}) {
    return (
        <>
            <form>
                <input type={"checkbox"} name={"newsletter"} value={data.newsletter}
                       onChange={e => onUpdate(e.target.name, e.target.value)}/>
                <select name={"role"} id={"role"}>
                    <option value={"user"}>user</option>
                    <option value={"admin"}>admin</option>
                </select>

                <button onClick={onPrev}>Précédent</button>
                <button onClick={onNext} disabled={!step3Schema.safeParse(data).success}>Suivant</button>
            </form>

        </>
    );
}

function Step4({data, onPrev}) {
    return (
        <>
            <form>
                <p>{data.name}</p>
                <p>{data.email}</p>
                <p>{data.username}</p>
                <p>{data.password}</p>
                <p>Recevoir newsletter{data.newsletter && "Accepter"}</p>
                <p>{data.role}</p>

                <button onClick={onPrev}>Précédent</button>
                <button>Soumettre</button>
            </form>

        </>
    );
}


export default MultiStepForm