/**
 * 
 */
package com.JcCar.service.monitor.JcCarAPI.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.JcCar.service.monitor.JcCarAPI.domain.Funcionario;

/**
 * @author vitor
 *
 */
public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {

	/**
	 * @param nome
	 * @return
	 */
	Optional<Funcionario> findByNome(String nome);

}
