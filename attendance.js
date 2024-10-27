const students = [];
let attendanceRecords = [];


document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); 

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === "123" && password === "123") {
        alert("เข้าสู่ระบบสำเร็จ!");
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('attendanceContainer').style.display = 'block';
        loadStudents(); 
        loadAttendance(); 
    } else {
        displayError('loginError', "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    }
});


function loadStudents() {
    const savedStudents = JSON.parse(localStorage.getItem('students')) || [];
    savedStudents.forEach(student => {
        addStudentToDropdown(student);
        students.push(student);
    });
}


function loadAttendance() {
    attendanceRecords = JSON.parse(localStorage.getItem('attendanceRecords')) || [];
    attendanceRecords.forEach(record => {
        addAttendanceRow(record.studentId, record.studentName, record.subject, record.time, record.status);
    });
}


function addStudentToDropdown(student) {
    const select = document.getElementById('studentSelect');
    const option = document.createElement('option');
    option.value = student.studentId;
    option.textContent = `${student.firstName} ${student.lastName}`;
    select.appendChild(option);
}


function displayError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.innerText = message;
    errorElement.style.display = 'block';
}


document.getElementById('attendanceForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const studentId = document.getElementById('studentSelect').value;
    const selectedStudent = students.find(s => s.studentId == studentId);
    if (!selectedStudent) {
        alert("กรุณาเลือกนักเรียนก่อนเช็คอิน");
        return;
    }
    
    const studentName = `${selectedStudent.firstName} ${selectedStudent.lastName}`;
    const subject = document.getElementById('subject').value;
    const currentTime = new Date().toLocaleString();
    const status = (new Date().getHours() < 9 || (new Date().getHours() === 9 && new Date().getMinutes() <= 30)) ? 'ตรงเวลา' : 'เข้าสาย';

    const attendanceRecord = { studentId, studentName, subject, time: currentTime, status };
    attendanceRecords.push(attendanceRecord);
    localStorage.setItem('attendanceRecords', JSON.stringify(attendanceRecords));
    addAttendanceRow(studentId, studentName, subject, currentTime, status);
    document.getElementById('attendanceForm').reset();
});


function addAttendanceRow(studentId, studentName, subject, time, status) {
    const table = document.getElementById('attendanceTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    
    newRow.innerHTML = `
        <td>${table.rows.length + 1}</td>
        <td>${studentId}</td>
        <td>${studentName}</td>
        <td>${subject}</td>
        <td>${time}</td>
        <td class="${status === 'ตรงเวลา' ? 'status-on-time' : 'status-late'}">${status}</td>
        <td><button class="delete-btn" onclick="deleteRow(this)">ลบ</button></td>
    `;
}


function deleteRow(button) {
    const row = button.closest('tr');
    const studentId = row.cells[1].innerText;
    
    
    attendanceRecords = attendanceRecords.filter(record => record.studentId !== studentId);
    localStorage.setItem('attendanceRecords', JSON.stringify(attendanceRecords));
    
    
    row.parentNode.removeChild(row);
}
