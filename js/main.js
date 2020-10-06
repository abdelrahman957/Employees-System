//============================crud operations========================
let empName = document.getElementById('emp_name'),
    empAge = document.getElementById('emp_age'),
    empPhone = document.getElementById('emp_phone'),
    empSalary = document.getElementById('emp_salary'),
    empTitle = document.getElementById('emp_title'),
    empGender = Array.from(document.getElementsByName('gender')),
    allEmployees = [],
    showData = document.querySelector('.employeesData'),
    serachHd = document.querySelector('.serach_hd'),
    systemMessage = 'grid',
    controls = document.querySelector('.pagination'),
    maxPageNo=1,
    searchControls = document.querySelector('.pagination_search'),
    alertRepeat = document.querySelector('.form_alert_repeat');


//========= check local storage =========
(function () {
    if (localStorage.getItem('employeesdata') != null) {
        allEmployees = JSON.parse(localStorage.getItem('employeesdata'));
        displayData(1);
    }
})();
//============ display data =============
function displayData(pageNo){
    if (allEmployees.length > 0) {
        serachHd.style.display = 'flex';
        searchControls.style.display = 'none';
        if (systemMessage == 'grid') {
            gridSystem(pageNo);
        }
        else {
            listSystem(pageNo);
        }
    } else {
        serachHd.style.display = 'none';
        showData.innerHTML = `<h3 class="no_data">No Data To Display!</h3>`
    }
    dataPagination();
    let controlsBtns = Array.from(document.querySelectorAll('.pagination div'));
    for(let i = 0; i < controlsBtns.length; i++){
        if (controlsBtns[i].innerHTML==pageNo){
            controlsBtns[i].classList.add('btn-primary');
            controlsBtns[i].classList.remove('btn-light');
            controlsBtns[i].style.zIndex='-1';
        }else{
            controlsBtns[i].classList.remove('btn-primary');
            controlsBtns[i].classList.add('btn-light');
            controlsBtns[i].style.zIndex='auto';
        }
    }  
}
//============ display data methods =============
function gridSystem(pageNo) {
    let innerData = '',
        starter = (pageNo-1)*12,
        ender = pageNo * 12;
        if (ender>allEmployees.length) {
            ender = allEmployees.length;
        }
    for (let i = starter; i < ender; i++) {
        innerData += 
        `<div class="col-xl-3 col-lg-4 col-md-6 mt-3">
            <div class="emp">
                <img src="${getImage(allEmployees[i].gender)}" class="img-fluid"/>
                <div class="emp_id">ID : ${allEmployees[i].id}</div>
                <div class="bookmark">
                    <div class="emp_age">
                        <span>${allEmployees[i].age}</span>
                        <p>years</p>
                    </div>
                </div>
                <div class="emp_details p-3">
                    <h5>${allEmployees[i].name}</h5>
                    <p>Title : ${allEmployees[i].title}</p>
                    <p>Phone : ${allEmployees[i].phone}</p>
                    <p>Salary : ${allEmployees[i].salary}</p>
                    <p>Date Added : ${allEmployees[i].addedDate}</p>
                    <div class="mt-3 text-center">
                    <button class="btn btn-info p-0"><a class="p-2 d-block text-decoration-none text-white" href="empDetails.html?empId=${allEmployees[i].id}"><i class="far fa-file-alt mr-2"></i>Info</a></button>
                    <button class="btn btn-primary mx-2" onClick="editEmployee(${allEmployees[i].id})"><i class="far fa-edit mr-2"></i>Edit</button>
                    <button class="btn btn-danger" onClick="deleteEmployee(${allEmployees[i].id})"><i class="far fa-trash-alt mr-2"></i>Delete</button>      
                </div>
                </div>
            </div>
        </div>`
            
    }
    showData.innerHTML = `<div class="row">
                            ${innerData}
                        </div>`;
    systemMessage = 'grid';
}
function listSystem(pageNo) {
    let innerData = '',
        starter = (pageNo-1)*12,
        ender = pageNo * 12;
        if (ender>allEmployees.length) {
            ender = allEmployees.length;
        }
    for (let i = starter; i < ender; i++) {
        innerData +=
            `<tr>
                    <td>${allEmployees[i].id}</td>
                    <td>${allEmployees[i].name}</td>
                    <td>${allEmployees[i].age}</td>
                    <td>${allEmployees[i].phone}</td>
                    <td>${allEmployees[i].salary}</td>
                    <td>${allEmployees[i].title}</td>
                    <td>${allEmployees[i].gender}</td>
                    <td>${allEmployees[i].addedDate}</td>
                    <td>
                        <button class="btn btn-info p-0"><a class="p-2 d-block text-decoration-none text-white" href="empDetails.html?empId=${allEmployees[i].id}"><i class="far fa-file-alt mr-2"></i>Info</a></button>
                        <button class="btn btn-primary mx-2" onClick="editEmployee(${allEmployees[i].id})"><i class="far fa-edit mr-2"></i>Edit</button>
                        <button class="btn btn-danger" onClick="deleteEmployee(${allEmployees[i].id})"><i class="far fa-trash-alt mr-2"></i>Delete</button>      
                    </td>
                </tr>`
    }
    showData.innerHTML =
        `<table class="table table-bordered table-striped">
        <thead class="text-center">
            <tr>
                <th>Id<button class="btn ml-2 p-2" onClick="sortId(1)"><i class="fas fa-sort-numeric-down"></i></button></th>
                <th>Name<button class="btn ml-2 p-2" onClick="sortName()"><i class="fas fa-sort-alpha-down"></i></button></th>
                <th>Age<button class="btn ml-2 p-2" onClick="sortAge()"><i class="fas fa-sort-numeric-down"></i></button></th>
                <th>Phone</th>
                <th>Salary<button class="btn ml-2 p-2" onClick="sortSalary()"><i class="fas fa-sort-numeric-down"></i></button></th>
                <th>Title<button class="btn ml-2 p-2" onClick="sortTitle()"><i class="fas fa-sort-alpha-down"></i></button></th>
                <th>Gender<button class="btn ml-2 p-2"  onClick="sortGender()"><i class="fas fa-sort-alpha-down"></i></button></th>
                <th>Date Added<button class="btn ml-2 p-2" onClick="sortDate()"><i class="fas fa-sort-numeric-down"></i></button></th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody class="text-capitalize text-center">
        ${innerData}
        </tbody>
    </table>`
    systemMessage = 'list';
}
//=============add employee==============
let addEmpBtn = document.getElementById('add_emp');
addEmpBtn.addEventListener('click',addEmployee)
function addEmployee() {
    if (validBtn()&&validateReData()) {
        alertRepeat.style.display = 'none';
        sortId(maxPageNo);
        let newEmp = {
            id: allEmployees.length > 0 ? allEmployees[allEmployees.length - 1].id + 1 : 1,
            name: empName.value,
            age: empAge.value,
            phone: empPhone.value,
            salary: empSalary.value,
            title: empTitle.value,
            gender: getGender(),
            addedDate: getDate()
        }
        allEmployees.push(newEmp);
        emptyInputs();
        showNotification(1);
        localStorage.setItem('employeesdata', JSON.stringify(allEmployees));
        displayData(maxPageNo);
    }
}

