package it.test.pasticceriail.exception;

import lombok.Getter;

/**
 * 
 * Gestione delle eccezioni custom
 * 
 */
public enum ExceptionErrorEnum {

    GENERIC(1001, "Si è verificato un errore"),
    ID_NOT_FOUND(1002, "Id non trovato"),
    INGREDIENTE_HAS_DOLCI(1003, "L'ingrediente è associato a uno o più dolci"),
    JWT_TOKEN_MISSED(2001, "Token mancante"),
    JWT_CREDENTIAL(2002, "Credenziali non valide"),
    JWT_TOKEN_EXPIRED(2003, "Token scaduto"),
    JWT_TOKEN_GENERIC_ERROR(2004, "Token errato"),
    JWT_USER_NOT_FOUND(2005, "Utente non trovato");

    @Getter
    private final int code;

    @Getter
    private final String message;

    private ExceptionErrorEnum(int code, String message) {
      this.code = code;
      this.message = message;
    }

    @Override
    public String toString() {
        return this.code + ": " + this.message;
    }
}