import {useState} from "react";
import { Link } from "react-router-dom";

export default function Register(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = (e) => {
        e.preventDefault();
        //Registration logic will be implemented here later
        console.log("Register submitted", name, email, password);
    }

    return(
        <div className="p-8 flex flex-col items-center">
            <h1 className="text-black text-2xl font-bold">Register</h1>

            <form onSubmit={handleRegister} className="mt-4 flex flex-col gap-4 w-full max-w-sm">
                <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}
                 className="border border-black p-2 rounded" required/>

                 <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}
                  className="border border-black p-2 rounded" required/>

                 <input type="password" placeholder="Password" value={password} onChange={(e)=>setEmail(e.target.value)}
                  className="border border-black p-2 rounded" required/>
                <input />

                <button type="submit" className="bg-blue-600 text-white p-2 rounded">Register</button>
            </form>

            <p className="mt-4 text-black">
                Aleady have an account?
                <Link to="/" className="text-blue-600">Login here</Link>    
            </p>
        </div>
    );
}