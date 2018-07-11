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

import com.JcCar.service.monitor.JcCarAPI.domain.Funcao;
import com.JcCar.service.monitor.JcCarAPI.repository.FuncaoRepository;

/**
 * @author vitor
 *
 */
@Service
@Transactional
public class FuncaoService implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 5507641208208523581L;
	
	@Autowired
	private FuncaoRepository funcaoRepository;
	
	/**
	 * 
	 * @return
	 */
	public List<Funcao> findAll() {
		return funcaoRepository.findAll();
	}
	
	/**
	 * 
	 * @param codigo
	 * @return
	 */
	public Optional<Funcao> findOneById(Long codigo) {
		return funcaoRepository.findById(codigo);
	}
	
	/**
	 * 
	 * @param fabricante
	 * @return
	 */
	public Funcao save(Funcao funcao) {
		return funcaoRepository.save(funcao);
	}
	
	/**
	 * 
	 * @param fabricanteChanged
	 * @return
	 */
	public Funcao update(Funcao funcaoChanged) {
		Funcao funcaoSaved = findFuncaoSaved(funcaoChanged.getId());
		BeanUtils.copyProperties(funcaoChanged, funcaoSaved, "id");
		return funcaoRepository.save(funcaoSaved);
	}
	
	/**
	 * 
	 * @param codigo
	 * @return
	 */
	public Funcao findFuncaoSaved(Long codigo) {
		Optional<Funcao> funcaoSaved = funcaoRepository.findById(codigo);
		return funcaoSaved.orElse(null);
	}
	
	public void delete(Long codigo) {
		funcaoRepository.deleteById(codigo);
	}
}	
