import React from 'react';

class Rank extends React.Component {
  constructor() {
    super();
    this.state = {
      emoji: ''
    }
  }

  componentDidMount() {
    this.generateEmoji(this.props.entries)
  }

  componentDidUpdate(prevProps, prevState)  {
    if (prevProps.entries === this.props.entries && prevProps.name === this.props.name) {
      return null
    }
    this.generateEmoji(this.props.entries);
  }

  generateEmoji = (entries) => {
    fetch(`https://jth9ug5iga.execute-api.us-east-1.amazonaws.com/prod/rank?rank=${entries}`)
      .then(response => response.json())
      .then(data => this.setState({ emoji: data.input}))
      .catch(console.log)
  }

  render() {
    return (
      <div className="flex-column br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-near-black o-90">
        <div className='white f6 f5-ns f5-m f3-l'>
          {`Welcome back, ${this.props.name}`}
        </div>
        <div className='white f6 f5-ns f5-m f3-l'>
          {`Rank: ${this.props.entries}`}
        </div>
        <div className='white f6 f5-ns f5-m f3-l'>
          {`Rank Badge: ${this.state.emoji}`}
        </div>
      </div>
    );
  }
}


export default Rank;
