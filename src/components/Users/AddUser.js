import React, { useState, useRef } from "react";

import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import ErrorModel from "../UI/ErrorModel";

const AddUser = (props) => {
    const nameInputRef = useRef();
    const ageInputRef = useRef();

    // const [enteredUsername, setEnteredUsername] = useState("");
    // const [enteredAge, setEnteredAge] = useState("");
    const [error, setError] = useState();

    const errorOKHandler = () => {
        setError(null);
    };

    // const usernameChangeHandler = (event) => {
    //     setEnteredUsername(event.target.value);
    // };

    // const ageChangeHandler = (event) => {
    //     setEnteredAge(event.target.value);
    // };

    const addUserHandler = (event) => {
        event.preventDefault();
        const userName = nameInputRef.current.value;
        const userAge = ageInputRef.current.value;

        if (userName.trim().length === 0) {
            setError({
                title: "Invalid input",
                message: "Please enter a valid name.",
            });
            return;
        }

        if (userAge.trim().length === 0 || +userAge < 1) {
            setError({
                title: "Invalid age",
                message: "Please enter valid age (> 0).",
            });
            return;
        }

        props.onAddUser(userName, userAge);

        console.log(userName, userAge);

        // setEnteredUsername("");
        // setEnteredAge("");
        nameInputRef.current.value = '';
        ageInputRef.current.value = '';
    };
    return (
        <>
            {error && (
                <ErrorModel
                    title={error.title}
                    message={error.message}
                    onConfirm={errorOKHandler}
                />
            )}
            <Card className={classes.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        // value={enteredUsername}
                        // onChange={usernameChangeHandler}
                        ref={nameInputRef}
                    />

                    <label htmlFor="age">Age(Years)</label>
                    <input
                        id="age"
                        type="number"
                        // value={enteredAge}
                        // onChange={ageChangeHandler}
                        ref={ageInputRef}
                    />
                    <Button type="submit" onClick={addUserHandler}>
                        Add User
                    </Button>
                </form>
            </Card>
        </>
    );
};

export default AddUser;
