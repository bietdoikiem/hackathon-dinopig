import React from 'react'
import './Course.css'
import AssignmentDiv from '../../components/assignment/AssignmentDiv'
import Material from '../../components/material/Material'
import LineChart from '../../components/visualization/Visualization'
import ClipLoader from 'react-spinners/ClipLoader'

export default class Course extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            data: '',
            assignments: []
        }
    }

    componentDidMount() {
        fetch(`http://localhost:5000/subjects/${this.props.match.params.courseId}`)
            .then(res => res.json())
            .then(data => {
                data.assignmentIds.map(s => {
                    fetch(`http://localhost:5000/sampleassignments/${s}`)
                        .then(res => res.json())
                        .then(assignment => this.setState(prevState => ({
                            assignments: [...prevState.assignments, assignment]
                        })))
                })
                this.setState({ data })

            })
    }

    render() {
        return (
            <div className="course-container">
                <div className="course-header">
                    <i class="header-item fas fa-arrow-left"></i>
                    <h3 className="header-item">
                        {this.state.data.name}
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
                                    
                                {this.state.assignments && this.state.assignments.length > 0 ?
                                    <div className="row section-body">
                                        {this.state.assignments.map(a => (
                                            <AssignmentDiv  data={a} />
                                        ))}
                                    </div>
                                    :
                                    <ClipLoader></ClipLoader>

                                }        </div>
                            <div id="visualize-section">
                                <div>
                                    <div className="section-header">
                                        <i class="fas fa-2x fa-poll"></i>
                                        <h3>Progress</h3>
                                    </div>
                                    <LineChart />
                                </div>
                            </div>
                        </div>
                        {/* <div id="right-section" className="col-lg-4 col-12">
                                    <div id="material-section">
                                        <div className="section-header">
                                            <i class="far fa-2x fa-calendar-check"></i>
                                            <h3>Materials</h3>
                                        </div>
                                        <div className="section-body">
                                            {this.state.materials.map(m => (
                                                <Material data={m}/>
                                            ))}
                                        </div>
                                    </div>
                            </div> */}
                    </div>

                </div>
            </div>
        )
    }
}