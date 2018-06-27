/**
 * 
 */
package com.JcCar.service.monitor.JcCarAPI.domain;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
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
@Table(name = "cliente")
@Getter @Setter
@EqualsAndHashCode(exclude = {"nome", "carros"})
public class Cliente implements Serializable {

	private static final long serialVersionUID = 1742253286664425784L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotEmpty
	private String nome;
	
	@OneToMany(mappedBy = "dono", cascade = { CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REMOVE })
	private List<Carro> carros;
}
