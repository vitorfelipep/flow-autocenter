/**
 * 
 */
package com.JcCar.service.monitor.JcCarAPI.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.JcCar.service.monitor.JcCarAPI.domain.Carro;

/**
 * @author vitor
 *
 */
public interface CarroRepository extends JpaRepository<Carro, Long> {

}
