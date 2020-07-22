// const { CSSTransition } = require("react-transition-group");


class Covid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: '',
      states: [],
      isLoaded: false
    }
  }


  getInfo = (e) => {
    this.setState({
      userInput: e.target.value.toUpperCase(),

    }, (e) => {
      console.log(this.state.userInput)
    })
  }


  componentDidMount() {
    fetch('https://covidtracking.com/api/v1/states/current.json')
      .then(res => { return res.json() })
      .then(results => {
        this.setState({
          states: results
        })
        console.log(results)

      })
  }

  render() {

    const { states, userInput, negative,
      negativeIncreased, positive, positiveIncrease,
      deaths, deathIncreases, hospitalized, recovered, totalCases, results } = this.state

    return (
      <div>
        <h1 className="title">{"Enter State Abbreviation: " + this.state.userInput}</h1>
        <div className="fields">
          <input className="getInfo" onChange={this.getInfo}></ input>
        </div>
        {
          states.map(state => {
            if (userInput === state.state) {
              return (
                <div className="grid example">
                  <h2 className="states items">{"State: " + state.state}</h2>
                  <h2 className="negative items">{"Negative Cases: " + " " + state.negative.toLocaleString()}</h2>
                  <h2 className="inegative items">{"Negative Cases Increased: " + state.negativeIncrease.toLocaleString()}</h2>
                  <h2 className="positive items">{"Positive Cases: " + " " + state.positive.toLocaleString()}</h2>
                  <h2 className="ipositive items">{"Postive Cases Increased: " + state.positiveIncrease.toLocaleString()}</h2>
                  <h2 className="hospital items">{"Hospitalized: " + state.hospitalized}</h2>
                  <h2 className="recover items">{"Recovered: " + state.recovered}</h2>
                  <h2 className="deaths items">{"Deaths: " + state.death}</h2>
                  <h2 className="ideaths items">{"Deaths Increased: " + state.deathIncrease.toLocaleString()}</h2>
                  <h2 className="total items">{"Total Cases: " + state.total.toLocaleString()}</h2>
                  <h2 className="dated items">{"Updated: " + state.dateChecked}</h2>
                </div>
              )
            }
          })
        }


      </div>
    )
  }

}



ReactDOM.render(
  <Covid />,
  document.getElementById('data')
)

