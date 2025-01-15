import React, { useEffect, useState } from "react";
import { FaDownload, FaFileUpload } from "react-icons/fa";
import { DocumentuploadApi, getDocument, getParticularEmployee } from "../../store/Services";
import { toast } from "react-hot-toast";

import { FaEye } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa";
import { BsBank2 } from "react-icons/bs";
import { FaUserGraduate } from "react-icons/fa6";
import { LuNewspaper } from "react-icons/lu";



const Personal = ({userId}:any) => {
    const[Files,setFiles]:any=useState({})
    const [User,setUser]:any=useState({})
     useEffect(() => {
        getParticularEmployee({
          query: {
            uuid: userId || sessionStorage.getItem("userId"),
          },
        })
          .then((res: any) => {
            setUser(res?.data);
            
          })
          .catch((err: any) => {
            console.log("err", err);
          });
      }, []);
    
    

   
    const handleFileChange = (e:any, documentType:any) => {
        const file = e.target.files[0];
        setFiles((prevFiles:any) => ({
          ...prevFiles,
          [documentType]: file,
        }));
      };
      const handleUpload = (documentType:any) => {
        const file = Files[documentType];
        if (file) {
          const formData = new FormData();
          formData.append("document_type", documentType);
          formData.append("file", file);
          formData.append("uuid", User?.uuid);
    
          DocumentuploadApi({
            body: formData,
          })
            .then((response) => {
              console.log("Upload success:", response);
              toast.success("File uploaded Successfully")
            })
            .catch((error) => {
              console.error("Upload failed:", error);
              toast.error("Please select file")
            });
        } else {
          toast.error("Please select file to upload")
        }
      };

      const getPapers = (documentType: any) => {
        getDocument({
          query: {
            uuid: User?.uuid,
            document_type: documentType, 
          },
        })
          .then((response:any) => {
            const fileUrl = response?.file_url; 
            if (fileUrl) {
              window.open(fileUrl, "_blank"); 
            }else{
              toast.error('No file for preview')
            }
          })
          .catch((error) => {
            console.error("Error fetching document:", error);
            toast.error("No File Found");
          });
      };

    

  
  return (
    <div className="personal-component">
      <div className="personal-content">
      <h3>Upload documents</h3>
      <div className="flex space-bw">
        <div className="upload-section col-50">
         <h4 className="flex alc"><FaAddressCard size={22} color="#3354F4"/>&nbsp;&nbsp;&nbsp;Personal Details</h4>
          <div className="first-document ">
            <div className="aadhar">
              <label htmlFor="">Aadhar Card</label>
              <div className="flex alc">

              <input type="file" placeholder="Upload File" onChange={(e) => handleFileChange(e, "AADHAR")} />
             
             
              <button onClick={() => handleUpload("AADHAR")}>
              <FaFileUpload />    

              </button>
              <button onClick={() => getPapers("AADHAR")} ><FaEye/></button>
             
              </div>
            </div>
            <div className="pan-card">
              <label htmlFor="">Pan Card</label>

              <input type="file" placeholder="Upload File" onChange={(e) => handleFileChange(e, "PAN")}/>
              <button onClick={() => handleUpload("PAN")}>
                <FaFileUpload/>
              </button>
              <button  onClick={() => getPapers("PAN")}><FaEye/></button>
             
            </div>
          </div>
        </div>
        <div className="upload-section col-50">
          <h4 className="flex alc"><BsBank2 size={22} color="#3354F4"/>&nbsp;&nbsp;&nbsp;Bank Details</h4>
          <div className="first-document ">
            <div className="aadhar">
              <label htmlFor="">Cheque</label>

              <input type="file" placeholder="Upload File"  onChange={(e) => handleFileChange(e, "CHEQUE")}  className="custom-file-input"/>
              
              <button onClick={() => handleUpload("CHEQUE")}>
                <FaFileUpload/>
              </button>
              <button onClick={() => getPapers("CHEQUE")}><FaEye/></button>
             
            </div>
            <div className="pan-card">
              <label htmlFor="">Passbook</label>

              <input type="file" placeholder="Upload File" onChange={(e) => handleFileChange(e, "PASSBOOK")}/>
              <button onClick={() => handleUpload("PASSBOOK")}>
              <FaFileUpload/>
              </button>
              <button onClick={() => getPapers("PASSBOOK")}><FaEye/></button>
             
            </div>
          </div>
        </div>
        </div>
        <div className="flex space-bw">

       
        <div className="upload-section col-50">
          <h4><FaUserGraduate size={22} color="#3354F4"/>&nbsp;&nbsp;&nbsp;Education Details</h4>
          <div className="first-document ">
            <div className="aadhar">
              <label htmlFor="">10th Certificate</label>

              <input type="file" placeholder="Upload File" onChange={(e) => handleFileChange(e, "MARKSHEET_10")} />
              <button onClick={() => handleUpload("MARSHEET_10")}>
              <FaFileUpload/>
              </button>
              <button onClick={() => getPapers("MARKSHEET_10")}><FaEye/></button>
             
            </div>
            <div className="pan-card" >
              <label htmlFor="">12th Certificate</label>

              <input type="file" placeholder="Upload File" onChange={(e) => handleFileChange(e, "MARKSHEET_12")} />
              <button  onClick={() => handleUpload("MARSHEET_12")}>
              <FaFileUpload/>
              </button>
              <button onClick={() => getPapers("MARKSHEET_12")}><FaEye/></button>
             
            </div>
            <div className="pan-card">
              <label htmlFor="">Graduation Certificate</label>

              <input type="file" placeholder="Upload File" onChange={(e) => handleFileChange(e, "GRADUATION")}/>
              <button  onClick={() => handleUpload("GRADUATION")}>
              <FaFileUpload/>
              </button>
              <button onClick={() => getPapers("GRADUATION")}><FaEye/></button>
            
            </div>
          </div>
        </div>
        <div className="upload-section col-50">
          <h4><LuNewspaper size={22} color="#3354F4"/>&nbsp;&nbsp;&nbsp;Experience Details</h4>
          <div className="first-document ">
            <div className="aadhar">
              <label htmlFor="">Offer Letter</label>

              <input type="file" placeholder="Upload File"  onChange={(e) => handleFileChange(e, "OFFER_LETTER")} />
              <button  onClick={() => handleUpload("OFFER_LETTER")}>
              <FaFileUpload/>
              </button>
              <button onClick={() => getPapers("OFFER_LETTER")}><FaEye/></button>
              
            </div>
            <div className="pan-card">
              <label htmlFor="">Experience Letter</label>

              <input type="file" placeholder="Upload File" onChange={(e) => handleFileChange(e, "EXP_LETTER")}/>
              <button  onClick={() => handleUpload("EXP_LETTER")}>
              <FaFileUpload/>
              </button>
              <button onClick={() => getPapers("EXP_LETTER")}><FaEye/></button>
             
            </div>
            <div className="pan-card">
              <label htmlFor="">Payslip</label>

              <input type="file" placeholder="Upload File"  onChange={(e) => handleFileChange(e, "PAYSLIP")} />
              <button  onClick={() => handleUpload("PAYSLIP")}>
              <FaFileUpload/>
              </button>
              <button onClick={() => getPapers("PAYSLIP")}><FaEye/></button>
              
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Personal;
