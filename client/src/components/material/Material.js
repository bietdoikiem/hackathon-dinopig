import React from 'react'
import './Material.css'

export default class Material extends React.Component {

    constructor() {
        super()
    }

    render() {
        return (
            <div className="material-content">
                <p><a href={this.props.data.url}>{this.props.data.topic}</a></p>
            </div>
        )
    }
}