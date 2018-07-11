/**
 * 
 */
package com.JcCar.service.monitor.JcCarAPI.resource;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.JcCar.service.monitor.JcCarAPI.domain.Carro;
import com.JcCar.service.monitor.JcCarAPI.event.RecursoCriadoEvent;
import com.JcCar.service.monitor.JcCarAPI.service.CarroService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

/**
 * @author vitor
 *
 */

@RestController
@RequestMapping("/carros")
public class CarroResource implements Serializable {

	private static final long serialVersionUID = 512703708374771619L;
	
	private final Logger log = LoggerFactory.getLogger(ClienteResource.class);
	
	@Autowired
	private CarroService carroService;
	
	@Autowired
	private ApplicationEventPublisher publisher;
	
	@ApiOperation(value = "View a list of available of cars", httpMethod = "GET", nickname = "listAllCars")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Successfully retrieved list"),
	@ApiResponse(code = 401, message = "You are not authorized to view the resource"),
	@ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
	@ApiResponse(code = 404, message = "The resource you were trying to reach is not found") })
	@GetMapping
	public List<Carro> findAll() {
		return carroService.findAll();
	}
	
	@ApiOperation(value = "Recovery a car by id", httpMethod = "GET", nickname = "findCarById")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Successfully retrieved item"),
			@ApiResponse(code = 401, message = "You are not authorized to view the resource"),
			@ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
			@ApiResponse(code = 404, message = "The resource you were trying to reach is not found") })
	@GetMapping("/{codigo}")
	public ResponseEntity<Carro> findById(@PathVariable Long codigo) {
		Optional<Carro> carro = carroService.findOneById(codigo);
		return carro.isPresent() ? ResponseEntity.ok().body(carro.get()) : ResponseEntity.notFound().build();
	}
	
	@ApiOperation(value = "Create a new car", httpMethod = "POST", nickname = "createCar")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Successfully created car"),
			@ApiResponse(code = 401, message = "You are not authorized to view the resource"),
			@ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
			@ApiResponse(code = 404, message = "The resource you were trying to reach is not found") })
	@PostMapping
	public ResponseEntity<Carro> create(@Valid @RequestBody Carro carro, HttpServletResponse response) {
		log.debug("REST request to save Alert : {}", carro);
		Carro carSaved = carroService.save(carro);
		publisher.publishEvent(new RecursoCriadoEvent(this, response, carSaved.getId()));
		return ResponseEntity.status(HttpStatus.CREATED).body(carSaved);
	}
	
	@ApiOperation(value = "Update a existing car", httpMethod = "PUT", nickname = "updateCar")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Successfully updated car"),
			@ApiResponse(code = 401, message = "You are not authorized to view the resource"),
			@ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
			@ApiResponse(code = 404, message = "The resource you were trying to reach is not found") })
	@PutMapping("/{codigo}")
	public ResponseEntity<Carro> update(@PathVariable Long codigo, @Valid @RequestBody Carro carro) {
		Carro carSaved = carroService.update(carro);
		return ResponseEntity.ok().body(carSaved);
	}
}
