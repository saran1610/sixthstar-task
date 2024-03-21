
document.addEventListener('DOMContentLoaded', function() {
    loadStudents();
});

document.getElementById('studentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var name = document.getElementById('name').value;
    var age = document.getElementById('age').value;
    var number = document.getElementById('number').value;
    var dob = document.getElementById('dob').value;
    var address = document.getElementById('address').value;

    addStudent(name, age, number, dob, address);

    document.getElementById('studentForm').reset();
});

function addStudent(name, age, number, dob, address) {
    var students = JSON.parse(localStorage.getItem('students')) || [];
    students.push({ name: name, age: age, number:number, dob:dob, address:address });
    localStorage.setItem('students', JSON.stringify(students));

    loadStudents();
}

function loadStudents() {
    var students = JSON.parse(localStorage.getItem('students')) || [];
    var tbody = document.getElementById('tbody');
    tbody.innerHTML = '';
    students.forEach(function(student, index) {
        var row = tbody.insertRow();
        row.insertCell(0).textContent = student.name;
        row.insertCell(1).textContent = student.age;
        row.insertCell(2).textContent = student.number;
        row.insertCell(3).textContent = student.dob;
        row.insertCell(4).textContent = student.address;

        var editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', function() {
            editStudent(index);
        });
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            deleteStudent(index);
        });
        row.insertCell(5).appendChild(editButton);
        row.insertCell(5).appendChild(deleteButton);
    });
}

function editStudent(index) {
    var students = JSON.parse(localStorage.getItem('students')) || [];
    var student = students[index];
    var newName = prompt('Enter new name:', student.name);
    var newAge = prompt('Enter new age:', student.age);
    var newnumber = prompt('Enter new number:', student.number);
    var newdob = prompt('Enter new number:', student.dob);
    var newaddress = prompt('Enter new number:', student.address);
    if (newName !== null && newAge !== null && newnumber !==null && newdob !==null && newaddress !==null) {
        student.name = newName;
        student.age = newAge;
        student.number=newnumber;
        student.dob=newdob;
        student.address=newaddress;
        localStorage.setItem('students', JSON.stringify(students));
        loadStudents();
    }
}


function deleteStudent(index) {
    var students = JSON.parse(localStorage.getItem('students')) || [];
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    loadStudents();
}
