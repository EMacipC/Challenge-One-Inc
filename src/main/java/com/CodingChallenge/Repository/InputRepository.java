package com.CodingChallenge.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.CodingChallenge.model.Input;

@Repository
public interface InputRepository extends JpaRepository<Input, Integer>{

}
