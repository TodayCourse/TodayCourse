package com.todayCourse.server.category.mapper;

import com.todayCourse.server.category.dto.TravelCategoryPostDto;
import com.todayCourse.server.category.dto.TravelCategoryResponseDto;
import com.todayCourse.server.category.entity.TravelCategory;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TravelCategoryMapper {
    TravelCategory postDtoToTravelCategory(TravelCategoryPostDto travelCategoryPostDto);

    TravelCategoryResponseDto travelCategoryToTravelCategoryResponseDto(TravelCategory travelCategory);

}
