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

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

/**
 * @author vitor
 *
 */

@Entity
@Table(name = "especialidade")
@Getter @Setter
@EqualsAndHashCode(exclude = {"nome", "descricao"})
public class Especialidade implements Serializable {

	private static final long serialVersionUID = -6972487749642675086L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String nome;
	private String descricao;
}
