import React, { useEffect, useState } from "react";
import Sidebar from "../../ReuseableComponent/Sidebar";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createAnouncementsApi,
  listAnouncementsApi,
} from "../../store/Services";
import { toast } from "react-hot-toast";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Pagination } from "antd";
import AnounceMentList from "../../ReuseableComponent/AnounceMentList";

dayjs.extend(relativeTime);
const Anouncement = () => {
  const [refetchList, setRefetchList]: any = useState(false);
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(3, "Title must be at least 3 characters long")
        .required("Title is required"),
      description: Yup.string()
        .min(10, "Description must be at least 10 characters long")
        .required("Description is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      createAnouncementsApi({
        body: {
          title: values.title,
          desc: values.description,
        },
      })
        .then((res: any) => {
          toast.success("Anouncement Created successfully.");
          resetForm();
          setRefetchList(true);
        })
        .catch((err: any) => {
          toast.error("Something went wrong");
        });
    },
  });

  return (
    <div className="flex">
      <Sidebar current={"Anouncement"} />
      <div className="main-area">
        <div className="all-employees">
          <h3>Create Announcement</h3>
          <form onSubmit={formik.handleSubmit} className="anouncement-form">
            <div className="title">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.title && formik.errors.title && (
                <div className="error">{formik.errors.title}</div>
              )}
            </div>
            <div className="description">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                rows={4}
                cols={10}
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></textarea>
              {formik.touched.description && formik.errors.description && (
                <div className="error">{formik.errors.description}</div>
              )}
            </div>
            <div className="submit-btn">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
        <AnounceMentList
          refetchList={refetchList}
          setRefetchList={setRefetchList}
        />
      </div>
    </div>
  );
};

export default Anouncement;
