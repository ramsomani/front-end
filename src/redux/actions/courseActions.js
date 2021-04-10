import * as courseApi from "../../api/courseApi";

export function createCourse(course){
    return {type: "CREATE_COURSE", course};
}

export function loadCourseSuccess(courses){
    return {type: "LOAD_COURSES_SUCCESS",courses};
}

export function createCourseSuccess(course){
    debugger;
    return {type: "CREATE_COURSE_SUCCESS",course};
}

export function updateCourseSuccess(course){
    debugger;
    return {type: "UPDATE_COURSE_SUCCESS",course};
}

export function deleteCourseOptimistic(course){
    return {type: "DELETE_COURSE_OPTIMISTIC",course};
}

export function loadCourses(){
    return function (dispatch){
        return dispatch(loadCourseSuccess(courseApi.getCourses()));
    }
}

export function saveCourse(course){
    debugger;
    return function (dispatch){
        return course.id ? dispatch(updateCourseSuccess(courseApi.saveCourse(course))) : dispatch(createCourseSuccess(courseApi.saveCourse(course)));
    }
}

export function deleteCourse(course){
    return function (dispatch){
        dispatch(deleteCourseOptimistic(course));
        return courseApi.deleteCourse(course.id);
    };
} 