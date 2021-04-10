import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import {Redirect} from "react-router-dom";

class CoursesPage extends React.Component {
  state = {
    redirectToAddCoursePage: false
  };

  componentDidMount(){
    const {courses,authors,actions} = this.props;
    if(courses.length === 0){
    actions.loadCourses();
    }
    if(authors.length === 0){
    actions.loadAuthors();
    }
  }

  handleDeleteCourse = course => {
    this.props.actions.deleteCourse(course);
  }

  render() {
    return (
    <>
    {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
    <h2>Courses</h2>
    
    <button
          style={{ marginBottom: 20 }}
          className="btn btn-primary add-course"
          onClick={() => this.setState({ redirectToAddCoursePage: true })}
        >
          Add Course
        </button>
    <CourseList onDeleteClick={this.handleDeleteCourse} courses={this.props.courses} />
    </>  
    );
  }
}

/*CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};*/

function mapStateToProps(state) {
  return {
    courses: state.authors.length === 0 ? [] : state.courses.map(course => {
      return{
        ...course,
        authorName: state.authors.find(a=> a.id === course.authorId).name
      };
    }),
    authors: state.authors
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions:{
    loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
    loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
    deleteCourse:bindActionCreators(courseActions.deleteCourse,dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesPage);
