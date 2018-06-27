/**
 * 
 */
package com.JcCar.service.monitor.JcCarAPI.domain;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

/**
 * @author vitor
 *
 */

@Entity
@Table(name = "permissao")
@Getter @Setter
public class Permisao implements Serializable {

	private static final long serialVersionUID = -4791444627770583479L;
	
	@Id
	private Long codigo;
	
	private String descricao;
	
	public Permisao() {
	}
	
	public Permisao(Long codigo, String descricao) {
		this.codigo = codigo;
		this.descricao = descricao;
	}
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((codigo == null) ? 0 : codigo.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Permisao other = (Permisao) obj;
		if (codigo == null) {
			if (other.codigo != null)
				return false;
		} else if (!codigo.equals(other.codigo))
			return false;
		return true;
	}
}
