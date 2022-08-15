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
@ApiModel(value = "Rater : 면접관(평가자)정보", description = "면접관의 상세 정보를 나타낸다.")
public class RaterDto implements Serializable {
	@ApiModelProperty(value = "면접관 번호")
	private int raterNo;
	@ApiModelProperty(value = "면접관을 초대한 관리자 번호")
	private int userNo;
	@ApiModelProperty(value = "면접관이 속한 방 번호")
	private int roomNo;
	@ApiModelProperty(value = "면접관이 속한 방 인덱스번호")
	private int roomIdx;
	@ApiModelProperty(value = "면접관 이메일")
	private String raterEmail;
	@ApiModelProperty(value = "면접관 이름")
	private String raterName;
	@ApiModelProperty(value = "면접관 전화번호")
	private String raterPhone;
}
