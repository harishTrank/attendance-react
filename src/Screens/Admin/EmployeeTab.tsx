import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Sidebar from "../../ReuseableComponent/Sidebar";
import { useNavigate } from "react-router";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import {
  createEmployeeApi,
  deleteEmployeeApi,
  editEmployeeApi,
  listEmployeesApi,
} from "../../store/Services";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { toast } from "react-hot-toast";
import FullScreenLoader from "../../ReuseableComponent/FullScreenLoader";
import { Pagination } from "antd";

dayjs.extend(relativeTime);
const EmployeeTab = () => {
  const navigate = useNavigate();
  const viewUserHandler = (val: any) => {
    navigate(`/view-employee/${val}`);
  };
  const [employeePopup, setEmployeePopup]: any = useState(false);
  const [deletePopup, setDeletePopup]: any = useState(false);
  const [editPopup, setEditPopup]: any = useState(false);
  const [isLoading, setIsLoading]: any = useState(false);
  const [search, setSearch]: any = useState("");
  const [currentPage, setCurrentPage]: any = useState(1);
  const [employeeList, setEmployeeList]: any = useState([]);
  const [totalPages, setTotalPages]: any = useState(0);
  const [uuid, setUuid]: any = useState(null);
  const [editUserData, setEditUserData]: any = useState({});

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

  const openPopup = () => {
    setEmployeePopup(true);
  };
  const closePopup = () => {
    setEmployeePopup(false);
  };

  const toggleEditPopup = () => {
    setEditPopup(!editPopup);
  };

  const fetchEmployees = () => {
    setIsLoading(true);
    listEmployeesApi({
      query: {
        search,
        page: currentPage,
      },
    })
      .then((res: any) => {
        setEmployeeList(res?.results || []);
        setTotalPages(res?.total_pages || 0);
      })
      .catch((err) => {
        console.error("Error fetching employees:", err);
      })
      .finally(() => setIsLoading(false));
  };

  const DeleteButtonHandler = () => {
    deleteEmployeeApi({
      query: {
        uuid,
      },
    })
      .then(() => {
        toast.success("Delete user successfully.");
        fetchEmployees();
      })
      .catch(() => {
        toast.error("Something went wrong.");
      });
  };

  const addEmployeesubmit = (values: any) => {
    setIsLoading(true);
    createEmployeeApi({
      body: {
        first_name: values?.firstName,
        last_name: values?.lastName,
        email: values?.email,
        phone_number: values?.contact,
        gender: values?.gender,
        dob: dayjs(values?.dob).format("YYYY-MM-DD"),
        joining_date: dayjs(values?.doj).format("YYYY-MM-DD"),
        designation: values?.designation,
        address: values?.address,
        password: values?.password,
      },
    })
      .then((res: any) => {
        toast.success(res?.responsemessage);
        fetchEmployees();
        setEmployeePopup(false);
        setIsLoading(false);
      })
      .catch((err: any) => {
        toast.error("This email already exists.");
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      fetchEmployees();
    }, 500);
  }, [currentPage, search]);

  const onPageChange = (page: any) => {
    setCurrentPage(page);
  };

  const onChangeSearch = (e: any) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const closedeletepoup = (value: any) => {
    setDeletePopup(false);
    if (value) {
      DeleteButtonHandler();
    }
  };

  const [initialValuesEdit, setInitialValuesEdit]: any = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    gender: "",
    dateOfBirth: "",
    dateOfJoining: "",
    designation: "",
    address: "",
  });

  useEffect(() => {
    if (editUserData) {
      setInitialValuesEdit({
        firstName: editUserData?.first_name || "",
        lastName: editUserData?.last_name || "",
        email: editUserData?.email || "",
        contact: editUserData?.phone_number || "",
        gender: editUserData?.gender || "",
        dateOfBirth: editUserData?.dob
          ? dayjs(editUserData?.dob).format("YYYY-MM-DD")
          : "",
        dateOfJoining: editUserData?.joining_date
          ? dayjs(editUserData?.joining_date).format("YYYY-MM-DD")
          : "",
        designation: editUserData?.designation || "",
        address: editUserData?.address || "",
      });
    }
  }, [editUserData]);

  const formik = useFormik({
    initialValues: initialValuesEdit,
    enableReinitialize: true, // Add this line to reinitialize Formik on initialValues change
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(2, "First Name must be at least 2 characters")
        .required("First Name is required"),
      lastName: Yup.string()
        .min(2, "Last Name must be at least 2 characters")
        .required("Last Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      contact: Yup.string()
        .matches(/^[0-9]+$/, "Contact must be numeric")
        .min(10, "Contact must be at least 10 digits")
        .required("Contact is required"),
      gender: Yup.string().required("Gender is required"),
      dateOfBirth: Yup.date().required("Date of Birth is required"),
      dateOfJoining: Yup.date().required("Date of Joining is required"),
      designation: Yup.string().required("Designation is required"),
      address: Yup.string().min(10, "Address must be at least 10 characters"),
    }),
    onSubmit: (values) => {
      setCurrentPage(1);
      editEmployeeApi({
        query: {
          uuid: editUserData?.uuid,
        },
        body: {
          first_name: values?.firstName,
          last_name: values?.lastName,
          phone_number: values?.contact,
          gender: values?.gender,
          dob: dayjs(values?.dob).format("YYYY-MM-DD"),
          joining_date: dayjs(values?.joining_date).format("YYYY-MM-DD"),
          designation: values?.designation,
          address: values?.address,
        },
      })
        .then(() => {
          toast.success("Edit user successfully.");
          toggleEditPopup();
          fetchEmployees();
        })
        .catch((err: any) => console.log("err", err));
    },
  });
  return (
    <>
      <div className="flex">
        <FullScreenLoader loading={isLoading} />
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
                    onChange={onChangeSearch}
                    placeholder="Search"
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
                            <ErrorMessage
                              name="firstName"
                              component="div"
                              className="error"
                            />
                          </div>
                          <div className="form-group">
                            <label>Last Name</label>
                            <Field
                              type="text"
                              name="lastName"
                              placeholder="Enter last name"
                            />
                            <ErrorMessage
                              name="lastName"
                              component="div"
                              className="error"
                            />
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
                            <ErrorMessage
                              name="email"
                              component="div"
                              className="error"
                            />
                          </div>
                          <div className="form-group">
                            <label>Contact</label>
                            <Field type="text" name="contact" />
                            <ErrorMessage
                              name="contact"
                              component="div"
                              className="error"
                            />
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
                            <ErrorMessage
                              name="gender"
                              component="div"
                              className="error"
                            />
                          </div>
                          <div className="form-group">
                            <label>Date of Birth</label>
                            <Field type="date" name="dob" />
                            <ErrorMessage
                              name="dob"
                              component="div"
                              className="error"
                            />
                          </div>
                        </div>

                        <div className="flex space-bw alc">
                          <div className="form-group">
                            <label>Date of Joining</label>
                            <Field type="date" name="doj" />
                            <ErrorMessage
                              name="doj"
                              component="div"
                              className="error"
                            />
                          </div>
                          <div className="form-group">
                            <label>Designation</label>
                            <Field type="text" name="designation" />
                            <ErrorMessage
                              name="designation"
                              component="div"
                              className="error"
                            />
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
                            <ErrorMessage
                              name="password"
                              component="div"
                              className="error"
                            />
                          </div>
                          <div className="form-group">
                            <label>Confirm Password</label>
                            <Field
                              type="password"
                              name="confirmPassword"
                              placeholder="Confirm password"
                            />
                            <ErrorMessage
                              name="confirmPassword"
                              component="div"
                              className="error"
                            />
                          </div>
                        </div>

                        <div className="form-group-textarea">
                          <label>Address</label>
                          <Field
                            as="textarea"
                            name="address"
                            rows={4}
                            cols={50}
                          />
                          <ErrorMessage
                            name="address"
                            component="div"
                            className="error"
                          />
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
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Gender</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {employeeList?.map((item: any, index: any) => (
                  <tr key={index}>
                    <td>
                      {item?.first_name} {item?.last_name}
                    </td>
                    <td>{item?.designation}</td>
                    <td>{item?.gender}</td>
                    <td>{item?.phone_number}</td>
                    <td>{item?.email}</td>
                    <td>
                      <div className="flex alc just-center">
                        <button
                          className="view"
                          onClick={() => viewUserHandler(item?.uuid)}
                        >
                          <i className="fa-solid fa-eye"></i>
                        </button>
                        <button className="edit">
                          <i
                            className="fa-solid fa-user-pen"
                            onClick={() => {
                              setIsLoading(true);
                              setEditUserData(item);
                              setTimeout(() => {
                                setIsLoading(false);
                                toggleEditPopup();
                              }, 1000);
                            }}
                          ></i>
                        </button>
                        <button
                          className="delete"
                          onClick={() => {
                            setDeletePopup(true);
                            setUuid(item?.uuid);
                          }}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <Pagination
              current={currentPage}
              total={totalPages * 10}
              onChange={onPageChange}
              showSizeChanger={false}
              align="center"
            />
          )}
        </div>
      </div>
      {deletePopup && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Are you sure you want to delete user information?</p>
            <div className="modal-actions">
              <button
                onClick={() => closedeletepoup(false)}
                className="cancel-btn"
              >
                No
              </button>
              <button
                onClick={() => closedeletepoup(true)}
                className="confirm-btn"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        className="popup-overlay-edit"
        style={{ display: editPopup ? "block" : "none" }}
      >
        <div className="popup-edit">
          <button className="close-button" onClick={toggleEditPopup}>
            ✖
          </button>
          <h2>Edit Employee Details</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex space-bw alc">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  placeholder="Enter first name"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.firstName &&
                  typeof formik.errors.firstName === "string" && (
                    <div className="error">{formik.errors.firstName}</div>
                  )}
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  placeholder="Enter last name"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.lastName &&
                  typeof formik.errors.lastName === "string" && (
                    <div className="error">{formik.errors.lastName}</div>
                  )}
              </div>
            </div>

            <div className="flex space-bw alc">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  readOnly
                />
                {formik.touched.email &&
                  typeof formik.errors.email === "string" && (
                    <div className="error">{formik.errors.email}</div>
                  )}
              </div>
              <div className="form-group">
                <label>Contact</label>
                <input
                  type="text"
                  placeholder="Enter contact number"
                  name="contact"
                  value={formik.values.contact}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.contact &&
                  typeof formik.errors.contact === "string" && (
                    <div className="error">{formik.errors.contact}</div>
                  )}
              </div>
            </div>

            <div className="flex space-bw alc">
              <div className="form-group">
                <label>Gender</label>
                <select
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
                {formik.touched.gender &&
                  typeof formik.errors.gender === "string" && (
                    <div className="error">{formik.errors.gender}</div>
                  )}
              </div>
              <div className="form-group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formik.values.dateOfBirth}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.dateOfBirth &&
                  typeof formik.errors.dateOfBirth === "string" && (
                    <div className="error">{formik.errors.dateOfBirth}</div>
                  )}
              </div>
            </div>

            <div className="flex space-bw alc">
              <div className="form-group">
                <label>Date of Joining</label>
                <input
                  type="date"
                  name="dateOfJoining"
                  value={formik.values.dateOfJoining}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.dateOfJoining &&
                  typeof formik.errors.dateOfJoining === "string" && (
                    <div className="error">{formik.errors.dateOfJoining}</div>
                  )}
              </div>
              <div className="form-group">
                <label>Designation</label>
                <input
                  type="text"
                  name="designation"
                  placeholder="Enter designation"
                  value={formik.values.designation}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.designation &&
                  typeof formik.errors.designation === "string" && (
                    <div className="error">{formik.errors.designation}</div>
                  )}
              </div>
            </div>

            <div className="form-group-textarea">
              <label>Address</label>
              <textarea
                name="address"
                rows={4}
                cols={50}
                placeholder="Enter address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></textarea>
              {formik.touched.address &&
                typeof formik.errors.address === "string" && (
                  <div className="error">{formik.errors.address}</div>
                )}
            </div>

            <div className="form-actions">
              <button type="submit">Submit</button>
              <button type="button" onClick={toggleEditPopup}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EmployeeTab;
