/**
 * 
 */
package com.JcCar.service.monitor.JcCarAPI.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.JcCar.service.monitor.JcCarAPI.domain.Funcionario;
import com.JcCar.service.monitor.JcCarAPI.repository.FuncionarioRepository;
import com.JcCar.service.monitor.JcCarAPI.service.exception.FuncionarioExistenteException;

/**
 * @author vitor
 *
 */

@Service
@Transactional
public class FuncionarioService {
	
	@Autowired
	private FuncionarioRepository funcionarioRepository;
	
	public List<Funcionario> findAll() {
		return funcionarioRepository.findAll();
	}

	/**
	 * @param funcionario
	 * @return
	 */
	public Funcionario save(@Valid Funcionario funcionario) {
		Optional<Funcionario> funcionarioExistente = funcionarioRepository.findByNome(funcionario.getNome());
		if (funcionarioExistente.isPresent()) {
			throw new FuncionarioExistenteException("Este funcionário já existe!");
		}
		return funcionarioRepository.save(funcionario);
	}

	/**
	 * @param codigo
	 * @return
	 */
	public Funcionario findOne(Long codigo) {
		return funcionarioRepository.getOne(codigo);
	}
}
