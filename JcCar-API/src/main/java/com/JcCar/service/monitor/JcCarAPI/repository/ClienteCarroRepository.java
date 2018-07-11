/**
 * 
 */
package com.JcCar.service.monitor.JcCarAPI.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.JcCar.service.monitor.JcCarAPI.domain.ClienteCarro;

/**
 * @author vitor
 *
 */
public interface ClienteCarroRepository extends JpaRepository<ClienteCarro, Long> {
	

	/**
	 * @param placa
	 * @return
	 */
	Optional<ClienteCarro> findByPlacaIgnoreCase(String placa);
}
