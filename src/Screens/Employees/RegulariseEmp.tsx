import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { applyRegularizationApi } from "../../store/Services";
import { toast } from "react-hot-toast";

const RegulariseEmp = ({ userId }: any) => {
  const formik = useFormik({
    initialValues: {
      inTime: "",
      outTime: "",
      date: "",
      reason: "", // Optional
    },
    validationSchema: Yup.object({
      inTime: Yup.string()
        .required("InTime is required")
        .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:mm)"),
      outTime: Yup.string()
        .required("OutTime is required")
        .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:mm)")
        .test(
          "is-greater",
          "OutTime must be greater than InTime",
          function (value) {
            const { inTime } = this.parent;
            if (!inTime || !value) return true;
            return value > inTime;
          }
        ),
      date: Yup.string().required("Date is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      applyRegularizationApi({
        query: {
          uuid: userId || sessionStorage.getItem("userId"),
        },
        body: {
          date: values.date,
          in_time: values.inTime,
          out_time: values.outTime,
          reason: values.reason,
        },
      })
        .then(() => {
          resetForm();
          toast.success("Regularize Applied successfully.");
        })
        .catch((err: any) => toast.error(err.data?.message));
    },
  });

  return (
    <div className="Leave-component">
      <div className="leave-content">
        <h3>Regularize</h3>
        <form onSubmit={formik.handleSubmit}>
          <div className="employee-details">
            <div className="employee-name flex alc">
              <p>Employee Name:</p>&nbsp;&nbsp;
              <span>Pranav Kumar</span>
            </div>
            <div className="in-out flex alc">
              <div className="reg-in">
                <label htmlFor="inTime">InTime</label>
                <input
                  type="time"
                  id="inTime"
                  name="inTime"
                  value={formik.values.inTime}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.inTime && formik.errors.inTime ? (
                  <div className="error">{formik.errors.inTime}</div>
                ) : null}
              </div>
              <div className="reg-in">
                <p>:</p>
              </div>
              <div className="reg-in">
                <label htmlFor="outTime">OutTime</label>
                <input
                  type="time"
                  id="outTime"
                  name="outTime"
                  value={formik.values.outTime}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.outTime && formik.errors.outTime ? (
                  <div className="error">{formik.errors.outTime}</div>
                ) : null}
              </div>
              <div className="reg-in">
                <p>:</p>
              </div>
              <div className="reg-in">
                <label htmlFor="date">Select Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formik.values.date}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.date && formik.errors.date ? (
                  <div className="error">{formik.errors.date}</div>
                ) : null}
              </div>
            </div>
            <div className="employee-name">
              <label htmlFor="reason">Reason</label>
              <textarea
                rows={4}
                cols={10}
                id="reason"
                name="reason"
                value={formik.values.reason}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="submit-cancel flex space-bw">
              <button type="submit" style={{ width: "100%" }}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegulariseEmp;
