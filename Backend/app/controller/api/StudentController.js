const Student = require("../../models/student");
const StatusCode = require("../../utils/statusCode");

class StudentController {

  async createStudent(req, res) {
    try {
      const {
        studentName,
        studentEmail,
        studentPhone,
        studentAge,
        studentCourse,
        address
      } = req.body;

      const student = new Student({
        studentName,
        studentEmail,
        studentPhone,
        studentAge,
        studentCourse,
        address
      });

      const data = await student.save();

      return res.status(StatusCode.CREATED).json({
        status: true,
        message: "Student created successfully",
        data: data,
      });

    } catch (err) {
      return res.status(StatusCode.SERVER_ERROR).json({
        status: false,
        message: "something went wrong",
        error: err,
      });
    }
  }


  async getStudent(req, res) {
    try {

      const students = await Student.find();

      return res.status(StatusCode.SUCCESS).json({
        status: true,
        total: students.length,
        message: "Students fetched successfully",
        data: students,
      });

    } catch (err) {
      return res.status(StatusCode.SERVER_ERROR).json({
        status: false,
        message: "something went wrong",
        error: err,
      });
    }
  }


  async getsingleStudent(req, res) {
    try {

      const id = req.params.id;

      const student = await Student.findById(id);

      return res.status(StatusCode.SUCCESS
      ).json({
        status: true,
        message: "Single student fetched successfully",
        data: student,
      });

    } catch (err) {
      return res.status(StatusCode.SERVER_ERROR).json({
        status: false,
        message: "something went wrong",
        error: err,
      });
    }
  }


  async updateStudent(req, res) {
    try {

      const id = req.params.id;

      await Student.findByIdAndUpdate(id, req.body, { new: true });

      return res.status(StatusCode.SUCCESS
      ).json({
        status: true,
        message: "Student updated successfully",
      });

    } catch (err) {
      return res.status(500).json({
        status: false,
        message: "something went wrong",
        error: err,
      });
    }
  }


  async deleteStudent(req, res) {
    try {

      const id = req.params.id;

      await Student.findByIdAndDelete(id);

      return res.status(StatusCode.SUCCESS
      ).json({
        status: true,
        message: "Student deleted successfully",
      });

    } catch (err) {
      return res.status(StatusCode.SERVER_ERROR).json({
        status: false,
        message: "something went wrong",
        error: err,
      });
    }
  }

}

module.exports = new StudentController();