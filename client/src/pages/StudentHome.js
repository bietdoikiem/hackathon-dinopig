import React from 'react'
import Home from './studentView/Home'
import styled from 'styled-components'

export default class Student extends React.Component {

    constructor() {
        super()
        this.state = {
            course: {}
        }
    }

    render() {
        return (
            <div>
                <Home/>
            </div>
        )
    }
}