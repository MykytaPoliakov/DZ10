const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let students = [
    { id: 10, firstName:"Marty", lastName: "McFly", group: 101, rate: 9.5 },
    { id: 11, firstName:"Squidward", lastName: "Tentakles", group: 102, rate: 6.1 },
    { id: 12, firstName:"Donald", lastName: "Duck", group: 102, rate: 7.2 },
    { id: 13, firstName:"Sarah", lastName: "Connor", group: 101, rate: 8.3 },
    { id: 14, firstName:"Yugin", lastName: "Krabbs", group: 102, rate: 6.8 },
   ]
   ;

app.get('/students', (req, res) => {
    res.json(students); // Відправка масиву `students` як відповіді в форматі JSON
});

  
app.post('/students/:id', (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, group, rate } = req.body;
  
    if (!firstName || !lastName) {
      return res.status(400).send('firstName and lastName are required');
    }
  
    // Перевірка, чи ID вже існує у масиві
    if (students.some(student => student.id === parseInt(id))) {
      return res.status(400).send('Student with this ID already exists');
    }
  
    const newStudent = { id: parseInt(id), firstName, lastName, group, rate };
    students.push(newStudent);
  
    res.status(201).json(newStudent); // Віддає створений запис у форматі JSON
});

app.get('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id); // Отримання ID студента з параметрів URL
    const student = students.find(s => s.id === studentId); // Пошук студента в масиві за ID
  
    if (!student) {
      return res.status(404).send('Student not found'); // Якщо студент не знайдений, повернути помилку 404
    }
  
    res.json(student); // Відправка даних студента як відповіді в форматі JSON
  });

app.put('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id); // Отримання ID студента з параметрів URL
    const studentIndex = students.findIndex(s => s.id === studentId); // Знаходження індексу студента в масиві
  
    if (studentIndex === -1) {
      return res.status(404).send('Student not found'); // Якщо студент не знайдений, повернути помилку 404
    }
  
    const { firstName, lastName, group, rate } = req.body;
    if (!firstName || !lastName) {
      return res.status(400).send('firstName and lastName are required'); // Перевірка наявності обов'язкових полів
    }
  
    // Оновлення даних студента
    students[studentIndex] = { id: studentId, firstName, lastName, group, rate };
  
    res.json(students[studentIndex]); // Відправка оновлених даних студента як відповіді в форматі JSON
});

app.delete('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id); // Отримання ID студента з параметрів URL
    const studentIndex = students.findIndex(s => s.id === studentId); // Знаходження індексу студента в масиві
  
    if (studentIndex === -1) {
      return res.status(404).send('Student not found'); // Якщо студент не знайдений, повернути помилку 404
    }
  
    students.splice(studentIndex, 1); // Видалення студента з масиву
    res.status(204).send(); // Повернення порожньої відповіді зі статусом 204 (No Content)
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
