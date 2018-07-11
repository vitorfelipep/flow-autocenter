package com.JcCar.service.monitor.JcCarAPI.domain;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

/**
 * 
 * @author vitor
 *
 */

@Entity
@Table(name = "modeloCarro")
@Getter @Setter
@EqualsAndHashCode(exclude = {"nome", "descricao"})
public class ModeloCarro implements Serializable {

	private static final long serialVersionUID = -5970196764927606560L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String nome;
	
	private String descricao;
}
