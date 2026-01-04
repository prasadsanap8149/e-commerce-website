package com.ecommerce.core.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/config")
@Slf4j
@Tag(name = "Configuration", description = "Configuration and feature toggle endpoints")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ConfigController {

    @Value("${feature.auth.enabled:false}")
    private boolean authEnabled;

    @Value("${feature.payment.enabled:false}")
    private boolean paymentEnabled;

    @Value("${feature.email.enabled:false}")
    private boolean emailEnabled;

    @Value("${feature.sms.enabled:false}")
    private boolean smsEnabled;

    @Value("${feature.storage.enabled:false}")
    private boolean storageEnabled;

    @Value("${spring.application.name:ecommerce-core-service}")
    private String applicationName;

    @GetMapping("/features")
    @Operation(summary = "Get all feature toggles")
    public ResponseEntity<Map<String, Object>> getFeatureToggles() {
        log.info("Fetching feature toggles");
        Map<String, Object> features = new HashMap<>();

        features.put("authEnabled", authEnabled);
        features.put("paymentEnabled", paymentEnabled);
        features.put("emailEnabled", emailEnabled);
        features.put("smsEnabled", smsEnabled);
        features.put("storageEnabled", storageEnabled);

        return ResponseEntity.ok(features);
    }

    @GetMapping("/health")
    @Operation(summary = "Health check endpoint")
    public ResponseEntity<Map<String, Object>> health() {
        log.info("Health check requested");
        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("service", applicationName);
        response.put("timestamp", LocalDateTime.now().toString());
        response.put("version", "1.0.0");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/info")
    @Operation(summary = "Get application information")
    public ResponseEntity<Map<String, Object>> getAppInfo() {
        log.info("Application info requested");
        Map<String, Object> info = new HashMap<>();
        info.put("name", applicationName);
        info.put("version", "1.0.0");
        info.put("description", "E-Commerce Core Service - Toggle-based modular architecture");
        info.put("features", Map.of(
                "auth", authEnabled,
                "payment", paymentEnabled,
                "email", emailEnabled,
                "sms", smsEnabled,
                "storage", storageEnabled));
        return ResponseEntity.ok(info);
    }
}
