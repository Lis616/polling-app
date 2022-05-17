package com.example.polls.payload;

import com.example.polls.annotations.PasswordMatches;
import com.example.polls.annotations.ValidEmail;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Data
@PasswordMatches
public class SignUpRequest {


    @NotEmpty(message = "Please enter your name")
    @Size(min = 4, max = 40)
    private String name;

    @NotEmpty(message = "Please enter your username")
    @Size(min = 3, max = 15)
    private String username;

    @Size(max = 40)
    @Email(message = "It should be email format")
    @NotBlank(message = "User email is required")
    @ValidEmail
    private String email;

    @NotEmpty(message = "Please enter your password")
    @Size(min = 6, max = 20)
    private String password;

    @NotEmpty(message = "Please enter your password again")
    private String confirmPassword;
}
