import React, { useEffect, useState } from "react";
import "../css/EmployeePayRoll.css";
import Logo from "../assets/images/logo.png";
import deleteimg from "../assets/icons/delete-black-18dp.svg";
import editimg from "../assets/icons/create-black-18dp.svg";
import adduserimg from "../assets/icons/add-24px.svg";
import profile1 from "../assets/profile-images/Ellipse -1.png";
import profile2 from "../assets/profile-images/Ellipse -2.png";
import profile3 from "../assets/profile-images/Ellipse -3.png";
import profile4 from "../assets/profile-images/Ellipse -4.png";
import img from "../assets/profile-images/Ellipse -3.png";
import EmployeeService from "../Service/EmployeeService";
import { useNavigate } from "react-router-dom";

function EmployeePayroll() {
  const navigate = useNavigate();
  const [empObj, setempObj] = useState({ empDetailArr: [] });
  let display = () => {
    EmployeeService.getAllEmployee().then((response) => {
      console.log(response);
      setempObj({ empDetailArr: response.data });
    });
    // console.log(empObj);
  };
  useEffect(() => {
    display();
    console.log("displayed");
  }, []);

  let deleteEmp = (employee_id) => {
    var ans = window.confirm("Data deleted can not be recovered! DELETE?");
    if (ans === true) {
      EmployeeService.deleteEmployeeById(employee_id)
        .then((response) => {
          console.log(response.data.data);
          window.location.reload();
          display();
        })
        .catch((error) => {
          console.log(error);
        });
      alert("Deleted Successfully");
    } else {
      alert("Data Not Deleted");
    }
  };
  const editEmp = (employee_id) => {
    console.log(employee_id);
    navigate(`/home/${employee_id}`);
  };

  return (
    <div>
      <body>
        <header className="header-content header">
          <div className="logo-content">
            <img src={Logo} alt="logo" />
            <div>
              <span className="emp-text">EMPLOYEE</span>
              <br />
              <span className="emp-text emp-payroll">PAYROLL</span>
            </div>
          </div>
        </header>
        <div class="main-content">
          <div class="header-content">
            <div class="emp-detail-text">
              Employee Details
              <div class="emp-count" id="empcount">
                {empObj.empDetailArr.length}
              </div>
            </div>
            <a href="http://localhost:3000/" class="add-button">
              <img src={adduserimg} alt="" />
              Add User
            </a>
          </div>
          <div class="table-main">
            <table id="table-display" class="table">
              <tbody>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Department</th>
                  <th>salary</th>
                  <th>startDate</th>
                  <th>action</th>
                </tr>
                {empObj.empDetailArr &&
                  empObj.empDetailArr.map((employee, index) => (
                    <tr key={index}>
                      <td>
                        <img
                          class="profile"
                          alt=""
                          src={
                            employee.profilePic ===
                            "../assets/profile-images/Ellipse -1.png"
                              ? profile1
                              : employee.profilePic ===
                                "../assets/profile-images/Ellipse -2.png"
                              ? profile2
                              : employee.profilePic ===
                                "../assets/profile-images/Ellipse -3.png"
                              ? profile3
                              : profile4
                          }
                        />{" "}
                      </td>
                      <td>{employee.name}</td>
                      <td>{employee.gender}</td>
                      <td>
                        {employee.departments.map((dept, i) => (
                          <div class="dept-label">{dept}</div>
                        ))}
                      </td>
                      <td>{employee.salary}</td>
                      <td>{employee.startDate}</td>
                      <td>
                        <img
                          id="6"
                          // onclick="remove(this)"
                          alt="delete"
                          src={deleteimg}
                          onClick={() => {
                            deleteEmp(employee.emp_id);
                          }}
                        />
                        <img
                          id="6"
                          onClick={() => {
                            editEmp(employee.emp_id);
                          }}
                          alt="edit"
                          src={editimg}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div class="table-main">
          <div id="table-display" class="table"></div>
        </div>
      </body>
    </div>
  );
}

export default EmployeePayroll;
