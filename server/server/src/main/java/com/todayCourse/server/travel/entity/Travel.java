package com.todayCourse.server.travel.entity;

import com.todayCourse.server.audit.Auditable;
import com.todayCourse.server.constant.CostType;
import com.todayCourse.server.constant.Season;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Travel extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long travelId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String region;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String travelStartDt;

    @Column
    private String travelEndDt;

    @Column
    @Enumerated(EnumType.STRING)
    private CostType costType;

    @Column
    @Enumerated(EnumType.STRING)
    private Season season;

    @Column
    private String contents;

    @Column
    private String regUserId;

    @Column
    private String mdfcUserId;

}
