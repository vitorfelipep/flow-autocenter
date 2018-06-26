/**
 * 
 */
package com.JcCar.service.monitor.JcCarAPI.service;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;
import javax.validation.Valid;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.JcCar.service.monitor.JcCarAPI.domain.Cliente;
import com.JcCar.service.monitor.JcCarAPI.repository.ClienteRepository;
import com.JcCar.service.monitor.JcCarAPI.service.exception.ExistingClientWithSameNameException;

/**
 * @author vitor
 *
 */

@Service
@Transactional
public class ClienteService implements Serializable {

	private static final long serialVersionUID = -9167924589248405504L;
	
	@Autowired
	private ClienteRepository clienteRepository;

	/**
	 * @return
	 */
	public List<Cliente> findAll() {
		return clienteRepository.findAll();
	}

	/**
	 * @param codigo
	 * @return
	 */
	public Optional<Cliente> findOne(Long codigo) {
		return clienteRepository.findById(codigo);
	}

	/**
	 * @param cliente
	 * @return
	 */
	public Cliente save(@Valid Cliente cliente) {
		ClienteAlreadyExistent(cliente);
		return clienteRepository.save(cliente);
	}
	
	/**
	 * @param alert
	 */
	private void ClienteAlreadyExistent(Cliente cliente) {
		Optional<Cliente> clienteOpcional = clienteRepository.findByNomeIgnoreCase(cliente.getNome());
		if(clienteOpcional.isPresent()) {
			throw new ExistingClientWithSameNameException("Já existe cliente com este nome, por favor adicione um novo cliente!");
		}
	}

	/**
	 * @param codigo
	 * @param cliente
	 * @return
	 */
	public Cliente update(Long codigo, @Valid Cliente cliente) {
		Cliente clienteSaved = findCliente(codigo);
		BeanUtils.copyProperties(cliente, clienteSaved, "id");
		return clienteRepository.save(clienteSaved);
	}
	
	/**
	 * 
	 * @param codigo
	 * @return
	 */
	public Cliente findCliente(Long codigo) {
		Cliente clienteSaved = clienteRepository.getOne(codigo);
		if (clienteSaved == null) {
			throw new EmptyResultDataAccessException(1);
		}
		return clienteSaved;
	}
}
