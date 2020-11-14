import React from 'react'
import { Link } from 'react-router-dom'
import './AssignmentDiv.css'
export default class AssignmentDiv extends React.Component {


    constructor() {
        super()
    }

    render() {
        return (
            <div class="assignment-container col-12">
                <div class="assignment">
                    <div class="assignment-preview">
                        <h6>Assignment</h6>
                        <h2>{this.props.data.name}</h2>
                    </div>
                    <div class="assignment-info">
                        <h6>{this.props.data.due}</h6>
                        <h6>{this.props.data.duration}</h6>
                        <Link to={`/assignment/${this.props.data.id}`} class="btn">Take Assignment</Link>
                    </div>
                </div>
            </div>

        )
    }
}