package com.ssafy.webterview.repository;

import com.ssafy.webterview.entity.Rater;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RaterRepository extends JpaRepository<Rater, Integer> {
    List<Rater> findByRoomRoomNo(int roomNo);
  
	Rater findByRaterNameAndRaterPhoneAndRoomRoomNo(String name, String email, int roomNo);

    List<Rater> findByUserUserNo(int userNo);

    Rater findByRaterEmailAndRoomRoomNo(String email, int roomNo);
}