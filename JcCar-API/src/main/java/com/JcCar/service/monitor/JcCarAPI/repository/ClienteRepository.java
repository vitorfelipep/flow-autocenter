/**
 * 
 */
package com.JcCar.service.monitor.JcCarAPI.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.JcCar.service.monitor.JcCarAPI.domain.Cliente;

/**
 * @author vitor
 *
 */
public interface ClienteRepository extends JpaRepository<Cliente, Long> {

	/**
	 * @param nome
	 * @return
	 */
	Optional<Cliente> findByNomeIgnoreCase(String nome);

}
