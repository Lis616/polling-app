package com.example.polls.payload;

import lombok.Data;

@Data
public class ChoiceResponse {
    private long id;
    private String text;
    private long voteCount;
}
