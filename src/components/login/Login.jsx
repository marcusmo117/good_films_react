import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import apis from "../../utils/auth";

function Login(props) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
      const response = await apis.auth(formData, "login");
      toast.success("Login Successful!");
      // store the token into localstorage / cookie
      localStorage.setItem("user_token", response.data.token);
      props.setTokenState(response.data.token)
      navigate("/");
    } catch (err) {
      toast.error(err.response.data.error);
      return;
    }

    // fetch(`http://localhost:8000/api/v1/users/login`, {
    //   method: "POST",
    //   body: JSON.stringify(formData),
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    // })
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((response) => {
    //     if (response.error) {
    //       toast.error(response.error);
    //       return;
    //     }

    //     toast.success("Login Successful!");

    //     // store the token into localstorage / cookie
    //     localStorage.setItem("user_token", response.token);

    //     navigate("/auth");
    //   })
    //   .catch((err) => {
    //     toast.error(err.message);
    //   });
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("user_token");
  //   console.log('useEffect running login' + token)
  //     if (token) {
  //       props.setTokenState(token)
  //     }
  // },[])

  return (
    <div className="login-page">
      <h1 className="my-5">Login</h1>

      <div className="container">
        <form onSubmit={handleSubmit}>
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
// need to hash password from FE
export default Login;
