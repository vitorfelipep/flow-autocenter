/**
 * 
 */
package com.JcCar.service.monitor.JcCarAPI.event;

import javax.servlet.http.HttpServletResponse;

import org.springframework.context.ApplicationEvent;

/**
 * @author vitor
 *
 */
public class RecursoCriadoEvent extends ApplicationEvent {

	private static final long serialVersionUID = 6880554155955816424L;

	private HttpServletResponse response;
	private Long codigo;

	public RecursoCriadoEvent(Object source, HttpServletResponse response, Long codigo) {
		super(source);
		this.response = response;
		this.codigo = codigo;
	}

	public HttpServletResponse getResponse() {
		return response;
	}

	public Long getCodigo() {
		return codigo;
	}

}