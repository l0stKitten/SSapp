# features/frontend/clientes.feature

@frontend
Feature: Enviar texto

  @frontend
  Scenario: Mandar mensaje
    Given un formulario
    When solicito el analisis del texto "I want to kill myself"
    Then muestra un mensaje de evaluacion "El contenido se evaluo correctamente"