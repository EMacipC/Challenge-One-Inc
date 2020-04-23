package com.CodingChallenge.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.CodingChallenge.Service.InputService;
import com.CodingChallenge.model.Input;

@RestController
@RequestMapping("/input")
public class InputController {

	@Autowired
	private InputService service;
	
	@GetMapping
	public ResponseEntity<List<Input>> getAll(){
		return new ResponseEntity<>(service.getAll(),HttpStatus.OK);
	}
	@PostMapping
	public ResponseEntity<Input> update(@RequestBody Input input){
		return new ResponseEntity<>(service.save(input),HttpStatus.CREATED);
	}
	@PutMapping("/{id}")
	public ResponseEntity<Input> updte(@PathVariable("id")Integer id, @RequestBody Input input){
		return new ResponseEntity<>(service.update(id, input),HttpStatus.OK);
	}
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable("id")Integer id){
		service.delete(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