//=============edit employee==============

let confirmEditBtn = document.getElementById('edit_emp'),
    cancelEditBtn = document.getElementById('cancel_edit_emp'),
    editedEmp = {},
    empEditId,
    editedIndexPage;
function editEmployee(empId) {
    empEditId = empId;
    for (let i = 1; i < allEmployees.length; i++) {
        if (allEmployees[i-1].id==empEditId){
            editedIndexPage = Math.ceil(allEmployees.indexOf(allEmployees[i])/12)
        }
    }if(editedIndexPage==0){
        editedIndexPage = 1;
    }if(allEmployees[allEmployees.length-1].id==empEditId) {
        editedIndexPage=maxPageNo;
    }
    sortId(editedIndexPage);
    editedEmp = {};
    addEmpBtn.style.display = 'none';
    confirmEditBtn.style.display = 'inline-block';
    cancelEditBtn.style.display = 'inline-block';
    for (let i = 0; i < allEmployees.length; i++) {
        if (allEmployees[i].id == empEditId) {
            empName.value = allEmployees[i].name;
            empAge.value = allEmployees[i].age;
            empPhone.value = allEmployees[i].phone;
            empSalary.value = allEmployees[i].salary;
            empTitle.value = allEmployees[i].title;
            for (let y = 0; y < empGender.length; y++) {
                if (allEmployees[i].gender == empGender[y].value) {
                    empGender[y].checked = true;
                }
            }
        }
    }
}
cancelEditBtn.addEventListener('click', () => {
    emptyInputs();
    addEmpBtn.style.display = 'inline-block';
    confirmEditBtn.style.display = 'none';
    cancelEditBtn.style.display = 'none';
})
confirmEditBtn.addEventListener('click', () => {
    if (validBtn()&&reDataForEdit()) {
        addEmpBtn.style.display = 'inline-block';
        confirmEditBtn.style.display = 'none';
        cancelEditBtn.style.display = 'none';
        alertRepeat.style.display = 'none';
        editedEmp.name = empName.value;
        editedEmp.age = empAge.value;
        editedEmp.phone = empPhone.value;
        editedEmp.salary = empSalary.value;
        editedEmp.title = empTitle.value;
        editedEmp.gender = getGender();
        for (let i = 0; i < allEmployees.length; i++) {
            if (allEmployees[i].id == empEditId) {
                editedEmp.id = allEmployees[i].id;
                editedEmp.addedDate = allEmployees[i].addedDate;
                allEmployees[i] = editedEmp;
            }
        }
        emptyInputs();
        showNotification(2);
        localStorage.setItem('employeesdata', JSON.stringify(allEmployees));
        displayData(editedIndexPage);
    }
})
function reDataForEdit(){
    for (let i = 0; i < allEmployees.length; i++){
        if (allEmployees[i].name.toUpperCase() == allInputs[0].value.toUpperCase()&&empEditId!=allEmployees[i].id){
            alertRepeat.style.display = 'block';
            return false;
        }
    }
    return true;
}
//============ delete employee =============

