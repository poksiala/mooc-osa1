import React from 'react'
import ReactDOM from 'react-dom'

const VoteDisplay = (props) => <div>has {props.votes == null ? 0 : props.votes} votes </div>

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      points: {0: 0},
    }
  }

  newIndex = () => {
    const rndInt = Math.floor(Math.random() * (this.props.anecdotes.length))
    return rndInt !== this.state.selected ? rndInt : this.newIndex()
  }

  selectNew = () => this.setState({selected: this.newIndex()})

  addVote = () => {
    const pointsCopy = {...this.state.points}
    if (pointsCopy[this.state.selected] == null) pointsCopy[this.state.selected] = 0
    pointsCopy[this.state.selected] += 1
    this.setState({points: pointsCopy})
  }

  getMostVoted = () => {
    if (this.state.points.size === 0) return {anecdote: this.props.anecdotes[0], votes: 0}
    var key = 0
    for (var k in this.state.points) {
      if (this.state.points[k] > this.state.points[key]) key = k
    }
    return {anecdote: this.props.anecdotes[key], votes: this.state.points[key]}
  }

  render() {
    const best = this.getMostVoted()
    return (
      <div>
        <div>
          {this.props.anecdotes[this.state.selected]}
        </div>
        <div>
          <VoteDisplay votes={this.state.points[this.state.selected]} />
        </div>
        <div>
          <button onClick={this.addVote}>vote</button>
          <button onClick={this.selectNew}>next anecdote</button>
        </div>
        <h1> anecdote with most votes: </h1>
        <div>{best.anecdote}</div>
        <VoteDisplay votes={best.votes} />
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
