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

import com.JcCar.service.monitor.JcCarAPI.domain.Fabricante;
import com.JcCar.service.monitor.JcCarAPI.repository.FabricanteRepository;

/**
 * @author vitor
 *
 */

@Service
@Transactional
public class FabricanteService implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 4619290624866212733L;
	
	@Autowired
	private FabricanteRepository fabricanteRepository;
	
	/**
	 * 
	 * @return
	 */
	public List<Fabricante> findAll() {
		return fabricanteRepository.findAll();
	}
	
	/**
	 * 
	 * @param codigo
	 * @return
	 */
	public Optional<Fabricante> findById(Long codigo) {
		return fabricanteRepository.findById(codigo);
	}
	
	/**
	 * 
	 * @param fabricante
	 * @return
	 */
	public Fabricante save(Fabricante fabricante) {
		return fabricanteRepository.save(fabricante);
	}
	
	/**
	 * 
	 * @param fabricanteChanged
	 * @return
	 */
	public Fabricante update(Fabricante fabricanteChanged) {
		Fabricante fabricanteSaved = findCliente(fabricanteChanged.getId());
		BeanUtils.copyProperties(fabricanteChanged, fabricanteSaved, "id");
		return fabricanteRepository.save(fabricanteSaved);
	}
	
	/**
	 * 
	 * @param codigo
	 * @return
	 */
	public Fabricante findCliente(Long codigo) {
		Optional<Fabricante> fabricanteSaved = fabricanteRepository.findById(codigo);
		return fabricanteSaved.orElse(null);
	}
	
	public void delete(Long codigo) {
	  fabricanteRepository.deleteById(codigo);
	}
}
