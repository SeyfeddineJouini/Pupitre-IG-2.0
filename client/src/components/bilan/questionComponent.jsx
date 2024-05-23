import React from "react";
import styled, { keyframes } from "styled-components";
import RadioButtonComponent from "./radioButtonComponent";
import InputComponent from "./inputComponent";
import CheckboxButtonComponent from "./checkboxButtonComponent";

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const QuestionContainer = styled.div`
  background: #ffffff;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const QuestionTitle = styled.h2`
  font-size: 1.8em;
  font-weight: bold;
  color: #1a2a6c;
  margin-bottom: 20px;
  text-align: center;
`;

const QuestionDescription = styled.p`
  font-size: 1em;
  color: #555;
  margin-bottom: 20px;
  text-align: center;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const SubQuestionContainer = styled.div`
  margin-top: 20px;
`;

export default class QuestionComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionResponse: { ...props.questionResponse },
      question: props.question || { option: [] },
      onResponseChange: props.onResponseChange,
      isValid: props.isValid,
      isSubQuestion: props.isSubQuestion,
    };

    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.hasSubQuestion = this.hasSubQuestion.bind(this);
    this.getSubQuestion = this.getSubQuestion.bind(this);
    this.checkIfAllResponseIsValid = this.checkIfAllResponseIsValid.bind(this);

    if (this.state.isValid) {
      this.state.isValid(this.checkIfAllResponseIsValid());
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.questionResponse !== prevProps.questionResponse) {
      this.setState({ questionResponse: { ...this.props.questionResponse } });
    }
  }

  handleOptionChange(eventValue) {
    this.setState(
      {
        ...this.state,
        questionResponse: { ...this.state.questionResponse, ...eventValue },
      },
      () => {
        if (this.state.onResponseChange) {
          this.state.onResponseChange(this.state.questionResponse);
        }

        if (this.state.isValid && !this.state.isSubQuestion) {
          this.state.isValid(this.checkIfAllResponseIsValid());
        }
      }
    );
  }

  hasSubQuestion() {
    const subQuestions = this.getSubQuestion();
    return (
      subQuestions && Array.isArray(subQuestions) && subQuestions.length > 0
    );
  }

  getSubQuestion() {
    return this.state.question.option?.find(
      (opt) => opt.value === this.state.questionResponse[this.state.question.id]
    )?.subQuestion;
  }

  checkIfAllResponseIsValid() {
    let response = !!this.state.questionResponse[this.state.question.id];
    if (this.hasSubQuestion()) {
      this.getSubQuestion().forEach((question) => {
        response =
          (response && !!this.state.questionResponse[question.id]) ||
          question.optional;
      });
    }
    return (
      (response &&
        Object.values(this.state.questionResponse).every(
          (value) => value !== null && value !== undefined && value !== ""
        )) ||
      this.state.question.optional
    );
  }

  render() {
    return (
      <QuestionContainer>
        <QuestionTitle>{this.state.question.title}</QuestionTitle>
        <QuestionDescription>{this.state.question.description}</QuestionDescription>
        <FormContainer>
          {this.state.question.type === "radio" && (
            <RadioButtonComponent
              question={this.state.question}
              value={this.state.questionResponse}
              onOptionChange={this.handleOptionChange}
            />
          )}
          {this.state.question.type === "checkbox" && (
            <CheckboxButtonComponent
              question={this.state.question}
              value={this.state.questionResponse}
              onOptionChange={this.handleOptionChange}
            />
          )}
          {["text", "number", "date"].includes(this.state.question.type) && (
            <InputComponent
              question={this.state.question}
              inputType={this.state.question.type}
              value={this.state.questionResponse}
              onValueChange={this.handleOptionChange}
            />
          )}
        </FormContainer>

        {this.hasSubQuestion() &&
          this.getSubQuestion()?.map((question, index) => {
            return (
              <SubQuestionContainer key={question.id + index}>
                <QuestionComponent
                  questionResponse={this.state.questionResponse}
                  question={question}
                  isValid={this.state.isValid}
                  onResponseChange={this.handleOptionChange}
                />
              </SubQuestionContainer>
            );
          })}
      </QuestionContainer>
    );
  }
}
