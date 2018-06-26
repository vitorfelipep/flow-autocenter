package com.JcCar.service.monitor.JcCarAPI.domain;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonBackReference;

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
@EqualsAndHashCode(exclude = {"nome", "versao", "motor", "fabricante"})
public class ModeloCarro implements Serializable {

	private static final long serialVersionUID = -5970196764927606560L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotEmpty
	private String nome;
	@NotEmpty
	private String versao;
	
	@NotEmpty
	private String motor;
	
	@ManyToOne(fetch= FetchType.EAGER)
	@JoinColumn(name = "id_fabricante", referencedColumnName="id")
    @JsonBackReference
	private Fabricante fabricante;
}
