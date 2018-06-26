/**
 * 
 */
package com.JcCar.service.monitor.JcCarAPI.domain;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.JcCar.service.monitor.JcCarAPI.domain.enumeration.StatusAtendimentoEnum;
import com.JcCar.service.monitor.JcCarAPI.domain.enumeration.TipoAtendimentoEnum;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

/**
 * @author vitor
 *
 */

@Entity
@Table(name = "atendimento")
@Getter @Setter
@EqualsAndHashCode(exclude = {"cliente", "mecanico", "horaInicio", "horaTerminoEstimativa", "horaTermino",
			"tipoAtendimento", "statusAtendimento", "tiposDeServicoRealizados", "descricaoCasoTipoServicoOutros",
			"servico"})
public class Atendimento implements Serializable {

	private static final long serialVersionUID = 4830467397186942620L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotNull
	@OneToOne
	@JoinColumn(name = "id_cliente")
	private Cliente cliente;
	
	@NotNull
	@OneToOne
	@JoinColumn(name = "id_mecanico")
	private Funcionario mecanico;
	
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private LocalDateTime horaInicio;
	
	@NotNull
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private LocalDateTime horaTerminoEstimativa;
	
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private LocalDateTime horaTermino;
	
	@NotNull
	@Enumerated(EnumType.STRING)
	private TipoAtendimentoEnum tipoAtendimento;
	
	@NotNull
	@Enumerated(EnumType.STRING)
	private StatusAtendimentoEnum statusAtendimento;
	
	
	@NotNull
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "atendimento_tipo_servico", joinColumns = @JoinColumn(name = "id_atendimento",referencedColumnName = "id"),
			inverseJoinColumns = @JoinColumn(name = "id_tipo_servico", referencedColumnName = "id"))
	private List<TipoServico> tiposDeServicoRealizados;
	
	@Column(name = "outros_servicos")
	private String descricaoCasoTipoServicoOutros;
	
	@ManyToOne(fetch= FetchType.EAGER)
	@JoinColumn(name = "id_servico", referencedColumnName="id")
    @JsonBackReference
	private Servico servico;

}
