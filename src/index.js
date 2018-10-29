import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}

const Osa = ({osa}) => {
  return (
    <p>{osa.nimi} {osa.tehtavia}</p>
  )
}

const Sisalto = (props) => {
  return (
    <div>
      {props.osat.map((osa) => <Osa osa={osa} />)} 
    </div>
  )
}

const StatisticsLine = ({text, number}) => {
  return (
    <p> {text} {number} </p>
  )
}

const Statistics = ({stats}) => {
  const {good, neutral, bad} = stats

  return (
    <div>
      <StatisticsLine text="hyvä" number={good} />
      <StatisticsLine text="neutraali" number={neutral} />
      <StatisticsLine text="huono" number={bad} />
     </div>
  )
}

class FeedbackButtons extends React.Component {

  constructor(props) {
    super(props);
    this.state =  {
      vals: props.vals,
      func: props.func
    }
  }
  render() {
    return (
      <div>
        {this.state.vals.map((val) => 
          <button onClick={this.props.func(val.value)}>{val.label}</button>
        )}
      </div>
    )
  }
}

class App extends React.Component  {
  constructor(props) {
    super(props)
    this.state = {
      stats: {
        good: 0,
        neutral: 0,
        bad: 0
      } 
    }
  };
  
  handleClick = (value) => {
    return () => {
      this.setState((prevState) => ({
        stats: {
          good: prevState.stats.good + ((value === 1) ? 1 : 0),
          neutral: prevState.stats.neutral + ((value === 0) ? 1 : 0),
          bad: prevState.stats.bad + ((value === -1) ? 1 : 0)
        }
      }))
    }
  }

  render () {
    
    const buttonVals = [
      {
        label: 'hyvä',
        value: 1,
        func: this.handleClick(1)
      }, {
        label: 'neutraali',
        value: 0,
        func: this.handleClick(0)
      }, {
        label: 'huono',
        value: -1,
        func: this.handleClick(-1)
      }
    ]

    return (
      <div>
        <Otsikko text="anna palautetta" />
        <FeedbackButtons vals={buttonVals} func={this.handleClick} /> 
        <Otsikko text="statistiikka" />
        <Statistics stats={this.state.stats} />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
