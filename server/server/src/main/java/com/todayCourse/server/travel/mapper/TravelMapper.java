package com.todayCourse.server.travel.mapper;

import com.todayCourse.server.exception.BusinessLogicException;
import com.todayCourse.server.exception.ExceptionCode;
import com.todayCourse.server.travel.dto.TravelPatchDto;
import com.todayCourse.server.travel.dto.TravelPostDto;
import com.todayCourse.server.travel.dto.TravelResponseDto;
import com.todayCourse.server.travel.entity.Travel;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface TravelMapper {
    Travel postDtoToTravel(TravelPostDto travelPostDto);

    Travel patchDtoToTravel(TravelPatchDto travelPatchDto);

    TravelResponseDto travelToTravelResponseDto(Travel travel);

    default List<TravelResponseDto> travelToTravelResponseDtoList(List<Travel> travels) {
        if (travels.isEmpty()) {
            throw  new BusinessLogicException(ExceptionCode.TRAVEL_NOT_FOUND);
        }

        List<TravelResponseDto> travelResponseDtoList = new ArrayList<>();

        for (Travel travel : travels) {
            travelResponseDtoList.add(travelToTravelResponseDto(travel));
        }

        return travelResponseDtoList;
    }
}
