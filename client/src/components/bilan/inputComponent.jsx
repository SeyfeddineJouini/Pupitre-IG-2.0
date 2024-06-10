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

  openKeyboard = () => {
    this.setState({ keyboardOpen: true });
  };

  closeKeyboard = () => {
    this.setState({ keyboardOpen: false });
  };

  handleKeyboardInput = (input) => {
    const response = this.state.questionResponse;
    response[this.state.question.id] = input;
    this.setState(
      { ...this.state, questionResponse: response },
      () => {
        if (this.state.onValueChange) {
          this.state.onValueChange(this.state.questionResponse);
        }
      }
    );
  };

  render() {
    const { question, inputType, questionResponse, keyboardOpen } = this.state;
    const inputValue = questionResponse[question.id] || "";

    return (
      <div className="form-group">
        <label htmlFor={question.id}></label>
        <div className="input-group">
          {inputType === 'textarea' ? (
            <textarea
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id={question.id}
              name={question.id}
              placeholder={this.state.question.title}
              value={inputValue}
              onChange={this.handleValueChange}
              ref={this.inputRef}
              onFocus={this.openKeyboard} // Ouvrir le clavier au focus
              style={{ height: '150px' }} // S'assure que la hauteur du textarea est correcte
            />
          ) : (
            <input
            type={inputType}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id={question.id}
            name={question.id}
            placeholder={this.state.question.title}
            value={inputValue}
            onChange={this.handleValueChange}
            ref={this.inputRef}
            onFocus={this.openKeyboard} // Ouvrir le clavier au focus
          />
          )}
          {inputType === "number" && (
            <>
              <button className="btn btn-outline-secondary" type="button" onClick={this.handleIncrement}>
              </button>
              <button className="btn btn-outline-secondary" type="button" onClick={this.handleDecrement}>
              </button>
            </>
          )}
        </div>
        {keyboardOpen && (
          <KeyboardComponent
            onInput={this.handleKeyboardInput}
            onClose={this.closeKeyboard}
            initialValue={inputValue} // Passez la valeur initiale au clavier
            numpadOnly={inputType === "number"}
          />
        )}
      </div>
    );
  }
}











