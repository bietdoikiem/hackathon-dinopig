import React from 'react'
import './Course.css'
import AssignmentDiv from '../../components/assignment/AssignmentDiv'

export default class Course extends React.Component {


    constructor() {
        super()
        this.state = {
            assignments :  [
                {
                    id: '1',
                    name: 'assignment 1',
                    duration: 5000,
                    due: '20/02/2020',
                }, 
                {
                    id: '2',
                    name: 'assignment 2',
                    duration: 5000,
                    due: '21/02/2020',
                }
            ],
            materials : [
                {}
            ]
        }
    }
    
    render() {
        return (
            <div className="course-container">
                <div className="course-header">
                    <i class="header-item fas fa-arrow-left"></i>
                    <h3 className="header-item">
                        Mathematics For Computing
                    </h3>
                </div>
                <div className="course-main">
                        <div className="row no-gutters">
                            <div id="left-section" className="col-lg-8 col-12">
                                <div id="assignment-section">
                                    <div className="section-header">
                                        <i class="fas fa-2x fa-book-open"></i>
                                        <h3>Assignments</h3>
                                    </div>
                                    <div className="row section-body">
                                        {this.state.assignments.map(a => (
                                            <AssignmentDiv  data={a} />
                                        ))}
                                    </div>
                                </div>
                                <div id="visualize-section">
                                    <div>

                                    </div>
                                </div>
                            </div>
                            <div id="right-section" className="col-lg-4 col-12">
                                    <div>
                                        <div className="section-header">
                                            <i class="far fa-2x fa-calendar-check"></i>
                                            <h3>Materials</h3>
                                        </div>
                                        <div className="section-body">
                                            
                                        </div>
                                    </div>
                            </div>
                        </div>
                    
                </div>
            </div>
        )
    }
}