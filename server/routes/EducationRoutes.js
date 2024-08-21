const { Router } = require('express');
const router = Router();

// Import controllers2
const courseController = require('../controllers/courseController');
const studentController = require('../controllers/studentController');
const teacherController = require('../controllers/teacherController');
const examController = require('../controllers/examController');
const classController = require('../controllers/classController');
const subjectController = require('../controllers/subjectController');
const enrollmentController = require('../controllers/enrollmentController');
const gradeController = require('../controllers/gradeController');
const assignmentController = require('../controllers/assignmentController');
const attendanceController = require('../controllers/attendanceController');
const languageController = require('../controllers/languageController')
const testController = require('../controllers/testController')
const submittedTestController = require('../controllers/submitted_testController')
const courseContentController = require('../controllers/courseContentController')
const videosListController = require('../controllers/videosListController')
const practicePaperController = require('../controllers/practicePaperController');

// Course routes
router.post('/courses', courseController.createCourse);
router.get('/courses', courseController.getCourses);
router.get('/courses/:id', courseController.getCourseById);
router.put('/courses/:id', courseController.updateCourseByID);
router.post('/coursesAddToUser/:user_id/:course_id', courseController.addCourseByUserId);
router.get('/coursesOfUser/:id', courseController.getCourseByUserId);
router.get('/coursesOfNotUser/:id', courseController.getOtherCourseByUserId);
router.put('/coursesOfUser/:id', courseController.updateCourseByUserId);
router.delete('/courses/:id', courseController.deleteCourse);

// Student routes
router.post('/students', studentController.createStudent);
router.post('/students/login', studentController.loginStudent);
router.get('/students', studentController.getStudents);
router.get('/students/:id', studentController.getStudentById);
router.put('/students/:id', studentController.updateStudent);
router.delete('/students/:id', studentController.deleteStudent);

// Teacher routes
router.post('/teachers', teacherController.createTeacher);
router.post('/teachers/login', teacherController.loginTeacher);
router.get('/teachers', teacherController.getTeachers);
router.get('/teachers/:id', teacherController.getTeacherById);
router.put('/teachers/:id', teacherController.updateTeacher);
router.delete('/teachers/:id', teacherController.deleteTeacher);

// Exam routes
router.post('/exams', examController.createExam);
router.get('/exams', examController.getExams);
router.get('/exams/:id', examController.getExamById);
router.put('/exams/:id', examController.updateExam);
router.delete('/exams/:id', examController.deleteExam);

// Class routes
router.post('/classes', classController.createClass);
router.get('/classes', classController.getClasses);
router.get('/classes/:id', classController.getClassById);
router.put('/classes/:id', classController.updateClass);
router.delete('/classes/:id', classController.deleteClass);

// Subject routes
router.post('/subjects', subjectController.createSubject);
router.get('/subjects', subjectController.getSubjects);
router.get('/subjects/:id', subjectController.getSubjectById);
router.put('/subjects/:id', subjectController.updateSubject);
router.delete('/subjects/:id', subjectController.deleteSubject);

// Enrollment routes
router.post('/enrollments', enrollmentController.createEnrollment);
router.get('/enrollments', enrollmentController.getEnrollments);
router.get('/enrollments/:id', enrollmentController.getEnrollmentById);
router.put('/enrollments/:id', enrollmentController.updateEnrollment);
router.delete('/enrollments/:id', enrollmentController.deleteEnrollment);

// Grade routes
router.post('/grades', gradeController.createGrade);
router.get('/grades', gradeController.getGrades);
router.get('/grades/:id', gradeController.getGradeById);
router.put('/grades/:id', gradeController.updateGrade);
router.delete('/grades/:id', gradeController.deleteGrade);

// Assignment routes
router.post('/assignments', assignmentController.createAssignment);
router.get('/assignments', assignmentController.getAssignments);
router.get('/assignments/:id', assignmentController.getAssignmentById);
router.put('/assignments/:id', assignmentController.updateAssignment);
router.delete('/assignments/:id', assignmentController.deleteAssignment);

// Attendance routes
router.post('/attendances', attendanceController.createAttendance);
router.get('/attendances', attendanceController.getAttendances);
router.get('/attendances/:id', attendanceController.getAttendanceRecordById);
router.put('/attendances/:id', attendanceController.updateAttendanceRecord);
router.delete('/attendances/:id', attendanceController.deleteAttendanceRecord);

//Languages
router.post('/language', languageController.createLanguage);
router.get('/languages', languageController.getLanguages);
router.get('/language/:id', languageController.getLanguageById);
router.put('/language/:id', languageController.updateLanguageById);
router.delete('/language/:id', languageController.deleteLanguage);

//Tests 

router.post('/tests', testController.createTest);
router.get('/tests', testController.getAllTests);
router.get('/tests/:id', testController.getTestById);
router.put('/tests/:id', testController.updateTest);
router.delete('/tests/:id', testController.deleteTest);
router.get('/course_tests/:id', testController.getTestByCourseId);

//
router.post('/submitted-tests', submittedTestController.createSubmittedTest);
router.post('/submit-test', submittedTestController.submitTest);
router.get('/submitted-tests', submittedTestController.getAllSubmittedTests);
router.get('/submitted-tests/:user_id/:test_id', submittedTestController.getSubmittedTestByUserIdAndTestID);
router.get('/submitted-tests/:id', submittedTestController.getSubmittedTestById);
router.get('/submitted-tests-user/:id', submittedTestController.getSubmittedTestByUserId);
router.put('/submitted-tests/:id', submittedTestController.updateSubmittedTestById);
router.delete('/submitted-tests/:id', submittedTestController.deleteSubmittedTestById);

//CourseContent
router.post('/CourseContent', courseContentController.createCourseContent);
router.get('/CourseContent', courseContentController.getCourseContents);
router.get('/CourseContent/:id', courseContentController.getCourseContentById);
router.put('/CourseContent/:id', courseContentController.updateCourseContent);
router.delete('/CourseContent/:id', courseContentController.deleteCourseContent);

//videos add
router.post('/videos', videosListController.createVideoList);
router.get('/videos', videosListController.getAllVideoLists);
router.put('/videos/:id', videosListController.updateVideoList);
router.get('/videos/:id', videosListController.getVideoListById);
router.delete('/videos/:id', videosListController.deleteVideoList);

// Get all practice papers
router.post('/practice-papers', practicePaperController.createPracticePaper);
router.get('/practice-papers', practicePaperController.getAllPracticePapers);
router.put('/practice-papers/:id', practicePaperController.updatePracticePaper);
router.get('/practice-papers/:id', practicePaperController.getPracticePaperById);
router.delete('/practice-papers/:id', practicePaperController.deletePracticePaper);


module.exports = router;
