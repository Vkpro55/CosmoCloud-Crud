import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "https://free-ap-south-1.cosmocloud.io/development/api/empcrud?limit=10&offset=0",
          {
            headers: {
              projectId: "66ac970ba7587fb96278f7b8",
              environmentId: "66ac970ba7587fb96278f7b9",
            },
          }
        );

        console.log("API Response:", response.data); // Log the response data

        // Extract data from response
        const data = response.data.data || [];
        setEmployees(data);
      } catch (error) {
        console.error("There was an error fetching the employees!", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (_id) => {
    try {
      const response = await axios.delete(
        `https://free-ap-south-1.cosmocloud.io/development/api/empcrud/${_id}`,
        {
          headers: {
            projectId: "66ac970ba7587fb96278f7b8",
            environmentId: "66ac970ba7587fb96278f7b9",
          },
          data: {}, // Add an empty body as required by the API
        }
      );

      console.log("Delete response:", response); // Log the response

      setEmployees(employees.filter((employee) => employee._id !== _id));
    } catch (error) {
      console.error("There was an error deleting the employee!", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Employees</h1>
      <Link to="/add">Add Employee</Link>
      {employees.length === 0 ? (
        <p>No Employees in the system</p>
      ) : (
        <ul>
          {employees.map((employee) => (
            <li key={employee._id}>
              {employee.name} (ID: {employee._id})
              <Link to={`/employee/${employee._id}`}>View</Link>
              <button onClick={() => handleDelete(employee._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EmployeeList;
