import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Fetching details for ID:", id); // Log id
    axios
      .get(
        `https://free-ap-south-1.cosmocloud.io/development/api/empcrud/${id}`,
        {
          headers: {
            projectId: "66ac970ba7587fb96278f7b8",
            environmentId: "66ac970ba7587fb96278f7b9",
          },
        }
      )
      .then((response) => {
        console.log("Employee data:", response.data); // Log response data
        setEmployee(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the employee!", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!employee) {
    return <p>Employee not found</p>;
  }

  const renderContactMethods = (contactMethods) => {
    // If contactMethods is an array, render each contact method
    if (Array.isArray(contactMethods)) {
      return contactMethods.map((method, index) => (
        <li key={index}>
          {method.contact_method || "N/A"}: {method.value || "N/A"}
        </li>
      ));
    }
    // If contactMethods is a single object, render it directly
    else if (typeof contactMethods === "object" && contactMethods !== null) {
      return (
        <li>
          {contactMethods.contact_method || "N/A"}:{" "}
          {contactMethods.value || "N/A"}
        </li>
      );
    }
    // If contactMethods is not available, render a fallback message
    else {
      return <li>No contact methods available</li>;
    }
  };

  return (
    <div>
      <h1>{employee.name}</h1>
      <p>
        Address: {employee.address.line1}, {employee.address.city},{" "}
        {employee.address.country}, {employee.address.zip_code}
      </p>
      <h2>Contact Methods</h2>
      <ul>{renderContactMethods(employee.contact_methods)}</ul>
    </div>
  );
};

export default EmployeeDetails;
