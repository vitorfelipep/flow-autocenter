/**
 * 
 */
package com.JcCar.service.monitor.JcCarAPI.resource;

import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.JcCar.service.monitor.JcCarAPI.domain.Funcionario;
import com.JcCar.service.monitor.JcCarAPI.event.RecursoCriadoEvent;
import com.JcCar.service.monitor.JcCarAPI.service.FuncionarioService;

/**
 * @author vitor
 *
 */

@RestController
@RequestMapping("/mecanicos")
public class MecanicoResource {
	
	@Autowired
	private FuncionarioService funcionarioService;
	
	@Autowired
	private ApplicationEventPublisher publisher;
	
	@GetMapping
	public List<Funcionario> listar() {
		return funcionarioService.findAll();
	}
	
	@PostMapping
	public ResponseEntity<Funcionario> criar(@Valid  @RequestBody Funcionario funcionario, HttpServletResponse response) {
		Funcionario funcionarioSalvo = funcionarioService.save(funcionario);
		publisher.publishEvent(new RecursoCriadoEvent(this, response, funcionarioSalvo.getId()));
		return ResponseEntity.status(HttpStatus.CREATED).body(funcionarioSalvo);
	}
	
	@GetMapping("/{codigo}")
	public ResponseEntity<Funcionario> buscarPeloCodigo(@PathVariable Long codigo) {
		Funcionario funcionario = funcionarioService.findOne(codigo); 
		return funcionario != null ? ResponseEntity.ok().body(funcionario) : ResponseEntity.notFound().build();
	}

}
