/**
 * 
 */
package com.JcCar.service.monitor.JcCarAPI.service.exception;

/**
 * @author vitor
 *
 */
public class ExistingClientWithSameNameException extends RuntimeException {

	private static final long serialVersionUID = 8593954739459527496L;
	
	/**
	 * @param string
	 */
	public ExistingClientWithSameNameException(String message) {
		super(message);
	}
}
