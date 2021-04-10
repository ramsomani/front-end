import React , {useEffect,useState} from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseForm from "../courses/CourseForm";
import {newCourse} from "../../tools/mockData";


function ManageCoursePage({courses,authors,loadCourses,loadAuthors,saveCourse,history,...props}) {
  
    const [course,setCourse] = useState({...props.course});
    const [errors,setErrors] = useState({});

  useEffect( () => {
    if(courses.length === 0){
    loadCourses();
    }else{
        setCourse({...props.course});
    }
    if(authors.length === 0){
    loadAuthors();
    }
  },[props.course]);

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value
    }));
  }

  function handleSave(event) {
      debugger
      event.preventDefault();
      if(!formIsValid()) return;
    saveCourse(course);
    history.push('/courses');
  }

  function formIsValid() {
    const { title, authorId, category } = course;
    const errors = {};

    if (!title) errors.title = "Title is required.";
    if (!authorId) errors.author = "Author is required";
    if (!category) errors.category = "Category is required";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }


    return (
    <CourseForm course={course} errors={errors} authors={authors} onChange={handleChange} onSave={handleSave} />
    );
  }


/*ManageCoursePage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};*/

export function getCourseBySlug(courses, slug) {
    return courses.find(course => course.slug === slug) || null;
  }

function mapStateToProps(state,ownProps) {
    debugger;
    const slug = ownProps.match.params.slug;
  return {
    course:slug && state.courses.length > 0
    ? getCourseBySlug(state.courses, slug)
    : newCourse,
    courses: state.courses,
    authors: state.authors
  };
}

const mapDispatchToProps = {
   
    loadCourses: courseActions.loadCourses,
    loadAuthors: authorActions.loadAuthors,
    saveCourse: courseActions.saveCourse
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCoursePage);
