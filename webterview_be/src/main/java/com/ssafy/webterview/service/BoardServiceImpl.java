package com.ssafy.webterview.service;

import com.ssafy.webterview.dto.BoardDto;
import com.ssafy.webterview.dto.CommentDto;
import com.ssafy.webterview.entity.Board;
import com.ssafy.webterview.repository.BoardRepository;
import com.ssafy.webterview.repository.CommentRepository;
import com.ssafy.webterview.repository.UserRepository;
import com.ssafy.webterview.util.DEConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
public class BoardServiceImpl implements BoardService {

	private BoardRepository boardRepository;
	private CommentRepository commentRepository;
	private UserRepository userRepository;
	private DEConverter converter;

	@Autowired
	public BoardServiceImpl(BoardRepository boardRepository, CommentRepository commentRepository, UserRepository userRepository, DEConverter converter) {
		this.boardRepository = boardRepository;
		this.commentRepository = commentRepository;
		this.userRepository = userRepository;
		this.converter = converter;
	}

	@Override
	public Page<BoardDto> retrieveBoard(int userNo, Pageable pageable) throws Exception {
		String userRole = userRepository.getReferenceById(userNo).getUserRole();

		Page<BoardDto> boardDtoPage = null;

		if(userRole.equals("1")){
			boardDtoPage = converter.toBoardDtoList(boardRepository.findByBoardType(2,pageable));
		}else if(userRole.equals("2")){
			boardDtoPage = converter.toBoardDtoList(boardRepository.findByBoardTypeAndUserUserNo(2,userNo,pageable));
		}

		if (boardDtoPage != null) {
			for(int i=0;i<boardDtoPage.getContent().size();i++){
				boardDtoPage.getContent().get(i).setCommentCnt(commentRepository.countByBoardBoardNo(boardDtoPage.getContent().get(i).getBoardNo()));
			}
		}

		return boardDtoPage;
	}

	@Override
	public List<BoardDto> retrieveNotice() throws Exception {
		return converter.toBoardDtoList(boardRepository.findTop3ByBoardTypeOrderByBoardNoDesc(1));
	}

	@Override
	public BoardDto insertBoard(BoardDto boardDto) throws Exception {
		//작성, 수정 시각, 댓글 개수 저장
		boardDto.setBoardRegdate(Instant.now());
		boardDto.setBoardUpdate(Instant.now());
		//1) dto를 entity로 변경 2) 저장 3) 다시 dto로 변경
		return converter.toBoardDto(boardRepository.save(converter.toBoardEntity(boardDto)));
	}

	@Override
	public BoardDto detailBoard(int boardNo) throws Exception {
		BoardDto boardDto = converter.toBoardDto(boardRepository.getReferenceById(boardNo));
		boardDto.setComments(converter.toCommentDtoList(commentRepository.findByBoardBoardNo(boardNo)));
		return boardDto;
	}

	@Override
	@Transactional
	public BoardDto updateBoard(BoardDto boardDto) throws Exception {
		Board board = boardRepository.getReferenceById(boardDto.getBoardNo());
		if (boardDto.getBoardContent() != null) board.setBoardContent(boardDto.getBoardContent());
		if (boardDto.getBoardTitle() != null) board.setBoardTitle(boardDto.getBoardTitle());
		board.setBoardUpdate(Instant.now());
		return converter.toBoardDto(board);
	}

	@Override
	@Transactional
	public void deleteBoard(int boardNo) throws Exception {
		boardRepository.delete(boardRepository.getReferenceById(boardNo));
	}

	@Override
	public long getTotalCount() throws Exception {
		return boardRepository.count();
	}

	@Override
	public CommentDto insertComment(CommentDto commentDto) throws Exception {
		commentDto.setCommentRegDate(Instant.now());
//		Comment comment = commentRepository.save(converter.toCommentEntity(commentDto));
		return converter.toCommentDto(commentRepository.save(converter.toCommentEntity(commentDto)));
	}

	@Override
	public void deleteComment(int commentno) throws Exception {
		commentRepository.delete(commentRepository.getReferenceById(commentno));
	}

}