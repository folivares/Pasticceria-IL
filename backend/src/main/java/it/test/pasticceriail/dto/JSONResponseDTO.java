package it.test.pasticceriail.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 
 * DTO Wrapper per le risposte REST
 * 
 */
@AllArgsConstructor @NoArgsConstructor
public class JSONResponseDTO {
	
	@Getter @Setter
	private int code;
	
	@Getter @Setter
	private Object response;

}
