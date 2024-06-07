import React from "react";

export default class CheckboxButtonComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionResponse: { ...props.value },
            question: props.question || { option: [] },
            onOptionChange: this.props.onOptionChange
        };
        this.handleOptionChange = this.handleOptionChange.bind(this);
    }

    handleOptionChange(changeEvent) {
        const response = this.state.questionResponse;
        if (!response[this.state.question.id]) {
            response[this.state.question.id] = [];
        }

        const value = changeEvent.target.value;

        if (response[this.state.question.id].includes(value)) {
            response[this.state.question.id] = response[this.state.question.id].filter(element => element !== value);
        } else {
            if (value === 'Aucune') {
                response[this.state.question.id] = ['Aucune'];
            } else {
                response[this.state.question.id] = response[this.state.question.id].filter(element => element !== 'Aucune');
                response[this.state.question.id].push(value);
            }
        }

        this.setState({ ...this.state, questionResponse: response },
            () => {
                if (this.state.onOptionChange) {
                    this.state.onOptionChange(this.state.questionResponse);
                }
            });
    }

    render() {
        return (
            <div className="mt-4">
                {this.state.question.type === "checkbox" &&
                    this.state.question.option.map((option, index) => {
                        const isDisabled = 
                          option.value !== 'Aucune' && 
                          this.state.questionResponse[this.state.question.id]?.includes('Aucune') ||
                          option.value === 'Aucune' && 
                          this.state.questionResponse[this.state.question.id]?.length > 0 && 
                          !this.state.questionResponse[this.state.question.id]?.includes('Aucune');

                        return (
                            <div
                                key={this.state.question.id + index}
                                className="flex flex-row space-x-2 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    id={this.state.question.id + index}
                                    name={this.state.question.id}
                                    value={option.value}
                                    checked={
                                        this.state.questionResponse[this.state.question.id]?.includes(option.value)
                                    }
                                    onChange={this.handleOptionChange}
                                    disabled={isDisabled}
                                />
                                <label
                                    htmlFor={this.state.question.id + index}
                                    className={`cursor-pointer ${isDisabled ? 'text-gray-400' : ''}`}
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
