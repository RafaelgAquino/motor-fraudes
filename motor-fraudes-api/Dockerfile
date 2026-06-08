# Passo 1: Usa um computador virtual com Maven e Java 21 para compilar o seu código
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Passo 2: Pega só o arquivo .jar pronto e roda no servidor limpo (Java 21)
FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]