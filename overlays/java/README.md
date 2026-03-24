# Java / Spring Boot Overlay

Technology overlay for Java and Spring Boot applications.

## Overlay Files

| Overlay | Extends Base Prompt | Description |
|---------|-------------------|-------------|
| REST API Design | `api-rest-endpoint-design` | Spring MVC, Spring WebFlux |
| Microservices | `arch-microservices-design` | Spring Cloud patterns |
| Worker Service | `bg-worker-service-design` | Spring Batch, Spring Kafka |
| Testing | `testing-unit` | JUnit 5, Mockito, Testcontainers |

## Stack Summary

| Concern | Recommended | Alternative |
|---------|-------------|-------------|
| Framework | Spring Boot 3.2+ | Quarkus, Micronaut |
| Language | Java 21 (LTS) | Kotlin |
| ORM | Spring Data JPA + Hibernate | jOOQ, MyBatis |
| Validation | Jakarta Validation | — |
| Testing | JUnit 5 + Mockito | — |
| Integration Test | Testcontainers | H2 in-memory |
| Messaging | Spring Kafka / Spring AMQP | — |
| Auth | Spring Security + OAuth2 | — |
| Logging | SLF4J + Logback | Log4j2 |
| Build | Gradle (Kotlin DSL) | Maven |
| Observability | Micrometer + Spring Actuator | — |

## Usage

> "Apply the Java / Spring Boot overlay to the above design. Use Spring Boot 3 with Spring Data JPA and Spring Security."
