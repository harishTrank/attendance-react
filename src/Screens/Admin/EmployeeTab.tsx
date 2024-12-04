import React, { useState } from "react";
import "./Dashboard.css";
import Sidebar from "../../ReuseableComponent/Sidebar";
import { useNavigate } from "react-router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const EmployeeTab = () => {
  const navigate = useNavigate();
  const viewUserHandler = (val: any) => {
    navigate(`/view-employee/${val}`);
  };
  const [employeePopup,setEmployeePopup]:any=useState(false)
  const [firstName,setFirstName]:any=useState('')
  const [lastName,setLastName]:any=useState('')
  const [email,setEmail]:any=useState('')
  const [deletePopup,setDeletePopup]:any=useState(false)
  const [editPopup,setEditPopup]:any=useState(false)




  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    contact: Yup.string()
      .matches(/^[0-9]+$/, "Contact must be a number")
      .required("Contact is required"),
    gender: Yup.string().required("Gender is required"),
    dob: Yup.date().required("Date of Birth is required"),
    doj: Yup.date().required("Date of Joining is required"),
    designation: Yup.string().required("Designation is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
    address: Yup.string().required("Address is required"),
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    gender: "",
    dob: "",
    doj: "",
    designation: "",
    password: "",
    confirmPassword: "",
    address: "",
  };
  const handledeletepopup=()=>{
    setDeletePopup(true)
  }
  const closedeletepoup=()=>{
    setDeletePopup(false)
  }
  const openPopup=()=>{
    setEmployeePopup(true)
  }
  const closePopup=()=>{
    setEmployeePopup(false)
  }

  const toggleEditPopup=()=>{
    setEditPopup(!editPopup)
  }
  const addEmployeesubmit=()=>{
    alert('submittes')
  }
  return (
    <>
      <div className="flex">
        <Sidebar current={"Employees"} />
        <div className="main-area">
          <div className="all-employees employees-detail">
            <div className="flex space-bw alc top-h">
              <h3>Employees Details</h3>
             <div className="flex alc">
             <div className="add-employee">
                <button onClick={openPopup}>+Add Employee</button>
              </div>
           
              <div className="pos-relate">
              
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Enter Employee Name"
                />
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
              </div>
            </div>
            {employeePopup && (
          <div className="popup-overlay">
          <div className="popup">
            <button className="close-button" onClick={closePopup}>
              ✖
            </button>
            <h2>Add Employee</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
             onSubmit={addEmployeesubmit}
            >
              {() => (
                <Form>
                  <div className="flex space-bw alc">
                    <div className="form-group">
                      <label>First Name</label>
                      <Field
                        type="text"
                        name="firstName"
                        placeholder="Enter first name"
                      />
                      <ErrorMessage name="firstName" component="div" className="error" />
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <Field
                        type="text"
                        name="lastName"
                        placeholder="Enter last name"
                      />
                      <ErrorMessage name="lastName" component="div" className="error" />
                    </div>
                  </div>
    
                  <div className="flex space-bw alc">
                    <div className="form-group">
                      <label>Email</label>
                      <Field
                        type="email"
                        name="email"
                        placeholder="Enter email"
                      />
                      <ErrorMessage name="email" component="div" className="error" />
                    </div>
                    <div className="form-group">
                      <label>Contact</label>
                      <Field type="text" name="contact" />
                      <ErrorMessage name="contact" component="div" className="error" />
                    </div>
                  </div>
    
                  <div className="flex space-bw alc">
                    <div className="form-group">
                      <label>Gender</label>
                      <Field as="select" name="gender">
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                      </Field>
                      <ErrorMessage name="gender" component="div" className="error" />
                    </div>
                    <div className="form-group">
                      <label>Date of Birth</label>
                      <Field type="date" name="dob" />
                      <ErrorMessage name="dob" component="div" className="error" />
                    </div>
                  </div>
    
                  <div className="flex space-bw alc">
                    <div className="form-group">
                      <label>Date of Joining</label>
                      <Field type="date" name="doj" />
                      <ErrorMessage name="doj" component="div" className="error" />
                    </div>
                    <div className="form-group">
                      <label>Designation</label>
                      <Field type="text" name="designation" />
                      <ErrorMessage name="designation" component="div" className="error" />
                    </div>
                  </div>
    
                  <div className="flex space-bw alc">
                    <div className="form-group">
                      <label>Password</label>
                      <Field
                        type="password"
                        name="password"
                        placeholder="Enter password"
                      />
                      <ErrorMessage name="password" component="div" className="error" />
                    </div>
                    <div className="form-group">
                      <label>Confirm Password</label>
                      <Field
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm password"
                      />
                      <ErrorMessage name="confirmPassword" component="div" className="error" />
                    </div>
                  </div>
    
                  <div className="form-group-textarea">
                    <label>Address</label>
                    <Field as="textarea" name="address" rows={4} cols={50} />
                    <ErrorMessage name="address" component="div" className="error" />
                  </div>
    
                  <div className="form-actions">
                    <button type="button" onClick={closePopup}>
                      Cancel
                    </button>
                    <button type="submit">Submit</button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
            <table>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Department</th>
                <th>In Time</th>
                <th>Out Time</th>
                <th>Total Hours</th>
                <th>Options</th>
              </tr>
              <tr>
                <td>Harsh</td>
                <td>Front end developer</td>
                <td>IT</td>
                <td>10:00 AM</td>
                <td>07:00 PM</td>
                <td>09:00 Hrs</td>
                <td>
                  <div className="flex alc just-center">
                    <button className="view" onClick={() => viewUserHandler(1)}>
                      <i className="fa-solid fa-eye"></i>
                    </button>
                    <button className="edit">
                      <i className="fa-solid fa-user-pen" onClick={toggleEditPopup}></i>
                    </button>
                    <button className="delete" onClick={handledeletepopup}>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Harish</td>
                <td>Full stack developer</td>
                <td>IT</td>
                <td>10:00 AM</td>
                <td>07:00 PM</td>
                <td>09:00 Hrs</td>
                <td>
                  <div className="flex alc just-center">
                    <button className="view" onClick={() => viewUserHandler(2)}>
                      <i className="fa-solid fa-eye"></i>
                    </button>
                    <button className="edit">
                      <i className="fa-solid fa-user-pen" onClick={()=>toggleEditPopup()}></i>
                    </button>
                    <button className="delete">
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
     {deletePopup &&  <div className="modal-overlay">
          <div className="modal">
            <p>Are you sure you want to delete user information?</p>
            <div className="modal-actions">
              <button onClick={closedeletepoup} className="confirm-btn">
                Yes
              </button>
              <button onClick={closedeletepoup} className="cancel-btn">
                No
              </button>
            </div>
          </div>
        </div>}

        <div className="popup-overlay-edit" style={{display:editPopup?"block":"none"}}>
          <div className="popup-edit">
            <button className="close-button" onClick={toggleEditPopup}>
              ✖
            </button>
            <h2>Edit Employee Details</h2>
            <div className="flex space-bw alc">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                placeholder="Enter first name"
                
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                placeholder="Enter last name"
               
                required
              />
            </div>
            </div>
            <div className="flex space-bw alc">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter email"
                
                required
              />
            </div>
            <div className="form-group">
              <label >Contact</label>
              <input type="text" />
            </div>
            
            </div>
            <div className="flex space-bw alc">
            <div className="form-group">
              <label>Gender</label>
             <select name="" id="">
              <option value="">Male</option>
              <option value="">Female</option>
              <option value="">Others</option>
             </select>
            </div>
            <div className="form-group">
              <label >Date of Birth</label>
              <input type="date" />
            </div>
            
            </div>
            <div className="flex space-bw alc">
            <div className="form-group">
              <label>Date of Joining</label>
             <input type="date" />
            </div>
            <div className="form-group">
              <label >Designation</label>
              <input type="text" />
            </div>
            
            </div>
            <div className="form-group-textarea">
              <label>Address</label>
              <textarea name="" id="" rows={4} cols={50}></textarea>
            </div>
           
            <div className="form-actions">
              <button >Submit</button>
              <button >Cancel</button>
            </div>
          </div>
        </div>
    </>
  );
};

export default EmployeeTab;
