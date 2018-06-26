/**
 * 
 */
package com.JcCar.service.monitor.JcCarAPI.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.JcCar.service.monitor.JcCarAPI.domain.Usuario;


/**
 * @author vitor
 *
 */
public interface UsuarioRepositoriy extends JpaRepository<Usuario, Long> {
	
	Optional<Usuario> findByEmail(String email);
}
