/**
 * 
 */
package com.JcCar.service.monitor.JcCarAPI.domain;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

/**
 * @author vitor
 *
 */

@Entity
@Table(name = "carro")
@Getter @Setter
@EqualsAndHashCode(exclude = {"versao", "motor","modeloCarro", "fabricante"})
public class Carro implements Serializable {

	private static final long serialVersionUID = 5545984033781194299L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotEmpty
	private String versao;
	
	@NotEmpty
	private String motor;
	
	@NotNull
	@OneToOne(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
	@JoinColumn(name = "id_modelo")
	private ModeloCarro modeloCarro;
	
	@NotNull
	@ManyToOne(cascade = { CascadeType.ALL })
	@JoinColumn(name = "id_fabricante", referencedColumnName="id")
    @JsonBackReference
	private Fabricante fabricante;
	
}
