import React, { useEffect, useState } from "react";
import "../css/Home.css";
import profile1 from "../assets/profile-images/Ellipse -1.png";
import profile2 from "../assets/profile-images/Ellipse -2.png";
import profile3 from "../assets/profile-images/Ellipse -3.png";
import profile4 from "../assets/profile-images/Ellipse -4.png";
import logo from "../logo.svg";
import Logo from "../assets/images/logo.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import EmployeeService from "../Service/EmployeeService";

function Home() {
  const navigate = useNavigate();
  // const param = useParams();
  let initialValue = {
    Name: "",
    Profile: "",
    Gender: "",
    Department: ["HR", "Sales", "Finance", "Engineer", "others"],
    Salary: "",
    StartDate: "",
    Notes: "",
    Day: "",
    Month: "",
    Year: "",
    departmentArr: [],
    isUpdate: false,
  };
  const [user, setUser] = useState(initialValue);

  let name, value;

  const handleInputs = (event) => {
    console.log(event);
    name = event.target.name;
    value = event.target.value;

    setUser({ ...user, [name]: value });
  };
  const onSub = (event) => {
    event.preventDefault();
    // console.log(event);
    console.log(user);
    let object = {
      name: user.Name,
      profilePic: user.Profile,
      gender: user.Gender,
      departments: user.departmentArr,
      startDate: `${user.Day} ${user.Month} ${user.Year}`,
      salary: user.Salary,
      note: user.Notes,
    };
    console.log(object);
    if (!user.isUpdate) {
      EmployeeService.addEmployee(object)
        .then((Response) => {
          alert("Data saved ");
          navigate("/employeelist");
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (user.isUpdate) {
      var ans = window.confirm("Confirm !?");
      if (ans === true) {
        EmployeeService.editEmployeeById(params.id, object)
          .then((data) => {
            console.log(data.data.data);
            navigate("/employeelist");
            alert("Data updated successfully..!!");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    console.log(object);
  };

  let onDepartmentChange = (event) => {
    let departmentName = event.target.value;
    onCheckChangeDept(departmentName);
    // let index = user.departmentArr.indexOf(departmentName);
    // let checkArray = [...user.departmentArr];
    // if (index > -1) {
    //   checkArray.splice(index, 1);
    // } else {
    //   checkArray.push(departmentName);
    // }
    // setUser({ ...user, departmentArr: checkArray });
  };
  // const onChange = (e) => {};

  let onCheckChangeDept = (name) => {
    let index = user.departmentArr.indexOf(name);
    let checkArray = [...user.departmentArr];
    if (index > -1) {
      checkArray.splice(index, 1);
    } else {
      checkArray.push(name);
    }
    setUser({ ...user, departmentArr: checkArray });
  };

  const params = useParams();
  useEffect(() => {
    if (params.id) {
      getDataById(params.id);
    }
  }, [params.id]);

  const getDataById = (id) => {
    EmployeeService.getEmployeeById(id)
      .then((responce) => {
        console.log(responce.data.name);
        let object = responce.data;
        setData(object);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const setData = (obj) => {
    let array = obj.startDate;
    console.log(array[6] + " " + array[7] + " " + array[8] + " " + array[9]);
    // console.log(obj);

    setUser({
      ...user,
      ...obj,
      id: obj.emp_id,
      Name: obj.name,
      Salary: obj.salary,
      Profile: obj.profilePic,
      Gender: obj.gender,
      departmentArr: obj.departments,
      isUpdate: true,
      Day: array[0] + array[1],
      Month: array[3] + array[4] + array[5],
      Year: array[7] + array[8] + array[9] + array[10],
      Notes: obj.note,
    });
    console.log(user);
  };

  const getChecked = (data) => {
    return user.departmentArr && user.departmentArr.includes(data);
  };
  return (
    <div>
      <header className="header-content header">
        <div className="logo-content">
          <Link to="/employeelist">
            <img src={Logo} alt="logo" />
          </Link>
          <div>
            <span className="emp-text">EMPLOYEE</span>
            {/* {<Link to="/item">/* </Link> */}
            <span className="emp-text emp-payroll">PAYROLL</span>
          </div>
        </div>
      </header>

      <div className="form-content">
        <form className="form">
          <div className="form-head">Employee Payroll form</div>
          <div className="row-content">
            <label className="label text" for="name">
              Name
            </label>
            <input
              className="input"
              type="text"
              id="name"
              name="Name"
              placeholder="Enter Your Name"
              value={user.Name}
              onChange={handleInputs}
              required
            />
            <error-output className="name-error" for="name"></error-output>
          </div>
          <div className="row-content">
            <label className="label text" for="profile">
              Profile Image
            </label>
            <div className="profile-radio-content">
              <label>
                <input
                  type="radio"
                  id="profile1"
                  name="Profile"
                  value="../assets/profile-images/Ellipse -1.png"
                  checked={
                    user.Profile === "../assets/profile-images/Ellipse -1.png"
                  }
                  onChange={handleInputs}
                  required
                />
                <img
                  className="profile"
                  id="image1"
                  src={profile1}
                  alt=" logo "
                />
              </label>
              <label>
                <input
                  type="radio"
                  id="profile2"
                  name="Profile"
                  value="../assets/profile-images/Ellipse -2.png"
                  checked={
                    user.Profile === "../assets/profile-images/Ellipse -2.png"
                  }
                  onChange={handleInputs}
                  required
                />
                <img
                  className="profile"
                  id="image2"
                  src={profile2}
                  alt=" logo "
                />
              </label>
              <label>
                <input
                  type="radio"
                  id="profile3"
                  name="Profile"
                  value="../assets/profile-images/Ellipse -3.png"
                  checked={
                    user.Profile === "../assets/profile-images/Ellipse -3.png"
                  }
                  onChange={handleInputs}
                  required
                />
                <img
                  className="profile"
                  id="image3"
                  src={profile3}
                  alt=" logo "
                />
              </label>
              <label>
                <input
                  type="radio"
                  id="profile4"
                  name="Profile"
                  value="../assets/profile-images/Ellipse -4.png"
                  checked={
                    user.Profile === "../assets/profile-images/Ellipse -4.png"
                  }
                  onChange={handleInputs}
                  required
                />
                <img
                  className="profile"
                  id="image4"
                  src={profile4}
                  alt=" logo "
                />
              </label>
            </div>
          </div>
          <div className="row-content">
            <label className="label text" for="gender">
              Gender
            </label>
            <div>
              <input
                type="radio"
                id="Male"
                name="Gender"
                value="Male"
                onChange={handleInputs}
                checked={user.Gender === "Male"}
              />
              <label className="text" for="male">
                Male
              </label>
              <input
                type="radio"
                id="Female"
                name="Gender"
                value="Female"
                onChange={handleInputs}
                checked={user.Gender === "Female"}
              />
              <label className="text" for="male">
                Female
              </label>
            </div>
          </div>
          <div className="row-content">
            <label className="label text" for="department">
              Department
            </label>
            <div>
              {/* {user.Department.map((item) => {
                <span key={item}>
                  <input
                    type="checkbox"
                    className="checkbox"
                    onChange={() => onCheckChangeDept(item)}
                    name={item}
                    checked={getChecked(item)}
                    value={item}
                  />
                  <label className="text" htmlFor={item}>
                    {item}
                  </label>
                </span>;
              })} */}
              <input
                className="checkbox"
                type="checkbox"
                id="hr"
                name="Department"
                checked={getChecked("HR")}
                onChange={onDepartmentChange}
                value="HR"
              />
              <label className="text" for="hr">
                HR
              </label>
              <input
                className="checkbox"
                type="checkbox"
                id="sales"
                name="Department"
                // value={user.Department}
                value="Sales"
                checked={getChecked("Sales")}
                onChange={onDepartmentChange}
              />
              <label className="text" for="sales">
                Sales
              </label>
              <input
                className="checkbox"
                type="checkbox"
                id="finance"
                name="Department"
                // value={user.Department}
                value="Finance"
                checked={getChecked("Finance")}
                onChange={onDepartmentChange}
              />
              <label className="text" for="finance">
                Finance
              </label>
              <input
                className="checkbox"
                type="checkbox"
                id="engineer"
                name="Department"
                // value={user.Department}
                value="Engineer"
                checked={getChecked("Engineer")}
                onChange={onDepartmentChange}
              />
              <label className="text" for="engineer">
                Engineer
              </label>
              <input
                className="checkbox"
                type="checkbox"
                id="others"
                name="Department"
                checked={getChecked("others")}
                // value={user.Department}
                value="others"
                onChange={onDepartmentChange}
              />
              <label className="text" for="others">
                Others
              </label>
            </div>
          </div>
          <div className="row-content">
            <label className="label text" for="salary">
              Salary
            </label>
            <div className="salary">
              <select
                name="Salary"
                id="salary"
                value={user.Salary}
                onChange={handleInputs}
              >
                <option value="" disabled selected hidden>
                  select Salary
                </option>
                {/* <option value="0">Enter Your Salary</option> */}
                <option value="10000">10000</option>
                <option value="20000">20000</option>
                <option value="30000">30000</option>
                <option value="40000">40000</option>
                <option value="50000">50000</option>
                <option value="60000">60000</option>
                <option value="70000">70000</option>
                <option value="80000">80000</option>
                <option value="90000">90000</option>
                <option value="100000">100000</option>
                <option value="110000">110000</option>
                <option value="120000">120000</option>
                <option value="130000">130000</option>
                <option value="140000">140000</option>
                <option value="150000">150000</option>
                <option value="160000">160000</option>
                <option value="170000">170000</option>
                <option value="180000">180000</option>
                <option value="190000">190000</option>
                <option value="200000">200000</option>
                <option value="210000">210000</option>
                <option value="220000">220000</option>
                <option value="230000">230000</option>
                <option value="240000">240000</option>
                <option value="250000">250000</option>
                <option value="260000">260000</option>
                <option value="270000">270000</option>
                <option value="280000">280000</option>
                <option value="290000">290000</option>
                <option value="300000">300000</option>
                <option value="310000">310000</option>
              </select>
            </div>
            {/* <label className="label text" for="salary">Salary</label>
                <input className="input" type="range" name="salary" id="salary" min="10000" max="500000" step="5000" value="400000"/>
                <output className="salary-output text" for="salary">400000</output> */}
          </div>
          <div className="row-content">
            <label className="label text" for="startDate">
              Start Date
            </label>
            <div className="startDate">
              <select
                name="Day"
                id="day"
                value={user.Day}
                onChange={handleInputs}
              >
                <option value="" disabled selected hidden>
                  Day
                </option>
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
                <option value="06">06</option>
                <option value="07">07</option>
                <option value="08">08</option>
                <option value="09">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
                <option value="26">26</option>
                <option value="27">27</option>
                <option value="28">28</option>
                <option value="29">29</option>
                <option value="30">30</option>
                <option value="31">31</option>
              </select>
              <select
                id="month"
                name="Month"
                value={user.Month}
                onChange={handleInputs}
              >
                <option value="" disabled selected hidden>
                  Month
                </option>
                <option value="Jan">January</option>
                <option value="Feb">February</option>
                <option value="Mar">March</option>
                <option value="Apr">April</option>
                <option value="May">May</option>
                <option value="Jun">June</option>
                <option value="Jul">July</option>
                <option value="Aug">August</option>
                <option value="Sep">September</option>
                <option value="Oct">October</option>
                <option value="Nov">November</option>
                <option value="Dec">December</option>
              </select>
              <select
                id="year"
                name="Year"
                value={user.Year}
                onChange={handleInputs}
              >
                <option value="" disabled selected hidden>
                  Year
                </option>
                <option value="2023">2023</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
              </select>
            </div>
            <error-output className="date-error" for="startDate"></error-output>
          </div>
          <div className="row-content">
            <label className="label text" for="notes">
              Notes
            </label>
            <textarea
              id="notes"
              className="input"
              name="Notes"
              value={user.Notes}
              onChange={handleInputs}
            ></textarea>
            {/* style="height:100px" */}
          </div>
          <div className="buttonParent">
            <Link to="/employeelist" className="cancelButton button">
              Cancel
            </Link>
            <div className="submit-reset">
              <button
                type="submit"
                className="button submitButton"
                id="submitButton"
                onClick={onSub}
              >
                {user.isUpdate ? "Update" : "Submit"}
              </button>
              <button type="reset" className="resetButton button">
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Home;
