package it.test.pasticceriail.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 
 * DTO per l'invio di token e dati utente
 * al client dopo che l'autenticazione è
 * avvenuta con successo
 * 
 */
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JwtUtenteDTO {

    @Getter
    @Setter
    private String jwtToken;

    @Getter
    @Setter
    private String username;

    @Getter
    @Setter
    private String ruolo;

    @Getter
    @Setter
    private String nome;

    @Getter
    @Setter
    private String cognome;

}