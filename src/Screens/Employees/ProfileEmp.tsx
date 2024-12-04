import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { getParticularEmployee } from "../../store/Services";

const ProfileEmp = ({ userId }: any) => {
  const [userDetails, setUserDetails]: any = useState({});
  useEffect(() => {
    getParticularEmployee({
      query: {
        uuid: userId,
      },
    })
      .then((res: any) => {
        console.log("res", res);
        setUserDetails(res?.data);
      })
      .catch((err: any) => {
        console.log("err", err);
      });
  }, []);
  return (
    <div className="all-employees profile-main">
      <div className="profile-page">
        <div className="profile-upper flex alc">
          <div className="user-picture">
            <FaUserCircle size={60} />
          </div>
          <div className="userfinalname">
            <p>
              {userDetails?.first_name} {userDetails?.last_name}
            </p>
            <p>{userDetails?.email}</p>
          </div>
        </div>

        <div className="flex space-bw alc ">
          <div className="form-group">
            <label>First Name</label>
            <p>{userDetails?.first_name}</p>
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <p>{userDetails?.last_name}</p>
          </div>
        </div>
        <div className="flex space-bw alc">
          <div className="form-group">
            <label>Email</label>
            <p>{userDetails?.email}</p>
          </div>
          <div className="form-group">
            <label>Contact</label>
            <p>{userDetails?.phone_number}</p>
          </div>
        </div>
        <div className="flex space-bw alc">
          <div className="form-group">
            <label>Gender</label>
            <p>{userDetails?.gender}</p>
          </div>
          <div className="form-group">
            <label>Date of Birth</label>
            <p>{userDetails?.dob}</p>
          </div>
        </div>
        <div className="flex space-bw alc">
          <div className="form-group">
            <label>Date of Joining</label>
            <p>{userDetails?.joining_date}</p>
          </div>
          <div className="form-group">
            <label>Designation</label>
            <p>{userDetails?.designation}</p>
          </div>
        </div>
        <div className="form-group-textarea">
          <label>Address</label>
          <p>{userDetails?.address}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileEmp;
