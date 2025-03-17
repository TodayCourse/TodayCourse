package com.todayCourse.server.travel.controller;

import com.todayCourse.server.travel.dto.TravelPatchDto;
import com.todayCourse.server.travel.dto.TravelPostDto;
import com.todayCourse.server.travel.entity.Travel;
import com.todayCourse.server.travel.mapper.TravelMapper;
import com.todayCourse.server.travel.service.TravelService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/travel")
public class TravelController {
    private final TravelService travelService;
    private final TravelMapper travelMapper;

    @PostMapping("/create")
    public ResponseEntity postTravel(@RequestBody @Valid TravelPostDto travelPostDto) {
        Travel travel = travelService.createTravel(travelMapper.postDtoToTravel(travelPostDto));
        return new ResponseEntity<>(travelMapper.travelToTravelResponseDto(travel), HttpStatus.CREATED);
    }

    @GetMapping("/{travelId}")
    public ResponseEntity getTravel(@PathVariable Long travelId) {
        Travel travel = travelService.getTravel(travelId);
        return new ResponseEntity<>(travelMapper.travelToTravelResponseDto(travel), HttpStatus.OK);
    }

    @PatchMapping("/{travelId}")
    public ResponseEntity patchTravel(@RequestBody @Valid TravelPatchDto travelPatchDto) {
        travelService.updateTravel(travelMapper.patchDtoToTravel(travelPatchDto));
        Travel travel = travelService.getTravel(travelPatchDto.getTravelId());
        return new ResponseEntity<>(travelMapper.travelToTravelResponseDto(travel), HttpStatus.OK);
    }

    @DeleteMapping("/{travelId}")
    public ResponseEntity deleteTravel(@PathVariable Long travelId) {
        travelService.deleteTravel(travelId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
