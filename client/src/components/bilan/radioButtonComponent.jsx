import React from "react";

export default class RadioButtonComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionResponse: {...props.value},
            question: props.question || {option: []},
            onOptionChange: this.props.onOptionChange
        };
        this.handleOptionChange = this.handleOptionChange.bind(this);
    }

    handleOptionChange(changeEvent) {
        const response = this.state.questionResponse;
        response[this.state.question.id] = changeEvent.target.value;
        this.setState({...this.state, questionResponse: response},
            () => {
                if (this.state.onOptionChange) {
                    this.state.onOptionChange(this.state.questionResponse);
                }
            });
    }

    render() {
        return (
            <div className="mt-4">
                {this.state.question.type === "radio" &&
                    this.state.question.option.map((option, index) => {
                        return (
                            <div
                                key={this.state.question.id + index}
                                className="flex flex-row space-x-2 cursor-pointer"
                            >
                                <input
                                    type="radio"
                                    id={this.state.question.id + index}
                                    name={this.state.question.id}
                                    value={option.value}
                                    checked={
                                        this.state.questionResponse[this.state.question.id] === option.value
                                    }
                                    onChange={this.handleOptionChange}
                                />
                                <label
                                    htmlFor={this.state.question.id + index}
                                    className="cursor-pointer"
                                >
                                    {option.title}
                                </label>
                            </div>
                        );
                    })}
            </div>
        );
    }
}
