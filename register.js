const students = JSON.parse(localStorage.getItem('students')) || [];


document.getElementById('studentForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const studentId = document.getElementById('studentId').value.trim();
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const dob = document.getElementById('dob').value;
    const gender = document.getElementById('gender').value;
    const address = document.getElementById('address').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const status = document.getElementById('status').value;
    const course = document.getElementById('course').value;

 
    if (!studentId || !firstName || !lastName || !dob || !gender || !address || !phone || !email || !status || !course) {
        alert('กรุณากรอกข้อมูลให้ครบถ้วน');
        return;
    }

    
    const existingStudent = students.find(student => student.studentId === studentId);
    if (existingStudent) {
        alert('รหัสนักศึกษาไม่สามารถซ้ำได้ กรุณากรอกรหัสใหม่');
        return;
    }

    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('กรุณากรอกอีเมลให้ถูกต้อง');
        return;
    }

    const student = { studentId, firstName, lastName, dob, gender, address, phone, email, status, course };

    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));
    document.getElementById('studentForm').reset();
    displayStudents(); 
});


document.getElementById('showStudentsBtn').addEventListener('click', function() {
    displayStudents();
});


function displayStudents() {
    const studentList = document.getElementById('studentList');
    studentList.innerHTML = ''; 

    students.forEach(student => {
        const studentInfo = `
            <div class="student-entry">
                <strong>รหัสนักศึกษา: ${student.studentId}</strong> - ${student.firstName} ${student.lastName} - ${student.dob} - ${student.gender} - ${student.address} - ${student.phone} - ${student.email} - ${student.status} - วิชา: ${student.course}
                <button onclick="deleteStudent('${student.studentId}')">ลบ</button>
            </div>
        `;
        studentList.innerHTML += studentInfo;
    });
}


function deleteStudent(studentId) {
    const updatedStudents = students.filter(student => student.studentId !== studentId);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
    displayStudents(); 
}


displayStudents();
