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
import com.JcCar.service.monitor.JcCarAPI.domain.ClienteCarro;
import com.JcCar.service.monitor.JcCarAPI.repository.ClienteCarroRepository;
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
	
	@Autowired
	private ClienteCarroRepository clienteCarroRepository;

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
	public ClienteCarro save(@Valid ClienteCarro cliente) {
		ClienteAlreadyExistent(cliente);
		return clienteCarroRepository.save(cliente);
	}
	
	/**
	 * @param alert
	 */
	private void ClienteAlreadyExistent(ClienteCarro cliente) {
		Optional<ClienteCarro> clienteCarroOpcional = clienteCarroRepository.findByPlacaIgnoreCase(cliente.getPlaca());
		if(clienteCarroOpcional.isPresent()) {
			throw new ExistingClientWithSameNameException("Já existe carro com esta placa, por favor adicione um novo carro para o cliente!");
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
