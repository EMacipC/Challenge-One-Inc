package com.CodingChallenge.Service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.CodingChallenge.Repository.InputRepository;
import com.CodingChallenge.model.Input;

@Service
public class InputServiceImpl implements InputService{
	
	@Autowired
	private InputRepository repository;
	
	@Override
	public Input save(Input input) {
		input.setDateCreate(new Date());
		return repository.save(input);
	}
	@Override
	public Input update(Integer id, Input input) {
		Input inputDB = getById(id);
		inputDB.setAmount(input.getAmount());
		inputDB.setDate(input.getDate());
		inputDB.setDescription(input.getDescription());
		return repository.save(inputDB);
	}
	@Override
	public Input getById(Integer id) {
		return repository.findById(id).get();
	}
	@Override
	public List<Input> getAll() {
		return repository.findAll();
	}
	@Override
	public void delete(Integer id) {
		repository.deleteById(id);
		
	}
	

}
