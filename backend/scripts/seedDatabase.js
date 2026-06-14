require('dotenv').config();
const mongoose = require('mongoose');

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lms_database';

// Import models
const User = require('../models/User');
const Class = require('../models/Class');
const Quiz = require('../models/Quiz');
const Assignment = require('../models/Assignment');
const Material = require('../models/Material');
const Marks = require('../models/Marks');

// Seed Data
const seedData = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Promise.all([
      User.deleteMany({}),
      Class.deleteMany({}),
      Quiz.deleteMany({}),
      Assignment.deleteMany({}),
      Material.deleteMany({}),
      Marks.deleteMany({})
    ]);

    // Create Users
    console.log('👤 Creating users...');
    
    // Admin
    const admin = await User.create({
      name: 'System Administrator',
      email: 'admin@lms.com',
      password: 'admin123',
      role: 'admin'
    });
    console.log('   ✓ Admin created: admin@lms.com');

    // Head of Department
    const head = await User.create({
      name: 'Dr. Om Praksh Tiwari',
      email: 'head@lms.com',
      password: 'head1234',
      role: 'head'
    });
    console.log('   ✓ Head created: head@lms.com');

    // Teachers - Indian Names (Sumit Rai as first teacher)
    const teachers = await User.create([
      { name: 'Sumit Rai', email: 'Sumit.Rai@lms.com', password: 'teacher123', role: 'teacher' },
      { name: 'Shubham Singh', email: 'Shubham.singh@lms.com', password: 'teacher123', role: 'teacher' },
      { name: 'Prof. Ayesha yadav', email: 'ayesha.yadav@lms.com', password: 'teacher123', role: 'teacher' },
      { name: 'Dr. Prashant Nirwan', email: 'Prashant.Nirwan@lms.com', password: 'teacher123', role: 'teacher' },
      { name: 'Prof. Krishna kumar', email: 'Krishna.Kumar@lms.com', password: 'teacher123', role: 'teacher' },
    ]);
    console.log('   ✓ 5 Teachers created');

    // Students - All 43 Indian Student Names
    const studentData = [
  { name: 'Aarav Sharma', email: 'aarav.sharma@lms.com' },
  { name: 'Aditya Verma', email: 'aditya.verma@lms.com' },
  { name: 'Arjun Gupta', email: 'arjun.gupta@lms.com' },
  { name: 'Vivaan Joshi', email: 'vivaan.joshi@lms.com' },
  { name: 'Ananya Iyer', email: 'ananya.iyer@lms.com' },
  { name: 'Rohan Mishra', email: 'rohan.mishra@lms.com' },
  { name: 'Aman Malik', email: 'aman.malik@lms.com' },
  { name: 'Deepak Choudhury', email: 'deepak.choudhury@lms.com' },
  { name: 'Gaurav Tiwari', email: 'gaurav.tiwari@lms.com' },
  { name: 'Harish Rao', email: 'harish.rao@lms.com' },
  { name: 'Hrithik Thakur', email: 'hrithik.thakur@lms.com' },
  { name: 'Hardik Patel', email: 'hardik.patel@lms.com' },
  { name: 'Manish Pandey', email: 'manish.pandey@lms.com' },
  { name: 'Ishaan Nair', email: 'ishaan.nair@lms.com' },
  { name: 'Kunal Saxena', email: 'kunal.saxena@lms.com' },
  { name: 'Mayank Agarwal', email: 'mayank.agarwal@lms.com' },
  { name: 'Mudit Rastogi', email: 'mudit.rastogi@lms.com' },
  { name: 'Amit Jha', email: 'amit.jha@lms.com' },
  { name: 'Mohit Reddy', email: 'mohit.reddy@lms.com' },
  { name: 'Sanjay Deshmukh', email: 'sanjay.deshmukh@lms.com' },
  { name: 'Siddharth Pal', email: 'siddharth.pal@lms.com' },
  { name: 'Udit Narayan', email: 'udit.narayan@lms.com' },
  { name: 'Utkarsh Singh', email: 'utkarsh.singh@lms.com' },
  { name: 'Kavya Kapoor', email: 'kavya.kapoor@lms.com' },
  { name: 'Isha Yadav', email: 'isha.yadav@lms.com' },
  { name: 'Diya Trivedi', email: 'diya.trivedi@lms.com' },
  { name: 'Anjali Bisht', email: 'anjali.bisht@lms.com' },
  { name: 'Ayush Goel', email: 'ayush.goel@lms.com' },
  { name: 'Aiswarya Pillai', email: 'aiswarya.pillai@lms.com' },
  { name: 'Ekta Hegde', email: 'ekta.hegde@lms.com' },
  { name: 'Prerna Chauhan', email: 'prerna.chauhan@lms.com' },
  { name: 'Harsh Bhatia', email: 'harsh.bhatia@lms.com' },
  { name: 'Ipsita Das', email: 'ipsita.das@lms.com' },
  { name: 'Meera Kulkarni', email: 'meera.kulkarni@lms.com' },
  { name: 'Madhav Sen', email: 'madhav.sen@lms.com' },
  { name: 'Shashi Kant', email: 'shashi.kant@lms.com' },
  { name: 'Sneha Banerjee', email: 'sneha.banerjee@lms.com' },
  { name: 'Bhavna Joshi', email: 'bhavna.joshi@lms.com' },
  { name: 'Priya Sharma', email: 'priya.sharma@lms.com' },
  { name: 'Divya Mahajan', email: 'divya.mahajan@lms.com' },
  { name: 'Meenakshi Iyer', email: 'meenakshi.iyer@lms.com' },
  { name: 'Vanshika Malhotra', email: 'vanshika.malhotra@lms.com' },
  { name: 'Amita', email: 'amita@lms.com' }
];

    const students = await User.create(
      studentData.map(s => ({ ...s, password: 'student123', role: 'student' }))
    );
    console.log(`   ✓ ${students.length} Students created`);

    // Create Classes - Software Engineering Subjects
    console.log('📚 Creating Software Engineering classes...');
    const classes = await Class.create([
      {
        classname: 'Object Oriented Programming',
        description: 'Learn OOP concepts including classes, objects, inheritance, polymorphism, encapsulation, and abstraction using C++ and Java.',
        section: 'BSE-6A',
        teacher: teachers[0]._id, // Sumit Rai
        students: students.slice(0, 15).map(s => s._id),
        semester: 'Fall 2025',
        academicYear: '2025'
      },
      {
        classname: 'Data Structures & Algorithms',
        description: 'Comprehensive study of data structures (arrays, linked lists, trees, graphs) and algorithms (sorting, searching, dynamic programming).',
        section: 'BSE-6A',
        teacher: teachers[1]._id, // Dr. Shubham Singh
        students: students.slice(0, 15).map(s => s._id),
        semester: 'Fall 2025',
        academicYear: '2025'
      },
      {
        classname: 'Software Engineering',
        description: 'Software development lifecycle, agile methodologies, requirements engineering, design patterns, and project management.',
        section: 'BSE-6A',
        teacher: teachers[2]._id, // Prof. Ayesha Yadav
        students: students.slice(0, 15).map(s => s._id),
        semester: 'Fall 2025',
        academicYear: '2025'
      },
      {
        classname: 'Database Systems',
        description: 'Relational database design, SQL, normalization, indexing, transactions, and introduction to NoSQL databases.',
        section: 'BSE-6A',
        teacher: teachers[3]._id, // Dr. Prashant Nirwan
        students: students.slice(15, 30).map(s => s._id),
        semester: 'Fall 2025',
        academicYear: '2025'
      },
      {
        classname: 'Web Engineering',
        description: 'Full-stack web development with HTML, CSS, JavaScript, React, Node.js, Express, and MongoDB.',
        section: 'BSE-6B',
        teacher: teachers[0]._id, // Sumit Rai
        students: students.slice(15, 30).map(s => s._id),
        semester: 'Fall 2025',
        academicYear: '2025'
      },
      {
        classname: 'Operating Systems',
        description: 'Process management, memory management, file systems, CPU scheduling, and synchronization mechanisms.',
        section: 'BSE-6B',
        teacher: teachers[4]._id, // Prof. Krishna Kumar
        students: students.slice(30).map(s => s._id),
        semester: 'Fall 2025',
        academicYear: '2025'
      },
      {
        classname: 'Computer Networks',
        description: 'OSI model, TCP/IP, routing protocols, network security, and socket programming.',
        section: 'BSE-6B',
        teacher: teachers[1]._id, // Dr. Shubham Singh
        students: students.slice(30).map(s => s._id),
        semester: 'Fall 2025',
        academicYear: '2025'
      },
      {
        classname: 'Software Design & Architecture',
        description: 'Design patterns, architectural patterns, UML diagrams, and software quality attributes.',
        section: 'BSE-6A',
        teacher: teachers[2]._id, // Prof. Ayesha Yadav
        students: students.slice(0, 22).map(s => s._id),
        semester: 'Fall 2025',
        academicYear: '2025'
      }
    ]);
    console.log(`   ✓ ${classes.length} Classes created`);

    // Update user assigned classes
    console.log('🔗 Linking users to classes...');
    for (const cls of classes) {
      await User.updateOne(
        { _id: cls.teacher },
        { $addToSet: { assignedClasses: cls._id } }
      );
      await User.updateMany(
        { _id: { $in: cls.students } },
        { $addToSet: { assignedClasses: cls._id } }
      );
    }

    // Create Quizzes
    console.log('📝 Creating quizzes...');
    const quizzes = await Quiz.create([
      {
        classId: classes[0]._id, // OOP
        title: 'OOP Fundamentals Quiz',
        description: 'Test your understanding of Object Oriented Programming concepts',
        questions: [
          { question: 'What is encapsulation?', options: ['Hiding implementation details', 'Inheriting properties', 'Creating objects', 'Overloading methods'], answer: 'Hiding implementation details', points: 2 },
          { question: 'Which keyword is used for inheritance in Java?', options: ['inherits', 'extends', 'implements', 'super'], answer: 'extends', points: 2 },
          { question: 'What is polymorphism?', options: ['One interface, multiple implementations', 'Multiple inheritance', 'Data hiding', 'Object creation'], answer: 'One interface, multiple implementations', points: 2 },
          { question: 'What is an abstract class?', options: ['A class that cannot be instantiated', 'A class with no methods', 'A final class', 'A static class'], answer: 'A class that cannot be instantiated', points: 2 },
          { question: 'Which is NOT an OOP principle?', options: ['Abstraction', 'Encapsulation', 'Compilation', 'Inheritance'], answer: 'Compilation', points: 2 }
        ],
        timeLimit: 15,
        isPublished: true,
        createdBy: teachers[0]._id
      },
      {
        classId: classes[1]._id, // DSA
        title: 'Data Structures Quiz',
        description: 'Test your knowledge of data structures',
        questions: [
          { question: 'What is the time complexity of binary search?', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], answer: 'O(log n)', points: 3 },
          { question: 'Which data structure uses LIFO?', options: ['Queue', 'Stack', 'Array', 'Linked List'], answer: 'Stack', points: 3 },
          { question: 'What is a balanced binary tree?', options: ['All leaves at same level', 'Height difference ≤ 1', 'Complete tree', 'Full tree'], answer: 'Height difference ≤ 1', points: 3 },
          { question: 'Which sorting algorithm has best average case?', options: ['Bubble Sort', 'Quick Sort', 'Selection Sort', 'Insertion Sort'], answer: 'Quick Sort', points: 3 },
          { question: 'What is a graph with no cycles called?', options: ['Tree', 'DAG', 'Forest', 'All of above'], answer: 'All of above', points: 3 }
        ],
        timeLimit: 20,
        isPublished: true,
        createdBy: teachers[1]._id
      },
      {
        classId: classes[2]._id, // SE
        title: 'Software Engineering Concepts',
        description: 'SDLC and Agile methodology quiz',
        questions: [
          { question: 'What does SDLC stand for?', options: ['Software Development Life Cycle', 'System Design Life Cycle', 'Software Design Logic Control', 'System Development Logic Cycle'], answer: 'Software Development Life Cycle', points: 2 },
          { question: 'Which is NOT an Agile methodology?', options: ['Scrum', 'Kanban', 'Waterfall', 'XP'], answer: 'Waterfall', points: 2 },
          { question: 'What is a sprint in Scrum?', options: ['A meeting', 'A time-boxed iteration', 'A document', 'A role'], answer: 'A time-boxed iteration', points: 2 },
          { question: 'Who is the Product Owner?', options: ['Developer', 'Stakeholder representative', 'Tester', 'Manager'], answer: 'Stakeholder representative', points: 2 },
          { question: 'What is technical debt?', options: ['Project budget', 'Shortcuts in code', 'Hardware cost', 'Team salary'], answer: 'Shortcuts in code', points: 2 }
        ],
        timeLimit: 15,
        isPublished: true,
        createdBy: teachers[2]._id
      },
      {
        classId: classes[3]._id, // Database
        title: 'Database Fundamentals',
        description: 'SQL and database design concepts',
        questions: [
          { question: 'What does SQL stand for?', options: ['Structured Query Language', 'Simple Query Language', 'Standard Query Logic', 'System Query Language'], answer: 'Structured Query Language', points: 2 },
          { question: 'Which is a DDL command?', options: ['SELECT', 'INSERT', 'CREATE', 'UPDATE'], answer: 'CREATE', points: 2 },
          { question: 'What is normalization?', options: ['Adding redundancy', 'Removing redundancy', 'Creating indexes', 'Joining tables'], answer: 'Removing redundancy', points: 2 },
          { question: 'What is a primary key?', options: ['Any column', 'Unique identifier', 'Foreign reference', 'Index column'], answer: 'Unique identifier', points: 2 },
          { question: 'Which normal form removes transitive dependency?', options: ['1NF', '2NF', '3NF', 'BCNF'], answer: '3NF', points: 2 }
        ],
        timeLimit: 15,
        isPublished: true,
        createdBy: teachers[3]._id
      },
      {
        classId: classes[4]._id, // Web Engineering
        title: 'Web Development Basics',
        description: 'HTML, CSS, JavaScript fundamentals',
        questions: [
          { question: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlinks Text Mark Language'], answer: 'Hyper Text Markup Language', points: 2 },
          { question: 'Which is a JavaScript framework?', options: ['Django', 'React', 'Laravel', 'Flask'], answer: 'React', points: 2 },
          { question: 'What is the DOM?', options: ['Document Object Model', 'Data Object Model', 'Document Order Model', 'Digital Object Model'], answer: 'Document Object Model', points: 2 },
          { question: 'CSS stands for?', options: ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Style Sheets', 'Colorful Style Sheets'], answer: 'Cascading Style Sheets', points: 2 },
          { question: 'What is REST API?', options: ['A database', 'An architectural style', 'A programming language', 'A framework'], answer: 'An architectural style', points: 2 }
        ],
        timeLimit: 15,
        isPublished: true,
        createdBy: teachers[0]._id
      }
    ]);
    console.log(`   ✓ ${quizzes.length} Quizzes created`);

    // Add quiz submissions for some students
    console.log('✍️  Adding quiz submissions...');
    for (let i = 0; i < 5; i++) {
      const quiz = quizzes[i];
      const classStudents = classes[i].students.slice(0, 5);
      
      for (const studentId of classStudents) {
        const answers = quiz.questions.map((q, idx) => ({
          questionId: q._id,
          selectedAnswer: Math.random() > 0.3 ? q.answer : q.options[0],
          isCorrect: Math.random() > 0.3
        }));
        
        const correctCount = answers.filter(a => a.isCorrect).length;
        const totalPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0);
        const marks = Math.round((correctCount / quiz.questions.length) * totalPoints);
        
        quiz.submissions.push({
          studentId,
          answers,
          marks,
          totalPoints,
          percentage: (marks / totalPoints) * 100,
          submittedAt: new Date()
        });
      }
      await quiz.save();
    }

    // Create Assignments
    console.log('📋 Creating assignments...');
    const assignments = await Assignment.create([
      {
        classId: classes[0]._id,
        title: 'OOP Project - Banking System',
        description: 'Design and implement a banking system using OOP principles. Include classes for Account, Customer, Transaction, and Bank.',
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        totalMarks: 100,
        createdBy: teachers[0]._id
      },
      {
        classId: classes[1]._id,
        title: 'DSA Assignment - Sorting Algorithms',
        description: 'Implement and compare the performance of Quick Sort, Merge Sort, and Heap Sort with different input sizes.',
        dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        totalMarks: 50,
        createdBy: teachers[1]._id
      },
      {
        classId: classes[2]._id,
        title: 'SE Assignment - Requirements Document',
        description: 'Create a Software Requirements Specification (SRS) document for a university management system.',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        totalMarks: 50,
        createdBy: teachers[2]._id
      },
      {
        classId: classes[3]._id,
        title: 'Database Design Project',
        description: 'Design an ER diagram and implement a normalized database for an e-commerce platform.',
        dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
        totalMarks: 100,
        createdBy: teachers[3]._id
      },
      {
        classId: classes[4]._id,
        title: 'Full Stack Web Application',
        description: 'Build a complete MERN stack application with authentication, CRUD operations, and responsive design.',
        dueDate: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000),
        totalMarks: 150,
        createdBy: teachers[0]._id
      },
      {
        classId: classes[5]._id,
        title: 'OS Lab - Process Scheduling',
        description: 'Implement FCFS, SJF, and Round Robin scheduling algorithms and compare their performance.',
        dueDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
        totalMarks: 75,
        createdBy: teachers[4]._id
      }
    ]);
    console.log(`   ✓ ${assignments.length} Assignments created`);

    // Create Materials
    console.log('📖 Creating materials...');
    const materials = await Material.create([
      {
        classId: classes[0]._id,
        title: 'OOP Lecture 1 - Introduction to Classes',
        description: 'Introduction to classes, objects, and basic OOP concepts',
        fileUrl: '/uploads/materials/oop-lecture-1.pdf',
        fileName: 'oop-lecture-1.pdf',
        fileType: 'application/pdf',
        uploadedBy: teachers[0]._id,
        type: 'lecture',
        weekNumber: 1
      },
      {
        classId: classes[0]._id,
        title: 'OOP Lecture 2 - Inheritance & Polymorphism',
        description: 'Deep dive into inheritance and polymorphism',
        fileUrl: '/uploads/materials/oop-lecture-2.pdf',
        fileName: 'oop-lecture-2.pdf',
        fileType: 'application/pdf',
        uploadedBy: teachers[0]._id,
        type: 'lecture',
        weekNumber: 2
      },
      {
        classId: classes[1]._id,
        title: 'DSA - Arrays and Linked Lists',
        description: 'Understanding linear data structures',
        fileUrl: '/uploads/materials/dsa-arrays.pdf',
        fileName: 'dsa-arrays.pdf',
        fileType: 'application/pdf',
        uploadedBy: teachers[1]._id,
        type: 'lecture',
        weekNumber: 1
      },
      {
        classId: classes[1]._id,
        title: 'DSA - Trees and Graphs',
        description: 'Non-linear data structures',
        fileUrl: '/uploads/materials/dsa-trees.pdf',
        fileName: 'dsa-trees.pdf',
        fileType: 'application/pdf',
        uploadedBy: teachers[1]._id,
        type: 'lecture',
        weekNumber: 3
      },
      {
        classId: classes[2]._id,
        title: 'SDLC Models Overview',
        description: 'Waterfall, Agile, Spiral, and V-Model',
        fileUrl: '/uploads/materials/sdlc-models.pdf',
        fileName: 'sdlc-models.pdf',
        fileType: 'application/pdf',
        uploadedBy: teachers[2]._id,
        type: 'lecture',
        weekNumber: 1
      },
      {
        classId: classes[3]._id,
        title: 'SQL Fundamentals',
        description: 'DDL, DML, and DCL commands',
        fileUrl: '/uploads/materials/sql-basics.pdf',
        fileName: 'sql-basics.pdf',
        fileType: 'application/pdf',
        uploadedBy: teachers[3]._id,
        type: 'lecture',
        weekNumber: 1
      },
      {
        classId: classes[4]._id,
        title: 'React.js Fundamentals',
        description: 'Components, Props, State, and Hooks',
        fileUrl: '/uploads/materials/react-basics.pdf',
        fileName: 'react-basics.pdf',
        fileType: 'application/pdf',
        uploadedBy: teachers[0]._id,
        type: 'lecture',
        weekNumber: 4
      },
      {
        classId: classes[5]._id,
        title: 'Process Management',
        description: 'Process states, PCB, and context switching',
        fileUrl: '/uploads/materials/os-process.pdf',
        fileName: 'os-process.pdf',
        fileType: 'application/pdf',
        uploadedBy: teachers[4]._id,
        type: 'lecture',
        weekNumber: 2
      }
    ]);
    console.log(`   ✓ ${materials.length} Materials created`);

    // Create Marks
    console.log('📊 Creating marks...');
    const marksData = [];
    
    // Add marks for first 10 students in class 0 (OOP)
    for (let i = 0; i < 10; i++) {
      marksData.push({
        studentId: students[i]._id,
        classId: classes[0]._id,
        type: 'quiz',
        title: 'OOP Quiz 1',
        marks: Math.floor(Math.random() * 20) + 30,
        totalMarks: 50,
        remarks: 'Good effort'
      });
      marksData.push({
        studentId: students[i]._id,
        classId: classes[0]._id,
        type: 'assignment',
        title: 'OOP Assignment 1',
        marks: Math.floor(Math.random() * 30) + 60,
        totalMarks: 100,
        remarks: 'Well done'
      });
    }

    // Add marks for students in class 1 (DSA)
    for (let i = 0; i < 10; i++) {
      marksData.push({
        studentId: students[i]._id,
        classId: classes[1]._id,
        type: 'quiz',
        title: 'DSA Quiz 1',
        marks: Math.floor(Math.random() * 15) + 25,
        totalMarks: 50,
        remarks: 'Keep improving'
      });
    }

    // Add marks for students in class 3 (Database)
    for (let i = 15; i < 25; i++) {
      marksData.push({
        studentId: students[i]._id,
        classId: classes[3]._id,
        type: 'midterm',
        title: 'Database Midterm',
        marks: Math.floor(Math.random() * 30) + 50,
        totalMarks: 100,
        remarks: 'Good understanding'
      });
    }

    const marks = await Marks.create(marksData);
    console.log(`   ✓ ${marks.length} Marks entries created`);

    // Print Summary
    console.log('\n' + '='.repeat(60));
    console.log('🎉 DATABASE SEEDED SUCCESSFULLY!');
    console.log('='.repeat(60));
    console.log('\n📋 LOGIN CREDENTIALS:\n');
    console.log('┌─────────────┬──────────────────────────┬──────────────┐');
    console.log('│ Role        │ Email                    │ Password     │');
    console.log('├─────────────┼──────────────────────────┼──────────────┤');
    console.log('│ Admin       │ admin@lms.com            │ admin123     │');
    console.log('│ Head        │ head@lms.com             │ head1234     │');
    console.log('│ Teacher     │ Sumit.Rai@lms.com        │ teacher123   │');
    console.log('│ Teacher     │ Krishna.Kumar@lms.com    │ teacher123   │');
    console.log('│ Teacher     │ Shubham.Singh@lms.com    │ teacher123   │');
    console.log('│ Student     │ Amita@lms.com            │ student123   │');
    console.log('│ Student     │ vivaan.joshi@lms.com     │ student123   │');
    console.log('│ Student     │ priya.sharma@lms.com     │ student123   │');
    console.log('└─────────────┴──────────────────────────┴──────────────┘');
    console.log('\n📊 DATA SUMMARY:');
    console.log(`   • Users: 1 Admin, 1 Head, 5 Teachers, ${students.length} Students`);
    console.log(`   • Classes: ${classes.length} Software Engineering courses`);
    console.log(`   • Quizzes: ${quizzes.length}`);
    console.log(`   • Assignments: ${assignments.length}`);
    console.log(`   • Materials: ${materials.length}`);
    console.log(`   • Marks: ${marks.length} entries`);
    console.log('\n');

    process.exit(0);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seed
seedData();
