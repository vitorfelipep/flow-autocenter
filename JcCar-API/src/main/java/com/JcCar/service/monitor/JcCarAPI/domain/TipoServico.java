/**
 * 
 */
package com.JcCar.service.monitor.JcCarAPI.domain;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

/**
 * @author vitor
 *
 */
@Entity
@Table(name = "tipoServico")
@Getter @Setter
@EqualsAndHashCode(exclude = {"nomeServico", "descricaoServico"})
public class TipoServico implements Serializable {

	private static final long serialVersionUID = 8982088670834227991L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotEmpty
	private String nomeServico;
	
	private String descricaoServico;
}
