import React from "react";
import { Calendar } from "rsuite";
import "rsuite/Calendar/styles/index.css";

const EmployeeCalander = () => {
  return (
    <div>
      <Styles />
      <Calendar bordered />
    </div>
  );
};

const Styles = () => {
  return (
    <style>{`.bg-gray { background-color: rgba(242, 242, 242, 0.3);}`}</style>
  );
};

export default EmployeeCalander;
