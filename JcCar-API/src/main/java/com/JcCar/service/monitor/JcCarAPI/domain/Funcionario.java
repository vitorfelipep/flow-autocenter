/**
 * 
 */
package com.JcCar.service.monitor.JcCarAPI.domain;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

/**
 * @author vitor
 *
 */
@Entity
@Table(name = "funcionario")
@Getter @Setter
@EqualsAndHashCode(exclude = {"nome", "entradaNaEmpresa", "ativo", "especialidades", "funcao"})
public class Funcionario implements Serializable {

	private static final long serialVersionUID = -585196568876848345L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotEmpty
	private String nome;
	
	@JsonFormat(pattern = "yyyy-MM-dd")
	@Column(name = "data_entrada_empresa")
	private LocalDate entradaNaEmpresa;
	
	@NotNull
	private Boolean ativo;
	
	@NotNull
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "funcionario_especialidade", joinColumns = @JoinColumn(name = "id_funcionario", referencedColumnName = "id"),
			inverseJoinColumns = @JoinColumn(name = "id_especialidade", referencedColumnName = "id"))
	private List<Especialidade> especialidades;
	
	@NotNull
	@OneToOne
	@JoinColumn(name = "id_funcao", referencedColumnName="id")
	private Funcao funcao;

}