let deleteControls = document.querySelector('.delete_emp_control'),
    deletedEmpName = document.querySelector('.deleted_emp_name'),
    confirmDeleteBtn = document.getElementById('delete_emp'),
    cancelDeleteBtn = document.getElementById('cancel_delete_emp'),
    empdeleteId,
    deletedIndexPage,
    undoDelete = document.querySelector('.undo_dlete'),
    undoDeleteBtn = document.querySelector('.undo_dlete span'),
    cancelUndoDeleteBtn = document.querySelector('.cancel_undo'),
    deletedEmp,
    deletedEmpIndex;
function deleteEmployee(empId) {
    empdeleteId = empId;
    for (let i = 1; i < allEmployees.length; i++) {
        if (allEmployees[i-1].id == empdeleteId){
            deletedIndexPage = Math.ceil(allEmployees.indexOf(allEmployees[i])/12);
        }
    }if(deletedIndexPage==0){
        deletedIndexPage = 1;
    }if(allEmployees[allEmployees.length-1].id==empdeleteId) {
        deletedIndexPage=maxPageNo;
    }
    sortId(deletedIndexPage);
    emptyInputs();
    addEmpBtn.style.display = 'inline-block';
    confirmEditBtn.style.display = 'none';
    cancelEditBtn.style.display = 'none';
    for (let i = 0; i < allEmployees.length; i++) {
        if (allEmployees[i].id == empdeleteId) {
            deletedEmpName.innerHTML = allEmployees[i].name;
        }
    }
    document.querySelector('body').style.overflowY = 'hidden';
    deleteControls.style.display = 'flex';
}
document.addEventListener('click', (e) => {
    if (e.target == cancelDeleteBtn || e.target == deleteControls || e.target == document.querySelector('#cancel_delete_emp i')) {
        document.querySelector('body').style.overflowY = 'auto';
        deleteControls.style.display = 'none';
    }
})
confirmDeleteBtn.addEventListener('click', () => {
    for (let i = 0; i < allEmployees.length; i++) {
        if (allEmployees[i].id == empdeleteId){
            deletedEmpIndex = allEmployees.indexOf(allEmployees[i]);
            deletedEmp = allEmployees[i];
            allEmployees.splice(i, 1);
        }
    }
    document.querySelector('body').style.overflowY = 'auto';
    deleteControls.style.display = 'none';
    showNotification(3);
    localStorage.setItem('employeesdata', JSON.stringify(allEmployees));
    displayData(deletedIndexPage);
    undoDelete.style.bottom = '0';
})
cancelUndoDeleteBtn.addEventListener('click',()=>{
    undoDelete.style.bottom = '-20%';
})
undoDeleteBtn.addEventListener('click',()=>{
    if (deletedEmp != null) {
        allEmployees.splice(deletedEmpIndex, 0, deletedEmp);
        displayData(deletedIndexPage);
        localStorage.setItem("employeesdata", JSON.stringify(allEmployees));
        showNotification(1);
        deletedEmp = null;
    }
    undoDelete.style.bottom = "-20%";
})
//============================ validations ========================
let allInputs = Array.from(document.querySelectorAll('.add_input')),
    alerts = Array.from(document.querySelectorAll('.form_alert')),
    inputLen = Array.from(document.querySelectorAll('.form_alert .input_len span')),
                    //empName         -         empAge       -           empPhone        -         empSalary           -      empTitle
    validArray = [/^[a-zA-Z ]{4,30}$/,/^[2-5][0-9]{1}$|60$/,/^(002)?01[0125][0-9]{8}$/,/^[2-9][0-9]{3}$|10000$/,/^[a-zA-Z ]{4,20}$/];

