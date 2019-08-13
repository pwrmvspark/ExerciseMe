import React, { Component } from 'react'
import axios from 'axios'

export default class CreateUser extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: "",
      users: []
    }

    this.onChangeUsername = this.onChangeUsername.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.getUsers = this.getUsers.bind(this)
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault()

    const user = {
      username: this.state.username,
    }

    axios.post('http://localhost:7777/users/add', user)
      .then(res => console.log(res.data))
    
    this.setState({
      username: ""
    })
    
    // need handling for member that already exists
  }

  getUsers(){
    axios.get('http://localhost:7777/users')
    .then(res => {
      console.log(res.data)
      this.setState({
        users: res.data.map(user => user.username)
      })
    })
  }
  

  render () {
    return (
      <div>
        <h3>Register Member</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          
          <div>
            <input type="submit"
              value="register"
              className="btn btn-primary" 
            />
          </div>
       
        </form>

        <br/>
        <h3>Current Members</h3>
        <li>{}</li> 
      </div>
    )
  }
}