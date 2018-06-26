package com.JcCar.service.monitor.JcCarAPI;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.JcCar.service.monitor.JcCarAPI.config.property.JcCarApiProperty;

@SpringBootApplication
@EnableConfigurationProperties(JcCarApiProperty.class)
public class JcCarApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(JcCarApiApplication.class, args);
	}
}
