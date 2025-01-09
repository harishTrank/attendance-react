import React from "react";
import { FaDownload } from "react-icons/fa";

const Personal = () => {
  return (
    <div className="personal-component">
      <div className="personal-content">
      <h3>Upload documents</h3>
      <div className="flex space-bw">
        <div className="upload-section col-50">
         <h4>Personal Details</h4>
          <div className="first-document ">
            <div className="aadhar">
              <label htmlFor="">Aadhar Card</label>

              <input type="file" placeholder="Upload File" />
              <button>
                <FaDownload />
              </button>
            </div>
            <div className="pan-card">
              <label htmlFor="">Pan Card</label>

              <input type="file" placeholder="Upload File" />
              <button>
                <FaDownload />
              </button>
            </div>
          </div>
        </div>
        <div className="upload-section col-50">
          <h4>Bank Details</h4>
          <div className="first-document ">
            <div className="aadhar">
              <label htmlFor="">Cheque</label>

              <input type="file" placeholder="Upload File" />
              <button>
                <FaDownload />
              </button>
            </div>
            <div className="pan-card">
              <label htmlFor="">Passbook</label>

              <input type="file" placeholder="Upload File" />
              <button>
                <FaDownload />
              </button>
            </div>
          </div>
        </div>
        </div>
        <div className="flex space-bw">

       
        <div className="upload-section col-50">
          <h4>Education Details</h4>
          <div className="first-document ">
            <div className="aadhar">
              <label htmlFor="">10th Certificate</label>

              <input type="file" placeholder="Upload File" />
              <button>
                <FaDownload />
              </button>
            </div>
            <div className="pan-card">
              <label htmlFor="">12th Certificate</label>

              <input type="file" placeholder="Upload File" />
              <button>
                <FaDownload />
              </button>
            </div>
            <div className="pan-card">
              <label htmlFor="">Graduation Certificate</label>

              <input type="file" placeholder="Upload File" />
              <button>
                <FaDownload />
              </button>
            </div>
          </div>
        </div>
        <div className="upload-section col-50">
          <h4>Experience Details</h4>
          <div className="first-document ">
            <div className="aadhar">
              <label htmlFor="">Offer Letter</label>

              <input type="file" placeholder="Upload File" />
              <button>
                <FaDownload />
              </button>
            </div>
            <div className="pan-card">
              <label htmlFor="">Experience Letter</label>

              <input type="file" placeholder="Upload File" />
              <button>
                <FaDownload />
              </button>
            </div>
            <div className="pan-card">
              <label htmlFor="">Payslip</label>

              <input type="file" placeholder="Upload File" />
              <button>
                <FaDownload />
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Personal;
