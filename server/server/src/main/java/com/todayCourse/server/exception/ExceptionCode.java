package com.todayCourse.server.exception;

import lombok.Getter;

public enum ExceptionCode {

    // common
    INVALID_VALUES(400, "Invalid Values"),

    // user
    MEMBER_EXISTS(400, "Member Exists"),
    MEMBER_NOT_FOUND(400, "Member Not Found");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
