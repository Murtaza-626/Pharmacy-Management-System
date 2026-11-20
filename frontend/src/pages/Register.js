import {useState} from "react";
import { Link } from "react-router-dom";

export default function Register(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async() => {
        try{
          await api.post("/users/register", {name, email, password});
          alert("Account created, Please Login!");
        }
        catch(error){
          alert(error.response ? error.response.data.message : "Server not reachable");
        }
    }

    return(
        <div className="p-8 flex flex-col items-center">
            <h1 className="text-black text-2xl font-bold">Register</h1>

            <form onSubmit={handleRegister} className="mt-4 flex flex-col gap-4 w-full max-w-sm">
                <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}
                 className="border border-black p-2 rounded" required/>

                 <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}
                  className="border border-black p-2 rounded" required/>

                 <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}
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

// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// export default function Register() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const response = await fetch("http://localhost:5000/api/users/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ name, email, password }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         setError(data.message || "Registration failed");
//         return;
//       }

//       // Save user info & JWT token in browser storage
//       localStorage.setItem("user", JSON.stringify(data));
//       localStorage.setItem("token", data.token);


//       // Redirect to login or dashboard after signup
//       navigate("/");
//     } catch (err) {
//       setError("Server error. Make sure backend is running.");
//     }
//   };

//   return (
//     <div className="p-8 flex flex-col items-center">
//       <h1 className="text-black text-2xl font-bold">Register</h1>

//       {error && <p className="mt-2 text-red-600">{error}</p>}

//       <form onSubmit={handleRegister} className="mt-4 flex flex-col gap-4 w-full max-w-sm">
//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="border border-black p-2 rounded"
//           required
//         />

//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="border border-black p-2 rounded"
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="border border-black p-2 rounded"
//           required
//         />

//         <button type="submit" className="bg-blue-600 text-white p-2 rounded">
//           Register
//         </button>
//       </form>

//       <p className="mt-4 text-black">
//         Already have an account?{" "}
//         <Link to="/" className="text-blue-600">
//           Login here
//         </Link>
//       </p>
//     </div>
//   );
// }
