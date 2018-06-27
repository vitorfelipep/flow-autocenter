/**
 * 
 */
package com.JcCar.service.monitor.JcCarAPI.service.exception;

/**
 * @author vitor
 *
 */
public class FuncionarioExistenteException extends RuntimeException {

	private static final long serialVersionUID = -871462885525878869L;
	
	/**
	 * @param string
	 */
	public FuncionarioExistenteException(String message) {
		super(message);
	}
}
