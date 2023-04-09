import React from "react";
import "./Book.css";

export default function Adult() {
  const [adult, setAdult] = React.useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    firstTimeFlier: "false",
    cowinCertificate: null,
  });

  function HandleChange(event) {
    const { name, value, type, files } = event.target;
    setAdult((prevValue) => {
      if (type === "checkbox") {
        return {
          ...prevValue,
          [name]: !prevValue[name],
        };
      } else if (type === "file") {
        console.log(files[0]);
        return {
          ...prevValue,
        };
      } else {
        return {
          ...prevValue,
          [name]: value,
        };
      }
    });
  }

  return (
    <div className="adult">
      <div className="input">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={adult.name}
          onChange={HandleChange}
          className="adult-name"
          required
        />
      </div>
      <div className="input">
        <label>Age</label>
        <input
          type="text"
          name="age"
          value={adult.age}
          onChange={HandleChange}
          className="adult-age"
          required
        />
      </div>
      <div className="input">
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={adult.email}
          className="adult-email"
          onChange={HandleChange}
        />
      </div>
      <div className="input">
        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={adult.phone}
          className="adult-phone"
          onChange={HandleChange}
        />
      </div>
      <div className="checkbox">
        <label>First Time Flier</label>
        <input
          type="checkbox"
          name="firstTimeFlier"
          className="adult-firstTimeFlier"
          value={adult.firstTimeFlier}
          onChange={HandleChange}
        />
      </div>
      <div className="cowin">
        <label>Cowin Certificate (only in .jpeg/.png format) </label>
        <br></br>
        <input
          type="file"
          name="cowinCertificate"
          className="adult-cowinCertificate"
          onChange={HandleChange}
          accept=".jpeg,.png"
          required
        />
      </div>
    </div>
  );
}
