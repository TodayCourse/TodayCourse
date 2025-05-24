package com.todayCourse.server.category.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TravelCategoryResponseDto {
    private Long categoryId;

    private String categoryName;

    private int sortOrder;

    private String regUserId;

    private String mdfcUserId;
}
