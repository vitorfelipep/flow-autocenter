/**
 * 
 */
package com.JcCar.service.monitor.JcCarAPI.config.property;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Getter;
import lombok.Setter;

/**
 * @author vitor
 *
 */
@ConfigurationProperties("jc-car-api")
@Getter 
public class JcCarApiProperty {
	
	@Setter
	private String origemPermitida = "http://localhost:8080";
	
	private final SecurityApp security = new SecurityApp();
	
	@Getter @Setter
	public static class SecurityApp {
		
		private boolean enableHttps;
	}
}
