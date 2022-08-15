package com.ssafy.webterview.service;

import com.ssafy.webterview.dto.ApplicantDto;
import com.ssafy.webterview.dto.RaterDto;
import com.ssafy.webterview.entity.*;
import com.ssafy.webterview.repository.*;
import com.ssafy.webterview.util.DEConverter;
import com.ssafy.webterview.util.ExcelHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

@Service
public class InterviewServiceImpl implements InterviewService {
	private ApplicantRepository applicantRepository;
	private RaterRepository raterRepository;
	private RoomRepository roomRepository;
	private GradeRepository gradeRepository;
	private UserRepository userRepository;
	private ResumeRepository resumeRepository;
	private DEConverter converter;

	@Autowired
	public InterviewServiceImpl(ApplicantRepository applicantRepository,RaterRepository raterRepository,
								RoomRepository roomRepository, UserRepository userRepository, 
								ResumeRepository resumeRepository, GradeRepository gradeRepository, DEConverter converter){
		this.applicantRepository = applicantRepository;
		this.raterRepository = raterRepository;
		this.roomRepository = roomRepository;
		this.userRepository = userRepository;
		this.resumeRepository = resumeRepository;
		this.gradeRepository = gradeRepository;
		this.converter = converter;
	}

	@Override
	public RaterDto confirmRater(String name, String phone, int roomNo) throws Exception {
		return converter.toRaterDto(raterRepository.findByRaterNameAndRaterPhoneAndRoomRoomNo(name,phone,roomNo));
	}

	@Override
	public ApplicantDto confirmApplicant(String name, String phone, int roomNo) throws Exception {
		return converter.toApplicantDto(applicantRepository.findByApplicantNameAndApplicantPhoneAndRoomRoomNo(name,phone,roomNo));
	}

	@Override
	public List<ApplicantDto> saveApplicants(int groupNo, MultipartFile file) throws Exception {
		List<Room> roomList = roomRepository.findByGroupGroupNo(groupNo);
		List<Applicant> applicantList = ExcelHelper.excelToApplicants(roomList, file.getInputStream());
		return converter.toApplicantDtoList(applicantRepository.saveAll(applicantList));
	}

	@Override
	@Transactional
	public ApplicantDto modifyApplicant(int applicantNo, int roomNo, Date date) throws Exception {
		Applicant applicant = applicantRepository.getReferenceById(applicantNo);
		applicant.setRoom(roomRepository.getReferenceById(roomNo));
		applicant.setApplicantDate(date.toInstant());//.minusSeconds(9*60*60));
		return converter.toApplicantDto(applicant);
	}

	@Override
	public ApplicantDto getApplicant(int groupNo, String email) {
		return converter.toApplicantDto(applicantRepository.findByGroupGroupNoAndApplicantEmail(groupNo,email));
	}

	@Override
	public ApplicantDto getApplicantDto(int groupNo, String email) throws Exception {
		return converter.toApplicantDto(applicantRepository.findByGroupGroupNoAndApplicantEmail(groupNo,email));
	}

	@Override
	@Transactional
	public void deleteApplicant(int groupNo) throws Exception {
		applicantRepository.deleteByGroupGroupNo(groupNo);
	}

	@Override
	public List<ApplicantDto> listGroupApplicant(int groupNo) throws Exception {
		List<ApplicantDto> applicantDtoList = converter.toApplicantDtoList(applicantRepository.findByRoomGroupGroupNo(groupNo));
		for(ApplicantDto dto:applicantDtoList){
			dto.setRoomIdx(roomRepository.getReferenceById(dto.getRoomNo()).getRoomIdx());
		}
		return applicantDtoList;
	}

	@Override
	public List<ApplicantDto> listRoomApplicant(int roomNo) throws Exception {
		List<ApplicantDto> applicantDtoList = converter.toApplicantDtoList(applicantRepository.findByRoomRoomNo(roomNo));
		for(ApplicantDto dto:applicantDtoList){
			dto.setRoomIdx(roomRepository.getReferenceById(dto.getRoomNo()).getRoomIdx());
		}
		return applicantDtoList;
	}

	@Override
	public List<RaterDto> saveAllRater(int groupNo, int userNo, MultipartFile file) throws Exception {
		List<Room> roomList = roomRepository.findByGroupGroupNo(groupNo);
		User user = userRepository.getReferenceById(userNo);
		List<Rater> raterList = ExcelHelper.excelToRaters(roomList, user, file.getInputStream());
		return converter.toRaterDtoList(raterRepository.saveAll(raterList));
	}

	@Override
	public RaterDto insertRaterOne(RaterDto raterDto) {
		return converter.toRaterDto(raterRepository.save(converter.toRaterEntity(raterDto)));
	}

	@Override
	public List<RaterDto> listRater(int userNo){
		List<RaterDto> dtoList = converter.toRaterDtoList(raterRepository.findByUserUserNo(userNo));
		for(RaterDto dto:dtoList){
			dto.setRoomIdx(roomRepository.getReferenceById(dto.getRoomNo()).getRoomIdx());
		}
		return dtoList;
	}

	@Override
	public RaterDto detailRater(int raterNo) {
		RaterDto dto = converter.toRaterDto(raterRepository.getReferenceById(raterNo));
		return dto;
	}
	@Override
	public RaterDto detailRater2(String email) {
		RaterDto raterDto = converter.toRaterDto(raterRepository.findByRaterEmail(email));
		return raterDto;
	}

	@Override
	@Transactional
	public RaterDto modifyRater(RaterDto raterDto) {
		Rater rater = raterRepository.getReferenceById(raterDto.getRaterNo());

		Room room = roomRepository.getReferenceById(raterDto.getRoomNo());
		rater.setRoom(room);

		return converter.toRaterDto(rater);
	}

	@Override
	@Transactional
	public void deleteAllRater(int userNo){
		List<Rater> raterList = raterRepository.findByUserUserNo(userNo);

		for(int i=0;i<raterList.size();i++){
			List<Grade> grade = gradeRepository.findByRaterRaterNo(raterList.get(i).getRaterNo());
			for(int j=0;j<grade.size();j++){
				grade.get(j).setRater(null);
			}
			raterRepository.delete(raterList.get(i));
		}
	}

	@Override
	@Transactional
	public void deleteRater(int raterNo){
		raterRepository.delete(raterRepository.getReferenceById(raterNo));
	}

	@Override
	public List<ApplicantDto> saveResumes(int groupNo, MultipartFile file) throws Exception {
		List<Resume> resumeList = ExcelHelper.excelToResume(applicantRepository, groupNo, file.getInputStream());
		resumeRepository.saveAll(resumeList);
		return converter.toApplicantDtoList(applicantRepository.findByRoomGroupGroupNo(groupNo));
	}

	@Override
	@Transactional
	public void deleteResume(int groupNo) throws Exception {
		resumeRepository.deleteByApplicantGroupGroupNo(groupNo);
	}

	@Override
	public ApplicantDto saveFile(int applicantNo, String url) throws Exception {
		Applicant applicant = applicantRepository.getReferenceById(applicantNo);
		applicant.setApplicantFile(url);

		return converter.toApplicantDto(applicant);
	}

	@Override
	public String getFile(int applicantNo) throws Exception {
		Applicant applicant = applicantRepository.getReferenceById(applicantNo);
		ApplicantDto applicantDto = converter.toApplicantDto(applicant);
		String url = applicantDto.getApplicantFile();

		return url;
	}
}
