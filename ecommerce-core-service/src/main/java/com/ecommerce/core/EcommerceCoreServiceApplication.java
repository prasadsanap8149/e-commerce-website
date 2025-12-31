package com.ecommerce.core;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;

@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "Ecommerce Core Service API", version = "1.0.0", description = "REST API for core e-commerce operations"))
public class EcommerceCoreServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(EcommerceCoreServiceApplication.class, args);
    }

}
