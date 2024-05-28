import React from "react";
import styled from "styled-components";

// Styled Components
const RadioButtonContainer = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: justify;
`;

const RadioOption = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const RadioInput = styled.input`
  display: none;
  &:checked + label::before {
    background: #007bff;
    border-color: #007bff;
  }
`;

const RadioLabel = styled.label`
  position: relative;
  padding-left: 35px;
  cursor: pointer;
  font-size: 1.2em;
  color: #333;
  user-select: none;
  transition: color 0.3s ease;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 25px;
    height: 25px;
    border: 2px solid #007bff;
    border-radius: 50%;
    background: #fff;
    transition: background 0.3s ease, border-color 0.3s ease;
  }

  &:hover::before {
    background: rgba(0, 123, 255, 0.1);
  }
`;

export default class RadioButtonComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionResponse: { ...props.value },
      question: props.question || { option: [] },
      onOptionChange: this.props.onOptionChange,
    };
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  handleOptionChange(changeEvent) {
    const response = this.state.questionResponse;
    response[this.state.question.id] = changeEvent.target.value;
    this.setState(
      { ...this.state, questionResponse: response },
      () => {
        if (this.state.onOptionChange) {
          this.state.onOptionChange(this.state.questionResponse);
        }
      }
    );
  }

  render() {
    return (
      <RadioButtonContainer>
        {this.state.question.type === "radio" &&
          this.state.question.option.map((option, index) => {
            return (
              <RadioOption key={this.state.question.id + index}>
                <RadioInput
                  type="radio"
                  id={this.state.question.id + index}
                  name={this.state.question.id}
                  value={option.value}
                  checked={this.state.questionResponse[this.state.question.id] === option.value}
                  onChange={this.handleOptionChange}
                />
                <RadioLabel htmlFor={this.state.question.id + index}>
                  {option.title}
                </RadioLabel>
              </RadioOption>
            );
          })}
      </RadioButtonContainer>
    );
  }
}
