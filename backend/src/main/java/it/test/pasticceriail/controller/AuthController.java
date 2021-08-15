package it.test.pasticceriail.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import it.test.pasticceriail.dto.JSONResponseDTO;
import it.test.pasticceriail.dto.JwtRequestDTO;
import it.test.pasticceriail.exception.ExceptionErrorEnum;
import it.test.pasticceriail.exception.JWTUserNotFoundEx;
import it.test.pasticceriail.service.impl.JwtService;

@RestController
@RequestMapping(path = "api")
public class AuthController {

	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private JwtService jwtService;

	/**
	 * Login utente
	 * Genera jwt token a partire da username e password
	 * 
	 * @param authenticationRequest
	 * @return
	 */
	@PostMapping(value = "/login")
	public ResponseEntity<?> generateAuthToken(@RequestBody JwtRequestDTO authenticationRequest) {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
					authenticationRequest.getUsername(), authenticationRequest.getPassword()));
			return ResponseEntity.ok(new JSONResponseDTO(HttpStatus.OK.value(),
					jwtService.getUser(authenticationRequest.getUsername())));
		} catch (BadCredentialsException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new JSONResponseDTO(
					ExceptionErrorEnum.JWT_CREDENTIAL.getCode(), ExceptionErrorEnum.JWT_CREDENTIAL.getMessage()));
		} catch (UsernameNotFoundException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new JSONResponseDTO(ExceptionErrorEnum.ID_NOT_FOUND.getCode(), e.getMessage()));
		} catch (JWTUserNotFoundEx e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new JSONResponseDTO(e.getCode(), e.getMessage()));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
					new JSONResponseDTO(ExceptionErrorEnum.GENERIC.getCode(), ExceptionErrorEnum.GENERIC.getMessage()));
		}
	}

}
