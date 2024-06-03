import React from "react";
import KeyboardComponent from "../KeyboardComponent/KeyboardComponent"; // Importez le composant du clavier

export default class InputComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionResponse: { ...props.value },
            question: props.question || { option: [] },
            onValueChange: this.props.onValueChange,
            inputType: this.props.inputType || 'text',
            keyboardOpen: false, // Ajoutez cet état pour gérer le clavier virtuel
        };

        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleIncrement = this.handleIncrement.bind(this);
        this.handleDecrement = this.handleDecrement.bind(this);
        this.inputRef = React.createRef();
    }

    handleValueChange(changeEvent) {
        const newValue = changeEvent.target.value;
        if (this.state.question.type === "number" && newValue < 0) {
            return; // Empêche la mise à jour si la valeur est négative
        }

        const response = this.state.questionResponse;
        response[this.state.question.id] = newValue;
        this.setState(
            { ...this.state, questionResponse: response },
            () => {
                if (this.state.onValueChange) {
                    this.state.onValueChange(this.state.questionResponse);
                }
            }
        );
    }

    handleIncrement() {
        const response = this.state.questionResponse;
        const newValue = (parseInt(response[this.state.question.id], 10) || 0) + 1;
        response[this.state.question.id] = newValue;
        this.setState(
            { ...this.state, questionResponse: response },
            () => {
                if (this.state.onValueChange) {
                    this.state.onValueChange(this.state.questionResponse);
                }
                this.inputRef.current.focus(); // Garder le focus sur l'input
            }
        );
    }

    handleDecrement() {
        const response = this.state.questionResponse;
        let currentValue = parseInt(response[this.state.question.id], 10);
        
        // Assurez-vous que currentValue est défini à zéro si la valeur est NaN
        if (isNaN(currentValue)) {
            currentValue = 0;
        }
        
        // Empêche la décrémentation si la valeur actuelle est zéro ou non définie
        if (currentValue <= 0) {
            return;
        }
    
        const newValue = currentValue - 1;
        response[this.state.question.id] = newValue;
    
        this.setState(
            { ...this.state, questionResponse: response },
            () => {
                if (this.state.onValueChange) {
                    this.state.onValueChange(this.state.questionResponse);
                }
                this.inputRef.current.focus(); // Garder le focus sur l'input
            }
        );
    }
    
    render() {
        return (
            <div className="mt-4">
                {["text", "number", "date", "email"].includes(this.state.question.type) &&
                    <div className="input-group">
                        <input
                            ref={this.inputRef}
                            type={this.state.inputType}
                            id={this.state.question.id}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder={this.state.question.title}
                            value={this.state.questionResponse[this.state.question.id] || ''}
                            onFocus={() => this.setState({ keyboardOpen: true })}
                            onChange={this.handleValueChange}
                        />
                        {this.state.question.type === "number" && (
                            <div className="number-input-controls">
                                <button type="button" onClick={this.handleDecrement}></button>
                                <button type="button" onClick={this.handleIncrement}></button>
                            </div>
                        )}
                    </div>
                }
                {this.state.keyboardOpen && (
                    <KeyboardComponent
                        numpadOnly={this.state.question.type === "number"}
                        onInput={(value) => this.handleValueChange({ target: { value } })}
                        onClose={() => this.setState({ keyboardOpen: false })}
                    />
                )}
            </div>
        );
    }
}








