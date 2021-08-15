package it.test.pasticceriail.service.impl;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import it.test.pasticceriail.configuration.JwtUtil;
import it.test.pasticceriail.domain.Utente;
import it.test.pasticceriail.dto.JwtUtenteDTO;
import it.test.pasticceriail.exception.JWTUserNotFoundEx;
import it.test.pasticceriail.repository.UtenteRepository;

@Service
public class JwtService implements UserDetailsService {

	@Autowired
	private JwtUtil jwtUtil;
	@Autowired
	private UtenteRepository utenteRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		List<SimpleGrantedAuthority> roles = null;
		Optional<Utente> utente = utenteRepository.findByUsername(username);
		if (utente.isPresent()) {
			roles = Arrays.asList(new SimpleGrantedAuthority(utente.get().getRuolo()));
			return new User(utente.get().getUsername(), utente.get().getPassword(), roles);
		}
		throw new UsernameNotFoundException("User not found with the name " + username);
	}

	public JwtUtenteDTO getUser(String username) throws JWTUserNotFoundEx {
		List<SimpleGrantedAuthority> roles = null;
		Optional<Utente> utente = this.utenteRepository.findByUsername(username);
		if (utente.isPresent()) {
			roles = Arrays.asList(new SimpleGrantedAuthority(utente.get().getRuolo()));
			User userJwt = new User(utente.get().getUsername(), utente.get().getPassword(), roles);
			String jwtToken = jwtUtil.generateToken(userJwt);
			JwtUtenteDTO jwtUtenteDTO = JwtUtenteDTO.builder()
				.jwtToken(jwtToken)
				.nome(utente.get().getNome())
				.cognome(utente.get().getCognome())
				.ruolo(utente.get().getRuolo())
				.username(utente.get().getUsername()).build();
			return jwtUtenteDTO;
		}
		throw new JWTUserNotFoundEx();
	}

}