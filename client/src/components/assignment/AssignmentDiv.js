import React from 'react'
import { Link } from 'react-router-dom'
import './AssignmentDiv.css'
export default class AssignmentDiv extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            name: '',
            due_date: '',
            time: '',
            mark: 0,
        }
    }

    componentDidMount() {
        // fetch(`http://localhost:5000/sampleassignments/${this.props.data}`)
        //     .then(res => console.log(res))
        //     .then(data => console.log(data))
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
                        <h6>{this.props.data.due_date}</h6>
                        <h6>{this.props.data.time}</h6>
                        <Link to={`/user/${this.props.match.params.id}/course/${this.props.match.params.courseId}/assignment/${this.props.data._id}`} class="btn">Take Assignment</Link>
                    </div>
                </div>
            </div>

        )
    }
}