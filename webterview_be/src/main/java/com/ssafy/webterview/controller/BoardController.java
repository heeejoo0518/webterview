package com.ssafy.webterview.controller;

import com.ssafy.webterview.dto.BoardDto;
import com.ssafy.webterview.dto.CommentDto;
import com.ssafy.webterview.service.BoardService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/board")
public class BoardController {

	private static final Logger logger = LoggerFactory.getLogger(BoardController.class);
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";

	private BoardService boardService;

	@Autowired
	public BoardController(BoardService boardService) {
		this.boardService = boardService;
	}

	@ApiOperation(value = "게시판 글 목록", notes = "성공여부와 해당 페이지의 게시글 정보를 반환한다. ", response = Map.class)
	@GetMapping
	public ResponseEntity<Map<String,Object>> retrieveBoard(@ApiParam(value="현재 페이지", required=true) int page,
															@RequestParam(value="size", defaultValue = "10") @ApiParam(value="페이지 당 글 개수") int size,
															@RequestParam(value = "sort", defaultValue = "boardNo,desc") @ApiParam("정렬기준 컬럼명,정렬방식. 기본값은 boardNo,desc 다.") String sort,
															@ApiParam(value="Pageable 객체. 자동생성된다.") Pageable pageable,
															@ApiParam(value="회원 번호", required = true) int userNo) {
		Map<String,Object> resultMap = new HashMap<>();
		HttpStatus httpStatus = HttpStatus.ACCEPTED;
		try {
			resultMap.put("boardList",boardService.retrieveBoard(userNo, pageable));
			resultMap.put("noticeList",boardService.retrieveNotice());
			resultMap.put("message",SUCCESS);
			httpStatus = HttpStatus.OK;
		} catch (Exception e) {
			resultMap.put("message",FAIL);
		}
		return new ResponseEntity<>(resultMap, httpStatus);
	}

	@ApiOperation(value = "게시판 글 개수", notes = "모든 게시글의 개수를 반환한다.", response = Long.class)
	@GetMapping("/count")
	public ResponseEntity<Long> getTotalCount() {
		try {
			return new ResponseEntity<>(boardService.getTotalCount(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(0L,HttpStatus.ACCEPTED);
		}
	}

	@ApiOperation(value = "게시판 글 보기", notes = "성공여부 메세지와 글 번호에 해당하는 게시글의 정보를 반환한다.", response = Map.class)
	@GetMapping("/{boardNo}")
	public ResponseEntity<Map<String,Object>> detailBoard(@PathVariable int boardNo) {
		Map<String,Object> resultMap = new HashMap<>();
		try {
			BoardDto boardDto = boardService.detailBoard(boardNo);
			resultMap.put("board",boardDto);
			resultMap.put("userName", boardDto.getUserName());

			if(boardDto.getUserRole().equals("1")){ // 운영자면
				resultMap.put("userName", "운영자");
			}
			else if(boardDto.getUserRole().equals("2")){
				resultMap.put("userName", boardDto.getUserName());
			}
			resultMap.put("message",SUCCESS);
		}
		catch (Exception e) {
			resultMap.put("message",FAIL);
		}
		return new ResponseEntity<>(resultMap, HttpStatus.OK);
	}

	@ApiOperation(value = "게시판 글 등록", notes = "새로운 게시글 정보를 입력한다. 그리고 DB 입력 성공여부 메세지, 등록한 글 객체를 반환한다.", response = Map.class)
	@PostMapping
	public ResponseEntity<Map<String,Object>> writeBoard(@RequestBody BoardDto board) {
		Map<String, Object> resultMap = new HashMap<>();
		try {
			resultMap.put("board",boardService.insertBoard(board));
			resultMap.put("message",SUCCESS);
		} catch (Exception e) {
			resultMap.put("message",FAIL);
		}
		return new ResponseEntity<>(resultMap, HttpStatus.OK);
	}

	@ApiOperation(value = "게시판 글 정보 수정", notes = "글 번호에 해당하는 게시글의 정보를 수정한다. 그리고 DB 입력 성공여부 메세지, 등록한 글 객체를 반환한다.", response = Map.class)
	@PutMapping("/modify")
	public ResponseEntity<Map<String,Object>> updateBoard(@RequestBody BoardDto board) {
		Map<String, Object> resultMap = new HashMap<>();
		try {
			resultMap.put("board",boardService.updateBoard(board));
			resultMap.put("message",SUCCESS);
		} catch (Exception e) {
			resultMap.put("message",FAIL);
		}
		return new ResponseEntity<>(resultMap, HttpStatus.OK);
	}

	@ApiOperation(value = "게시판 글삭제", notes = "글 번호에 해당하는 게시글의 정보를 삭제한다. 그리고 DB 삭제 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
	@DeleteMapping("/{boardNo}")
	public ResponseEntity<String> deleteBoard(@PathVariable int boardNo) {
		Map<String,Object> resultMap = new HashMap<>();
		try {
			boardService.deleteBoard(boardNo);
			return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(FAIL, HttpStatus.ACCEPTED);
		}
	}

	@ApiOperation(value = "댓글 입력", notes = "새로운 댓글 정보를 입력한다. 그리고 DB 입력 성공여부 메세지, 등록한 댓글 객체를 반환한다.", response = Map.class)
	@PostMapping("/comment")
	public ResponseEntity<Map<String,Object>> writeComment(@RequestBody CommentDto comment) {
		Map<String, Object> resultMap = new HashMap<>();
		try {
			resultMap.put("comment",boardService.insertComment(comment));
			resultMap.put("message",SUCCESS);
		} catch (Exception e) {
			resultMap.put("message",FAIL);
		}
		return new ResponseEntity<>(resultMap, HttpStatus.OK);
	}

	@ApiOperation(value = "댓글 삭제", notes = "댓글 번호에 해당하는 댓글의 정보를 삭제한다. 그리고 DB삭제 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
	@DeleteMapping("/comment/{commentNo}")
	public ResponseEntity<String> deleteComment(@PathVariable int commentNo) {
		try {
			boardService.deleteComment(commentNo);
			return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(FAIL, HttpStatus.ACCEPTED);
		}
	}

}