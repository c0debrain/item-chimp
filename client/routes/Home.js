React = require('react');

var DisplayBox = React.createClass({
  getInitialState: function() {
    return {
      amazon: {amazon: []},
      walmart: {walmart: []},
      bestbuy: {bestBuy: []},      
    };
  },
  postRequest: function(api, query) {
    
    var url = 'general-query-' + api;

    $.ajax({
      url: url,
      dataType: 'json',
      type: 'POST',
      data: query,
      success: function(data) {

      }
    });
  },
  handleQuerySubmit: function(query) {
    $.ajax({
      url: 'general-query',
      dataType: 'json',
      type: 'POST',
      data: query,
      success: function(data) {
        $('.query-form-container').addClass('hidden');
        $('.related-results-display').removeClass('hidden');

        console.log(data[2]);

        this.setState({
          amazon: data[0],
          walmart: data[1],
          bestbuy: data[2]
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('general-query', status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div className="displayBox">
        
        <SearchForm onQuerySubmit={this.handleQuerySubmit} />

        <AmazonRelatedResultsDisplay data={this.state.amazon} />
        <WalmartRelatedResultsDisplay data={this.state.walmart} />
        <BestbuyRelatedResultsDisplay data={this.state.bestbuy} />

      </div>
    );
  }
});

var AmazonRelatedResultsDisplay = React.createClass({
  render: function() {
    var resultNodes = this.props.data.amazon.map(function(result, index) {
      return (
        result
      );
    });
    return (
      <div className="related-results-display hidden">
        <h3>Amazon Related Results</h3>
        {resultNodes}
      </div>
    );
  }
});

// name, salePrice, upc, categoryPath, 
var WalmartRelatedResultsDisplay = React.createClass({
  render: function() {
    var resultNodes = this.props.data.walmart.map(function(result, index) {
      return (
        result
      );
    });
    return (
      <div className="related-results-display hidden">
        <h3>Walmart Related Results</h3>
        {resultNodes}
      </div>
    );
  }
});

var BestbuyRelatedResultsDisplay = React.createClass({
  render: function() {
    var resultNodes = this.props.data.bestBuy.map(function(result, index) {
      return (
        result
      );
    });
    return (
      <div className="related-results-display hidden">
        <h3>Best Buy Related Results</h3>
        {resultNodes}
      </div>
    );
  }
});

var SearchForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();

    var query = React.findDOMNode(this.refs.query).value.trim();

    this.props.onQuerySubmit({query: query});

    React.findDOMNode(this.refs.query).value = '';
  },
  render: function() {
    return (
      <div className="query-form-container">
        <h4 className="query-form-title">ShopChimp, at your service.</h4>

        <form className="query-form" onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Enter a product" className="form-control" ref="query" />

          <center><button className="btn btn-primary">Submit</button></center>
        </form>
      </div>
    );
  }
});

var Home = React.createClass({
	render: function() {
		return (
      <div className="home-page">
        <DisplayBox />
      </div>
		);
	}
});

module.exports = Home;