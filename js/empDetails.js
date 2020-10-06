let employee,
    empHead = document.querySelector('.emp_head'),
    empData = document.querySelector('.emp_data');

(function getEmp(){
    let getEmpId = new URLSearchParams(location.search),
    empId = getEmpId.get('empId'),
    allEmployees = JSON.parse(localStorage.getItem('employeesdata'));
    for (let i = 0; i < allEmployees.length; i++) {
        if (empId==allEmployees[i].id){
            employee=allEmployees[i];
            putEmployeesData();
        }
    }
})();

//==========================set emp data ================

empHead.innerHTML=`employee : ${employee.name}`;


function putEmployeesData(){
    empData.innerHTML = `<div class="row">
    <div class="col-md-6 text-center">
        <img src="${employee.gender=='female'?'images/female.png':'images/male.png'}"  class="img-fluid"/>
    </div>
    <div class="col-md-6">
        <ul>
            <li class="mb-2">Employees Data:</li>
            <li class="mb-2">Id : ${employee.id}</li>
            <li class="mb-2">Name :  ${employee.name}</li>
            <li class="mb-2">Age : ${employee.age}</li>
            <li class="mb-2">Gender : ${employee.gender}</li>
            <li class="mb-2">Title : ${employee.title}</li>
            <li class="mb-2">Phone : ${employee.phone}</li>
            <li class="mb-2">Salary : ${employee.salary}</li>
            <li class="mb-2">Date Added : ${employee.addedDate}</li>
        </ul>
    </div>
    </div>`
}