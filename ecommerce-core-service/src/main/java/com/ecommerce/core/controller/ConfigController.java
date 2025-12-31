package com.ecommerce.core.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/config")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Configuration", description = "Configuration and feature toggle endpoints")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ConfigController {

    @GetMapping("/features")
    @Operation(summary = "Get all feature toggles")
    public ResponseEntity<Map<String, Object>> getFeatureToggles() {
        log.info("Fetching feature toggles");
        Map<String, Object> features = new HashMap<>();

        features.put("auth", isFeatureEnabled("feature.auth.enabled"));
        features.put("payment", isFeatureEnabled("feature.payment.enabled"));
        features.put("email", isFeatureEnabled("feature.email.enabled"));
        features.put("sms", isFeatureEnabled("feature.sms.enabled"));
        features.put("storage", isFeatureEnabled("feature.storage.enabled"));

        return ResponseEntity.ok(features);
    }

    @GetMapping("/health")
    @Operation(summary = "Health check")
    public ResponseEntity<Map<String, String>> health() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "UP");
        response.put("service", "ecommerce-core-service");
        return ResponseEntity.ok(response);
    }

    private boolean isFeatureEnabled(String propertyName) {
        String value = System.getProperty(propertyName);
        if (value != null) {
            return "true".equalsIgnoreCase(value);
        }
        return false;
    }
}
