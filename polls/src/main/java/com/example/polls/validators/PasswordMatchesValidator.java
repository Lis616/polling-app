package com.example.polls.validators;

import com.example.polls.annotations.PasswordMatches;
import com.example.polls.payload.SignUpRequest;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class PasswordMatchesValidator implements ConstraintValidator<PasswordMatches, Object> {
    @Override
    public void initialize(PasswordMatches constraintAnnotation){}

    @Override
    public boolean isValid(Object o, ConstraintValidatorContext constraintValidatorContext){
        SignUpRequest signupRequest = (SignUpRequest) o;
        return signupRequest.getPassword().equals(signupRequest.getConfirmPassword());
    }
}
