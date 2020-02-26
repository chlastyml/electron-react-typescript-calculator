import math from "mathjs";
import React, { Component } from "react";
import "../css/Calculator.css";
import Button from "./Button";
import Buttons from "./Buttons";
import { Display } from "./Display";

enum Action {
    REMOVE,
    RESULT,
    CLEAR,
}

type Props = {};
type States = typeof initialState;

enum Item {
    NUMBER,
    OPERATOR,
    ACTION,
    EMPTY,
    ERROR,
}

const initialState = {
    lastItem: Item.EMPTY,
    operations: "0",
};

/**
 * return true if value is number or dot.
 */
const isNumber = (value: string) => {
    return (new RegExp("[\.0-9]")).test(value);
};

/**
 * return true if value is operator.
 */
const isOperator = (value: string) => {
    return (new RegExp("/|-|\\+|\\*")).test(value);
};

/**
 * return true if value is action.
 */
const isAction = (value: string) => {
    return (new RegExp("delete|backspace|enter")).test(value);
};

class Calculator extends Component<Props, States> {
    state = initialState;

    calculateOperations = () => {
        let result = this.state.operations;
        try {
            if (result) {
                result = math.eval(result);
                result = math.format(result, { precision: 14 });
                result = String(result);
                this.setState({
                    lastItem: Item.NUMBER,
                    operations: result,
                });
            }
        } catch (err) {
            const lastState: States = this.state;
            this.setState({
                lastItem: Item.ERROR,
                operations: "ERROR",
            });
            setTimeout(() => {
                this.setState(lastState);
            }, 1000);
        }
    }

    addNumber = (value: string) => {
        this.setState({
            lastItem: Item.NUMBER,
            operations: this.state.operations + value,
        });
    }

    addOperator = (value: string) => {
        if (this.state.lastItem === Item.OPERATOR) {
            this.processAction(Action.REMOVE);
        }
        this.setState({
            lastItem: Item.OPERATOR,
            operations: this.state.operations + value,
        });
    }

    processAction = (value: Action) => {
        switch (value) {
            case Action.CLEAR:
                this.setState({
                    lastItem: Item.EMPTY,
                    operations: "0",
                });
                break;
            case Action.REMOVE:
                this.setState({
                    operations: this.state.operations.slice(0, -1),
                });
                break;
            case Action.RESULT:
                this.calculateOperations();
                break;
            default:
                throw new Error("Unsupported action");
        }
    }

    whichItem = (value: string) => {
        if (value === undefined) { return Item.EMPTY; }
        if (isNumber(value)) { return Item.NUMBER; }
        if (isOperator(value)) { return Item.OPERATOR; }
        if (isAction(value)) { return Item.ACTION; }

        // console.warn(`Value(${value}) is not supported.`);
    }

    whichAction = (value: string): Action => {
        if (value === "delete") { return Action.CLEAR; }
        if (value === "backspace") { return Action.REMOVE; }
        if (value === "enter") { return Action.RESULT; }

        throw new Error(`Value(${value}) is not supported.`);
    }

    process = (value: string) => {
        if (this.state.lastItem === Item.ERROR) { return; }
        if (this.state.operations === "0") { this.processAction(Action.REMOVE); }
        const copyValue = value.toLowerCase();
        const item = this.whichItem(copyValue);
        switch (item) {
            case Item.NUMBER: return this.addNumber(copyValue);
            case Item.OPERATOR: return this.addOperator(copyValue);
            case Item.ACTION: return this.processAction(this.whichAction(copyValue));
        }
    }

    handleClick = (e: any) => {
        const value = e.target.getAttribute("data-value");
        this.process(value);
    }

    handleKeyDown = (e: any) => {
        const value = e.code === "Space" ? "0" : e.key;
        this.process(value);
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyDown);
    }

    render() {
        return (
            <div className="App" style={{ fontFamily: 'Share Tech Mono' }}>
                <Display data={this.state.operations} />
                <Buttons>
                    <Button onClick={this.handleClick} label="C" value="Delete" />
                    <Button onClick={this.handleClick} label="7" value="7" />
                    <Button onClick={this.handleClick} label="4" value="4" />
                    <Button onClick={this.handleClick} label="1" value="1" />
                    <Button onClick={this.handleClick} label="0" value="0" />

                    <Button onClick={this.handleClick} label="/" value="/" />
                    <Button onClick={this.handleClick} label="8" value="8" />
                    <Button onClick={this.handleClick} label="5" value="5" />
                    <Button onClick={this.handleClick} label="2" value="2" />
                    <Button onClick={this.handleClick} label="." value="." />

                    <Button onClick={this.handleClick} label="x" value="*" />
                    <Button onClick={this.handleClick} label="9" value="9" />
                    <Button onClick={this.handleClick} label="6" value="6" />
                    <Button onClick={this.handleClick} label="3" value="3" />
                    <Button onClick={this.handleClick} label="<" value="Backspace" />

                    <Button onClick={this.handleClick} label="-" size="2" value="-" />
                    <Button onClick={this.handleClick} label="+" size="2" value="+" />
                    <Button onClick={this.handleClick} label="=" value="Enter" />
                </Buttons>
            </div>
        );
    }
}

export default Calculator;
