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

import com.JcCar.service.monitor.JcCarAPI.domain.Funcao;
import com.JcCar.service.monitor.JcCarAPI.event.RecursoCriadoEvent;
import com.JcCar.service.monitor.JcCarAPI.service.FuncaoService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

/**
 * @author vitor
 *
 */

@RestController
@RequestMapping("/funcoes")
public class FuncaoResource implements Serializable {

	private static final long serialVersionUID = -8729101241519169390L;
	
	private final Logger log = LoggerFactory.getLogger(ClienteResource.class);
	
	@Autowired
	private FuncaoService funcaoService;
	
	@Autowired
	private ApplicationEventPublisher publisher;
	
	@ApiOperation(value = "View a list of available of functions", httpMethod = "GET", nickname = "listAllFunctions")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Successfully retrieved list"),
	@ApiResponse(code = 401, message = "You are not authorized to view the resource"),
	@ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
	@ApiResponse(code = 404, message = "The resource you were trying to reach is not found") })
	@GetMapping
	public List<Funcao> findAll() {
		return funcaoService.findAll();
	}
	
	@ApiOperation(value = "Recovery function by id", httpMethod = "GET", nickname = "findFunctionById")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Successfully retrieved item"),
			@ApiResponse(code = 401, message = "You are not authorized to view the resource"),
			@ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
			@ApiResponse(code = 404, message = "The resource you were trying to reach is not found") })
	@GetMapping("/{codigo}")
	public ResponseEntity<Funcao> findById(@PathVariable Long codigo) {
		Optional<Funcao> funcao = funcaoService.findOneById(codigo);
		return funcao.isPresent() ? ResponseEntity.ok().body(funcao.get()) : ResponseEntity.notFound().build();
	}
	
	@ApiOperation(value = "Create a new function for employee", httpMethod = "POST", nickname = "createFunction")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Successfully created application"),
			@ApiResponse(code = 401, message = "You are not authorized to view the resource"),
			@ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
			@ApiResponse(code = 404, message = "The resource you were trying to reach is not found") })
	@PostMapping
	public ResponseEntity<Funcao> create(@Valid @RequestBody Funcao funcao, HttpServletResponse response) {
		log.debug("REST request to save Alert : {}", funcao);
		Funcao funcaoSaved = funcaoService.save(funcao);
		publisher.publishEvent(new RecursoCriadoEvent(this, response, funcaoSaved.getId()));
		return ResponseEntity.status(HttpStatus.CREATED).body(funcaoSaved);
	}
	
	@ApiOperation(value = "Update a existing function", httpMethod = "PUT", nickname = "updateFunction")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Successfully updated function"),
			@ApiResponse(code = 401, message = "You are not authorized to view the resource"),
			@ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
			@ApiResponse(code = 404, message = "The resource you were trying to reach is not found") })
	@PutMapping("/{codigo}")
	public ResponseEntity<Funcao> update(@PathVariable Long codigo, @Valid @RequestBody Funcao funcao) {
		Funcao funcaoSaved = funcaoService.update(funcao);
		return ResponseEntity.ok().body(funcaoSaved);
	}
}
