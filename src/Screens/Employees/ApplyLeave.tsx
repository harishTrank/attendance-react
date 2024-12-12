import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  applyLeaveRequestApi,
  employeeCountsCalenderApi,
} from "../../store/Services";
import { toast } from "react-hot-toast";
import FullScreenLoader from "../../ReuseableComponent/FullScreenLoader";

const ApplyLeave = ({ userId }: any) => {
  const [isLoading, setIsLoading]: any = useState(false);
  const [countResults, setCountResults]: any = useState({});

  const validationSchema = Yup.object({
    fromDate: Yup.date().required("From date is required"),
    toDate: Yup.date()
      .required("To date is required")
      .min(Yup.ref("fromDate"), "To date cannot be before From date"),
    leaveType: Yup.string().required("Leave type is required"),
    reason: Yup.string()
      .required("Reason is required")
      .min(10, "Reason must be at least 10 characters long"),
  });

  const formik = useFormik({
    initialValues: {
      fromDate: "",
      toDate: "",
      leaveType: "",
      reason: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      applyLeaveRequestApi({
        body: {
          leave_type: values?.leaveType,
          from_date: values?.fromDate,
          to_date: values?.toDate,
          reason: values?.reason,
          uuid: userId || sessionStorage.getItem("userId"),
        },
      })
        .then(() => {
          toast.success("Leave apply successfully.");
          setIsLoading(false);
        })
        .catch((err: any) => {
          toast.error(err?.data?.detail);
          setIsLoading(false);
        });
    },
  });

  useEffect(() => {
    employeeCountsCalenderApi({
      query: {
        uuid: userId || sessionStorage.getItem("userId"),
      },
    })
      .then((res: any) => {
        setCountResults(res?.response_data);
      })
      .catch((err: any) => console.log("err", err));
  }, [userId]);

  return (
    <div>

   
    <div className="Leave-component">
      <FullScreenLoader loading={isLoading} />
      <form className="leave-content" onSubmit={formik.handleSubmit}>
        <h3>Apply Leave</h3>
        <div className="leave-available flex space-bw alc">
          <div className="leave-duration flex ">
            <div className="duration-from">
              <label htmlFor="fromDate">From</label>
              <input
                type="date"
                id="fromDate"
                name="fromDate"
                value={formik.values.fromDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.fromDate && formik.errors.fromDate ? (
                <p className="error">{formik.errors.fromDate}</p>
              ) : null}
            </div>
            <div className="duration-from">
              <label htmlFor="toDate">To</label>
              <input
                type="date"
                id="toDate"
                name="toDate"
                value={formik.values.toDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.toDate && formik.errors.toDate ? (
                <p className="error">{formik.errors.toDate}</p>
              ) : null}
            </div>
          </div>
          <div className="flex">
            <div className="el-available">
              <p>EL Available: {countResults?.earned_leave}</p>
            </div>
            <div className="sl-available">
              <p>SL Available: {countResults?.sick_leave}</p>
            </div>
          </div>
        </div>
        <div className="employee-details">
          <div className="employee-name flex alc">
            <p>Employee Name:</p>&nbsp;&nbsp;
            <span>Pranav Kumar</span>
          </div>
          <div className="employee-name">
            <label htmlFor="leaveType">Type of Leave</label>
            <select
              id="leaveType"
              name="leaveType"
              value={formik.values.leaveType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Select Leave Type</option>
              <option value="Earned">EARNED LEAVE</option>
              <option value="Sick">SICK LEAVE</option>
            </select>
          </div>
          {formik.touched.leaveType && formik.errors.leaveType ? (
            <p className="error">{formik.errors.leaveType}</p>
          ) : null}
          <div className="employee-name">
            <label htmlFor="reason">Reason for Applying</label>
            <textarea
              id="reason"
              name="reason"
              rows={4}
              cols={10}
              value={formik.values.reason}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.reason && formik.errors.reason ? (
            <p className="error">{formik.errors.reason}</p>
          ) : null}
          <div className="submit-cancel flex space-bw">
            <button type="submit">Apply</button>
            <button type="button" onClick={formik.handleReset}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
    <div className="applied-employee">
        <div className="all-employees mt">
                  <div className="flex space-bw alc top-h">
                    <h3>Applied Leaves</h3>
                  </div>
                  <table>
                    <tr>
                      <th>Name</th>
                      <th>Role</th>
                      <th>Apply Date</th>
                      <th>From Date</th>
                      <th>To Date</th>
                      <th>Status</th>
                      <th>Option</th>
                    </tr>
      
                    
                  </table>
                </div>
    </div>
    </div>
  );
};

export default ApplyLeave;
