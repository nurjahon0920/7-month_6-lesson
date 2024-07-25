import { Input } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Add = () => {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;

    setUser({ ...user, [name]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:3000/students`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        navigate("/");
      });
  };
  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-md-6">Add User</div>
          <div className="col-md-6">
            <Link to="/student" className="btn btn-success btn-sm float-end">
              View All
            </Link>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-4">&nbsp;</div>
          <div className="col-md-4">
            <form method="POST" onSubmit={handleSubmit}>
              <Input></Input>
              <TextField
                label="First Name"
                variant="outlined"
                type="text"
                onChange={handleChange}
              />
              <TextField
                label="Last Name"
                variant="outlined"
                type="text"
                onChange={handleChange}
              />
              <TextField
                label="Email"
                variant="outlined"
                type="Email"
                onChange={handleChange}
              />
              <TextField
                // label=""
                variant="outlined"
                type="text"
                onChange={handleChange}
              />
              {/* <div className="mb-3"></div>
              <div className="mb-3"></div>
              <div className="mb-3"></div>
              <div className="mb-3"></div> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
