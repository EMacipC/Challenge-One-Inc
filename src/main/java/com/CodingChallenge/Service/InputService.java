package com.CodingChallenge.Service;

import java.util.List;

import com.CodingChallenge.model.Input;

public interface InputService {
	
	Input save(Input input);
	Input getById(Integer id);
	List<Input> getAll();
	Input update (Integer id,Input input);
	void delete(Integer id);

}
