import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import apis from "../../utils/backend/auth";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await apis.auth(formData, "register");
      if (response.data.error) {
        toast.error(response.error);
        return;
      }
      toast.success("Registration Successful!");
      // store the token into localstorage / cookie
      navigate("/login");
    } catch (err) {
      toast.error(err.response.data.error);
      return;
    }

    // fetch(`http://localhost:8000/api/v1/users/register`, {
    //     method: 'POST',
    //     body: JSON.stringify(formData),
    //     headers: {
    //         'Content-type': 'application/json',
    //     },
    // })
    // .then(response => {
    //     return response.json()
    // })
    // .then(jsonResponse => {
    //     if (jsonResponse.error) {
    //         toast.error(jsonResponse.error)
    //         return
    //     }
    //     toast.success("Registration Successful!")

    //     // store the token into localstorage / cookie
    //     // localStorage.setItem('user_token', jsonResponse.token)

    //     navigate('/login')
    // })
    // .catch(err => {
    //     toast.error(err.message)
    // })
  };

  return (
    <div className="login-page">
      <h1 className="my-5">Register</h1>

      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="username"
              className="form-control"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