for (let i = 0; i < allInputs.length; i++) {
    allInputs[i].addEventListener('blur',validationTextInputs);
    allInputs[i].addEventListener('keyup',validationTextInputs);
}
for (let i = 0; i < empGender.length; i++) {
    empGender[i].addEventListener('change',validationRadioInputs);
}
function validationTextInputs() {
    flag = false;
    for (let i = 0; i < allInputs.length; i++) {
        if (i==0||i==allInputs.length-1) {
            getinputLength();
        }
        if (allInputs.indexOf(this)==i){
            if (validArray[i].test(allInputs[i].value)){
                this.classList.add('is-valid');
                this.classList.remove('is-invalid');
                alerts[i].style.display = 'none';
                flag = true;
            }
            else{
                this.classList.remove('is-valid');
                this.classList.add('is-invalid');
                alerts[i].style.display = 'block';
                flag = false;
            }
        }
    }
    console.log(flag)
    return flag;
}
function getinputLength(){
    inputLen[0].innerHTML = allInputs[0].value.length;
    inputLen[1].innerHTML = allInputs[allInputs.length-1].value.length;
}
function validationRadioInputs(){
    if (empGender[0].checked==true||empGender[1].checked==true){
        alerts[alerts.length-1].style.display = 'none';
    }
    else{
        alerts[alerts.length-1].style.display = 'block';
    }
}
function validBtn(){
    let flag = true;
    for (let i = 0; i < allInputs.length; i++){
        if (validArray[i].test(allInputs[i].value)) {
            alerts[i].style.display = 'none';
            allInputs[i].classList.remove('is-valid');
            flag = true;
        }
        else{
            alerts[i].style.display = 'block';
            allInputs[i].classList.add('is-invalid');
            flag = false;
        }
    }
    if (empGender[0].checked==true||empGender[1].checked==true){
        flag = true;
        alerts[alerts.length-1].style.display = 'none';
    }
    else{
        flag = false;
        alerts[alerts.length-1].style.display = 'block';
    }
    return flag;
}
function validateReData(){
    for (let i = 0; i < allEmployees.length; i++){
        if (allEmployees[i].name.toUpperCase() == allInputs[0].value.toUpperCase()){
            alertRepeat.style.display = 'block';
            return false;
        }
    }
    return true;
}

//============================ get gender ========================
function getGender() {
    for (let i = 0; i < empGender.length; i++) {
        if (empGender[i].checked == true) {
            return empGender[i].value;
        }
    }
}

//============================ empty inputs data ========================
function emptyInputs() {
    for (let i = 0; i < allInputs.length; i++) {
        allInputs[i].value = '';
    }
    for (let i = 0; i < empGender.length; i++) {
        empGender[i].checked = false;
    }
}

//============================ show notification ========================
let notify = document.querySelector('.notify'),
    notifyText = document.querySelector('.notify span'),   
    closeNotifyBtn = document.querySelector('.notify i');
