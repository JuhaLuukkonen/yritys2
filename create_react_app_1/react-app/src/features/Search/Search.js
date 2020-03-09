import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "common/components/Form";
import Input from "common/components/Input";
import Button from "common/components/Button";
import Message from "common/components/Message";

const INPUT1 = "companyname";
const INPUT2 = "date";

export default function Search(props) {
  const [state, setState] = useState({
    [INPUT1]: "",
    [INPUT2]: ""
  });

  function handleSubmit(event) {
    event.preventDefault();
    props.initiatedSearch(state);
  }

  function handleChange(event) {
    // Clean the error if the user re-starts typing
    if (props.SearchError && state[INPUT2]) {
      props.cleanError();
    }
    setState({ ...state, [event.target.name]: event.target.value });
  }

  function renderMessage() {
    if (props.SearchError) {
      return (
        <Message
          data-testid="error-message"
          className="error-message"
          text={`Ops .. looks like there is an error: ${props.SearchError}`}
        />
      );
    }

    if (props.isLoggingIn) {
      return (
        <Message
          data-testid="welcome"
          text={`Welcome back ${state[INPUT1]}! ... Loading links`}
        />
      );
    }
  }

  function renderForm() {
    if (!props.accessToken) {
      return (
        <Form onSubmit={handleSubmit}>
          <p>
            <small>
              Voit hakea Patentti- ja rekisterihallituksen yritystietoja: <em>nimi</em> ja{" "}
              <em>rekisteröintipäivä</em>
            </small>
          </p>
          <Input
            type="text"
            name={INPUT1}
            placeholder={`Enter your ${INPUT1}`}
            required={true}
            onChange={handleChange}
          />
          <Input
            type="date"
            name={INPUT2}
            placeholder={`Enter your ${INPUT2}`}
            required={true}
            onChange={handleChange}
          />
          <Button
            data-testid="submit"
            type="submit"
            text="Search"
            className="button"
          />
          {renderMessage()}
        </Form>
      );
    }
    return null;
  }

  return renderForm();
}

Search.propTypes = {
  initiatedSearch: PropTypes.func.isRequired,
  isLoggingIn: PropTypes.string.isRequired,
  SearchError: PropTypes.string,
  cleanError: PropTypes.func.isRequired,
  accessToken: PropTypes.string
};
