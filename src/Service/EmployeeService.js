import axios from "axios";

class EmployeeService {
  baseUrl = "http://localhost:8080/employee";

  addEmployee(data) {
    return axios.post(`${this.baseUrl + "/add"}`, data);
  }
  getAllEmployee() {
    return axios.get(`${this.baseUrl}/getAllEmp`);
  }
  getEmployeeById(employee_id) {
    return axios.get(`${this.baseUrl}/getEmp/${employee_id}`);
  }
  deleteEmployeeById(employee_id) {
    return axios.delete(`${this.baseUrl}/deleteEmp/${employee_id}`);
  }
  editEmployeeById(employee_id, data) {
    return axios.put(`${this.baseUrl}/editEmp/${employee_id}`, data);
  }
}

export default new EmployeeService();