function showNotification(notifyNo){
    switch (notifyNo) {
        case 1:
            notify.classList.add('bg-success');
            notify.classList.remove('bg-primary');
            notify.classList.remove('bg-danger');
            notifyText.innerHTML = 'Employee Added';
            break;
        case 2:
            notify.classList.remove('bg-success');
            notify.classList.add('bg-primary');
            notify.classList.remove('bg-danger');
            notifyText.innerHTML = 'Employee Edited';
            break;
        case 3:
            notify.classList.remove('bg-success');
            notify.classList.remove('bg-primary');
            notify.classList.add('bg-danger');
            notifyText.innerHTML = 'Employee Deleted';
            break;

    }
    notify.style.top = '0'
}
closeNotifyBtn.addEventListener('click',()=>{
    notify.style.top = '-20%'
})
//============================ added date ========================
function getDate() {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let d = new Date(),
        empAddedDate = `${d.getDate()}-${months[d.getMonth()]}-${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
    return empAddedDate;
}

//============================ search ========================
let searchField = document.querySelector('.search_input');
searchField.addEventListener('keyup', () => {search();});
function search(pageNo=1){
    if (searchField.value != 0) {
        controls.style.display = 'none';
        let searchArr = [];
        for (let i = 0; i < allEmployees.length; i++) {
            if (allEmployees[i].name.toUpperCase().includes(searchField.value.toUpperCase())) {
                searchArr.push(allEmployees[i]);
            }
        }
        if (systemMessage == 'grid'){
            searchInGrid(searchArr,pageNo);
        }
        else{
            searchInList(searchArr,pageNo);
        }
        let srchControlsBtns = Array.from(document.querySelectorAll('.pagination_search div'));
        for(let i = 0; i < srchControlsBtns.length; i++){
            if (srchControlsBtns[i].innerHTML==pageNo){
                srchControlsBtns[i].classList.add('btn-primary');
                srchControlsBtns[i].classList.remove('btn-light');
                srchControlsBtns[i].style.zIndex='-1';
            }else{
                srchControlsBtns[i].classList.remove('btn-primary');
                srchControlsBtns[i].classList.add('btn-light');
                srchControlsBtns[i].style.zIndex='auto';
            }
        }  
    
    } else { displayData(1) }
}

function searchInGrid(searchArr,pageNo){
    let searchEmployees = '',
    starter = (pageNo-1)*12,
    ender = pageNo * 12;
    if (ender>searchArr.length) {
        ender = searchArr.length;
    }
    for (let i = starter; i < ender; i++) {
        searchEmployees +=`<div class="col-xl-3 col-lg-4 col-md-6 mt-3">
        <div class="emp">
            <img src="${getImage(searchArr[i].gender)}" class="img-fluid"/>
            <div class="emp_id">ID : ${searchArr[i].id}</div>
            <div class="bookmark">
                <div class="emp_age">
                    <span>${searchArr[i].age}</span>
                    <p>years</p>
                </div>
            </div>
            <div class="emp_details p-3">
                <h5>${searchArr[i].name}</h5>
                <p>Title : ${searchArr[i].title}</p>
                <p>Phone : ${searchArr[i].phone}</p>
                <p>Salary : ${searchArr[i].salary}</p>
                <p>Date Added : ${searchArr[i].addedDate}</p>
                <div class="mt-3 text-center">
                <button class="btn btn-primary" onClick="editEmployee(${searchArr[i].id})"><i class="far fa-edit mr-2"></i>Edit</button>
                <button class="btn btn-danger ml-2" onClick="deleteEmployee(${searchArr[i].id})"><i class="far fa-trash-alt mr-2"></i>Delete</button>      
            </div>
            </div>
        </div>
    </div>`              
    }
    if (searchEmployees!=0){
       showData.innerHTML = `<div class="row">
                                ${searchEmployees}
                            </div>`;
        dataPaginationSearch(searchArr);
    }else { 
        showData.innerHTML = `<h3 class="no_data">No Results Found!</h3>`;
        searchControls.style.display = 'none';
    }
}

function searchInList(searchArr,pageNo){
    let searchEmployees = '',
    starter = (pageNo-1)*12,
    ender = pageNo * 12;
    if (ender>searchArr.length) {
        ender = searchArr.length;
    }
    for (let i = starter; i < ender; i++) {
            searchEmployees += `<tr>
            <td>${searchArr[i].id}</td>
            <td>${searchArr[i].name}</td>
            <td>${searchArr[i].age}</td>
            <td>${searchArr[i].phone}</td>
            <td>${searchArr[i].salary}</td>
            <td>${searchArr[i].title}</td>
            <td>${searchArr[i].gender}</td>
            <td>${searchArr[i].addedDate}</td>
            <td>
                <button class="btn btn-primary" onClick="editEmployee(${searchArr[i].id})"><i class="far fa-edit mr-2"></i>Edit</button>
                <button class="btn btn-danger ml-2" onClick="deleteEmployee(${searchArr[i].id})"><i class="far fa-trash-alt mr-2"></i>Delete</button>      
            </td>
        </tr>`
    }
    if (searchEmployees != 0) {
        controls.style.display = 'none';
        showData.innerHTML = `
        <table class="table table-bordered table-striped">
            <thead class="text-center">
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Phone</th>
                    <th>Salary</th>
                    <th>Title</th>
                    <th>Gender</th>
                    <th>Date Added</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody class="text-capitalize text-center">
            ${searchEmployees}
            </tbody>
        </table>`
        dataPaginationSearch(searchArr);
    } else { 
        showData.innerHTML = `<h3 class="no_data">No Results Found!</h3>`;
        searchControls.style.display = 'none';
    }
}
//============================ sort ================================
function sortId(pageNo) {
    allEmployees.sort((a, b) => {
        if (a.id > b.id) {
            return 1;
        } else if (a.id < b.id) {
            return -1;
        } else { return 0 }
    })
    displayData(pageNo);
}
function sortName() {
    allEmployees.sort((a, b) => {
        if (a.name.toUpperCase() > b.name.toUpperCase()) {
            return 1;
        } else if (a.name.toUpperCase() < b.name.toUpperCase()) {
            return -1;
        } else { return 0 }
    })
    displayData(1);
}
function sortAge() {
    allEmployees.sort((a, b) => {
        if (a.age > b.age) {
            return 1;
        } else if (a.age < b.age) {
            return -1;
        } else { return 0 }
    })
    displayData(1);
}
function sortSalary() {
    allEmployees.sort((a, b) => {
        if (a.salary > b.salary) {
            return 1;
        } else if (a.salary < b.salary) {
            return -1;
        } else { return 0 }
    })
    displayData(1);
}
function sortTitle() {
    allEmployees.sort((a, b) => {
        if (a.title > b.title) {
            return 1;
        } else if (a.title < b.title) {
            return -1;
        } else { return 0 }
    })
    displayData(1);
}
function sortGender() {
    allEmployees.sort((a, b) => {
        if (a.gender > b.gender) {
            return 1;
        } else if (a.gender < b.gender) {
            return -1;
        } else { return 0 }
    })
    displayData(1);
}
function sortDate() {
    allEmployees.sort((a, b) => {
        if (a.addedDate > b.addedDate) {
            return 1;
        } else if (a.addedDate < b.addedDate) {
            return -1;
        } else { return 0 }
    })
    displayData(1);
}
//============================ system btns style ================================
let gridSystemBtn = document.querySelector('.system .grid_system_show'),
listSystemBtn = document.querySelector('.system .list_system_show');
gridSystemBtn.addEventListener('click',()=>{
    gridSystemBtn.classList.add('bg-primary');
    gridSystemBtn.classList.add('text-white');
    listSystemBtn.classList.remove('bg-primary');
    listSystemBtn.classList.remove('text-white');
    systemMessage = 'grid';
    searchField.value = '';
    displayData(1);
})
listSystemBtn.addEventListener('click',()=>{
    listSystemBtn.classList.add('bg-primary');
    listSystemBtn.classList.add('text-white');
    gridSystemBtn.classList.remove('bg-primary');
    gridSystemBtn.classList.remove('text-white');
    systemMessage = 'list';
    searchField.value = '';
    displayData(1);
})
//============================ system btns style ================================
function getImage(empGender){
    switch (empGender) {
        case 'female':
            return 'images/female.png';    
        default:
            return 'images/male.png';    
    }
}
//============================ get app year ========================
(function () {
    let appYear = document.querySelector('.app_year'),
        d = new Date();
    appYear.innerHTML = d.getFullYear();
})();
//======================= pagination controls ======================
function dataPagination(){
    controls.style.display = 'flex';
    if (allEmployees.length>0){
        let controlsContent = '',
            counter = 1;
        for (let i = 0; i < allEmployees.length; i+=12){
            maxPageNo = counter;
            controlsContent += `<div class="btn btn-light px-3 py-2 border mx-1" onClick="displayData(${counter})">${counter}</div>`
            counter++;
        }
        controls.innerHTML = controlsContent;
    }
};
function dataPaginationSearch(searchArr){
    searchControls.style.display = 'flex';
    searchControls.innerHTML = "";
    if (searchArr.length>12){
        let controlsContent = '',
            counter = 1;
        for (let i = 0; i < searchArr.length; i+=12){
            maxPageNo = counter;
            controlsContent += `<div class="btn btn-light px-3 py-2 border mx-1" onClick="search(${counter})">${counter}</div>`
            counter++;
        }
        searchControls.innerHTML = controlsContent;
    }
};
