package com.example.polls.payload;

import lombok.Data;


import javax.validation.constraints.NotEmpty;

@Data
public class LoginRequest {
    @NotEmpty(message = "Email or Username cannot be empty")
    private String usernameOrEmail;

    @NotEmpty(message = "Password cannot be empty")
    private String password;
}
