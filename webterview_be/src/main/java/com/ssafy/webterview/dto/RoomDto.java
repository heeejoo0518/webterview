package com.ssafy.webterview.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "Room : 방 정보", description = "그룹에 속한 방의 상세 정보를 나타낸다.")
public class RoomDto implements Serializable {
	@ApiModelProperty(value = "방 번호")
	private int roomNo;
	@ApiModelProperty(value = "방 코드")
	private String roomCode;
	@ApiModelProperty(value = "방이 속한 그룹 번호")
	private int groupNo;
	@ApiModelProperty(value = "방 인덱스")
	private int groupIdx;
}
