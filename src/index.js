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

const Statistic = ({text, number}) => {
  return (
    <tr><td> {text}</td><td>{number}</td></tr>
  )
}

const Statistics = ({stats}) => {
  const {good, neutral, bad} = stats

  const average = (good + neutral + bad) !== 0 ?
    Math.round(((good - bad) / (good + neutral + bad)) * 10) / 10 : 0
  

  const positivePercent = (good + neutral + bad) !== 0 ?
     Math.round(good * 1000 / (good + neutral + bad)) /10 : 0

  return (
    
    <table>
      <tbody>
      <Statistic text="hyvä" number={good} />
      <Statistic text="neutraali" number={neutral} />
      <Statistic text="huono" number={bad} />
      <Statistic text="keskiarvo" number={average} />
      <Statistic text="positiivisia" number={`${positivePercent}%`} />
      </tbody>
     </table>
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
          <button key={val.label} onClick={this.props.func(val.value)}>{val.label}</button>
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

    const statistiikka = (this.state.stats.good + this.state.stats.neutral + this.state.stats.bad !== 0) ?
      <Statistics stats={this.state.stats} /> : <p> ei yhtään palautetta annettu </p>

    return (
      <div>
        <Otsikko text="anna palautetta" />
        <FeedbackButtons vals={buttonVals} func={this.handleClick} /> 
        <Otsikko text="statistiikka" />
        {statistiikka}
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
