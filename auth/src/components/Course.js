import React, { Component, useState } from "react";
class Course extends Component {
    state = {
        courses: []
    }
    loadCourses = () => {
       fetch('http://127.0.0.1:8000/courses/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${this.props.token}`
            },
            body: JSON.stringify(this.state.credentials)
        })
            .then(data => data.json())
            .then(
                data => {
                    this.setState({ courses: data })
                }
            ).catch(error => console.error(error))


    }
    render() {
        return (
            <div>
                <h1>Course</h1>
                {this.state.courses.map(course => {
                    return <h3 key={course.numCrs}>{course.depart}</h3>
                })}
                <button type="" onClick={this.loadCourses}>load course</button>
            </div>
        )
    }
}

export default Course;