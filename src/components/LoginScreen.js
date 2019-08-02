import React from "react";
import { connect } from "react-redux";
import { loginRequest } from "../actionCreators/loginActionCreators";

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: localStorage.getItem("name"),
      password: localStorage.getItem("password"),
      isRememberChecked: localStorage.getItem("isRememberChecked") && true
    };
  }

  componentWillReceiveProps(nextProps) {
    const { history } = this.props;
    if (nextProps.isSuccess) {
      history.push("/projects");
    }
  }

  onUserInput = e => {
    const { target } = e;
    this.setState({
      [target.getAttribute("name")]: target.value
    });
  };

  onRememberCheck = () => {
    this.setState(prevState => ({
      isRememberChecked: !prevState.isRememberChecked
    }));
  };

  onLoginSubmit = async e => {
    e.preventDefault();
    const { onFormSubmit } = this.props;
    await onFormSubmit(this.state);
  };

  render() {
    const { name, password, isRememberChecked } = this.state;
    const { isLoading, isFail } = this.props;
    return (
      <form
        className="d-flex flex-column justify-content-center vh-100 container-fluid"
        autoComplete="off"
      >
        <div className="row align-items-center justify-content-center mb-3">
          <input
            className={`col col-11 col-sm-8 col-md-6 col-lg-4 ${isFail &&
              "border-danger"}`}
            type="text"
            name="name"
            value={name}
            placeholder="Your login"
            onChange={this.onUserInput}
          />
        </div>
        <div className="row align-items-center justify-content-center mb-3">
          <input
            className={`col col-11 col-sm-8 col-md-6 col-lg-4 ${isFail &&
              "border-danger"}`}
            type="password"
            name="password"
            value={password}
            placeholder="Your password"
            onChange={this.onUserInput}
          />
        </div>
        <div className="row align-items-center justify-content-center mb-3">
          <input
            type="checkbox"
            id="remember"
            checked={isRememberChecked}
            name="isRememberChecked"
            onChange={this.onRememberCheck}
          />
          <label className="ml-1 mb-0" htmlFor="remember">
            Remember me
          </label>
        </div>
        <div className="row align-items-center justify-content-center">
          <button
            type="submit"
            className="btn btn-primary col col-11 col-sm-6 col-md-3 col-lg-2"
            onClick={this.onLoginSubmit}
          >
            {isLoading ? (
              <div className="spinner-border text-success spinner-border-sm" />
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.loginReducer.isLoading,
    isFail: state.loginReducer.isFail,
    isSuccess: state.loginReducer.isSuccess
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFormSubmit: inputData => dispatch(loginRequest(inputData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
