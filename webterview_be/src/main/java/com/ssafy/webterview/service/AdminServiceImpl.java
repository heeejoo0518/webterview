package com.ssafy.webterview.service;

import com.ssafy.webterview.dto.GroupDto;
import com.ssafy.webterview.dto.RaterDto;
import com.ssafy.webterview.dto.RoomDto;
import com.ssafy.webterview.entity.Group;
import com.ssafy.webterview.entity.Room;
import com.ssafy.webterview.repository.GroupRepository;
import com.ssafy.webterview.repository.RaterRepository;
import com.ssafy.webterview.repository.RoomRepository;
import com.ssafy.webterview.repository.UserRepository;
import com.ssafy.webterview.util.CodeGenerator;
import com.ssafy.webterview.util.DEConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Service
public class AdminServiceImpl implements AdminService {
	private GroupRepository groupRepository;
	private RoomRepository roomRepository;
	private RaterRepository raterRepository;
	private UserRepository userRepository;
	private DEConverter converter;
	private CodeGenerator codeGenerator;

	private static String alg = "AES/CBC/PKCS5Padding";
	private static final String key = "01234567890123456789012345678901";
	private static final String iv = key.substring(0, 16); // 16byte
	@Autowired
	public AdminServiceImpl(GroupRepository groupRepository, RoomRepository roomRepository, UserRepository userRepository, RaterRepository raterRepository, DEConverter converter, CodeGenerator codeGenerator){
		this.groupRepository = groupRepository;
		this.roomRepository = roomRepository;
		this.userRepository = userRepository;
		this.raterRepository = raterRepository;
		this.converter = converter;
		this.codeGenerator = codeGenerator;
	}

	@Override
	@Transactional
	public GroupDto modifyGroup(GroupDto groupDto) {
		Group group = groupRepository.getReferenceById(groupDto.getGroupNo());

		Instant stime = Instant.parse(groupDto.getGroupStart().concat("Z"));
		Instant etime = Instant.parse(groupDto.getGroupEnd().concat("Z"));
		stime = stime.minusSeconds(32400);
		etime = etime.minusSeconds(32400);

		//날짜 이상한 형식 instant로 변경해야함
		group.setGroupStartDate(stime);
		group.setGroupEndDate(etime);
		group.setGroupBlind(groupDto.isGroupBlind());
		return converter.toGroupDto(group);
	}

	@Override
	public GroupDto createGroup(GroupDto groupDto){
		//T붙은 이상한 시간 instant형으로 바꿔서 dto에 넣어줌
		Instant stime = Instant.parse(groupDto.getGroupStart().concat("Z"));
		Instant etime = Instant.parse(groupDto.getGroupEnd().concat("Z"));
		stime = stime.minusSeconds(32400);
		etime = etime.minusSeconds(32400);
		groupDto.setGroupStartDate(stime);
		groupDto.setGroupEndDate(etime);

//		Group group = converter.toGroupEntity(groupDto);
//
//		group.setGroupStartDate(stime);
//		group.setGroupEndDate(etime);
//		group.setGroupBlind(groupDto.isGroupBlind());
//
//		User user = userRepository.getReferenceById(groupDto.getUserNo());
//		group.setUser(user);
		//코드 형식을 업데이트같이 했어.. instant 떄문에...
		return converter.toGroupDto(groupRepository.save(converter.toGroupEntity(groupDto)));
	}

	@Override
	public GroupDto readGroup(int userNo){
		Group group = groupRepository.getCurrentGroup(userNo);

		if(group == null){
			return null;
		}
		else {
			GroupDto groupDto = converter.toGroupDto(group);
			return groupDto;
		}
	}

	@Override
	@Transactional
	public void deleteGroup(int groupNo) throws Exception {
		groupRepository.delete(groupRepository.getReferenceById(groupNo));
	}

	@Override
	public boolean checkGroup(int userNo) throws Exception {
		Group group = groupRepository.getCurrentGroup(userNo);

		if(group == null)
			return true;

		return false;
	}

	@Override
	@Transactional
	public void createRoom(int num, int groupNo) throws Exception {
		int count = (int)roomRepository.countByGroupGroupNo(groupNo);
		List<Room> roomList = new ArrayList<>();

		for(int i=0;i<num;i++){
			Room room = new Room();
			String str = codeGenerator.makeCode(5);

			room.setRoomCode(str);
			Group group = groupRepository.getReferenceById(groupNo);
			room.setGroup(group);

			room.setRoomIdx(++count);

			roomList.add(room);
			roomRepository.save(roomList.get(i));
		}

	}

	@Override
	public List<RoomDto> listRoom(int groupNo) throws Exception {
		List<RoomDto> roomList = converter.toRoomDtoList(roomRepository.findByGroupGroupNo(groupNo));

		return roomList;
	}

	@Override
	public List<RaterDto> readRoom(int roomNo) throws Exception {
		//RoomDto roomDto = converter.toRoomDto(roomRepository.getReferenceById(roomNo));
		List<RaterDto> raterList = converter.toRaterDtoList(raterRepository.findByRoomRoomNo(roomNo));

		return raterList;
	}

	@Override
	public RoomDto detailRoom(int roomNo) throws Exception {
		RoomDto roomDto = converter.toRoomDto(roomRepository.getReferenceById(roomNo));

		return roomDto;
	}
	@Override
	public void deleteRoom(int roomNo) {
		roomRepository.delete(roomRepository.getReferenceById(roomNo));
	}

	@Override
	public String setRoomCode(int roomNo) throws Exception{
		Room room = roomRepository.getReferenceById(roomNo);
		String str = room.getRoomCode();
		str += String.valueOf(roomNo);

		String encode = encrypt(str);
		return encode;
	}

	//암호화 함수
	public String encrypt(String text) throws Exception {

		Cipher cipher = Cipher.getInstance(alg);
		/*
		 * Secret key = ���� ��ȣȭ�ϴµ� ���
		 */
		SecretKeySpec keySpec = new SecretKeySpec(key.getBytes(), "AES");
		IvParameterSpec ivParamSpec = new IvParameterSpec(iv.getBytes());
		cipher.init(Cipher.ENCRYPT_MODE, keySpec, ivParamSpec);

		byte[] encrypted = cipher.doFinal(text.getBytes("UTF-8"));
		return Base64.getEncoder().encodeToString(encrypted);
	}

	//복호화 함수
	public String decrypt(String cipherText) throws Exception {
		Cipher cipher = Cipher.getInstance(alg);
		SecretKeySpec keySpec = new SecretKeySpec(key.getBytes(), "AES");
		IvParameterSpec ivParamSpec = new IvParameterSpec(iv.getBytes());
		cipher.init(Cipher.DECRYPT_MODE, keySpec, ivParamSpec);

		byte[] decodedBytes = Base64.getDecoder().decode(cipherText);
		byte[] decrypted = cipher.doFinal(decodedBytes);
		return new String(decrypted, "UTF-8");
	}
}
