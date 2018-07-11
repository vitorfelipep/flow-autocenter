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

import com.JcCar.service.monitor.JcCarAPI.domain.Fabricante;
import com.JcCar.service.monitor.JcCarAPI.event.RecursoCriadoEvent;
import com.JcCar.service.monitor.JcCarAPI.service.FabricanteService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

/**
 * @author vitor
 *
 */

@RestController
@RequestMapping("/fabricantes")
public class FabricanteResource implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 4355975023516120521L;
	
	private final Logger log = LoggerFactory.getLogger(FabricanteResource.class);
	
	@Autowired
	private FabricanteService fabricanteService;
	
	
	@Autowired
	private ApplicationEventPublisher publisher;
	
	@ApiOperation(value = "View a list of available of manufacturer", httpMethod = "GET", nickname = "listAllManufacturer")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Successfully retrieved list"),
	@ApiResponse(code = 401, message = "You are not authorized to view the resource"),
	@ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
	@ApiResponse(code = 404, message = "The resource you were trying to reach is not found") })
	@GetMapping
	public List<Fabricante> findAll() {
		return fabricanteService.findAll();
	}
	
	@ApiOperation(value = "Recovery manufacturer by id", httpMethod = "GET", nickname = "findManufacturerById")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Successfully retrieved item"),
			@ApiResponse(code = 401, message = "You are not authorized to view the resource"),
			@ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
			@ApiResponse(code = 404, message = "The resource you were trying to reach is not found") })
	@GetMapping("/{codigo}")
	public ResponseEntity<Fabricante> findById(@PathVariable Long codigo) {
		Optional<Fabricante> fabricante = fabricanteService.findById(codigo);
		return fabricante.isPresent() ? ResponseEntity.ok().body(fabricante.get()) : ResponseEntity.notFound().build();
	}
	
	@ApiOperation(value = "Create a new manufacturer", httpMethod = "POST", nickname = "createManufacturer")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Successfully created manufacturer"),
			@ApiResponse(code = 401, message = "You are not authorized to view the resource"),
			@ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
			@ApiResponse(code = 404, message = "The resource you were trying to reach is not found") })
	@PostMapping
	public ResponseEntity<Fabricante> create(@Valid @RequestBody Fabricante fabricante, HttpServletResponse response) {
		log.debug("REST request to save manufacturer : {}", fabricante);
		Fabricante sabricamteSaved = fabricanteService.save(fabricante);
		publisher.publishEvent(new RecursoCriadoEvent(this, response, sabricamteSaved.getId()));
		return ResponseEntity.status(HttpStatus.CREATED).body(sabricamteSaved);
	}
	
	@ApiOperation(value = "Update a existing manufacturer", httpMethod = "PUT", nickname = "updateManufacturer")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Successfully updated manufacturer"),
			@ApiResponse(code = 401, message = "You are not authorized to view the resource"),
			@ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
			@ApiResponse(code = 404, message = "The resource you were trying to reach is not found") })
	@PutMapping("/{codigo}")
	public ResponseEntity<Fabricante> update(@PathVariable Long codigo, @Valid @RequestBody Fabricante fabricante) {
		Fabricante fabricanteSaved = fabricanteService.update(fabricante);
		return ResponseEntity.ok().body(fabricanteSaved);
	}
}
