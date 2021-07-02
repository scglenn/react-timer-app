import React, { Component } from 'react'
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = { enabled: false, limit: 10, seconds: 10, };

    this.timerInterval = 0;

    this.modifyTimer = this.modifyTimer.bind(this);
    this.tick = this.tick.bind(this);
    this.setTimeLimit = this.setTimeLimit.bind(this);
  }

  componentDidMount() {
    this.timerInterval = setInterval(() => this.tick(),1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }

  tick() {
    if(this.state.enabled)
    {
      let decrementTime = this.state.seconds - 1;
      if(decrementTime >= 0)
      {
        this.setState({seconds: decrementTime});
      }
    }
  }

  modifyTimer(command)
  {
    if(command=="Start")
    {
      this.setState({enabled: true});
    }
    else if(command=="Stop")
    {
      this.setState({enabled: false});
    }
    else
    {
      this.setState({enabled: false});
      this.setState({seconds: this.state.limit});
    }
  }

  setTimeLimit(timelimit)
  {
    this.setState({limit: timelimit});
    this.setState({seconds: timelimit});
  }

  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
    };
    return obj;
  };

  render() { 
    
    let parseTime = this.secondsToTime(this.state.seconds);

    let TimeText = parseTime['h'] + ' : ' + parseTime['m'] + ' : ' + parseTime['s'];

    return (
    <div className='timer'>
      <div className='time-value'>{ TimeText }</div>
      <button className='btn btn-primary' onClick={() => this.modifyTimer('Start')}>Start</button>
      <button className='btn btn-primary' onClick={() => this.modifyTimer('Stop')}>Pause</button>
      <button className='btn btn-primary' onClick={() => this.modifyTimer('Reset')}>Restart</button>
      <form>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">Time Limit</span>
          </div>
          <input type="text" class="form-control" placeholder='10' aria-label="Medium" aria-describedby="inputGroup-sizing-sm"
            onChange={(e) => this.setTimeLimit(e.target.value)}
          ></input>
        </div>
      </form>
    </div>  
  )}
}

export default App

