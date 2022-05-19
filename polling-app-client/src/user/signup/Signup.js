import React, { Component } from 'react';
import { signup, checkUsernameAvailability, checkEmailAvailability } from '../../util/APIUtils';
import './Signup.css';
import { Link } from 'react-router-dom';
import {
    NAME_MIN_LENGTH, NAME_MAX_LENGTH,
    USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH,
    EMAIL_MAX_LENGTH,
    PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH
} from '../../constants';

import { Form, Input, Button, notification } from 'antd';
const FormItem = Form.Item;

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: ''
            },
            username: {
                value: ''
            },
            email: {
                value: ''
            },
            password: {
                value: ''
            },
            confirmPassword: {
                value: ''
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateUsernameAvailability = this.validateUsernameAvailability.bind(this);
        this.validateEmailAvailability = this.validateEmailAvailability.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
    }

    handleInputChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName] : {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const signupRequest = {
            name: this.state.name.value,
            email: this.state.email.value,
            username: this.state.username.value,
            password: this.state.password.value,
            confirmPassword: this.state.confirmPassword.value

        };
        signup(signupRequest)
            .then(response => {
                notification.success({
                    message: 'Polling App',
                    description: "Thank you! You're successfully registered. Please Login to continue!",
                });
                this.props.history.push("/login");
            }).catch(error => {
            notification.error({
                message: 'Polling App',
                description: error.message || 'Sorry! Something went wrong. Please try again!'
            });
        });
    }

    isFormInvalid() {
        return !(this.state.name.validateStatus === 'success' &&
            this.state.username.validateStatus === 'success' &&
            this.state.email.validateStatus === 'success' &&
            this.state.password.validateStatus === 'success' &&
            this.state.confirmPassword.validateStatus === 'success'
        );
    }

    render() {
        return (
            <div className="signup-container">
                <h1 className="page-title">Регистрация</h1>
                <div className="signup-content">
                    <Form onSubmit={this.handleSubmit} className="signup-form">
                        <FormItem
                            label="Имя"
                            validateStatus={this.state.name.validateStatus}
                            help={this.state.name.errorMsg}>
                            <Input
                                size="large"
                                name="name"
                                autoComplete="off"
                                placeholder="Ваше полное имя"
                                value={this.state.name.value}
                                onChange={(event) => this.handleInputChange(event, this.validateName)} />
                        </FormItem>
                        <FormItem label="Никнейм"
                                  hasFeedback
                                  validateStatus={this.state.username.validateStatus}
                                  help={this.state.username.errorMsg}>
                            <Input
                                size="large"
                                name="username"
                                autoComplete="off"
                                placeholder="Уникальное имя пользователя"
                                value={this.state.username.value}
                                onBlur={this.validateUsernameAvailability}
                                onChange={(event) => this.handleInputChange(event, this.validateUsername)} />
                        </FormItem>
                        <FormItem
                            label="Email"
                            hasFeedback
                            validateStatus={this.state.email.validateStatus}
                            help={this.state.email.errorMsg}>
                            <Input
                                size="large"
                                name="email"
                                type="email"
                                autoComplete="off"
                                placeholder="Ваш email"
                                value={this.state.email.value}
                                onBlur={this.validateEmailAvailability}
                                onChange={(event) => this.handleInputChange(event, this.validateEmail)} />
                        </FormItem>
                        <FormItem
                            label="Пароль"
                            validateStatus={this.state.password.validateStatus}
                            help={this.state.password.errorMsg}>
                            <Input
                                size="large"
                                name="password"
                                type="password"
                                autoComplete="off"
                                placeholder="Пароль должен содержать от 6 до 20 символов"
                                value={this.state.password.value}
                                onChange={(event) => this.handleInputChange(event, this.validatePassword)} />
                        </FormItem>
                        <FormItem
                            label="Подтвердите пароль"
                            validateStatus={this.state.confirmPassword.validateStatus}
                            help={this.state.confirmPassword.errorMsg}>
                            <Input
                                size="large"
                                name="confirmPassword"
                                type="password"
                                autoComplete="off"
                                placeholder="Пароль должен содержать от 6 до 20 символов"
                                value={this.state.confirmPassword.value}
                                onChange={(event) => this.handleInputChange(event, this.validateConfirmPassword)} />
                        </FormItem>
                        <FormItem>
                            <Button type="primary"
                                    htmlType="submit"
                                    size="large"
                                    className="signup-form-button"
                                    disabled={this.isFormInvalid()}>Зарегистрироваться</Button>
                            Уже есть аккаунт? <Link to="/login">Войдите</Link>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }


    validateName = (name) => {
        if(name.length < NAME_MIN_LENGTH) {
            return {
                validateStatus: 'Ошибка',
                errorMsg: `Слишком короткое имя пользователя (Минимальное количество символов ${NAME_MIN_LENGTH})`
            }
        } else if (name.length > NAME_MAX_LENGTH) {
            return {
                validationStatus: 'Ошибка',
                errorMsg: `Слишком длинное имя пользователя (Максимальное количество символов ${NAME_MAX_LENGTH}.)`
            }
        } else {
            return {
                validateStatus: 'успешно',
                errorMsg: null,
            };
        }
    }

    validateEmail = (email) => {
        if(!email) {
            return {
                validateStatus: 'Ошибка',
                errorMsg: 'Email не должен быть пустым'
            }
        }

        const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
        if(!EMAIL_REGEX.test(email)) {
            return {
                validateStatus: 'Ошибка',
                errorMsg: 'Email недействителен '
            }
        }

        if(email.length > EMAIL_MAX_LENGTH) {
            return {
                validateStatus: 'Ошибка',
                errorMsg: `Email слишком длинный (Максимальное количество символов ${EMAIL_MAX_LENGTH})`
            }
        }

        return {
            validateStatus: null,
            errorMsg: null
        }
    }

    validateUsername = (username) => {
        if(username.length < USERNAME_MIN_LENGTH) {
            return {
                validateStatus: 'Ошибка',
                errorMsg: `Никнейм слишком короткий (Минимальное количество символов ${USERNAME_MIN_LENGTH}.)`
            }
        } else if (username.length > USERNAME_MAX_LENGTH) {
            return {
                validationStatus: 'Ошибка',
                errorMsg: `Никнейм слишком длинный (Максимальное количество символов ${USERNAME_MAX_LENGTH}.)`
            }
        } else {
            return {
                validateStatus: null,
                errorMsg: null
            }
        }
    }

    validateUsernameAvailability() {
        const usernameValue = this.state.username.value;
        const usernameValidation = this.validateUsername(usernameValue);

        if(usernameValidation.validateStatus === 'Ошибка') {
            this.setState({
                username: {
                    value: usernameValue,
                    ...usernameValidation
                }
            });
            return;
        }

        this.setState({
            username: {
                value: usernameValue,
                validateStatus: 'validating',
                errorMsg: null
            }
        });

        checkUsernameAvailability(usernameValue)
            .then(response => {
                if(response.available) {
                    this.setState({
                        username: {
                            value: usernameValue,
                            validateStatus: 'success',
                            errorMsg: null
                        }
                    });
                } else {
                    this.setState({
                        username: {
                            value: usernameValue,
                            validateStatus: 'error',
                            errorMsg: 'Этот никнейм уже существует'
                        }
                    });
                }
            }).catch(error => {
            this.setState({
                username: {
                    value: usernameValue,
                    validateStatus: 'success',
                    errorMsg: null
                }
            });
        });
    }

    validateEmailAvailability() {
        const emailValue = this.state.email.value;
        const emailValidation = this.validateEmail(emailValue);

        if(emailValidation.validateStatus === 'error') {
            this.setState({
                email: {
                    value: emailValue,
                    ...emailValidation
                }
            });
            return;
        }

        this.setState({
            email: {
                value: emailValue,
                validateStatus: 'validating',
                errorMsg: null
            }
        });

        checkEmailAvailability(emailValue)
            .then(response => {
                if(response.available) {
                    this.setState({
                        email: {
                            value: emailValue,
                            validateStatus: 'success',
                            errorMsg: null
                        }
                    });
                } else {
                    this.setState({
                        email: {
                            value: emailValue,
                            validateStatus: 'Ошибка',
                            errorMsg: 'Этот Email уже существует'
                        }
                    });
                }
            }).catch(error => {
            this.setState({
                email: {
                    value: emailValue,
                    validateStatus: 'success',
                    errorMsg: null
                }
            });
        });
    }

    validatePassword = (password) => {
        if(password.length < PASSWORD_MIN_LENGTH) {
            return {
                validateStatus: 'Ошибка',
                errorMsg: `Пароль слишком короткий (Минимальное количество символов ${PASSWORD_MIN_LENGTH}.)`
            }
        } else if (password.length > PASSWORD_MAX_LENGTH) {
            return {
                validationStatus: 'Ошибка',
                errorMsg: `Пароль слишком длинный (Максимальное количество символов ${PASSWORD_MAX_LENGTH}.)`
            }
        } else {
            return {
                validateStatus: 'Успешно',
                errorMsg: null,
            };
        }
    }

    validateConfirmPassword = (confirmPassword) => {
        if(confirmPassword.length < PASSWORD_MIN_LENGTH) {
            return {
                validateStatus: 'Ошибка',
                errorMsg: `Пароль слишком короткий (Минимальное количество символов ${PASSWORD_MIN_LENGTH}.)`
            }
        } else if (confirmPassword.length > PASSWORD_MAX_LENGTH) {
            return {
                validationStatus: 'Ошибка',
                errorMsg: `Пароль слишком длинный (Максимальное количество символов ${PASSWORD_MAX_LENGTH}.)`
            }
        } else {
            return {
                validateStatus: 'Успешно',
                errorMsg: null,
            };
        }
    }



}

export default Signup;