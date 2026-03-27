package com.bradesco.motor_fraudes_api.config; // Lembre-se de manter a sua estrutura de pacotes!

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Libera todas as URLs da nossa API
                .allowedOrigins("http://localhost:4200") // Permite o nosso Angular
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Libera o "batedor"
                .allowedHeaders("*"); // Permite que o Angular mande JSON
    }
}
