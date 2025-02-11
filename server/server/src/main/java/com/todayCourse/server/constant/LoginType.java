package com.todayCourse.server.constant;

import com.todayCourse.server.exception.BusinessLogicException;
import com.todayCourse.server.exception.ExceptionCode;
import lombok.Getter;

import java.util.Arrays;

public enum LoginType {
    BASIC("일반 로그인"),
    SOCIAL("소셜 로그인");

    @Getter
    private String loginType;

    LoginType(String loginType) { this.loginType = loginType; }

    public static LoginType verifiedLoginType(String data) {
        return Arrays.stream(values())
                .filter(status -> data.trim().toUpperCase().equals(status.toString()))
                .findFirst()
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.INVALID_VALUES));
    }
}
