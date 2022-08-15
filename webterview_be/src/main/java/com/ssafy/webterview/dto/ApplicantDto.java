package com.ssafy.webterview.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.Instant;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "Applicant : 지원자 정보", description = "지원자의 상세 정보를 나타낸다.")
public class ApplicantDto implements Serializable {
	@ApiModelProperty(value = "지원자 번호")
	private int applicantNo;
	@ApiModelProperty(value = "지원자가 속한 방 번호")
	private int roomNo;
	@ApiModelProperty(value = "지원자가 속한 방 인덱스번호")
	private int roomIdx;
	@ApiModelProperty(value = "지원자가 속한 그룹 번호")
	private int groupNo;
	@ApiModelProperty(value = "지원자 이름")
	private String applicantName;
	@ApiModelProperty(value = "지원자 이메일")
	private String applicantEmail;
	@ApiModelProperty(value = "지원자 나이")
	private int applicantAge;
	@ApiModelProperty(value = "지원자 대학")
	private String applicantUniv;
	@ApiModelProperty(value = "지원자 학점")
	private double applicantGPA;
	@ApiModelProperty(value = "지원자 자격증")
	private String applicantLicense;
	@ApiModelProperty(value = "지원자 어학성적")
	private String applicantLang;
	@ApiModelProperty(value = "지원자 면접날짜 및 시각")
	private Instant applicantDate;
	@ApiModelProperty(value = "지원자 순위")
	private int applicantRank;
	@ApiModelProperty(value = "지원자 전화번호")
	private String applicantPhone;
	@ApiModelProperty(value = "지원자 자기소개서")
	private List<ResumeDto> resumes;
	@ApiModelProperty(value = "지원자 동영상 파일")
	private String applicantFile;
}
