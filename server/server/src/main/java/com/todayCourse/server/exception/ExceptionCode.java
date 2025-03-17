package com.todayCourse.server.exception;

import lombok.Getter;

@Getter
public enum ExceptionCode {

    // common
    INVALID_VALUES(400, "Invalid Values"),

    // user
    MEMBER_EXISTS(400, "Member Exists"),
    MEMBER_NOT_FOUND(400, "Member Not Found"),

    // travel
    TRAVEL_EXIST(400, "Travel Exists"),
    TRAVEL_NOT_FOUND(400, "Travel Not Found");

    private int status;
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
