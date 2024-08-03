import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState({
    line1: "",
    city: "",
    country: "",
    zip_code: "",
  });
  const [contactMethods, setContactMethods] = useState([
    { contact_method: "EMAIL", value: "" },
  ]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name,
      address,
      contact_methods: contactMethods,
    };

    axios
      .post(
        "https://free-ap-south-1.cosmocloud.io/development/api/empcrud",
        payload,
        {
          headers: {
            projectId: "66ac970ba7587fb96278f7b8",
            environmentId: "66ac970ba7587fb96278f7b9",
          },
        }
      )
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code that falls out of the range of 2xx
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("Request data:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error message:", error.message);
        }
        console.error("Config:", error.config);
      });
  };

  const handleContactMethodChange = (index, field, value) => {
    const newContactMethods = [...contactMethods];
    newContactMethods[index][field] = value;
    setContactMethods(newContactMethods);
  };

  const handleAddContactMethod = () => {
    setContactMethods([
      ...contactMethods,
      { contact_method: "EMAIL", value: "" },
    ]);
  };

  return (
    <div>
      <h1>Add Employee</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            placeholder="Line 1"
            value={address.line1}
            onChange={(e) => setAddress({ ...address, line1: e.target.value })}
          />
          <input
            type="text"
            placeholder="City"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
          />
          <input
            type="text"
            placeholder="Country"
            value={address.country}
            onChange={(e) =>
              setAddress({ ...address, country: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Zip Code"
            value={address.zip_code}
            onChange={(e) =>
              setAddress({ ...address, zip_code: e.target.value })
            }
          />
        </div>
        <div>
          <h2>Contact Methods</h2>
          {contactMethods.map((method, index) => (
            <div key={index}>
              <select
                value={method.contact_method}
                onChange={(e) =>
                  handleContactMethodChange(
                    index,
                    "contact_method",
                    e.target.value
                  )
                }
              >
                <option value="EMAIL">Email</option>
                <option value="PHONE">Phone</option>
              </select>
              <input
                type="text"
                value={method.value}
                onChange={(e) =>
                  handleContactMethodChange(index, "value", e.target.value)
                }
              />
            </div>
          ))}
          <button type="button" onClick={handleAddContactMethod}>
            Add Contact Method
          </button>
        </div>
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
