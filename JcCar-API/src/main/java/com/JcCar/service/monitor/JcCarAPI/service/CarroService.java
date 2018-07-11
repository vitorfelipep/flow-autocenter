/**
 * 
 */
package com.JcCar.service.monitor.JcCarAPI.service;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.JcCar.service.monitor.JcCarAPI.domain.Carro;
import com.JcCar.service.monitor.JcCarAPI.repository.CarroRepository;

/**
 * @author vitor
 *
 */

@Service
@Transactional
public class CarroService implements Serializable {

	private static final long serialVersionUID = -4633858902068077685L;
	
	@Autowired
	private CarroRepository carroRepository;
	
	/**
	 * 
	 * @return
	 */
	public List<Carro> findAll() {
		return carroRepository.findAll();
	}
	
	/**
	 * 
	 * @param codigo
	 * @return
	 */
	public Optional<Carro> findOneById(Long codigo) {
		return carroRepository.findById(codigo);
	}
	
	/**
	 * 
	 * @param fabricante
	 * @return
	 */
	public Carro save(Carro carro) {
		return carroRepository.save(carro);
	}
	
	/**
	 * 
	 * @param fabricanteChanged
	 * @return
	 */
	public Carro update(Carro carChanged) {
		Carro carroSaved = findCarroSaved(carChanged.getId());
		BeanUtils.copyProperties(carChanged, carroSaved, "id");
		return carroRepository.save(carroSaved);
	}
	
	/**
	 * 
	 * @param codigo
	 * @return
	 */
	public Carro findCarroSaved(Long codigo) {
		Optional<Carro> carroSaved = carroRepository.findById(codigo);
		return carroSaved.orElse(null);
	}
	
	public void delete(Long codigo) {
		carroRepository.deleteById(codigo);
	}
}
