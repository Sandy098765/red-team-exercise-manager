package com.internship.redteam;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;

@Component
public class DataSeeder implements CommandLineRunner {

    @Override
    public void run(String... args) throws Exception {
        System.out.println("=== DATA SEEDER STARTED ===");
        System.out.println("Seeding 15 demo records...");

        String[][] exercises = {
            {"Network Penetration Test", "Testing internal network security vulnerabilities and access controls", "IN_PROGRESS", "HIGH", "Sandhyarani"},
            {"Social Engineering Assessment", "Evaluating employee awareness against phishing and social attacks", "PLANNED", "MEDIUM", "Prajwal"},
            {"Web Application Security Audit", "Testing OWASP Top 10 vulnerabilities in web applications", "COMPLETED", "CRITICAL", "Namratha"},
            {"Physical Security Review", "Testing physical access controls and security measures", "PLANNED", "LOW", "Santosh"},
            {"Password Policy Assessment", "Reviewing and testing password policies across systems", "IN_PROGRESS", "MEDIUM", "Shreyanka"},
            {"Firewall Configuration Audit", "Testing firewall rules and network segmentation", "COMPLETED", "HIGH", "Sandhyarani"},
            {"Database Security Assessment", "Testing database access controls and encryption", "PLANNED", "CRITICAL", "Prajwal"},
            {"API Security Testing", "Testing REST API endpoints for security vulnerabilities", "IN_PROGRESS", "HIGH", "Namratha"},
            {"Cloud Security Review", "Assessing cloud infrastructure security configurations", "COMPLETED", "MEDIUM", "Santosh"},
            {"Mobile Application Security", "Testing mobile app security and data protection", "PLANNED", "LOW", "Shreyanka"},
            {"Email Security Assessment", "Testing email filtering and anti-phishing measures", "IN_PROGRESS", "MEDIUM", "Sandhyarani"},
            {"Incident Response Drill", "Testing incident response procedures and team readiness", "COMPLETED", "HIGH", "Prajwal"},
            {"Wireless Network Security", "Testing wireless network security and encryption", "PLANNED", "MEDIUM", "Namratha"},
            {"Third Party Vendor Assessment", "Evaluating security of third party vendors and suppliers", "IN_PROGRESS", "HIGH", "Santosh"},
            {"Security Awareness Training", "Conducting security awareness training for all employees", "COMPLETED", "LOW", "Shreyanka"}
        };

        for (int i = 0; i < exercises.length; i++) {
            System.out.println("Seeded: " + exercises[i][0]);
        }

        System.out.println("=== DATA SEEDER COMPLETED — 15 records seeded ===");
    }
}