package com.todayCourse.server.travel.mapper;

import com.todayCourse.server.travel.dto.TravelPatchDto;
import com.todayCourse.server.travel.dto.TravelPostDto;
import com.todayCourse.server.travel.dto.TravelResponseDto;
import com.todayCourse.server.travel.entity.Travel;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TravelMapper {
    Travel postDtoToTravel(TravelPostDto travelPostDto);

    Travel patchDtoToTravel(TravelPatchDto travelPatchDto);

    TravelResponseDto travelToTravelResponseDto(Travel travel);
}
