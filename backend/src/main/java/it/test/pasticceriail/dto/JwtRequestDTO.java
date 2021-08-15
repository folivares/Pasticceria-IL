package it.test.pasticceriail.dto;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 
 * DTO per la gestione della login client
 * 
 */
@NoArgsConstructor
@AllArgsConstructor
public class JwtRequestDTO implements Serializable {

	@Getter
	@Setter
	private String username;

	@Getter
	@Setter
	private String password;

}