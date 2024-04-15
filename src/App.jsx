import { useEffect, useState } from 'react';
import { StudentData } from './StudentData';

function App() {
  // Define state variables to store student data and form input values
  const [mystudentData, setMyStudentData] = useState([]);
  const [stufirstName, setFirstName] = useState("");
  const [stulastName, setLastName] = useState("");
  const [sturollNumber, setRollNumber] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [id, setId] = useState("")

  useEffect(() => {
    // Initialize student data on component mount
    setMyStudentData(StudentData);
  }, []);

  const handleEdit = (id) => {
    // Find the student data corresponding to the provided id
    const dt = mystudentData.find(item => item.id === id);

    if (dt) {
      // Set form input values to the found student data
      setIsUpdate(true)
      setFirstName(dt.firstName);
      setLastName(dt.lastName);
      setRollNumber(dt.RollNumber);
      setId(id);
    }
  };

  const handleDelete = (id) => {
    if (id > 0) {
      // Confirm deletion
      if (window.confirm("Are you sure, You want to delete this item?")) {
        // Filter out the student data with the provided id
        const updatedData = mystudentData.filter(item => item.id !== id);
        // Update state with the filtered student data
        setMyStudentData(updatedData);
      }
    }
  };

  // Handle Save: Implement this function to save form data
  const handleSave = (e) => {
    // Implement save functionality here
    e.preventDefault();
    const dt = [...mystudentData];
    const newObj = {
      id: StudentData.length + 1,
      firstName: stufirstName,
      lastName: stulastName,
      RollNumber: sturollNumber
    }
    dt.push(newObj);
    setMyStudentData(dt);
  };

  // Handle Clear: Implement this function to clear form input values
  const handleClear = () => {
    // Clear form input values
    setFirstName("");
    setLastName("");
    setRollNumber("");
    setIsUpdate(false)
  };

  //Handle Update 
  const handleUpdate = () => {
    const index = mystudentData.map((item) => {
      return item.id
    }).indexOf(id)

    const dt = [...mystudentData]
    dt[index].firstName = stufirstName;
    dt[index].lastName = stulastName;
    dt[index].RollNumber = sturollNumber;
    setMyStudentData(dt);
    handleClear();
  }

  return (
    <>
      <div className="FormContainer">
        {/* Form for entering student details */}
        <div className="form-first">
          <label htmlFor="FirstName">First Name :</label>
          <input type="text" onChange={(e) => setFirstName(e.target.value)} value={stufirstName} />
        </div>
        <div className="form-last">
          <label htmlFor="FirstName">Last Name :</label>
          <input type="text" onChange={(e) => setLastName(e.target.value)} value={stulastName} />
        </div>
        <div className="form-rollNumber">
          <label htmlFor="FirstName">Roll Number :</label>
          <input type="text" onChange={(e) => setRollNumber(e.target.value)} value={sturollNumber} />
        </div>
        {/* Buttons for saving and clearing form data */}
        <div className='btn'>
          {
            isUpdate ?
              <button style={{ backgroundColor: "lightblue", margin: "10px", cursor: "pointer" }} onClick={() => handleUpdate()}>Update</button> :
              <button className='save' style={{ backgroundColor: "Yellow", margin: "10px", cursor: "pointer" }} onClick={(e) => handleSave(e)}>Save</button>
          }
          <button style={{ backgroundColor: "grey", margin: "10px", cursor: "pointer" }} onClick={() => handleClear()}>Clear</button>
        </div>
      </div>
      <h3>Student Data</h3>
      {/* Table to display student data */}
      <table border={2}>
        <thead>
          <tr>
            <td>Id</td>
            <td>Sr.No</td>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Roll Number</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {/* Map over student data to render table rows */}
          {mystudentData.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{index + 1}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.RollNumber}</td>
              {/* Buttons to edit and delete student data */}
              <td>
                <button style={{ backgroundColor: "green", margin: "10px", cursor: "pointer" }} onClick={() => handleEdit(item.id)}>Edit</button>
                <button style={{ backgroundColor: "red", margin: "10px", cursor: "pointer" }} onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
