import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.exercise._id}><button>edit</button></Link> | <button href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</button>
    </td>
  </tr>
)

export default class ExercisesList extends Component {
  constructor(props) {
    super(props)

    this.state = { exercises: []}

    this.deleteExercise = this.deleteExercise.bind(this)
  }

  componentDidMount() {
    axios.get('http://localhost:7777/exercises/')
      .then(res => {
        this.setState({ exercises: res.data })
      })
      .catch(err => {
        console.log(err)
      })
  }

  deleteExercise(id) {
    axios.delete('http://localhost:7777/exercises/' + id)
      .then(res => console.log(res.data))
    
    this.setState({
      exercises: this.state.exercises.filter(elem => elem._id !== id)
    })
  }

  exerciseList() {
    return this.state.exercises.map(currentexercise => {
      return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>
    })
  }

  render () {
    return (
      <div>
       <h3> #eatSleepTrainRepeat </h3>
       <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Member</th>
            <th>Movements</th>
            <th>Duration (min)</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          { this.exerciseList() }
        </tbody>
       </table>
      </div>
    )
  }
}